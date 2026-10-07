#!/bin/zsh
# Render a composition to MP4 with its soundtrack. Two steps because Remotion's own encoder fails on macOS 13.
# usage: ./render.sh <CompositionId> <out.mp4> [audio.wav]
set -e
comp=$1; out=$2; wav=$3
frames="out/frames-$comp"
rm -rf "$frames"
npx remotion render src/index.ts "$comp" "$frames" --sequence --image-format=jpeg --jpeg-quality=95 --log=error
if [[ -n "$wav" ]]; then
  ffmpeg -y -loglevel error -framerate 30 -i "$frames/element-%03d.jpeg" -i "$wav" \
    -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p \
    -af "loudnorm=I=-16:TP=-1.5:LRA=11" -c:a aac -b:a 192k -ar 48000 -shortest -movflags +faststart "$out"
else
  ffmpeg -y -loglevel error -framerate 30 -i "$frames/element-%03d.jpeg" -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p -movflags +faststart "$out"
fi
rm -rf "$frames"
echo "→ $out"
