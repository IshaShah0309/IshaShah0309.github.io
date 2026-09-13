import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost, Outfit } from "next/font/google";
import "./globals.css";
import { SITE } from "@/data/volumes";
import Nav from "@/components/Nav";
import SmoothScroll from "@/components/SmoothScroll";
import Grain from "@/components/Grain";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jost",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://the-learning-archive.local"),
  title: {
    default: `${SITE.title} — ${SITE.owner}`,
    template: `%s — ${SITE.title}`,
  },
  description: SITE.tagline,
  openGraph: {
    title: `${SITE.title} — ${SITE.owner}`,
    description: SITE.tagline,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#121d12",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jost.variable} ${outfit.variable}`}
    >
      <body className="min-h-screen antialiased">
        <a
          href="#content"
          className="eyebrow sr-only rounded-full border border-gold bg-forest-deep px-5 py-3 text-[11px] text-gold focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100]"
        >
          Skip to content
        </a>
        <SmoothScroll />
        <Nav />
        <main id="content">{children}</main>
        <Grain />
      </body>
    </html>
  );
}
