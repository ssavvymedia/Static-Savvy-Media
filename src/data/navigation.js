import { services } from "./services.js";
import { locations, locationGroups } from "./locations.js";
import { industries } from "./industries.js";
import { caseStudies } from "./caseStudies.js";
import { blogCategories, blogPosts } from "./blog.js";

/* Resources dropdown (v2 header). */
export const RESOURCE_LINKS = [
  { slug: "blog", name: "Blog & Guides", path: "/blog/" },
  { slug: "faq", name: "FAQ", path: "/faq/" },
  { slug: "reviews", name: "Google Reviews", path: "/about/reviews/" },
  { slug: "contact", name: "Contact", path: "/contact/" },
];

/* v2 header: Industries, Growth Solutions (services), Locations (Madurai HQ first), Resources. */
export const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Industries", path: "/industries/", menu: industries },
  { label: "Growth Solutions", path: "/services/", menu: services },
  { label: "Case Studies", path: "/case-studies/" },
  { label: "Locations", path: "/locations/", menu: locationGroups },
  { label: "Resources", path: "/blog/", menu: RESOURCE_LINKS },
  { label: "About", path: "/about/" },
];

export const FOOTER_LINKS = {
  services,
  locations: locationGroups,
  industries,
  company: [
    { label: "About", path: "/about/" },
    { label: "Case Studies", path: "/case-studies/" },
    { label: "Blog", path: "/blog/" },
    { label: "Contact", path: "/contact/" },
  ],
  legal: [
    { label: "FAQ", path: "/faq/" },
    { label: "Privacy Policy", path: "/privacy-policy/" },
    { label: "Terms of Service", path: "/terms/" },
    { label: "Sitemap", path: "/sitemap/" },
  ],
};

export const BREADCRUMB_LABELS = {
  about: "About",
  "deepan-kanz": "Deepan Kanz",
  reviews: "Reviews",
  services: "Services",
  "geo-aeo-ai-search": "GEO, AEO & AI Search",
  seo: "SEO",
  "local-seo": "Local SEO",
  "google-ads": "Google Ads",
  "social-media": "Social Media",
  "social-media-marketing": "Social Media Marketing",
  website: "Website",
  "website-design-development": "Website Design & Development",
  "ai-business-automation": "AI Business Automation",
  "corporate-photography-video": "Corporate Photography & Video",
  "ai-video-creation": "AI Video Creation",
  "product-photography-creative-design":
    "Product Photography & Creative Design",
  locations: "Locations",
  madurai: "Madurai",
  thoothukudi: "Thoothukudi",
  "tamil-nadu": "Tamil Nadu",
  "kuala-lumpur": "Kuala Lumpur",
  chennai: "Chennai",
  coimbatore: "Coimbatore",
  trichy: "Trichy",
  salem: "Salem",
  tirunelveli: "Tirunelveli",
  tiruppur: "Tiruppur",
  selangor: "Selangor",
  singapore: "Singapore",
  dubai: "Dubai",
  dindigul: "Dindigul",
  sivakasi: "Sivakasi",
  "shah-alam": "Shah Alam",
  "petaling-jaya": "Petaling Jaya",
  "advertising-agency": "Advertising Agency",
  "top-digital-marketing-companies-in-madurai": "Top Digital Marketing Companies in Madurai",
  malaysia: "Malaysia",
  industries: "Industries",
  "retail-ecommerce": "Retail & E-Commerce",
  "healthcare-clinics": "Healthcare & Clinics",
  "education-training": "Education & Training",
  "hospitality-hotels": "Hospitality & Hotels",
  "textiles-madurai": "Textiles (Madurai)",
  "port-marine-industrial-thoothukudi":
    "Port, Marine & Industrial (Thoothukudi)",
  "smes-malaysia-grant-eligible": "SMEs (Malaysia, Grant Eligible)",
  "real-estate-builders": "Real Estate & Builders",
  "ai-services": "AI Services",
  "photography-video": "Photography & Video",
  "case-studies": "Case Studies",
  blog: "Blog",
  "geo-aeo": "GEO & AEO",
  "local-marketing": "Local Marketing",
  "what-is-generative-engine-optimization":
    "What is Generative Engine Optimization",
  "what-is-answer-engine-optimization": "What is Answer Engine Optimization",
  "seo-agency-madurai-complete-guide": "SEO Agency Madurai Complete Guide",
  "digital-marketing-malaysia-sme-grant-guide":
    "Digital Marketing Malaysia SME Grant Guide",
  "local-seo-thoothukudi-businesses": "Local SEO for Thoothukudi Businesses",
  contact: "Contact",
  faq: "FAQ",
  "privacy-policy": "Privacy Policy",
  terms: "Terms",
  sitemap: "Sitemap",
};

export function getBreadcrumbLabel(segment) {
  return BREADCRUMB_LABELS[segment] || segment;
}

export {
  services,
  locations,
  locationGroups,
  industries,
  caseStudies,
  blogCategories,
  blogPosts,
};
