import { lazyPage } from './lazyPage.js'
import { Routes, Route } from 'react-router-dom'
import LandingLayout from '../layouts/LandingLayout.jsx'
import ContentLayout from '../layouts/ContentLayout.jsx'
import BlogLayout from '../layouts/BlogLayout.jsx'

import Home from '../pages/Home/Home.jsx'

const About = lazyPage('src/pages/About/About.jsx', () => import('../pages/About/About.jsx'))
const Founder = lazyPage('src/pages/About/Founder.jsx', () => import('../pages/About/Founder.jsx'))
const Reviews = lazyPage('src/pages/About/Reviews.jsx', () => import('../pages/About/Reviews.jsx'))

const Services = lazyPage('src/pages/Services/Services.jsx', () => import('../pages/Services/Services.jsx'))
const SEO = lazyPage('src/pages/Services/SEO.jsx', () => import('../pages/Services/SEO.jsx'))
const GEOAEO = lazyPage('src/pages/Services/GEOAEO.jsx', () => import('../pages/Services/GEOAEO.jsx'))
const LocalSEO = lazyPage('src/pages/Services/LocalSEO.jsx', () => import('../pages/Services/LocalSEO.jsx'))
const GoogleAds = lazyPage('src/pages/Services/GoogleAds.jsx', () => import('../pages/Services/GoogleAds.jsx'))
const SocialMediaMarketing = lazyPage('src/pages/Services/SocialMediaMarketing.jsx', () => import('../pages/Services/SocialMediaMarketing.jsx'))
const WebsiteDesignDevelopment = lazyPage('src/pages/Services/WebsiteDesignDevelopment.jsx', () => import('../pages/Services/WebsiteDesignDevelopment.jsx'))
const AIBusinessAutomation = lazyPage('src/pages/Services/AIBusinessAutomation.jsx', () => import('../pages/Services/AIBusinessAutomation.jsx'))
const CorporatePhotographyVideo = lazyPage('src/pages/Services/CorporatePhotographyVideo.jsx', () => import('../pages/Services/CorporatePhotographyVideo.jsx'))
const AIVideoCreation = lazyPage('src/pages/Services/AIVideoCreation.jsx', () => import('../pages/Services/AIVideoCreation.jsx'))
const ProductPhotographyCreativeDesign = lazyPage('src/pages/Services/ProductPhotographyCreativeDesign.jsx', () => import('../pages/Services/ProductPhotographyCreativeDesign.jsx'))

const SEO_Madurai = lazyPage('src/pages/ServiceLocations/SEO/SEO_Madurai.jsx', () => import('../pages/ServiceLocations/SEO/SEO_Madurai.jsx'))
const SEO_Thoothukudi = lazyPage('src/pages/ServiceLocations/SEO/SEO_Thoothukudi.jsx', () => import('../pages/ServiceLocations/SEO/SEO_Thoothukudi.jsx'))
const SEO_Malaysia = lazyPage('src/pages/ServiceLocations/SEO/SEO_Malaysia.jsx', () => import('../pages/ServiceLocations/SEO/SEO_Malaysia.jsx'))
const SEO_KualaLumpur = lazyPage('src/pages/ServiceLocations/SEO/SEO_KualaLumpur.jsx', () => import('../pages/ServiceLocations/SEO/SEO_KualaLumpur.jsx'))
const GoogleAds_KualaLumpur = lazyPage('src/pages/ServiceLocations/GoogleAds/GoogleAds_KualaLumpur.jsx', () => import('../pages/ServiceLocations/GoogleAds/GoogleAds_KualaLumpur.jsx'))
const SocialMedia_Madurai = lazyPage('src/pages/ServiceLocations/SocialMedia/SocialMedia_Madurai.jsx', () => import('../pages/ServiceLocations/SocialMedia/SocialMedia_Madurai.jsx'))
const WebsiteDevelopment_Madurai = lazyPage('src/pages/ServiceLocations/WebsiteDevelopment/WebsiteDevelopment_Madurai.jsx', () => import('../pages/ServiceLocations/WebsiteDevelopment/WebsiteDevelopment_Madurai.jsx'))
const LocalSEO_Madurai = lazyPage('src/pages/ServiceLocations/LocalSEO/LocalSEO_Madurai.jsx', () => import('../pages/ServiceLocations/LocalSEO/LocalSEO_Madurai.jsx'))
const LocalSEO_Thoothukudi = lazyPage('src/pages/ServiceLocations/LocalSEO/LocalSEO_Thoothukudi.jsx', () => import('../pages/ServiceLocations/LocalSEO/LocalSEO_Thoothukudi.jsx'))
const LocalSEO_Malaysia = lazyPage('src/pages/ServiceLocations/LocalSEO/LocalSEO_Malaysia.jsx', () => import('../pages/ServiceLocations/LocalSEO/LocalSEO_Malaysia.jsx'))
const GEOAEO_Madurai = lazyPage('src/pages/ServiceLocations/GEOAEO/GEOAEO_Madurai.jsx', () => import('../pages/ServiceLocations/GEOAEO/GEOAEO_Madurai.jsx'))
const GoogleAds_Thoothukudi = lazyPage('src/pages/ServiceLocations/GoogleAds/GoogleAds_Thoothukudi.jsx', () => import('../pages/ServiceLocations/GoogleAds/GoogleAds_Thoothukudi.jsx'))
const AIBusinessAutomation_Malaysia = lazyPage('src/pages/ServiceLocations/AIBusinessAutomation/AIBusinessAutomation_Malaysia.jsx', () => import('../pages/ServiceLocations/AIBusinessAutomation/AIBusinessAutomation_Malaysia.jsx'))

