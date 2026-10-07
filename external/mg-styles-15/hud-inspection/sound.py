"""Sound for the HUD inspection template, synthesised in code (no samples), cued to the film's frames.
Restrained: a low bed, ticks and clicks where the readout acts, one two-note lock at the verdict.
Times are frames at 30 fps on the global clock (INTRO = 60 frames of line art, then the inspection clock t).
Writes out/inspection-raw.wav (48 kHz stereo); loudness is set in ffmpeg (loudnorm)."""
import numpy as np, wave, os, sys

SR, FPS, INTRO, TOTAL = 48000, 30, 60, 420
N = int(TOTAL / FPS * SR) + SR // 2
L = np.zeros(N); R = np.zeros(N)
rng = np.random.default_rng(7)

def at(frame): return int(frame / FPS * SR)
def g(t): return INTRO + t          # inspection clock → global frame

def add(sig, frame, pan=0.0, gain=1.0):
    i = at(frame); n = min(len(sig), N - i)
    l = np.cos((pan + 1) * np.pi / 4); r = np.sin((pan + 1) * np.pi / 4)
    L[i:i + n] += sig[:n] * gain * l; R[i:i + n] += sig[:n] * gain * r

def env(n, a, d):  # attack/decay in seconds, exponential tail
    t = np.arange(n) / SR
    e = np.minimum(1, t / max(a, 1e-4)) * np.exp(-np.maximum(0, t - a) / d)
    return e

def tone(f, dur, a=0.002, d=0.08, harm=(1, .25, .08)):
    n = int(dur * SR); t = np.arange(n) / SR
    s = sum(h * np.sin(2 * np.pi * f * (k + 1) * t) for k, h in enumerate(harm))
    return s * env(n, a, d)

def click(dur=0.012, f=3200):
    n = int(dur * SR); t = np.arange(n) / SR
    return (rng.standard_normal(n) * 0.5 + np.sin(2 * np.pi * f * t)) * env(n, 0.0005, 0.003)

def lowpass(x, cutoff):
    a = np.exp(-2 * np.pi * cutoff / SR); y = np.zeros_like(x); acc = 0.0
    for i, v in enumerate(x): acc = (1 - a) * v + a * acc; y[i] = acc
    return y

# bed: a low fifth that rises with the photograph and settles under the readout
n = N; t = np.arange(n) / SR
bed = 0.5 * np.sin(2 * np.pi * 55 * t) + 0.3 * np.sin(2 * np.pi * 82.4 * t) + 0.12 * np.sin(2 * np.pi * 110 * t)
shape = np.interp(t, [0, 1.5, 2.6, 13.0, 14.2], [0, 0.0, 1.0, 1.0, 0.0])
L += bed * shape * 0.10; R += bed * shape * 0.10

# the line: a soft breath of filtered noise while the silhouette draws (frames 4–54)
d = (54 - 4) / FPS; m = int(d * SR)
pen = lowpass(rng.standard_normal(m), 1800) * np.interp(np.arange(m), [0, m * .2, m * .8, m], [0, 1, 1, 0])
add(pen, 4, pan=-0.3, gain=0.18)

# the frame's corners draw: four ticks
for i, fr in enumerate([g(6), g(8), g(10), g(12)]):
    add(click(f=2600), fr, pan=[-.8, .8, -.8, .8][i], gain=0.22)

# the scan: a filtered sweep crossing left → right (t 30–104), with a click on each shot point it reaches
d = (104 - 30) / FPS; m = int(d * SR)
sw = lowpass(rng.standard_normal(m), 3500) * np.interp(np.arange(m), [0, m * .15, m * .85, m], [0, 1, 1, 0])
half = m // 2
add(sw[:half], g(30), pan=-0.7, gain=0.16); add(sw[half:], g(30) + half / SR * FPS, pan=0.7, gain=0.16)
for k in range(12):
    add(click(f=4200), g(30 + 5 + k * 5.6), pan=-0.7 + 1.4 * k / 11, gain=0.18)

# the chassis number rolls (t 58–82): a fast patter that stops when it settles
for fr in np.arange(g(58), g(82), 2):
    add(click(dur=0.008, f=5200), fr, pan=-0.5, gain=0.10)
add(tone(1320, 0.18, d=0.05), g(82), pan=-0.5, gain=0.12)

# five [OK]: a short blip each (t 148 + 22i)
for i in range(5):
    add(tone(1568, 0.16, d=0.045), g(148 + 22 * i), pan=0.5, gain=0.16)

# the lock (t 250–268): a low thump as the brackets snap, then the lock — two notes, E5 → B5
thump = tone(62, 0.5, a=0.004, d=0.16, harm=(1, .4)); add(thump, g(252), gain=0.55)
add(tone(659.3, 1.6, a=0.003, d=0.55, harm=(1, .35, .12, .05)), g(266), gain=0.20)
add(tone(987.8, 2.2, a=0.003, d=0.8, harm=(1, .3, .1, .04)), g(270), gain=0.22)
# the footer arrives: one soft low note
add(tone(164.8, 2.0, a=0.02, d=0.9), g(284), gain=0.18)

mix = np.stack([L, R], axis=1)
mix = mix / max(1e-9, np.abs(mix).max()) * 0.89
os.makedirs('out', exist_ok=True)
with wave.open('out/inspection-raw.wav', 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((mix * 32767).astype('<i2').tobytes())
print('wrote out/inspection-raw.wav', round(N / SR, 2), 's')
