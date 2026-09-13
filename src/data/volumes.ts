export type Volume = {
  /** Route slug */
  slug: string;
  /** Roman numeral shown above the spine title */
  numeral: string;
  /** Nav label */
  nav: string;
  /** Two-or-three line title as it appears on the book spine */
  spine: string[];
  /** Long title used on the standing spine of interior pages */
  standing: string[];
  /** Gold emblem foil-stamped on the spine */
  emblem: string;
  /** Position of the spine within the shelf photograph (fractions of the image) */
  slot: { left: number; width: number; top: number; height: number };
  /** Cropped spine artwork */
  art: string;
  /** Accent colour of the binding — used for glows and the index */
  binding: string;
  /** One-line description for the index & metadata */
  blurb: string;
};

export const VOLUMES: Volume[] = [
  {
    slug: "/",
    numeral: "VOLUME I",
    nav: "Home",
    spine: ["HOME"],
    standing: ["THE", "ARCHIVE"],
    emblem: "/assets/orn/em-fern.webp",
    slot: { left: 0.15212, width: 0.11289, top: 0.43096, height: 0.48536 },
    art: "/assets/shelf/book-1.webp",
    binding: "#2c3d2c",
    blurb: "The shelf. Every volume in the collection, bound and waiting.",
  },
  {
    slug: "/about",
    numeral: "VOLUME II",
    nav: "About",
    spine: ["THE", "INTRO"],
    standing: ["THE", "INTRODUCTION"],
    emblem: "/assets/orn/em-star.webp",
    slot: { left: 0.26501, width: 0.11769, top: 0.43096, height: 0.48396 },
    art: "/assets/shelf/book-2.webp",
    binding: "#5c2027",
    blurb: "How I got here — the academic foundation and the work that followed.",
  },
  {
    slug: "/approach",
    numeral: "VOLUME III",
    nav: "Approach",
    spine: ["BEHIND", "THE", "LEARNING"],
    standing: ["BEHIND THE", "LEARNING"],
    emblem: "/assets/orn/em-quill.webp",
    slot: { left: 0.38271, width: 0.11209, top: 0.43096, height: 0.48257 },
    art: "/assets/shelf/book-3.webp",
    binding: "#1e2c46",
    blurb: "What matters to me, the design principles, and the process I follow.",
  },
  {
    slug: "/work",
    numeral: "VOLUME IV",
    nav: "Work",
    spine: ["LEARNING", "BY DESIGN"],
    standing: ["LEARNING BY", "DESIGN"],
    emblem: "/assets/orn/em-branch.webp",
    slot: { left: 0.4948, width: 0.11529, top: 0.43096, height: 0.48257 },
    art: "/assets/shelf/book-4.webp",
    binding: "#4a3520",
    blurb: "Selected projects, resources and learning experiences from the collection.",
  },
  {
    slug: "/gallery",
    numeral: "VOLUME V",
    nav: "Gallery",
    spine: ["LEARNING", "IN ACTION"],
    standing: ["LEARNING IN", "ACTION"],
    emblem: "/assets/orn/em-compass.webp",
    slot: { left: 0.61009, width: 0.11289, top: 0.43096, height: 0.48117 },
    art: "/assets/shelf/book-5.webp",
    binding: "#25352a",
    blurb: "A plate section — each photograph is a design created from scratch.",
  },
  {
    slug: "/contact",
    numeral: "VOLUME VI",
    nav: "Contact",
    spine: ["CONTACT", "INFO"],
    standing: ["CONTACT", "INFO"],
    emblem: "/assets/orn/em-tree.webp",
    slot: { left: 0.72298, width: 0.11289, top: 0.43096, height: 0.48117 },
    art: "/assets/shelf/book-6.webp",
    binding: "#5c2027",
    blurb: "Questions, opportunities, or a conversation — the door is open.",
  },
];

/** The shelf opening, as fractions of the alcove photograph. Books are
 *  clipped to this box so a volume slides up behind the rail as it is pulled. */
export const SHELF_OPENING = {
  left: 0.14892,
  right: 0.83747,
  top: 0.40167,
  bottom: 0.96792,
};

export const bySlug = (slug: string) => VOLUMES.find((v) => v.slug === slug);

export const SITE = {
  owner: "Isha Shah",
  title: "The Learning Archive",
  tagline:
    "A collection of learning experiences, training design, facilitation, and professional development work.",
  phone: "407-724-2091",
  email: "Knights.mehfil@gmail.com",
  linkedin: "https://www.linkedin.com/",
};
