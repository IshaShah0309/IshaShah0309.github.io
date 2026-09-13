import type { Metadata } from "next";
import { bySlug } from "@/data/volumes";
import Plates from "@/components/gallery/Plates";
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

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "A plate section of designs created for training, facilitation and learning programmes.",
};

/** What the header, the title block and the desk leave for the wall. */
const WALL_H = `calc(100svh - ${NAV}px - var(--desk) - 132px)`;

export default function GalleryPage() {
  const volume = bySlug("/gallery")!;

  return (
    <section
      className="relative min-h-[100svh] w-full overflow-hidden bg-forest pb-16 pt-[76px] lg:h-[100svh] lg:pb-0 lg:pt-0"
      style={DESK_VAR}
    >
      <Room />

      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        <Ivy />
        <StandingVolume
          volume={volume}
          art="/assets/shelf/book-5.webp"
          height={WALL_H}
        />
        <Desk />
        <Lamp height="min(30svh, 21vw)" />
      </div>

      {/* the plate section's own title, on the wall above the hang */}
      <div
        className="absolute inset-x-0 z-30 hidden flex-col items-center lg:flex"
        style={{ top: `${NAV - 6}px` }}
      >
        <h1
          className="font-display rise leading-none tracking-wide"
          style={{ color: "#c8703e", fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)" }}
        >
          PHOTO GALLERY
        </h1>
        <span
          aria-hidden
          className="mt-1.5 block h-px w-[110px] bg-gradient-to-r from-transparent via-gold to-transparent"
        />
        <p className="eyebrow mt-2 text-[10px] text-gold/70">
          Each photo is a design created
        </p>
      </div>

      {/* ── the wall, hung above the desk ────────────────────── */}
      <div
        className="absolute inset-x-0 z-30 hidden lg:block"
        style={{ bottom: "calc(var(--desk) - 10px)" }}
      >
        <div className="mx-auto w-full max-w-[1600px] px-[17vw]">
          <Plates height={WALL_H} />
        </div>
      </div>

      <div className="hidden lg:block">
        <Atmosphere />
      </div>

      {/* ── phones and tablets ──────────────────────────────── */}
      <div className="relative z-30 mx-auto w-full max-w-[560px] px-4 lg:hidden">
        <header className="mb-6 flex flex-col items-center gap-2 text-center">
          <span className="eyebrow text-[10px] text-gold">{volume.numeral}</span>
          <h1
            className="font-display text-[30px] leading-[1.08] sm:text-[38px]"
            style={{ color: "#c8703e" }}
          >
            Photo Gallery
          </h1>
          <span
            aria-hidden
            className="block h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent"
          />
          <p className="eyebrow mt-1 text-[9px] text-gold/70">
            Each photo is a design created
          </p>
        </header>
        <Plates height="auto" />
      </div>
    </section>
  );
}
