import type { Metadata } from "next";

/** Public origin used for canonical URLs, Open Graph, sitemap and JSON-LD. */
export const SITE_URL = new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://greendhaka.com").origin;
export const SITE_NAME = "Green Dhaka";
export const SITE_LOGO = "/images/gd/green-dhaka-logo.png";

/** Shortens text at a word boundary so search results show it whole. */
export function clip(text: string, max: number) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const at = cut.lastIndexOf(" ");
  return `${(at > max * 0.6 ? cut.slice(0, at) : cut).replace(/[\s,;:—–-]+$/, "")}…`;
}

/** Fits a page title within ~60 characters, keeping the brand suffix when there is room. */
export function fitTitle(title: string, suffix = ` | ${SITE_NAME}`, max = 60) {
  const clean = title.replace(/\s+/g, " ").trim();
  if (clean.length + suffix.length <= max) return clean + suffix;
  const head = clean.split(/\s[—–|:]\s|:\s/)[0]!;
  if (head.length + suffix.length <= max && head.length >= 20) return head + suffix;
  if (clean.length <= max) return clean;
  return clip(head.length >= 20 ? head : clean, max);
}

/** Absolute URL for a site path or image. */
export const absolute = (path: string) => (/^https?:/.test(path) ? path : `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`);

/** schema.org BreadcrumbList from [name, path] pairs, starting after Home. */
export function breadcrumbLd(items: [string, string][]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [["Home", "/"] as [string, string], ...items].map(([name, path], index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      item: absolute(path),
    })),
  };
}

type PageMetaInput = {
  path: string;
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  type?: "website" | "article";
  image?: string;
  siteName?: string;
};

/** Builds per-page metadata with canonical URL, Open Graph and Twitter tags. */
export function pageMeta({
  path,
  title,
  description,
  ogTitle,
  ogDescription,
  type = "website",
  image = "/images/gd/hero-solar.jpg",
  siteName = SITE_NAME,
}: PageMetaInput): Metadata {
  title = fitTitle(title, "", 65);
  description = clip(description, 160);
  ogDescription = ogDescription && clip(ogDescription, 200);
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      title: ogTitle ?? title,
      description: ogDescription ?? description,
      type,
      url: path,
      siteName,
      locale: "en_BD",
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle ?? title,
      description: ogDescription ?? description,
      images: [image],
    },
  };
}

/** Renders a JSON-LD script tag. */
export function jsonLd(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
