/**
 * Brings an existing database up to date with content changes made in code.
 *
 *   npm run db:update-content            # preview only, writes nothing
 *   npm run db:update-content -- --apply # write the changes
 *
 * Safe to run more than once. It adds entries the database does not have yet
 * (like `db:seed`), then updates older values only where they still hold the
 * previous default, so edits made in the admin are kept.
 */
import "dotenv/config";
import { Prisma } from "../src/generated/prisma/client";
import { seedEntries } from "../src/data/catalog";
import { EQUIPMENT_PARTNERS } from "../src/data/page-content";
import inlineCopy from "../src/data/inline-copy.json";
import { database } from "../src/server/db";

const apply = process.argv.includes("--apply");
const db = database();
type Json = Prisma.InputJsonValue;
type Key = { collection: string; key: string };
const changes: { label: string; run: () => Promise<unknown> }[] = [];
const plan = (label: string, run: () => Promise<unknown>) => changes.push({ label, run });
const id = ({ collection, key }: Key) => ({ collection_key: { collection, key } });

async function main() {
  // 1. Entries added in code that this database does not have yet.
  const applied = new Set((await db.appliedContentSeed.findMany()).map((r) => `${r.collection}/${r.key}`));
  const pending = seedEntries().filter((e) => !applied.has(`${e.collection}/${e.key}`));
  for (const entry of pending) {
    plan(`add ${entry.collection}/${entry.key}`, () => db.$transaction([
      db.contentEntry.createMany({ data: [{ ...entry, data: entry.data as Json }], skipDuplicates: true }),
      db.appliedContentSeed.createMany({ data: [{ collection: entry.collection, key: entry.key }], skipDuplicates: true }),
    ]));
  }
  if (apply) {
    for (const change of changes.splice(0)) {
      console.log(`• ${change.label}`);
      await change.run();
    }
  }

  const rows = await db.contentEntry.findMany();
  const row = (collection: string, key: string) => rows.find((r) => r.collection === collection && r.key === key);

  // 2. Show Housing Society Solar right after Residential Solar.
  const services = rows.filter((r) => r.collection === "services").sort((a, b) => a.position - b.position);
  const order = services.map((r) => r.key);
  const housing = order.indexOf("housing-society-solar");
  const residential = order.indexOf("residential-solar");
  if (housing >= 0 && residential >= 0 && housing !== residential + 1) {
    order.splice(housing, 1);
    order.splice(order.indexOf("residential-solar") + 1, 0, "housing-society-solar");
    plan("services: place Housing Society Solar after Residential Solar", () => db.$transaction(
      order.map((key, position) => db.contentEntry.update({ where: id({ collection: "services", key }), data: { position } })),
    ));
  }

  // 3. Homepage hero photo.
  const images = row("blocks", "PAGE_IMAGES");
  const imageData = images?.data as Record<string, string> | undefined;
  if (imageData?.homeHeroImage === "/images/residential-solar.jpg") {
    plan("page images: homepage hero photo → /images/gd/hero-solar.jpg", () => db.contentEntry.update({
      where: id({ collection: "blocks", key: "PAGE_IMAGES" }),
      data: { data: { ...imageData, homeHeroImage: "/images/gd/hero-solar.jpg" } },
    }));
  }

  // 4. Company contact details (only replaces the old placeholders).
  const company = row("settings", "company");
  if (company) {
    const data = company.data as Record<string, unknown> & { socials?: Record<string, string> };
    const next: Record<string, unknown> & { socials: Record<string, string> } = { ...data, socials: { ...data.socials } };
    if (data.phone === "09600-000000") Object.assign(next, { phone: "01976-000908", phoneDial: "+8801976000908" });
    if (data.email === "info@greendhaka.com") next.email = "mygreendhaka@gmail.com";
    if (!data.socials?.facebook) next.socials.facebook = "https://www.facebook.com/mygreendhaka";
    if (JSON.stringify(next) !== JSON.stringify(data)) {
      plan("company settings: phone 01976-000908, email mygreendhaka@gmail.com, Facebook link", () =>
        db.contentEntry.update({ where: id({ collection: "settings", key: "company" }), data: { data: next as Json } }));
    }
  }

  // 5. Brands section uses grouped panels / inverters / batteries.
  const brands = row("blocks", "EQUIPMENT_PARTNERS");
  if (brands && !(brands.data as { en?: { groups?: unknown } }).en?.groups) {
    plan("brands section: Top brands we work with (panels, inverters, batteries)", () => db.contentEntry.update({
      where: id({ collection: "blocks", key: "EQUIPMENT_PARTNERS" }), data: { data: EQUIPMENT_PARTNERS as unknown as Json },
    }));
  }

  // 6. "0% down" EMI → "20% down", in English and Bangla.
  const faq: [string, string][] = [
    ["No. With 20% down EMI your monthly instalment is usually lower than the bill savings from month one.",
      "No. You pay just 20% upfront, and the monthly EMI on the rest is usually lower than the bill savings from month one."],
    ["না। ২০% ডাউন EMI-তে প্রথম মাস থেকেই কিস্তি সাধারণত বিলের সাশ্রয়ের চেয়ে কম হয়।",
      "না। মাত্র ২০% আগে দিতে হয়, বাকি অংশের মাসিক কিস্তি সাধারণত প্রথম মাস থেকেই বিলের সাশ্রয়ের চেয়ে কম হয়।"],
  ];
  // 7. Remove "BUET approved" claims, keeping the sentences readable (most specific first).
  const buetFixes: [RegExp, string][] = [
    [/ · BUET approved/g, ""], [/ · BUET অনুমোদিত/g, ""],
    [/, BUET approved/g, ""], [/, BUET অনুমোদিত/g, ""],
    [/ and approved by BUET\./g, "."], [/ এবং BUET অনুমোদিত।/g, "।"],
    [/ Approved by BUET\./g, ""], [/ BUET অনুমোদিত।/g, ""],
    [/BUET-approved structures/g, "storm-proof structures"],
    [/"BUET-approved s/g, '"S'],
    [/BUET-approved /g, ""], [/BUET অনুমোদিত /g, ""],
  ];
  // 8. New editable text lines, so they appear in the admin.
  const copyDefaults = inlineCopy as Record<string, Record<string, unknown>>;

  // Both changes are combined into one update per entry, so neither overwrites the other.
  for (const r of rows) {
    const before = JSON.stringify(r.data);
    const notes: string[] = [];
    let count = 0;
    let text = before
      .replace(/(?<![0-9])0% (down|Down)/g, (_, word) => { count++; return `20% ${word}`; })
      .replace(/(?<![০-৯0-9])০% ডাউন/g, () => { count++; return "২০% ডাউন"; });
    for (const [from, to] of faq) text = text.split(JSON.stringify(from).slice(1, -1)).join(JSON.stringify(to).slice(1, -1));
    if (count) notes.push(`0% down → 20% down (${count})`);
    const buet = (text.match(/BUET/g) ?? []).length;
    for (const [from, to] of buetFixes) text = text.replace(from, to);
    if (buet) notes.push(`remove "BUET approved" (${buet})`);
    let families = 0;
    text = text
      .replace(/20,000\+/g, () => { families++; return "200+"; })
      .replace(/২০,০০০\+/g, () => { families++; return "২০০+"; })
      .replace(/"value":20000,"suffix":"\+"/g, () => { families++; return '"value":200,"suffix":"+"'; });
    if (families) notes.push(`20,000+ → 200+ (${families})`);
    // 9. Homepage hero badges: generic Tier-1 modules, 80% bill reduction (exact old defaults only).
    const heroBadges: [string, string][] = [
      ["Tier-1 LONGi & Trina Modules", "Tier-1 Modules"],
      ["টিয়ার-১ LONGi ও Trina মডিউল", "টিয়ার-১ মডিউল"],
      ["Up to 90% bill reduction from Month 1", "Up to 80% bill reduction from Month 1"],
      ["প্রথম মাস থেকেই বিল ৯০% পর্যন্ত কম", "প্রথম মাস থেকেই বিল ৮০% পর্যন্ত কম"],
    ];
    let badges = 0;
    for (const [from, to] of heroBadges) {
      const parts = text.split(`"${from}"`);
      badges += parts.length - 1;
      text = parts.join(`"${to}"`);
    }
    if (badges) notes.push(`hero badges: Tier-1 Modules, 80% bill reduction (${badges})`);
    let data = JSON.parse(text) as Record<string, unknown>;
    if (r.collection === "copy") {
      const defaults = copyDefaults[r.key] ?? {};
      const missing = Object.keys(defaults).filter((k) => !(k in data));
      if (missing.length) {
        data = { ...defaults, ...data };
        notes.push(`add ${missing.length} new text line(s)`);
      }
    }
    if (JSON.stringify(data) !== before) {
      plan(`${r.collection}/${r.key}: ${notes.join(", ")}`, () =>
        db.contentEntry.update({ where: id(r), data: { data: data as Json } }));
    }
  }

  if (!pending.length && !changes.length) {
    console.log("Content is already up to date.");
    return;
  }
  if (!apply) {
    for (const change of changes) console.log(`• ${change.label}`);
    if (pending.some((e) => e.collection === "services" && e.key === "housing-society-solar")) {
      console.log("• services: place Housing Society Solar after Residential Solar (after it is added)");
    }
    console.log(`\nPreview only: ${changes.length} change(s). Run with --apply to write them.`);
    return;
  }
  for (const change of changes) {
    console.log(`• ${change.label}`);
    await change.run();
  }
  console.log(`\nApplied ${pending.length + changes.length} change(s).`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => db.$disconnect());
