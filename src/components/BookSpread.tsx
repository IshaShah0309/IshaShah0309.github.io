"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { VOLUMES, bySlug, type Volume } from "@/data/volumes";
import { Ribbon } from "@/components/Ornament";
import {
  Atmosphere,
  Desk,
  DESK_VAR,
  Ivy,
  Lamp,
  NAV,
  Room,
  StandingVolume,
} from "@/components/RoomScene";

type Props = {
  volume: Volume;
  left: React.ReactNode;
  right: React.ReactNode;
  /** Reverse the order on mobile when the right page is the introduction. */
  mobileRightFirst?: boolean;
};

/**
 * Only the three volumes that are actually a book spread. The arrows turn
 * pages within the book, and at the front of it there is simply no arrow.
 * At the back, Work hands on to the gallery, which is not a spread, so it
 * is walked to rather than turned to.
 */
const SPREADS = ["/about", "/approach", "/work"];
const CHAPTERS = VOLUMES.filter((v) => SPREADS.includes(v.slug));

const BOOK_RATIO = 1527 / 1205;

/** The height the desk and the header leave for the book. */
const BOOK_H = `calc(100svh - ${NAV}px - var(--desk) - 14px)`;
const BOOK_W = `min(62vw, calc(${BOOK_H} * ${BOOK_RATIO}))`;
/** Whichever of the two actually binds, the closed volume matches it. */
const OPEN_H = `min(${BOOK_H}, calc(62vw / ${BOOK_RATIO}))`;

export default function BookSpread({
  volume,
  left,
  right,
  mobileRightFirst = false,
}: Props) {
  const router = useRouter();
  const calm = useReducedMotion();
  const [turning, setTurning] = useState<"next" | "prev" | null>(null);

  const idx = CHAPTERS.findIndex((v) => v.slug === volume.slug);
  const prev = idx > 0 ? CHAPTERS[idx - 1] : null;
  const inBook = idx >= 0 && idx < CHAPTERS.length - 1 ? CHAPTERS[idx + 1] : null;
  /** Past the last spread the next volume is the gallery, which is no book. */
  const onward = idx === CHAPTERS.length - 1 ? bySlug("/gallery") ?? null : null;
  const next = inBook ?? onward;

  const turn = useCallback(
    (dir: "next" | "prev", slug: string) => {
      if (turning) return;
      if (calm) {
        router.push(slug);
        return;
      }
      setTurning(dir);
      window.setTimeout(() => router.push(slug), 640);
    },
    [turning, calm, router],
  );

  const spineArt = `/assets/shelf/book-${idx + 2}.webp`;

  return (
    <section
      className="relative min-h-[100svh] w-full overflow-hidden bg-forest pb-20 pt-[76px] lg:h-[100svh] lg:pb-0 lg:pt-0"
      style={DESK_VAR}
    >
      <Room />

      {/* ── the scene ────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        <Ivy />
        <StandingVolume volume={volume} art={spineArt} height={OPEN_H} />
        <Desk />
        <Lamp height="min(30svh, 21vw)" />
      </div>

      {/* ── the book, resting on the desk ────────────────────── */}
      <div
        className="absolute left-1/2 z-30 hidden -translate-x-1/2 lg:block"
        style={{ bottom: "var(--desk)", width: BOOK_W }}
      >
        {/* where it meets the wood */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-[4%] -bottom-3 h-8 rounded-[50%] blur-xl"
          style={{ background: "rgba(4,9,6,0.72)" }}
        />

        <div className="relative [perspective:2400px]">
          <div className="cq pg pg-cq relative w-full">
            <Image
              src="/assets/paper/book-open.webp"
              alt=""
              aria-hidden
              priority
              width={1527}
              height={1205}
              className="drag-none h-auto w-full select-none drop-shadow-[0_34px_44px_rgba(0,0,0,0.6)]"
            />

            <Ribbon className="absolute left-[10.5%] top-[3.6%] z-20 w-[3.5%] drop-shadow-[0_5px_6px_rgba(0,0,0,0.45)]" />


            {/* verso */}
            <div className="absolute left-[6.4%] top-[4.6%] z-10 h-[90.5%] w-[40.2%] overflow-hidden">
              <PageBody>{left}</PageBody>
            </div>

            {/* recto */}
            <div className="absolute left-[50.9%] top-[4.6%] z-10 h-[90.5%] w-[37.4%] overflow-hidden">
              <PageBody>{right}</PageBody>
            </div>

            {/* the leaf that lifts as you turn to another volume */}
            <AnimatePresence>
              {turning && (
                <motion.div
                  key={turning}
                  aria-hidden
                  className="absolute top-[3%] z-40 h-[94%] w-[44%] origin-left"
                  style={{
                    left: turning === "next" ? "50%" : "6%",
                    transformOrigin:
                      turning === "next" ? "left center" : "right center",
                    transformStyle: "preserve-3d",
                    backgroundImage: "url(/assets/paper/paper-md.webp)",
                    backgroundSize: "cover",
                    boxShadow: "0 0 60px rgba(0,0,0,0.5)",
                  }}
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: turning === "next" ? -172 : 172 }}
                  transition={{ duration: 0.66, ease: [0.65, 0.05, 0.36, 1] }}
                />
              )}
            </AnimatePresence>
          </div>
        </div>

        {prev && (
          <TurnButton
            side="left"
            label={`Turn back to ${prev.standing.join(" ")}`}
            numeral={prev.numeral}
            title={prev.standing.join(" ")}
            onClick={() => turn("prev", prev.slug)}
          />
        )}
        {next && (
          <TurnButton
            side="right"
            label={
              onward
                ? `Go on to ${next.standing.join(" ")}`
                : `Turn on to ${next.standing.join(" ")}`
            }
            numeral={next.numeral}
            title={next.standing.join(" ")}
            onClick={() =>
              onward ? router.push(onward.slug) : turn("next", next.slug)
            }
          />
        )}
      </div>

      <div className="hidden lg:block">
        <Atmosphere />
      </div>

      {/* ── phones and tablets: the same pages, as loose leaves ─ */}
      <div className="relative z-30 mx-auto w-full max-w-[560px] px-4 lg:hidden">
        <header className="mb-6 flex flex-col items-center gap-2 text-center">
          <span className="eyebrow text-[10px] text-gold">{volume.numeral}</span>
          <h1 className="font-display text-[30px] leading-[1.08] text-gold-bright sm:text-[38px]">
            {volume.standing.join(" ")}
          </h1>
          <span
            aria-hidden
            className="block h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent"
          />
        </header>

        <div className="flex flex-col gap-5">
          {(mobileRightFirst ? [right, left] : [left, right]).map((side, i) => (
            <Leaf key={i}>{side}</Leaf>
          ))}
        </div>

        <nav className="mt-8 flex items-stretch justify-between gap-3">
          {prev ? (
            <MobileTurn
              dir="prev"
              v={prev}
              onClick={() => turn("prev", prev.slug)}
            />
          ) : (
            <span />
          )}
          {next ? (
            <MobileTurn
              dir="next"
              v={next}
              onClick={() =>
                onward ? router.push(onward.slug) : turn("next", next.slug)
              }
            />
          ) : (
            <span />
          )}
        </nav>
      </div>
    </section>
  );
}

