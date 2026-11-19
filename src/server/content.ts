import { cache } from "react";
import { collections, fixedGroups } from "@/data/catalog";
import { database } from "./db";

export const getSiteContent = cache(async () => {
  const entries = await database().contentEntry.findMany({
    where: { published: true },
    orderBy: [{ position: "asc" }, { key: "asc" }],
    select: { collection: true, key: true, data: true },
  });

  function list<K extends keyof typeof collections>(collection: K) {
    type Entry = (typeof collections)[K]["entries"][number];
    return entries.filter((entry) => entry.collection === collection)
      .map((entry) => entry.data as unknown as Entry);
  }

  function fixed<T>(collection: string, defaults: T): T {
    return {
      ...defaults,
      ...Object.fromEntries(entries.filter((entry) => entry.collection === collection)
        .map((entry) => [entry.key, entry.data])),
    };
  }

  const { company } = fixed("settings", fixedGroups.settings.entries);
  const blocks = fixed("blocks", fixedGroups.blocks.entries);
  const copy = fixed("copy", fixedGroups.copy.entries);

  return {
    SERVICES: list("services"),
    BLOG_ARTICLES: list("articles"),
    FAQS: list("faqs"),
    TESTIMONIALS: list("testimonials"),
    AERIAL_SHOWCASE_SLIDES: list("aerial"),
    DISCOMS: list("utilities"),
    BRAND_PARTNERS: list("brands"),
    CITIES: list("cities"),
    APP_STEPS: blocks.APP_STEPS,
    VALUES: blocks.VALUES,
    HERO_STATS: blocks.HERO_STATS,
    BLOCKS: blocks,
    SEO: fixed("seo", fixedGroups.seo.entries),
    COMPANY_INFO: {
      ...fixedGroups.settings.entries.company,
      ...company,
      phoneHref: `tel:${company.phoneDial}`,
      emailHref: `mailto:${company.email}`,
    },
    COPY: Object.fromEntries(Object.entries(copy).flatMap(([group, fields]) =>
      Object.entries(fields).map(([key, value]) => [`${group}/${key}`, value]))),
  };
});

export type SiteContent = Awaited<ReturnType<typeof getSiteContent>>;
