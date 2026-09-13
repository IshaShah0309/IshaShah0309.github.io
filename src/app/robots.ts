import type { MetadataRoute } from "next";

/** Written out at build time, the site is a static export. */
export const dynamic = "force-static";

/* `||`, not `??`: CI passes the variable through as an empty string when
   it is not set, and an empty string is not a usable base URL. */
const BASE =
  process.env.NEXT_PUBLIC_SITE_URL || "https://ishashah0309.github.io";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", BASE).toString(),
  };
}
