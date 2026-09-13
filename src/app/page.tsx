import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import { SITE } from "@/data/volumes";

export const metadata: Metadata = {
  title: {
    absolute: `${SITE.title} | ${SITE.owner}`,
  },
  description: SITE.tagline,
};

/** Home is the shelf and nothing else, one screen, one decision. */
export default function HomePage() {
  return <Hero />;
}
