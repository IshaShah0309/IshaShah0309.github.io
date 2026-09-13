import Image from "next/image";

/**
 * The faint ruled panel that heads a verso page in the source deck, a double
 * hairline box with a swirl centred on its top edge. It carries no content;
 * it is what keeps the top of a page from reading as an accident.
 */
export function TopOrnament({ height = "3.4em" }: { height?: string }) {
  return (
    <div
      aria-hidden
      className="relative mx-[2%] mt-[0.4em] shrink-0 border border-[#8a6a2e]/28"
      style={{ height }}
    >
      <div className="absolute inset-[4px] border border-[#8a6a2e]/16" />
      <Image
        src="/assets/orn/divider.webp"
        alt=""
        width={225}
        height={20}
        className="drag-none absolute -top-[0.55em] left-1/2 w-[46%] -translate-x-1/2 select-none opacity-70 mix-blend-multiply"
      />
      <Image
        src="/assets/orn/divider.webp"
        alt=""
        width={225}
        height={20}
        className="drag-none absolute -bottom-[0.55em] left-1/2 w-[46%] -translate-x-1/2 select-none opacity-70 mix-blend-multiply"
      />
    </div>
  );
}

/**
 * A mount for the photograph that heads the introduction.
 *
 * The photograph is a print with its own deckled border, so when it is there
 * it is simply laid on the page, a second ruled frame around a frame reads as
 * a mistake. The drawn mount is only for the gap before the print exists.
 */
export function HeadshotMount({
  src,
  alt = "Isha Shah",
  className = "",
}: {
  src?: string;
  alt?: string;
  className?: string;
}) {
  if (src) {
    // Sized to the space the page leaves it. The provenance below is pushed to
    // the foot of the verso, so a smaller print only opens a hole in the middle
    // of the page rather than reading as a frontispiece.
    return (
      <figure
        className={`relative mx-auto shrink-0 ${className}`}
        style={{ width: "76%" }}
      >
        <Image
          src={src}
          alt={alt}
          width={900}
          height={1022}
          className="drag-none block h-auto w-full select-none"
          style={{
            filter: "drop-shadow(0 6px 14px rgba(70,50,16,0.45))",
          }}
        />
      </figure>
    );
  }

  return (
    <figure
      className={`relative mx-auto shrink-0 ${className}`}
      style={{ width: "58%", aspectRatio: "4 / 5" }}
    >
      {/* the mount */}
      <span
        aria-hidden
        className="absolute inset-0 border border-[#8a6a2e]/55"
        style={{ boxShadow: "0 2px 10px -4px rgba(70,50,16,0.5)" }}
      />
      <span
        aria-hidden
        className="absolute inset-[5px] border border-[#8a6a2e]/28"
      />

      {
        <span
          className="absolute inset-[9px] flex flex-col items-center justify-center gap-[0.5em]"
          style={{
            backgroundImage: "url(/assets/paper/paper-sm.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.55,
          }}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-[2.2em] w-[2.2em] text-[#8a6a2e]/70"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.1"
          >
            <circle cx="12" cy="9" r="3.6" />
            <path d="M4.6 20.4c0-3.6 3.3-6 7.4-6s7.4 2.4 7.4 6" />
          </svg>
          <span className="pg-tiny !text-[calc(var(--ps)*0.0108)]">
            Photograph
          </span>
        </span>
      }

      {/* the swirl that sits on the top rule, as it does in the deck */}
      <Image
        src="/assets/orn/divider.webp"
        alt=""
        aria-hidden
        width={225}
        height={20}
        className="drag-none absolute -top-[0.5em] left-1/2 w-[52%] -translate-x-1/2 select-none opacity-70 mix-blend-multiply"
      />
    </figure>
  );
}
