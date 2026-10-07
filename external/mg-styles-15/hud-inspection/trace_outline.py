"""Trace a subject's silhouette from its cut-out mask into the SVG path the template draws (photo pixels).
usage: python3 trace_outline.py mask.png  → prints {"outline", "box", "shots"} as JSON
The mask is white where the subject is (e.g. from a background-removal cut-out of the real photograph)."""
import sys, json, cv2, numpy as np
m = cv2.imread(sys.argv[1], 0)
m = cv2.GaussianBlur(m, (0, 0), 2.5); _, b = cv2.threshold(m, 128, 255, cv2.THRESH_BINARY)
cs, _ = cv2.findContours(b, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE); c = max(cs, key=cv2.contourArea)[:, 0, :]
ap = cv2.approxPolyDP(c.reshape(-1, 1, 2), 0.7, True)[:, 0, :]
ap = np.roll(ap, -int(np.argmin(ap[:, 0])), axis=0)                     # start at the leftmost point
x0, y0 = c.min(0); x1, y1 = c.max(0); cx, cy = (x0 + x1) / 2, (y0 + y1) / 2
seg = np.sqrt((np.diff(np.vstack([c, c[:1]]), axis=0) ** 2).sum(1)); cum = np.concatenate([[0], np.cumsum(seg)])
shots = []
for k in range(12):                                                    # 12 points spaced along the contour, 6% inward
    j = int(np.searchsorted(cum, (k + .5) / 12 * cum[-1])) % len(c); px, py = c[j]
    shots.append([round(px + (cx - px) * .06), round(py + (cy - py) * .06)])
print(json.dumps({"outline": "M" + " L".join(f"{x},{y}" for x, y in ap) + " Z", "box": {"x0": int(x0), "y0": int(y0), "x1": int(x1), "y1": int(y1)}, "shots": shots}))
