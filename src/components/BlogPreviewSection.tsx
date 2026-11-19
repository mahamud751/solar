"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen } from "lucide-react";
import { useContent } from "@/data/content";
import { useT } from "@/i18n/lang";

export function BlogPreviewSection() {
  const t = useT();
  const { BLOG_ARTICLES } = useContent();
  return (
    <section
      aria-labelledby="blog-heading"
      className="py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary-deep">
              <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
              {t("2026 Buyer Guides", "২০২৬ ক্রেতা গাইড", "blog-preview-section/2026-buyer-guides")}
            </span>
            <h2
              id="blog-heading"
              className="mt-3 text-3xl font-extrabold tracking-tight text-ink-deep sm:text-4xl"
            >
              {t("Solar advice, without the noise", "সোলার পরামর্শ, বাড়তি কথা ছাড়া", "blog-preview-section/solar-advice-without-the-noise")}
            </h2>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-primary-deep hover:text-primary-deep hover:underline"
          >
            <span>{t("Read more articles", "আরও লেখা পড়ুন", "blog-preview-section/read-more-articles")}</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {BLOG_ARTICLES.map((post) => (
            <article
              key={post.slug}
              className="reveal-on-scroll group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-primary/35 hover:shadow-elevated"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="relative aspect-[16/10] w-full overflow-hidden bg-surface-muted"
              >
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3.5 left-3.5 rounded-full bg-white/92 px-3 py-1 text-xs font-bold text-primary-deep backdrop-blur-sm">
                  {post.category}
                </span>
              </Link>

              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground">
                    {post.publishedAt} · {post.readTime}
                  </p>
                  <h3 className="mt-2 text-lg font-extrabold leading-snug text-ink-deep group-hover:text-primary-deep">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-primary-deep hover:text-primary-deep"
                >
                  <span>{t("Read article", "লেখাটি পড়ুন", "blog-preview-section/read-article")}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
