import { getPageMetadata } from "@/server/page-metadata";
import { getSiteContent } from "@/server/content";
import { jsonLd } from "@/data/site";
import React from "react";
import { HeroClearSky } from "@/components/HeroClearSky";
import { ServicesSection } from "@/components/ServicesSection";
import { CoverageSection } from "@/components/CoverageSection";
import { AppShowcaseSection } from "@/components/AppShowcaseSection";
import { BrandsMarquee } from "@/components/BrandsMarquee";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { AerialShowcaseSection } from "@/components/AerialShowcaseSection";
import { ImpactEstimatorSection } from "@/components/ImpactEstimatorSection";
import { FaqSection } from "@/components/FaqSection";
import { BlogPreviewSection } from "@/components/BlogPreviewSection";
import { TrustSection } from "@/components/site/Offerings";
import { BrandPartners, WarrantySection, NetMeterBand, HomeFeatures, HomeSteps } from "@/components/site/Assurance";

export function generateMetadata() {
  return getPageMetadata("home");
}

export default async function HomePage() {
  const { FAQS } = await getSiteContent();
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map(({ en }) => ({
      "@type": "Question",
      name: en.question,
      acceptedAnswer: { "@type": "Answer", text: en.answer },
    })),
  };
  return (
    <>
      {FAQS.length > 0 && <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqLd)} />}
      <HeroClearSky />
      <ServicesSection />
      <CoverageSection />
      <AppShowcaseSection />
      <TrustSection />
      <BrandPartners />
      <WarrantySection />
      <NetMeterBand />
      <HomeFeatures />
      <HomeSteps />
      <BrandsMarquee />
      <TestimonialsSection />
      <AerialShowcaseSection />
      <ImpactEstimatorSection />
      <FaqSection />
      <BlogPreviewSection />
    </>
  );
}
