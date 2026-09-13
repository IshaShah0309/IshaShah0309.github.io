import Image from "next/image";
import type { CSSProperties } from "react";
import type { Volume } from "@/data/volumes";

/**
 * The room every interior page is set in, and the rules that keep it from
 * looking like cut-outs on a colour swatch.
 *
 * Three things do the work:
 *
 *  · one measurement, `--desk`, taken from the desk photograph's own aspect,
 *    so the surface never crops and everything can be seated against it;
 *  · shadow, not lines, the wall darkens *into* the desk and the desk's far
 *    edge sits in that shadow, so the join is a gradient rather than a cut;
 *  · one atmosphere pass over the whole scene, which grades the separate
 *    photographs into a single light.
 */

export const NAV = 84;
/** The desk photograph is 1275 × 126; hold that ratio and it never crops. */
export const DESK_VAR = { "--desk": "calc(100vw / 10.12)" } as CSSProperties;
/** Book cut-outs are 141 × 348, the closed volume's aspect. */
export const SPINE_RATIO = 141 / 348;

/** Wall, floor-shadow and vignette. Sits behind everything. */
export function Room() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 2%, #1b2b1c 0%, #142016 42%, #0b1410 78%, #070d09 100%)",
        }}
      />
      {/* the wall falling into shadow where it meets the desk */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 z-10"
        style={{
          bottom: "var(--desk)",
          height: "26vh",
          background:
            "linear-gradient(to top, rgba(6,11,7,0.92), rgba(6,11,7,0.55) 34%, transparent 100%)",
        }}
      />
    </>
  );
}

/**
 * A single grade over the finished scene: a warm pool where the lamp is, a
 * cool falloff into the corners. This is what stops the photographs from
 * reading as separate pictures.
 */
export function Atmosphere() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[45]"
      style={{
        background: [
          "radial-gradient(58% 46% at 88% 74%, rgba(255,198,112,0.13), transparent 62%)",
          "radial-gradient(70% 55% at 50% 40%, rgba(255,236,190,0.05), transparent 70%)",
          "radial-gradient(120% 100% at 50% 45%, transparent 42%, rgba(4,9,6,0.55) 100%)",
        ].join(","),
      }}
    />
  );
}

/** The desk, with its far edge dissolved into the wall's shadow. */
export function Desk() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 z-20 overflow-hidden"
      style={{ height: "var(--desk)" }}
    >
      <Image
        src="/assets/scene/desk-strip.webp"
        alt=""
        width={1275}
        height={126}
        className="drag-none absolute inset-0 h-full w-full select-none object-cover object-top"
      />
      {/* the far edge, in the wall's shadow */}
      <div
        className="absolute inset-x-0 top-0 h-[38%]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(6,11,7,0.95), rgba(6,11,7,0.35) 55%, transparent 100%)",
        }}
      />
    </div>
  );
}

/**
 * The brass lamp, standing on the bound book at the right of the desk. Its
 * asset is trimmed to the alpha, so the box bottom *is* the base of the stand.
 */
export function Lamp({ height }: { height: string }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute z-30 -translate-x-1/2"
      style={{
        left: "90.5%",
        bottom: "calc(var(--desk) * 0.80)",
        height,
      }}
    >
      <Image
        src="/assets/scene/lamp.webp"
        alt=""
        width={148}
        height={245}
        className="drag-none h-full w-auto select-none drop-shadow-[0_10px_10px_rgba(0,0,0,0.55)]"
      />
      <div
        className="anim-flicker absolute left-1/2 top-[28%] -z-10 h-[190%] w-[420%] -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(255,206,120,0.30), transparent 66%)",
        }}
      />
    </div>
  );
}

/** Ivy trailing in from beyond the frame, feathered so it has no cut edge. */
export function Ivy() {
  return (
    <Image
      src="/assets/scene/ivy-a.webp"
      alt=""
      aria-hidden
      width={429}
      height={559}
      className="drag-none pointer-events-none absolute right-[-3%] top-[-6%] z-10 w-auto select-none drop-shadow-[0_14px_18px_rgba(0,0,0,0.5)]"
      style={{
        height: "min(38svh, 27vw)",
        WebkitMaskImage:
          "radial-gradient(120% 110% at 78% 22%, #000 58%, transparent 100%)",
        maskImage:
          "radial-gradient(120% 110% at 78% 22%, #000 58%, transparent 100%)",
      }}
    />
  );
}

/**
 * The closed volume, standing on the desk beside the open one. Its height is
 * handed in so it always matches the open book exactly, and its width follows
 * the cut-out's own aspect so the binding is never stretched.
 */
export function StandingVolume({
  volume,
  art,
  height,
}: {
  volume: Volume;
  art: string;
  height: string;
}) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute z-20"
      style={{
        left: "3.5%",
        bottom: "var(--desk)",
        height,
        width: `calc(${height} * ${SPINE_RATIO})`,
      }}
    >
      {/* the shadow it throws on the wall */}
      <div
        className="absolute -right-[14%] bottom-0 top-[6%] w-[30%] blur-xl"
        style={{ background: "rgba(4,9,6,0.6)" }}
      />
      <Image
        src={art}
        alt=""
        width={300}
        height={700}
        className="drag-none relative h-full w-full select-none"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-[4%] px-[9%] text-center [container-type:inline-size]">
        <span
          className="eyebrow whitespace-nowrap text-gold"
          style={{ fontSize: "clamp(8px, 8.6cqw, 20px)" }}
        >
          {volume.numeral}
        </span>
        <span className="block h-px w-[58%] bg-gradient-to-r from-transparent via-gold to-transparent" />
        <span
          className="font-display leading-[1.14] tracking-[0.02em] text-gold-bright"
          style={{ fontSize: "clamp(10px, 11cqw, 27px)" }}
        >
          {volume.standing.map((l) => (
            <span key={l} className="block">
              {l}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}
