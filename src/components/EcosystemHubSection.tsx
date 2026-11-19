"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useLang, useT } from "@/i18n/lang";

const HUB_ITEMS = [
  {
    title: "Our Work",
    titleBn: "আমাদের কাজ",
    tagsBn: ["ছাদে ইনস্টল", "বাণিজ্যিক", "গ্রাউন্ড মাউন্ট"],
    descriptionBn: "সারা বাংলাদেশে গ্রিন ঢাকার বাস্তব প্রকল্প — সিস্টেমের আকার, সময়সীমা এবং কমে যাওয়া বিল।",
    ctaBn: "ইনস্টলেশন দেখুন",
    tags: ["Rooftop installs", "Commercial", "Ground mount"],
    description:
      "Real Green Dhaka projects across Bangladesh — system sizes, timelines, and the bills they erased.",
    href: "/service",
    cta: "Explore installations",
    image: "/images/industrial-solar.jpg",
  },
  {
    title: "Associate",
    titleBn: "অ্যাসোসিয়েট",
    tagsBn: ["যাচাইকৃত লিড", "EPC অংশীদার", "চ্যানেল"],
    descriptionBn: "EPC বা চ্যানেল পার্টনার হিসেবে যোগ দিন এবং শুরু থেকে শেষ পর্যন্ত সহায়তাসহ আগ্রহী সোলার গ্রাহকের নিয়মিত লিড পান।",
    ctaBn: "অ্যাসোসিয়েট হোন",
    tags: ["Verified leads", "EPC partners", "Channel"],
    description:
      "Join as an EPC or channel partner and get a pipeline of high-intent solar leads with end-to-end support.",
    href: "/associate",
    cta: "Become an Associate",
    image: "/images/solar-engineering.jpg",
  },
  {
    title: "Learn",
    titleBn: "জানুন",
    tagsBn: ["গাইড", "নেট মিটারিং", "বিনিয়োগ-উদ্ধারের হিসাব"],
    descriptionBn: "যেখানে কৌতূহল মেলে স্পষ্টতায় — নেট-মিটারিং নিয়ম, প্যানেল বাছাই ও বিনিয়োগ-উদ্ধার, সহজ ভাষায়।",
    ctaBn: "সোলার গাইড পড়ুন",
    tags: ["Guides", "Net metering", "Payback maths"],
    description:
      "Where curiosity meets clarity — net-metering rules, panel choices and payback, explained plainly.",
    href: "/blog",
    cta: "Read solar guides",
    image: "/images/ground-mounted-solar.jpg",
  },
];

export function EcosystemHubSection() {
  const t = useT();
  const { lang } = useLang();
  return (
    <section
      aria-labelledby="hub-heading"
      className="py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2
            id="hub-heading"
            className="text-3xl font-extrabold tracking-tight text-ink-deep sm:text-4xl"
          >
            {t("Everything you need", "সঠিকভাবে সোলারে যেতে", "ecosystem-hub-section/everything-you-need")}{" "}
            <span className="text-primary-deep">{t("to go solar well", "যা কিছু দরকার", "ecosystem-hub-section/to-go-solar-well")}</span>
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            {t("Explore the projects we have commissioned, the associate programme for EPCs and installers, and the guides that make the whole decision legible before you spend anything.", "আমাদের চালু করা প্রকল্প, EPC ও ইনস্টলারদের জন্য অ্যাসোসিয়েট প্রোগ্রাম, এবং খরচের আগেই পুরো সিদ্ধান্ত সহজ করে দেওয়া গাইডগুলো দেখুন।", "ecosystem-hub-section/explore-the-projects-we-have-commissioned-the")}
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {HUB_ITEMS.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="reveal-on-scroll group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-primary/35 hover:shadow-elevated"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-muted">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5">
                  {(lang === "bn" ? item.tagsBn : item.tags).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/92 px-2.5 py-0.5 text-[0.68rem] font-bold text-ink-deep backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <h3 className="text-xl font-extrabold text-ink-deep group-hover:text-primary-deep">
                    {t(item.title, item.titleBn)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {t(item.description, item.descriptionBn)}
                  </p>
                </div>

                <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-primary-deep">
                  <span>{t(item.cta, item.ctaBn)}</span>
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
