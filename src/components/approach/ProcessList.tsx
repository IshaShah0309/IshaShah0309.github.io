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
 * The rail is a timeline, so it has to read as one continuous run. Resting on
 * a stage inks the line from the first stage all the way down to that one and
 * fills every node it passes, rather than lighting one stage's own length on
 * its own: a lit segment floating between two unlit gaps looks like a broken
 * line, not progress along a path. The ink is drawn by `.rail-*` in
 * globals.css, which needs `:has()` to reach back up the list.
 */
export default function ProcessList() {
  return (
    <div className="slip relative mt-[0.9em] py-[1.3em] pl-[2.1em] pr-[1.2em]">
      <ol className="rail relative space-y-[0.95em] text-center">
        {STEPS.map((s, i) => (
          <li key={s.title} className="rail-step relative">
            {/*
              This stage's length of the line runs to the *next* node, gap
              included, so the run never breaks between stages. The last one
              stops at its own node, because the path ends there.
            */}
            {i < STEPS.length - 1 && (
              <span aria-hidden className="rail-track" />
            )}
            <span aria-hidden className="rail-ink" />
            <span aria-hidden className="rail-node" />

            <span className="pg-sub rail-title block !text-[calc(var(--ps)*0.0205)]">
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
