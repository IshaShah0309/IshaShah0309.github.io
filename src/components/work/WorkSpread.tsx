"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import BookSpread from "@/components/BookSpread";
import { bySlug } from "@/data/volumes";
import { CHAPTERS, type Chapter } from "./chapters";
import ChapterPage from "./ChapterPage";

export default function WorkSpread() {
  const volume = bySlug("/work")!;
  const [open, setOpen] = useState<Chapter | null>(null);

  const close = useCallback(() => setOpen(null), []);

  const card = (c: Chapter) => (
    <ChapterCard key={c.id} chapter={c} onOpen={() => { setOpen(c); }} />
  );

  return (
    <>
      <BookSpread
        volume={volume}
        left={
          <div className="flex h-full flex-col">
            {/*
              Set below the bookmark. The ribbon hangs down the head of the
              verso, and the standfirst is the one line wide enough to run
              underneath it.
            */}
            <header className="pt-[2.2em] text-center">
              <h1 className="pg-title">WORK</h1>
              <div className="pg-rule mx-auto mt-[0.3em] w-[38%]" />
              <p className="pg-small mt-[0.7em]">
                Selected projects, resources and learning experiences from the
                collection
              </p>
            </header>
            <div className="mt-[0.9em] flex min-h-0 flex-1 flex-col gap-[0.8em]">
              {CHAPTERS.slice(0, 2).map(card)}
            </div>
          </div>
        }
        right={
          <div className="flex h-full flex-col">
            <div className="flex min-h-0 flex-1 flex-col gap-[0.8em]">
              {CHAPTERS.slice(2).map(card)}
            </div>
            <p className="pg-label mt-[1em] text-center leading-[1.4]">
              Click on each chapter to explore
            </p>
          </div>
        }
      />

      {/* ── the chapter, opened out full screen ─────────────── */}
      <AnimatePresence>
        {open && <ChapterPage chapter={open} onClose={close} />}
      </AnimatePresence>
    </>
  );
}

function ChapterCard({
  chapter,
  onOpen,
}: {
  chapter: Chapter;
  onOpen: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      data-cursor="link"
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 340, damping: 24 }}
      className="slip group relative flex min-h-0 flex-1 cursor-pointer flex-col p-[0.85em] text-left outline-none focus-visible:ring-2 focus-visible:ring-maroon/50"
    >
      <span className="pg-label block text-center !tracking-[0.2em]">
        {chapter.roman}
      </span>
      <span className="pg-sub mt-[0.35em] block text-center">{chapter.title}</span>

      {/*
        The plate window. The cover is an illustration rather than a crop of a
        photograph, so it is shown whole, `contain` on a paper ground, and
        never cut off at the edges of the card.
      */}
      <span className="relative my-[0.55em] block min-h-0 w-full flex-1 overflow-hidden border border-[#8a6a2e]/30 bg-[#f1e6ca]">
        <Image
          src={chapter.cover ?? "/assets/paper/paper-sm.webp"}
          alt=""
          aria-hidden
          width={800}
          height={600}
          className="drag-none absolute inset-0 h-full w-full select-none object-contain transition-transform duration-[900ms] group-hover:scale-[1.04]"
        />
        <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <span className="pg-tiny rounded-full border border-maroon/45 bg-[#f3e5c8]/85 px-[1em] py-[0.35em]">
            Open
          </span>
        </span>
      </span>

      <span className="pg-tiny mt-auto block text-center">
        {chapter.projects.length} pieces
      </span>
    </motion.button>
  );
}
