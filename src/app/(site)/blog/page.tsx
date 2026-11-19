import { getPageMetadata } from "@/server/page-metadata";
import { getSiteContent } from "@/server/content";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen } from "lucide-react";
import { T } from "@/i18n/lang";

export function generateMetadata() {
  return getPageMetadata("blog");
}

export default async function BlogPage() {
  const { BLOG_ARTICLES } = await getSiteContent();
  return (
    <section className="bg-hero-paper pt-28 pb-20 sm:pt-32 sm:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary-deep">
            <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
            <T copyKey="blog/green-dhaka-knowledge-hub" en={"Green Dhaka Knowledge Hub"} bn={"গ্রিন ঢাকা জ্ঞানকেন্দ্র"} />
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-ink-deep sm:text-5xl">
            <T copyKey="blog/solar-advice-without-the-noise" en={"Solar advice, without the noise"} bn={"সোলার পরামর্শ, বাড়তি কথা ছাড়া"} />
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            <T copyKey="blog/where-curiosity-meets-clarity-net-metering-in" en={"Where curiosity meets clarity — net metering in Bangladesh, panel technology, costs in taka and real payback math explained plainly."} bn={"যেখানে কৌতূহল মেলে স্পষ্টতায় — বাংলাদেশে নেট মিটারিং, প্যানেল প্রযুক্তি, টাকায় খরচ ও বিনিয়োগ-উদ্ধারের বাস্তব হিসাব, সহজ ভাষায়।"} />
          </p>
        </div>

        <div className="mt-12 grid gap-7 md:grid-cols-3">
          {BLOG_ARTICLES.map(({ en: post, bn: pb }) => {
            return (
            <article
              key={post.slug}
              className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-elevated"
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
                <span className="absolute top-3.5 left-3.5 rounded-full bg-white/92 px-3 py-1 text-xs font-bold text-primary-deep">
                  <T en={post.category} bn={pb.category} />
                </span>
              </Link>

              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground">
                    <T en={`${post.publishedAt} · ${post.readTime}`} bn={`${pb.publishedAt} · ${pb.readTime}`} />
                  </p>
                  <h2 className="mt-2 text-xl font-extrabold leading-snug text-ink-deep group-hover:text-primary-deep">
                    <Link href={`/blog/${post.slug}`}><T en={post.title} bn={pb.title} /></Link>
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    <T en={post.excerpt} bn={pb.excerpt} />
                  </p>
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-primary-deep hover:text-primary-deep"
                >
                  <span><T copyKey="blog/read-full-guide" en={"Read full guide"} bn={"পুরো গাইড পড়ুন"} /></span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
