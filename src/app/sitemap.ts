import type { MetadataRoute } from "next";
import { VOLUMES } from "@/data/volumes";

/** Written out at build time — the site is a static export. */
export const dynamic = "force-static";

/* `||`, not `??`: CI passes the variable through as an empty string when
   it is not set, and an empty string is not a usable base URL. */
const BASE =
  process.env.NEXT_PUBLIC_SITE_URL || "https://ishashah0309.github.io";

export default function sitemap(): MetadataRoute.Sitemap {
  return VOLUMES.map((v) => ({
    url: new URL(v.slug, BASE).toString(),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: v.slug === "/" ? 1 : 0.8,
  }));
}
