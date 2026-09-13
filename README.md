# The Learning Archive

Portfolio site for **Isha Shah**. A rebuild of the Canva deck at
`../Learning Archive Website.pdf` as an interactive, responsive website.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

---

## Where the design came from

Nothing here is a re-drawing. The Canva PDF is a layered export, so the
photography, ornaments and book bindings were pulled straight out of it and
re-composited in the browser:

| Source                   | Became                                                     |
| ------------------------ | ---------------------------------------------------------- |
| The shelf photograph     | `public/assets/shelf/alcove.webp` + six cut-out volumes    |
| The open-book photograph | `public/assets/paper/book-open.webp`                        |
| Ivy, lamp, globe, desk   | `public/assets/scene/*`                                     |
| Paper and plates         | `public/assets/paper/*`                                     |
| Gold filigree & emblems  | `public/assets/orn/*`                                       |

Everything was converted to WebP: **9.3 MB → 871 KB**.

### Fonts

The deck uses three Canva-licensed faces. Each was matched against its
embedded subset and replaced with the closest Google font:

| Canva                    | Used here             | Role                                  |
| ------------------------ | --------------------- | ------------------------------------- |
| TY Serif D               | **Cormorant Garamond** | Display, and all ink-on-paper copy    |
| Glacial Indifference     | **Jost**              | Letterspaced small caps, page labels  |
| Garet                    | **Outfit**            | Navigation, hero subtitle             |

### Colours

Sampled from the PDF, defined once in `src/app/globals.css`:

`--color-forest #121d12` · `--color-cream #f4e8c9` · `--color-gold #c29e5b`
`--color-gold-bright #ecbd64` · `--color-maroon #800000` · `--color-ink #121e13`

---

## How it is built

- **Next.js 16** (App Router, fully static) · **Tailwind v4** · **TypeScript**
- **Motion** for transitions, **Lenis** for smooth scroll
- **react-three-fiber** for the dust motes turning in the lamplight

### The shelf

`src/components/Bookshelf.tsx`. The bookcase is not one picture. It is a set
of objects:

- `public/assets/shelf/alcove.webp` is the photograph with **every volume
  removed**: the frame, the rail, the lamp, the globe and a synthesised back
  panel behind where the books stood.
- `book-1…6.webp` are the volumes, cut out individually with a feathered alpha
  edge, widened to fill the seventh (blue) volume's slot so the shelf reads
  full with six.
- The books sit in a box clipped to the shelf opening, so a volume that is
  pulled slides up **behind the rail** and leaves a real gap in the row.
  Nothing but the book moves.

Positions live in `src/data/volumes.ts` (`slot`, and `SHELF_OPENING`) as
fractions of the photograph, so the whole assembly scales as a single object.

Two traces of the original books survived the synthesis, and both only showed
once a volume was pulled out of the row: the feet of the originals, as coloured
crescents along the bottom of the panel, and the pale edge of the seventh
volume at the right-hand end, which is exactly where volume VI stands.
`tools/patch_alcove.py` repairs both and keeps the untouched original at
`tools/alcove.orig.webp`, so it can be re-run without repairing a repair. The
junction at the foot of the panel is rebuilt per column, from the panel above
and the board below with the contact shadow taken as the median across the
whole opening, so the leftover feet are outvoted by the clean run of it.

`tools/build_shelf.py` regenerates all of it from a source photograph, run it
against a higher-resolution export and the site picks up the sharper assets
with no code change:

```bash
python tools/build_shelf.py path/to/shelf.png --out public/assets/shelf
```

### The room

`src/components/RoomScene.tsx` holds the room every interior page is set in,
and the rules that stop it looking like cut-outs on a colour swatch:

- **one measurement.** `--desk` is `calc(100vw / 10.12)`, the desk
  photograph's own aspect, so the surface never crops and every object can be
  seated against it by a single offset.
- **no boxes.** Nothing in the room ends in a straight line: the shelf
  photograph carries its own `mask-image` so its ends dissolve into the wall,
  the gilt frame is four fading rules rather than a rectangle, and the plinth
  is one continuous wash (a tiled paper texture was printing repeat seams
  across it).
- **shadow, not lines.** The wall darkens *into* the desk and the desk's far
  edge sits in that shadow, so the join is a gradient rather than a cut. The
  same trick seats the plinth under the shelf on the home page.
