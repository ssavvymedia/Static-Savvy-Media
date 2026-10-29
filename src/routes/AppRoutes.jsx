import StaticBlogPost from "../pages/Blog/StaticBlogPost.jsx";
import { Routes, Route } from 'react-router-dom'
import LandingLayout from '../layouts/LandingLayout.jsx'
import ContentLayout from '../layouts/ContentLayout.jsx'
import BlogLayout from '../layouts/BlogLayout.jsx'

import Home from '../pages/Home/Home.jsx'

import About from '../pages/About/About.jsx'
import Founder from '../pages/About/Founder.jsx'
import Reviews from '../pages/About/Reviews.jsx'

import Services from '../pages/Services/Services.jsx'
import SEO from '../pages/Services/SEO.jsx'
import GEOAEO from '../pages/Services/GEOAEO.jsx'
import LocalSEO from '../pages/Services/LocalSEO.jsx'
import GoogleAds from '../pages/Services/GoogleAds.jsx'
import SocialMediaMarketing from '../pages/Services/SocialMediaMarketing.jsx'
import WebsiteDesignDevelopment from '../pages/Services/WebsiteDesignDevelopment.jsx'
import AIBusinessAutomation from '../pages/Services/AIBusinessAutomation.jsx'
import CorporatePhotographyVideo from '../pages/Services/CorporatePhotographyVideo.jsx'
import AIVideoCreation from '../pages/Services/AIVideoCreation.jsx'
import ProductPhotographyCreativeDesign from '../pages/Services/ProductPhotographyCreativeDesign.jsx'

import SEO_Madurai from '../pages/ServiceLocations/SEO/SEO_Madurai.jsx'
import SEO_Thoothukudi from '../pages/ServiceLocations/SEO/SEO_Thoothukudi.jsx'
import SEO_Malaysia from '../pages/ServiceLocations/SEO/SEO_Malaysia.jsx'
import SEO_KualaLumpur from '../pages/ServiceLocations/SEO/SEO_KualaLumpur.jsx'
import GoogleAds_KualaLumpur from '../pages/ServiceLocations/GoogleAds/GoogleAds_KualaLumpur.jsx'
import SocialMedia_Madurai from '../pages/ServiceLocations/SocialMedia/SocialMedia_Madurai.jsx'
import WebsiteDevelopment_Madurai from '../pages/ServiceLocations/WebsiteDevelopment/WebsiteDevelopment_Madurai.jsx'
import LocalSEO_Madurai from '../pages/ServiceLocations/LocalSEO/LocalSEO_Madurai.jsx'
import LocalSEO_Thoothukudi from '../pages/ServiceLocations/LocalSEO/LocalSEO_Thoothukudi.jsx'
import LocalSEO_Malaysia from '../pages/ServiceLocations/LocalSEO/LocalSEO_Malaysia.jsx'
import GEOAEO_Madurai from '../pages/ServiceLocations/GEOAEO/GEOAEO_Madurai.jsx'
import GoogleAds_Thoothukudi from '../pages/ServiceLocations/GoogleAds/GoogleAds_Thoothukudi.jsx'
import AIBusinessAutomation_Malaysia from '../pages/ServiceLocations/AIBusinessAutomation/AIBusinessAutomation_Malaysia.jsx'

import Locations from '../pages/Locations/Locations.jsx'
import Madurai from '../pages/Locations/Madurai.jsx'
import Thoothukudi from '../pages/Locations/Thoothukudi.jsx'
import Malaysia from '../pages/Locations/Malaysia.jsx'
import CityLanding from '../pages/Locations/CityLanding.jsx'

import Industries from '../pages/Industries/Industries.jsx'
import RetailEcommerce from '../pages/Industries/RetailEcommerce.jsx'
import HealthcareClinics from '../pages/Industries/HealthcareClinics.jsx'
import EducationTraining from '../pages/Industries/EducationTraining.jsx'
import HospitalityHotels from '../pages/Industries/HospitalityHotels.jsx'
import TextilesMadurai from '../pages/Industries/TextilesMadurai.jsx'
import AdvertisingAgency_Madurai from '../pages/ServiceLocations/Advertising/AdvertisingAgency_Madurai.jsx'
import TamilNadu from '../pages/Locations/TamilNadu.jsx'
import TopCompaniesMadurai from '../pages/Blog/TopCompaniesMadurai.jsx'
import PortMarineIndustrialThoothukudi from '../pages/Industries/PortMarineIndustrialThoothukudi.jsx'
import SMEsMalaysia from '../pages/Industries/SMEsMalaysia.jsx'
import RealEstateBuilders from '../pages/Industries/RealEstateBuilders.jsx'

import Pricing from '../pages/Pricing/Pricing.jsx'
import CountryPricing from '../pages/Pricing/CountryPricing.jsx'
import SEOPricing from '../pages/Pricing/SEOPricing.jsx'
import LocalSEOPricing from '../pages/Pricing/LocalSEOPricing.jsx'
import GoogleAdsPricing from '../pages/Pricing/GoogleAdsPricing.jsx'
import SocialMediaPricing from '../pages/Pricing/SocialMediaPricing.jsx'
import WebsitePricing from '../pages/Pricing/WebsitePricing.jsx'
import AIPricing from '../pages/Pricing/AIPricing.jsx'
import PhotographyVideoPricing from '../pages/Pricing/PhotographyVideoPricing.jsx'

