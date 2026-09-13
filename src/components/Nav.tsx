"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useScrolledPast } from "@/lib/hooks";
import { AnimatePresence, motion } from "motion/react";
import { VOLUMES } from "@/data/volumes";

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const scrolled = useScrolledPast(40);
  const isHome = pathname === "/";

  // Close the index when the route changes, adjusted during render rather
  // than in an effect, so the menu never paints over the new page.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-forest/92 backdrop-blur-md shadow-[0_10px_30px_-20px_rgba(0,0,0,0.9)]"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-[68px] max-w-[1420px] items-center justify-between px-5 md:h-[76px] lg:justify-center">
          {/* Wordmark, collapses to a monogram on small screens */}
          <Link
            href="/"
            className="font-display text-[19px] leading-none text-cream lg:hidden"
          >
            The Learning <span className="text-gold">Archive</span>
          </Link>

          {/* Desktop volume index, bracketed by the gilt filigree */}
          {!isHome && (
            <Image
              src="/assets/orn/corner.webp"
              alt=""
              width={458}
              height={458}
              aria-hidden
              priority
              className="drag-none pointer-events-none mr-6 hidden w-[62px] shrink-0 self-start opacity-95 lg:block xl:mr-10 xl:w-[78px]"
            />
          )}

          <ul className="hidden items-center gap-7 lg:flex xl:gap-11">
            {VOLUMES.map((v) => {
              const active = pathname === v.slug;
              return (
                <li key={v.slug} className="relative">
                  <Link
                    href={v.slug}
                    data-cursor="link"
                    className={`eyebrow relative block py-2 text-[13px] transition-colors duration-300 xl:text-[14px] ${
                      active
                        ? "text-cream"
                        : "text-cream/72 hover:text-gold-bright"
                    }`}
                  >
                    {v.nav.toUpperCase()}
                  </Link>
                  <AnimatePresence>
                    {active && (
                      <motion.span
                        layoutId="nav-rule"
                        className="absolute -bottom-0.5 left-1/2 block h-[9px] w-[46px] -translate-x-1/2"
                        transition={{
                          type: "spring",
                          stiffness: 320,
                          damping: 32,
                        }}
                      >
                        <Image
                          src="/assets/orn/rule.webp"
                          alt=""
                          width={97}
                          height={19}
                          className="drag-none h-full w-full object-contain"
                        />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>

          {!isHome && (
            <Image
              src="/assets/orn/corner.webp"
              alt=""
              width={458}
              height={458}
              aria-hidden
              priority
              className="drag-none pointer-events-none ml-6 hidden w-[62px] shrink-0 -scale-x-100 self-start opacity-95 lg:block xl:ml-10 xl:w-[78px]"
            />
          )}

          {/* Mobile trigger */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close the index" : "Open the index"}
            aria-expanded={open}
            className="group relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[6px] lg:hidden"
          >
            <span
              className={`block h-px w-6 bg-gold transition-transform duration-300 ${
                open ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-6 bg-gold transition-transform duration-300 ${
                open ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </nav>

        {/* Hairline under the bar */}
        <div
          className={`mx-auto h-px max-w-[1400px] bg-gradient-to-r from-transparent via-gold/45 to-transparent transition-opacity duration-500 ${
            scrolled || !isHome ? "opacity-100" : "opacity-0"
          }`}
        />
      </header>

      {/* Mobile, a table of contents rather than a menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 bg-forest-deep/97 backdrop-blur-lg lg:hidden"
          >
            <div className="gilt-frame" />
            <div className="flex h-full flex-col items-center justify-center gap-1 px-8">
              <p className="eyebrow mb-6 text-[11px] text-gold">
                Table of Contents
              </p>
              {VOLUMES.map((v, i) => (
                <motion.div
                  key={v.slug}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i + 0.1, duration: 0.5 }}
                  className="w-full max-w-xs"
                >
                  <Link
                    href={v.slug}
                    className="group flex items-baseline justify-between gap-3 border-b border-gold/15 py-3.5"
                  >
                    <span className="eyebrow text-[10px] text-gold/70">
                      {v.numeral}
                    </span>
                    <span
                      className={`font-display text-[26px] leading-tight transition-colors ${
                        pathname === v.slug
                          ? "text-gold-bright"
                          : "text-cream group-hover:text-gold-bright"
                      }`}
                    >
                      {v.nav}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
