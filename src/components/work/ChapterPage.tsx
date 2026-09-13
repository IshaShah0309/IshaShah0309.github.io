"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { motion, useReducedMotion } from "motion/react";
import type { Chapter, Project, Sample } from "./chapters";

/** How long the scroll takes to drop open. */
const UNFURL = "height 1150ms cubic-bezier(0.22, 1, 0.32, 1)";

/**
 * The deckle down the two long sides of the sheet.
 *
 * Torn paper is angular, not wavy, so the edge is a run of straight segments
 * with an occasional deeper bite out of it. It is built once, from a seeded
 * generator, so the markup is identical on the server and in the browser.
 */
const TORN = (() => {
  let seed = 0x51ed270b;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 0x100000000;
  };

  const H = 1000;
  const STEP = 9;
  const edge = (nominal: number, dir: 1 | -1) => {
    const pts: string[] = [];
    for (let y = 0; y <= H; y += STEP) {
      const bite = rand() < 0.08 ? 1.9 : 0;
      const x = nominal + dir * (rand() * 1.5 + bite);
      pts.push(`${x.toFixed(2)},${y}`);
    }
    return pts;
  };

  const left = edge(2.1, 1);
  const right = edge(97.9, -1).reverse();
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 ${H}" ` +
    `preserveAspectRatio="none"><polygon fill="#fff" points="` +
    `${left.join(" ")} ${right.join(" ")}"/></svg>`;

  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
})();

/**
 * A chapter opened out full screen, the whole window becomes the leaf, and it
 * scrolls. Each project is set out the same way and separated by a ruled page
 * break, so the chapter reads as a run of work rather than one case study.
 *
 * Every piece of a project is optional. A project can lead with a video, a
 * pair of plates side by side, or a portrait sheet; it can open with an
 * overview instead of a stated need; and it can drop the samples section
 * entirely when the cover is the whole of the work.
 */
