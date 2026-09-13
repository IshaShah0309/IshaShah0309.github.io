const STEPS = [
  { title: "Understand", body: "Learn about people, goals & content" },
  { title: "Organize", body: "Turn insight into a clear structure" },
  { title: "Design", body: "Create engaging learning experiences" },
  {
    title: "Deliver",
    body: "Bring learning to life in ways that connect and inspire",
  },
  { title: "Improve", body: "Gather feedback and make changes" },
];

/**
 * The five stages, centred on a slip of aged paper, set as the deck sets
 * them, with the title over its line rather than beside a rail.
 *
 * The rail runs down the left of the slip as a dotted rule in the paper's own
 * colour. Resting on a stage inks that stage's length of it maroon and fills
 * its node, so the eye is told where it is on the run without the text moving.
 */
export default function ProcessList() {
  return (
    <div className="slip relative mt-[0.9em] py-[1.3em] pl-[2.1em] pr-[1.2em]">
      {/* the dotted rail, behind the nodes */}
      <span
        aria-hidden
        className="absolute bottom-[1.9em] left-[1.05em] top-[1.9em] w-px"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, rgba(122,90,40,0.55) 0 2px, transparent 2px 6px)",
        }}
      />

      <ol className="relative space-y-[0.95em] text-center">
        {STEPS.map((s) => (
          <li key={s.title} className="group relative">
            {/* this stage's length of the rail, inked in on hover */}
            <span
              aria-hidden
              className="absolute -left-[1.05em] top-0 h-full w-px origin-top scale-y-0 bg-maroon/75 transition-transform duration-[600ms] ease-[var(--ease-vellum)] group-hover:scale-y-100"
            />
            <span
              aria-hidden
              className="absolute -left-[1.05em] top-[0.45em] block h-[0.5em] w-[0.5em] -translate-x-[calc(50%-0.5px)] rotate-45 border border-[#7a5a28]/80 bg-[#f3e7cc] transition-colors duration-500 group-hover:border-maroon group-hover:bg-maroon"
            />
            <span className="pg-sub block !text-[calc(var(--ps)*0.0205)] transition-colors duration-500 group-hover:text-maroon">
              {s.title}
            </span>
            <span className="pg-body mt-[0.15em] block leading-[1.3]">
              {s.body}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
