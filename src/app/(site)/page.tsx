import { getPageMetadata } from "@/server/page-metadata";
import React from "react";
import { HeroClearSky } from "@/components/HeroClearSky";
import { ServicesSection } from "@/components/ServicesSection";
import { AppShowcaseSection } from "@/components/AppShowcaseSection";
import { BrandsMarquee } from "@/components/BrandsMarquee";
import { EcosystemHubSection } from "@/components/EcosystemHubSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { AerialShowcaseSection } from "@/components/AerialShowcaseSection";
import { ImpactEstimatorSection } from "@/components/ImpactEstimatorSection";
import { FaqSection } from "@/components/FaqSection";
import { BlogPreviewSection } from "@/components/BlogPreviewSection";

export function generateMetadata() {
  return getPageMetadata("home");
}

export default function HomePage() {
  return (
    <>
      <HeroClearSky />
      <ServicesSection />
      <AppShowcaseSection />
      <BrandsMarquee />
      <EcosystemHubSection />
      <TestimonialsSection />
      <AerialShowcaseSection />
      <ImpactEstimatorSection />
      <FaqSection />
      <BlogPreviewSection />
    </>
  );
}
