import type { MetadataRoute } from "next";
import { getSiteContent } from "@/server/content";
import { SITE_URL } from "@/data/site";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { SERVICES, BLOG_ARTICLES, CITIES } = await getSiteContent();
  const pages = [
    "/",
    "/homes",
    "/housing-society",
    "/commercial",
    "/on-grid-solar-system",
    "/off-grid-solar-system",
    "/cities",
    "/service",
    "/solar-calculator",
    "/about-us",
    "/blog",
    "/contact",
    "/associate",
    ...SERVICES.map(({ en: s }) => `/service/${s.slug}`),
    ...BLOG_ARTICLES.map(({ en: p }) => `/blog/${p.slug}`),
    ...CITIES.map((c) => `/solar-company-in-${c.slug}`),
  ];
  return pages.map((p) => ({
    url: `${SITE_URL}${p}`,
    changeFrequency: "weekly",
    priority: p === "/" ? 1 : 0.8,
  }));
}
