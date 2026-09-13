"""
Rebuild the shelf assets from a source photograph of the bookcase.

The home page treats the shelf as a set of objects rather than one picture:

    alcove.webp     the bookcase with every volume removed
    book-1..6.webp  each volume, cut out with a clean alpha edge

Run this again whenever a higher-resolution source arrives — everything below
is expressed as a fraction of the image, so it re-derives at any size and the
site picks up the sharper assets with no code change.

    python tools/build_shelf.py <source.png> [--out public/assets/shelf]

The source must be the same framing as the original Canva artwork: a head-on
bookcase, seven volumes, a lamp at the left, a globe and framed print at the
right. If the framing differs, re-measure SEAMS / OPENING against the new file
(print the brightness profile — the seams between volumes are the dark minima).
"""

from __future__ import annotations

import argparse
import json
import pathlib
import sys

import numpy as np
from PIL import Image, ImageFilter

# ── landmarks, as fractions of the source image ────────────────────────────
# Measured once on the 1249×717 Canva export; they hold at any resolution.
SEAMS_F = [
    0.15212, 0.24900, 0.34988, 0.44596, 0.54524, 0.64211, 0.73899, 0.83507
]  # eight edges → seven volumes
BOOK_TOP_F = 0.43096   # head of the spines
BOOK_BOT_F = 0.91632   # where the volumes meet the board
RAIL_BOT_F = 0.40167   # underside of the shelf rail
BOARD_F = 0.96792      # front edge of the board
PANEL_F = (0.84228, 0.89191)  # the one genuinely empty stretch of back panel
PANEL_CLEAN_Y = (0.41841, 0.62762)  # …and the part of it with nothing in front

SUPERSAMPLE = 2  # so the browser never has to invent pixels


def build(src_path: pathlib.Path, out_dir: pathlib.Path) -> None:
    src = Image.open(src_path).convert("RGBA")
    W, H = src.size
    rgb = np.asarray(src.convert("RGB")).astype(float)
    px = lambda f, n: int(round(f * n))  # noqa: E731

    seams = [px(f, W) for f in SEAMS_F]
    top, bot = px(BOOK_TOP_F, H), px(BOOK_BOT_F, H)
    fill_x0, fill_x1 = seams[0] - px(0.003, W), seams[7] + px(0.002, W)
    fill_y0, fill_y1 = px(RAIL_BOT_F, H) - px(0.006, H), px(BOARD_F, H)

    # ── 1. empty the shelf ─────────────────────────────────────────────────
    pl0, pl1 = px(PANEL_F[0], W), px(PANEL_F[1], W)
    cy0, cy1 = px(PANEL_CLEAN_Y[0], H), px(PANEL_CLEAN_Y[1], H)
    panel = rgb[cy0:cy1, pl0:pl1, :]
    top_c = np.percentile(panel[: (cy1 - cy0) // 3], 40, axis=(0, 1))
    mid_c = np.percentile(panel[(cy1 - cy0) // 2 :], 40, axis=(0, 1))

    h, w = fill_y1 - fill_y0, fill_x1 - fill_x0
    ys = np.linspace(0, 1, h)[:, None]
    t = np.clip(ys / 0.42, 0, 1)
    col = top_c[None, :] * (1 - t) + mid_c[None, :] * t
    col = col * (1 - 0.52 * np.clip((ys - 0.55) / 0.45, 0, 1) ** 1.5)
    field = np.repeat(col[:, None, :], w, axis=1)

    # lamplight from the left
    xs = np.linspace(0, 1, w)[None, :, None]
    fall = np.exp(-xs * 2.4)
    field = field * (1 + 0.9 * fall)
    field = field * (1 + fall * np.array([0.12, 0.02, -0.14])[None, None, :])

    # soft vertical grain so the panel reads as wood
    rng = np.random.default_rng(11)
    streak = np.asarray(
        Image.fromarray(
            (rng.normal(0, 1, (1, w)).repeat(h, 0) * 14 + 128)
            .clip(0, 255)
            .astype(np.uint8)
        ).filter(ImageFilter.GaussianBlur(max(1, w // 300)))
    ).astype(float)[:, :, None] - 128
    field = field + streak * 0.5 + rng.normal(0, 1.5, (h, w, 3))
    field = np.clip(field * 1.9 + np.array([9, 5, 2]), 0, 255)

    mask = np.full((h, w), 255.0)
    fx, ft = max(6, w // 36), max(4, h // 26)
    mask *= np.clip(
        np.minimum(np.arange(w), w - 1 - np.arange(w)) / fx, 0, 1
    )[None, :]
    mask[:ft, :] *= np.linspace(0, 1, ft)[:, None]

    alcove = src.copy()
    alcove.paste(
        Image.fromarray(field.astype(np.uint8)),
        (fill_x0, fill_y0),
        Image.fromarray(mask.astype(np.uint8)),
    )

    out_dir.mkdir(parents=True, exist_ok=True)
    alcove.resize(
        (W * SUPERSAMPLE, H * SUPERSAMPLE), Image.LANCZOS
    ).save(out_dir / "alcove.webp", "WEBP", quality=92, method=6)

    # ── 2. cut out six volumes, widened to fill the seventh's slot ─────────
    cuts = []
    for i in range(6):
        cut = src.crop((seams[i], top - max(1, H // 360), seams[i + 1], bot))
        cw, ch = cut.size
        al = np.full((ch, cw), 255.0)
        feather = max(1.0, cw / 60)
        al *= np.clip(
            np.minimum(np.arange(cw), cw - 1 - np.arange(cw)) / feather, 0, 1
        )[None, :]
        edge = max(2, ch // 120)
        al[:edge, :] *= np.linspace(0.15, 1, edge)[:, None]
        al[-edge:, :] *= np.linspace(1, 0.5, edge)[:, None]
        cut.putalpha(Image.fromarray(al.astype(np.uint8)))
        cuts.append(cut)

    span = seams[7] - seams[0]  # all seven slots
    k = span / sum(c.width for c in cuts)

    slots, x = [], float(seams[0])
    for i, c in enumerate(cuts):
        nw = round(c.width * k)
        c.resize((nw * SUPERSAMPLE, c.height * SUPERSAMPLE), Image.LANCZOS).save(
            out_dir / f"book-{i + 1}.webp", "WEBP", quality=92, method=6
        )
        slots.append(
            {
                "i": i + 1,
                "left": round(x / W, 5),
                "width": round(nw / W, 5),
                "top": round((top - max(1, H // 360)) / H, 5),
                "height": round(c.height / H, 5),
            }
        )
        x += nw

    meta = {
        "slots": slots,
        "opening": {
            "left": round(fill_x0 / W, 5),
            "right": round(fill_x1 / W, 5),
            "top": round(RAIL_BOT_F, 5),
            "bottom": round(BOARD_F, 5),
        },
    }
    print(json.dumps(meta, indent=1))
    print(
        "\nPaste `slots` into the `slot` fields of src/data/volumes.ts, and "
        "`opening` into SHELF_OPENING.",
        file=sys.stderr,
    )


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("source", type=pathlib.Path)
    ap.add_argument("--out", type=pathlib.Path, default=pathlib.Path("public/assets/shelf"))
    a = ap.parse_args()
    build(a.source, a.out)
