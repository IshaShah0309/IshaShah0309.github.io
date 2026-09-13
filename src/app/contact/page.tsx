import type { Metadata } from "next";
import Image from "next/image";
import { SITE } from "@/data/volumes";
import { Divider } from "@/components/Ornament";
import type { CSSProperties } from "react";
import DustField from "@/components/DustField";
import { MailIcon, PhoneIcon, LinkedInIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${SITE.owner} about training, facilitation and learning design opportunities.`,
};

const ROWS = [
  {
    Icon: PhoneIcon,
    label: "Contact",
    value: SITE.phone,
    href: `tel:${SITE.phone.replace(/\D/g, "")}`,
  },
  {
    Icon: MailIcon,
    label: "Email",
    value: SITE.email,
    href: `mailto:${SITE.email}`,
  },
  {
    Icon: LinkedInIcon,
    label: "LinkedIn",
    value: "Connect on LinkedIn",
    href: SITE.linkedin,
  },
];

export default function ContactPage() {
  return (
    <section className="relative flex h-[100svh] min-h-[600px] w-full flex-col overflow-hidden bg-forest">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(110% 70% at 50% 0%, #16241a 0%, #101a11 45%, #05100a 100%)",
        }}
      />
      <div className="gilt-frame z-30 !inset-2 md:!inset-4" />
      <DustField className="z-[15]" />

      {/* ── masthead ─────────────────────────────────────────── */}
      <div className="relative z-20 flex min-h-0 flex-1 flex-col items-center justify-center px-5 pb-5 pt-24 text-center md:pt-28">
        <div className="rise" style={{ "--d": "120ms" } as CSSProperties}>
          <p className="eyebrow flex items-center gap-5 text-[15px] text-gold md:text-[21px]">
            <span aria-hidden className="block h-px w-10 bg-gold/60 md:w-16" />
            {SITE.owner.toUpperCase()}
            <span aria-hidden className="block h-px w-10 bg-gold/60 md:w-16" />
          </p>
        </div>

        <div className="rise" style={{ "--d": "200ms" } as CSSProperties}>
          <h1
            className="font-display mt-1 leading-[1.02] text-parchment"
            style={{ fontSize: "clamp(2rem, 5.9vw, 4.5rem)" }}
          >
            The Learning Archive
          </h1>
        </div>

        <div className="rise" style={{ "--d": "260ms" } as CSSProperties}>
          <Divider className="mt-2.5" width={190} />
        </div>

        <div className="rise" style={{ "--d": "320ms" } as CSSProperties}>
          <p className="text-balance mt-4 max-w-[30rem] text-[13.5px] leading-relaxed text-parchment/85 md:text-[15px]">
            If you have any questions or opportunities available, I would love to
            connect!
          </p>
        </div>
      </div>

      {/* ── the shelf, with the card resting against it ──────── */}
      <div className="relative z-10 w-full shrink-0">
        <Image
          src="/assets/scene/shelf-contact.webp"
          alt=""
          aria-hidden
          priority
          width={1270}
          height={495}
          className="drag-none h-[46svh] min-h-[290px] w-full select-none object-cover object-[center_30%]"
        />

        {/* the wall coming down into the shelf, so the join is not a line */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[22%]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(9,16,10,0.95), rgba(9,16,10,0.4) 52%, transparent 100%)",
          }}
        />

        <div
          aria-hidden
          className="anim-flicker pointer-events-none absolute left-[3%] top-[12%] h-[55%] w-[24%] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse at 45% 45%, rgba(255,208,120,0.32), transparent 70%)",
          }}
        />

        <Image
          src="/assets/scene/ivy-a.webp"
          alt=""
          aria-hidden
          width={429}
          height={560}
          className="drag-none pointer-events-none absolute -right-2 top-[-8%] z-20 w-[16%] min-w-[108px] max-w-[220px] select-none"
        />

        {/* the gilt-mounted card */}
        <div className="absolute inset-0 z-30 flex items-center justify-center px-5">
          <div className="rise w-full max-w-[640px]" style={{ "--d": "380ms" } as CSSProperties}>
            <div
              className="relative rounded-[26px] p-[14px] shadow-[0_40px_70px_-28px_rgba(0,0,0,0.95)] sm:p-[18px]"
              style={{
                background:
                  "linear-gradient(150deg, #e3bd6d 0%, #c69a4d 38%, #a8823c 62%, #d9b463 100%)",
              }}
            >
              <div
                className="pg relative overflow-hidden px-6 py-8 sm:px-10 sm:py-10"
                style={{
                  backgroundImage: "url(/assets/paper/paper-lg.webp)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <dl className="space-y-5 sm:space-y-7">
                  {ROWS.map(({ Icon, label, value, href }) => (
                    <div
                      key={label}
                      className="grid grid-cols-[auto_1fr] items-baseline gap-x-4 sm:grid-cols-[9.5rem_1fr] sm:gap-x-6"
                    >
                      <dt className="font-display text-[16px] uppercase tracking-[0.05em] text-ink sm:text-[21px]">
                        {label}:
                      </dt>
                      <dd className="min-w-0">
                        <a
                          href={href}
                          target={href.startsWith("http") ? "_blank" : undefined}
                          rel={
                            href.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                          data-cursor="link"
                          className="group inline-flex max-w-full items-start gap-2 font-display text-[15.5px] text-ink transition-colors duration-300 hover:text-maroon sm:text-[20px]"
                        >
                          <Icon className="mt-[0.28em] h-[1em] w-[1em] shrink-0 opacity-70 transition-opacity group-hover:opacity-100" />
                          <span className="min-w-0 break-all border-b border-ink/30 pb-0.5 text-left transition-colors group-hover:border-maroon">
                            {value}
                          </span>
                        </a>
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-8 flex items-center justify-center gap-4 border-t border-maroon/15 pt-5">
                  <a
                    href={`mailto:${SITE.email}?subject=${encodeURIComponent(
                      "Hello from The Learning Archive",
                    )}`}
                    data-cursor="link"
                    className="press-head rounded-full border border-maroon/40 px-6 py-2.5 text-[11px] transition-all duration-400 hover:border-maroon hover:bg-maroon hover:text-paper sm:text-[12px]"
                  >
                    Write a note
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[45]"
        style={{
          background: [
            "radial-gradient(44% 38% at 12% 78%, rgba(255,198,112,0.13), transparent 66%)",
            "radial-gradient(125% 105% at 50% 46%, transparent 44%, rgba(4,9,6,0.5) 100%)",
          ].join(","),
        }}
      />

      <footer className="relative z-[46] flex shrink-0 items-center justify-center gap-4 bg-forest-deep px-5 py-5 text-center sm:py-6">
        <span aria-hidden className="block h-px w-8 bg-gold/35 sm:w-14" />
        <span className="eyebrow text-[12px] text-gold/85 sm:text-[15px]">
          {SITE.owner} · The Learning Archive
        </span>
        <span aria-hidden className="block h-px w-8 bg-gold/35 sm:w-14" />
      </footer>
    </section>
  );
}
