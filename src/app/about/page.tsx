import type { Metadata } from "next";
import BookSpread from "@/components/BookSpread";
import { bySlug } from "@/data/volumes";
import { CapIcon, CaseIcon, PersonIcon } from "@/components/icons";
import { HeadshotMount } from "@/components/PageOrnament";

export const metadata: Metadata = {
  title: "About Isha",
  description:
    "Isha Shah, a Master's candidate in Industrial/Organizational Psychology working in training, facilitation and learning experience design.",
};

const PROFILE: [string, string][] = [
  ["Current Focus", "Training and Development"],
  [
    "Interests",
    "Training design, facilitation, employee development, learning experience design",
  ],
  ["Tools", "Canva, iSpring, Adobe, Microsoft 365"],
  ["Strengths", "Visual thinking, time management, creative problem-solving"],
];

/**
 * The photograph heads the page and the provenance is set beneath it, a
 * frontispiece above its caption.
 */
function Verso() {
  return (
    <div className="flex h-full flex-col">
      <HeadshotMount src="/assets/isha.webp" className="mt-[0.9em]" />

      <div className="mt-auto">
        <header className="flex flex-col items-center text-center">
          <h2 className="pg-label">How I Got Here</h2>
          <div className="pg-rule mt-[0.45em] w-[58%]" />
        </header>

        <div className="mt-[0.9em] grid grid-cols-1 gap-[0.7em] sm:grid-cols-2">
          <article className="slip px-[0.8em] py-[0.65em]">
            <h3 className="pg-sub flex items-start gap-[0.4em] leading-[1.12]">
              <CapIcon className="mt-[0.12em] h-[1em] w-[1em] shrink-0" />
              <span>
                Academic
                <br />
                Foundation
              </span>
            </h3>
            <div className="pg-rule mt-[0.5em] w-full opacity-70" />
            <ul className="mt-[0.55em] space-y-[0.5em]">
              <li className="pg-small">
                Master&rsquo;s in Industrial / Organizational Psychology
              </li>
              <li className="pg-small">Bachelor of Science in I/O Psychology</li>
            </ul>
          </article>

          <article className="slip px-[0.8em] py-[0.65em]">
            <h3 className="pg-sub flex items-start gap-[0.4em] leading-[1.12]">
              <CaseIcon className="mt-[0.12em] h-[0.95em] w-[0.95em] shrink-0" />
              <span>
                Professional
                <br />
                Experience
              </span>
            </h3>
            <div className="pg-rule mt-[0.5em] w-full opacity-70" />
            <ul className="mt-[0.55em] space-y-[0.5em]">
              <li className="pg-small">Training Intern at GROW Financial</li>
              <li className="pg-small">
                L&amp;D Assistant at University of Central Florida
              </li>
            </ul>
          </article>
        </div>

        <blockquote className="slip mb-[0.5em] mt-[0.8em] px-[1em] py-[0.7em] text-center">
          <p className="pg-body italic leading-[1.4]">
            Excited to keep growing, creating, and contributing to meaningful
            learning experiences.
          </p>
        </blockquote>
      </div>
    </div>
  );
}

function Recto() {
  return (
    <div className="flex h-full flex-col">
      <header className="pt-[0.4em] text-center">
        <h1 className="pg-title">ABOUT ME</h1>
        <div className="pg-rule mx-auto mt-[0.3em] w-[62%]" />
      </header>

      <div className="mt-[0.8em] space-y-[0.45em]">
        <p className="pg-body">
          My interest in learning and development grew from experiences where I
          found myself doing more than simply sharing information.
        </p>
        <p className="pg-body">
          I enjoyed figuring out how information should be organized, how an
          audience would experience it, and what could make it easier to
          understand and use.
        </p>
        <p className="pg-body">
          Through academic and internship experiences, I have had opportunities
          to design training materials, create learning resources, and support
          delivery of programs that help build skills.
        </p>
        <p className="pg-body">
          I am especially interested in opportunities that allow me to combine
          learning design, facilitation, employee development, and creative
          problem-solving.
        </p>
      </div>

      <section className="mb-[0.4em] mt-auto rounded-[3px] border border-[#8a6a2e]/55 px-[0.85em] py-[0.6em]">
        <h2 className="pg-label flex items-center justify-center gap-[0.4em] !text-[calc(var(--ps)*0.0182)]">
          <PersonIcon className="h-[1em] w-[1em]" />
          Archive Profile
        </h2>
        <div className="pg-rule mt-[0.32em] w-full opacity-60" />
        <dl className="mt-[0.45em] space-y-[0.28em]">
          {PROFILE.map(([k, v]) => (
            <div key={k} className="grid grid-cols-[31%_1fr] gap-[0.5em]">
              <dt className="pg-small font-semibold !text-ink">{k}:</dt>
              <dd className="pg-small">{v}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}

export default function AboutPage() {
  const volume = bySlug("/about")!;
  return (
    <BookSpread
      volume={volume}
      left={<Verso />}
      right={<Recto />}
      mobileRightFirst
    />
  );
}