export default function ChapterPage({
  chapter,
  onClose,
}: {
  chapter: Chapter;
  onClose: () => void;
}) {
  const [lightbox, setLightbox] = useState<Sample | null>(null);
  const [unfurled, setUnfurled] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);
  const shell = useRef<HTMLDivElement>(null);
  const calm = useReducedMotion();

  /* The scroll drops open on the frame after it mounts. */
  useEffect(() => {
    const id = requestAnimationFrame(() => setUnfurled(true));
    return () => cancelAnimationFrame(id);
  }, []);

  /** Reduced motion skips the drop and has it open already. */
  const dropped = calm || unfurled;

  /**
   * The scroll. Reading is paying the parchment out: the roll at the foot of
   * the page thins as the roll at the head thickens, so the chapter unrolls
   * between the two rods the way a messenger's list would.
   */
  const roll = useCallback(() => {
    const s = scroller.current;
    const el = shell.current;
    if (!s || !el) return;
    const span = s.scrollHeight - s.clientHeight;
    const p = span > 8 ? Math.min(1, Math.max(0, s.scrollTop / span)) : 1;
    el.style.setProperty("--roll-head", `${(4 + 34 * p).toFixed(2)}px`);
    el.style.setProperty("--roll-foot", `${(38 - 34 * p).toFixed(2)}px`);
    el.style.setProperty("--roll-foot-o", (1 - p * p).toFixed(3));
    el.style.setProperty("--roll-head-o", Math.min(1, p * 6).toFixed(3));
  }, []);

  useEffect(() => {
    const s = scroller.current;
    if (!s) return;
    /* the head roll stays thick while the scroll drops, then settles */
    const settle = window.setTimeout(roll, calm ? 0 : 1150);
    let queued = false;
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        roll();
      });
    };
    s.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", roll);
    return () => {
      window.clearTimeout(settle);
      s.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", roll);
    };
  }, [roll, calm]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (lightbox) setLightbox(null);
      else onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose, lightbox]);

  return (
    <motion.div
      className="fixed inset-0 z-[80]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.32 }}
      role="dialog"
      aria-modal="true"
      aria-label={`${chapter.roman}: ${chapter.title}`}
      ref={shell}
      style={{ "--roll-head": "26px", "--roll-foot": "38px" } as CSSProperties}
    >
      {/* the ground the scroll is held against */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(130% 95% at 50% 0%, #16241a 0%, #0b160d 58%, #050d07 100%)",
        }}
      />

      {/* the scroll, paying out downward */}
      <div
        className="absolute inset-x-0 top-0 overflow-hidden"
        style={{
          height: dropped ? "100%" : "0%",
          transition: calm ? "none" : UNFURL,
        }}
      >
        <div className="relative h-[100svh] w-full">
          {/* the sheet, torn down both sides */}
          <div
            aria-hidden
            className="absolute inset-y-0 left-1/2 w-[min(100%-14px,1240px)] -translate-x-1/2"
            style={{
              background: [
                "radial-gradient(90% 60% at 12% 0%, rgba(255,252,240,0.65), transparent 62%)",
                "radial-gradient(80% 55% at 88% 8%, rgba(255,247,224,0.45), transparent 60%)",
                "linear-gradient(180deg,#f2e7cd 0%,#ece0c2 42%,#e4d5b1 100%)",
              ].join(","),
              WebkitMaskImage: TORN,
              maskImage: TORN,
              WebkitMaskSize: "100% 100%",
              maskSize: "100% 100%",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              filter: "drop-shadow(0 0 22px rgba(0,0,0,0.55))",
            }}
          />

          <div
            ref={scroller}
            data-lenis-prevent
            className="pg relative h-full w-full overflow-y-auto overscroll-contain"
          >
            <div className="pg-base mx-auto w-full max-w-[1060px] px-7 pb-36 pt-28 sm:px-12 lg:px-16">
              <header>
                <p className="pg-label !tracking-[0.24em]">{chapter.roman}</p>
                <h1 className="pg-title mt-[0.3em] !text-[calc(var(--ps)*0.052)]">
                  {chapter.title}
                </h1>
                <div className="pg-rule mt-[0.6em] w-[34%]" />
                {/* set to the full measure of the leaf, so it does not turn early */}
                <p className="pg-body mt-[1em] w-full !text-[calc(var(--ps)*0.0195)] !leading-[1.5]">
                  {chapter.summary}
                </p>
                <p className="pg-tiny mt-[1.4em]">
                  {chapter.projects.length} pieces in this chapter
                </p>
              </header>

              {chapter.projects.map((p, i) => (
                <ProjectSection
                  key={p.id}
                  project={p}
                  index={i}
                  onOpenSample={setLightbox}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* the rod the scroll hangs from, and the weighted one it pays out to */}
      <Rod where="head" />
      <div
        className="pointer-events-none absolute inset-x-0 top-0"
        style={{
          height: dropped ? "100%" : "0%",
          transition: calm ? "none" : UNFURL,
        }}
      >
        <Rod where="foot" />
      </div>

      <button
        type="button"
        onClick={onClose}
        aria-label="Close the chapter"
        className="fixed right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-maroon/35 bg-[#efe3c6]/90 text-maroon backdrop-blur transition-all duration-400 hover:border-maroon hover:bg-maroon hover:text-[#efe3c6] sm:right-8 sm:top-7"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        >
          <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
        </svg>
      </button>

      {lightbox && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setLightbox(null)}
            className="absolute inset-0 cursor-default bg-[#1a1408]/90 backdrop-blur"
          />
          <figure className="relative max-h-[88svh] w-fit max-w-[min(94vw,1200px)]">
            <Image
              src={lightbox.src}
              alt={lightbox.caption}
              width={1600}
              height={900}
              className="drag-none block h-auto max-h-[78svh] w-auto max-w-full select-none object-contain shadow-[0_40px_80px_-24px_rgba(0,0,0,0.9)]"
            />
            <figcaption className="mt-4 text-center text-[12px] text-[#efe3c6]/80">
              {lightbox.caption}
            </figcaption>
          </figure>
        </motion.div>
      )}
    </motion.div>
  );
}

/* ── one piece of work ────────────────────────────────────── */

