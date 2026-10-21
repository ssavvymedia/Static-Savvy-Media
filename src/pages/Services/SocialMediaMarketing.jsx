import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../components/common/Breadcrumbs.jsx";
import Button from "../../components/common/Button.jsx";
import HeroSection from "../../components/hero/HeroSection.jsx";
import FAQSection from "../../components/sections/FAQSection.jsx";
import CTASection from "../../components/sections/CTASection.jsx";
import ContactFormSection from "../../components/sections/ContactFormSection.jsx";
import { ScrollReveal } from "../../components/animations/ScrollReveal.jsx";
import { setSeo } from "../../utils/seo.js";
import {
  serviceSchema,
  faqPageSchema,
  breadcrumbListSchema,
} from "../../utils/schema.js";
import { buildWhatsAppLink } from "../../utils/helpers.js";
import {
  WHATSAPP_NUMBER,
  WHATSAPP_MESSAGE,
  SITE_URL,
} from "../../utils/constants.js";
import "../../styles/templates/service-template.css";
import "../../styles/pages/social-media-marketing.css";
import smmHeroImg from "../../assets/images/services/05socialmediamarketing.webp";

/* ============================================================
   CONTENT, Approved Static Savvy Media Social Media Marketing
   ============================================================ */

const PAGE_TITLE =
  "Social Media Marketing Services — Madurai, Tamil Nadu & Malaysia | Static Savvy Media";

const PAGE_DESCRIPTION =
  "Social media marketing services for businesses in Tamil Nadu and Malaysia: Instagram, Facebook, YouTube and LinkedIn content plus Meta ads. Rated 4.9★ on Google.";

const HERO_SUBTITLE =
  "Social media done right is not about posting every day and hoping something goes viral. It is a deliberate, data-driven practice of building brand awareness, demonstrating expertise, and creating consistent touchpoints that turn cold audiences into warm enquiries, and warm enquiries into WhatsApp conversations that convert.";

const PLATFORMS = [
  {
    number: "01",
    title: "Instagram",
    icon: "instagram",
    content:
      "Visual storytelling for B2C and brand-forward businesses. Reels, carousels, stories, and paid ads. Strongest for retail, hospitality, education, healthcare, and lifestyle brands in Tamil Nadu and Malaysia.",
    color: "instagram",
  },
  {
    number: "02",
    title: "Facebook",
    icon: "facebook",
    content:
      "Community building and paid advertising. Facebook’s location and interest targeting is strong for local audiences, ideal for event promotion, lead generation campaigns, and retargeting website visitors.",
    color: "facebook",
  },
  {
    number: "03",
    title: "LinkedIn",
    icon: "linkedin",
    content:
      "B2B credibility and professional network building. Strongest for service businesses, agencies, and companies selling to corporate decision-makers in Malaysia and the Singapore corridor.",
    color: "linkedin",
  },
  {
    number: "04",
    title: "YouTube",
    icon: "youtube",
    content:
      "Long-form video content for businesses with educational or demonstration-heavy services. Pairs with our AI video and corporate video services for a full video content strategy.",
    color: "youtube",
  },
];

const INCLUDED_SERVICES = [
  {
    number: "01",
    title: "Monthly Content Calendar",
    content:
      "Monthly content calendar with post topics, formats, and captions, approved before scheduling",
    icon: "calendar",
  },
  {
    number: "02",
    title: "Content Creation",
    content:
      "Content creation: graphic design, carousel layouts, reel scripts and editing",
    icon: "create",
  },
  {
    number: "03",
    title: "Platform-Native Copywriting",
    content:
      "Platform-native copywriting, short, direct, and designed for the scroll",
    icon: "copy",
  },
  {
    number: "04",
    title: "Hashtag & Keyword Strategy",
    content:
      "Hashtag and keyword strategy for Instagram and YouTube search discoverability",
    icon: "hashtag",
  },
  {
    number: "05",
    title: "Community Management",
    content:
      "Community management: responding to comments and DMs within agreed windows",
    icon: "community",
  },
  {
    number: "06",
    title: "Paid Social Campaigns",
    content:
      "Paid social campaigns: Meta ad campaign management with conversion tracking to WhatsApp",
    icon: "paid",
  },
  {
    number: "07",
    title: "Monthly Analytics Report",
    content:
      "Monthly analytics report: reach, engagement, follower growth, link clicks, WhatsApp click events",
    icon: "analytics",
  },
];

const FUNNEL_STEPS = [
  "Strategy",
  "Content Calendar",
  "Creation",
  "Copy",
  "Publish",
  "Community",
  "Paid Distribution",
  "Analytics",
  "Optimisation",
];

