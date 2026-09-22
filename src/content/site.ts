/**
 * Single source of truth for every business fact on the page.
 *
 * Hours, prices and the address each appear in more than one place, and the
 * client will change them — nothing here should be inlined into markup.
 */

/** TODO(client): real booking provider URL. Every booking CTA reads this. */
export const BOOKING_URL = "#booking";

export const salon = {
  name: "Adore Nail Lounge",
  tagline: "Careful hands, unhurried appointments, and a room that stays quiet.",
  taglineLong:
    "Careful hands, unhurried appointments, and a room that stays quiet. North Lamar, Austin.",
  phone: {
    display: "(512) 775-0134",
    href: "tel:5127750134",
  },
  address: {
    line1: "4400 N Lamar Blvd, Ste 103",
    line2: "Austin, TX 78756",
    short: "4400 N Lamar Blvd, Ste 103 · Austin, TX",
    legal: "4400 N Lamar Blvd Ste 103, Austin TX 78756",
    query: "4400 N Lamar Blvd Ste 103, Austin TX 78756",
  },
  hours: {
    rows: [
      { label: "Monday – Saturday", value: "9:30 AM – 7:00 PM" },
      { label: "Sunday", value: "11:00 AM – 5:00 PM" },
    ],
    compact: ["Mon – Sat · 9:30 – 7:00", "Sunday · 11:00 – 5:00", "Walk-ins as chairs allow"],
    mobileCompact: "Mon–Sat · 9:30–7:00",
    todayNotice: "Open today until 7:00 PM",
    openNowUntil: "· until 7:00 PM",
    walkIns: "Walk-ins welcome when the chairs are free",
  },
  reviews: {
    rating: "4.7",
    count: "600+",
    summaryShort: "· 600+ Google reviews",
    a11yLabel: "Rated 4.7 out of 5 from over 600 Google reviews",
    /** TODO(client): the reviewer's real first name, to replace the generic byline. */
    quote: "I adore Adore! Very clean salon, excellent service, even better results!",
    byline: "Satisfied Customer · Google review",
    /** TODO(client): link to the Google reviews listing. */
    url: "#reviews",
  },
} as const;

export const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  salon.address.query,
)}`;

/**
 * Keyless Google Maps embed. Swap for the Maps Embed API
 * (`https://www.google.com/maps/embed/v1/place?key=…`) if the client provides a key.
 */
