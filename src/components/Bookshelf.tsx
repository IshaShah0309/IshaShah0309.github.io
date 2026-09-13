"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { VOLUMES, SHELF_OPENING as OPEN } from "@/data/volumes";

/**
 * The shelf is built from real objects, not one flat picture.
 *
 *  · `alcove.webp` is the photograph with every volume removed — the frame,
 *    the rail, the lamp, the globe and an empty back panel behind them.
 *  · Each volume is its own cut-out standing in the alcove.
 *  · The books live inside a box clipped to the shelf opening, so a volume
 *    that is pulled slides up *behind* the rail and leaves a real gap in the
 *    row, exactly as it would on a shelf.
 *
 * Everything is positioned as a fraction of the photograph, so the whole
 * assembly scales as a single object at any size.
 */

const PHOTO = { w: 1249, h: 717 };
const PHOTO_RATIO = PHOTO.w / PHOTO.h;
/** How much of the photograph's height is shown — crops the empty wall above. */
const VIEW_RATIO = 2.86;

const openW = OPEN.right - OPEN.left;
const openH = OPEN.bottom - OPEN.top;

export default function Bookshelf() {
  const router = useRouter();
  const [hovered, setHovered] = useState<number | null>(null);
  const [pulled, setPulled] = useState<string | null>(null);

  const open = useCallback(
    (slug: string) => {
      if (pulled) return;
      setPulled(slug);
      window.setTimeout(() => router.push(slug), 560);
    },
    [pulled, router],
  );

  return (
    <div className="relative w-full">
      <div className="w-full overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:overflow-x-hidden">
        <div
          className="relative mx-auto min-w-[760px] overflow-hidden md:min-w-0"
          style={{ aspectRatio: VIEW_RATIO }}
        >
          {/* the photograph's own box, anchored to the shelf board */}
          <div
            className="absolute inset-x-0 bottom-0"
            style={{ aspectRatio: PHOTO_RATIO }}
          >
            <Image
              src="/assets/shelf/alcove.webp"
              alt="A wooden library shelf with a brass reading lamp, a globe and a framed print"
              width={PHOTO.w * 2}
              height={PHOTO.h * 2}
              priority
              className="drag-none absolute inset-0 h-full w-full select-none"
              style={{
                // A single mask layer: the photograph's ends dissolve into the
                // room instead of stopping at a line. (One layer deliberately —
                // compositing two mask layers is inconsistent across engines.)
                WebkitMaskImage:
                  "linear-gradient(90deg, transparent 0%, #000 3.4%, #000 96.6%, transparent 100%)",
                maskImage:
                  "linear-gradient(90deg, transparent 0%, #000 3.4%, #000 96.6%, transparent 100%)",
              }}
            />

            {/* lamplight pooling on the left of the alcove */}
            <div
              aria-hidden
              className="anim-flicker pointer-events-none absolute left-[3%] top-[42%] h-[46%] w-[22%] rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(ellipse at 40% 50%, rgba(255,206,120,0.26), rgba(255,190,90,0.07) 48%, transparent 74%)",
              }}
            />

            {/* the shelf opening — a volume cannot leave it */}
            <div
              className="absolute overflow-hidden"
              style={{
                left: `${OPEN.left * 100}%`,
                top: `${OPEN.top * 100}%`,
                width: `${openW * 100}%`,
                height: `${openH * 100}%`,
              }}
            >
              {VOLUMES.map((v, i) => {
                const isHover = hovered === i;
                const isPulled = pulled === v.slug;
                const dim = pulled !== null && !isPulled;
                const lit = isHover || isPulled;

                // re-base the slot from the photograph onto the opening
                const left = (v.slot.left - OPEN.left) / openW;
                const width = v.slot.width / openW;
                const top = (v.slot.top - OPEN.top) / openH;
                const height = v.slot.height / openH;

                return (
                  <button
                    key={v.slug}
                    type="button"
                    aria-label={`${v.numeral} — ${v.spine.join(" ")}`}
                    onMouseEnter={() => {
                      setHovered(i);
                    }}
                    onMouseLeave={() => setHovered(null)}
                    onFocus={() => setHovered(i)}
                    onBlur={() => setHovered(null)}
                    onClick={() => open(v.slug)}
                    className="group absolute cursor-pointer border-0 bg-transparent p-0 outline-none [container-type:inline-size]"
                    style={{
                      left: `${left * 100}%`,
                      width: `${width * 100}%`,
                      top: `${top * 100}%`,
                      height: `${height * 100}%`,
                      transformOrigin: "50% 100%",
                      transform: isPulled
                        ? "translateY(-13%) scale(1.045)"
                        : isHover
                          ? "translateY(-7.5%) scale(1.022)"
                          : "translateY(0) scale(1)",
                      opacity: dim ? 0.42 : 1,
                      filter: lit
                        ? "brightness(1.18) drop-shadow(0 20px 20px rgba(0,0,0,0.7))"
                        : "brightness(1)",
                      transition:
                        "transform 620ms var(--ease-vellum), filter 420ms ease, opacity 420ms ease",
                      zIndex: isPulled ? 30 : isHover ? 20 : 10,
                    }}
                  >
                    <Image
                      src={v.art}
                      alt=""
                      aria-hidden
                      width={300}
                      height={700}
                      priority={i < 3}
                      className="drag-none absolute inset-0 h-full w-full select-none"
                    />

                    {/* gold foil stamping */}
                    <span className="absolute inset-x-0 top-[18%] flex flex-col items-center px-[6%] text-center">
                      <span
                        className="eyebrow block whitespace-nowrap text-gold"
                        style={{
                          fontSize: "clamp(6px, 10cqw, 23px)",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {v.numeral}
                      </span>

                      <span
                        aria-hidden
                        className="my-[0.55em] block h-px w-[64%] bg-gradient-to-r from-transparent via-gold to-transparent"
                      />

                      <span
                        className={`font-display block leading-[1.12] tracking-[0.02em] ${
                          lit ? "foil" : "text-gold-bright"
                        }`}
                        style={{ fontSize: "clamp(7px, 12.8cqw, 30px)" }}
                      >
                        {v.spine.map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))}
                      </span>
                    </span>

                    <span className="absolute inset-x-0 top-[69%] flex justify-center">
                      <Image
                        src={v.emblem}
                        alt=""
                        aria-hidden
                        width={90}
                        height={120}
                        className="drag-none h-auto w-[34%] select-none opacity-90 transition-opacity duration-500 group-hover:opacity-100"
                      />
                    </span>

                    {/* gilt light running down the leading edge */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-y-0 left-0 w-[15%] transition-opacity duration-500"
                      style={{
                        background:
                          "linear-gradient(90deg, rgba(255,226,160,0.26), transparent)",
                        opacity: lit ? 1 : 0,
                      }}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <p className="eyebrow pointer-events-none absolute inset-x-0 -top-5 z-30 text-center text-[8.5px] text-gold/55 md:hidden">
        ← drag the shelf →
      </p>
    </div>
  );
}