const FAQS = [
  {
    question: "How many posts per week do you publish?",
    answer:
      "Depends on your package tier. Starter: 3 posts/week per platform. Growth: 5 posts/week. Scale: daily posting plus stories. Posting frequency is agreed in advance and maintained consistently, consistency matters more than volume for algorithm visibility.",
  },
  {
    question: "Can you create content in Tamil and Bahasa Malaysia?",
    answer:
      "Yes. We create bilingual content, Tamil and English for Tamil Nadu markets, English and Bahasa Malaysia for Malaysia markets. Tamil and Bahasa Malaysia content is written and checked by people, not published straight from machine translation.",
  },
  {
    question: "How long before social media shows real business results?",
    answer:
      "Organic social media is a 3–6 month compounding channel. Paid social can generate enquiries within days. We always recommend starting with a paid component for immediate results while the organic presence builds, then shifting budget toward channels with the best organic return as data matures.",
  },
];

const RELATED_SERVICES = [
  {
    name: "Social Media Marketing in Madurai",
    path: "/services/social-media-marketing/madurai/",
  },
  { name: "Google Ads", path: "/services/google-ads/" },
  { name: "AI Video Creation", path: "/services/ai-video-creation/" },
  {
    name: "Corporate Photography & Video",
    path: "/services/corporate-photography-video/",
  },
  {
    name: "Product Photography & Creative Design",
    path: "/services/product-photography-creative-design/",
  },
  {
    name: "Website Design & Development",
    path: "/services/website-design-development/",
  },
];

const CTA = {
  title: "Build a social presence that actually generates business.",
  subtitle: "",
  label: "Chat With Us on WhatsApp",
};

/* ============================================================
   COMPONENT
   ============================================================ */

