"""Clean two leftovers out of the synthesised alcove.

`build_shelf.py` lifts every volume out of the shelf photograph and paints an
empty back panel in behind them. Two traces of the original books survived it,
and both only become visible once a volume is pulled out of the row:

  · the feet of the original books, as coloured crescents sitting on the board
    along the bottom of the panel;
  · the pale edge of the seventh volume, at the right-hand end of the opening,
    which is exactly where volume VI stands.

Both are repaired the same way: a clean piece of the panel is sampled and
carried over the damage, feathered at the seams so there is no visible join.
The panel has a vertical gradient and almost no horizontal one, so the bottom
is repaired by carrying rows *down* and the right end by carrying columns
*across*, which keeps the lighting intact in each case.

    python tools/patch_alcove.py
    python tools/patch_alcove.py --check   # writes before/after crops only
"""

from __future__ import annotations

import argparse
import pathlib

import numpy as np
from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent.parent
ALCOVE = ROOT / "public" / "assets" / "shelf" / "alcove.webp"

# The shelf opening, as fractions of the photograph. Kept in step with
# SHELF_OPENING in src/data/volumes.ts.
OPEN_L, OPEN_R = 0.14892, 0.83747
PANEL_TOP = 0.410

# The junction where the panel meets the board. The original books' feet
# survive as a grey band sitting across it, which reads as blue against the
# warm wood the moment a volume is pulled out of the row.
JOIN_TOP, JOIN_BOT = 0.9115, 0.9320
ABOVE = (0.9020, 0.9110)   # clean panel
BELOW = (0.9325, 0.9400)   # clean board

# The seventh volume's edge, and the clean panel to its left.
EDGE_L, EDGE_R = 0.8130, 0.8395
SRC_L, SRC_R = 0.7655, 0.7920

FEATHER = 14  # pixels of cross-fade at every seam


def ramp(n: int) -> np.ndarray:
    """A smooth 0 to 1 over n samples."""
    t = np.linspace(0.0, 1.0, n)
    return (t * t * (3 - 2 * t)).astype(np.float32)


def blend(dst: np.ndarray, src: np.ndarray, alpha: np.ndarray) -> np.ndarray:
    return dst * (1 - alpha) + src * alpha


def running_median(row: np.ndarray, win: int = 61) -> np.ndarray:
    """Median along x, so a narrow dark notch cannot poison the anchor it is
    sampled into while the wood's broad gradient is kept."""
    pad = win // 2
    padded = np.pad(row, ((pad, pad), (0, 0)), mode="edge")
    idx = np.arange(win)[None, :] + np.arange(row.shape[0])[:, None]
    return np.median(padded[idx], axis=1).astype(np.float32)


def repair(a: np.ndarray) -> np.ndarray:
    h, w, _ = a.shape
    out = a.copy()
    rng = np.random.default_rng(20260913)

    # ── the junction, and the book feet sitting on it ───────────────
    x0, x1 = int(OPEN_L * w), int(OPEN_R * w)
    jy0, jy1 = int(JOIN_TOP * h), int(JOIN_BOT * h)
    n = jy1 - jy0

    # Each column keeps its own panel above and its own board below, so the
    # grain of the wood carries straight through the repair.
    top = running_median(a[int(ABOVE[0] * h) : int(ABOVE[1] * h), x0:x1].mean(0))
    bot = running_median(a[int(BELOW[0] * h) : int(BELOW[1] * h), x0:x1].mean(0))
    t = ramp(n)[:, None, None]
    lerp = top[None] * (1 - t) + bot[None] * t

    # The contact shadow is taken from the band itself, as the median across
    # the whole opening, so the leftover feet are outvoted by the clean run.
    band = a[jy0:jy1, x0:x1]
    med = np.median(band.mean(2), axis=1)
    ref = np.median(lerp.mean(2), axis=1)
    shadow = (med / np.maximum(ref, 1e-3)).astype(np.float32)[:, None, None]
    filled = lerp * shadow
    filled += rng.normal(0, 1.0, filled.shape).astype(np.float32)

    alpha = np.ones((n, x1 - x0, 1), np.float32)
    alpha[:FEATHER] = ramp(FEATHER)[:, None, None]
    alpha[-FEATHER:] = ramp(FEATHER)[::-1][:, None, None]
    out[jy0:jy1, x0:x1] = blend(out[jy0:jy1, x0:x1], filled, alpha)

    # ── the seventh volume's edge ────────────────────────────────────
    ex0, ex1 = int(EDGE_L * w), int(EDGE_R * w)
    sx0, sx1 = int(SRC_L * w), int(SRC_R * w)
    py0, py1 = int(PANEL_TOP * h), jy0

    width = ex1 - ex0
    patch = a[py0:py1, sx0 : sx0 + width][:, ::-1]  # mirrored, so it does not repeat
    patch = patch + rng.normal(0, 1.1, patch.shape).astype(np.float32)

    alpha = np.ones((py1 - py0, ex1 - ex0, 1), np.float32)
    alpha[:, :FEATHER] = ramp(FEATHER)[None, :, None]
    alpha[:, -FEATHER:] = ramp(FEATHER)[::-1][None, :, None]
    alpha[:FEATHER] *= ramp(FEATHER)[:, None, None]
    out[py0:py1, ex0:ex1] = blend(out[py0:py1, ex0:ex1], patch, alpha)

    return np.clip(out, 0, 255)


def crops(img: Image.Image, tag: str) -> None:
    w, h = img.size
    img.crop((int(0.10 * w), int(0.85 * h), int(0.90 * w), int(0.96 * h))).resize(
        (1600, int(1600 * (0.11 * h) / (0.80 * w)))
    ).save(ROOT / f"../_alcove_{tag}_bottom.png")
    img.crop((int(0.74 * w), int(0.40 * h), int(0.88 * w), int(0.95 * h))).save(
        ROOT / f"../_alcove_{tag}_right.png"
    )


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--check", action="store_true", help="write crops, do not save")
    args = ap.parse_args()

    # Re-running has to repair the original, never a repair of a repair.
    backup = ROOT / "tools" / "alcove.orig.webp"
    before = Image.open(backup if backup.exists() else ALCOVE).convert("RGB")
    crops(before, "before")

    fixed = Image.fromarray(repair(np.asarray(before).astype(np.float32)).astype(np.uint8))
    crops(fixed, "after")

    if args.check:
        print("crops written, alcove left alone")
        return

    if not backup.exists():
        before.save(backup, "WEBP", quality=95, method=6)
        print("original kept at", backup.name)
    fixed.save(ALCOVE, "WEBP", quality=95, method=6)
    print("patched", ALCOVE, fixed.size)


if __name__ == "__main__":
    main()
