import {
  SITE_NAME,
  SITE_URL,
  MALAYSIA_OFFICE,
  MALAYSIA_POSTAL_ADDRESS,
  MALAYSIA_OPENING_HOURS_SPEC,
} from "../utils/constants.js";

// Single source of truth for the site origin (see utils/constants.js). Canonicals below are
// normalised to the www + trailing-slash form by setSeo(), whatever form is written here.
const BASE_URL = SITE_URL;

/**
 * Centralized SEO Configuration for Static Savvy Media.
 * Maps every single public route to its unique SEO metadata object.
 */
export const seoConfig = {
  "/": {
    title:
      "Digital Marketing Company in Madurai — SEO & Ads | Static Savvy Media",
    slug: "",
    seo: {
      title:
        "Digital Marketing Company in Madurai — SEO & Ads | Static Savvy Media",
      description:
        "Need a digital marketing company in Madurai? Rated 4.9★ from 100+ Google reviews. SEO, Local SEO, Google Ads & social media that bring enquiries. WhatsApp us today.",
      canonical: `${BASE_URL}/`,
      focusKeyword: "digital marketing company in madurai",
      ogTitle:
        "Digital Marketing Company in Madurai — SEO & Ads | Static Savvy Media",
      ogDescription:
        "Need a digital marketing company in Madurai? Rated 4.9★ from 100+ Google reviews. SEO, Local SEO, Google Ads & social media that bring enquiries. WhatsApp us today.",
      ogImage: `${BASE_URL}/og/heroimage.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SITE_NAME,
        url: BASE_URL,
      },
      robots: "index,follow",
    },
  },
  "/about": {
    title: "About Static Savvy Media | Digital Marketing Agency in Madurai",
    slug: "about",
    seo: {
      title: "About Static Savvy Media | Digital Marketing Agency in Madurai",
      description:
        "Learn about Static Savvy Media, a Madurai digital marketing agency rated 4.9★ from 100+ Google reviews. SEO, Local SEO, Google Ads & AI search for Tamil Nadu and Malaysia.",
      canonical: `${BASE_URL}/about`,
      focusKeyword: "digital marketing agency madurai",
      ogTitle: "About Static Savvy Media | Digital Marketing Agency in Madurai",
      ogDescription:
        "Learn about Static Savvy Media, a Madurai digital marketing agency rated 4.9★ from 100+ Google reviews. SEO, Local SEO, Google Ads & AI search for Tamil Nadu and Malaysia.",
      ogImage: `${BASE_URL}/og/about-about.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: SITE_NAME,
        url: `${BASE_URL}/about`,
      },
      robots: "index,follow",
    },
  },
  "/about/deepan-kanz": {
    title: "Deepan Kanz — Founder & Lead Strategist | Static Savvy Media",
    slug: "about/deepan-kanz",
    seo: {
      title: "Deepan Kanz — Founder & Lead Strategist | Static Savvy Media",
      description:
        "Meet Deepan Kanz, Founder & Digital Growth Strategist at Static Savvy Media, specializing in SEO, GEO/AEO, and AI marketing solutions.",
      canonical: `${BASE_URL}/about/deepan-kanz`,
      focusKeyword: "Deepan Kanz digital marketing",
      ogTitle: "Deepan Kanz — Founder & Lead Strategist | Static Savvy Media",
      ogDescription:
        "Meet Deepan Kanz, Founder & Digital Growth Strategist at Static Savvy Media.",
      ogImage: `${BASE_URL}/og/about-deepanfounder.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Deepan Kanz",
        jobTitle: "Founder & Lead Growth Strategist",
        worksFor: { "@type": "Organization", name: SITE_NAME },
      },
      robots: "index,follow",
    },
  },
  "/about/reviews": {
    title: "Client Reviews & Testimonials | Static Savvy Media",
    slug: "about/reviews",
    seo: {
      title: "Client Reviews & Testimonials | Static Savvy Media",
      description:
        "Read client reviews, feedback, and success stories from businesses in Madurai, Thoothukudi, and Malaysia who grew with Static Savvy Media.",
      canonical: `${BASE_URL}/about/reviews`,
      focusKeyword: "digital marketing agency reviews",
      ogTitle: "Client Reviews & Testimonials | Static Savvy Media",
      ogDescription:
        "Read client reviews and success stories from businesses that grew with Static Savvy Media.",
      ogImage: `${BASE_URL}/og/about-about.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: SITE_NAME,
        url: `${BASE_URL}/about/reviews`,
      },
      robots: "index,follow",
    },
  },
  "/services": {
    title:
      "Digital Marketing Services — SEO, GEO/AEO, Ads & AI | Static Savvy Media",
    slug: "services",
    seo: {
      title:
        "Digital Marketing Services — SEO, GEO/AEO, Ads & AI | Static Savvy Media",
      description:
        "Explore our digital marketing services: SEO, Generative Engine Optimization, Local SEO, Google Ads, Social Media, Web Development, and AI Automation.",
      canonical: `${BASE_URL}/services`,
      focusKeyword: "digital marketing services",
      ogTitle:
        "Digital Marketing Services — SEO, GEO/AEO, Ads & AI | Static Savvy Media",
      ogDescription:
        "Explore our digital marketing services: SEO, GEO/AEO, Local SEO, Google Ads, Social Media, Web Development, and AI Automation.",
      ogImage: `${BASE_URL}/og/services-services.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Digital Marketing Services",
        provider: { "@type": "Organization", name: SITE_NAME },
      },
      robots: "index,follow",
    },
  },
  "/services/seo": {
    title: "SEO Services — Search Engine Optimization | Static Savvy Media",
    slug: "services/seo",
    seo: {
      title: "SEO Services — Search Engine Optimization | Static Savvy Media",
      description:
        "Drive sustainable organic growth with technical SEO, keyword strategy, high-intent content, and link building from Static Savvy Media.",
      canonical: `${BASE_URL}/services/seo`,
      focusKeyword: "SEO services",
      ogTitle: "SEO Services — Search Engine Optimization | Static Savvy Media",
      ogDescription:
        "Drive sustainable organic growth with technical SEO, keyword strategy, high-intent content, and link building.",
      ogImage: `${BASE_URL}/og/services-01seo.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "SEO Services",
        serviceType: "Search Engine Optimization",
        provider: { "@type": "Organization", name: SITE_NAME },
      },
      robots: "index,follow",
    },
  },
  "/services/geo-aeo-ai-search": {
    title: "GEO & AEO Services — AI Search Optimization | Static Savvy Media",
    slug: "services/geo-aeo-ai-search",
    seo: {
      title: "GEO & AEO Services — AI Search Optimization | Static Savvy Media",
      description:
        "Optimize your business to get cited by ChatGPT, Perplexity, Claude, and Google AI Overviews with Generative & Answer Engine Optimization.",
      canonical: `${BASE_URL}/services/geo-aeo-ai-search`,
      focusKeyword: "GEO AEO services",
      ogTitle:
        "GEO & AEO Services — AI Search Optimization | Static Savvy Media",
      ogDescription:
        "Optimize your business to get cited by ChatGPT, Perplexity, Claude, and Google AI Overviews.",
      ogImage: `${BASE_URL}/og/services-02geoaeo.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Generative Engine Optimization",
        provider: { "@type": "Organization", name: SITE_NAME },
      },
      robots: "index,follow",
    },
  },
  "/services/local-seo": {
    title:
      "Local SEO Services — Google Business Profile Optimization | Static Savvy Media",
    slug: "services/local-seo",
    seo: {
      title:
        "Local SEO Services — Google Business Profile Optimization | Static Savvy Media",
      description:
        "Improve your visibility in Google Maps and high-intent local searches in your city with Local SEO and citation management.",
      canonical: `${BASE_URL}/services/local-seo`,
      focusKeyword: "local SEO services",
      ogTitle:
        "Local SEO Services — Google Business Profile Optimization | Static Savvy Media",
      ogDescription:
        "Improve your visibility in Google Maps and local searches in your city with Local SEO.",
      ogImage: `${BASE_URL}/og/services-03localseo.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Local SEO Services",
        provider: { "@type": "Organization", name: SITE_NAME },
      },
      robots: "index,follow",
    },
  },
  "/services/google-ads": {
    title: "Google Ads & PPC Management Services | Static Savvy Media",
    slug: "services/google-ads",
    seo: {
      title: "Google Ads & PPC Management Services | Static Savvy Media",
      description:
        "Maximize ROI with targeted Google Search, Display, Shopping, and YouTube ad campaigns optimized for high-converting leads.",
      canonical: `${BASE_URL}/services/google-ads`,
      focusKeyword: "Google Ads management",
      ogTitle: "Google Ads & PPC Management Services | Static Savvy Media",
      ogDescription:
        "Maximize ROI with targeted Google Search, Display, Shopping, and YouTube ad campaigns.",
      ogImage: `${BASE_URL}/og/services-04googleads.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Google Ads Management",
        provider: { "@type": "Organization", name: SITE_NAME },
      },
      robots: "index,follow",
    },
  },
  "/services/social-media-marketing": {
    title:
      "Social Media Marketing Services — Madurai, Tamil Nadu & Malaysia | Static Savvy Media",
    slug: "services/social-media-marketing",
    seo: {
      title:
        "Social Media Marketing Services — Madurai, Tamil Nadu & Malaysia | Static Savvy Media",
      description:
        "Social media marketing services for businesses in Tamil Nadu and Malaysia: Instagram, Facebook, YouTube and LinkedIn content plus Meta ads. Rated 4.9★ on Google.",
      canonical: `${BASE_URL}/services/social-media-marketing`,
      focusKeyword: "social media marketing madurai",
      ogTitle:
        "Social Media Marketing Services — Madurai, Tamil Nadu & Malaysia | Static Savvy Media",
      ogDescription:
        "Social media marketing services for businesses in Tamil Nadu and Malaysia: Instagram, Facebook, YouTube and LinkedIn content plus Meta ads. Rated 4.9★ on Google.",
      ogImage: `${BASE_URL}/og/services-05socialmediamarketing.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Social Media Marketing",
        provider: { "@type": "Organization", name: SITE_NAME },
      },
      robots: "index,follow",
    },
  },
  "/services/website-design-development": {
    title: "Website Design & Development Services | Static Savvy Media",
    slug: "services/website-design-development",
    seo: {
      title: "Website Design & Development Services | Static Savvy Media",
      description:
        "Fast, mobile-responsive, conversion-optimized websites built with modern UI/UX, SEO best practices, and lightning-fast page speeds.",
      canonical: `${BASE_URL}/services/website-design-development`,
      focusKeyword: "website design and development",
      ogTitle: "Website Design & Development Services | Static Savvy Media",
      ogDescription:
        "Fast, mobile-responsive, conversion-optimized websites built with modern UI/UX and SEO best practices.",
      ogImage: `${BASE_URL}/og/services-06website.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Website Design & Development",
        provider: { "@type": "Organization", name: SITE_NAME },
      },
      robots: "index,follow",
    },
  },
  "/services/ai-business-automation": {
    title: "AI Business Automation Services | Static Savvy Media",
    slug: "services/ai-business-automation",
    seo: {
      title: "AI Business Automation Services | Static Savvy Media",
      description:
        "Streamline operations, automate lead nurture workflows, and deploy intelligent AI chatbots tailored for growing businesses.",
      canonical: `${BASE_URL}/services/ai-business-automation`,
      focusKeyword: "AI business automation",
      ogTitle: "AI Business Automation Services | Static Savvy Media",
      ogDescription:
        "Streamline operations, automate lead nurture workflows, and deploy intelligent AI chatbots.",
      ogImage: `${BASE_URL}/og/services-07aibusiness.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "AI Business Automation",
        provider: { "@type": "Organization", name: SITE_NAME },
      },
      robots: "index,follow",
    },
  },
  "/services/corporate-photography-video": {
    title: "Corporate Photography & Video Production | Static Savvy Media",
    slug: "services/corporate-photography-video",
    seo: {
      title: "Corporate Photography & Video Production | Static Savvy Media",
      description:
        "High-quality corporate video production, brand shoots, and commercial photography that build trust and elevate brand positioning.",
      canonical: `${BASE_URL}/services/corporate-photography-video`,
      focusKeyword: "corporate photography and video",
      ogTitle: "Corporate Photography & Video Production | Static Savvy Media",
      ogDescription:
        "High-quality corporate video production, brand shoots, and commercial photography.",
      ogImage: `${BASE_URL}/og/services-09corporate.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Corporate Photography & Video",
        provider: { "@type": "Organization", name: SITE_NAME },
      },
      robots: "index,follow",
    },
  },
  "/services/ai-video-creation": {
    title: "AI Video Creation Services | Static Savvy Media",
    slug: "services/ai-video-creation",
    seo: {
      title: "AI Video Creation Services | Static Savvy Media",
      description:
        "Create high-engaging promotional and educational videos at scale using state-of-the-art AI video creation technology.",
      canonical: `${BASE_URL}/services/ai-video-creation`,
      focusKeyword: "AI video creation",
      ogTitle: "AI Video Creation Services | Static Savvy Media",
      ogDescription:
        "Create high-engaging promotional and educational videos at scale using AI video creation technology.",
      ogImage: `${BASE_URL}/og/services-08aivideo.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "AI Video Creation",
        provider: { "@type": "Organization", name: SITE_NAME },
      },
      robots: "index,follow",
    },
  },
  "/services/product-photography-creative-design": {
    title: "Product Photography & Creative Design | Static Savvy Media",
    slug: "services/product-photography-creative-design",
    seo: {
      title: "Product Photography & Creative Design | Static Savvy Media",
      description:
        "E-commerce product photography, lifestyle visuals, and graphic design that capture attention and drive sales conversions.",
      canonical: `${BASE_URL}/services/product-photography-creative-design`,
      focusKeyword: "product photography creative design",
      ogTitle: "Product Photography & Creative Design | Static Savvy Media",
      ogDescription:
        "E-commerce product photography, lifestyle visuals, and graphic design that capture attention.",
      ogImage: `${BASE_URL}/og/services-10product.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Product Photography & Creative Design",
        provider: { "@type": "Organization", name: SITE_NAME },
      },
      robots: "index,follow",
    },
  },

  // Service Location Pages
  "/services/seo/madurai": {
    title: "SEO Company in Madurai | SEO Services | Static Savvy Media",
    slug: "services/seo/madurai",
    seo: {
      title: "SEO Company in Madurai | SEO Services | Static Savvy Media",
      description:
        "SEO company in Madurai rated 4.9★ from 100+ Google reviews. Technical, on-page and content SEO services that turn Google searches into enquiries.",
      canonical: `${BASE_URL}/services/seo/madurai`,
      focusKeyword: "SEO company in Madurai",
      ogTitle: "SEO Company in Madurai | SEO Services | Static Savvy Media",
      ogDescription:
        "SEO company in Madurai rated 4.9★ from 100+ Google reviews. Technical, on-page and content SEO services that turn Google searches into enquiries.",
      ogImage: `${BASE_URL}/og/locations-01madurai.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: `${SITE_NAME} - SEO Agency Madurai`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Madurai",
          addressRegion: "Tamil Nadu",
          addressCountry: "IN",
        },
      },
      robots: "index,follow",
    },
  },
  "/services/seo/thoothukudi": {
    title: "SEO Services Thoothukudi | Static Savvy Media",
    slug: "services/seo/thoothukudi",
    seo: {
      title: "SEO Services Thoothukudi | Static Savvy Media",
      description:
        "Boost search rankings and generate qualified organic leads for maritime, port, industrial, and local businesses in Thoothukudi.",
      canonical: `${BASE_URL}/services/seo/thoothukudi`,
      focusKeyword: "SEO services Thoothukudi",
      ogTitle: "SEO Services Thoothukudi | Static Savvy Media",
      ogDescription:
        "Boost search rankings and generate qualified organic leads for businesses in Thoothukudi.",
      ogImage: `${BASE_URL}/og/locations-03thoothukudi.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: `${SITE_NAME} - SEO Services Thoothukudi`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Thoothukudi",
          addressRegion: "Tamil Nadu",
          addressCountry: "IN",
        },
      },
      robots: "index,follow",
    },
  },
  "/services/seo/malaysia": {
    title:
      "SEO Services Malaysia | SEO Agency for KL & Selangor | Static Savvy Media",
    slug: "services/seo/malaysia",
    seo: {
      title:
        "SEO Services Malaysia | SEO Agency for KL & Selangor | Static Savvy Media",
      description:
        "SEO services in Malaysia from our Rawang, Selangor office: technical SEO, English and Bahasa Malaysia keyword research, on-page SEO and content for google.com.my. Call +60 12-453 7030.",
      canonical: `${BASE_URL}/services/seo/malaysia`,
      focusKeyword: "SEO Malaysia",
      ogTitle:
        "SEO Services Malaysia | SEO Agency for KL & Selangor | Static Savvy Media",
      ogDescription:
        "SEO services in Malaysia for businesses seeking stronger Google visibility and organic search rankings.",
      ogImage: `${BASE_URL}/og/locations-02malaysia.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: `${SITE_NAME} - SEO Malaysia`,
        telephone: MALAYSIA_OFFICE.phoneE164,
        address: MALAYSIA_POSTAL_ADDRESS,
        openingHoursSpecification: MALAYSIA_OPENING_HOURS_SPEC,
      },
      robots: "index,follow",
    },
  },
  "/services/website-design-development/madurai": {
    title: "Web Design & Development Company in Madurai | Static Savvy Media",
    slug: "services/website-design-development/madurai",
    seo: {
      title: "Web Design & Development Company in Madurai | Static Savvy Media",
      description:
        "Website design and development company in Madurai. Fast, mobile-first, SEO-ready business, WordPress and e-commerce websites. Rated 4.9★ on Google. WhatsApp us.",
      canonical: `${BASE_URL}/services/website-design-development/madurai`,
      focusKeyword: "website development company in Madurai",
      ogTitle: "Web Design & Development Company in Madurai | Static Savvy Media",
      ogDescription: "Fast, mobile-first, SEO-ready websites for Madurai businesses.",
      ogImage: `${BASE_URL}/og/services-06website.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Website Design & Development in Madurai",
        serviceType: "Website design and development",
        provider: { "@type": "Organization", name: SITE_NAME },
        areaServed: { "@type": "City", name: "Madurai" },
      },
      robots: "index,follow",
    },
  },
  "/services/local-seo/madurai": {
    title: "Local SEO Company in Madurai | Google Maps & GBP | Static Savvy Media",
    slug: "services/local-seo/madurai",
    seo: {
      title: "Local SEO Company in Madurai | Google Maps & GBP | Static Savvy Media",
      description:
        "Local SEO services in Madurai to rank on Google Maps. GBP optimisation, citations & reviews from a team rated 4.9★ from 100+ Google reviews. WhatsApp us today.",
      canonical: `${BASE_URL}/services/local-seo/madurai`,
      focusKeyword: "local SEO services Madurai",
      ogTitle:
        "Local SEO Company in Madurai | Google Maps & GBP | Static Savvy Media",
      ogDescription:
        "Local SEO services in Madurai to rank on Google Maps. GBP optimisation, citations & reviews from a team rated 4.9★ from 100+ Google reviews. WhatsApp us today.",
      ogImage: `${BASE_URL}/og/locations-01madurai.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Local SEO Services in Madurai",
        serviceType: "Local SEO",
        provider: { "@type": "Organization", name: SITE_NAME },
        areaServed: { "@type": "City", name: "Madurai" },
      },
      robots: "index,follow",
    },
  },
  "/services/local-seo/thoothukudi": {
    title: "Local SEO Services Thoothukudi | Static Savvy Media",
    slug: "services/local-seo/thoothukudi",
    seo: {
      title: "Local SEO Services Thoothukudi | Static Savvy Media",
      description:
        "Attract local customers in Thoothukudi with targeted Google Business Profile optimization, local citations, and geo-targeted keywords.",
      canonical: `${BASE_URL}/services/local-seo/thoothukudi`,
      focusKeyword: "local SEO Thoothukudi",
      ogTitle: "Local SEO Services Thoothukudi | Static Savvy Media",
      ogDescription:
        "Attract local customers in Thoothukudi with targeted Google Business Profile optimization.",
      ogImage: `${BASE_URL}/og/locations-03thoothukudi.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: `${SITE_NAME} - Local SEO Thoothukudi`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Thoothukudi",
          addressCountry: "IN",
        },
      },
      robots: "index,follow",
    },
  },
  "/services/local-seo/malaysia": {
    title:
      "Local SEO Malaysia — Rank in Malaysian Local Searches | Static Savvy Media",
    slug: "services/local-seo/malaysia",
    seo: {
      title:
        "Local SEO Malaysia — Rank in Malaysian Local Searches | Static Savvy Media",
      description:
        "Help Malaysian SMEs capture high-intent local buyers across Kuala Lumpur, Rawang, Selangor, and major states with Local SEO.",
      canonical: `${BASE_URL}/services/local-seo/malaysia`,
      focusKeyword: "local SEO Malaysia",
      ogTitle: "Local SEO Malaysia | Static Savvy Media",
      ogDescription:
        "Help Malaysian SMEs capture high-intent local buyers across Kuala Lumpur, Rawang, and Selangor.",
      ogImage: `${BASE_URL}/og/locations-02malaysia.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: `${SITE_NAME} - Local SEO Malaysia`,
        telephone: MALAYSIA_OFFICE.phoneE164,
        address: MALAYSIA_POSTAL_ADDRESS,
        openingHoursSpecification: MALAYSIA_OPENING_HOURS_SPEC,
      },
      robots: "index,follow",
    },
  },
  "/services/geo-aeo-ai-search/madurai": {
    title:
      "GEO & AEO Services Madurai — AI Search Optimization | Static Savvy Media",
    slug: "services/geo-aeo-ai-search/madurai",
    seo: {
      title:
        "GEO & AEO Services Madurai — AI Search Optimization | Static Savvy Media",
      description:
        "Get your Madurai business cited by ChatGPT, Perplexity, and Google AI Overviews with cutting-edge GEO/AEO optimization.",
      canonical: `${BASE_URL}/services/geo-aeo-ai-search/madurai`,
      focusKeyword: "GEO AEO Madurai",
      ogTitle: "GEO & AEO Services Madurai | Static Savvy Media",
      ogDescription:
        "Get your Madurai business cited by ChatGPT, Perplexity, and Google AI Overviews.",
      ogImage: `${BASE_URL}/og/locations-01madurai.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: `${SITE_NAME} - GEO AEO Madurai`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Madurai",
          addressCountry: "IN",
        },
      },
      robots: "index,follow",
    },
  },
  "/services/google-ads/thoothukudi": {
    title: "Google Ads Agency Thoothukudi | Static Savvy Media",
    slug: "services/google-ads/thoothukudi",
    seo: {
      title: "Google Ads Agency Thoothukudi | Static Savvy Media",
      description:
        "Targeted Google Search, Display, and Shopping PPC campaigns for businesses in Thoothukudi focused on high ROI and instant leads.",
      canonical: `${BASE_URL}/services/google-ads/thoothukudi`,
      focusKeyword: "Google Ads Thoothukudi",
      ogTitle: "Google Ads Agency Thoothukudi | Static Savvy Media",
      ogDescription:
        "Targeted Google Search, Display, and Shopping PPC campaigns for businesses in Thoothukudi.",
      ogImage: `${BASE_URL}/og/locations-03thoothukudi.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: `${SITE_NAME} - Google Ads Thoothukudi`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Thoothukudi",
          addressCountry: "IN",
        },
      },
      robots: "index,follow",
    },
  },
  "/services/ai-business-automation/malaysia": {
    title:
      "AI Business Automation Malaysia — SME Workflow Solutions | Static Savvy Media",
    slug: "services/ai-business-automation/malaysia",
    seo: {
      title:
        "AI Business Automation Malaysia — SME Workflow Solutions | Static Savvy Media",
      description:
        "Empower Malaysian SMEs with custom AI workflow automation, lead nurturing, and CRM integration for higher productivity.",
      canonical: `${BASE_URL}/services/ai-business-automation/malaysia`,
      focusKeyword: "AI business automation Malaysia",
      ogTitle: "AI Business Automation Malaysia | Static Savvy Media",
      ogDescription:
        "Empower Malaysian SMEs with custom AI workflow automation, lead nurturing, and CRM integration.",
      ogImage: `${BASE_URL}/og/locations-02malaysia.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: `${SITE_NAME} - AI Automation Malaysia`,
        telephone: MALAYSIA_OFFICE.phoneE164,
        address: MALAYSIA_POSTAL_ADDRESS,
        openingHoursSpecification: MALAYSIA_OPENING_HOURS_SPEC,
      },
      robots: "index,follow",
    },
  },

  // Locations Hub & Pages
  "/locations": {
    title:
      "Our Locations — Madurai, Thoothukudi & Malaysia | Static Savvy Media",
    slug: "locations",
    seo: {
      title:
        "Our Locations — Madurai, Thoothukudi & Malaysia | Static Savvy Media",
      description:
        "Discover our service locations in Madurai (India), Thoothukudi (India), and Malaysia serving regional and international clients.",
      canonical: `${BASE_URL}/locations`,
      focusKeyword: "digital marketing locations",
      ogTitle:
        "Our Locations — Madurai, Thoothukudi & Malaysia | Static Savvy Media",
      ogDescription:
        "Discover our service locations in Madurai, Thoothukudi, and Malaysia.",
      ogImage: `${BASE_URL}/og/locations-locationmain.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: SITE_NAME,
        url: `${BASE_URL}/locations`,
      },
      robots: "index,follow",
    },
  },
  "/locations/madurai": {
    title:
      "Digital Marketing Agency Madurai — SEO, Ads & AI | Static Savvy Media",
    slug: "locations/madurai",
    seo: {
      title:
        "Digital Marketing Agency Madurai — SEO, Ads & AI | Static Savvy Media",
      description:
        "Digital marketing agency in Madurai (Kamarajar Salai): SEO, Local SEO, Google Ads, social media, websites and AI search, in Tamil & English. WhatsApp +91 99440 40345.",
      canonical: `${BASE_URL}/locations/madurai`,
      focusKeyword: "digital marketing agency Madurai",
      ogTitle: "Digital Marketing Agency Madurai | Static Savvy Media",
      ogDescription:
        "Headquartered in Madurai, Static Savvy Media delivers full-service SEO, GEO/AEO, and Google Ads.",
      ogImage: `${BASE_URL}/og/locations-01madurai.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: `${SITE_NAME} Madurai`,
        address: {
          "@type": "PostalAddress",
          streetAddress:
            "2nd Floor, 4/3, Srinivasa Perumal Koil St, Kamarajar Salai",
          addressLocality: "Madurai",
          addressRegion: "Tamil Nadu",
          postalCode: "625009",
          addressCountry: "IN",
        },
      },
      robots: "index,follow",
    },
  },
  "/locations/thoothukudi": {
    title: "Digital Marketing Agency Thoothukudi | Static Savvy Media",
    slug: "locations/thoothukudi",
    seo: {
      title: "Digital Marketing Agency Thoothukudi | Static Savvy Media",
      description:
        "Digital marketing agency serving port, maritime, logistics, and retail businesses in Thoothukudi with SEO, Ads, and Web Design.",
      canonical: `${BASE_URL}/locations/thoothukudi`,
      focusKeyword: "digital marketing agency Thoothukudi",
      ogTitle: "Digital Marketing Agency Thoothukudi | Static Savvy Media",
      ogDescription:
        "Digital marketing agency serving port, maritime, logistics, and retail businesses in Thoothukudi.",
      ogImage: `${BASE_URL}/og/locations-03thoothukudi.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: `${SITE_NAME} Thoothukudi`,
        address: {
          "@type": "PostalAddress",
          streetAddress: "90, Peria Kadai St, Matha Koil",
          addressLocality: "Thoothukudi",
          addressRegion: "Tamil Nadu",
          postalCode: "628001",
          addressCountry: "IN",
        },
      },
      robots: "index,follow",
    },
  },
  "/locations/malaysia": {
    title:
      "Digital Marketing Agency Malaysia — Rawang, Selangor | Static Savvy Media",
    slug: "locations/malaysia",
    seo: {
      title:
        "Digital Marketing Agency Malaysia — Rawang, Selangor | Static Savvy Media",
      description:
        "Digital marketing company in Malaysia with an office in Rawang, Selangor. SEO, Local SEO, Google Ads, social media and websites for SMEs in Kuala Lumpur and the Klang Valley.",
      canonical: `${BASE_URL}/locations/malaysia`,
      focusKeyword: "digital marketing agency Malaysia",
      ogTitle: "Digital Marketing Agency Malaysia | Static Savvy Media",
      ogDescription:
        "Empowering Malaysian SMEs across Kuala Lumpur, Rawang, and Selangor with SEO and AI automation.",
      ogImage: `${BASE_URL}/og/locations-02malaysia.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: `${SITE_NAME} Malaysia`,
        telephone: MALAYSIA_OFFICE.phoneE164,
        address: MALAYSIA_POSTAL_ADDRESS,
        openingHoursSpecification: MALAYSIA_OPENING_HOURS_SPEC,
      },
      robots: "index,follow",
    },
  },

  // Industry Hub & Pages
  "/industries": {
    title: "Industry Digital Marketing Solutions | Static Savvy Media",
    slug: "industries",
    seo: {
      title: "Industry Digital Marketing Solutions | Static Savvy Media",
      description:
        "Tailored digital marketing solutions for Retail, Healthcare, Education, Hospitality, Textiles, Port & Maritime, SMEs, and Real Estate.",
      canonical: `${BASE_URL}/industries`,
      focusKeyword: "industry digital marketing",
      ogTitle: "Industry Digital Marketing Solutions | Static Savvy Media",
      ogDescription:
        "Tailored digital marketing solutions for Retail, Healthcare, Education, Textiles, and Real Estate.",
      ogImage: `${BASE_URL}/og/industries-industriesmain.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: SITE_NAME,
        url: `${BASE_URL}/industries`,
      },
      robots: "index,follow",
    },
  },
  "/industries/retail-ecommerce": {
    title: "Digital Marketing for Retail & E-Commerce | Static Savvy Media",
    slug: "industries/retail-ecommerce",
    seo: {
      title: "Digital Marketing for Retail & E-Commerce | Static Savvy Media",
      description:
        "Drive online store sales and retail foot traffic with targeted SEO, Google Shopping Ads, social commerce, and conversion optimization.",
      canonical: `${BASE_URL}/industries/retail-ecommerce`,
      focusKeyword: "digital marketing for retail ecommerce",
      ogTitle: "Digital Marketing for Retail & E-Commerce | Static Savvy Media",
      ogDescription:
        "Drive online store sales and retail foot traffic with targeted SEO and Google Shopping Ads.",
      ogImage: `${BASE_URL}/og/industries-01retail.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Digital Marketing for Retail & E-Commerce",
        provider: { "@type": "Organization", name: SITE_NAME },
      },
      robots: "index,follow",
    },
  },
  "/industries/healthcare-clinics": {
    title: "Digital Marketing for Healthcare & Clinics | Static Savvy Media",
    slug: "industries/healthcare-clinics",
    seo: {
      title: "Digital Marketing for Healthcare & Clinics | Static Savvy Media",
      description:
        "Attract more patients for clinics, hospitals, and healthcare practices with compliant local SEO, Google Ads, and reputation management.",
      canonical: `${BASE_URL}/industries/healthcare-clinics`,
      focusKeyword: "digital marketing for healthcare clinics",
      ogTitle:
        "Digital Marketing for Healthcare & Clinics | Static Savvy Media",
      ogDescription:
        "Attract more patients for clinics, hospitals, and healthcare practices with compliant local SEO.",
      ogImage: `${BASE_URL}/og/industries-02healthcare.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Digital Marketing for Healthcare",
        provider: { "@type": "Organization", name: SITE_NAME },
      },
      robots: "index,follow",
    },
  },
  "/industries/education-training": {
    title:
      "Digital Marketing for Education & Training Institutes | Static Savvy Media",
    slug: "industries/education-training",
    seo: {
      title:
        "Digital Marketing for Education & Training Institutes | Static Savvy Media",
      description:
        "Increase student enrollments for schools, colleges, and coaching centers with high-converting PPC campaigns and content strategy.",
      canonical: `${BASE_URL}/industries/education-training`,
      focusKeyword: "digital marketing for education institutes",
      ogTitle:
        "Digital Marketing for Education & Training Institutes | Static Savvy Media",
      ogDescription:
        "Increase student enrollments for schools, colleges, and coaching centers.",
      ogImage: `${BASE_URL}/og/industries-03education.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Digital Marketing for Education",
        provider: { "@type": "Organization", name: SITE_NAME },
      },
      robots: "index,follow",
    },
  },
  "/industries/hospitality-hotels": {
    title: "Digital Marketing for Hotels & Hospitality | Static Savvy Media",
    slug: "industries/hospitality-hotels",
    seo: {
      title: "Digital Marketing for Hotels & Hospitality | Static Savvy Media",
      description:
        "Boost direct hotel bookings, restaurant visits, and event inquiries with localized search optimization and visual social campaigns.",
      canonical: `${BASE_URL}/industries/hospitality-hotels`,
      focusKeyword: "digital marketing for hotels hospitality",
      ogTitle:
        "Digital Marketing for Hotels & Hospitality | Static Savvy Media",
      ogDescription:
        "Boost direct hotel bookings, restaurant visits, and event inquiries.",
      ogImage: `${BASE_URL}/og/industries-04hospital.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Digital Marketing for Hospitality",
        provider: { "@type": "Organization", name: SITE_NAME },
      },
      robots: "index,follow",
    },
  },
  "/industries/textiles-madurai": {
    title:
      "Digital Marketing for Textile Industry Madurai | Static Savvy Media",
    slug: "industries/textiles-madurai",
    seo: {
      title:
        "Digital Marketing for Textile Industry Madurai | Static Savvy Media",
      description:
        "Specialized SEO, B2B digital marketing, and international client acquisition strategies for Madurai's textile manufacturers and exporters.",
      canonical: `${BASE_URL}/industries/textiles-madurai`,
      focusKeyword: "digital marketing for textile industry",
      ogTitle:
        "Digital Marketing for Textile Industry Madurai | Static Savvy Media",
      ogDescription:
        "Specialized SEO and B2B digital marketing for Madurai's textile manufacturers.",
      ogImage: `${BASE_URL}/og/industries-05textile.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Digital Marketing for Textile Industry",
        provider: { "@type": "Organization", name: SITE_NAME },
      },
      robots: "index,follow",
    },
  },
  "/industries/port-marine-industrial-thoothukudi": {
    title:
      "Digital Marketing for Port, Marine & Industrial Businesses Thoothukudi | Static Savvy Media",
    slug: "industries/port-marine-industrial-thoothukudi",
    seo: {
      title:
        "Digital Marketing for Port, Marine & Industrial Businesses Thoothukudi | Static Savvy Media",
      description:
        "B2B lead generation, search visibility, and corporate branding for maritime, port, and industrial enterprises in Thoothukudi.",
      canonical: `${BASE_URL}/industries/port-marine-industrial-thoothukudi`,
      focusKeyword: "digital marketing for port marine industrial",
      ogTitle:
        "Digital Marketing for Port & Industrial Businesses Thoothukudi | Static Savvy Media",
      ogDescription:
        "B2B lead generation and corporate branding for maritime and port enterprises.",
      ogImage: `${BASE_URL}/og/industries-06port.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Digital Marketing for Port & Marine",
        provider: { "@type": "Organization", name: SITE_NAME },
      },
      robots: "index,follow",
    },
  },
  "/industries/smes-malaysia-grant-eligible": {
    title:
      "Digital Marketing for Malaysian SMEs (Grant Eligible) | Static Savvy Media",
    slug: "industries/smes-malaysia-grant-eligible",
    seo: {
      title:
        "Digital Marketing for Malaysian SMEs (Grant Eligible) | Static Savvy Media",
      description:
        "Help Malaysian SMEs leverage digital grants with high-growth SEO, GEO/AEO, AI automation, and conversion-focused web design.",
      canonical: `${BASE_URL}/industries/smes-malaysia-grant-eligible`,
      focusKeyword: "digital marketing for Malaysian SMEs",
      ogTitle:
        "Digital Marketing for Malaysian SMEs (Grant Eligible) | Static Savvy Media",
      ogDescription:
        "Help Malaysian SMEs leverage digital grants with high-growth SEO and AI automation.",
      ogImage: `${BASE_URL}/og/industries-07sme.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Digital Marketing for Malaysian SMEs",
        provider: { "@type": "Organization", name: SITE_NAME },
      },
      robots: "index,follow",
    },
  },
  "/industries/real-estate-builders": {
    title: "Digital Marketing for Real Estate & Builders | Static Savvy Media",
    slug: "industries/real-estate-builders",
    seo: {
      title:
        "Digital Marketing for Real Estate & Builders | Static Savvy Media",
      description:
        "Generate high-quality buyer leads for real estate developers, builders, and property agents through search ads and social campaigns.",
      canonical: `${BASE_URL}/industries/real-estate-builders`,
      focusKeyword: "digital marketing for real estate",
      ogTitle:
        "Digital Marketing for Real Estate & Builders | Static Savvy Media",
      ogDescription:
        "Generate high-quality buyer leads for real estate developers and builders.",
      ogImage: `${BASE_URL}/og/industries-08realestate.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Digital Marketing for Real Estate",
        provider: { "@type": "Organization", name: SITE_NAME },
      },
      robots: "index,follow",
    },
  },

  // Pricing Pages
  "/pricing/india": {
    title: "Digital Marketing Packages & Pricing India | Static Savvy Media",
    slug: "pricing/india",
    seo: {
      title: "Digital Marketing Packages & Pricing India | Static Savvy Media",
      description:
        "Transparent, result-driven digital marketing pricing plans for SEO, Local SEO, Google Ads, Social Media, and Web Design in India.",
      canonical: `${BASE_URL}/pricing/india`,
      focusKeyword: "digital marketing pricing India",
      ogTitle:
        "Digital Marketing Packages & Pricing India | Static Savvy Media",
      ogDescription:
        "Transparent digital marketing pricing plans for SEO, Google Ads, and Web Design in India.",
      ogImage: `${BASE_URL}/og/pricing-pricingmain.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "OfferCatalog",
        name: "Digital Marketing Pricing India",
      },
      robots: "index,follow",
    },
  },
  "/pricing/india/seo": {
    title: "SEO Packages & Pricing India | Static Savvy Media",
    slug: "pricing/india/seo",
    seo: {
      title: "SEO Packages & Pricing India | Static Savvy Media",
      description:
        "Affordable and scalable SEO pricing packages in India for startups, local businesses, and growing enterprises.",
      canonical: `${BASE_URL}/pricing/india/seo`,
      focusKeyword: "SEO packages India pricing",
      ogTitle: "SEO Packages & Pricing India | Static Savvy Media",
      ogDescription: "Affordable and scalable SEO pricing packages in India.",
      ogImage: `${BASE_URL}/og/pricing-01seo.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "Offer",
        name: "SEO Packages India",
      },
      robots: "index,follow",
    },
  },
  "/pricing/india/local-seo": {
    title: "Local SEO Pricing & Packages India | Static Savvy Media",
    slug: "pricing/india/local-seo",
    seo: {
      title: "Local SEO Pricing & Packages India | Static Savvy Media",
      description:
        "Local SEO pricing plans tailored for single-location shops and multi-city businesses across India.",
      canonical: `${BASE_URL}/pricing/india/local-seo`,
      focusKeyword: "local SEO pricing India",
      ogTitle: "Local SEO Pricing & Packages India | Static Savvy Media",
      ogDescription:
        "Local SEO pricing plans tailored for single-location shops and multi-city businesses across India.",
      ogImage: `${BASE_URL}/og/pricing-02localseo.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "Offer",
        name: "Local SEO Packages India",
      },
      robots: "index,follow",
    },
  },
  "/pricing/india/google-ads": {
    title: "Google Ads Management Pricing India | Static Savvy Media",
    slug: "pricing/india/google-ads",
    seo: {
      title: "Google Ads Management Pricing India | Static Savvy Media",
      description:
        "Flexible Google Ads PPC management packages designed to maximize leads and return on ad spend for Indian businesses.",
      canonical: `${BASE_URL}/pricing/india/google-ads`,
      focusKeyword: "Google Ads pricing India",
      ogTitle: "Google Ads Management Pricing India | Static Savvy Media",
      ogDescription:
        "Flexible Google Ads PPC management packages designed to maximize leads and ROI.",
      ogImage: `${BASE_URL}/og/pricing-03googleads.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "Offer",
        name: "Google Ads Management Pricing India",
      },
      robots: "index,follow",
    },
  },
  "/pricing/india/social-media": {
    title: "Social Media Marketing Pricing India | Static Savvy Media",
    slug: "pricing/india/social-media",
    seo: {
      title: "Social Media Marketing Pricing India | Static Savvy Media",
      description:
        "Monthly social media marketing and management plans for Instagram, Facebook, and LinkedIn in India.",
      canonical: `${BASE_URL}/pricing/india/social-media`,
      focusKeyword: "social media marketing pricing India",
      ogTitle: "Social Media Marketing Pricing India | Static Savvy Media",
      ogDescription:
        "Monthly social media marketing and management plans for Instagram, Facebook, and LinkedIn.",
      ogImage: `${BASE_URL}/og/pricing-04socialmedia.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "Offer",
        name: "Social Media Pricing India",
      },
      robots: "index,follow",
    },
  },
  "/pricing/india/social-media-marketing": {
    title: "Social Media Marketing Pricing India | Static Savvy Media",
    slug: "pricing/india/social-media-marketing",
    seo: {
      title: "Social Media Marketing Pricing India | Static Savvy Media",
      description:
        "Monthly social media marketing and management plans for Instagram, Facebook, and LinkedIn in India.",
      canonical: `${BASE_URL}/pricing/india/social-media-marketing`,
      focusKeyword: "social media marketing pricing India",
      ogTitle: "Social Media Marketing Pricing India | Static Savvy Media",
      ogDescription:
        "Monthly social media marketing and management plans for Instagram, Facebook, and LinkedIn.",
      ogImage: `${BASE_URL}/og/pricing-04socialmedia.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "Offer",
        name: "Social Media Marketing Packages India",
      },
      robots: "index,follow",
    },
  },
  "/pricing/india/website": {
    title: "Website Design & Development Pricing India | Static Savvy Media",
    slug: "pricing/india/website",
    seo: {
      title: "Website Design & Development Pricing India | Static Savvy Media",
      description:
        "Cost-effective website design and custom development pricing packages for businesses in India.",
      canonical: `${BASE_URL}/pricing/india/website`,
      focusKeyword: "website design development pricing India",
      ogTitle:
        "Website Design & Development Pricing India | Static Savvy Media",
      ogDescription:
        "Cost-effective website design and custom development pricing packages for businesses in India.",
      ogImage: `${BASE_URL}/og/pricing-05websitedesign.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "Offer",
        name: "Website Design Pricing India",
      },
      robots: "index,follow",
    },
  },
  "/pricing/india/website-design-development": {
    title: "Website Design & Development Pricing India | Static Savvy Media",
    slug: "pricing/india/website-design-development",
    seo: {
      title: "Website Design & Development Pricing India | Static Savvy Media",
      description:
        "Cost-effective website design and custom development pricing packages for businesses in India.",
      canonical: `${BASE_URL}/pricing/india/website-design-development`,
      focusKeyword: "website design development pricing India",
      ogTitle:
        "Website Design & Development Pricing India | Static Savvy Media",
      ogDescription:
        "Cost-effective website design and custom development pricing packages.",
      ogImage: `${BASE_URL}/og/pricing-05websitedesign.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "Offer",
        name: "Website Packages India",
      },
      robots: "index,follow",
    },
  },
  "/pricing/india/ai-services": {
    title: "AI Business Automation Pricing India | Static Savvy Media",
    slug: "pricing/india/ai-services",
    seo: {
      title: "AI Business Automation Pricing India | Static Savvy Media",
      description:
        "Transparent pricing for AI workflow automation, custom chatbot integration, and AI search optimization in India.",
      canonical: `${BASE_URL}/pricing/india/ai-services`,
      focusKeyword: "AI services pricing India",
      ogTitle: "AI Business Automation Pricing India | Static Savvy Media",
      ogDescription:
        "Transparent pricing for AI workflow automation, custom chatbots, and AI search optimization.",
      ogImage: `${BASE_URL}/og/pricing-06aisevices.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "Offer",
        name: "AI Services Pricing India",
      },
      robots: "index,follow",
    },
  },
  "/pricing/india/photography-video": {
    title:
      "Corporate Photography & Video Production Pricing India | Static Savvy Media",
    slug: "pricing/india/photography-video",
    seo: {
      title:
        "Corporate Photography & Video Production Pricing India | Static Savvy Media",
      description:
        "Custom pricing packages for commercial brand shoots, product photography, and corporate video production in India.",
      canonical: `${BASE_URL}/pricing/india/photography-video`,
      focusKeyword: "photography video pricing India",
      ogTitle:
        "Corporate Photography & Video Pricing India | Static Savvy Media",
      ogDescription:
        "Custom pricing packages for commercial brand shoots and product photography.",
      ogImage: `${BASE_URL}/og/pricing-07photograph.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "Offer",
        name: "Photography & Video Pricing India",
      },
      robots: "index,follow",
    },
  },

  // Malaysia Pricing
  "/pricing/malaysia": {
    title:
      "Digital Marketing Packages & Pricing Malaysia (MYR) | Static Savvy Media",
    slug: "pricing/malaysia",
    seo: {
      title:
        "Digital Marketing Packages & Pricing Malaysia (MYR) | Static Savvy Media",
      description:
        "Transparent digital marketing pricing packages in MYR for Malaysian SMEs seeking high-growth SEO, Ads, and AI automation.",
      canonical: `${BASE_URL}/pricing/malaysia`,
      focusKeyword: "digital marketing pricing Malaysia MYR",
      ogTitle: "Digital Marketing Pricing Malaysia (MYR) | Static Savvy Media",
      ogDescription:
        "Transparent digital marketing pricing packages in MYR for Malaysian SMEs.",
      ogImage: `${BASE_URL}/og/pricing-pricingmain.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "OfferCatalog",
        name: "Digital Marketing Pricing Malaysia",
      },
      robots: "index,follow",
    },
  },
  "/pricing/malaysia/seo": {
    title: "SEO Packages & Pricing Malaysia (MYR) | Static Savvy Media",
    slug: "pricing/malaysia/seo",
    seo: {
      title: "SEO Packages & Pricing Malaysia (MYR) | Static Savvy Media",
      description:
        "SEO pricing plans in MYR for Malaysian businesses seeking sustainable top-page Google rankings.",
      canonical: `${BASE_URL}/pricing/malaysia/seo`,
      focusKeyword: "SEO packages Malaysia pricing",
      ogTitle: "SEO Packages & Pricing Malaysia (MYR) | Static Savvy Media",
      ogDescription: "SEO pricing plans in MYR for Malaysian businesses.",
      ogImage: `${BASE_URL}/og/pricing-01seo.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "Offer",
        name: "SEO Packages Malaysia",
      },
      robots: "index,follow",
    },
  },
  "/pricing/malaysia/local-seo": {
    title: "Local SEO Pricing Malaysia (MYR) | Static Savvy Media",
    slug: "pricing/malaysia/local-seo",
    seo: {
      title: "Local SEO Pricing Malaysia (MYR) | Static Savvy Media",
      description:
        "Local SEO and Google Maps optimization packages for Malaysian retail stores, clinics, and local service providers.",
      canonical: `${BASE_URL}/pricing/malaysia/local-seo`,
      focusKeyword: "local SEO pricing Malaysia",
      ogTitle: "Local SEO Pricing Malaysia (MYR) | Static Savvy Media",
      ogDescription:
        "Local SEO and Google Maps optimization packages for Malaysian businesses.",
      ogImage: `${BASE_URL}/og/pricing-02localseo.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "Offer",
        name: "Local SEO Packages Malaysia",
      },
      robots: "index,follow",
    },
  },
  "/pricing/malaysia/google-ads": {
    title: "Google Ads Pricing Malaysia (MYR) | Static Savvy Media",
    slug: "pricing/malaysia/google-ads",
    seo: {
      title: "Google Ads Pricing Malaysia (MYR) | Static Savvy Media",
      description:
        "Performance-focused Google Ads management packages for Malaysian SMEs designed for maximum lead conversion.",
      canonical: `${BASE_URL}/pricing/malaysia/google-ads`,
      focusKeyword: "Google Ads pricing Malaysia",
      ogTitle: "Google Ads Pricing Malaysia (MYR) | Static Savvy Media",
      ogDescription:
        "Performance-focused Google Ads management packages for Malaysian SMEs.",
      ogImage: `${BASE_URL}/og/pricing-03googleads.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "Offer",
        name: "Google Ads Packages Malaysia",
      },
      robots: "index,follow",
    },
  },
  "/pricing/malaysia/social-media": {
    title: "Social Media Marketing Pricing Malaysia (MYR) | Static Savvy Media",
    slug: "pricing/malaysia/social-media",
    seo: {
      title:
        "Social Media Marketing Pricing Malaysia (MYR) | Static Savvy Media",
      description:
        "Social media growth and content creation packages for businesses in Kuala Lumpur, Selangor, and across Malaysia.",
      canonical: `${BASE_URL}/pricing/malaysia/social-media`,
      focusKeyword: "social media marketing pricing Malaysia",
      ogTitle:
        "Social Media Marketing Pricing Malaysia (MYR) | Static Savvy Media",
      ogDescription:
        "Social media growth and content creation packages for businesses in Malaysia.",
      ogImage: `${BASE_URL}/og/pricing-04socialmedia.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "Offer",
        name: "Social Media Pricing Malaysia",
      },
      robots: "index,follow",
    },
  },
  "/pricing/malaysia/social-media-marketing": {
    title: "Social Media Marketing Pricing Malaysia (MYR) | Static Savvy Media",
    slug: "pricing/malaysia/social-media-marketing",
    seo: {
      title:
        "Social Media Marketing Pricing Malaysia (MYR) | Static Savvy Media",
      description:
        "Social media growth and content creation packages for businesses in Kuala Lumpur, Selangor, and across Malaysia.",
      canonical: `${BASE_URL}/pricing/malaysia/social-media-marketing`,
      focusKeyword: "social media marketing pricing Malaysia",
      ogTitle:
        "Social Media Marketing Pricing Malaysia (MYR) | Static Savvy Media",
      ogDescription:
        "Social media growth and content creation packages for businesses in Malaysia.",
      ogImage: `${BASE_URL}/og/pricing-04socialmedia.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "Offer",
        name: "Social Media Packages Malaysia",
      },
      robots: "index,follow",
    },
  },
  "/pricing/malaysia/website": {
    title:
      "Website Design & Development Pricing Malaysia (MYR) | Static Savvy Media",
    slug: "pricing/malaysia/website",
    seo: {
      title:
        "Website Design & Development Pricing Malaysia (MYR) | Static Savvy Media",
      description:
        "Modern, high-converting website design packages for Malaysian companies with mobile responsiveness and fast page speed.",
      canonical: `${BASE_URL}/pricing/malaysia/website`,
      focusKeyword: "website design development pricing Malaysia",
      ogTitle:
        "Website Design & Development Pricing Malaysia (MYR) | Static Savvy Media",
      ogDescription:
        "Modern, high-converting website design packages for Malaysian companies.",
      ogImage: `${BASE_URL}/og/pricing-05websitedesign.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "Offer",
        name: "Website Pricing Malaysia",
      },
      robots: "index,follow",
    },
  },
  "/pricing/malaysia/website-design-development": {
    title:
      "Website Design & Development Pricing Malaysia (MYR) | Static Savvy Media",
    slug: "pricing/malaysia/website-design-development",
    seo: {
      title:
        "Website Design & Development Pricing Malaysia (MYR) | Static Savvy Media",
      description:
        "Modern, high-converting website design packages for Malaysian companies with mobile responsiveness and fast page speed.",
      canonical: `${BASE_URL}/pricing/malaysia/website-design-development`,
      focusKeyword: "website design development pricing Malaysia",
      ogTitle:
        "Website Design & Development Pricing Malaysia (MYR) | Static Savvy Media",
      ogDescription:
        "Modern, high-converting website design packages for Malaysian companies.",
      ogImage: `${BASE_URL}/og/pricing-05websitedesign.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "Offer",
        name: "Website Packages Malaysia",
      },
      robots: "index,follow",
    },
  },
  "/pricing/malaysia/ai-services": {
    title:
      "AI Automation & GEO/AEO Pricing Malaysia (MYR) | Static Savvy Media",
    slug: "pricing/malaysia/ai-services",
    seo: {
      title:
        "AI Automation & GEO/AEO Pricing Malaysia (MYR) | Static Savvy Media",
      description:
        "AI business automation and AI search optimization pricing plans designed for Malaysian SMEs.",
      canonical: `${BASE_URL}/pricing/malaysia/ai-services`,
      focusKeyword: "AI services pricing Malaysia",
      ogTitle:
        "AI Automation & GEO/AEO Pricing Malaysia (MYR) | Static Savvy Media",
      ogDescription:
        "AI business automation and AI search optimization pricing plans designed for Malaysian SMEs.",
      ogImage: `${BASE_URL}/og/pricing-06aisevices.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "Offer",
        name: "AI Services Pricing Malaysia",
      },
      robots: "index,follow",
    },
  },
  "/pricing/malaysia/photography-video": {
    title:
      "Corporate Photography & Video Production Pricing Malaysia (MYR) | Static Savvy Media",
    slug: "pricing/malaysia/photography-video",
    seo: {
      title:
        "Corporate Photography & Video Production Pricing Malaysia (MYR) | Static Savvy Media",
      description:
        "Professional photography and commercial video production packages for brand campaigns in Malaysia.",
      canonical: `${BASE_URL}/pricing/malaysia/photography-video`,
      focusKeyword: "photography video pricing Malaysia",
      ogTitle:
        "Corporate Photography & Video Pricing Malaysia | Static Savvy Media",
      ogDescription:
        "Professional photography and commercial video production packages for brand campaigns in Malaysia.",
      ogImage: `${BASE_URL}/og/pricing-07photograph.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "Offer",
        name: "Photography & Video Pricing Malaysia",
      },
      robots: "index,follow",
    },
  },

  // Case Studies
  "/case-studies": {
    title:
      "Digital Marketing Case Studies & Success Stories | Static Savvy Media",
    slug: "case-studies",
    seo: {
      title:
        "Digital Marketing Case Studies & Success Stories | Static Savvy Media",
      description:
        "Discover how Static Savvy Media delivered measurable organic growth, lead generation, and ROI across diverse industries.",
      canonical: `${BASE_URL}/case-studies`,
      focusKeyword: "digital marketing case studies",
      ogTitle:
        "Digital Marketing Case Studies & Success Stories | Static Savvy Media",
      ogDescription:
        "Discover how Static Savvy Media delivered measurable organic growth and ROI.",
      ogImage: `${BASE_URL}/og/casestudies-casestudiesmain.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Case Studies",
      },
      robots: "index,follow",
    },
  },
  "/case-studies/client-1": {
    title:
      "Case Study 1: B2B Industrial Growth & Lead Generation | Static Savvy Media",
    slug: "case-studies/client-1",
    seo: {
      title:
        "Case Study 1: B2B Industrial Growth & Lead Generation | Static Savvy Media",
      description:
        "How targeted SEO and technical optimization scaled qualified inbound B2B inquiries for an industrial enterprise.",
      canonical: `${BASE_URL}/case-studies/client-1`,
      focusKeyword: "B2B industrial SEO case study",
      ogTitle:
        "Case Study 1: B2B Industrial Growth & Lead Generation | Static Savvy Media",
      ogDescription:
        "How targeted SEO scaled qualified inbound B2B inquiries for an industrial enterprise.",
      ogImage: `${BASE_URL}/og/casestudies-01client.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Case Study 1: B2B Industrial Growth",
      },
      robots: "index,follow",
    },
  },
  "/case-studies/client-2": {
    title: "Case Study 2: GEO/AEO + SEO Approach | Static Savvy Media",
    slug: "case-studies/client-2",
    seo: {
      title: "Case Study 2: GEO/AEO + SEO Approach | Static Savvy Media",
      description:
        "How we approach GEO/AEO and SEO together: structure, content and measurement for AI and organic search visibility.",
      canonical: `${BASE_URL}/case-studies/client-2`,
      focusKeyword: "local SEO case study",
      ogTitle: "Case Study 2: GEO/AEO + SEO Approach | Static Savvy Media",
      ogDescription:
        "How we approach GEO/AEO and SEO together for AI and organic search visibility.",
      ogImage: `${BASE_URL}/og/casestudies-02client.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Case Study 2: GEO/AEO + SEO Approach",
      },
      robots: "index,follow",
    },
  },
  "/case-studies/client-3": {
    title:
      "Case Study 3: E-Commerce & Retail Sales Scaling | Static Savvy Media",
    slug: "case-studies/client-3",
    seo: {
      title:
        "Case Study 3: E-Commerce & Retail Sales Scaling | Static Savvy Media",
      description:
        "Scaling e-commerce revenue with combined Google Shopping ads, high-intent SEO, and conversion optimization.",
      canonical: `${BASE_URL}/case-studies/client-3`,
      focusKeyword: "ecommerce SEO case study",
      ogTitle:
        "Case Study 3: E-Commerce & Retail Sales Scaling | Static Savvy Media",
      ogDescription:
        "Scaling e-commerce revenue with combined Google Shopping ads and high-intent SEO.",
      ogImage: `${BASE_URL}/og/casestudies-03client.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Case Study 3: E-Commerce Sales Scaling",
      },
      robots: "index,follow",
    },
  },
  "/case-studies/client-4": {
    title: "Case Study 4: AI Search & GEO Citation Growth | Static Savvy Media",
    slug: "case-studies/client-4",
    seo: {
      title:
        "Case Study 4: AI Search & GEO Citation Growth | Static Savvy Media",
      description:
        "Getting cited by ChatGPT and Google AI Overviews to capture early-stage buyer intent for a tech SME.",
      canonical: `${BASE_URL}/case-studies/client-4`,
      focusKeyword: "GEO AI search case study",
      ogTitle:
        "Case Study 4: AI Search & GEO Citation Growth | Static Savvy Media",
      ogDescription:
        "Getting cited by ChatGPT and Google AI Overviews to capture buyer intent.",
      ogImage: `${BASE_URL}/og/casestudies-04client.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Case Study 4: AI Search Citation Growth",
      },
      robots: "index,follow",
    },
  },

  // Utility Pages
  "/contact": {
    title:
      "Contact Us — Get in Touch with Digital Experts | Static Savvy Media",
    slug: "contact",
    seo: {
      title:
        "Contact Us — Get in Touch with Digital Experts | Static Savvy Media",
      description:
        "Contact Static Savvy Media in Madurai, Thoothukudi, or Malaysia for a free digital marketing audit and growth consultation.",
      canonical: `${BASE_URL}/contact`,
      focusKeyword: "contact digital marketing agency",
      ogTitle:
        "Contact Us — Get in Touch with Digital Experts | Static Savvy Media",
      ogDescription:
        "Contact Static Savvy Media in Madurai, Thoothukudi, or Malaysia for a free digital marketing audit.",
      ogImage: `${BASE_URL}/og/contact.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        name: "Contact Static Savvy Media",
      },
      robots: "index,follow",
    },
  },
  "/faq": {
    title: "Frequently Asked Questions (FAQ) | Static Savvy Media",
    slug: "faq",
    seo: {
      title: "Frequently Asked Questions (FAQ) | Static Savvy Media",
      description:
        "Find answers to common questions about our SEO, GEO/AEO, Google Ads, pricing, timelines, and contract terms.",
      canonical: `${BASE_URL}/faq`,
      focusKeyword: "digital marketing FAQ",
      ogTitle: "Frequently Asked Questions (FAQ) | Static Savvy Media",
      ogDescription:
        "Find answers to common questions about our SEO, GEO/AEO, Google Ads, pricing, and timelines.",
      ogImage: `${BASE_URL}/og/faq-faq.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        name: "Static Savvy Media FAQ",
      },
      robots: "index,follow",
    },
  },
  "/privacy-policy": {
    title: "Privacy Policy | Static Savvy Media",
    slug: "privacy-policy",
    seo: {
      title: "Privacy Policy | Static Savvy Media",
      description:
        "Read the official Privacy Policy for Static Savvy Media detailing data collection, privacy protection, and user rights.",
      canonical: `${BASE_URL}/privacy-policy`,
      focusKeyword: "privacy policy Static Savvy Media",
      ogTitle: "Privacy Policy | Static Savvy Media",
      ogDescription: "Read the official Privacy Policy for Static Savvy Media.",
      ogImage: `${BASE_URL}/og/heroimage.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Privacy Policy",
      },
      robots: "index,follow",
    },
  },
  "/terms": {
    title: "Terms & Conditions | Static Savvy Media",
    slug: "terms",
    seo: {
      title: "Terms & Conditions | Static Savvy Media",
      description:
        "Read the Terms & Conditions governing the use of Static Savvy Media's website and digital marketing services.",
      canonical: `${BASE_URL}/terms`,
      focusKeyword: "terms and conditions Static Savvy Media",
      ogTitle: "Terms & Conditions | Static Savvy Media",
      ogDescription:
        "Read the Terms & Conditions governing the use of Static Savvy Media's website.",
      ogImage: `${BASE_URL}/og/heroimage.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Terms & Conditions",
      },
      robots: "index,follow",
    },
  },
  "/sitemap": {
    title: "HTML Sitemap — All Pages & Navigation | Static Savvy Media",
    slug: "sitemap",
    seo: {
      title: "HTML Sitemap — All Pages & Navigation | Static Savvy Media",
      description:
        "View the complete HTML sitemap for Static Savvy Media, listing all services, locations, industries, pricing, case studies, and blog posts.",
      canonical: `${BASE_URL}/sitemap`,
      focusKeyword: "HTML sitemap Static Savvy Media",
      ogTitle: "HTML Sitemap | Static Savvy Media",
      ogDescription: "View the complete HTML sitemap for Static Savvy Media.",
      ogImage: `${BASE_URL}/og/heroimage.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "HTML Sitemap",
      },
      robots: "index,follow",
    },
  },

  // Blog Pages
  "/blog": {
    title: "Digital Marketing Blog, Insights & Guides | Static Savvy Media",
    slug: "blog",
    seo: {
      title: "Digital Marketing Blog, Insights & Guides | Static Savvy Media",
      description:
        "Stay ahead with actionable insights on SEO, Generative Engine Optimization (GEO), Local SEO, AI marketing, and PPC advertising.",
      canonical: `${BASE_URL}/blog`,
      focusKeyword: "digital marketing blog",
      ogTitle: "Digital Marketing Blog | Static Savvy Media",
      ogDescription:
        "Stay ahead with actionable insights on SEO, GEO/AEO, Local SEO, and AI marketing.",
      ogImage: `${BASE_URL}/og/blog-blog.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "Blog",
        name: "Static Savvy Media Blog",
      },
      robots: "index,follow",
    },
  },
  "/blog/seo": {
    title: "SEO Articles & Guides | Static Savvy Media Blog",
    slug: "blog/seo",
    seo: {
      title: "SEO Articles & Guides | Static Savvy Media Blog",
      description:
        "Expert articles and tutorials on technical SEO, link building, keyword research, and search ranking strategies.",
      canonical: `${BASE_URL}/blog/seo`,
      focusKeyword: "SEO blog guides",
      ogTitle: "SEO Articles & Guides | Static Savvy Media Blog",
      ogDescription:
        "Expert articles and tutorials on technical SEO, link building, and keyword research.",
      ogImage: `${BASE_URL}/og/blog-blog.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "Blog",
        name: "SEO Blog Category",
      },
      robots: "index,follow",
    },
  },
  "/blog/geo-aeo": {
    title: "GEO & AEO AI Search Articles | Static Savvy Media Blog",
    slug: "blog/geo-aeo",
    seo: {
      title: "GEO & AEO AI Search Articles | Static Savvy Media Blog",
      description:
        "Learn how Generative Engine Optimization and Answer Engine Optimization are transforming digital search.",
      canonical: `${BASE_URL}/blog/geo-aeo`,
      focusKeyword: "GEO AEO blog",
      ogTitle: "GEO & AEO AI Search Articles | Static Savvy Media Blog",
      ogDescription:
        "Learn how Generative Engine Optimization and Answer Engine Optimization transform search.",
      ogImage: `${BASE_URL}/og/blog-blog.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "Blog",
        name: "GEO & AEO Blog Category",
      },
      robots: "index,follow",
    },
  },
  "/blog/local-marketing": {
    title: "Local Marketing & Local SEO Insights | Static Savvy Media Blog",
    slug: "blog/local-marketing",
    seo: {
      title: "Local Marketing & Local SEO Insights | Static Savvy Media Blog",
      description:
        "Practical tips for local search, Google Business Profiles and winning nearby customers.",
      canonical: `${BASE_URL}/blog/local-marketing`,
      focusKeyword: "local marketing blog",
      ogTitle: "Local Marketing & Local SEO Insights | Static Savvy Media Blog",
      ogDescription:
        "Practical tips for local search and Google Business Profiles.",
      ogImage: `${BASE_URL}/og/blog-blog.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "Blog",
        name: "Local Marketing Blog Category",
      },
      robots: "index,follow",
    },
  },
  "/blog/what-is-generative-engine-optimization": {
    title:
      "What is Generative Engine Optimization (GEO)? | Static Savvy Media Blog",
    slug: "blog/what-is-generative-engine-optimization",
    seo: {
      title:
        "What is Generative Engine Optimization (GEO)? | Static Savvy Media Blog",
      description:
        "A complete guide to Generative Engine Optimization (GEO): how AI search engines like ChatGPT, Claude, and Gemini select sources.",
      canonical: `${BASE_URL}/blog/what-is-generative-engine-optimization`,
      focusKeyword: "what is Generative Engine Optimization",
      ogTitle:
        "What is Generative Engine Optimization (GEO)? | Static Savvy Media Blog",
      ogDescription:
        "A complete guide to Generative Engine Optimization (GEO): how AI search engines select sources.",
      ogImage: `${BASE_URL}/og/blog-blog.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "What is Generative Engine Optimization (GEO)?",
      },
      robots: "index,follow",
    },
  },
  "/blog/what-is-answer-engine-optimization": {
    title:
      "What is Answer Engine Optimization (AEO)? | Static Savvy Media Blog",
    slug: "blog/what-is-answer-engine-optimization",
    seo: {
      title:
        "What is Answer Engine Optimization (AEO)? | Static Savvy Media Blog",
      description:
        "Understand Answer Engine Optimization (AEO) and how to structure your content to get featured in direct AI answer snippets.",
      canonical: `${BASE_URL}/blog/what-is-answer-engine-optimization`,
      focusKeyword: "what is Answer Engine Optimization",
      ogTitle:
        "What is Answer Engine Optimization (AEO)? | Static Savvy Media Blog",
      ogDescription:
        "Understand Answer Engine Optimization (AEO) and how to get featured in direct AI answer snippets.",
      ogImage: `${BASE_URL}/og/blog-blog.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "What is Answer Engine Optimization (AEO)?",
      },
      robots: "index,follow",
    },
  },
  "/blog/seo-agency-madurai-complete-guide": {
    title:
      "Complete Guide to Choosing an SEO Agency in Madurai | Static Savvy Media Blog",
    slug: "blog/seo-agency-madurai-complete-guide",
    seo: {
      title:
        "Complete Guide to Choosing an SEO Agency in Madurai | Static Savvy Media Blog",
      description:
        "How to evaluate and select the best SEO agency in Madurai for your business goals, budget, and local market competition.",
      canonical: `${BASE_URL}/blog/seo-agency-madurai-complete-guide`,
      focusKeyword: "SEO agency Madurai guide",
      ogTitle:
        "Complete Guide to Choosing an SEO Agency in Madurai | Static Savvy Media Blog",
      ogDescription:
        "How to evaluate and select the best SEO agency in Madurai for your business goals.",
      ogImage: `${BASE_URL}/og/blog-blog.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Complete Guide to Choosing an SEO Agency in Madurai",
      },
      robots: "index,follow",
    },
  },
  "/blog/digital-marketing-malaysia-sme-grant-guide": {
    title:
      "Digital Marketing Malaysia: SME Grant Eligibility & Strategy Guide | Static Savvy Media Blog",
    slug: "blog/digital-marketing-malaysia-sme-grant-guide",
    seo: {
      title:
        "Digital Marketing Malaysia: SME Grant Eligibility & Strategy Guide | Static Savvy Media Blog",
      description:
        "Everything Malaysian SMEs need to know about digital grant eligibility, SEO investments, and government digitization support.",
      canonical: `${BASE_URL}/blog/digital-marketing-malaysia-sme-grant-guide`,
      focusKeyword: "digital marketing Malaysia SME grant guide",
      ogTitle:
        "Digital Marketing Malaysia: SME Grant Eligibility & Strategy Guide",
      ogDescription:
        "Everything Malaysian SMEs need to know about digital grant eligibility and SEO investments.",
      ogImage: `${BASE_URL}/og/blog-blog.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline:
          "Digital Marketing Malaysia: SME Grant Eligibility & Strategy Guide",
      },
      robots: "index,follow",
    },
  },
  "/blog/local-seo-thoothukudi-businesses": {
    title:
      "Local SEO Guide for Businesses in Thoothukudi | Static Savvy Media Blog",
    slug: "blog/local-seo-thoothukudi-businesses",
    seo: {
      title:
        "Local SEO Guide for Businesses in Thoothukudi | Static Savvy Media Blog",
      description:
        "Practical steps for Thoothukudi enterprises to optimize Google Maps, attract nearby customers, and outrank local competitors.",
      canonical: `${BASE_URL}/blog/local-seo-thoothukudi-businesses`,
      focusKeyword: "local SEO Thoothukudi guide",
      ogTitle:
        "Local SEO Guide for Businesses in Thoothukudi | Static Savvy Media Blog",
      ogDescription:
        "Practical steps for Thoothukudi enterprises to optimize Google Maps and outrank competitors.",
      ogImage: `${BASE_URL}/og/blog-blog.jpg`,
      schema: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Local SEO Guide for Businesses in Thoothukudi",
      },
      robots: "index,follow",
    },
  },
  // Pages below set their own SEO in the page file; these entries mirror those values so the
  // prerendered HTML (scripts/seo/prerender-heads.mjs) carries the same title and description.
  "/locations/kuala-lumpur": {
    title: "Digital Marketing Agency in Kuala Lumpur | Static Savvy Media",
    slug: "locations/kuala-lumpur",
    seo: {
      title: "Digital Marketing Agency in Kuala Lumpur | Static Savvy Media",
      description:
        "Digital marketing agency for Kuala Lumpur businesses: SEO, Google Ads, social media, websites and AI automation, from our Rawang, Selangor office.",
      canonical: `${BASE_URL}/locations/kuala-lumpur`,
      ogImage: `${BASE_URL}/og/locations-02malaysia.jpg`,
      robots: "index,follow",
    },
  },
  "/services/seo/kuala-lumpur": {
    title: "SEO Company in Kuala Lumpur | SEO Services KL | Static Savvy Media",
    slug: "services/seo/kuala-lumpur",
    seo: {
      title: "SEO Company in Kuala Lumpur | SEO Services KL | Static Savvy Media",
      description:
        "SEO services for Kuala Lumpur businesses: technical SEO, English and Bahasa Malaysia content, and local search for KL and the Klang Valley. Call +60 12-453 7030.",
      canonical: `${BASE_URL}/services/seo/kuala-lumpur`,
      ogImage: `${BASE_URL}/og/locations-02malaysia.jpg`,
      robots: "index,follow",
    },
  },
  "/services/social-media-marketing/madurai": {
    title: "Social Media Marketing Agency in Madurai | Static Savvy Media",
    slug: "services/social-media-marketing/madurai",
    seo: {
      title: "Social Media Marketing Agency in Madurai | Static Savvy Media",
      description:
        "Social media marketing company in Madurai: Facebook, Instagram and YouTube marketing, Meta ads, reels and content in Tamil and English. Rated 4.9★ on Google.",
      canonical: `${BASE_URL}/services/social-media-marketing/madurai`,
      ogImage: `${BASE_URL}/og/services-05socialmediamarketing.jpg`,
      robots: "index,follow",
    },
  },
  "/services/advertising-agency/madurai": {
    title: "Advertising Agency in Madurai | Google & Meta Ads | Static Savvy Media",
    slug: "services/advertising-agency/madurai",
    seo: {
      title: "Advertising Agency in Madurai | Google & Meta Ads | Static Savvy Media",
      description:
        "Advertising agency in Madurai for Google Ads, Meta (Facebook & Instagram) ads, YouTube ads and WhatsApp lead campaigns, with conversion tracking. WhatsApp +91 99440 40345.",
      canonical: `${BASE_URL}/services/advertising-agency/madurai`,
      ogImage: `${BASE_URL}/og/locations-01madurai.jpg`,
      robots: "index,follow",
    },
  },
  "/locations/tamil-nadu": {
    title: "Digital Marketing Agency in Tamil Nadu | Static Savvy Media",
    slug: "locations/tamil-nadu",
    seo: {
      title: "Digital Marketing Agency in Tamil Nadu | Static Savvy Media",
      description:
        "Digital marketing agency in Tamil Nadu with offices in Madurai and Thoothukudi: SEO, Local SEO, Google Ads, social media and AI search for businesses across the state.",
      canonical: `${BASE_URL}/locations/tamil-nadu`,
      ogImage: `${BASE_URL}/og/locations-01madurai.jpg`,
      robots: "index,follow",
    },
  },
  "/blog/top-digital-marketing-companies-in-madurai": {
    title: "Top Digital Marketing Companies in Madurai (2026 Comparison)",
    slug: "blog/top-digital-marketing-companies-in-madurai",
    seo: {
      title: "Top Digital Marketing Companies in Madurai (2026 Comparison)",
      description:
        "A plain comparison of well-known digital marketing companies in Madurai: services, focus, locations and Google ratings as seen in October 2026, plus how to choose.",
      canonical: `${BASE_URL}/blog/top-digital-marketing-companies-in-madurai`,
      ogImage: `${BASE_URL}/og/locations-01madurai.jpg`,
      robots: "index,follow",
    },
  },
};

/**
 * Helper to get SEO config for any route path. Returns null when the path has no entry.
 */
export function getSeoForPath(pathname) {
  let normalizedPath = pathname || "/";
  if (normalizedPath.length > 1 && normalizedPath.endsWith("/")) {
    normalizedPath = normalizedPath.slice(0, -1);
  }
  // No homepage fallback: unknown paths (NotFound) and Sanity blog posts set their own SEO.
  // Falling back to '/' gave those pages the homepage title and canonical.
  return seoConfig[normalizedPath] || null;
}