export default function SocialMediaMarketing() {
  const jsonLdRef = useRef([]);

  useEffect(() => {
    setSeo({
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      canonical: `${SITE_URL}/services/social-media-marketing/`,
      ogType: "website",
    });

    const faqEntities = FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    }));

    const smmService = serviceSchema({
      serviceType: "Social Media Marketing",
      name: "Social Media Marketing, Static Savvy Media",
      description: PAGE_DESCRIPTION,
      url: `${SITE_URL}/services/social-media-marketing/`,
      provider: {
        "@type": "Organization",
        name: "Static Savvy Media",
        url: SITE_URL,
      },
      areaServed: [
        { "@type": "City", name: "Madurai" },
        { "@type": "City", name: "Thoothukudi" },
        { "@type": "Country", name: "Malaysia" },
      ],
    });

    const breadcrumbs = breadcrumbListSchema({
      items: [
        { name: "Home", item: `${SITE_URL}/` },
        { name: "Services", item: `${SITE_URL}/services/` },
        {
          name: "Social Media Marketing",
          item: `${SITE_URL}/services/social-media-marketing/`,
        },
      ],
    });

    const scripts = [
      smmService,
      faqPageSchema({ faqs: faqEntities }),
      breadcrumbs,
    ].map((data) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.text = JSON.stringify(data);
      document.head.appendChild(script);
      return script;
    });
    jsonLdRef.current = scripts;

    return () => {
      jsonLdRef.current.forEach((script) => script.remove());
      jsonLdRef.current = [];
    };
  }, []);

  const whatsappHref = buildWhatsAppLink(WHATSAPP_NUMBER, WHATSAPP_MESSAGE);

  return (
    <div className="service-template social-media-marketing">
      <style>{`
        /* --- Platforms We Manage Icons --- */
        .social-media-marketing .smm-platforms__grid > *:nth-child(1) .smm-platform-card__icon {
          background: linear-gradient(135deg, #ec4899, #db2777) !important;
          box-shadow: 0 0 18px rgba(236, 72, 153, 0.45) !important;
        }
        .social-media-marketing .smm-platforms__grid > *:nth-child(2) .smm-platform-card__icon {
          background: linear-gradient(135deg, #3b82f6, #1d4ed8) !important;
          box-shadow: 0 0 18px rgba(59, 130, 246, 0.45) !important;
        }
        .social-media-marketing .smm-platforms__grid > *:nth-child(3) .smm-platform-card__icon {
          background: linear-gradient(135deg, #06b6d4, #0891b2) !important;
          box-shadow: 0 0 18px rgba(6, 182, 212, 0.45) !important;
        }
        .social-media-marketing .smm-platforms__grid > *:nth-child(4) .smm-platform-card__icon {
          background: linear-gradient(135deg, #ef4444, #dc2626) !important;
          box-shadow: 0 0 18px rgba(239, 68, 68, 0.45) !important;
        }

        /* --- What Is Included Icons --- */
        .social-media-marketing .smm-included__grid > *:nth-child(1) .smm-included-card__icon {
          background: linear-gradient(135deg, #a855f7, #7c3aed) !important;
          box-shadow: 0 0 18px rgba(168, 85, 247, 0.45) !important;
        }
        .social-media-marketing .smm-included__grid > *:nth-child(2) .smm-included-card__icon {
          background: linear-gradient(135deg, #ec4899, #db2777) !important;
          box-shadow: 0 0 18px rgba(236, 72, 153, 0.45) !important;
        }
        .social-media-marketing .smm-included__grid > *:nth-child(3) .smm-included-card__icon {
          background: linear-gradient(135deg, #3b82f6, #1d4ed8) !important;
          box-shadow: 0 0 18px rgba(59, 130, 246, 0.45) !important;
        }
        .social-media-marketing .smm-included__grid > *:nth-child(4) .smm-included-card__icon {
          background: linear-gradient(135deg, #06b6d4, #0891b2) !important;
          box-shadow: 0 0 18px rgba(6, 182, 212, 0.45) !important;
        }
        .social-media-marketing .smm-included__grid > *:nth-child(5) .smm-included-card__icon {
          background: linear-gradient(135deg, #22c55e, #16a34a) !important;
          box-shadow: 0 0 18px rgba(34, 197, 94, 0.45) !important;
        }
        .social-media-marketing .smm-included__grid > *:nth-child(6) .smm-included-card__icon {
          background: linear-gradient(135deg, #f97316, #ea580c) !important;
          box-shadow: 0 0 18px rgba(249, 115, 22, 0.45) !important;
        }
        .social-media-marketing .smm-included__grid > *:nth-child(7) .smm-included-card__icon {
          background: linear-gradient(135deg, #eab308, #ca8a04) !important;
          box-shadow: 0 0 18px rgba(234, 179, 8, 0.45) !important;
        }
      `}</style>

      {/* ---- Breadcrumbs ---- */}
      <Breadcrumbs />

      {/* ---- Hero ---- */}
      <HeroSection
        layout="two-column"
        eyebrow="Service"
        title="Social Media Marketing, Build Your Brand Where Your Clients Spend Their Time"
        subtitle={HERO_SUBTITLE}
        actions={
          <Button
            href={whatsappHref}
            variant="primary"
            size="lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            Chat With Us on WhatsApp
          </Button>
        }
      >
        <div className="hero__visual-side">
          <img
            src={smmHeroImg}
            width={1536}
            height={1024}
            fetchPriority="high"
            alt="Social Media Marketing"
            className="hero__image"
          />
        </div>
      </HeroSection>

      {/* ---- Platforms We Manage ---- */}
      <section className="section smm-platforms">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Platforms</span>
            <h2 className="section-heading__title">Platforms We Manage</h2>
          </div>
          <div className="smm-platforms__grid">
            {PLATFORMS.map((platform, index) => (
              <ScrollReveal key={platform.number} delay={index * 80}>
                <article
                  className={`smm-platform-card glass-card smm-platform-card--${platform.color}`}
                >
                  <div className="smm-platform-card__top">
                    <div
                      className="smm-platform-card__icon"
                      aria-hidden="true"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50%",
                        width: "52px",
                        height: "52px",
                        color: "#fff",
                      }}
                    >
                      {platform.icon === "instagram" && (
                        <svg
                          width="26"
                          height="26"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect
                            x="2"
                            y="2"
                            width="20"
                            height="20"
                            rx="5"
                            ry="5"
                          />
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                        </svg>
                      )}
                      {platform.icon === "facebook" && (
                        <svg
                          width="26"
                          height="26"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                        </svg>
                      )}
                      {platform.icon === "linkedin" && (
                        <svg
                          width="26"
                          height="26"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                          <rect x="2" y="9" width="4" height="12" />
                          <circle cx="4" cy="4" r="2" />
                        </svg>
                      )}
                      {platform.icon === "youtube" && (
                        <svg
                          width="26"
                          height="26"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <h3 className="smm-platform-card__title">{platform.title}</h3>
                  <p className="smm-platform-card__text">{platform.content}</p>
                  {/* Platform-specific visual */}
                  <div className="smm-platform-card__visual" aria-hidden="true">
                    {platform.icon === "instagram" && (
                      <div className="smm-visual-instagram">
                        <div className="smm-visual-instagram__reel" />
                        <div className="smm-visual-instagram__stories">
                          <span />
                          <span />
                          <span />
                        </div>
                        <div className="smm-visual-instagram__carousel" />
                      </div>
                    )}
                    {platform.icon === "facebook" && (
                      <div className="smm-visual-facebook">
                        <div className="smm-visual-facebook__post" />
                        <div className="smm-visual-facebook__community">
                          <span />
                          <span />
                          <span />
                        </div>
                      </div>
                    )}
                    {platform.icon === "linkedin" && (
                      <div className="smm-visual-linkedin">
                        <div className="smm-visual-linkedin__post" />
                        <div className="smm-visual-linkedin__b2b">
                          <span>B2B</span>
                          <span>→</span>
                          <span>Decision Makers</span>
                        </div>
                      </div>
                    )}
                    {platform.icon === "youtube" && (
                      <div className="smm-visual-youtube">
                        <div className="smm-visual-youtube__video" />
                        <div className="smm-visual-youtube__info">
                          <span className="smm-visual-youtube__title" />
                          <span className="smm-visual-youtube__views" />
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- What Is Included ---- */}
      <section className="section smm-included">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Services</span>
            <h2 className="section-heading__title">What Is Included</h2>
          </div>
          <div className="smm-included__grid">
            {INCLUDED_SERVICES.map((service, index) => (
              <ScrollReveal key={service.number} delay={index * 80}>
                <article className="smm-included-card glass-card">
                  <div className="smm-included-card__top">
                    <div
                      className="smm-included-card__icon"
                      aria-hidden="true"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50%",
                        width: "52px",
                        height: "52px",
                        color: "#fff",
                      }}
                    >
                      {service.icon === "calendar" && (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect
                            x="3"
                            y="4"
                            width="18"
                            height="18"
                            rx="2"
                            ry="2"
                          />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                      )}
                      {service.icon === "create" && (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polygon points="12 2 2 7 12 12 22 7 12 2" />
                          <polyline points="2 17 12 22 22 17" />
                          <polyline points="2 12 12 17 22 12" />
                        </svg>
                      )}
                      {service.icon === "copy" && (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="17" y1="10" x2="3" y2="10" />
                          <line x1="21" y1="6" x2="3" y2="6" />
                          <line x1="21" y1="14" x2="3" y2="14" />
                          <line x1="17" y1="18" x2="3" y2="18" />
                        </svg>
                      )}
                      {service.icon === "hashtag" && (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="4" y1="9" x2="20" y2="9" />
                          <line x1="4" y1="15" x2="20" y2="15" />
                          <line x1="10" y1="3" x2="8" y2="21" />
                          <line x1="16" y1="3" x2="14" y2="21" />
                        </svg>
                      )}
                      {service.icon === "community" && (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                      )}
                      {service.icon === "paid" && (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                        </svg>
                      )}
                      {service.icon === "analytics" && (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="18" y1="20" x2="18" y2="10" />
                          <line x1="12" y1="20" x2="12" y2="4" />
                          <line x1="6" y1="20" x2="6" y2="14" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <h3 className="smm-included-card__title">{service.title}</h3>
                  <p className="smm-included-card__text">{service.content}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Content Engine Visual ---- */}
      <section className="section smm-engine">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Process</span>
            <h2 className="section-heading__title">Our Content Engine</h2>
          </div>
          <ScrollReveal>
            <div className="smm-engine__flow">
              {FUNNEL_STEPS.map((step, index) => (
                <div key={step} className="smm-engine__step-wrapper">
                  <div className="smm-engine__step glass-card">
                    <span
                      className="smm-engine__step-number"
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="smm-engine__step-text">{step}</span>
                  </div>
                  {index < FUNNEL_STEPS.length - 1 && (
                    <div className="smm-engine__arrow" aria-hidden="true">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <polyline points="19 12 12 19 5 12" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ---- FAQ ---- */}
      <FAQSection
        eyebrow="FAQ"
        title="Social Media, Frequently Asked Questions"
        faqs={FAQS}
      />

      {/* ---- Related Services ---- */}
      <section className="section related-content">
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Explore More</span>
            <h2 className="section-heading__title">Related Services</h2>
          </div>
          <div className="related-content__links">
            {RELATED_SERVICES.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="related-content__link"
              >
                {item.name}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            ))}
            <Link
              to="/blog/social-media-marketing-madurai-small-businesses/"
              className="related-content__link"
            >
              Social Media Marketing Guide for Madurai Small Businesses
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
            <Link to="/services/social-media-marketing/madurai/" className="related-content__link">
              Social Media Marketing Agency in Madurai
            </Link>
            <Link to="/faq/" className="related-content__link">
              FAQ
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ---- Final CTA ---- */}
      <CTASection
        title={CTA.title}
        subtitle={CTA.subtitle}
        primaryLabel={CTA.label}
        primaryHref={whatsappHref}
      />
      <ContactFormSection />
    </div>
  );
}
