import type { Metadata } from "next";

/** Public origin used for canonical URLs, Open Graph, sitemap and JSON-LD. */
export const SITE_URL = new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://greendhaka.lovable.app").origin;
export const SITE_NAME = "Green Dhaka";
export const SITE_LOGO = "/images/gd/green-dhaka-logo.png";

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