function ProjectSection({
  project,
  index,
  onOpenSample,
}: {
  project: Project;
  index: number;
  onOpenSample: (s: Sample) => void;
}) {
  const covers = project.covers ?? (project.cover ? [project.cover] : []);
  const rest = project.samples.filter((s) => !covers.includes(s.src));
  const showSamples = project.hideSamples !== true;
  const placeholders: Sample[] =
    project.placeholderCaptions?.map((c) => ({ src: "", caption: c })) ??
    DEFAULT_PLACEHOLDERS;

  return (
    <section className="mt-[6.2em] first:mt-[4.4em]">
      <PageBreak index={index} />

      <header className="mt-[3.2em]">
        <p className="pg-tiny">{project.org}</p>
        <h2 className="pg-title mt-[0.3em] !text-[calc(var(--ps)*0.038)]">
          {project.title}
        </h2>
        <div className="pg-rule mt-[0.5em] w-[28%]" />
      </header>

      {/* ── the headline piece ───────────────────────────────── */}
      <div className="mt-[1.6em]">
        {project.coverVideo ? (
          <figure className="relative w-full">
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 z-10 border border-[#8a6a2e]/50"
              style={{ boxShadow: "0 8px 24px -12px rgba(70,50,16,0.55)" }}
            />
            <video
              src={project.coverVideo}
              controls
              playsInline
              preload="metadata"
              className="block h-auto w-full bg-[#1a1408]"
            />
          </figure>
        ) : covers.length > 1 ? (
          <div className="grid gap-[1.1em] sm:grid-cols-2">
            {covers.map((src, i) => (
              <Plate
                key={src}
                src={src}
                caption={project.coverCaptions?.[i] ?? project.title}
                className={
                  project.coverPortrait ? "aspect-[3/4]" : "aspect-[4/3]"
                }
                onOpen={() =>
                  onOpenSample({
                    src,
                    caption: project.coverCaptions?.[i] ?? project.title,
                  })
                }
              />
            ))}
          </div>
        ) : (
          <Plate
            src={covers[0]}
            caption={project.coverCaptions?.[0] ?? project.title}
            className={
              project.coverPortrait
                ? "mx-auto aspect-[3/4] max-w-[440px]"
                : "aspect-[16/9]"
            }
            onOpen={
              covers[0]
                ? () =>
                    onOpenSample({
                      src: covers[0],
                      caption: project.coverCaptions?.[0] ?? project.title,
                    })
                : undefined
            }
          />
        )}
      </div>

      {/* ── the write-up ─────────────────────────────────────── */}
      <div className="mt-[2em] grid gap-[2em] md:grid-cols-2">
        <div>
          {project.overview ? (
            <>
              <h3 className="pg-label">Project overview</h3>
              <div className="pg-rule mt-[0.45em] w-[40%]" />
              <p className="pg-body mt-[0.9em] !leading-[1.5]">
                {project.overview}
              </p>
            </>
          ) : (
            project.need && (
              <>
                <h3 className="pg-label">The need</h3>
                <div className="pg-rule mt-[0.45em] w-[40%]" />
                <p className="pg-body mt-[0.9em] !leading-[1.5]">
                  {project.need}
                </p>
              </>
            )
          )}

          {project.outcome && (
            <>
              <h3 className="pg-label mt-[1.8em]">The outcome</h3>
              <div className="pg-rule mt-[0.45em] w-[40%]" />
              <p className="pg-body mt-[0.9em] !leading-[1.5]">
                {project.outcome}
              </p>
            </>
          )}
        </div>

        <div>
          {project.role.length > 0 && (
            <>
              <h3 className="pg-label">My role</h3>
              <div className="pg-rule mt-[0.45em] w-[40%]" />
              <ul className="mt-[0.9em] space-y-[0.6em]">
                {project.role.map((r) => (
                  <li
                    key={r}
                    className="pg-body flex items-start gap-[0.6em] !leading-[1.45]"
                  >
                    <span
                      aria-hidden
                      className="mt-[0.55em] block h-[0.34em] w-[0.34em] shrink-0 rotate-45 bg-maroon/70"
                    />
                    {r}
                  </li>
                ))}
              </ul>
            </>
          )}

          <h3 className="pg-label mt-[1.8em]">Tools used</h3>
          <div className="pg-rule mt-[0.45em] w-[40%]" />
          <ul className="mt-[0.9em] flex flex-wrap gap-[0.45em]">
            {project.tools.map((t) => (
              <li
                key={t}
                className="pg-tiny rounded-full border border-maroon/30 px-[1em] py-[0.4em] !tracking-[0.1em]"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── the samples ──────────────────────────────────────── */}
      {showSamples && (
        <div className="mt-[2.2em]">
          <h3 className="pg-label">
            {project.samplesLabel ?? "Samples from this design"}
          </h3>
          <div className="pg-rule mt-[0.45em] w-[24%]" />
          <div
            className={`mt-[1.1em] grid gap-[1.1em] sm:grid-cols-2 ${
              project.sampleColumns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-3"
            }`}
          >
            {(rest.length ? rest : placeholders).map((s, i) => (
              <Plate
                key={s.src || `ph-${i}`}
                src={s.src || undefined}
                caption={s.caption}
                className={
                  project.samplePortrait ? "aspect-[3/4]" : "aspect-[4/3]"
                }
                onOpen={s.src ? () => onOpenSample(s) : undefined}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

const DEFAULT_PLACEHOLDERS: Sample[] = [
  { src: "", caption: "Sample to come" },
  { src: "", caption: "Sample to come" },
  { src: "", caption: "Sample to come" },
];

/**
 * The rule between two pieces of work, with the piece's number set large
 * enough to be read at a glance as you scroll past it.
 */
function PageBreak({ index }: { index: number }) {
  return (
    <div aria-hidden className="flex items-center gap-[1.1em]">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-maroon/35" />
      <Image
        src="/assets/orn/divider.webp"
        alt=""
        width={225}
        height={20}
        className="drag-none hidden w-[12em] select-none opacity-60 mix-blend-multiply sm:block"
      />
      <span className="flex flex-col items-center gap-[0.3em]">
        <span
          className="font-display leading-none text-maroon/75"
          style={{ fontSize: "calc(var(--ps) * 0.042)" }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="block h-px w-[2.2em] bg-maroon/35" />
      </span>
      <Image
        src="/assets/orn/divider.webp"
        alt=""
        width={225}
        height={20}
        className="drag-none hidden w-[12em] -scale-x-100 select-none opacity-60 mix-blend-multiply sm:block"
      />
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-maroon/35" />
    </div>
  );
}

/**
 * One of the two rods the chapter is wound on. Both are pinned to the window
 * and take their thickness from how far the reader has paid the parchment out
 *, the roll at the foot thins away as the roll at the head builds up.
 */
function Rod({ where }: { where: "head" | "foot" }) {
  const head = where === "head";
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 z-10 flex justify-center ${
        head ? "top-0" : "bottom-0"
      }`}
      style={{
        height: `var(--roll-${where})`,
        opacity: `var(--roll-${where}-o, 1)`,
        transition: "opacity 240ms linear, height 520ms ease-out",
      }}
    >
      <div className="relative h-full w-[min(100%-14px,1240px)]">
        {/* the parchment still on the roll */}
        <div
          className="absolute inset-x-[10px] h-full rounded-[6px] sm:inset-x-5"
          style={{
            background: head
              ? "linear-gradient(180deg,#d9c69a 0%,#f4ead2 26%,#e7d9b4 62%,#c9b489 100%)"
              : "linear-gradient(180deg,#c9b489 0%,#e7d9b4 34%,#f4ead2 72%,#d9c69a 100%)",
            boxShadow: head
              ? "0 10px 18px -8px rgba(52,38,12,0.55), inset 0 -1px 0 rgba(120,92,44,0.35)"
              : "0 -10px 18px -8px rgba(52,38,12,0.55), inset 0 1px 0 rgba(120,92,44,0.35)",
          }}
        />
        {/* the knurled ends of the rod */}
        {["left-0", "right-0"].map((side) => (
          <div
            key={side}
            className={`absolute ${side} top-1/2 h-[calc(100%+9px)] w-[14px] -translate-y-1/2 rounded-full sm:w-[18px]`}
            style={{
              background:
                "linear-gradient(180deg,#6d5326 0%,#b9965a 30%,#d8bc84 46%,#8c6c33 76%,#5f4720 100%)",
              boxShadow: "0 4px 10px -4px rgba(40,28,8,0.7)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/** An image, or the empty mount that stands in its place. */
function Plate({
  src,
  caption,
  className = "",
  onOpen,
}: {
  src?: string;
  caption: string;
  className?: string;
  onOpen?: () => void;
}) {
  const body = (
    <>
      <span
        aria-hidden
        className="absolute inset-0 border border-[#8a6a2e]/50"
        style={{ boxShadow: "0 8px 24px -12px rgba(70,50,16,0.55)" }}
      />
      {src ? (
        <Image
          src={src}
          alt={caption}
          width={1600}
          height={900}
          className="drag-none absolute inset-[6px] h-[calc(100%-12px)] w-[calc(100%-12px)] select-none bg-[#fbf6e8] object-contain"
        />
      ) : (
        <span
          className="absolute inset-[6px] flex flex-col items-center justify-center gap-[0.45em]"
          style={{
            backgroundImage: "url(/assets/paper/paper-sm.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.62,
          }}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-[1.9em] w-[1.9em] text-[#8a6a2e]/70"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.1"
          >
            <rect x="3" y="5" width="18" height="14" rx="1.4" />
            <circle cx="8.6" cy="10" r="1.5" />
            <path d="m4 17 5.2-5 3.4 3.2L16.4 11 20 14.6" />
          </svg>
          <span className="pg-tiny !text-[calc(var(--ps)*0.0105)]">
            {caption}
          </span>
        </span>
      )}
    </>
  );

  if (!onOpen)
    return <figure className={`relative w-full ${className}`}>{body}</figure>;

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Enlarge: ${caption}`}
      className={`group relative block w-full cursor-pointer outline-none transition-transform duration-500 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-maroon/50 ${className}`}
    >
      {body}
      <span className="pointer-events-none absolute inset-x-[6px] bottom-[6px] bg-gradient-to-t from-[#241a08]/80 to-transparent px-[0.8em] pb-[0.5em] pt-[1.4em] text-left opacity-0 transition-opacity duration-400 group-hover:opacity-100">
        <span className="pg-tiny !text-[#f3e7cc] !opacity-100">{caption}</span>
      </span>
    </button>
  );
}