const Locations = lazyPage('src/pages/Locations/Locations.jsx', () => import('../pages/Locations/Locations.jsx'))
const Madurai = lazyPage('src/pages/Locations/Madurai.jsx', () => import('../pages/Locations/Madurai.jsx'))
const Thoothukudi = lazyPage('src/pages/Locations/Thoothukudi.jsx', () => import('../pages/Locations/Thoothukudi.jsx'))
const Malaysia = lazyPage('src/pages/Locations/Malaysia.jsx', () => import('../pages/Locations/Malaysia.jsx'))
const CityLanding = lazyPage('src/pages/Locations/CityLanding.jsx', () => import('../pages/Locations/CityLanding.jsx'))

const Industries = lazyPage('src/pages/Industries/Industries.jsx', () => import('../pages/Industries/Industries.jsx'))
const ManufacturingB2B = lazyPage('src/pages/Industries/ManufacturingB2B.jsx', () => import('../pages/Industries/ManufacturingB2B.jsx'))
const GrowthAudit = lazyPage('src/pages/GrowthAudit/GrowthAudit.jsx', () => import('../pages/GrowthAudit/GrowthAudit.jsx'))
const Solutions = lazyPage('src/pages/Solutions/Solutions.jsx', () => import('../pages/Solutions/Solutions.jsx'))
const RetailEcommerce = lazyPage('src/pages/Industries/RetailEcommerce.jsx', () => import('../pages/Industries/RetailEcommerce.jsx'))
const HealthcareClinics = lazyPage('src/pages/Industries/HealthcareClinics.jsx', () => import('../pages/Industries/HealthcareClinics.jsx'))
const EducationTraining = lazyPage('src/pages/Industries/EducationTraining.jsx', () => import('../pages/Industries/EducationTraining.jsx'))
const HospitalityHotels = lazyPage('src/pages/Industries/HospitalityHotels.jsx', () => import('../pages/Industries/HospitalityHotels.jsx'))
const TextilesMadurai = lazyPage('src/pages/Industries/TextilesMadurai.jsx', () => import('../pages/Industries/TextilesMadurai.jsx'))
const AdvertisingAgency_Madurai = lazyPage('src/pages/ServiceLocations/Advertising/AdvertisingAgency_Madurai.jsx', () => import('../pages/ServiceLocations/Advertising/AdvertisingAgency_Madurai.jsx'))
const TamilNadu = lazyPage('src/pages/Locations/TamilNadu.jsx', () => import('../pages/Locations/TamilNadu.jsx'))
const TopCompaniesMadurai = lazyPage('src/pages/Blog/TopCompaniesMadurai.jsx', () => import('../pages/Blog/TopCompaniesMadurai.jsx'))
const PortMarineIndustrialThoothukudi = lazyPage('src/pages/Industries/PortMarineIndustrialThoothukudi.jsx', () => import('../pages/Industries/PortMarineIndustrialThoothukudi.jsx'))
const SMEsMalaysia = lazyPage('src/pages/Industries/SMEsMalaysia.jsx', () => import('../pages/Industries/SMEsMalaysia.jsx'))
const RealEstateBuilders = lazyPage('src/pages/Industries/RealEstateBuilders.jsx', () => import('../pages/Industries/RealEstateBuilders.jsx'))

import CountryPricing from '../pages/Pricing/CountryPricingRoute.jsx'
import FunnelLayout from '../layouts/FunnelLayout.jsx'
import PortfolioRoute from '../pages/Portfolio/PortfolioRoute.jsx'
const Diwali2026 = lazyPage('src/pages/Diwali/Diwali2026.jsx', () => import('../pages/Diwali/Diwali2026.jsx'))