- **one atmosphere pass.** `<Atmosphere />` lays a warm pool where the lamp is
  and a cool falloff into the corners, over the finished scene. That single
  grade is what makes separate photographs read as one light.
- **trimmed assets.** Every object is cropped to its own alpha, so a box
  bottom *is* the base of the object: the lamp stands on the bound book at the
  right of the desk because its box bottom is the foot of the stand.

The closed volume beside the book is the same cut-out that stands on the shelf
at home, sized to the open book's exact height with its width derived from the
cut-out's aspect, so the two books always match and the binding is never
stretched.

### The desk

`src/components/BookSpread.tsx`. `--desk`
is the height of the desk band at the foot of the page and every object is
placed against it: the book rests on the desk top, the lamp stands on the
surface in front of it, the volume at the left runs down behind the desk's
front edge, and the ivy hangs in from beyond the frame. Nothing floats in the
middle of the wall.

The book takes all the height the header and the desk leave it
(`min(64vw, (100svh − 84px − var(--desk) − 16px) × 1.267)`), so it is as large
as the room allows at any viewport.

**Nothing on the site scrolls.** Every page is exactly one screen, except a
work chapter, which opens over the top of it (see below).

The bookmark hangs down the head of every verso, so the first line of a verso
has to be set clear of it. That is what the top padding on the Work and
Approach versos is for; the QA sweep checks for text caught under the ribbon at
every viewport, not just for overflow.

### One scale, one unit

`--ps` is a page's reference width. Two rules keep everything on it:

- the `.pg-*` classes size type against it;
- `.pg-base` sets the page's own `font-size` from it, so **every `em` inside a
  page, icon boxes, circles, gaps, padding, scales with the page** instead of
  the browser's 16px default. Mixing the two is what made layouts that fit at
  one width overflow at another.

`.pg-base` must sit on a *descendant* of the query container: an element cannot
query itself, so `100cqw` read on the container resolves against the viewport
rather than the book. That one detail cost an afternoon.

### Scaling

The hero is one stage with `container-type: inline-size`; every measurement
inside is in `cqw`, so the type, rules, shelf and plinth grow and shrink
together rather than each resizing on its own terms. The stage width is capped
against the viewport height (`calc(100svh * 1.66 - 12px)`), derived from the
composition's own geometry (its height is about 0.59 × its width plus the
fixed header clearance), so the whole scene, plinth included, lands inside the
window at any shape. Where the stage is narrower than the window the room
simply continues around it; there is no fade or band at the boundary, which is
what produced the double-gradient seam.

Nothing is tied to viewport height directly, that is what made the title jump
about when the window changed shape.

The entrance is a CSS animation, not a JS one: the masthead must never depend
on hydration to become visible.

### The spread

`src/components/BookSpread.tsx`. Two live pages positioned over the open-book
photograph. Type inside a page is sized against `--ps`, a reference width that
tracks the book itself (`100cqw`) on desktop and is pinned to `1020px` on a
mobile leaf, so proportions hold in both. The scale classes are `.pg-title`,
`.pg-label`, `.pg-sub`, `.pg-body`, `.pg-small`, `.pg-tiny`.

Below `lg` the photograph is dropped and the same two pages become loose
parchment leaves.

---

## Adding content

**Gallery plates**, `src/components/gallery/Plates.tsx`. The opened plate is
sent to `document.body` with a portal: the wall it hangs on sits inside a
`z-30` stacking context, so a lightbox rendered in place is trapped underneath
the navigation bar and its close button cannot be clicked. A plate still
waiting on its artwork carries `pending: true` and is struck with a maroon
*coming soon*; drop that line along with the parchment `src` when the real
plate arrives. Replace each `src`
with the real artwork and give it a real `caption`. The plates stand in a rack
on the desk rather than a scrolling grid: one is up at a time, its neighbours
lean away, and you move along with the arrows, the dots, the keyboard, or by
picking up a neighbour. Clicking the raised plate holds it up to the light.

**Work chapters**, `src/components/work/chapters.ts`. Each chapter holds a
run of `projects`, and each project is set out the same way: the need behind
it, the role in making it, the outcome, the tools, and the samples. The chapter
opens **full screen and scrolling** (`components/work/ChapterPage.tsx`) with a
ruled page break between pieces, and any sample can be clicked to enlarge.