export const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  salon.address.query,
)}&output=embed`;

export const navLinks = [
  { label: "Home", href: "/", current: true },
  { label: "About us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact us", href: "#visit" },
] as const;

export const socialLinks = [
  /** TODO(client): real profile URLs. */
  { label: "Instagram", href: "#instagram" },
  { label: "Facebook", href: "#facebook" },
  { label: "Google Business", href: "#google-business" },
] as const;

export type Service = {
  name: string;
  detail: string;
  price: string;
  /** Mobile shows a three-row subset of the same table. */
  onMobile?: boolean;
  mobileDetail?: string;
};

export const services: Service[] = [
  { name: "Gel manicure", detail: "60 min · soak-off included", mobileDetail: "60 min", price: "$45", onMobile: true },
  { name: "Classic manicure", detail: "40 min", price: "$30" },
  { name: "Acrylic full set", detail: "75 min · shaping to taste", mobileDetail: "75 min", price: "$60", onMobile: true },
  { name: "Spa pedicure", detail: "55 min", price: "$55", onMobile: true },
  { name: "Nail art", detail: "per nail, from", price: "$5" },
];

export const roomStats = [
  { value: "10", unit: "pt", caption: "Shape checked under lamp" },
  { value: "3", unit: "coats", caption: "Cured one at a time" },
  { value: "0", unit: "", caption: "Rushed finishes" },
] as const;

/**
 * Photo slots. `src` is null until the client supplies real photography —
 * drop a file into /public/images and set `src` (plus `width`/`height` when
 * known) and the placeholder disappears with no other code change.
 *
 * Gallery tiles deliberately adopt each photo's own aspect ratio, so a set of
 * mixed portrait/landscape shots fills the masonry columns edge to edge.
 */
export type Photo = {
  id: string;
  label: string;
  src: string | null;
  width?: number;
  height?: number;
  alt?: string;
  /** Mobile shows a four-photo subset of the same set. */
  onMobile?: boolean;
};

export const heroPhoto: Photo = {
  id: "hero",
  label: "Hero — pedicure in progress",
  // NOTE: the supplied file is only 500x500. It cover-crops into a ~772x640
  // frame on desktop, so it upscales and reads soft. Ask the client for the
  // original at >=1600px on the long edge.
  src: "/images/hero-pedicure.jpg",
  width: 500,
  height: 500,
  alt: "A pedicure in progress, toes finished in black polish beside pink orchids",
};

export const roomPhoto: Photo = {
  id: "room",
  // The design file labels this slot "The room — chairs, light", so the salon
  // interior goes here rather than the lash-detail banner the mockup used —
  // the handoff flagged that shot as a mismatch with the copy beside it.
  label: "The room — chairs, light",
  src: "/images/the-room-interior.jpg",
  width: 1500,
  height: 2000,
  alt: "The pedicure chairs at Adore Nail Lounge, lit by the front windows",
};

export const galleryPhotos: Photo[] = [
  {
    id: "g1",
    label: "Classic red",
    src: "/images/gallery/classic-red-coffin.jpg",
    width: 1500,
    height: 2000,
    onMobile: true,
    alt: "Two hands with long coffin nails in glossy classic red",
  },
  {
    id: "g2",
    label: "Deep red",
    src: "/images/gallery/deep-red-coffin.jpg",
    width: 1500,
    height: 2000,
    onMobile: true,
    alt: "Coffin nails in a deep wine red, photographed on a crystal backdrop",
  },
  {
    id: "g3",
    label: "Floral nail art",
    src: "/images/gallery/floral-nail-art.jpg",
    width: 1500,
    height: 2000,
    onMobile: true,
    alt: "Almond nails with red tips, yellow line work and hand-painted daisies",
  },
  {
    id: "g4",
    label: "Glitter French",
    src: "/images/gallery/glitter-french-coffin.jpg",
    width: 1500,
    height: 2000,
    onMobile: true,
    alt: "Matte nude coffin acrylics finished with wide iridescent glitter tips",
  },
  {
    id: "g5",
    label: "Pink French",
    src: "/images/gallery/pink-french-natural.jpg",
    width: 1500,
    height: 2000,
    alt: "Soft pink French tips on short natural nails",
  },
  // One more photo completes the designed six-up desktop grid (two per column).
  // Add an entry — `onMobile: true` puts it in the four-tile mobile subset.
];

export const copy = {
  hero: {
    eyebrowRating: salon.reviews.rating,
    headline: ["Nails you'll", "adore", "looking at."],
    ledeDesktop:
      "A quiet nail lounge on North Lamar. Meticulous gel, natural-nail care and pedicures that take their time.",
    ledeMobile:
      "A quiet North Lamar nail lounge. Meticulous gel, natural-nail care and pedicures that take their time.",
  },
  room: {
    eyebrow: "The room",
    heading: "Unhurried, on purpose",
    body:
      "Every set is filed to one shape, cuticles worked by hand rather than rushed, and each coat cured fully before the next goes on. We check the line at the nail bed under lamp light — if it isn't clean, it comes off and goes on again.",
  },
  gallery: {
    eyebrow: "Recent work",
    heading: "Straight from the chair",
    link: "See the full gallery",
    more: "See more work",
  },
  menu: {
    eyebrow: "The menu",
    heading: "Services & pricing",
    more: "See more services",
    book: "Book a service",
  },
  review: {
    eyebrow: "Loved by Austin",
    readAll: "Read all reviews",
  },
  visit: {
    eyebrow: "Visit",
    heading: "Find the lounge",
    directions: "Get directions",
  },
  footer: {
    legal: `© ${new Date().getFullYear()} ${salon.name} · ${salon.address.legal}`,
    policies: "Privacy · Accessibility",
  },
} as const;
