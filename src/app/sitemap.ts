import type { MetadataRoute } from "next";
import { getSiteContent } from "@/server/content";
import { database } from "@/server/db";
import { SITE_URL, absolute } from "@/data/site";

export const dynamic = "force-dynamic";

type Entry = MetadataRoute.Sitemap[number];

/** Static pages: path, the SEO entry that holds their text, priority and how often they change. */
const STATIC_PAGES: [path: string, seoKey: string, priority: number, change: Entry["changeFrequency"]][] = [
  ["/", "home", 1, "weekly"],
  ["/homes", "homes", 0.9, "monthly"],
  ["/housing-society", "housing-society", 0.9, "monthly"],
  ["/commercial", "commercial", 0.9, "monthly"],
  ["/solar-calculator", "solar-calculator", 0.9, "monthly"],
  ["/on-grid-solar-system", "on-grid-solar-system", 0.8, "monthly"],
  ["/off-grid-solar-system", "off-grid-solar-system", 0.8, "monthly"],
  ["/service", "service", 0.8, "monthly"],
  ["/cities", "cities", 0.8, "monthly"],
  ["/contact", "contact", 0.8, "yearly"],
  ["/blog", "blog", 0.7, "weekly"],
  ["/about-us", "about-us", 0.6, "yearly"],
  ["/associate", "associate", 0.5, "yearly"],
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [{ SERVICES, BLOG_ARTICLES, CITIES, SEO }, rows] = await Promise.all([
    getSiteContent(),
    database().contentEntry.findMany({ where: { published: true }, select: { collection: true, key: true, updatedAt: true } }),
  ]);
  const updated = new Map(rows.map((r) => [`${r.collection}/${r.key}`, r.updatedAt]));
  const latest = rows.reduce<Date | undefined>((max, r) => (!max || r.updatedAt > max ? r.updatedAt : max), undefined);
  // Shared blocks change many pages at once, so they count towards every static page.
  const blocks = rows.filter((r) => r.collection === "blocks" || r.collection === "copy")
    .reduce<Date | undefined>((max, r) => (!max || r.updatedAt > max ? r.updatedAt : max), undefined);
  const newest = (...dates: (Date | undefined)[]) =>
    dates.reduce<Date | undefined>((max, d) => (d && (!max || d > max) ? d : max), undefined) ?? latest;
  const seo = SEO as Record<string, { image?: string }>;

  return [
    ...STATIC_PAGES.map(([path, key, priority, changeFrequency]): Entry => ({
      url: `${SITE_URL}${path === "/" ? "" : path}`,
      lastModified: newest(updated.get(`seo/${key}`), blocks),
      changeFrequency,
      priority,
      ...(seo[key]?.image && { images: [absolute(seo[key].image)] }),
    })),
    ...SERVICES.map(({ en: s }): Entry => ({
      url: `${SITE_URL}/service/${s.slug}`,
      lastModified: newest(updated.get(`services/${s.slug}`)),
      changeFrequency: "monthly",
      priority: 0.8,
      images: [absolute(s.image)],
    })),
    ...BLOG_ARTICLES.map(({ en: p }): Entry => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: newest(updated.get(`articles/${p.slug}`)),
      changeFrequency: "monthly",
      priority: 0.7,
      images: [absolute(p.image)],
    })),
    ...CITIES.map((c): Entry => ({
      url: `${SITE_URL}/solar-company-in-${c.slug}`,
      lastModified: newest(updated.get(`cities/${c.slug}`), updated.get("blocks/CITY_PAGE")),
      changeFrequency: "monthly",
      priority: 0.7,
    })),
  ];
}
