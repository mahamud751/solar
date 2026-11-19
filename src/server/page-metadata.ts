import type { Metadata } from "next";
import { pageMeta } from "@/data/site";
import type defaults from "@/data/seo-defaults.json";
import { getSiteContent } from "./content";

export async function getPageMetadata(key: keyof typeof defaults): Promise<Metadata> {
  const { SEO, COMPANY_INFO } = await getSiteContent();
  const { title, description, ogTitle, ogDescription, image } = SEO[key];
  return pageMeta({
    path: key === "home" ? "/" : `/${key}`,
    type: key === "on-grid-solar-system" || key === "off-grid-solar-system" ? "article" : "website",
    siteName: COMPANY_INFO.name,
    title, description, image,
    ogTitle: ogTitle || undefined,
    ogDescription: ogDescription || undefined,
  });
}