The chapter is set as a **scroll**. It is held against the dark of the room,
its sheet torn down both long sides. The deckle is an SVG mask built once from
a seeded generator, so the tear is identical on the server and in the browser,
and it is a run of straight segments with the odd deeper bite, because torn
paper is angular rather than wavy. Opening a chapter drops it: one wrapper's
height goes 0 → 100% and the weighted rod rides its foot down the window. After
that, reading pays the parchment out: the roll at the foot thins away as the
roll at the head builds up. Both rods take their thickness from one scroll
handler writing `--roll-head` / `--roll-foot` on the dialog, so there is no
per-frame layout work. The chapter's own title page carries the title, the
standfirst and the count only; audience and role belong to each piece, which
states its own.

A project with no `samples` still lays out correctly. The page draws empty
plate mounts in their place, so a piece can be listed before its artwork
exists. Copy in that file is a first draft written against the artefacts; the
ones still marked "Placeholder" are waiting on Isha.

Sample images live in `public/assets/work/<project-id>/`, exported from
`../Work Samples`, capped at 1600px wide and encoded as WebP.

**The headshot**, `<HeadshotMount />` heads the About verso. The photograph is
a print with its own deckled border, cut out of its white ground so it lies on
the page; the component drops its own ruled frame when a `src` is given, since
a frame around a frame reads as a mistake. With no `src` it draws the empty
plate instead.

**Volumes / navigation**, `src/data/volumes.ts` is the single source for nav
labels, spine text, emblems and each volume's slot on the shelf. Contact
details live in `SITE` at the bottom of the same file.

**Deploy**, every push to `main` runs `.github/workflows/deploy.yml`, which
builds the static export and publishes it to GitHub Pages at
<https://ishashah0309.github.io>. Pages must be set to **Source: GitHub
Actions** in the repository settings. `sitemap.xml` and `robots.txt` default to
that URL; set the `NEXT_PUBLIC_SITE_URL` Actions variable to override it if the
site ever moves to its own domain.

---

## Source resolution

Everything here is limited by the Canva **PDF** export, which downsamples
placed images: the bookcase arrives at 1249×717 and the open book at 1527×1205.
Assets are supersampled 2× on export and served unoptimised (see
`next.config.ts`) so nothing is degraded further, but no amount of processing
adds detail that is not in the file.

To improve it, re-export from Canva as **PNG at 3×** (Download → PNG → Size 3×,
plus *Transparent background* when exporting a single element on its own page).
Then re-run `tools/build_shelf.py` against it.

## Checking it

`src` has no test runner. The layouts are checked by measurement. Load the
site, open the console and run an iframe sweep: size an iframe to each target
viewport, load each route, **finish every animation first** (an offscreen
iframe throttles them, and an unsettled `translateY` reads as overflow), then
compare `documentElement.scrollHeight` with the iframe height and each book
page's `scrollHeight` with its box.

Last swept clean at 320×568, 360×740, 390×844, 430×932, 768×1024, 1024×768,
1280×720, 1366×768, 1440×900, 1536×864, 1600×900, 1680×1050, 1920×1080 and
2560×1330, every route, no overflow, no clipped text.

## Details worth keeping

- The process rail on Approach is a timeline, so it reads as one continuous
  run: resting on a stage inks the line from the first stage down to that one
  and fills every node it passes. Each stage's length of line runs to the
  *next* node, gap included, and `:has(~ .rail-step:hover)` reaches back up the
  list. A stage that can only light its own length shows as a lit segment
  floating between two unlit gaps, which reads as a broken line.
- `prefers-reduced-motion` disables the dust field and the page turn, and
  collapses the entrance animations.
- Nothing drifts or sways: every object is fixed in its scene. There is no
  pointer parallax anywhere.
- Home is one screen and one decision: the shelf, nothing below it.
- There is no wax volume stamp on the spreads, and the maroon bookmark lies
  *on* the page rather than over its top edge.
- The arrows beside the book turn to the next volume in the book. Past the last
  spread, Work hands on to the gallery, which is not a book, so that one is
  walked to rather than turned to, with no page-turn animation.
- Nothing on a page stages itself in. Entrance animations are for the room, not
  for a list of five principles.
- No page sounds and no dev badge (`devIndicators: false`).
- Every route is statically prerendered.
