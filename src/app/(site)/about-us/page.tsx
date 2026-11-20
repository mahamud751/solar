import { getPageMetadata } from "@/server/page-metadata";
import { getSiteContent } from "@/server/content";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  ClipboardCheck,
  Clock,
  Globe,
  Home as HomeIcon,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
  Wind,
  Wrench,
  Zap,
} from "lucide-react";
import { T } from "@/i18n/lang";
import { SITE_URL } from "@/data/site";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.3H8v3h2.6V21h2.9Z" />
    </svg>
  );
}

export function generateMetadata() {
  return getPageMetadata("about-us");
}

// Same headline numbers as the Green Dhaka homepage.

const VALUE_ICONS = [BadgeCheck, ClipboardCheck, Wind, Wrench];

export default async function AboutPage() {
  const { COMPANY_INFO, VALUES, BLOCKS } = await getSiteContent();
  return (
    <>
      <section className="bg-hero-paper pt-28 pb-16 sm:pt-32 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary-deep">
                <T en={COMPANY_INFO.address} bn={COMPANY_INFO.addressBn} />
              </span>
              <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-ink-deep sm:text-5xl">
                <T copyKey="about-us/a-greener-future-for-every-home-in" en={"A greener future for every home in Bangladesh"} bn={"বাংলাদেশের প্রতিটি বাসার জন্য একটি সবুজ ভবিষ্যৎ"} />
              </h1>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                <T copyKey="about-us/green-dhaka-makes-going-solar-simple-we" en={"Green Dhaka makes going solar simple. We survey your roof, design the right system, install it with our own engineers, handle net-metering approval with your utility and look after it for 25 years — so you can cut your electricity bill by up to 90% without the hassle."} bn={"গ্রিন ঢাকা সোলারে যাওয়া সহজ করে। আমরা আপনার ছাদ সার্ভে করি, সঠিক সিস্টেম ডিজাইন করি, নিজস্ব প্রকৌশলী দিয়ে ইনস্টল করি, বিতরণ কর্তৃপক্ষের সাথে নেট-মিটারিং অনুমোদন সামলাই এবং ২৫ বছর দেখভাল করি — যাতে কোনো ঝামেলা ছাড়াই বিদ্যুৎ বিল ৯০% পর্যন্ত কমাতে পারেন।"} />
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/solar-calculator"
                  className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-bold text-primary-foreground shadow-glow"
                >
                  <span><T copyKey="about-us/try-solar-calculator" en={"Try Solar Calculator"} bn={"সোলার ক্যালকুলেটর দেখুন"} /></span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/cities"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-6 py-3 text-sm font-bold text-ink-deep shadow-card hover:border-primary/40"
                >
                  <span><T copyKey="about-us/cities-we-serve" en={"Cities we serve"} bn={"যেসব শহরে সেবা দিই"} /></span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] border border-white/80 shadow-elevated">
                <Image
                  src={BLOCKS.PAGE_IMAGES.aboutHeroImage}
                  alt="Rooftop solar installation by Green Dhaka"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {BLOCKS.ABOUT_STATS.map((item, index) => {
              const Icon = [HomeIcon, Zap, ShieldCheck, Star][index] ?? Star;
              return (
              <div
                key={index}
                className="rounded-3xl border border-border bg-card p-6 shadow-card"
              >
                <Icon className="h-6 w-6 text-primary-deep" aria-hidden="true" />
                <p className="mt-3 font-display text-2xl font-extrabold text-ink-deep">
                  {item.value}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  <T en={item.label} bn={item.labelBn} />
                </p>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our promises */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-extrabold tracking-tight text-ink-deep">
              <T copyKey="about-us/what-we-stand-for" en={"What we stand for"} bn={"আমরা যা বিশ্বাস করি"} />
            </h2>
            <p className="mt-2.5 text-base text-muted-foreground">
              <T copyKey="about-us/four-promises-we-put-in-writing-and" en={"Four promises we put in writing — and keep for 25 years."} bn={"চারটি প্রতিশ্রুতি আমরা লিখে দিই — এবং ২৫ বছর ধরে রাখি।"} />
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => {
              const vb = v.bn;
              const Icon = VALUE_ICONS[i] ?? BadgeCheck;
              return (
                <div
                  key={v.en.title}
                  className="rounded-3xl border border-border bg-card p-6 shadow-card"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gradient text-primary-foreground">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-base font-extrabold text-ink-deep"><T en={v.en.title} bn={vb.title} /></h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    <T en={v.en.description} bn={vb.description} />
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="border-t border-border/70 bg-surface py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-ink-deep">
            <T copyKey="about-us/how-we-work" en={"How we work"} bn={"আমরা যেভাবে কাজ করি"} />
          </h2>
          <ol className="mt-8 space-y-4">
            {BLOCKS.ABOUT_STEPS.map(([step, stepBn], i) => (
              <li
                key={step}
                className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-card"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-gradient font-bold text-primary-foreground">
                  {i + 1}
                </span>
                <span className="font-semibold text-ink-deep"><T en={step} bn={stepBn} /></span>
              </li>
            ))}
          </ol>
          <div className="mt-10">
            <Link
              href="/contact#quote"
              className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-bold text-primary-foreground shadow-glow"
            >
              <span><T copyKey="about-us/book-a-free-survey" en={"Book a free survey"} bn={"ফ্রি সার্ভে বুক করুন"} /></span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Contact details */}
      <section id="contact-details" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-extrabold tracking-tight text-ink-deep">
              <T copyKey="about-us/get-in-touch" en={"Get in touch"} bn={"যোগাযোগ করুন"} />
            </h2>
            <p className="mt-2.5 text-base text-muted-foreground">
              <T copyKey="about-us/talk-to-our-solar-team" en={"Talk to our solar team — we reply within one working day."} bn={"আমাদের সোলার টিমের সাথে কথা বলুন — এক কর্মদিবসের মধ্যে উত্তর দিই।"} />
            </p>
          </div>

          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Mail, label: <T copyKey="about-us/email" en={"Email"} bn={"ইমেইল"} />, value: COMPANY_INFO.email, href: COMPANY_INFO.emailHref },
              { icon: Phone, label: <T copyKey="about-us/phone" en={"Phone"} bn={"ফোন"} />, value: COMPANY_INFO.phone, href: COMPANY_INFO.phoneHref },
              { icon: FacebookIcon, label: "Facebook", value: COMPANY_INFO.socials.facebook.replace(/^https?:\/\/(www\.)?/, ""), href: COMPANY_INFO.socials.facebook, external: true },
              { icon: Globe, label: <T copyKey="about-us/website" en={"Website"} bn={"ওয়েবসাইট"} />, value: SITE_URL.replace(/^https?:\/\//, ""), href: SITE_URL, external: true },
              { icon: MapPin, label: <T copyKey="about-us/office" en={"Office"} bn={"অফিস"} />, value: <T en={COMPANY_INFO.address} bn={COMPANY_INFO.addressBn} /> },
              {
                icon: Clock,
                label: <T copyKey="about-us/office-hours" en={"Office hours"} bn={"অফিস সময়"} />,
                value: (
                  <>
                    <T en={COMPANY_INFO.hoursWeekday} bn={COMPANY_INFO.hoursWeekdayBn} />
                    <br />
                    <T en={COMPANY_INFO.hoursSaturday} bn={COMPANY_INFO.hoursSaturdayBn} />
                  </>
                ),
              },
            ]
              .filter((item) => item.value && (!("href" in item) || item.href))
              .map(({ icon: Icon, label, value, href, external }, i) => (
                <li key={i} className="flex items-start gap-4 rounded-3xl border border-border bg-card p-6 shadow-card">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-gradient text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{label}</p>
                    {href ? (
                      <a
                        href={href}
                        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                        className="mt-1 block break-words text-base font-bold text-ink-deep hover:text-primary-deep"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="mt-1 text-base font-bold text-ink-deep">{value}</p>
                    )}
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </section>
    </>
  );
}
