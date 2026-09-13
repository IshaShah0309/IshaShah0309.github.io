import Link from "next/link";
import Image from "next/image";
import { Divider } from "@/components/Ornament";

export const metadata = { title: "Volume Not Found" };

export default function NotFound() {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-forest px-6 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(110% 80% at 50% 10%, #17251a 0%, #121d12 45%, #08110a 100%)",
        }}
      />
      <div className="gilt-frame !inset-3 md:!inset-5" />

      <Image
        src="/assets/scene/ivy-a.webp"
        alt=""
        aria-hidden
        width={429}
        height={560}
        className="drag-none pointer-events-none absolute -right-6 top-10 w-[130px] select-none opacity-70 md:w-[200px]"
      />

      <div className="relative z-10 flex flex-col items-center">
        <p className="eyebrow text-[11px] text-gold md:text-[13px]">
          The shelf is short one book
        </p>
        <h1
          className="font-display mt-2 leading-[0.98] text-cream"
          style={{ fontSize: "clamp(2.6rem, 9vw, 6rem)" }}
        >
          404
        </h1>
        <Divider className="mt-2" width={170} />
        <p className="text-balance mt-5 max-w-[28rem] text-[14px] leading-relaxed text-cream/70">
          This volume was never bound, or it has been reshelved. Return to the
          collection and pick another.
        </p>
        <Link
          href="/"
          className="eyebrow mt-8 rounded-full border border-gold/40 px-7 py-3 text-[11px] text-gold transition-all duration-500 hover:border-gold-bright hover:bg-gold/10 hover:text-gold-bright"
        >
          Back to the shelf
        </Link>
      </div>
    </section>
  );
}
