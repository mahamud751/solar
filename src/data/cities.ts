import type { Lang } from "@/i18n/lang";

export type City = { slug: string; name: string; bn: string; division: string; cityCorp: boolean };

const raw: Record<string, string[]> = {
  Barishal: ["Barishal*|বরিশাল", "Barguna|বরগুনা", "Bhola|ভোলা", "Jhalokati|ঝালকাঠি", "Patuakhali|পটুয়াখালী", "Pirojpur|পিরোজপুর"],
  Chattogram: [
    "Chattogram*|চট্টগ্রাম", "Cumilla*|কুমিল্লা", "Bandarban|বান্দরবান", "Brahmanbaria|ব্রাহ্মণবাড়িয়া",
    "Chandpur|চাঁদপুর", "Cox's Bazar|কক্সবাজার", "Feni|ফেনী", "Khagrachhari|খাগড়াছড়ি",
    "Lakshmipur|লক্ষ্মীপুর", "Noakhali|নোয়াখালী", "Rangamati|রাঙামাটি",
  ],
  Dhaka: [
    "Dhaka*|ঢাকা", "Gazipur*|গাজীপুর", "Narayanganj*|নারায়ণগঞ্জ", "Faridpur|ফরিদপুর", "Gopalganj|গোপালগঞ্জ",
    "Kishoreganj|কিশোরগঞ্জ", "Madaripur|মাদারীপুর", "Manikganj|মানিকগঞ্জ", "Munshiganj|মুন্সিগঞ্জ",
    "Narsingdi|নরসিংদী", "Rajbari|রাজবাড়ী", "Shariatpur|শরীয়তপুর", "Tangail|টাঙ্গাইল",
  ],
  Khulna: [
    "Khulna*|খুলনা", "Bagerhat|বাগেরহাট", "Chuadanga|চুয়াডাঙ্গা", "Jashore|যশোর", "Jhenaidah|ঝিনাইদহ",
    "Kushtia|কুষ্টিয়া", "Magura|মাগুরা", "Meherpur|মেহেরপুর", "Narail|নড়াইল", "Satkhira|সাতক্ষীরা",
  ],
  Mymensingh: ["Mymensingh*|ময়মনসিংহ", "Jamalpur|জামালপুর", "Netrakona|নেত্রকোণা", "Sherpur|শেরপুর"],
  Rajshahi: [
    "Rajshahi*|রাজশাহী", "Bogura*|বগুড়া", "Chapainawabganj|চাঁপাইনবাবগঞ্জ", "Joypurhat|জয়পুরহাট", "Naogaon|নওগাঁ",
    "Natore|নাটোর", "Pabna|পাবনা", "Sirajganj|সিরাজগঞ্জ",
  ],
  Rangpur: [
    "Rangpur*|রংপুর", "Dinajpur|দিনাজপুর", "Gaibandha|গাইবান্ধা", "Kurigram|কুড়িগ্রাম",
    "Lalmonirhat|লালমনিরহাট", "Nilphamari|নীলফামারী", "Panchagarh|পঞ্চগড়", "Saidpur|সৈয়দপুর", "Thakurgaon|ঠাকুরগাঁও",
  ],
  Sylhet: ["Sylhet*|সিলেট", "Habiganj|হবিগঞ্জ", "Moulvibazar|মৌলভীবাজার", "Sreemangal|শ্রীমঙ্গল", "Sunamganj|সুনামগঞ্জ"],
};

export const divisions = Object.keys(raw);

/** Division names in Bangla, keyed by the English division name. */
export const divisionsBn: Record<string, string> = {
  Barishal: "বরিশাল",
  Chattogram: "চট্টগ্রাম",
  Dhaka: "ঢাকা",
  Khulna: "খুলনা",
  Mymensingh: "ময়মনসিংহ",
  Rajshahi: "রাজশাহী",
  Rangpur: "রংপুর",
  Sylhet: "সিলেট",
};

export const cities: City[] = divisions.flatMap((division) =>
  raw[division]!.map((n) => {
    const [enPart, bn] = n.split("|") as [string, string];
    const name = enPart.replace("*", "");
    return { name, bn, division, cityCorp: enPart.endsWith("*"), slug: name.toLowerCase().replace(/'/g, "").replace(/\s+/g, "-") };
  }),
);

export const findCity = (slug: string) => cities.find((c) => c.slug === slug);

/** Localised name of a city (or a division) for the active language. */
export const cityName = (c: City, lang: Lang) => (lang === "bn" ? c.bn : c.name);
export const divisionName = (d: string, lang: Lang) => (lang === "bn" ? divisionsBn[d] ?? d : d);
