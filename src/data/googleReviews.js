import { GBP_MAPS } from './sameAs.js'

/**
 * Real Google reviews, copied word for word from the Static Savvy Media Madurai Google Business
 * Profile on 28 Oct 2026 (4.9 from 106 reviews; all quoted reviews are 5 stars).
 * Do NOT edit the wording, add, or invent reviews. Visible on-page only: no Review or
 * AggregateRating schema (self-serving review markup is not eligible and must stay off Service pages).
 */
export const GBP_REVIEW_SUMMARY = {
  rating: 4.9,
  count: 106,
  url: GBP_MAPS.madurai,
  copied: '2026-10-28',
}

export const GOOGLE_REVIEWS = [
  { id: 'rkee', name: 'RKee', text: 'Static Savvy Media provided outstanding SEO and social media marketing services. We noticed a significant increase in inquiries and online visibility. Thank you to the entire team for the excellent support' },
  { id: 'anish-fathima', name: 'Anish Fathima', text: 'Static savvy is the best local SEO agency in madurai. They streamlined our Google My Business profile and Website SEO spotlessly and now we are prioritizing on the first page. Thanks Deepan sir, he explained everything evidently, impeccable service, worth checking out.' },
  { id: 'rabiyathul-basaria', name: 'Rabiyathul Basaria', text: 'We approached Static Savvy Media for Local SEO and citation building. Now our business appears in top 3 map pack in Madurai. Excellent service and good communication.' },
  { id: 'naze-raffuldeen', name: 'Naze Raffuldeen', text: 'Very satisfied with Static Savvy Media team. They redesigned our website and optimized it for Local SEO. Now we are getting genuine leads from Madurai customers.' },
  { id: 'pooja-singh', name: 'Pooja Singh', text: 'If you’re looking for a reliable digital marketing company in Madurai, Static Savvy Media is the right choice. They handled our social media marketing and local SEO perfectly. Great results and timely support.' },
  { id: 'vairamani-vadugasamy', name: 'Vairamani Vadugasamy', text: 'Great experience with Static Savvy Media. Their GMB optimization helped us get more calls and walk-in customers.' },
  { id: 'hari-haran', name: 'hari haran', text: 'I have been working with Static Savvy Media for several months now, and I am thoroughly impressed with the level of expertise and customer service they provide. They have helped me successfully reach my target audience and increase my ROI. I highly recommend this agency for any digital marketing needs.' },
]

/** Deterministic rotation: `count` consecutive reviews starting at `offset` (wraps). */
export function pickReviews(offset = 0, count = 3) {
  const n = GOOGLE_REVIEWS.length
  return Array.from({ length: Math.min(count, n) }, (_, i) => GOOGLE_REVIEWS[(offset + i) % n])
}
