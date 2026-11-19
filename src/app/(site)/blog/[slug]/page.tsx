import { getSiteContent } from "@/server/content";
import type { Metadata } from "next";
import { pageMeta } from "@/data/site";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calculator, CheckCircle2 } from "lucide-react";
import { T } from "@/i18n/lang";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const content = await getSiteContent();
  const entry = content.BLOG_ARTICLES.find((item) => item.en.slug === slug);
  if (!entry) return { title: "Article Not Found" };
  const { en: article } = entry;
  return pageMeta({
    path: `/blog/${article.slug}`,
    title: `${article.title} | Green Dhaka`,
    description: article.excerpt,
    type: "article",
    image: article.image,
  });
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = await getSiteContent();
  const entry = content.BLOG_ARTICLES.find((item) => item.en.slug === slug);
  if (!entry) notFound();
  const { en: article, bn } = entry;

  const others = content.BLOG_ARTICLES.filter(({ en }) => en.slug !== article.slug);

  return (
    <article className="bg-background pt-28 pb-20 sm:pt-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-deep hover:underline"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          <span><T copyKey="blog-slug/back-to-all-solar-guides" en={"Back to all solar guides"} bn={"সব সোলার গাইডে ফিরে যান"} /></span>
        </Link>

        <div className="mt-5 flex flex-wrap items-center gap-2 text-xs font-semibold text-muted-foreground">
          <span className="rounded-full bg-primary-soft px-3 py-1 font-bold text-primary-deep">
            <T en={article.category} bn={bn.category} />
          </span>
          <span>·</span>
          <span><T en={article.publishedAt} bn={bn.publishedAt} /></span>
          <span>·</span>
          <span><T en={article.readTime} bn={bn.readTime} /></span>
          <span>·</span>
          <span><T en={`By ${article.author}`} bn={`লিখেছেন: ${bn.author}`} /></span>
        </div>

        <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-ink-deep sm:text-4xl">
          <T en={article.title} bn={bn.title} />
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
          <T en={article.excerpt} bn={bn.excerpt} />
        </p>

        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-3xl border border-border shadow-card">
          <Image
            src={article.image}
            alt={article.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>

        <div className="mt-10 space-y-10">
          {article.sections.map((sec, si) => (
            <section key={sec.heading}>
              <h2 className="text-2xl font-extrabold tracking-tight text-ink-deep">
                <T en={sec.heading} bn={bn.sections[si]?.heading ?? sec.heading} />
              </h2>
              <div className="mt-3 space-y-4 text-base leading-relaxed text-foreground/85">
                {sec.paragraphs.map((p, pi) => (
                  <p key={p}><T en={p} bn={bn.sections[si]?.paragraphs[pi] ?? p} /></p>
                ))}
              </div>
              {sec.bullets.length > 0 && (
                <ul className="mt-5 space-y-3 rounded-2xl border border-border bg-surface p-5 text-sm leading-relaxed text-foreground/90">
                  {sec.bullets.map((b, bi) => (
                    <li key={b} className="flex items-start gap-2.5">
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-primary-deep"
                        aria-hidden="true"
                      />
                      <span><T en={b} bn={bn.sections[si]?.bullets[bi] ?? b} /></span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {/* In-Article Calculator CTA */}
        <div className="mt-14 rounded-3xl bg-solnce-blue p-7 text-white shadow-elevated sm:p-9">
          <h2 className="text-2xl font-extrabold">
            <T copyKey="blog-slug/want-exact-numbers-for-your-own-roof" en={"Want exact numbers for your own roof?"} bn={"নিজের ছাদের সঠিক হিসাব চান?"} />
          </h2>
          <p className="mt-2 text-sm text-white/80">
            <T copyKey="blog-slug/run-our-solar-calculator-for-your-utility" en={"Run our solar calculator for your utility and see the right kW size, cost in taka and payback in under 30 seconds."} bn={"আপনার বিতরণ কর্তৃপক্ষ অনুযায়ী আমাদের সোলার ক্যালকুলেটরে ৩০ সেকেন্ডেরও কম সময়ে সঠিক কিলোওয়াট, টাকায় খরচ ও বিনিয়োগ-উদ্ধার দেখুন।"} />
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/solar-calculator"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-extrabold text-ink-deep"
            >
              <Calculator className="h-4 w-4 text-primary-deep" aria-hidden="true" />
              <span><T copyKey="blog-slug/open-solar-calculator" en={"Open Solar Calculator"} bn={"সোলার ক্যালকুলেটর খুলুন"} /></span>
            </Link>
            <Link
              href="/contact#quote"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-bold text-white hover:bg-white/20"
            >
              <span><T copyKey="blog-slug/request-free-quote" en={"Request Free Quote"} bn={"ফ্রি কোটেশনের অনুরোধ করুন"} /></span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* More Articles */}
        <div className="mt-14 border-t border-border pt-10">
          <h2 className="text-lg font-extrabold text-ink-deep">
            <T copyKey="blog-slug/more-2026-solar-guides" en={"More 2026 Solar Guides"} bn={"আরও ২০২৬ সোলার গাইড"} />
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {others.map(({ en: o, bn: ob }) => {
              return (
              <Link
                key={o.slug}
                href={`/blog/${o.slug}`}
                className="rounded-2xl border border-border bg-card p-5 shadow-card transition-colors hover:border-primary/40"
              >
                <p className="text-xs font-bold text-primary-deep"><T en={o.category} bn={ob.category} /></p>
                <h3 className="mt-1.5 text-base font-extrabold text-ink-deep">
                  <T en={o.title} bn={ob.title} />
                </h3>
              </Link>
              );
            })}
          </div>
        </div>
      </div>
    </article>
  );
}
