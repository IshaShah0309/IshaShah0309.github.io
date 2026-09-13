"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";

export type Plate = {
  id: string;
  /** Swap for the finished artwork; the parchment stands in until then. */
  src: string;
  caption: string;
  /** Sheet proportion, so the hang has the variety of a real wall. */
  ratio: number;
  /**
   * The artwork is still to come, so the sheet is stamped. Drop this line
   * along with the parchment `src` when the real plate arrives.
   */
  pending?: boolean;
};

/**
 * Nine plates hung on the wall. Clicking one opens it out full screen, where
 * it can be read, scrolled if it is tall, and stepped through with the
 * arrows or the keyboard.
 */
export const PLATES: Plate[] = [
  {
    id: "p1",
    src: "/assets/paper/paper-sm.webp",
    caption: "Plate I",
    ratio: 0.74,
    pending: true,
  },
  {
    id: "p2",
    src: "/assets/paper/paper-md.webp",
    caption: "Plate II",
    ratio: 0.66,
    pending: true,
  },
  {
    id: "p3",
    src: "/assets/paper/paper-lg.webp",
    caption: "Plate III",
    ratio: 0.82,
    pending: true,
  },
  {
    id: "p4",
    src: "/assets/paper/paper-md.webp",
    caption: "Plate IV",
    ratio: 0.69,
    pending: true,
  },
  {
    id: "p5",
    src: "/assets/paper/paper-lg.webp",
    caption: "Plate V",
    ratio: 0.78,
    pending: true,
  },
  {
    id: "p6",
    src: "/assets/paper/paper-sm.webp",
    caption: "Plate VI",
    ratio: 0.71,
    pending: true,
  },
  {
    id: "p7",
    src: "/assets/paper/paper-md.webp",
    caption: "Plate VII",
    ratio: 0.85,
    pending: true,
  },
  {
    id: "p8",
    src: "/assets/paper/paper-sm.webp",
    caption: "Plate VIII",
    ratio: 0.68,
    pending: true,
  },
  {
    id: "p9",
    src: "/assets/paper/paper-lg.webp",
    caption: "Plate IX",
    ratio: 0.76,
    pending: true,
  },
];

