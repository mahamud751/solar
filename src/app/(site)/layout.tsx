import { ViewTransition, type ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollRevealFallback } from "@/components/ScrollRevealFallback";
import { ContentProvider } from "@/data/content";
import { LanguageProvider, T } from "@/i18n/lang";
import { SITE_LOGO, SITE_URL, jsonLd } from "@/data/site";
import { getSiteContent } from "@/server/content";

export const dynamic = "force-dynamic";

export default async function SiteLayout({ children }: { children: ReactNode }) {
  const { COPY, ...content } = await getSiteContent();
  const company = content.COMPANY_INFO;
  const sameAs = Object.values(company.socials ?? {}).filter((link): link is string => Boolean(link));
  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: company.name,
    url: SITE_URL,
    logo: `${SITE_URL}${company.logoImage ?? SITE_LOGO}`,
    telephone: company.phoneHref.slice(4),
    email: company.email,
    areaServed: { "@type": "Country", name: "Bangladesh" },
    address: { "@type": "PostalAddress", addressLocality: "Dhaka", addressCountry: "BD" },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: company.phoneHref.slice(4),
      contactType: "sales",
      areaServed: "BD",
      availableLanguage: ["English", "Bengali"],
    },
    ...(sameAs.length > 0 && { sameAs }),
  };
  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: company.name,
    url: SITE_URL,
    inLanguage: ["en-BD", "bn-BD"],
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
  return (
    <ContentProvider content={content}>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(organizationLd)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(websiteLd)} />
      <LanguageProvider copy={COPY}>
        <a
          href="#main-content"
          className="visually-hidden fixed top-3 left-3 z-[100] rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground shadow-elevated focus:not-sr-only"
        >
          <T copyKey="layout/skip-to-content" en="Skip to content" bn="মূল অংশে যান" />
        </a>
        <div className="scroll-progress" aria-hidden="true" />
        <Navbar />
        <main id="main-content" className="flex-1">
          <ViewTransition default="page">{children}</ViewTransition>
        </main>
        <Footer />
        <ScrollRevealFallback />
      </LanguageProvider>
    </ContentProvider>
  );
}
