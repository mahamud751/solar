"use client";

import { createContext, createElement, useContext, useMemo, type ReactNode } from "react";
import { useLang, type Bi } from "@/i18n/lang";
import type { SiteContent } from "@/server/content";

type PublicContent = Omit<SiteContent, "COPY" | "SEO">;
const ContentContext = createContext<PublicContent | null>(null);

export function ContentProvider({ content, children }: { content: PublicContent; children: ReactNode }) {
  return createElement(ContentContext.Provider, { value: content }, children);
}

export function useContent() {
  const { lang } = useLang();
  const content = useContext(ContentContext);
  return useMemo(() => {
    if (!content) throw new Error("Site content is unavailable outside the public site layout.");
    const localize = <T,>(items: Bi<T>[]) => items.map((item) => item[lang]);
    const brands = content.BRAND_PARTNERS.map(({ en, bn }) => lang === "bn" ? { ...en, ...bn } : en);
    return {
      ...content,
      SERVICES: localize(content.SERVICES),
      BLOG_ARTICLES: localize(content.BLOG_ARTICLES),
      FAQS: localize(content.FAQS),
      TESTIMONIALS: localize(content.TESTIMONIALS),
      AERIAL_SHOWCASE_SLIDES: localize(content.AERIAL_SHOWCASE_SLIDES),
      DISCOMS: localize(content.DISCOMS),
      BRAND_PARTNERS: brands,
      PANEL_BRANDS: brands.filter((brand) => brand.kind === "panel"),
      APP_STEPS: localize(content.APP_STEPS),
      VALUES: localize(content.VALUES),
      HERO_STATS: localize(content.HERO_STATS),
    };
  }, [lang, content]);
}
