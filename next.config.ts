import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Every route is already prerendered, so the whole site is written out as
   * plain files into `out/` and served from GitHub Pages. There is no server.
   */
  output: "export",

  /**
   * Export each route as `about/index.html` rather than `about.html`, which is
   * what a static host resolves `/about` to without any rewrite rules.
   */
  trailingSlash: true,

  /**
   * The dev server refuses cross-origin requests by default. These let it be
   * opened from another machine on the LAN, or through a Cloudflare quick
   * tunnel. Development only - it has no effect on a production build.
   */
  allowedDevOrigins: ["*.trycloudflare.com", "10.119.74.244"],

  /** No on-screen dev badge - the scene is the interface. */
  devIndicators: false,

  images: {
    /**
     * Every asset in /public/assets was cut, scaled and encoded by hand from
     * the Canva source. Re-encoding them through the image optimiser only
     * costs detail - the book spines in particular were being served at a
     * fraction of their real size and then stretched.
     */
    unoptimized: true,
  },
};

export default nextConfig;
