"use client";

import { motion } from "motion/react";

/**
 * Every route arrives the way a page settles after it has been turned.
 * Opacity only, a translate here would add its own scroll overflow to
 * layouts that are sized to exactly one screen.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
