import type { Bi } from "@/i18n/lang";
import { cities } from "./cities";
import { SITE_LOGO } from "./site";
import * as english from "./solnce";
import * as bangla from "./solnce-bn";
import * as blocks from "./page-content";
import seoDefaults from "./seo-defaults.json";
import inlineCopy from "./inline-copy.json";

function bilingual<T extends object>(en: T[], bn: Partial<T>[]): Bi<T>[] {
  return en.map((entry, index) => ({ en: entry, bn: { ...entry, ...bn[index] } }));
}

const services = english.SERVICES.map((en, index) => {
  const translation = bangla.SERVICES_BN[index];
  return {
    en,
    bn: {
      ...en,
      ...translation,
      process: en.process.map((step, stepIndex) => ({ ...step, ...translation?.process[stepIndex] })),
    },
  };
});

const articles = bilingual(english.BLOG_ARTICLES, bangla.BLOG_ARTICLES_BN).map(({ en, bn }) => ({
  en: { ...en, sections: en.sections.map((section) => ({ ...section, bullets: section.bullets ?? [] })) },
  bn: { ...bn, sections: bn.sections.map((section) => ({ ...section, bullets: section.bullets ?? [] })) },
}));

const { phoneHref, emailHref, ...company } = english.COMPANY_INFO;
export const defaultCompany = { ...company, logoImage: SITE_LOGO, phoneDial: phoneHref.slice(4), email: emailHref.slice(7) };
export const defaultBlocks = blocks;
export const defaultCopy: Record<string, Record<string, Bi<string>>> = inlineCopy;

export const collections = {
  services: { label: "Services", entries: services, key: (item: typeof services[number]) => item.en.slug },
  articles: { label: "Blog articles", entries: articles, key: (item: typeof articles[number]) => item.en.slug },
  faqs: { label: "FAQs", entries: bilingual(english.FAQS, bangla.FAQS_BN), key: (item: Bi<english.FaqItem>) => item.en.id },
  testimonials: { label: "Testimonials", entries: bilingual(english.TESTIMONIALS, bangla.TESTIMONIALS_BN) },
  aerial: { label: "Project showcase", entries: bilingual(english.AERIAL_SHOWCASE_SLIDES, bangla.AERIAL_SHOWCASE_BN), key: (item: Bi<typeof english.AERIAL_SHOWCASE_SLIDES[number]>) => item.en.id },
  brands: { label: "Equipment brands", entries: english.BRAND_PARTNERS.map((en) => ({ en, bn: { tier: bangla.BRAND_TIERS_BN[en.tier] ?? en.tier } })) },
  utilities: { label: "Electricity utilities", entries: bilingual(english.DISCOMS, bangla.DISCOMS_BN), key: (item: Bi<english.DiscomOption>) => item.en.id },
  cities: { label: "Cities and districts", entries: cities, key: (item: typeof cities[number]) => item.slug },
} as const;

export const fixedGroups = {
  seo: { label: "Page SEO", entries: seoDefaults },
  settings: { label: "Company settings", entries: { company: defaultCompany } },
  blocks: {
    label: "Page sections",
    entries: {
      ...blocks,
      APP_STEPS: bilingual(english.APP_STEPS, bangla.APP_STEPS_BN),
      VALUES: bilingual(english.VALUES, bangla.VALUES_BN),
      HERO_STATS: english.HERO_STATS.map((en, index) => ({ en, bn: { ...en, label: bangla.HERO_STATS_BN[index] ?? en.label } })),
    },
  },
  copy: { label: "English and Bangla text", entries: defaultCopy },
} as const;

export const collectionNames = [...Object.keys(collections), ...Object.keys(fixedGroups)];
export type CollectionName = keyof typeof collections | keyof typeof fixedGroups;
export type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

export function isCollection(name: string): name is CollectionName {
  return collectionNames.includes(name);
}

export function isFixed(name: CollectionName): name is keyof typeof fixedGroups {
  return Object.hasOwn(fixedGroups, name);
}

export function collectionLabel(name: CollectionName) {
  return isFixed(name) ? fixedGroups[name].label : collections[name].label;
}

type SeedEntry = { collection: CollectionName; key: string; position: number; data: JsonValue; published: boolean };

export function seedEntries() {
  const entries = collectionNames.filter(isCollection).flatMap<SeedEntry>((collection) => {
    if (isFixed(collection)) {
      return Object.entries(fixedGroups[collection].entries).map(([key, data], position) => ({
        collection, key, position, data: data as JsonValue, published: true,
      }));
    }
    const definition = collections[collection];
    const keyFor = "key" in definition ? definition.key as (data: unknown) => string : undefined;
    return definition.entries.map((data, position) => ({
      collection, key: keyFor ? keyFor(data) : `entry-${position + 1}`, position,
      data: data as JsonValue, published: true,
    }));
  });
  return entries;
}

export function contentTemplate(collection: CollectionName, key: string): JsonValue | undefined {
  if (isFixed(collection)) {
    const entries = fixedGroups[collection].entries as Record<string, JsonValue>;
    return Object.hasOwn(entries, key) ? entries[key] : undefined;
  }
  return collections[collection].entries[0] as JsonValue;
}

