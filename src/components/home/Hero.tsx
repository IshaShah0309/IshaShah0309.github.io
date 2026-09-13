import Image from "next/image";
import type { CSSProperties } from "react";
import Bookshelf from "@/components/Bookshelf";
import DustField from "@/components/DustField";
import { Divider } from "@/components/Ornament";
import { SITE } from "@/data/volumes";

/**
 * The hero is one composition measured against its own width. Every part of
 * it — the rules, the type, the shelf, the plinth — is a fraction of that
 * width, so the whole thing holds its proportions at any viewport instead of
 * each piece resizing on its own terms.
 *
 * The stage width is capped against the viewport height so the shelf and the
 * plinth stay on screen, and the entrance is CSS, so nothing here depends on
 * hydration to become visible.
 */
export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] w-full items-end justify-center overflow-hidden bg-forest">
      {/* ── the room ─────────────────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 74% at 50% 0%, #1b2c1d 0%, #121d12 46%, #08110a 100%)",
        }}
      />

      <div
        className="relative flex min-h-[100svh] w-full flex-col [container-type:inline-size]"
        style={{
          // Derived from the composition's own geometry: its height is about
          // 0.59 × its width plus the fixed nav clearance, so this is the
          // widest the stage can be and still land inside the viewport.
          maxWidth: "calc(100svh * 1.66 - 22px)",
        }}
      >
        {/* ── masthead ───────────────────────────────────────── */}
        <div className="relative z-20 flex flex-1 flex-col items-center justify-center px-6 pb-[0.7cqw] pt-[52px] text-center md:pt-[56px]">
          {/* The gilt frame, drawn as four rules that fade out rather than a
              rectangle with corners. A hard box is the one shape this room
              does not have anywhere else. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-2 bottom-0 top-[44px] md:inset-x-4 md:top-[48px]"
          >
            <span
              className="absolute inset-x-0 top-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(194,158,91,0.4) 16%, rgba(194,158,91,0.4) 84%, transparent)",
              }}
            />
            <span
              className="absolute inset-x-[5px] top-[5px] h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(194,158,91,0.18) 20%, rgba(194,158,91,0.18) 80%, transparent)",
              }}
            />
            <span
              className="absolute inset-y-0 left-0 w-px"
              style={{
                background:
                  "linear-gradient(180deg, rgba(194,158,91,0.36), rgba(194,158,91,0.12) 54%, transparent 94%)",
              }}
            />
            <span
              className="absolute inset-y-0 right-0 w-px"
              style={{
                background:
                  "linear-gradient(180deg, rgba(194,158,91,0.36), rgba(194,158,91,0.12) 54%, transparent 94%)",
              }}
            />
          </div>

          <DustField className="z-0 opacity-70" />

          <div className="relative z-10 flex flex-col items-center">
            <p
              className="eyebrow rise flex items-center gap-[1.6cqw] text-gold"
              style={
                {
                  fontSize: "clamp(14px, 2.05cqw, 34px)",
                  "--d": "120ms",
                } as CSSProperties
              }
            >
              <span
                aria-hidden
                className="block h-px bg-gold/60"
                style={{ width: "clamp(38px, 4.8cqw, 90px)" }}
              />
              {SITE.owner.toUpperCase()}
              <span
                aria-hidden
                className="block h-px bg-gold/60"
                style={{ width: "clamp(38px, 4.8cqw, 90px)" }}
              />
            </p>

            <h1
              className="font-display rise mt-[0.7cqw] leading-[0.97] tracking-[-0.004em] text-cream"
              style={
                {
                  fontSize: "clamp(1.8rem, 5.35cqw, 6.2rem)",
                  "--d": "240ms",
                } as CSSProperties
              }
            >
              The Learning Archive
            </h1>

            <Divider
              className="rise mt-[0.6cqw]"
              style={
                {
                  width: "clamp(120px, 13cqw, 250px)",
                  "--d": "360ms",
                } as CSSProperties
              }
            />

            <p
              className="text-balance rise mt-[1.1cqw] leading-[1.45] text-cream/88"
              style={
                {
                  fontSize: "clamp(13px, 1.26cqw, 22px)",
                  maxWidth: "clamp(20rem, 40cqw, 46rem)",
                  "--d": "480ms",
                } as CSSProperties
              }
            >
              {SITE.tagline}
            </p>
          </div>
        </div>

        {/* ── the shelf ──────────────────────────────────────── */}
        <div
          className="rise relative z-10 mt-3 w-full shrink-0 md:mt-0"
          style={{ "--d": "560ms" } as CSSProperties}
        >
          <Bookshelf />

          {/* the shadow the shelf casts down onto the plinth */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[14%]"
            style={{
              background:
                "linear-gradient(to bottom, transparent, rgba(6,11,7,0.75))",
            }}
          />
        </div>

        {/* ── the plinth ─────────────────────────────────────── */}
        <div className="relative z-20 w-full shrink-0">
          <div
            className="relative"
            style={{
              height: "clamp(62px, 5.2cqw, 96px)",
              // One continuous wash rather than a tiled texture — the repeat
              // was printing seams down the band.
              background: [
                "radial-gradient(130% 180% at 18% -40%, rgba(255,252,238,0.5), transparent 60%)",
                "radial-gradient(120% 190% at 82% -30%, rgba(255,248,225,0.34), transparent 58%)",
                "linear-gradient(180deg,#efe4c9 0%,#e6d7b4 48%,#d9c69d 100%)",
              ].join(","),
            }}
          >
            {/* the shelf's shadow falling across the front of it */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-[58%]"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(26,32,20,0.42), rgba(26,32,20,0.10) 55%, transparent)",
              }}
            />
            {/* a gilt rule that fades out instead of stopping */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-[3%] top-[9px] h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(178,145,63,0.6) 12%, rgba(178,145,63,0.6) 88%, transparent)",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-[3%] bottom-[9px] h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(178,145,63,0.38) 12%, rgba(178,145,63,0.38) 88%, transparent)",
              }}
            />

            <div className="absolute inset-0 flex flex-col items-center justify-center gap-[0.25cqw] px-4 text-center sm:px-6">
              <Image
                src="/assets/orn/icon-book.webp"
                alt=""
                aria-hidden
                width={65}
                height={37}
                className="drag-none h-auto select-none"
                style={{ width: "clamp(18px, 1.5cqw, 28px)" }}
              />
              <p
                className="text-balance w-full max-w-[46ch] font-semibold uppercase leading-tight text-[#18241c]"
                style={{
                  fontFamily: "var(--font-jost)",
                  letterSpacing: "0.07em",
                  fontSize: "clamp(9px, 1.04cqw, 17px)",
                }}
              >
                Select a volume title to explore the collection.
              </p>
              <Divider
                className="opacity-70"
                style={{ width: "clamp(90px, 9cqw, 160px)" }}
              />
            </div>
          </div>

          {/* the note resting on the plinth, ribbon and all */}
          <div
            className="pointer-events-none absolute right-[4%] hidden xl:block"
            style={{ top: "clamp(-88px, -5cqw, -56px)", width: "12cqw" }}
          >
            <div
              className="relative -rotate-[2.5deg] overflow-hidden rounded-[10px] shadow-[0_26px_30px_-16px_rgba(0,0,0,0.8)]"
              style={{
                WebkitMaskImage:
                  "radial-gradient(140% 150% at 50% 40%, #000 72%, transparent 100%)",
                maskImage:
                  "radial-gradient(140% 150% at 50% 40%, #000 72%, transparent 100%)",
              }}
            >
              <Image
                src="/assets/paper/card-open.webp"
                alt=""
                aria-hidden
                width={1080}
                height={792}
                className="drag-none w-full select-none object-cover"
                style={{ height: "8.2cqw" }}
              />
              <span
                aria-hidden
                className="absolute inset-[10px] rounded-[7px] border border-[#b2913f]/32"
              />
            </div>
            <Image
              src="/assets/orn/ribbon.webp"
              alt=""
              aria-hidden
              width={71}
              height={198}
              className="drag-none absolute -top-[0.3cqw] right-[1.4cqw] w-[1.5cqw] -rotate-[2.5deg] select-none drop-shadow-[0_6px_8px_rgba(0,0,0,0.55)]"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
