/**
 * Global site constants.
 * Structural configuration only — populated further in the content phase.
 */
import { ORG_SAME_AS, GBP_MAPS } from "../data/sameAs.js";
export { ORG_SAME_AS, GBP_MAPS };

export const SITE_NAME = "Static Savvy Media";
// Canonical production origin (no trailing slash). The site is served on www; the bare domain
// 308-redirects to it. VITE_SITE_URL can override this at build time (Vite exposes VITE_* vars on
// import.meta.env; `process.env` does not exist in browser code, so it was silently ignored before).
const DEFAULT_SITE_URL = "https://www.staticsavvymedia.com";
export const SITE_URL = (
  import.meta.env.VITE_SITE_URL || DEFAULT_SITE_URL
).replace(/\/+$/, "");
export const SITE_TAGLINE = "Premium Digital Marketing Agency";
export const SITE_DESCRIPTION =
  "Digital marketing company in Madurai offering SEO, Local SEO, Google Ads and social media. Rated 4.9★ from 106 Google reviews.";
export const CONTACT_PHONE = "";
export const CONTACT_EMAIL = "info@staticsavvymedia.com";
export const WHATSAPP_NUMBER = "+91 99440 40345";
export const WHATSAPP_MESSAGE =
  "Hi Static Savvy Media, I would like to know more about your services.";

// Madurai Google Business Profile rating, owner-supplied (2026-10-12). Update both values together
// when the profile changes. Visible text only: do NOT emit as AggregateRating/Review JSON-LD
// (Google treats self-hosted first-party review markup as self-serving).
export const GOOGLE_RATING = "4.9";
export const GOOGLE_REVIEW_COUNT = "106";
export const GOOGLE_TRUST_LINE = `${GOOGLE_RATING}★ from ${GOOGLE_REVIEW_COUNT} Google reviews · Madurai HQ`;

// One phone line site-wide (owner, 24 Nov 2026): +91 99440 40345 on WhatsApp, for every market,
// Malaysia included. No Malaysian address or number on the site (owner, 24 Nov 2026); Malaysian
// pages are service areas served by the Madurai business (shared Madurai @id in JSON-LD).
export const WHATSAPP_HREF = "https://wa.me/919944040345";
export const CALL_HREF = "tel:+919944040345";

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/staticsavvymedia",
  facebook: "https://www.facebook.com/staticsavvymedia",
  linkedin: "https://www.linkedin.com/company/staticsavvymedia/",
  x: "https://x.com/ssavvymedia",
  youtube: "https://www.youtube.com/@staticsavvymedia",
  pinterest: "https://in.pinterest.com/Staticsavvymedia/",
};

// Madurai HQ (visible hours from the offices block: Mon–Sat, 9:00 AM – 6:30 PM IST).
export const MADURAI_OFFICE = {
  name: "Static Savvy Media, Madurai",
  phoneDisplay: "+91 99440 40345",
  streetAddress: "2nd Floor, 4/3, Srinivasa Perumal Koil St, Kamarajar Salai",
  postalCode: "625009",
  addressLocality: "Madurai",
  addressRegion: "Tamil Nadu",
  addressCountry: "IN",
  hoursDisplay: "Mon–Sat, 9:00 AM – 6:30 PM IST",
};

export const MADURAI_POSTAL_ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: MADURAI_OFFICE.streetAddress,
  addressLocality: MADURAI_OFFICE.addressLocality,
  addressRegion: MADURAI_OFFICE.addressRegion,
  postalCode: MADURAI_OFFICE.postalCode,
  addressCountry: MADURAI_OFFICE.addressCountry,
};

export const MADURAI_OPENING_HOURS_SPEC = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "09:00",
    closes: "18:30",
  },
];

// Thoothukudi office. Hours on the site are "By appointment" only — no OpeningHoursSpecification.
export const THOOTHUKUDI_OFFICE = {
  name: "Static Savvy Media, Thoothukudi",
  phoneDisplay: "+91 99440 40345",
  streetAddress: "90, Peria Kadai St, Matha Koil",
  postalCode: "628001",
  addressLocality: "Thoothukudi",
  addressRegion: "Tamil Nadu",
  addressCountry: "IN",
};

export const THOOTHUKUDI_POSTAL_ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: THOOTHUKUDI_OFFICE.streetAddress,
  addressLocality: THOOTHUKUDI_OFFICE.addressLocality,
  addressRegion: THOOTHUKUDI_OFFICE.addressRegion,
  postalCode: THOOTHUKUDI_OFFICE.postalCode,
  addressCountry: THOOTHUKUDI_OFFICE.addressCountry,
};