/* ── page interior ────────────────────────────────────────── */

function PageBody({ children }: { children: React.ReactNode }) {
  return (
    <div data-lenis-prevent className="pg-base h-full w-full overflow-y-auto px-[6%] py-[3.5%] [scrollbar-width:thin] [scrollbar-color:rgba(128,0,0,0.35)_transparent]">
      {children}
    </div>
  );
}

/** A single loose parchment leaf, the mobile stand-in for a page. */
function Leaf({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="pg relative overflow-hidden rounded-[3px] px-5 py-6 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.85)] sm:px-7 sm:py-8"
      style={{
        backgroundImage: "url(/assets/paper/paper-md.webp)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="pg-base relative">{children}</div>
    </div>
  );
}

/* ── turn controls ────────────────────────────────────────── */

/**
 * The page-turn, set outside the paper. It names the volume it turns to, so
 * it reads as leafing on through the archive rather than as a stray control.
 */
function TurnButton({
  side,
  label,
  numeral,
  title,
  onClick,
}: {
  side: "left" | "right";
  label: string;
  numeral: string;
  title: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`group pointer-events-auto absolute top-1/2 z-40 flex -translate-y-1/2 flex-col items-center gap-2 ${
        side === "left" ? "-left-[4.6vw]" : "-right-[4.6vw]"
      }`}
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/35 text-gold transition-all duration-500 group-hover:border-gold-bright group-hover:bg-gold/10 group-hover:text-gold-bright">
        <svg
          viewBox="0 0 24 24"
          className={`h-4 w-4 transition-transform duration-500 ${
            side === "left"
              ? "group-hover:-translate-x-1"
              : "rotate-180 group-hover:translate-x-1"
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
        >
          <path d="M15 5 8 12l7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span
        className={`pointer-events-none absolute top-full mt-2 flex w-[9rem] flex-col items-center gap-0.5 text-center opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${
          side === "left" ? "right-0 items-end text-right" : "left-0 items-start text-left"
        }`}
      >
        <span className="eyebrow text-[8.5px] text-gold/60">{numeral}</span>
        <span className="font-display text-[13px] leading-tight text-cream/80">
          {title}
        </span>
      </span>
    </button>
  );
}

function MobileTurn({
  dir,
  v,
  onClick,
}: {
  dir: "prev" | "next";
  v: Volume;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-w-0 flex-1 flex-col gap-1 border border-gold/20 px-4 py-3 transition-colors hover:border-gold/55 ${
        dir === "next" ? "items-end text-right" : "items-start text-left"
      }`}
    >
      <span className="eyebrow text-[9px] text-gold/70">
        {dir === "next" ? "Next" : "Previous"} · {v.numeral}
      </span>
      <span className="font-display truncate text-[17px] leading-tight text-cream">
        {v.standing.join(" ")}
      </span>
    </button>
  );
}
