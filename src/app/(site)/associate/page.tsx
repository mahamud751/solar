import { getPageMetadata } from "@/server/page-metadata";
import { getSiteContent } from "@/server/content";
import React from "react";
import { CheckCircle2, Handshake, TrendingUp, ShieldCheck, Layers } from "lucide-react";
import { QuoteForm } from "@/components/QuoteForm";
import { T } from "@/i18n/lang";

export function generateMetadata() {
  return getPageMetadata("associate");
}

export default async function AssociatePage() {
  const { BLOCKS } = await getSiteContent();
  return (
    <>
      <section className="bg-hero-paper pt-28 pb-16 sm:pt-32 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary-deep">
                <Handshake className="h-3.5 w-3.5" aria-hidden="true" />
                <T copyKey="associate/for-epcs-channel-partners" en={"For EPCs & Channel Partners"} bn={"EPC ও চ্যানেল পার্টনারদের জন্য"} />
              </span>
              <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-ink-deep sm:text-5xl">
                <T copyKey="associate/grow-your-solar-epc-business-with-green" en={"Grow your solar EPC business with Green Dhaka"} bn={"গ্রিন ঢাকার সাথে আপনার সোলার EPC ব্যবসা বাড়ান"} />
              </h1>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                <T copyKey="associate/join-green-dhaka-s-verified-solar-partner" en={"Join Green Dhaka's verified solar partner network across Bangladesh. Get a predictable pipeline of residential, commercial, and industrial projects backed by digital engineering and financing support."} bn={"সারা বাংলাদেশে গ্রিন ঢাকার যাচাইকৃত সোলার পার্টনার নেটওয়ার্কে যোগ দিন। ডিজিটাল ইঞ্জিনিয়ারিং ও অর্থায়ন সহায়তাসহ আবাসিক, বাণিজ্যিক ও শিল্প প্রকল্পের নিয়মিত প্রবাহ পান।"} />
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {BLOCKS.ASSOCIATE_BENEFITS.map((b, index) => {
                  const Icon = [TrendingUp, Layers, ShieldCheck, Handshake][index] ?? Handshake;
                  return (
                  <div
                    key={b.title}
                    className="rounded-3xl border border-border bg-card p-5 shadow-card"
                  >
                    <Icon className="h-5 w-5 text-primary-deep" aria-hidden="true" />
                    <h2 className="mt-3 text-base font-extrabold text-ink-deep">
                      <T en={b.title} bn={b.titleBn} />
                    </h2>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                      <T en={b.detail} bn={b.detailBn} />
                    </p>
                  </div>
                  );
                })}
              </div>

              <div className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-card">
                <h2 className="text-sm font-extrabold uppercase tracking-wider text-primary-deep">
                  <T copyKey="associate/who-can-join" en={"Who can join?"} bn={"কারা যোগ দিতে পারেন?"} />
                </h2>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {[
                    ["Licensed Solar EPC Contractors (Residential & C&I)", "লাইসেন্সধারী সোলার EPC ঠিকাদার (আবাসিক ও বাণিজ্যিক)"],
                    ["Electrical Engineers & Solar Consultants", "ইলেকট্রিক্যাল প্রকৌশলী ও সোলার পরামর্শক"],
                    ["Regional Channel Partners & Solar Entrepreneurs across all 8 divisions", "৮টি বিভাগের আঞ্চলিক চ্যানেল পার্টনার ও সোলার উদ্যোক্তা"],
                    ["O&M, Thermal Inspection & Panel Cleaning Service Teams", "O&M, থার্মাল পরিদর্শন ও প্যানেল পরিষ্কারের সার্ভিস টিম"],
                  ].map(([item, itemBn]) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-success"
                        aria-hidden="true"
                      />
                      <span><T en={item} bn={itemBn} /></span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-6">
              <QuoteForm
                kind="PARTNERSHIP"
                defaultSegment="EPC Partner"
                title="Apply to Become a Green Dhaka Associate"
                subtitle="Share your business details and operating city. Our partner onboarding team will reach out within 24 hours."
                titleBn="গ্রিন ঢাকা অ্যাসোসিয়েট হতে আবেদন করুন"
                subtitleBn="আপনার ব্যবসার তথ্য ও কার্যক্রমের শহর জানান। আমাদের পার্টনার অনবোর্ডিং টিম ২৪ ঘণ্টার মধ্যে যোগাযোগ করবে।"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