export default function Plates({ height }: { height: string }) {
  const [open, setOpen] = useState<number | null>(null);
  /** False through the server render and the first client render. */
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const step = useCallback(
    (d: number) =>
      setOpen((i) =>
        i === null ? i : (i + d + PLATES.length) % PLATES.length,
      ),
    [],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, step]);

  return (
    <>
      {/* ── the wall ─────────────────────────────────────────── */}
      {/*
        Height-driven: each row fills half the box and every sheet takes its
        width from its own proportion, so the hang always fits the wall it is
        given and stays centred on it.
      */}
      <div
        className="hidden w-full flex-col justify-center gap-[1.6%] lg:flex"
        style={{ height }}
      >
        {[PLATES.slice(0, 5), PLATES.slice(5)].map((row, r) => (
          <div
            key={r}
            className="flex min-h-0 flex-1 items-center justify-center gap-[1.4%]"
          >
            {row.map((p) => (
              <Sheet
                key={p.id}
                plate={p}
                onOpen={() => setOpen(PLATES.indexOf(p))}
                className="h-full"
                style={{ aspectRatio: String(p.ratio) }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* the same hang, two up, on phones */}
      <div className="grid grid-cols-2 gap-3 lg:hidden">
        {PLATES.map((p, i) => (
          <Sheet
            key={p.id}
            plate={p}
            onOpen={() => setOpen(i)}
            className="w-full"
            style={{ aspectRatio: String(p.ratio) }}
          />
        ))}
      </div>

      {/*
        The plate, opened out. It is sent to the body: the wall it hangs on
        sits in a z-30 stacking context, so a lightbox rendered in place is
        trapped beneath the navigation bar and its close button cannot be
        clicked.
      */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {open !== null && (
              <motion.div
                className="fixed inset-0 z-[85]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.28 }}
                role="dialog"
                aria-modal="true"
                aria-label={PLATES[open].caption}
              >
                <div
                  aria-hidden
                  className="absolute inset-0 bg-forest-deep/95 backdrop-blur"
                />

                <div
                  data-lenis-prevent
                  className="relative h-full w-full overflow-y-auto overscroll-contain px-4 py-20 sm:px-20"
                >
                  <motion.figure
                    key={PLATES[open].id}
                    initial={{ opacity: 0, scale: 0.95, y: 18 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="mx-auto w-fit max-w-[min(94vw,940px)]"
                  >
                    <span className="relative block">
                      <Image
                        src={PLATES[open].src}
                        alt={PLATES[open].caption}
                        width={1100}
                        height={1500}
                        className="drag-none block h-auto w-auto max-w-full select-none shadow-[0_50px_90px_-30px_rgba(0,0,0,0.95)]"
                      />
                      {PLATES[open].pending && <ComingSoon size="clamp(1.4rem, 6vw, 2.6rem)" />}
                    </span>
                    <figcaption className="mt-5 flex items-center justify-center gap-4">
                      <span className="eyebrow text-[10px] text-gold">
                        {PLATES[open].caption}
                      </span>
                      <span className="text-[11px] text-cream/45">
                        {open + 1} / {PLATES.length}
                      </span>
                    </figcaption>
                  </motion.figure>
                </div>

                <Arrow side="left" onClick={() => step(-1)} />
                <Arrow side="right" onClick={() => step(1)} />

                <button
                  type="button"
                  onClick={() => setOpen(null)}
                  aria-label="Close the plate"
                  className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-gold/35 bg-forest-deep/70 text-gold backdrop-blur transition-colors hover:border-gold-bright hover:bg-gold/10 sm:right-8 sm:top-8"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    fill="none"
                  >
                    <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
                  </svg>
                </button>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}

/**
 * The stamp that says a sheet is still to come, struck across the plate in
 * maroon, at an angle, the way a stamp lands on paper rather than the way a
 * label is placed on a page.
 */
function ComingSoon({ size }: { size: string }) {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
    >
      <span
        className="flex -rotate-[13deg] flex-col items-center gap-[0.26em] border-[0.14em] border-double border-maroon/75 px-[1.05em] py-[0.5em] text-maroon/85"
        style={{
          fontSize: size,
          boxShadow: "inset 0 0 0 1px rgba(128,0,0,0.28)",
          filter: "drop-shadow(0 1px 0 rgba(255,247,226,0.35))",
        }}
      >
        <span className="eyebrow block text-[0.62em] leading-none !tracking-[0.3em]">
          Coming
        </span>
        <span className="font-display block text-[1.16em] uppercase leading-none !tracking-[0.14em]">
          Soon
        </span>
      </span>
    </span>
  );
}

/** A single sheet on the wall. */
function Sheet({
  plate,
  onOpen,
  className = "",
  style,
}: {
  plate: Plate;
  onOpen: () => void;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Open ${plate.caption}`}
      className={`group relative block shrink-0 overflow-hidden outline-none transition-transform duration-[700ms] ease-[var(--ease-vellum)] hover:-translate-y-1.5 hover:rotate-[-0.6deg] focus-visible:ring-2 focus-visible:ring-gold ${className}`}
      style={{
        boxShadow: "0 20px 34px -18px rgba(0,0,0,0.95)",
        containerType: "inline-size",
        ...style,
      }}
    >
      <Image
        src={plate.src}
        alt={plate.caption}
        width={555}
        height={763}
        className="drag-none h-full w-full select-none object-cover transition-transform duration-[1100ms] group-hover:scale-[1.06]"
      />
      {plate.pending && <ComingSoon size="clamp(0.5rem, 11cqw, 1.5rem)" />}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 border border-gold/0 transition-colors duration-500 group-hover:border-gold/60"
      />
      <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-forest-deep/95 to-transparent px-3 pb-2 pt-7 text-left transition-transform duration-500 group-hover:translate-y-0">
        <span className="eyebrow block text-[9px] text-gold">
          {plate.caption}
        </span>
      </span>
    </button>
  );
}

function Arrow({
  side,
  onClick,
}: {
  side: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === "left" ? "Previous plate" : "Next plate"}
      className={`absolute top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-gold/30 bg-forest-deep/70 text-gold backdrop-blur transition-colors hover:border-gold-bright hover:bg-gold/10 ${
        side === "left" ? "left-3 sm:left-8" : "right-3 sm:right-8"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        className={`h-4 w-4 ${side === "right" ? "rotate-180" : ""}`}
        stroke="currentColor"
        strokeWidth="1.4"
        fill="none"
      >
        <path d="M15 5 8 12l7 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
