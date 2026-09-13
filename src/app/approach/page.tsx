import type { Metadata } from "next";
import BookSpread from "@/components/BookSpread";
import { bySlug } from "@/data/volumes";
import ProcessList from "@/components/approach/ProcessList";
import PrincipleGrid from "@/components/approach/PrincipleGrid";
import { CompassIcon, HeartIcon, GroupIcon } from "@/components/icons";
import { Divider } from "@/components/Ornament";

export const metadata: Metadata = {
  title: "Behind the Learning",
  description:
    "People, purpose and practical solutions — the principles and process behind Isha Shah's learning design.",
};

const MATTERS = [
  {
    Icon: CompassIcon,
    title: "Easy to Navigate",
    body: "Clear structure, simple language, and intuitive design",
  },
  {
    Icon: HeartIcon,
    title: "Designed with Purpose",
    body: "Every element has a reason and learner in mind",
  },
  {
    Icon: GroupIcon,
    title: "Useful Beyond the Training",
    body: "Tools and takeaways people can apply in real life",
  },
];

function Verso() {
  return (
    /* the head of the verso is set clear of the bookmark hanging over it */
    <div className="flex h-full flex-col justify-center gap-[1.3em] pb-[0.6em] pt-[3.7em]">
      <section>
      <header className="flex flex-col items-center text-center">
        <h2 className="pg-label">What Matters to Me</h2>
        <div className="pg-rule mt-[0.45em] w-[68%]" />
      </header>

      <ul className="mt-[1em] space-y-[0.95em]">
        {MATTERS.map(({ Icon, title, body }) => (
          <li key={title} className="group flex items-start gap-[0.85em]">
            <span className="mt-[0.15em] flex h-[2.7em] w-[2.7em] shrink-0 items-center justify-center rounded-full border border-[#7a5a28]/70 text-[#4a3a1c] transition-all duration-500 group-hover:border-maroon group-hover:bg-[#800000]/8 group-hover:text-maroon">
              <Icon className="h-[1.5em] w-[1.5em]" />
            </span>
            <span className="min-w-0">
              <span className="pg-sub block">{title}</span>
              <span className="pg-body mt-[0.2em] block">{body}</span>
            </span>
          </li>
        ))}
      </ul>
      </section>

      <div className="flex flex-col items-center gap-[0.25em]">
        <Divider className="w-[52%] mix-blend-multiply" />
        <Divider className="w-[52%] mix-blend-multiply" />
      </div>

      <section>
        <h2 className="pg-label text-center">Design Principles</h2>
        <div className="pg-rule mx-auto mt-[0.45em] w-[46%]" />
        <PrincipleGrid />
      </section>
    </div>
  );
}

function Recto() {
  return (
    <div className="flex h-full flex-col">
      <header className="text-center">
        <h1 className="pg-title">APPROACH</h1>
        <div className="pg-rule mx-auto mt-[0.35em] w-[46%]" />
      </header>

      <p className="pg-body mt-[1.1em]">
        My approach is grounded in people, purpose, and practical solutions. I
        combine learning design with a human touch to create trainings that are
        clear, engaging and impactful.
      </p>

      <h2 className="pg-label mt-[1.5em] text-center">The Process</h2>
      <div className="pg-rule mx-auto mt-[0.4em] w-[34%]" />

      <ProcessList />
    </div>
  );
}

export default function ApproachPage() {
  const volume = bySlug("/approach")!;
  return (
    <BookSpread
      volume={volume}
      left={<Verso />}
      right={<Recto />}
      mobileRightFirst
    />
  );
}
