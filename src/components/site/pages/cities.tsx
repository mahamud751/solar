"use client";

import Link from "next/link";
import { divisions, cityName, divisionName } from "@/data/cities";
import { useContent } from "@/data/content";
import { useLang } from "@/i18n/lang";


export function CitiesPage() {
  const { lang } = useLang();
  const { CITIES: cities } = useContent();
  const bn = lang === "bn";
  return (
    <>
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h1 className="font-display text-4xl font-bold">{bn ? "আপনার শহরে সোলার" : "Solar in your city"}</h1>
        <p className="mt-3 text-muted-foreground">{bn ? "স্থানীয় সোলার তথ্য দেখতে আপনার শহর বেছে নিন।" : "Pick your city to see local solar details."}</p>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {divisions.map((d) => (
            <div key={d}>
              <h2 className="font-bold text-primary">{divisionName(d, lang)} {bn ? "বিভাগ" : "Division"}</h2>
              <ul className="mt-3 space-y-1.5">{cities.filter((c) => c.division === d).map((c) => (
                <li key={c.slug}><Link href={`/solar-company-in-${c.slug}`} className="text-sm hover:text-primary">{cityName(c, lang)}{c.cityCorp ? (bn ? " (সিটি কর্পোরেশন)" : " (City Corporation)") : ""}</Link></li>
              ))}</ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