const CaseStudies = lazyPage('src/pages/CaseStudies/CaseStudies.jsx', () => import('../pages/CaseStudies/CaseStudies.jsx'))
const Client1 = lazyPage('src/pages/CaseStudies/Client1.jsx', () => import('../pages/CaseStudies/Client1.jsx'))
const Client2 = lazyPage('src/pages/CaseStudies/Client2.jsx', () => import('../pages/CaseStudies/Client2.jsx'))
const Client3 = lazyPage('src/pages/CaseStudies/Client3.jsx', () => import('../pages/CaseStudies/Client3.jsx'))
const Client4 = lazyPage('src/pages/CaseStudies/Client4.jsx', () => import('../pages/CaseStudies/Client4.jsx'))

const Blog = lazyPage('src/pages/Blog/Blog.jsx', () => import('../pages/Blog/Blog.jsx'))
const BlogPost = lazyPage('src/pages/Blog/BlogPost.jsx', () => import('../pages/Blog/BlogPost.jsx'))
const BlogSEO = lazyPage('src/pages/Blog/SEO.jsx', () => import('../pages/Blog/SEO.jsx'))
const BlogGEOAEO = lazyPage('src/pages/Blog/GEOAEO.jsx', () => import('../pages/Blog/GEOAEO.jsx'))
const BlogLocalMarketing = lazyPage('src/pages/Blog/LocalMarketing.jsx', () => import('../pages/Blog/LocalMarketing.jsx'))
const WhatIsGEO = lazyPage('src/pages/Blog/WhatIsGEO.jsx', () => import('../pages/Blog/WhatIsGEO.jsx'))
const WhatIsAEO = lazyPage('src/pages/Blog/WhatIsAEO.jsx', () => import('../pages/Blog/WhatIsAEO.jsx'))
const SEOAgencyMaduraiGuide = lazyPage('src/pages/Blog/SEO.jsx', () => import('../pages/Blog/SEO.jsx'))
const MalaysiaGrantGuide = lazyPage('src/pages/Blog/MalaysiaGrantGuide.jsx', () => import('../pages/Blog/MalaysiaGrantGuide.jsx'))
const LocalSEOThoothukudi = lazyPage('src/pages/Blog/LocalSEOThoothukudi.jsx', () => import('../pages/Blog/LocalSEOThoothukudi.jsx'))

