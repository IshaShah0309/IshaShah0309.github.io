import Image from "next/image";

/** The swirl-and-rule divider that sits under every title in the deck. */
export function Divider({
  className = "",
  width,
  style,
}: {
  className?: string;
  /** A fixed pixel width; omit and pass `style` to size it fluidly instead. */
  width?: number;
  style?: React.CSSProperties;
}) {
  return (
    <Image
      src="/assets/orn/divider.webp"
      alt=""
      aria-hidden
      width={225}
      height={20}
      style={width === undefined ? style : { width, ...style }}
      className={`drag-none pointer-events-none h-auto select-none opacity-90 ${className}`}
    />
  );
}

/** The short gold dash used as an underline on the spine labels. */
export function Rule({ className = "", width = 54 }: { className?: string; width?: number }) {
  return (
    <Image
      src="/assets/orn/rule.webp"
      alt=""
      aria-hidden
      width={97}
      height={19}
      style={{ width }}
      className={`drag-none pointer-events-none h-auto select-none ${className}`}
    />
  );
}

/**
 * The red wax "VOLUME N" stamp. Redrawn as SVG rather than pixels so it stays
 * crisp at any size and the numeral can change per page.
 */
export function VolumeStamp({
  numeral,
  className = "",
}: {
  numeral: string;
  className?: string;
}) {
  const id = `stamp-${numeral.replace(/\W/g, "")}`;
  const [word, num] = numeral.split(" ");
  return (
    <svg
      viewBox="0 0 200 200"
      className={`select-none ${className}`}
      role="img"
      aria-label={numeral}
    >
      <defs>
        <path
          id={`${id}-arc`}
          d="M 100,100 m -66,0 a 66,66 0 1 1 132,0"
          fill="none"
        />
        <filter id={`${id}-rough`}>
          <feTurbulence baseFrequency="0.06" numOctaves="3" seed="7" result="t" />
          <feDisplacementMap in="SourceGraphic" in2="t" scale="4" />
        </filter>
      </defs>
      <g filter={`url(#${id}-rough)`} opacity="0.78">
        <circle
          cx="100"
          cy="100"
          r="84"
          fill="none"
          stroke="#800000"
          strokeWidth="4"
          strokeDasharray="3 4"
        />
        <circle cx="100" cy="100" r="72" fill="none" stroke="#800000" strokeWidth="2" />
        <text
          fill="#800000"
          style={{
            fontFamily: "var(--font-jost), sans-serif",
            fontSize: "23px",
            letterSpacing: "4px",
          }}
        >
          <textPath href={`#${id}-arc`} startOffset="50%" textAnchor="middle">
            {word}
          </textPath>
        </text>
        <text
          x="100"
          y="132"
          textAnchor="middle"
          fill="#800000"
          style={{
            fontFamily: "var(--font-jost), sans-serif",
            fontSize: "26px",
            letterSpacing: "3px",
          }}
        >
          {num}
        </text>
        <circle cx="100" cy="72" r="3" fill="#800000" />
      </g>
    </svg>
  );
}

/** The maroon ribbon bookmark that hangs out of the top of a page. */
export function Ribbon({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/assets/orn/ribbon.webp"
      alt=""
      aria-hidden
      width={84}
      height={225}
      className={`drag-none pointer-events-none select-none ${className}`}
    />
  );
}