import CaseStudies from '../pages/CaseStudies/CaseStudies.jsx'
import Client1 from '../pages/CaseStudies/Client1.jsx'
import Client2 from '../pages/CaseStudies/Client2.jsx'
import Client3 from '../pages/CaseStudies/Client3.jsx'
import Client4 from '../pages/CaseStudies/Client4.jsx'

import Blog from '../pages/Blog/Blog.jsx'
import BlogPost from '../pages/Blog/BlogPost.jsx'
import BlogSEO from '../pages/Blog/SEO.jsx'
import BlogGEOAEO from '../pages/Blog/GEOAEO.jsx'
import BlogLocalMarketing from '../pages/Blog/LocalMarketing.jsx'
import WhatIsGEO from '../pages/Blog/WhatIsGEO.jsx'
import WhatIsAEO from '../pages/Blog/WhatIsAEO.jsx'
import SEOAgencyMaduraiGuide from '../pages/Blog/SEO.jsx'
import MalaysiaGrantGuide from '../pages/Blog/MalaysiaGrantGuide.jsx'
import LocalSEOThoothukudi from '../pages/Blog/LocalSEOThoothukudi.jsx'

import Contact from '../pages/Utility/Contact.jsx'
import FAQ from '../pages/Utility/FAQ.jsx'
import PrivacyPolicy from '../pages/Utility/PrivacyPolicy.jsx'
import Terms from '../pages/Utility/Terms.jsx'
import Sitemap from '../pages/Utility/Sitemap.jsx'
import NotFound from '../pages/Utility/NotFound.jsx'

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<LandingLayout />}>
        <Route path="/" element={<Home />} />
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
        <Route path="/locations/singapore" element={<CityLanding slug="singapore" />} />
        <Route path="/locations/dubai" element={<CityLanding slug="dubai" />} />
        <Route path="/services/advertising-agency/madurai" element={<AdvertisingAgency_Madurai />} />

        <Route path="/industries" element={<Industries />} />
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

        {/* ---- Pricing Routes ---- */}
        {/* /pricing/ 301s to the home page (scripts/seo/legacy-redirects.csv). Unlisted per-country
            pricing pages (noindex,nofollow; never linked; not in sitemap). Paths: masterPricing.js */}
        <Route path="/p/india-9xajei" element={<CountryPricing country="india" />} />
        <Route path="/p/malaysia-2josdx" element={<CountryPricing country="malaysia" />} />
        <Route path="/p/dubai-a8aokh" element={<CountryPricing country="dubai" />} />
        <Route path="/p/singapore-xseszo" element={<CountryPricing country="singapore" />} />

        {/* India Pricing */}
        <Route path="/pricing/india" element={<Pricing country="india" />} />
        <Route
          path="/pricing/india/seo"
          element={<SEOPricing country="india" />}
        />
        <Route
          path="/pricing/india/local-seo"
          element={<LocalSEOPricing country="india" />}
        />
        <Route
          path="/pricing/india/google-ads"
          element={<GoogleAdsPricing country="india" />}
        />
        <Route
          path="/pricing/india/social-media"
          element={<SocialMediaPricing country="india" />}
        />
        <Route
          path="/pricing/india/social-media-marketing"
          element={<SocialMediaPricing country="india" />}
        />
        <Route
          path="/pricing/india/website"
          element={<WebsitePricing country="india" />}
        />
        <Route
          path="/pricing/india/website-design-development"
          element={<WebsitePricing country="india" />}
        />
        <Route
          path="/pricing/india/ai-services"
          element={<AIPricing country="india" />}
        />
        <Route
          path="/pricing/india/photography-video"
          element={<PhotographyVideoPricing country="india" />}
        />

        {/* Malaysia Pricing */}
        <Route
          path="/pricing/malaysia"
          element={<Pricing country="malaysia" />}
        />
        <Route
          path="/pricing/malaysia/seo"
          element={<SEOPricing country="malaysia" />}
        />
        <Route
          path="/pricing/malaysia/local-seo"
          element={<LocalSEOPricing country="malaysia" />}
        />
        <Route
          path="/pricing/malaysia/google-ads"
          element={<GoogleAdsPricing country="malaysia" />}
        />
        <Route
          path="/pricing/malaysia/social-media"
          element={<SocialMediaPricing country="malaysia" />}
        />
        <Route
          path="/pricing/malaysia/social-media-marketing"
          element={<SocialMediaPricing country="malaysia" />}
        />
        <Route
          path="/pricing/malaysia/website"
          element={<WebsitePricing country="malaysia" />}
        />
        <Route
          path="/pricing/malaysia/website-design-development"
          element={<WebsitePricing country="malaysia" />}
        />
        <Route
          path="/pricing/malaysia/ai-services"
          element={<AIPricing country="malaysia" />}
        />
        <Route
          path="/pricing/malaysia/photography-video"
          element={<PhotographyVideoPricing country="malaysia" />}
        />

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
        <Route path="/blog/affordable-seo-company-madurai-pricing" element={<StaticBlogPost />} />
        <Route path="/blog/how-long-does-seo-take-madurai" element={<StaticBlogPost />} />
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