const Contact = lazyPage('src/pages/Utility/Contact.jsx', () => import('../pages/Utility/Contact.jsx'))
const FAQ = lazyPage('src/pages/Utility/FAQ.jsx', () => import('../pages/Utility/FAQ.jsx'))
const PrivacyPolicy = lazyPage('src/pages/Utility/PrivacyPolicy.jsx', () => import('../pages/Utility/PrivacyPolicy.jsx'))
const Terms = lazyPage('src/pages/Utility/Terms.jsx', () => import('../pages/Utility/Terms.jsx'))
const Sitemap = lazyPage('src/pages/Utility/Sitemap.jsx', () => import('../pages/Utility/Sitemap.jsx'))
import NotFound from '../pages/Utility/NotFound.jsx'
const StaticBlogPost = lazyPage('src/pages/Blog/StaticBlogPost.jsx', () => import('../pages/Blog/StaticBlogPost.jsx'))

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<LandingLayout />}>
        <Route path="/" element={<Home />} />
      </Route>

      {/* Unlisted per-country pricing landing pages: focused funnel layout, no site nav. */}
      <Route element={<FunnelLayout />}>
        <Route path="/p/india-9xajei" element={<CountryPricing country="india" />} />
        <Route path="/p/malaysia-2josdx" element={<CountryPricing country="malaysia" />} />
        <Route path="/p/dubai-a8aokh" element={<CountryPricing country="dubai" />} />
        <Route path="/p/singapore-xseszo" element={<CountryPricing country="singapore" />} />
        {/* Private client portfolio, shared only on request (noindex,nofollow, never linked). */}
        <Route path="/p/portfolio-6g3sak" element={<PortfolioRoute />} />
        {/* Diwali 2026 campaign (3-9 Nov 2026 IST): indexable, kept out of the main nav. */}
        <Route path="/diwali-2026" element={<Diwali2026 />} />
      </Route>

      <Route element={<ContentLayout />}>
        <Route path="/about" element={<About />} />
        <Route path="/about/deepan-kanz" element={<Founder />} />
        <Route path="/about/reviews" element={<Reviews />} />

        <Route path="/services" element={<Services />} />
        <Route path="/services/seo" element={<SEO />} />
        <Route path="/services/geo-aeo-ai-search" element={<GEOAEO />} />
        <Route path="/services/local-seo" element={<LocalSEO />} />
        <Route path="/services/google-ads" element={<GoogleAds />} />
        <Route
          path="/services/social-media-marketing"
          element={<SocialMediaMarketing />}
        />
        <Route
          path="/services/website-design-development"
          element={<WebsiteDesignDevelopment />}
        />
        <Route
          path="/services/ai-business-automation"
          element={<AIBusinessAutomation />}
        />
        <Route
          path="/services/corporate-photography-video"
          element={<CorporatePhotographyVideo />}
        />
        <Route
          path="/services/ai-video-creation"
          element={<AIVideoCreation />}
        />
        <Route
          path="/services/product-photography-creative-design"
          element={<ProductPhotographyCreativeDesign />}
        />

        <Route path="/services/seo/madurai" element={<SEO_Madurai />} />
        <Route
          path="/services/website-design-development/madurai"
          element={<WebsiteDevelopment_Madurai />}
        />
        <Route path="/services/seo/thoothukudi" element={<SEO_Thoothukudi />} />
        <Route path="/services/seo/malaysia" element={<SEO_Malaysia />} />
        <Route path="/services/seo/kuala-lumpur" element={<SEO_KualaLumpur />} />
        <Route path="/services/google-ads/kuala-lumpur" element={<GoogleAds_KualaLumpur />} />
        <Route
          path="/services/social-media-marketing/madurai"
          element={<SocialMedia_Madurai />}
        />
        <Route
          path="/services/local-seo/madurai"
          element={<LocalSEO_Madurai />}
        />
        <Route
          path="/services/local-seo/thoothukudi"
          element={<LocalSEO_Thoothukudi />}
        />
        <Route
          path="/services/local-seo/malaysia"
          element={<LocalSEO_Malaysia />}
        />
        <Route
          path="/services/geo-aeo-ai-search/madurai"
          element={<GEOAEO_Madurai />}
        />
        <Route
          path="/services/google-ads/thoothukudi"
          element={<GoogleAds_Thoothukudi />}
        />
        <Route
          path="/services/ai-business-automation/malaysia"
          element={<AIBusinessAutomation_Malaysia />}
        />

        <Route path="/locations" element={<Locations />} />
        <Route path="/locations/madurai" element={<Madurai />} />
        <Route path="/locations/thoothukudi" element={<Thoothukudi />} />
        <Route path="/locations/malaysia" element={<Malaysia />} />
        <Route path="/locations/kuala-lumpur" element={<CityLanding slug="kuala-lumpur" />} />
        <Route path="/locations/tamil-nadu" element={<TamilNadu />} />
        <Route path="/locations/chennai" element={<CityLanding slug="chennai" />} />
        <Route path="/locations/coimbatore" element={<CityLanding slug="coimbatore" />} />
        <Route path="/locations/trichy" element={<CityLanding slug="trichy" />} />
        <Route path="/locations/salem" element={<CityLanding slug="salem" />} />
        <Route path="/locations/tirunelveli" element={<CityLanding slug="tirunelveli" />} />
        <Route path="/locations/tiruppur" element={<CityLanding slug="tiruppur" />} />
        <Route path="/locations/selangor" element={<CityLanding slug="selangor" />} />
        <Route path="/locations/rawang" element={<CityLanding slug="rawang" />} />
        <Route path="/locations/singapore" element={<CityLanding slug="singapore" />} />
        <Route path="/locations/dubai" element={<CityLanding slug="dubai" />} />
        <Route path="/locations/dindigul" element={<CityLanding slug="dindigul" />} />
        <Route path="/locations/sivakasi" element={<CityLanding slug="sivakasi" />} />
        <Route path="/locations/shah-alam" element={<CityLanding slug="shah-alam" />} />
        <Route path="/locations/petaling-jaya" element={<CityLanding slug="petaling-jaya" />} />
        <Route path="/services/advertising-agency/madurai" element={<AdvertisingAgency_Madurai />} />

        <Route path="/industries" element={<Industries />} />
        <Route path="/industries/manufacturing-b2b" element={<ManufacturingB2B />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/growth-audit" element={<GrowthAudit />} />
        <Route
          path="/industries/retail-ecommerce"
          element={<RetailEcommerce />}
        />
        <Route
          path="/industries/healthcare-clinics"
          element={<HealthcareClinics />}
        />
        <Route
          path="/industries/education-training"
          element={<EducationTraining />}
        />
        <Route
          path="/industries/hospitality-hotels"
          element={<HospitalityHotels />}
        />
        <Route
          path="/industries/textiles-madurai"
          element={<TextilesMadurai />}
        />
        <Route
          path="/industries/port-marine-industrial-thoothukudi"
          element={<PortMarineIndustrialThoothukudi />}
        />
        <Route
          path="/industries/smes-malaysia-grant-eligible"
          element={<SMEsMalaysia />}
        />
        <Route
          path="/industries/real-estate-builders"
          element={<RealEstateBuilders />}
        />

        {/* ---- Pricing ---- */}
        {/* No public pricing pages: /pricing/ and every /pricing/* page 301 to a service, location or
            the home page (scripts/seo/legacy-redirects.csv). Prices are shared only at proposal time via
            these unlisted per-country pages (noindex,nofollow; never linked; not in sitemap). Paths: masterPricing.js */}
        {/* The /p/ routes sit in FunnelLayout (above), outside the site chrome. */}

        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/case-studies/client-1" element={<Client1 />} />
        <Route path="/case-studies/client-2" element={<Client2 />} />
        <Route path="/case-studies/client-3" element={<Client3 />} />
        <Route path="/case-studies/client-4" element={<Client4 />} />

        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/sitemap" element={<Sitemap />} />
      </Route>

      <Route element={<BlogLayout />}>
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/blog/seo" element={<BlogSEO />} />
        <Route path="/blog/geo-aeo" element={<BlogGEOAEO />} />
        <Route path="/blog/local-marketing" element={<BlogLocalMarketing />} />
        <Route path="/blog/top-digital-marketing-companies-in-madurai" element={<TopCompaniesMadurai />} />
        <Route
          path="/blog/what-is-generative-engine-optimization"
          element={<WhatIsGEO />}
        />
        <Route
          path="/blog/what-is-answer-engine-optimization"
          element={<WhatIsAEO />}
        />
        <Route
          path="/blog/seo-agency-madurai-complete-guide"
          element={<SEOAgencyMaduraiGuide />}
        />
        <Route
          path="/blog/digital-marketing-malaysia-sme-grant-guide"
          element={<MalaysiaGrantGuide />}
        />
        <Route path="/blog/facebook-instagram-google-ads-agency-madurai" element={<StaticBlogPost />} />
        <Route path="/blog/whatsapp-marketing-madurai-businesses" element={<StaticBlogPost />} />
        <Route path="/blog/website-design-company-madurai-checklist" element={<StaticBlogPost />} />
        <Route path="/blog/how-to-choose-digital-marketing-agency-malaysia" element={<StaticBlogPost />} />
        <Route path="/blog/seo-cost-malaysia-price-guide" element={<StaticBlogPost />} />
        <Route path="/blog/small-business-marketing-company-malaysia" element={<StaticBlogPost />} />
        <Route path="/blog/affordable-seo-company-madurai-pricing" element={<StaticBlogPost />} />
        <Route path="/blog/how-long-does-seo-take-madurai" element={<StaticBlogPost />} />
        <Route path="/blog/gbp-not-showing-on-google-maps-causes-fixes" element={<StaticBlogPost />} />
        <Route path="/blog/is-seo-worth-it-small-business-madurai" element={<StaticBlogPost />} />
        <Route path="/blog/rawang-local-seo-google-business-profile" element={<StaticBlogPost />} />
        <Route path="/blog/seo-services-selangor-shah-alam-petaling-jaya" element={<StaticBlogPost />} />
        <Route path="/blog/google-business-profile-optimisation-malaysia" element={<StaticBlogPost />} />
        <Route path="/blog/social-media-marketing-malaysia-smes" element={<StaticBlogPost />} />
        <Route path="/blog/digital-marketing-agency-chennai-businesses" element={<StaticBlogPost />} />
        <Route path="/blog/digital-marketing-coimbatore-manufacturers-b2b" element={<StaticBlogPost />} />
        <Route path="/blog/digital-marketing-trichy-businesses" element={<StaticBlogPost />} />
        <Route path="/blog/digital-marketing-tirunelveli-businesses" element={<StaticBlogPost />} />
        <Route path="/blog/best-web-hosting-india-malaysia-small-business" element={<StaticBlogPost />} />
        <Route path="/blog/agentic-ai-tools-small-business-marketing" element={<StaticBlogPost />} />
        <Route
          path="/blog/local-seo-thoothukudi-businesses"
          element={<LocalSEOThoothukudi />}
        />
      </Route>

      {/* Unknown URLs: real "not found" view marked noindex (no redirect to the homepage,
          which created soft 404s). NOTE: when adding a non-blog route above, also run
          `npm run seo:generate` so vercel.json serves it on direct load. */}
      <Route element={<ContentLayout />}>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}