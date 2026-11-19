import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CityPage } from "@/components/site/pages/city";
import { getSiteContent } from "@/server/content";
import { SITE_URL, jsonLd, pageMeta } from "@/data/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: slug } = await params;
  const { CITIES, COMPANY_INFO, BLOCKS } = await getSiteContent();
  const city = CITIES.find((entry) => entry.slug === slug);
  if (!city) return { title: "City not found", robots: { index: false } };
  const format = (text: string) => text.replaceAll("{city}", city.name).replaceAll("{division}", city.division);
  return pageMeta({
    path: `/solar-company-in-${city.slug}`,
    title: `${format(BLOCKS.CITY_PAGE.en.seoTitle)} | ${COMPANY_INFO.name}`,
    image: BLOCKS.PAGE_IMAGES.cityHeroImage,
    siteName: COMPANY_INFO.name,
    description: format(BLOCKS.CITY_PAGE.en.seoDescription),
  });
}

export default async function Page({ params }: { params: Promise<{ city: string }> }) {
  const { city: slug } = await params;
  const { CITIES, COMPANY_INFO } = await getSiteContent();
  const city = CITIES.find((entry) => entry.slug === slug);
  if (!city) notFound();
  const url = `${SITE_URL}/solar-company-in-${city.slug}`;
  return (
    <div className="pt-[4.75rem]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: `${COMPANY_INFO.name} — Solar Company in ${city.name}`,
          url,
          image: `${SITE_URL}${COMPANY_INFO.logoImage ?? "/images/gd/green-dhaka-logo.png"}`,
          telephone: COMPANY_INFO.phoneDial,
          areaServed: { "@type": "City", name: city.name },
          address: {
            "@type": "PostalAddress",
            addressLocality: city.name,
            addressRegion: `${city.division} Division`,
            addressCountry: "BD",
          },
        })}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "Cities", item: `${SITE_URL}/cities` },
            { "@type": "ListItem", position: 3, name: city.name, item: url },
          ],
        })}
      />
      <CityPage slug={city.slug} />
    </div>
  );
}
