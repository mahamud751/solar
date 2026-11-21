import type { Bi } from "@/i18n/lang";


type HOMESCopy = {
  h1a: string; h1b: string; sub: string; chips: string[];
  stats: [string, string][];
  introPill: string; introSub: string;
  guarantee: [string, string][];
  advHeading: string; thead: [string, string, string]; advantage: [string, string, string][];
  reviewsHeading: string; faqHeading: string; faqs: [string, string][];
  articleH: string; article: { h: string; p: string[] }[];
  linkOn: string; linkOff: string;
  ctaTitle: string; ctaText: string;
};

type SOCIETIESCopy = {
  h1: string; sub: string; chips: string[]; stats: [string, string][];
  whyHeading: string; why: [string, string][];
  band: [string, string][];
  beHeading: string; beSub: string; breakEven: [string, string][];
  caseLabel: string; caseName: string; caseStudy: [string, string][];
  safetyHeading: string; safetySub: string; safety: string[];
  faqHeading: string; faqs: [string, string][];
  articleH: string; costH: string; costP: string; nmH: string; nmP: string; processH: string; process: string[];
  ctaTitle: string; ctaText: string;
};

type Case = { n: string; kw: string; capex: string; save: string; payback: string };
type COMMERCIALCopy = {
  h1: string; sub: string; chips: string[]; stats: [string, string][];
  featHeading: string; featSub: string; features: [string, string][];
  caseHeading: string; caseLabels: [string, string, string, string]; cases: Case[]; caseNote: string;
  typesHeading: string; types: [string, string][];
  benefitsHeading: string; benefits: string[];
  faqHeading: string; faqs: [string, string][];
  articleH: string; article: [string, string][];
  ctaTitle: string; ctaText: string; ctaButton: string;
};

const ON_GRID_EN: Guide = {
  title: "On-grid Solar System Buying Guide",
  subtitle: "Price, net metering and installation details for homes in Bangladesh.",
  whatIs: [
    "An on-grid (grid-tied) solar system is connected to your utility grid — DESCO, DPDC, REB or your local PBS. Panels power your home during the day and any extra electricity is exported to the grid.",
    "Under SREDA's net-metering guideline, exported units are credited against your bill, so you pay only for the net units you use.",
  ],
  components: [
    { t: "Solar panels", d: "Mono PERC or TOPCon modules convert sunlight into DC electricity." },
    { t: "Grid-tie inverter", d: "Converts DC to AC and syncs with grid voltage and frequency." },
    { t: "Mounting structure", d: "Hot-dip galvanised steel built to withstand cyclone-level winds." },
    { t: "Accessories", d: "DC/AC cables, earthing, lightning arrester and protection boxes." },
    { t: "Bi-directional meter", d: "Records units imported from and exported to the grid for net metering." },
  ],
  didYouKnow: "A 5 kW rooftop system in Dhaka generates around 550–650 units a month — enough to run fans, lights, a fridge and an AC for most families.",
  steps: [
    { t: "Solar energy capture", d: "Panels convert sunlight into DC power." },
    { t: "DC-to-AC conversion", d: "The inverter turns it into usable AC power." },
    { t: "Meter integration", d: "The bi-directional meter tracks every unit." },
    { t: "Household consumption", d: "Your home uses solar power first." },
    { t: "Exporting excess", d: "Extra units flow to the grid and earn credit." },
    { t: "Importing grid power", d: "At night, you draw power from the grid as usual." },
  ],
  incentive: {
    h: "Net metering for on-grid systems",
    p: [
      "Bangladesh's Net Metering Guideline lets residential customers export surplus solar to the grid. Credits are adjusted in your monthly bill.",
      "Green Dhaka handles the full application with your distribution company — from load sanction to meter installation.",
    ],
  },
  prices: [
    { size: "2 kW", units: "220–260", price: "৳1.9 – 2.3 Lakh", suits: "Small flat, bill ৳1,500–2,500" },
    { size: "3 kW", units: "330–390", price: "৳2.7 – 3.2 Lakh", suits: "2–3 bedroom home" },
    { size: "5 kW", units: "550–650", price: "৳4.2 – 5.0 Lakh", suits: "Family home with 1–2 ACs" },
    { size: "10 kW", units: "1,100–1,300", price: "৳8.0 – 9.5 Lakh", suits: "Duplex / building common load" },
  ],
  roi: [
    "Most on-grid homes recover their investment in 4–6 years. After that, power is essentially free for the remaining 20+ years of panel life.",
    "Example: a 5 kW system saving ৳7,000 a month pays back roughly ৳84,000 a year.",
  ],
  pros: ["Lowest cost — no batteries", "Earn credits via net metering", "Minimal maintenance", "Fast payback (4–6 years)"],
  cons: ["No power during grid outages", "Needs net-metering approval", "Depends on grid availability"],
  install: ["Free site survey and shadow analysis", "System design and quotation", "Net-metering application with your utility", "Installation in about 7 days", "Commissioning, meter fitting and app setup"],
  conclusion: "If your home has a reliable grid connection, an on-grid system is the most affordable way to slash your electricity bill. Book a free survey and our engineers will size the right system for you.",
  faqs: [
    ["Does on-grid solar need a battery?", "No. The grid acts as your storage through net metering."],
    ["Do solar panels work at night?", "No. At night you use grid power, offset by the credits earned during the day."],
    ["What happens during load-shedding?", "The inverter shuts off for safety. Choose a hybrid or off-grid system if you need backup."],
    ["What's the difference between on-grid and hybrid?", "A hybrid system is grid-tied but also has a battery for backup during outages."],
  ],
};

const ON_GRID_BN: Guide = {
  title: "অন-গ্রিড সোলার সিস্টেম কেনার গাইড",
  subtitle: "বাংলাদেশের বাসার জন্য মূল্য, নেট মিটারিং ও ইনস্টলেশনের বিস্তারিত।",
  whatIs: [
    "অন-গ্রিড (গ্রিড-টায়েড) সোলার সিস্টেম আপনার বিতরণ গ্রিডের — DESCO, DPDC, REB বা স্থানীয় PBS-এর — সাথে সংযুক্ত থাকে। দিনে প্যানেল আপনার বাসা চালায় এবং অতিরিক্ত বিদ্যুৎ গ্রিডে রপ্তানি হয়।",
    "SREDA-র নেট-মিটারিং নির্দেশিকা অনুযায়ী রপ্তানি করা ইউনিট আপনার বিলের সাথে হিসাব হয়, তাই আপনি শুধু ব্যবহারের নিট ইউনিটের জন্য পরিশোধ করেন।",
  ],
  components: [
    { t: "সোলার প্যানেল", d: "মনো PERC বা TOPCon মডিউল সূর্যের আলো থেকে DC বিদ্যুৎ তৈরি করে।" },
    { t: "গ্রিড-টাই ইনভার্টার", d: "DC-কে AC-তে রূপান্তর করে গ্রিডের ভোল্টেজ ও ফ্রিকোয়েন্সির সাথে সমন্বয় করে।" },
    { t: "মাউন্টিং কাঠামো", d: "ঘূর্ণিঝড়-স্তরের বাতাস সামলাতে তৈরি হট-ডিপ গ্যালভানাইজড স্টিল।" },
    { t: "অ্যাক্সেসরিজ", d: "DC/AC কেবল, আর্থিং, বজ্র-নিরোধক ও প্রোটেকশন বক্স।" },
    { t: "বাই-ডিরেকশনাল মিটার", d: "গ্রিড থেকে আমদানি ও গ্রিডে রপ্তানি উভয় ইউনিট হিসাব করে।" },
  ],
  didYouKnow: "ঢাকায় ৫ কিলোওয়াটের ছাদের সিস্টেম মাসে প্রায় ৫৫০–৬৫০ ইউনিট উৎপাদন করে — বেশিরভাগ পরিবারের ফ্যান, লাইট, ফ্রিজ ও একটি AC চালানোর যথেষ্ট।",
  steps: [
    { t: "সৌরশক্তি আহরণ", d: "প্যানেল সূর্যের আলো থেকে DC বিদ্যুৎ তৈরি করে।" },
    { t: "DC থেকে AC রূপান্তর", d: "ইনভার্টার এটিকে ব্যবহারযোগ্য AC বিদ্যুতে রূপান্তর করে।" },
    { t: "মিটার ইন্টিগ্রেশন", d: "বাই-ডিরেকশনাল মিটার প্রতিটি ইউনিট হিসাব করে।" },
    { t: "গৃহস্থালি ব্যবহার", d: "আপনার বাসা প্রথমে সোলার বিদ্যুৎ ব্যবহার করে।" },
    { t: "অতিরিক্ত রপ্তানি", d: "বাড়তি ইউনিট গ্রিডে যায় এবং ক্রেডিট আনে।" },
    { t: "গ্রিড থেকে আমদানি", d: "রাতে আপনি আগের মতোই গ্রিড থেকে বিদ্যুৎ নেন।" },
  ],
  incentive: {
    h: "অন-গ্রিড সিস্টেমের জন্য নেট মিটারিং",
    p: [
      "বাংলাদেশের নেট মিটারিং নির্দেশিকা আবাসিক গ্রাহকদের অতিরিক্ত সোলার বিদ্যুৎ গ্রিডে রপ্তানির সুযোগ দেয়। ক্রেডিট মাসিক বিলে হিসাব হয়।",
      "লোড স্যাংশন থেকে মিটার ইনস্টলেশন পর্যন্ত আপনার বিতরণ কোম্পানির সাথে সম্পূর্ণ আবেদন প্রক্রিয়া গ্রিন ঢাকা সামলায়।",
    ],
  },
  prices: [
    { size: "2 kW", units: "220–260", price: "৳1.9 – 2.3 Lakh", suits: "ছোট ফ্ল্যাট, বিল ৳1,500–2,500" },
    { size: "3 kW", units: "330–390", price: "৳2.7 – 3.2 Lakh", suits: "২–৩ বেডরুমের বাসা" },
    { size: "5 kW", units: "550–650", price: "৳4.2 – 5.0 Lakh", suits: "১–২ AC-সহ পারিবারিক বাসা" },
    { size: "10 kW", units: "1,100–1,300", price: "৳8.0 – 9.5 Lakh", suits: "ডুপ্লেক্স / ভবনের কমন লোড" },
  ],
  roi: [
    "বেশিরভাগ অন-গ্রিড বাসা ৪–৬ বছরে বিনিয়োগ উঠিয়ে আনে। এরপর প্যানেলের বাকি ২০+ বছরের আয়ুতে বিদ্যুৎ কার্যত ফ্রি।",
    "উদাহরণ: মাসে ৳7,000 সাশ্রয় করা ৫ কিলোওয়াট সিস্টেম বছরে প্রায় ৳84,000 উঠিয়ে আনে।",
  ],
  pros: ["সবচেয়ে কম খরচ — ব্যাটারি নেই", "নেট মিটারিংয়ে ক্রেডিট আয়", "খুব কম রক্ষণাবেক্ষণ", "দ্রুত বিনিয়োগ-উদ্ধার (৪–৬ বছর)"],
  cons: ["গ্রিড লোডশেডিংয়ে বিদ্যুৎ নেই", "নেট-মিটারিং অনুমোদন দরকার", "গ্রিডের প্রাপ্যতার উপর নির্ভরশীল"],
  install: ["ফ্রি সাইট সার্ভে ও ছায়া বিশ্লেষণ", "সিস্টেম ডিজাইন ও কোটেশন", "আপনার বিতরণ কর্তৃপক্ষের সাথে নেট-মিটারিং আবেদন", "প্রায় ৭ দিনে ইনস্টলেশন", "কমিশনিং, মিটার লাগানো ও অ্যাপ সেটআপ"],
  conclusion: "আপনার বাসায় নির্ভরযোগ্য গ্রিড সংযোগ থাকলে অন-গ্রিড সিস্টেমই বিদ্যুৎ বিল কমানোর সবচেয়ে সাশ্রয়ী উপায়। ফ্রি সার্ভে বুক করুন — আমাদের প্রকৌশলীরা সঠিক আকারের সিস্টেম ঠিক করে দেবেন।",
  faqs: [
    ["অন-গ্রিড সোলারে কি ব্যাটারি লাগে?", "না। নেট মিটারিংয়ের মাধ্যমে গ্রিডই আপনার স্টোরেজের কাজ করে।"],
    ["রাতে কি সোলার প্যানেল কাজ করে?", "না। রাতে গ্রিডের বিদ্যুৎ ব্যবহার করেন, যা দিনে অর্জিত ক্রেডিটে হিসাব হয়।"],
    ["লোডশেডিংয়ের সময় কী হয়?", "নিরাপত্তার জন্য ইনভার্টার বন্ধ হয়ে যায়। ব্যাকআপ দরকার হলে হাইব্রিড বা অফ-গ্রিড সিস্টেম নিন।"],
    ["অন-গ্রিড ও হাইব্রিডের পার্থক্য কী?", "হাইব্রিড সিস্টেম গ্রিড-সংযুক্ত, তবে লোডশেডিংয়ের জন্য ব্যাটারি ব্যাকআপও রাখে।"],
  ],
};

export const ON_GRID: Bi<Guide> = { en: ON_GRID_EN, bn: ON_GRID_BN };

const OFF_GRID_EN: Guide = {
  title: "Off-grid Solar System Buying Guide",
  subtitle: "Round-the-clock power with battery backup — no more load-shedding worries.",
  whatIs: [
    "An off-grid solar system works independently of the national grid. Panels charge a battery bank during the day, and the battery powers your home at night and during outages.",
    "It is ideal for char areas, villages, farmhouses, and homes that suffer frequent load-shedding.",
  ],
  components: [
    { t: "Solar panels", d: "High-efficiency mono modules generate DC power." },
    { t: "Off-grid inverter", d: "Converts battery DC to AC and manages charging." },
    { t: "Battery bank", d: "Lithium (LiFePO4) or tubular lead-acid stores energy for night use." },
    { t: "Charge controller (MPPT)", d: "Protects batteries and maximises charging efficiency." },
    { t: "Mounting & accessories", d: "Galvanised structure, cables, earthing and protection devices." },
  ],
  didYouKnow: "Lithium batteries last 8–10 years — nearly three times longer than lead-acid — and need no water top-ups.",
  steps: [
    { t: "Solar energy capture", d: "Panels generate DC power from sunlight." },
    { t: "Battery charging", d: "The MPPT controller charges the battery bank." },
    { t: "DC-to-AC conversion", d: "The inverter supplies AC power to your appliances." },
    { t: "Household consumption", d: "Daytime loads run directly on solar." },
    { t: "Night-time backup", d: "Stored battery energy powers your home after sunset." },
  ],
  incentive: {
    h: "Financing for off-grid systems",
    p: [
      "Off-grid systems are not eligible for net metering, but green-financing schemes through Bangladesh Bank and IDCOL partner banks can lower your interest rate.",
      "Green Dhaka also offers 20% down EMI plans of up to 24 months.",
    ],
  },
  prices: [
    { size: "1 kW + 2.5 kWh battery", units: "110–130", price: "৳1.4 – 1.7 Lakh", suits: "Fans, lights, TV" },
    { size: "2 kW + 5 kWh battery", units: "220–260", price: "৳2.8 – 3.3 Lakh", suits: "Small home with fridge" },
    { size: "3 kW + 7.5 kWh battery", units: "330–390", price: "৳4.0 – 4.8 Lakh", suits: "Family home, 1 AC" },
    { size: "5 kW + 10 kWh battery", units: "550–650", price: "৳6.5 – 7.8 Lakh", suits: "Large home / shop" },
  ],
  roi: [
    "Payback is typically 6–8 years, faster if you currently run a diesel generator or IPS.",
    "Beyond savings, the real return is uninterrupted power for work, study and business.",
  ],
  pros: ["Works during load-shedding", "Complete energy independence", "Replaces noisy diesel generators", "Ideal for remote locations"],
  cons: ["Higher upfront cost due to batteries", "Battery replacement every 8–10 years", "No net-metering income"],
  install: ["Free site survey and load assessment", "Battery and system sizing", "Quotation and EMI options", "Installation in about 7 days", "Commissioning, training and app setup"],
  conclusion: "If you face regular outages or have no reliable grid, an off-grid system gives you dependable power every day. Book a free survey and we'll design the right battery backup for your home.",
  faqs: [
    ["How long does the battery last at night?", "It depends on size and load; a 5 kWh battery runs fans, lights, a fridge and TV for about 8–10 hours."],
    ["Can I run an AC on off-grid solar?", "Yes, with a 3 kW+ system and an appropriately sized battery."],
    ["Do solar panels work on cloudy monsoon days?", "Yes, at reduced output. We size batteries to cover typical monsoon conditions."],
    ["Can I upgrade to on-grid later?", "Yes. A hybrid inverter lets you connect to the grid later while keeping battery backup."],
  ],
};

const OFF_GRID_BN: Guide = {
  title: "অফ-গ্রিড সোলার সিস্টেম কেনার গাইড",
  subtitle: "ব্যাটারি ব্যাকআপসহ চব্বিশ ঘণ্টার বিদ্যুৎ — লোডশেডিংয়ের চিন্তা আর নেই।",
  whatIs: [
    "অফ-গ্রিড সোলার সিস্টেম জাতীয় গ্রিডের বাইরে স্বাধীনভাবে কাজ করে। দিনে প্যানেল ব্যাটারি ব্যাংক চার্জ করে, আর রাতে ও লোডশেডিংয়ের সময় ব্যাটারি আপনার বাসা চালায়।",
    "চরাঞ্চল, গ্রাম, ফার্মহাউস এবং যেসব বাসায় ঘন ঘন লোডশেডিং হয়, সেখানে এটি আদর্শ।",
  ],
  components: [
    { t: "সোলার প্যানেল", d: "উচ্চ-দক্ষতার মনো মডিউল DC বিদ্যুৎ উৎপাদন করে।" },
    { t: "অফ-গ্রিড ইনভার্টার", d: "ব্যাটারির DC-কে AC-তে রূপান্তর করে এবং চার্জিং নিয়ন্ত্রণ করে।" },
    { t: "ব্যাটারি ব্যাংক", d: "লিথিয়াম (LiFePO4) বা টিউবুলার লেড-অ্যাসিড রাতের ব্যবহারের জন্য শক্তি জমা রাখে।" },
    { t: "চার্জ কন্ট্রোলার (MPPT)", d: "ব্যাটারি রক্ষা করে এবং চার্জিংয়ের দক্ষতা সর্বাধিক করে।" },
    { t: "মাউন্টিং ও অ্যাক্সেসরিজ", d: "গ্যালভানাইজড কাঠামো, কেবল, আর্থিং ও সুরক্ষা যন্ত্র।" },
  ],
  didYouKnow: "লিথিয়াম ব্যাটারি ৮–১০ বছর চলে — লেড-অ্যাসিডের প্রায় তিন গুণ বেশি — আর পানি ভরার ঝামেলাও নেই।",
  steps: [
    { t: "সৌরশক্তি আহরণ", d: "প্যানেল সূর্যের আলো থেকে DC বিদ্যুৎ তৈরি করে।" },
    { t: "ব্যাটারি চার্জিং", d: "MPPT কন্ট্রোলার ব্যাটারি ব্যাংক চার্জ করে।" },
    { t: "DC থেকে AC রূপান্তর", d: "ইনভার্টার আপনার যন্ত্রপাতিকে AC বিদ্যুৎ দেয়।" },
    { t: "গৃহস্থালি ব্যবহার", d: "দিনের লোড সরাসরি সোলারে চলে।" },
    { t: "রাতের ব্যাকআপ", d: "সূর্যাস্তের পর জমানো ব্যাটারির শক্তিতে বাসা চলে।" },
  ],
  incentive: {
    h: "অফ-গ্রিড সিস্টেমের জন্য ফাইন্যান্সিং",
    p: [
      "অফ-গ্রিড সিস্টেম নেট মিটারিংয়ের আওতায় পড়ে না, তবে বাংলাদেশ ব্যাংক ও IDCOL অংশীদার ব্যাংকের গ্রিন-ফাইন্যান্সিং স্কিমে সুদের হার কমতে পারে।",
      "গ্রিন ঢাকা ২৪ মাস পর্যন্ত ২০% ডাউন EMI প্ল্যানও দেয়।",
    ],
  },
  prices: [
    { size: "1 kW + 2.5 kWh battery", units: "110–130", price: "৳1.4 – 1.7 Lakh", suits: "ফ্যান, লাইট, টিভি" },
    { size: "2 kW + 5 kWh battery", units: "220–260", price: "৳2.8 – 3.3 Lakh", suits: "ফ্রিজসহ ছোট বাসা" },
    { size: "3 kW + 7.5 kWh battery", units: "330–390", price: "৳4.0 – 4.8 Lakh", suits: "পারিবারিক বাসা, ১টি AC" },
    { size: "5 kW + 10 kWh battery", units: "550–650", price: "৳6.5 – 7.8 Lakh", suits: "বড় বাসা / দোকান" },
  ],
  roi: [
    "বিনিয়োগ-উদ্ধার সাধারণত ৬–৮ বছর; বর্তমানে ডিজেল জেনারেটর বা IPS চালালে আরও দ্রুত হয়।",
    "সাশ্রয়ের বাইরে আসল রিটার্ন — কাজ, পড়াশোনা ও ব্যবসার জন্য বিঘ্নহীন বিদ্যুৎ।",
  ],
  pros: ["লোডশেডিংয়েও বিদ্যুৎ থাকে", "সম্পূর্ণ শক্তি স্বাধীনতা", "কর্কশ ডিজেল জেনারেটরের বিকল্প", "প্রত্যন্ত এলাকার জন্য আদর্শ"],
  cons: ["ব্যাটারির কারণে প্রাথমিক খরচ বেশি", "৮–১০ বছর পর ব্যাটারি বদলাতে হয়", "নেট-মিটারিং আয় নেই"],
  install: ["ফ্রি সাইট সার্ভে ও লোড নিরূপণ", "ব্যাটারি ও সিস্টেম সাইজিং", "কোটেশন ও EMI অপশন", "প্রায় ৭ দিনে ইনস্টলেশন", "কমিশনিং, প্রশিক্ষণ ও অ্যাপ সেটআপ"],
  conclusion: "নিয়মিত লোডশেডিং বা নির্ভরযোগ্য গ্রিড না থাকলে অফ-গ্রিড সিস্টেমই প্রতিদিন নির্ভরযোগ্য বিদ্যুৎ দেয়। ফ্রি সার্ভে বুক করুন — আপনার বাসার জন্য সঠিক ব্যাটারি ব্যাকআপ আমরা ডিজাইন করে দেব।",
  faqs: [
    ["রাতে ব্যাটারি কতক্ষণ চলে?", "আকার ও লোডের উপর নির্ভর করে; ৫ কিলোওয়াট-ঘণ্টা ব্যাটারি ফ্যান, লাইট, ফ্রিজ ও টিভি প্রায় ৮–১০ ঘণ্টা চালায়।"],
    ["অফ-গ্রিড সোলারে কি AC চালানো যায়?", "হ্যাঁ, ৩ কিলোওয়াট+ সিস্টেম ও উপযুক্ত আকারের ব্যাটারি থাকলে যায়।"],
    ["বর্ষার মেঘলা দিনে কি সোলার প্যানেল কাজ করে?", "হ্যাঁ, কম আউটপুটে। সাধারণ বর্ষা পরিস্থিতি সামলাতে ব্যাটারি সাইজ করা হয়।"],
    ["পরে কি অন-গ্রিডে যাওয়া যায়?", "হ্যাঁ। হাইব্রিড ইনভার্টারে ব্যাটারি ব্যাকআপ রেখেই পরে গ্রিডে সংযোগ করা যায়।"],
  ],
};

export const OFF_GRID: Bi<Guide> = { en: OFF_GRID_EN, bn: OFF_GRID_BN };

export type Guide = {
  title: string;
  subtitle: string;
  whatIs: string[];
  components: { t: string; d: string }[];
  didYouKnow: string;
  steps: { t: string; d: string }[];
  incentive: { h: string; p: string[] };
  prices: { size: string; units: string; price: string; suits: string }[];
  roi: string[];
  pros: string[];
  cons: string[];
  install: string[];
  conclusion: string;
  faqs: [string, string][];
};

type GuideCopy = {
  chips: [string, string, string];
  whatIs: string;
  components: string;
  didYouKnow: string;
  how: string;
  priceHeading: string;
  priceNote: string;
  thSize: string;
  thUnits: string;
  thPrice: string;
  thSuits: string;
  roiHeading: string;
  prosConsHeading: string;
  pros: string;
  cons: string;
  compareHeading: string;
  thFeature: string;
  thOnGrid: string;
  thOffGrid: string;
  compare: [string, string, string][];
  installHeading: string;
  whyHeading: string;
  whyPoints: string[];
  conclusionHeading: string;
  faqHeading: string;
};

export const GUIDE_LABELS: Bi<GuideCopy> = {
  en: {
    chips: ["200+ happy families", "25-year warranty", "20% down EMI"],
    whatIs: "What is it?",
    components: "System components",
    didYouKnow: "Did you know?",
    how: "How does it work?",
    priceHeading: "Price in Bangladesh in 2026",
    priceNote: "Indicative prices including installation. Final price depends on roof and site survey.",
    thSize: "System size",
    thUnits: "Units / month",
    thPrice: "Approx. price",
    thSuits: "Suitable for",
    roiHeading: "What's the return on investment?",
    prosConsHeading: "Advantages and disadvantages",
    pros: "Advantages",
    cons: "Disadvantages",
    compareHeading: "On-grid vs off-grid: what's the difference?",
    thFeature: "Feature",
    thOnGrid: "On-grid",
    thOffGrid: "Off-grid",
    compare: [
      ["Grid connection", "Connected to DESCO/DPDC/REB grid", "Fully independent"],
      ["Battery", "Not required", "Required (lithium / tubular)"],
      ["Power cuts (load-shedding)", "Shuts down for safety", "Keeps running"],
      ["Net metering", "Yes — earn on exported units", "No"],
      ["Upfront cost", "Lower", "Higher (battery cost)"],
      ["Best for", "City homes with stable grid", "Remote areas, frequent outages"],
    ],
    installHeading: "How to install it at home",
    whyHeading: "Why choose Green Dhaka?",
    whyPoints: ["Tier-1 panels & certified inverters", "In-house engineers, no subcontractors", "Net-metering paperwork handled for you", "25-year warranty + free annual maintenance"],
    conclusionHeading: "Conclusion",
    faqHeading: "Frequently asked questions",
  },
  bn: {
    chips: ["২০০+ সন্তুষ্ট পরিবার", "২৫ বছরের ওয়ারেন্টি", "২০% ডাউন EMI"],
    whatIs: "এটি কী?",
    components: "সিস্টেমের উপাদান",
    didYouKnow: "আপনি কি জানেন?",
    how: "এটি কীভাবে কাজ করে?",
    priceHeading: "বাংলাদেশে মূল্য (২০২৬)",
    priceNote: "ইনস্টলেশনসহ আনুমানিক মূল্য। চূড়ান্ত মূল্য ছাদ ও সাইট সার্ভের উপর নির্ভর করে।",
    thSize: "সিস্টেমের আকার",
    thUnits: "ইউনিট / মাস",
    thPrice: "আনুমানিক মূল্য",
    thSuits: "যাদের জন্য উপযুক্ত",
    roiHeading: "রিটার্ন অন ইনভেস্টমেন্ট কেমন?",
    prosConsHeading: "সুবিধা ও অসুবিধা",
    pros: "সুবিধা",
    cons: "অসুবিধা",
    compareHeading: "অন-গ্রিড বনাম অফ-গ্রিড: পার্থক্য কী?",
    thFeature: "বৈশিষ্ট্য",
    thOnGrid: "অন-গ্রিড",
    thOffGrid: "অফ-গ্রিড",
    compare: [
      ["গ্রিড সংযোগ", "DESCO/DPDC/REB গ্রিডের সাথে সংযুক্ত", "সম্পূর্ণ স্বাধীন"],
      ["ব্যাটারি", "প্রয়োজন নেই", "প্রয়োজন (লিথিয়াম / টিউবুলার)"],
      ["লোডশেডিং", "নিরাপত্তার জন্য বন্ধ হয়ে যায়", "চলতে থাকে"],
      ["নেট মিটারিং", "হ্যাঁ — রপ্তানি করা ইউনিটে আয়", "নেই"],
      ["প্রাথমিক খরচ", "কম", "বেশি (ব্যাটারির খরচ)"],
      ["যাদের জন্য সেরা", "স্থিতিশীল গ্রিডের শহরের বাসা", "প্রত্যন্ত এলাকা, ঘন ঘন লোডশেডিং"],
    ],
    installHeading: "বাসায় কীভাবে ইনস্টল করবেন",
    whyHeading: "কেন গ্রিন ঢাকা বেছে নেবেন?",
    whyPoints: ["টিয়ার-১ প্যানেল ও সার্টিফায়েড ইনভার্টার", "নিজস্ব প্রকৌশলী, কোনো সাব-কন্ট্রাক্টর নেই", "নেট-মিটারিং কাগজপত্র আমরাই সামলাই", "২৫ বছরের ওয়ারেন্টি + ফ্রি বার্ষিক রক্ষণাবেক্ষণ"],
    conclusionHeading: "উপসংহার",
    faqHeading: "সাধারণ প্রশ্নোত্তর",
  },
};

const homesImg = "/images/gd/offer-homes.jpg";
const societyImg = "/images/gd/offer-society.jpg";
const commercialImg = "/images/gd/offer-commercial.jpg";
const savingsImg = "/images/gd/trust-savings.jpg";
const processImg = "/images/gd/trust-process.jpg";
const stormImg = "/images/gd/trust-storm.jpg";
const serviceImg = "/images/gd/trust-service.jpg";


type Offer = {
  label: string;
  to: string;
  img: string;
  headline: string;
  d: string;
  points: string[];
  cta: string;
};

export const OFFER_TABS: Bi<Offer[]> = {
  en: [
    {
      label: "Homes",
      to: "/service/residential-solar",
      img: homesImg,
      headline: "Solar for Homes",
      d: "Save up to 90% on your home electricity bills.",
      points: ["20% down EMI available", "Net-metering paperwork handled for you", "Installed in as little as 7 days"],
      cta: "Explore solar for homes",
    },
    {
      label: "Housing Societies",
      to: "/housing-society",
      img: societyImg,
      headline: "Solar for Housing Societies",
      d: "Reduce common-area power costs and add long-term value.",
      points: ["Cut lift, pump & common-lighting bills", "AGM-ready proposal and payback plan", "Society fund or easy EMI financing"],
      cta: "Explore solar for societies",
    },
    {
      label: "Commercial",
      to: "/commercial",
      img: commercialImg,
      headline: "Solar for Commercial",
      d: "Power your business with green energy and save on costs.",
      points: ["50 kW – 1 MW+ rooftop systems", "Typical payback in 3–4 years", "End-to-end EPC with O&M included"],
      cta: "Explore solar for commercial",
    },
  ],
  bn: [
    {
      label: "বাসাবাড়ি",
      to: "/service/residential-solar",
      img: homesImg,
      headline: "বাসাবাড়ির জন্য সোলার",
      d: "আপনার বাসার বিদ্যুৎ বিল ৯০% পর্যন্ত সাশ্রয় করুন।",
      points: ["২০% ডাউন EMI-র সুযোগ", "নেট-মিটারিং কাগজপত্র আমরাই সামলাই", "মাত্র ৭ দিনে ইনস্টলেশন"],
      cta: "বাসাবাড়ির সোলার দেখুন",
    },
    {
      label: "হাউজিং সোসাইটি",
      to: "/housing-society",
      img: societyImg,
      headline: "হাউজিং সোসাইটির জন্য সোলার",
      d: "কমন-এলাকার বিদ্যুৎ খরচ কমান, দীর্ঘমেয়াদি মূল্য যোগ করুন।",
      points: ["লিফট, পাম্প ও কমন লাইটের বিল কমান", "AGM-উপযোগী প্রস্তাবনা ও বিনিয়োগ-উদ্ধার পরিকল্পনা", "সোসাইটি ফান্ড বা সহজ EMI ফাইন্যান্সিং"],
      cta: "সোসাইটির সোলার দেখুন",
    },
    {
      label: "বাণিজ্যিক",
      to: "/commercial",
      img: commercialImg,
      headline: "বাণিজ্যিক প্রতিষ্ঠানের জন্য সোলার",
      d: "সবুজ শক্তিতে ব্যবসা চালান, খরচ বাঁচান।",
      points: ["৫০ কিলোওয়াট – ১ মেগাওয়াট+ ছাদের সিস্টেম", "সাধারণত ৩–৪ বছরে বিনিয়োগ উদ্ধার", "O&M অন্তর্ভুক্ত সম্পূর্ণ EPC সেবা"],
      cta: "বাণিজ্যিক সোলার দেখুন",
    },
  ],
};

type TrustCard = { t: string; d: string; img: string; alt: string };

export const TRUST: Bi<{ heading: string; pill: string; sub: string; cards: TrustCard[] }> = {
  en: {
    heading: "Why Families Across Bangladesh Trust Green Dhaka",
    pill: "Our promises",
    sub: "Four promises we put in writing — and keep for 25 years.",
    cards: [
      {
        t: "Guaranteed Savings",
        d: "Bangladesh's only solar company that offers a Savings Guarantee with a money-back promise.",
        img: savingsImg,
        alt: "A family standing in front of their home with rooftop solar panels",
      },
      {
        t: "Hassle-free Process",
        d: "Installation, net-metering paperwork and service — all handled directly by us. Zero middlemen.",
        img: processImg,
        alt: "A Green Dhaka engineer reviewing the installation plan with a homeowner",
      },
      {
        t: "Storm-proof Structure",
        d: "GreenPro Mount™ tested for 170 kmph storms — built for Bangladesh's toughest weather.",
        img: stormImg,
        alt: "Solar panels on a sturdy steel mount under a monsoon storm sky",
      },
      {
        t: "Reliable After-sales Service",
        d: "Regular proactive maintenance for steady, year-after-year performance.",
        img: serviceImg,
        alt: "A technician cleaning and inspecting rooftop solar panels",
      },
    ],
  },
  bn: {
    heading: "সারা বাংলাদেশের পরিবার কেন গ্রিন ঢাকাকে বিশ্বাস করে",
    pill: "আমাদের প্রতিশ্রুতি",
    sub: "চারটি প্রতিশ্রুতি আমরা লিখে দিই — এবং ২৫ বছর ধরে রাখি।",
    cards: [
      {
        t: "নিশ্চিত সাশ্রয়",
        d: "মানি-ব্যাক প্রতিশ্রুতিসহ সাশ্রয় গ্যারান্টি দেয় — বাংলাদেশে এমন সুবিধা শুধু গ্রিন ঢাকা দেয়।",
        img: savingsImg,
        alt: "ছাদে সোলার প্যানেলসহ বাসার সামনে একটি পরিবার",
      },
      {
        t: "ঝামেলাহীন প্রক্রিয়া",
        d: "ইনস্টলেশন, নেট-মিটারিং কাগজপত্র ও সার্ভিস — সবকিছু সরাসরি আমরাই সামলাই। কোনো দালাল নেই।",
        img: processImg,
        alt: "গ্রিন ঢাকার একজন প্রকৌশলী বাসার মালিকের সাথে ইনস্টলেশন পরিকল্পনা দেখছেন",
      },
      {
        t: "ঝড়-প্রতিরোধী কাঠামো",
        d: "GreenPro Mount™ ১৭০ কিমি/ঘণ্টা ঝড় প্রতিরোধে পরীক্ষিত — বাংলাদেশের কঠিনতম আবহাওয়ার জন্য তৈরি।",
        img: stormImg,
        alt: "শক্ত স্টিল মাউন্টে সোলার প্যানেল, পেছনে বর্ষার ঝড়ের আকাশ",
      },
      {
        t: "নির্ভরযোগ্য বিক্রয়োত্তর সেবা",
        d: "নিয়মিত প্রতিরোধমূলক রক্ষণাবেক্ষণে বছরের পর বছর স্থিতিশীল পারফরম্যান্স।",
        img: serviceImg,
        alt: "একজন কারিগর ছাদের সোলার প্যানেল পরিষ্কার ও পরীক্ষা করছেন",
      },
    ],
  },
};

type RoofPreset = {
  id: string;
  label: string;
  labelBn: string;
  capacityKw: number;
  tariff: number;
  roofArea: string;
  image: string;
  caption: string;
  captionBn: string;
};

export const ROOF_PRESETS: RoofPreset[] = [
  {
    id: "home",
    label: "Home · 5 kW",
    labelBn: "বাসা · ৫ কিলোওয়াট",
    capacityKw: 5,
    tariff: 10,
    roofArea: "450 sq.ft",
    image: "/images/residential-solar.jpg",
    caption: "20% down EMI · net metering handled",
    captionBn: "২০% ডাউন EMI · নেট মিটারিং আমরাই করি",
  },
  {
    id: "commercial",
    label: "Business · 50 kW",
    labelBn: "ব্যবসা · ৫০ কিলোওয়াট",
    capacityKw: 50,
    tariff: 13,
    roofArea: "4,500 sq.ft",
    image: "/images/industrial-solar.jpg",
    caption: "3–4 yr typical commercial payback",
    captionBn: "সাধারণত ৩–৪ বছরে বাণিজ্যিক বিনিয়োগ-উদ্ধার",
  },
  {
    id: "industrial",
    label: "Factory · 250 kW",
    labelBn: "কারখানা · ২৫০ কিলোওয়াট",
    capacityKw: 250,
    tariff: 11.5,
    roofArea: "22,500 sq.ft",
    image: "/images/ground-mounted-solar.jpg",
    caption: "Cuts daytime grid & generator costs",
    captionBn: "দিনের গ্রিড ও জেনারেটরের খরচ কমায়",
  },
];

export const ABOUT_STEPS = [
  ["Free site survey at your home or business", "আপনার বাসা বা প্রতিষ্ঠানে ফ্রি সাইট সার্ভে"],
  ["Custom design & transparent, itemised quote", "কাস্টম ডিজাইন ও স্বচ্ছ, বিস্তারিত কোটেশন"],
  ["Installation by our own engineers in as little as 7 days", "মাত্র ৭ দিনে নিজস্ব প্রকৌশলী দিয়ে ইনস্টলেশন"],
  ["Net-metering approval & switch-on with your utility", "বিতরণ কর্তৃপক্ষের সাথে নেট-মিটারিং অনুমোদন ও চালু"],
  ["25 years of monitoring, maintenance and service", "২৫ বছরের মনিটরিং, রক্ষণাবেক্ষণ ও সেবা"],
] as const;

export const ABOUT_STATS = [
  { value: "200+", label: "Homes powered", labelBn: "বাসায় বিদ্যুৎ" },
  { value: "150 MW", label: "Solar installed", labelBn: "সোলার ইনস্টল করা" },
  { value: "৳250 Cr+", label: "Customer savings", labelBn: "গ্রাহকের সাশ্রয়" },
  { value: "4.8★", label: "Average rating", labelBn: "গড় রেটিং" },
];

export const CONTACT_STEPS = [
  {
    title: "Share your details",
    titleBn: "আপনার তথ্য দিন",
    bodyBn: "আপনার সম্পত্তির ধরন, এলাকা ও গড় মাসিক বিল জানান।",
    body: "Tell us your property type, area and average monthly bill.",
  },
  {
    title: "Engineer reviews",
    titleBn: "প্রকৌশলীর পর্যালোচনা",
    bodyBn: "গ্রিন ঢাকার একজন প্রকৌশলী আপনার ছাদ, লোড ও বিতরণ কর্তৃপক্ষ পর্যালোচনা করেন।",
    body: "A Green Dhaka engineer reviews your roof, load and utility.",
  },
  {
    title: "Get your proposal",
    titleBn: "আপনার প্রস্তাব পান",
    bodyBn: "২৪ ঘণ্টার মধ্যে ছাদের লেআউট ও বিস্তারিত কোটেশন।",
    body: "Roof layout & itemised quote within 24 hours.",
  },
];

export const ASSOCIATE_BENEFITS = [
  {
    title: "High-Intent Verified Leads",
    titleBn: "আগ্রহী ও যাচাইকৃত লিড",
    detailBn: "যাচাইকৃত বিল, বিতরণ কর্তৃপক্ষের তথ্য ও বাস্তবসম্মত বাজেটসহ আগে থেকে আকার নির্ধারিত বাসা ও কারখানার অনুসন্ধান পান।",
    detail:
      "Receive pre-sized rooftop & factory inquiries with verified bills, utility details and realistic budget expectations.",
  },
  {
    title: "Standardised Design & Quote Tools",
    titleBn: "মানসম্মত ডিজাইন ও কোটেশন টুল",
    detailBn: "উৎপাদনের হিসাব, বিস্তারিত প্রস্তাবনা ও অগ্রগতি ট্র্যাকিং লিংক তৈরি করুন — দ্রুত চুক্তি চূড়ান্ত করুন।",
    detail:
      "Generate generation estimates, itemised proposals and milestone tracking links that close deals faster.",
  },
  {
    title: "Tier-1 Procurement & Financing",
    titleBn: "টিয়ার-১ ক্রয় ও অর্থায়ন",
    detailBn: "টিয়ার-১ LONGi ও Trina মডিউল, Growatt / Solis ইনভার্টারে ভলিউম মূল্য, সাথে ব্যাংকের EMI অর্থায়ন ও PPA বিনিয়োগকারী।",
    detail:
      "Unlock volume pricing on Tier-1 LONGi & Trina modules, Growatt / Solis inverters, plus bank EMI financing and PPA investors.",
  },
  {
    title: "End-to-End Execution Support",
    titleBn: "শুরু থেকে শেষ পর্যন্ত বাস্তবায়ন সহায়তা",
    detailBn: "আপনি মানসম্পন্ন ইনস্টলেশনে মনোযোগ দিন; ডিজিটাল কাগজপত্র, গ্রাহক আপডেট ও O&M নবায়ন গ্রিন ঢাকা সহজ করে দেয়।",
    detail:
      "Focus on quality installations while Green Dhaka streamlines digital documentation, customer updates, and O&M renewals.",
  },
];

export const HOMES: Bi<HOMESCopy> = {
  en: {
    h1a: "Go Solar at ", h1b: "Zero Investment",
    sub: "Save up to 90% on your home electricity bills. 20% down EMI — your savings pay the instalment.",
    chips: ["200+ homes powered", "25-year warranty", "Installed in 7 days"],
    stats: [["200+", "Homes powered"], ["150 MW", "Installed"], ["৳250 Cr+", "Customer savings"], ["4.8★", "Average rating"]],
    introPill: "Introducing", introSub: "Our total-protection plan for every rooftop — generation guaranteed, repairs covered, service proactive.",
    guarantee: [
      ["Generation guarantee or ৳8/unit money-back", "If your system under-generates, we pay you the difference — or refund at ৳8 per unit."],
      ["৳0 repair and replacement cost", "Panels, inverter and mounting are covered. You never pay for repairs during the plan."],
      ["Proactive service visits", "We schedule cleaning and maintenance visits before problems appear — you don't have to call."],
      ["App to track real-time power generation", "Watch every unit your roof produces and the taka it saves, live from your phone."],
    ],
    advHeading: "The Green Dhaka Advantage", thead: ["What matters", "Green Dhaka", "Other brands"],
    advantage: [
      ["Savings guarantee", "৳8/unit money-back promise", "No guarantee"],
      ["Mounting structure", "GreenPro Mount™ — 170 kmph storm-tested", "Generic local fabrication"],
      ["Installation team", "In-house certified engineers", "Subcontractors"],
      ["Net-metering paperwork", "End-to-end handled for you", "Do it yourself"],
      ["After-sales", "Proactive scheduled visits", "Only when you call"],
      ["Warranty", "25 years + free annual maintenance", "Panels only"],
    ],
    reviewsHeading: "90% of our customers recommend us", faqHeading: "Frequently Asked Questions",
    faqs: [
      ["Why should I switch to solar?", "Electricity prices keep rising, but sunlight is free. A rooftop solar system cuts your bill by 70–90% for 25+ years and increases your property's value."],
      ["How high does my electricity bill need to be for solar to make sense?", "Most homes with a monthly bill of ৳2,500 or more see a strong return. Use the savings calculator on our homepage to check your exact numbers."],
      ["How much can I actually save with solar?", "Typically 70–90% of your current bill. A 3 kW system in Dhaka generates roughly 360–400 units per month, depending on shading and roof orientation."],
      ["What makes Green Dhaka different from other solar providers?", "We are the only company in Bangladesh offering a Savings Guarantee with a money-back promise, plus storm-proof mounting and fully in-house installation."],
      ["I'm not sure if I have enough space for a solar system.", "One kW needs roughly 100 sq ft of shade-free roof. Most homes in Dhaka can host 3–5 kW. Our free survey confirms exactly what fits."],
      ["Do I need to pay a huge amount upfront?", "No. You pay just 20% upfront, and the monthly EMI on the rest is usually lower than the bill savings from month one."],
      ["How complicated is the net-metering process?", "Not for you — we prepare the drawings, apply to your utility (DESCO/DPDC/REB) and commission the meter as part of the package."],
      ["How long does it take to set up the system?", "Installation takes as little as 7 days after design approval; the full journey including net-metering is typically 2–4 weeks."],
      ["What is the lifespan of a rooftop solar system?", "Panels carry a 25-year performance warranty and keep producing beyond that. Inverters typically last 10–15 years and are covered under our plan."],
      ["Do panels alone guarantee long-term savings?", "No — mounting, wiring and workmanship matter just as much. That's why our guarantee covers the whole system's generation, not just the hardware."],
      ["How will I know how much power my system is generating?", "Through the Green Dhaka app: live generation, savings in taka, and alerts if anything underperforms."],
    ],
    articleH: "Rooftop solar panels for homes in Bangladesh: price, installation and savings",
    article: [
      { h: "What's the cost of home solar panels in Bangladesh?", p: [
        "Indicative pricing including installation: a 3 kW grid-tied system costs roughly ৳2,10,000–৳2,60,000 and a 5 kW system ৳3,50,000–৳4,20,000. The final price depends on your roof, inverter choice and cable runs confirmed during the free survey.",
        "Bangladesh has no upfront cash subsidy for rooftop solar — instead, eligible homes earn through net metering under SREDA policy: every surplus unit you export is credited against your bill by your utility (DESCO, DPDC, NESCO or REB). We handle the entire application.",
      ] },
      { h: "How long does installation take?", p: ["Mounting, panels, inverter and wiring are installed in as little as 7 days after design approval. Net-metering commissioning typically adds 1–2 weeks depending on your utility."] },
      { h: "Savings and ROI over 25 years", p: ["A 3 kW system generating ~4,500 units a year offsets around ৳55,000–৳70,000 of grid electricity annually at current tariffs. With tariff escalation, most homeowners recover their investment in 3–5 years and enjoy essentially free power for the remaining 20+ years."] },
      { h: "On-grid or off-grid for your home?", p: ["City homes with reliable grid supply should choose an on-grid system — lower cost and net-metering income. Homes in areas with frequent load-shedding benefit from off-grid or hybrid with battery backup."] },
    ],
    linkOn: "Read the on-grid solar guide →", linkOff: "Read the off-grid solar guide →",
    ctaTitle: "Start saving from month one", ctaText: "Book a free consultation — our solar expert will survey your roof and design your system.",
  },
  bn: {
    h1a: "শূন্য বিনিয়োগে ", h1b: "সোলারে যান",
    sub: "বাসার বিদ্যুৎ বিল ৯০% পর্যন্ত সাশ্রয় করুন। ২০% ডাউন EMI — আপনার সাশ্রয়েই কিস্তি পরিশোধ হয়।",
    chips: ["২০০+ বাসায় বিদ্যুৎ", "২৫ বছরের ওয়ারেন্টি", "৭ দিনে ইনস্টলেশন"],
    stats: [["200+", "বাসায় বিদ্যুৎ"], ["150 MW", "ইনস্টল করা"], ["৳250 Cr+", "গ্রাহকের সাশ্রয়"], ["4.8★", "গড় রেটিং"]],
    introPill: "পরিচয় করিয়ে দিচ্ছি", introSub: "প্রতিটি ছাদের জন্য আমাদের সম্পূর্ণ সুরক্ষা প্ল্যান — উৎপাদন নিশ্চিত, মেরামত কভার, সার্ভিস আগেভাগেই।",
    guarantee: [
      ["উৎপাদন গ্যারান্টি অথবা ইউনিটপ্রতি ৳8 ফেরত", "সিস্টেম কম উৎপাদন করলে আমরা পার্থক্য পরিশোধ করি — অথবা ইউনিটপ্রতি ৳8 ফেরত দিই।"],
      ["মেরামত ও প্রতিস্থাপনে ৳0 খরচ", "প্যানেল, ইনভার্টার ও মাউন্টিং কভার করা। প্ল্যান চলাকালীন মেরামতের জন্য কোনো টাকা দিতে হয় না।"],
      ["আগেভাগে সার্ভিস ভিজিট", "সমস্যা হওয়ার আগেই আমরা পরিষ্কার ও রক্ষণাবেক্ষণ ভিজিট নির্ধারণ করি — আপনাকে কল করতে হবে না।"],
      ["রিয়েল-টাইম উৎপাদন দেখার অ্যাপ", "ছাদে উৎপাদিত প্রতিটি ইউনিট ও সাশ্রয়ী টাকা ফোনে লাইভ দেখুন।"],
    ],
    advHeading: "গ্রিন ঢাকার সুবিধা", thead: ["যা গুরুত্বপূর্ণ", "গ্রিন ঢাকা", "অন্যান্য ব্র্যান্ড"],
    advantage: [
      ["সাশ্রয় গ্যারান্টি", "ইউনিটপ্রতি ৳8 মানি-ব্যাক প্রতিশ্রুতি", "কোনো গ্যারান্টি নেই"],
      ["মাউন্টিং কাঠামো", "GreenPro Mount™ — ১৭০ কিমি/ঘণ্টা ঝড়ে পরীক্ষিত", "সাধারণ স্থানীয় ফ্যাব্রিকেশন"],
      ["ইনস্টলেশন টিম", "নিজস্ব সার্টিফায়েড প্রকৌশলী", "সাব-কন্ট্রাক্টর"],
      ["নেট-মিটারিং কাগজপত্র", "শুরু থেকে শেষ পর্যন্ত আমরাই করি", "নিজেকেই করতে হয়"],
      ["বিক্রয়োত্তর সেবা", "নির্ধারিত আগাম ভিজিট", "শুধু কল করলে"],
      ["ওয়ারেন্টি", "২৫ বছর + ফ্রি বার্ষিক রক্ষণাবেক্ষণ", "শুধু প্যানেল"],
    ],
    reviewsHeading: "আমাদের ৯০% গ্রাহক আমাদের সুপারিশ করেন", faqHeading: "সাধারণ প্রশ্নোত্তর",
    faqs: [
      ["কেন সোলারে যাব?", "বিদ্যুতের দাম বাড়ছেই, কিন্তু সূর্যের আলো ফ্রি। ছাদের সোলার ২৫+ বছর ধরে বিল ৭০–৯০% কমায় এবং সম্পত্তির মূল্য বাড়ায়।"],
      ["সোলার লাভজনক হতে বিল কত হওয়া দরকার?", "মাসিক বিল ৳2,500 বা তার বেশি হলে বেশিরভাগ বাসা ভালো রিটার্ন পায়। সঠিক হিসাবের জন্য হোমপেজের সাশ্রয় ক্যালকুলেটর ব্যবহার করুন।"],
      ["সোলারে আসলে কত সাশ্রয় হয়?", "সাধারণত বর্তমান বিলের ৭০–৯০%। ঢাকায় ৩ কিলোওয়াট সিস্টেম ছায়া ও ছাদের দিকের উপর নির্ভর করে মাসে প্রায় ৩৬০–৪০০ ইউনিট উৎপাদন করে।"],
      ["অন্য সোলার কোম্পানি থেকে গ্রিন ঢাকা কেন আলাদা?", "বাংলাদেশে শুধু আমরাই মানি-ব্যাক প্রতিশ্রুতিসহ সাশ্রয় গ্যারান্টি দিই, সাথে ঝড়-প্রতিরোধী মাউন্টিং ও সম্পূর্ণ নিজস্ব ইনস্টলেশন।"],
      ["আমার ছাদে যথেষ্ট জায়গা আছে কিনা নিশ্চিত নই।", "প্রতি কিলোওয়াটে প্রায় ১০০ বর্গফুট ছায়ামুক্ত ছাদ লাগে। ঢাকার বেশিরভাগ বাসায় ৩–৫ কিলোওয়াট বসানো যায়। ফ্রি সার্ভেতে ঠিক কত বসবে তা নিশ্চিত হয়।"],
      ["শুরুতে কি অনেক টাকা দিতে হবে?", "না। মাত্র ২০% আগে দিতে হয়, বাকি অংশের মাসিক কিস্তি সাধারণত প্রথম মাস থেকেই বিলের সাশ্রয়ের চেয়ে কম হয়।"],
      ["নেট-মিটারিং প্রক্রিয়া কতটা জটিল?", "আপনার জন্য নয় — ড্রয়িং তৈরি, বিতরণ কর্তৃপক্ষে (DESCO/DPDC/REB) আবেদন ও মিটার চালু সবই প্যাকেজের অংশ।"],
      ["সিস্টেম বসাতে কত সময় লাগে?", "ডিজাইন অনুমোদনের পর মাত্র ৭ দিনে ইনস্টলেশন; নেট-মিটারিংসহ পুরো প্রক্রিয়া সাধারণত ২–৪ সপ্তাহ।"],
      ["ছাদের সোলার সিস্টেম কত দিন চলে?", "প্যানেলে ২৫ বছরের পারফরম্যান্স ওয়ারেন্টি, এর পরেও উৎপাদন চলে। ইনভার্টার সাধারণত ১০–১৫ বছর চলে এবং আমাদের প্ল্যানে কভার।"],
      ["শুধু প্যানেলই কি দীর্ঘমেয়াদি সাশ্রয় নিশ্চিত করে?", "না — মাউন্টিং, ওয়্যারিং ও কাজের মানও সমান গুরুত্বপূর্ণ। তাই আমাদের গ্যারান্টি পুরো সিস্টেমের উৎপাদন কভার করে।"],
      ["সিস্টেম কত বিদ্যুৎ উৎপাদন করছে কীভাবে জানব?", "গ্রিন ঢাকা অ্যাপে: লাইভ উৎপাদন, টাকায় সাশ্রয়, এবং কম উৎপাদন হলে সতর্কবার্তা।"],
    ],
    articleH: "বাংলাদেশে বাসার ছাদে সোলার প্যানেল: মূল্য, ইনস্টলেশন ও সাশ্রয়",
    article: [
      { h: "বাংলাদেশে বাসার সোলার প্যানেলের খরচ কত?", p: [
        "ইনস্টলেশনসহ আনুমানিক মূল্য: ৩ কিলোওয়াট গ্রিড-টায়েড সিস্টেম প্রায় ৳2,10,000–৳2,60,000 এবং ৫ কিলোওয়াট ৳3,50,000–৳4,20,000। চূড়ান্ত মূল্য ছাদ, ইনভার্টার ও কেবলের দৈর্ঘ্যের উপর নির্ভর করে, যা ফ্রি সার্ভেতে নিশ্চিত হয়।",
        "বাংলাদেশে ছাদের সোলারে নগদ ভর্তুকি নেই — বরং SREDA নীতিমালায় নেট মিটারিংয়ে উপযুক্ত বাসা আয় করে: রপ্তানি করা প্রতিটি বাড়তি ইউনিট আপনার বিতরণ কর্তৃপক্ষ (DESCO, DPDC, NESCO বা REB) বিলের সাথে সমন্বয় করে। পুরো আবেদন আমরাই করি।",
      ] },
      { h: "ইনস্টলেশনে কত সময় লাগে?", p: ["ডিজাইন অনুমোদনের পর মাত্র ৭ দিনে মাউন্টিং, প্যানেল, ইনভার্টার ও ওয়্যারিং বসানো হয়। বিতরণ কর্তৃপক্ষভেদে নেট-মিটারিং চালু করতে আরও ১–২ সপ্তাহ লাগে।"] },
      { h: "২৫ বছরে সাশ্রয় ও রিটার্ন", p: ["বছরে ~৪,৫০০ ইউনিট উৎপাদনকারী ৩ কিলোওয়াট সিস্টেম বর্তমান ট্যারিফে বছরে প্রায় ৳55,000–৳70,000 গ্রিড বিদ্যুতের খরচ বাঁচায়। ট্যারিফ বাড়ার সাথে বেশিরভাগ মালিক ৩–৫ বছরে বিনিয়োগ উঠিয়ে বাকি ২০+ বছর কার্যত ফ্রি বিদ্যুৎ পান।"] },
      { h: "আপনার বাসার জন্য অন-গ্রিড না অফ-গ্রিড?", p: ["নির্ভরযোগ্য গ্রিডের শহরের বাসার জন্য অন-গ্রিড সেরা — কম খরচ ও নেট-মিটারিং আয়। ঘন ঘন লোডশেডিংয়ের এলাকায় ব্যাটারি ব্যাকআপসহ অফ-গ্রিড বা হাইব্রিড উপকারী।"] },
    ],
    linkOn: "অন-গ্রিড সোলার গাইড পড়ুন →", linkOff: "অফ-গ্রিড সোলার গাইড পড়ুন →",
    ctaTitle: "প্রথম মাস থেকেই সাশ্রয় শুরু করুন", ctaText: "ফ্রি পরামর্শ বুক করুন — আমাদের সোলার বিশেষজ্ঞ আপনার ছাদ সার্ভে করে সিস্টেম ডিজাইন করবেন।",
  },
};

export const SOCIETIES: Bi<SOCIETIESCopy> = {
  en: {
    h1: "Slash your society's electricity bills by up to ",
    sub: "Solar for lifts, pumps, parking and common lighting — with long-term value for every resident.",
    chips: ["350+ societies powered", "Payback in 3–4 years", "25+ year systems"],
    stats: [["350+", "Societies powered"], ["60+ MW", "Society rooftops"], ["৳90 Cr+", "Common-area savings"], ["25+ yrs", "System life"]],
    whyHeading: "Trusted Across Bangladesh — Why Choose Green Dhaka",
    why: [
      ["Quality that lasts more than 25+ years", "Tier-1 panels, certified inverters and the GreenPro Mount™ — engineered for decades of monsoons."],
      ["End-to-end management", "Survey, AGM-ready proposal, installation, net metering and maintenance — one partner, zero middlemen."],
      ["Guaranteed savings", "Our Savings Guarantee with a money-back promise protects the committee's investment."],
    ],
    band: [
      ["Guaranteed savings with a money-back promise", "Generation is guaranteed under GreenSure™ — if the system under-delivers, we refund at ৳8 per unit."],
      ["Save more with net metering", "Under SREDA policy your society earns credits for surplus units exported to DESCO, DPDC, NESCO or REB."],
      ["Financing options, tailored for you", "Reserve fund, per-flat contribution or bank EMI — including 20% down plans sized to the society's cash flow."],
    ],
    beHeading: "When will you break even?", beSub: "Example: a typical mid-size Dhaka society",
    breakEven: [["50 kW", "Recommended system"], ["≈ ৳39,00,000", "System cost (indicative)"], ["≈ ৳13 lakh / yr", "Bill savings"], ["~3 years", "Break-even"], ["৳3.2 Cr+", "25-year savings"], ["100 kW+", "Hosted by many societies"]],
    caseLabel: "Case study", caseName: "Baridhara Green Residency, Dhaka",
    caseStudy: [["System", "100 kW grid-tied, net metered"], ["Commissioned", "March 2025"], ["System cost", "৳78,00,000"], ["Yearly saving", "≈ ৳26 lakh on common-area bills"], ["Payback", "Just 3 years"]],
    safetyHeading: "Your safety, our obsession", safetySub: "State-of-the-art safety measures during and after installation.",
    safety: ["GreenPro Mount™ (170 kmph storm-tested)", "TÜV-certified modules", "IEC-certified inverters", "Insured, in-house installation crews"],
    faqHeading: "Frequently Asked Questions",
    faqs: [
      ["How much can our society save with solar?", "Societies typically cut common-area bills (lifts, pumps, parking and staircase lighting) by 70–90%. A 50 kW system in Dhaka generates roughly 6,000–6,600 units per month."],
      ["Is there a government subsidy for housing societies?", "Bangladesh doesn't offer an upfront subsidy, but societies benefit from net metering under SREDA policy — surplus units are credited by your utility (DESCO, DPDC, NESCO or REB), directly reducing the society's bill."],
      ["Does our society need AGM approval to install solar?", "Most societies pass a resolution at an AGM or executive committee meeting. We prepare a complete proposal with savings, payback and financing options that your committee can present directly."],
      ["What is the typical payback period for a solar system?", "For common-area loads, most societies break even in 3–4 years, then enjoy essentially free power for the remaining life of the system."],
      ["What happens if solar generation is lower than expected?", "Our GreenSure™ guarantee pays the difference — generation is guaranteed, backed by a money-back promise at ৳8 per unit."],
      ["How much rooftop space is needed for a solar installation?", "Roughly 100 sq ft per kW of shade-free roof. A 50 kW system needs about 5,000 sq ft — many Dhaka societies host 100 kW or more."],
      ["What are the financing options available?", "Society reserve fund, per-flat contribution, or bank EMI. We help structure the option your committee prefers, including 20% down plans."],
      ["What maintenance does a solar system require?", "Periodic panel cleaning and annual electrical checks. Our plans include scheduled proactive maintenance visits at no extra cost."],
      ["Which solar panel is best for residential societies?", "Tier-1 mono PERC modules with a 25-year performance warranty — highest yield per square foot in Bangladesh's climate and heat."],
      ["How do we ensure the safety and longevity of the installation?", "Storm-proof mounting tested to 170 kmph, TÜV-certified modules, IEC-certified inverters and insured workmanship by in-house engineers."],
    ],
    articleH: "Residential solar power systems for apartments and housing societies in Bangladesh",
    costH: "What's the cost of rooftop solar for housing societies?",
    costP: "Society-scale systems cost less per kW than home systems thanks to economies of scale — indicatively ৳7,000–8,500 per kW installed, before net-metering benefits. A 50 kW system typically lands between ৳35,00,000 and ৳42,00,000.",
    nmH: "How net metering works for societies",
    nmP: "The society's rooftop system is connected behind its utility meter. Generation first powers lifts, pumps and common lighting; surplus units are exported and credited under SREDA's net-metering guidelines. Green Dhaka prepares and files the entire application with your utility.",
    processH: "The process",
    process: ["Free rooftop survey and shadow analysis", "AGM-ready proposal with savings and payback", "Committee resolution and financing setup", "Installation by in-house engineers in 3–6 weeks", "Net-metering commissioning and 25-year maintenance"],
    ctaTitle: "Book a FREE visit for your society", ctaText: "Our society desk will present the savings case to your committee — free of charge.",
  },
  bn: {
    h1: "আপনার সোসাইটির বিদ্যুৎ বিল কমান সর্বোচ্চ ",
    sub: "লিফট, পাম্প, পার্কিং ও কমন লাইটের জন্য সোলার — প্রত্যেক বাসিন্দার জন্য দীর্ঘমেয়াদি মূল্য।",
    chips: ["৩৫০+ সোসাইটিতে বিদ্যুৎ", "৩–৪ বছরে বিনিয়োগ উদ্ধার", "২৫+ বছরের সিস্টেম"],
    stats: [["350+", "সোসাইটিতে বিদ্যুৎ"], ["60+ MW", "সোসাইটির ছাদে"], ["৳90 Cr+", "কমন-এলাকায় সাশ্রয়"], ["25+ yrs", "সিস্টেমের আয়ু"]],
    whyHeading: "সারা বাংলাদেশে আস্থার নাম — কেন গ্রিন ঢাকা",
    why: [
      ["২৫+ বছর টিকে থাকা মান", "টিয়ার-১ প্যানেল, সার্টিফায়েড ইনভার্টার ও GreenPro Mount™ — দশকের পর দশক বর্ষা সামলাতে তৈরি।"],
      ["শুরু থেকে শেষ পর্যন্ত ব্যবস্থাপনা", "সার্ভে, AGM-উপযোগী প্রস্তাবনা, ইনস্টলেশন, নেট মিটারিং ও রক্ষণাবেক্ষণ — একজন অংশীদার, কোনো দালাল নেই।"],
      ["নিশ্চিত সাশ্রয়", "মানি-ব্যাক প্রতিশ্রুতিসহ আমাদের সাশ্রয় গ্যারান্টি কমিটির বিনিয়োগ সুরক্ষিত রাখে।"],
    ],
    band: [
      ["মানি-ব্যাক প্রতিশ্রুতিসহ নিশ্চিত সাশ্রয়", "GreenSure™-এর অধীনে উৎপাদন নিশ্চিত — সিস্টেম কম দিলে ইউনিটপ্রতি ৳8 ফেরত দিই।"],
      ["নেট মিটারিংয়ে আরও সাশ্রয়", "SREDA নীতিমালায় DESCO, DPDC, NESCO বা REB-তে রপ্তানি করা বাড়তি ইউনিটে সোসাইটি ক্রেডিট পায়।"],
      ["আপনার মতো করে ফাইন্যান্সিং", "রিজার্ভ ফান্ড, ফ্ল্যাটপ্রতি চাঁদা বা ব্যাংক EMI — সোসাইটির নগদ প্রবাহ অনুযায়ী ২০% ডাউন প্ল্যানসহ।"],
    ],
    beHeading: "কবে বিনিয়োগ উঠে আসবে?", beSub: "উদাহরণ: ঢাকার একটি মাঝারি আকারের সোসাইটি",
    breakEven: [["50 kW", "সুপারিশকৃত সিস্টেম"], ["≈ ৳39,00,000", "সিস্টেমের খরচ (আনুমানিক)"], ["≈ ৳13 লাখ / বছর", "বিলে সাশ্রয়"], ["~৩ বছর", "বিনিয়োগ উদ্ধার"], ["৳3.2 Cr+", "২৫ বছরের সাশ্রয়"], ["100 kW+", "অনেক সোসাইটিতে বসানো"]],
    caseLabel: "কেস স্টাডি", caseName: "বারিধারা গ্রিন রেসিডেন্সি, ঢাকা",
    caseStudy: [["সিস্টেম", "১০০ কিলোওয়াট গ্রিড-টায়েড, নেট মিটারড"], ["চালু হয়েছে", "মার্চ ২০২৫"], ["সিস্টেমের খরচ", "৳78,00,000"], ["বার্ষিক সাশ্রয়", "কমন-এলাকার বিলে ≈ ৳26 লাখ"], ["বিনিয়োগ উদ্ধার", "মাত্র ৩ বছর"]],
    safetyHeading: "আপনার নিরাপত্তাই আমাদের প্রথম ভাবনা", safetySub: "ইনস্টলেশনের সময় ও পরে অত্যাধুনিক নিরাপত্তা ব্যবস্থা।",
    safety: ["GreenPro Mount™ (১৭০ কিমি/ঘণ্টা ঝড়ে পরীক্ষিত)", "TÜV-সার্টিফায়েড মডিউল", "IEC-সার্টিফায়েড ইনভার্টার", "বিমাকৃত, নিজস্ব ইনস্টলেশন টিম"],
    faqHeading: "সাধারণ প্রশ্নোত্তর",
    faqs: [
      ["সোলারে আমাদের সোসাইটি কত সাশ্রয় করতে পারে?", "সোসাইটিগুলো সাধারণত কমন-এলাকার বিল (লিফট, পাম্প, পার্কিং ও সিঁড়ির লাইট) ৭০–৯০% কমায়। ঢাকায় ৫০ কিলোওয়াট সিস্টেম মাসে প্রায় ৬,০০০–৬,৬০০ ইউনিট উৎপাদন করে।"],
      ["হাউজিং সোসাইটির জন্য কি সরকারি ভর্তুকি আছে?", "বাংলাদেশে নগদ ভর্তুকি নেই, তবে SREDA নীতিমালায় নেট মিটারিংয়ের সুবিধা আছে — বাড়তি ইউনিট বিতরণ কর্তৃপক্ষ (DESCO, DPDC, NESCO বা REB) ক্রেডিট দেয়, যা সরাসরি সোসাইটির বিল কমায়।"],
      ["সোলার বসাতে কি AGM অনুমোদন লাগে?", "বেশিরভাগ সোসাইটি AGM বা কার্যনির্বাহী কমিটির সভায় সিদ্ধান্ত নেয়। সাশ্রয়, বিনিয়োগ উদ্ধার ও ফাইন্যান্সিংসহ পূর্ণাঙ্গ প্রস্তাবনা আমরা তৈরি করে দিই, যা কমিটি সরাসরি উপস্থাপন করতে পারে।"],
      ["সাধারণত কত বছরে বিনিয়োগ উঠে আসে?", "কমন-এলাকার লোডে বেশিরভাগ সোসাইটি ৩–৪ বছরে বিনিয়োগ উঠিয়ে আনে, এরপর সিস্টেমের বাকি আয়ুতে কার্যত ফ্রি বিদ্যুৎ।"],
      ["প্রত্যাশার চেয়ে কম উৎপাদন হলে কী হবে?", "আমাদের GreenSure™ গ্যারান্টি পার্থক্য পরিশোধ করে — উৎপাদন নিশ্চিত, ইউনিটপ্রতি ৳8 মানি-ব্যাক প্রতিশ্রুতিসহ।"],
      ["সোলার বসাতে ছাদে কত জায়গা লাগে?", "প্রতি কিলোওয়াটে প্রায় ১০০ বর্গফুট ছায়ামুক্ত ছাদ। ৫০ কিলোওয়াটে প্রায় ৫,০০০ বর্গফুট — ঢাকার অনেক সোসাইটিতে ১০০ কিলোওয়াট বা তার বেশি বসানো যায়।"],
      ["কী কী ফাইন্যান্সিং অপশন আছে?", "সোসাইটির রিজার্ভ ফান্ড, ফ্ল্যাটপ্রতি চাঁদা বা ব্যাংক EMI। কমিটি যেটি চায়, ২০% ডাউন প্ল্যানসহ আমরা সেটি সাজিয়ে দিই।"],
      ["সোলার সিস্টেমে কী রক্ষণাবেক্ষণ লাগে?", "মাঝে মাঝে প্যানেল পরিষ্কার ও বার্ষিক বৈদ্যুতিক পরীক্ষা। আমাদের প্ল্যানে বাড়তি খরচ ছাড়াই নির্ধারিত রক্ষণাবেক্ষণ ভিজিট অন্তর্ভুক্ত।"],
      ["আবাসিক সোসাইটির জন্য কোন প্যানেল সেরা?", "২৫ বছরের পারফরম্যান্স ওয়ারেন্টিসহ টিয়ার-১ মনো PERC মডিউল — বাংলাদেশের আবহাওয়া ও তাপে প্রতি বর্গফুটে সর্বোচ্চ উৎপাদন।"],
      ["ইনস্টলেশনের নিরাপত্তা ও দীর্ঘস্থায়িত্ব কীভাবে নিশ্চিত হয়?", "১৭০ কিমি/ঘণ্টায় পরীক্ষিত ঝড়-প্রতিরোধী মাউন্টিং, TÜV-সার্টিফায়েড মডিউল, IEC-সার্টিফায়েড ইনভার্টার এবং নিজস্ব প্রকৌশলীদের বিমাকৃত কাজ।"],
    ],
    articleH: "বাংলাদেশে অ্যাপার্টমেন্ট ও হাউজিং সোসাইটির জন্য আবাসিক সোলার সিস্টেম",
    costH: "হাউজিং সোসাইটির ছাদের সোলারে খরচ কত?",
    costP: "বড় পরিসরের কারণে সোসাইটির সিস্টেমে প্রতি কিলোওয়াট খরচ বাসার চেয়ে কম — নেট-মিটারিং সুবিধার আগে আনুমানিক ৳7,000–8,500 প্রতি কিলোওয়াট। ৫০ কিলোওয়াট সিস্টেম সাধারণত ৳35,00,000 থেকে ৳42,00,000-এর মধ্যে।",
    nmH: "সোসাইটির জন্য নেট মিটারিং কীভাবে কাজ করে",
    nmP: "সোসাইটির ছাদের সিস্টেম বিদ্যুৎ মিটারের পেছনে সংযুক্ত থাকে। উৎপাদিত বিদ্যুৎ প্রথমে লিফট, পাম্প ও কমন লাইট চালায়; বাড়তি ইউনিট রপ্তানি হয় এবং SREDA নির্দেশিকায় ক্রেডিট পায়। পুরো আবেদন গ্রিন ঢাকা তৈরি ও জমা দেয়।",
    processH: "প্রক্রিয়া",
    process: ["ফ্রি ছাদ সার্ভে ও ছায়া বিশ্লেষণ", "সাশ্রয় ও বিনিয়োগ উদ্ধারসহ AGM-উপযোগী প্রস্তাবনা", "কমিটির সিদ্ধান্ত ও ফাইন্যান্সিং সেটআপ", "নিজস্ব প্রকৌশলীদের মাধ্যমে ৩–৬ সপ্তাহে ইনস্টলেশন", "নেট-মিটারিং চালু ও ২৫ বছরের রক্ষণাবেক্ষণ"],
    ctaTitle: "আপনার সোসাইটির জন্য ফ্রি ভিজিট বুক করুন", ctaText: "আমাদের সোসাইটি ডেস্ক বিনামূল্যে আপনার কমিটির সামনে সাশ্রয়ের হিসাব উপস্থাপন করবে।",
  },
};

export const COMMERCIAL: Bi<COMMERCIALCopy> = {
  en: {
    h1: "Bangladesh's top companies choose ",
    sub: "Power your business with green energy and save on costs — payback in as little as 3 years.",
    chips: ["500+ projects delivered", "85+ MWp installed", "End-to-end EPC"],
    stats: [["500+", "Projects delivered"], ["85+ MWp", "Installed capacity"], ["৳210 Cr+", "Client savings"], ["3.4 yrs", "Average payback"]],
    featHeading: "Hassle-free, professional and friendly installation experience",
    featSub: "We are committed to making your solar journey easy.",
    features: [
      ["Best price challenge", "Find a lower quote for the same Tier-1 specification and we'll beat it — quality never compromised."],
      ["Great solar starts with precision designs", "3D modelling, shadow analysis and bankable yield reports before a single panel is ordered."],
      ["End-to-end EPC service", "Design, procurement, installation, net-metering/licensing and long-term O&M — one accountable partner."],
    ],
    caseHeading: "Exceptional quality. End-to-end service. Delighted customers.",
    caseLabels: ["System", "Investment", "Savings", "Payback"],
    cases: [
      { n: "RMG factory, Gazipur", kw: "750 kW", capex: "৳5.8 Cr", save: "৳1.9 Cr / yr", payback: "~3.1 years" },
      { n: "Cold storage, Rajshahi", kw: "250 kW", capex: "৳2.0 Cr", save: "৳62 lakh / yr", payback: "~3.3 years" },
      { n: "Shopping complex, Dhanmondi", kw: "400 kW", capex: "৳3.1 Cr", save: "৳98 lakh / yr", payback: "~3.2 years" },
    ],
    caseNote: "Indicative figures for representative projects. Ask us for a detailed proposal for your site.",
    typesHeading: "What are the types of commercial photovoltaic systems?",
    types: [
      ["On-grid commercial systems", "The most common choice: grid-tied with net metering so every surplus unit earns credits against your utility bill."],
      ["Off-grid commercial plants", "Independent generation with battery storage for remote sites or critical loads where the grid is unreliable."],
      ["Hybrid commercial plants", "Grid-tied plus battery backup — keep production and cold chains running through outages while still earning net-metering credits."],
    ],
    benefitsHeading: "What are the benefits of commercial solar electric systems?",
    benefits: ["Cut operating costs by up to 90% on daytime power", "Hedge against electricity tariff escalation", "Meet buyer & LEED sustainability requirements", "Predictable energy costs for 25+ years", "Improved ESG and green factory credentials", "Low-risk: guaranteed generation under GreenSure™"],
    faqHeading: "Frequently Asked Questions",
    faqs: [
      ["What is a commercial solar panel?", "The same high-efficiency PV technology as residential panels, deployed at scale on factory, warehouse and mall rooftops — typically in strings feeding commercial inverters sized 50 kW to multiple MW."],
      ["Which solar panel is best for commercial use?", "Tier-1 mono PERC or TOPCon modules with a 25-year performance warranty. At commercial scale, yield per square foot and bankability of the manufacturer matter most."],
      ["What is the cost of commercial solar panels in Bangladesh?", "Indicatively ৳6,500–8,000 per kW installed for grid-tied systems, depending on roof type, height and cable runs. Larger systems cost less per kW."],
      ["How many solar panels are needed for a commercial system?", "Roughly 2.2–2.5 panels per kW. A 100 kW system uses about 230–250 panels and needs around 10,000 sq ft of shade-free roof."],
      ["What is the payback period for commercial solar in Bangladesh?", "Most commercial and industrial systems pay back in 3–4 years at current tariffs — then deliver essentially free power for 20+ years."],
      ["What approvals and paperwork are required?", "Net-metering or captive-power approval from your utility and, for larger plants, SREDA registration. Green Dhaka handles the entire process as part of the EPC scope."],
      ["Can solar run our factory during load-shedding?", "A standard on-grid system shuts down during outages for safety. Hybrid systems with battery or genset integration keep critical lines and cold storage running."],
    ],
    articleH: "Commercial solar panels and rooftop systems for businesses and industries in Bangladesh",
    article: [
      ["What is the commercial solar installation cost in Bangladesh in 2026?", "Grid-tied commercial rooftop systems run indicatively ৳6,500–8,000 per kW installed — a 500 kW system around ৳3.3–4.0 Cr. Cost per kW falls as system size grows. Rooftop type (RCC vs tin shed), building height and evacuation distance move the number most."],
      ["On-grid, off-grid or hybrid?", "Factories with daytime loads and reliable grid access choose on-grid with net metering. Sites with critical loads — cold chains, data rooms, continuous production — add hybrid battery or genset integration. We size the mix from your load profile, collected during the free energy audit."],
      ["Why choose Green Dhaka for commercial rooftop solar?", "In-house EPC teams (no subcontractors), bankable yield reports, storm-proof mounting tested to 170 kmph, guaranteed generation under GreenSure™, and full utility approval handling — from net metering to SREDA registration."],
    ],
    ctaTitle: "Talk to a solar expert", ctaText: "Get a free energy audit and a bankable proposal for your facility within one week.", ctaButton: "Submit a project enquiry",
  },
  bn: {
    h1: "বাংলাদেশের শীর্ষ প্রতিষ্ঠানগুলো বেছে নেয় ",
    sub: "সবুজ শক্তিতে ব্যবসা চালান, খরচ বাঁচান — মাত্র ৩ বছরেই বিনিয়োগ উদ্ধার।",
    chips: ["৫০০+ প্রকল্প সম্পন্ন", "৮৫+ মেগাওয়াট-পিক ইনস্টল", "সম্পূর্ণ EPC সেবা"],
    stats: [["500+", "প্রকল্প সম্পন্ন"], ["85+ MWp", "ইনস্টলড ক্ষমতা"], ["৳210 Cr+", "গ্রাহকের সাশ্রয়"], ["3.4 yrs", "গড় বিনিয়োগ উদ্ধার"]],
    featHeading: "ঝামেলাহীন, পেশাদার ও আন্তরিক ইনস্টলেশন অভিজ্ঞতা",
    featSub: "আপনার সোলার যাত্রা সহজ করতে আমরা প্রতিশ্রুতিবদ্ধ।",
    features: [
      ["সেরা মূল্যের চ্যালেঞ্জ", "একই টিয়ার-১ স্পেসিফিকেশনে কম কোটেশন পেলে আমরা তার চেয়েও কম দেব — মানে কোনো আপস নয়।"],
      ["নিখুঁত ডিজাইনেই ভালো সোলারের শুরু", "একটি প্যানেল অর্ডারের আগেই 3D মডেলিং, ছায়া বিশ্লেষণ ও ব্যাংকযোগ্য উৎপাদন রিপোর্ট।"],
      ["সম্পূর্ণ EPC সেবা", "ডিজাইন, ক্রয়, ইনস্টলেশন, নেট-মিটারিং/লাইসেন্সিং ও দীর্ঘমেয়াদি O&M — একজন দায়বদ্ধ অংশীদার।"],
    ],
    caseHeading: "অসাধারণ মান। সম্পূর্ণ সেবা। সন্তুষ্ট গ্রাহক।",
    caseLabels: ["সিস্টেম", "বিনিয়োগ", "সাশ্রয়", "বিনিয়োগ উদ্ধার"],
    cases: [
      { n: "আরএমজি কারখানা, গাজীপুর", kw: "750 kW", capex: "৳5.8 Cr", save: "৳1.9 Cr / বছর", payback: "~৩.১ বছর" },
      { n: "কোল্ড স্টোরেজ, রাজশাহী", kw: "250 kW", capex: "৳2.0 Cr", save: "৳62 লাখ / বছর", payback: "~৩.৩ বছর" },
      { n: "শপিং কমপ্লেক্স, ধানমন্ডি", kw: "400 kW", capex: "৳3.1 Cr", save: "৳98 লাখ / বছর", payback: "~৩.২ বছর" },
    ],
    caseNote: "প্রতিনিধিত্বমূলক প্রকল্পের আনুমানিক তথ্য। আপনার সাইটের বিস্তারিত প্রস্তাবনার জন্য আমাদের জিজ্ঞাসা করুন।",
    typesHeading: "বাণিজ্যিক ফটোভোলটাইক সিস্টেম কত ধরনের?",
    types: [
      ["অন-গ্রিড বাণিজ্যিক সিস্টেম", "সবচেয়ে প্রচলিত: নেট মিটারিংসহ গ্রিড-সংযুক্ত, তাই প্রতিটি বাড়তি ইউনিট বিদ্যুৎ বিলে ক্রেডিট আনে।"],
      ["অফ-গ্রিড বাণিজ্যিক প্ল্যান্ট", "প্রত্যন্ত সাইট বা গুরুত্বপূর্ণ লোডের জন্য ব্যাটারিসহ স্বাধীন উৎপাদন, যেখানে গ্রিড অনির্ভরযোগ্য।"],
      ["হাইব্রিড বাণিজ্যিক প্ল্যান্ট", "গ্রিড-সংযুক্ত সাথে ব্যাটারি ব্যাকআপ — লোডশেডিংয়েও উৎপাদন ও কোল্ড চেইন চালু, আবার নেট-মিটারিং ক্রেডিটও।"],
    ],
    benefitsHeading: "বাণিজ্যিক সোলার সিস্টেমের সুবিধা কী?",
    benefits: ["দিনের বিদ্যুতে পরিচালন খরচ ৯০% পর্যন্ত কমান", "বিদ্যুতের দাম বাড়ার ঝুঁকি থেকে সুরক্ষা", "ক্রেতা ও LEED টেকসই মানদণ্ড পূরণ", "২৫+ বছর অনুমানযোগ্য বিদ্যুৎ খরচ", "উন্নত ESG ও গ্রিন ফ্যাক্টরি পরিচিতি", "কম ঝুঁকি: GreenSure™-এ নিশ্চিত উৎপাদন"],
    faqHeading: "সাধারণ প্রশ্নোত্তর",
    faqs: [
      ["বাণিজ্যিক সোলার প্যানেল কী?", "আবাসিক প্যানেলের মতোই উচ্চ-দক্ষতার PV প্রযুক্তি, তবে কারখানা, গুদাম ও মলের ছাদে বড় পরিসরে বসানো — সাধারণত ৫০ কিলোওয়াট থেকে কয়েক মেগাওয়াটের বাণিজ্যিক ইনভার্টারে সংযুক্ত।"],
      ["বাণিজ্যিক ব্যবহারে কোন প্যানেল সেরা?", "২৫ বছরের পারফরম্যান্স ওয়ারেন্টিসহ টিয়ার-১ মনো PERC বা TOPCon মডিউল। বাণিজ্যিক পরিসরে প্রতি বর্গফুটে উৎপাদন ও নির্মাতার ব্যাংকযোগ্যতাই সবচেয়ে গুরুত্বপূর্ণ।"],
      ["বাংলাদেশে বাণিজ্যিক সোলারের খরচ কত?", "গ্রিড-টায়েড সিস্টেমে ছাদের ধরন, উচ্চতা ও কেবলের দৈর্ঘ্যভেদে আনুমানিক ৳6,500–8,000 প্রতি কিলোওয়াট। বড় সিস্টেমে প্রতি কিলোওয়াট খরচ কম।"],
      ["বাণিজ্যিক সিস্টেমে কতগুলো প্যানেল লাগে?", "প্রতি কিলোওয়াটে প্রায় ২.২–২.৫টি প্যানেল। ১০০ কিলোওয়াটে প্রায় ২৩০–২৫০টি প্যানেল এবং প্রায় ১০,০০০ বর্গফুট ছায়ামুক্ত ছাদ লাগে।"],
      ["বাংলাদেশে বাণিজ্যিক সোলারে কত বছরে বিনিয়োগ উঠে আসে?", "বর্তমান ট্যারিফে বেশিরভাগ বাণিজ্যিক ও শিল্প সিস্টেম ৩–৪ বছরে বিনিয়োগ উঠিয়ে আনে — এরপর ২০+ বছর কার্যত ফ্রি বিদ্যুৎ।"],
      ["কী কী অনুমোদন ও কাগজপত্র লাগে?", "বিতরণ কর্তৃপক্ষ থেকে নেট-মিটারিং বা ক্যাপটিভ-পাওয়ার অনুমোদন এবং বড় প্ল্যান্টের জন্য SREDA নিবন্ধন। EPC-র অংশ হিসেবে পুরো প্রক্রিয়া গ্রিন ঢাকা সামলায়।"],
      ["লোডশেডিংয়ে কি সোলারে কারখানা চলবে?", "সাধারণ অন-গ্রিড সিস্টেম নিরাপত্তার জন্য লোডশেডিংয়ে বন্ধ হয়। ব্যাটারি বা জেনসেট সংযুক্ত হাইব্রিড সিস্টেম গুরুত্বপূর্ণ লাইন ও কোল্ড স্টোরেজ চালু রাখে।"],
    ],
    articleH: "বাংলাদেশের ব্যবসা ও শিল্পের জন্য বাণিজ্যিক সোলার প্যানেল ও ছাদের সিস্টেম",
    article: [
      ["২০২৬ সালে বাংলাদেশে বাণিজ্যিক সোলার ইনস্টলেশনের খরচ কত?", "গ্রিড-টায়েড বাণিজ্যিক ছাদের সিস্টেমে আনুমানিক ৳6,500–8,000 প্রতি কিলোওয়াট — ৫০০ কিলোওয়াটে প্রায় ৳3.3–4.0 কোটি। সিস্টেম যত বড়, প্রতি কিলোওয়াট খরচ তত কম। ছাদের ধরন (RCC বনাম টিনশেড), ভবনের উচ্চতা ও সংযোগ দূরত্ব খরচে সবচেয়ে বেশি প্রভাব ফেলে।"],
      ["অন-গ্রিড, অফ-গ্রিড না হাইব্রিড?", "দিনের লোড ও নির্ভরযোগ্য গ্রিডের কারখানা নেট মিটারিংসহ অন-গ্রিড বেছে নেয়। কোল্ড চেইন, ডেটা রুম বা অবিরাম উৎপাদনের মতো গুরুত্বপূর্ণ লোডের সাইটে হাইব্রিড ব্যাটারি বা জেনসেট যুক্ত হয়। ফ্রি এনার্জি অডিটে সংগৃহীত লোড প্রোফাইল থেকে আমরা সঠিক মিশ্রণ ঠিক করি।"],
      ["বাণিজ্যিক ছাদের সোলারে কেন গ্রিন ঢাকা?", "নিজস্ব EPC টিম (কোনো সাব-কন্ট্রাক্টর নেই), ব্যাংকযোগ্য উৎপাদন রিপোর্ট, ১৭০ কিমি/ঘণ্টায় পরীক্ষিত ঝড়-প্রতিরোধী মাউন্টিং, GreenSure™-এ নিশ্চিত উৎপাদন এবং নেট মিটারিং থেকে SREDA নিবন্ধন পর্যন্ত সব অনুমোদন সামলানো।"],
    ],
    ctaTitle: "সোলার বিশেষজ্ঞের সাথে কথা বলুন", ctaText: "এক সপ্তাহের মধ্যে আপনার প্রতিষ্ঠানের জন্য ফ্রি এনার্জি অডিট ও ব্যাংকযোগ্য প্রস্তাবনা নিন।", ctaButton: "প্রকল্পের অনুসন্ধান জমা দিন",
  },
};

type Review = { n: string; q: string };

export const REVIEWS: Bi<Review[]> = {
  en: [
    { n: "Rahim U., Dhaka", q: "Our bill went from ৳8,000 to under ৳900. Installation was spotless and on time." },
    { n: "Nusrat H., Chattogram", q: "They took care of everything including the net-metering application. The app is genuinely useful." },
    { n: "Tanvir K., Sylhet", q: "Professional team from survey to commissioning. Highly recommend." },
  ],
  bn: [
    { n: "রহিম উ., ঢাকা", q: "আমাদের বিল ৳8,000 থেকে ৳900-এর নিচে নেমে এসেছে। ইনস্টলেশন ছিল নিখুঁত ও সময়মতো।" },
    { n: "নুসরাত হ., চট্টগ্রাম", q: "নেট-মিটারিং আবেদনসহ সবকিছু তারা নিজেরাই সামলেছে। অ্যাপটি সত্যিই কাজের।" },
    { n: "তানভীর ক., সিলেট", q: "সার্ভে থেকে চালু পর্যন্ত পেশাদার টিম। আমি সবাইকে সুপারিশ করি।" },
  ],
};

type LeadFormCopy = {
  title: string;
  thanks: string;
  placeholders: string[];
  legend: string;
  bills: string[];
  submit: string;
  note: string;
};

export const CONSULTATION_FORM: Bi<LeadFormCopy> = {
  en: {
    title: "Book a FREE consultation",
    thanks: "Thanks! Our solar expert will call you shortly.",
    placeholders: ["Full name", "WhatsApp number", "District / Area"],
    legend: "Monthly electricity bill",
    bills: ["Less than ৳1,500", "৳1,500 – ৳2,500", "৳2,500 – ৳4,000", "৳4,000 – ৳8,000", "More than ৳8,000"],
    submit: "Book a FREE consultation",
    note: "Limited survey slots this week",
  },
  bn: {
    title: "ফ্রি পরামর্শ বুক করুন",
    thanks: "ধন্যবাদ! আমাদের সোলার বিশেষজ্ঞ শীঘ্রই আপনাকে কল করবেন।",
    placeholders: ["পুরো নাম", "হোয়াটসঅ্যাপ নম্বর", "জেলা / এলাকা"],
    legend: "মাসিক বিদ্যুৎ বিল",
    bills: ["৳1,500-এর কম", "৳1,500 – ৳2,500", "৳2,500 – ৳4,000", "৳4,000 – ৳8,000", "৳8,000-এর বেশি"],
    submit: "ফ্রি পরামর্শ বুক করুন",
    note: "এই সপ্তাহে সার্ভের সীমিত স্লট",
  },
};

export const CALCULATOR_SEGMENTS: Record<
  "residential" | "commercial" | "industrial",
  {
    label: string;
    labelBn: string;
    costPerKw: number;
    tariffMultiplier: number;
    minBill: number;
    maxBill: number;
    step: number;
    defaultBill: number;
  }
> = {
  residential: {
    label: "Residential Home",
    labelBn: "আবাসিক",
    costPerKw: 88000,
    tariffMultiplier: 1,
    minBill: 1500,
    maxBill: 30000,
    step: 500,
    defaultBill: 5000,
  },
  commercial: {
    label: "Commercial",
    labelBn: "বাণিজ্যিক",
    costPerKw: 75000,
    tariffMultiplier: 1.3,
    minBill: 20000,
    maxBill: 500000,
    step: 5000,
    defaultBill: 60000,
  },
  industrial: {
    label: "Industrial Plant",
    labelBn: "ইন্ডাস্ট্রিয়াল",
    costPerKw: 65000,
    tariffMultiplier: 1.15,
    minBill: 100000,
    maxBill: 3000000,
    step: 20000,
    defaultBill: 400000,
  },
};

export const QUICK_ESTIMATOR = {
  billPerKw: 1150,
  annualUnitsPerKw: 1400,
  ratePerUnit: 10,
  costPerKw: 88000,
};

export { CITY_PAGE } from "./city-copy";

export const PAGE_IMAGES = {
  homeHeroImage: "/images/gd/hero-solar.jpg",
  homesHeroImage: "/images/gd/offer-homes.jpg",
  housingSocietyHeroImage: "/images/gd/offer-society.jpg",
  commercialHeroImage: "/images/gd/offer-commercial.jpg",
  guideHeroImage: "/images/gd/hero-solar.jpg",
  cityHeroImage: "/images/gd/hero-solar.jpg",
  aboutHeroImage: "/images/gd/hero-solar.jpg",
};

// Homepage sections ported from the Green Dhaka landing page.
export const EQUIPMENT_PARTNERS: Bi<{ intro: string; heading: string; groups: { label: string; brands: string[] }[] }> = {
  en: {
    intro: "The equipment behind every Green Dhaka installation.",
    heading: "Top brands we work with",
    groups: [
      { label: "Solar panels", brands: ["JinkoSolar", "LONGi", "Trina Solar", "JA Solar", "AIKO"] },
      { label: "Inverters", brands: ["Huawei", "Sungrow", "GoodWe", "Deye", "Solis"] },
      { label: "Batteries", brands: ["BYD", "Pylontech", "Dyness", "CATL", "EcoFlow"] },
    ],
  },
  bn: {
    intro: "প্রতিটি গ্রিন ঢাকা ইনস্টলেশনের পেছনের সরঞ্জাম।",
    heading: "আমরা যেসব শীর্ষ ব্র্যান্ড নিয়ে কাজ করি",
    groups: [
      { label: "সোলার প্যানেল", brands: ["JinkoSolar", "LONGi", "Trina Solar", "JA Solar", "AIKO"] },
      { label: "ইনভার্টার", brands: ["Huawei", "Sungrow", "GoodWe", "Deye", "Solis"] },
      { label: "ব্যাটারি", brands: ["BYD", "Pylontech", "Dyness", "CATL", "EcoFlow"] },
    ],
  },
};

export const WARRANTY: Bi<{ pill: string; heading: string; cards: { t: string; d: string }[]; whyTitle: string; whyLead: string; whyBody: string }> = {
  en: {
    pill: "Warranty",
    heading: "What Our Warranty Covers for You",
    cards: [
      { t: "Solar Panels", d: "Guaranteed to work cleanly for 12 years, plus a performance promise that your panels will keep producing solar power for 25 years." },
      { t: "Inverters", d: "Free replacement for 5 years if anything goes wrong, with affordable options to extend your protection up to 10 years." },
      { t: "Batteries (Lithium)", d: "Reliable backup power guaranteed for 5 to 10 years (or over 6,000 charge cycles)." },
      { t: "Installation & Repairs", d: "2 full years of free home service and yearly checkups to ensure your system runs smoothly." },
    ],
    whyTitle: "Why Buy Through Us?",
    whyLead: "We Handle the Hassle:",
    whyBody: " If a part ever breaks down within its warranty, you don't need to chase factory suppliers. Just call us — we handle the replacement and fix it on-site for you.",
  },
  bn: {
    pill: "ওয়ারেন্টি",
    heading: "আমাদের ওয়ারেন্টি আপনার জন্য যা কভার করে",
    cards: [
      { t: "সোলার প্যানেল", d: "১২ বছর নিখুঁতভাবে কাজ করার গ্যারান্টি, সাথে ২৫ বছরের পারফরম্যান্স প্রতিশ্রুতি — আপনার প্যানেল বছরের পর বছর সৌরবিদ্যুৎ উৎপাদন করবে।" },
      { t: "ইনভার্টার", d: "কোনো সমস্যা হলে ৫ বছর পর্যন্ত ফ্রি প্রতিস্থাপন, আর সাশ্রয়ী মূল্যে সুরক্ষা বাড়িয়ে ১০ বছর পর্যন্ত করার সুযোগ।" },
      { t: "ব্যাটারি (লিথিয়াম)", d: "৫ থেকে ১০ বছর (বা ৬,০০০-এর বেশি চার্জ সাইকেল) পর্যন্ত নির্ভরযোগ্য ব্যাকআপ শক্তির গ্যারান্টি।" },
      { t: "ইনস্টলেশন ও মেরামত", d: "২ বছর পর্যন্ত ফ্রি হোম সার্ভিস ও বার্ষিক চেকআপ — সিস্টেম যেন মসৃণভাবে চলে।" },
    ],
    whyTitle: "কেন আমাদের মাধ্যমে কিনবেন?",
    whyLead: "ঝামেলা আমরাই সামলাই:",
    whyBody: " ওয়ারেন্টির মধ্যে কোনো অংশ খারাপ হলে কারখানার সরবরাহকারীর পেছনে ছুটতে হবে না। শুধু আমাদের কল করুন — প্রতিস্থাপন আমরাই করি এবং আপনার জায়গায় বসিয়ে দিই।",
  },
};

export const NET_METER_BAND: Bi<{ heading: string; quote: string; utilities: string[] }> = {
  en: {
    heading: "Earn from Excess Solar Power",
    quote: "\"We handle the complete Net Metering approval process with your electricity provider so your unused power cuts down your night-time grid bill.\"",
    utilities: ["DESCO", "DPDC", "BPDB", "BREB"],
  },
  bn: {
    heading: "অতিরিক্ত সৌরবিদ্যুৎ থেকে আয় করুন",
    quote: "\"আপনার বিদ্যুৎ বিতরণ কর্তৃপক্ষের সাথে নেট মিটারিং অনুমোদনের সম্পূর্ণ প্রক্রিয়া আমরাই সামলাই — ফলে অব্যবহৃত বিদ্যুৎ আপনার রাতের গ্রিড বিল কমিয়ে দেয়।\"",
    utilities: ["DESCO", "DPDC", "BPDB", "BREB"],
  },
};

export const HOME_FEATURES: Bi<{ heading: string; items: { t: string; d: string }[] }> = {
  en: {
    heading: "Why homeowners choose Green Dhaka",
    items: [
      { t: "Premium panels", d: "Tier-1 high-efficiency mono PERC modules built for Bangladesh's heat and monsoon." },
      { t: "Easy EMI & net metering", d: "We handle government net-metering paperwork and offer 20% down EMI." },
      { t: "Expert installation", d: "In-house engineers install your system in as little as 7 days." },
      { t: "25-year warranty", d: "Long-term performance warranty plus free annual maintenance." },
      { t: "Live monitoring app", d: "Track generation and savings in real time from your phone." },
    ],
  },
  bn: {
    heading: "বাসার মালিকরা কেন গ্রিন ঢাকা বেছে নেন",
    items: [
      { t: "প্রিমিয়াম প্যানেল", d: "বাংলাদেশের তাপ ও বর্ষা সামলাতে তৈরি টিয়ার-১ উচ্চ-দক্ষতার মনো PERC মডিউল।" },
      { t: "সহজ EMI ও নেট মিটারিং", d: "সরকারি নেট-মিটারিং কাগজপত্র আমরাই সামলাই এবং ২০% ডাউন EMI দিই।" },
      { t: "দক্ষ ইনস্টলেশন", d: "আমাদের নিজস্ব প্রকৌশলীরা মাত্র ৭ দিনে সিস্টেম ইনস্টল করেন।" },
      { t: "২৫ বছরের ওয়ারেন্টি", d: "দীর্ঘমেয়াদি পারফরম্যান্স ওয়ারেন্টি এবং ফ্রি বার্ষিক রক্ষণাবেক্ষণ।" },
      { t: "লাইভ মনিটরিং অ্যাপ", d: "ফোন থেকেই রিয়েল-টাইমে উৎপাদন ও সাশ্রয় দেখুন।" },
    ],
  },
};

export const HOME_STEPS: Bi<{ heading: string; steps: string[] }> = {
  en: {
    heading: "Going solar in 5 simple steps",
    steps: ["Free site survey", "Custom system design", "Installation in 7 days", "Net-metering setup", "Lifetime support"],
  },
  bn: {
    heading: "৫টি সহজ ধাপে সোলারে যান",
    steps: ["ফ্রি সাইট সার্ভে", "কাস্টম সিস্টেম ডিজাইন", "৭ দিনে ইনস্টলেশন", "নেট-মিটারিং সেটআপ", "লাইফটাইম সাপোর্ট"],
  },
};

export const HOME_REVIEWS: Bi<{ heading: string; reviews: { n: string; q: string }[] }> = {
  en: {
    heading: "Loved by 200+ families",
    reviews: [
      { n: "Rahim U., Dhaka", q: "Our bill went from ৳8,000 to under ৳900. Installation was spotless and on time." },
      { n: "Nusrat H., Chattogram", q: "They took care of everything including the net-metering application. The app is genuinely useful." },
      { n: "Tanvir K., Sylhet", q: "Professional team from survey to commissioning. Highly recommend." },
    ],
  },
  bn: {
    heading: "২০০+ পরিবারের ভালোবাসা",
    reviews: [
      { n: "রহিম উ., ঢাকা", q: "আমাদের বিল ৳8,000 থেকে ৳900-এর নিচে নেমে এসেছে। ইনস্টলেশন ছিল নিখুঁত ও সময়মতো।" },
      { n: "নুসরাত হ., চট্টগ্রাম", q: "নেট-মিটারিং আবেদনসহ সবকিছু তারা নিজেরাই সামলেছে। অ্যাপটি সত্যিই কাজের।" },
      { n: "তানভীর ক., সিলেট", q: "সার্ভে থেকে চালু পর্যন্ত পেশাদার টিম। আমি সবাইকে সুপারিশ করি।" },
    ],
  },
};

export const HOME_COVERAGE: Bi<{ label: string; tabs: { label: string; title: string; sub: string }[] }> = {
  en: {
    label: "Project scale",
    tabs: [
      { label: "Homes", title: "Home rooftops from 3\u00a0kW", sub: "Net metering handled with DESCO, DPDC, NESCO or your local PBS." },
      { label: "Housing societies", title: "Society rooftops around 50\u00a0kW", sub: "Powering lifts, water pumps and common-area lighting." },
      { label: "Commercial & industrial", title: "Rooftop plants of 50\u00a0kW – 1\u00a0MW+", sub: "For factories, RMG units and warehouses." },
      { label: "Ground-mounted", title: "Solar plants of 1–50+\u00a0MW", sub: "Built on non-agricultural land." },
    ],
  },
  bn: {
    label: "প্রকল্পের আকার",
    tabs: [
      { label: "বাসাবাড়ি", title: "৩ কিলোওয়াট থেকে বাসার ছাদের সোলার", sub: "DESCO, DPDC, NESCO বা স্থানীয় PBS-এর সাথে নেট মিটারিং আমরাই সামলাই।" },
      { label: "হাউজিং সোসাইটি", title: "প্রায় ৫০ কিলোওয়াটের সোসাইটি ছাদ", sub: "লিফট, পানির পাম্প ও কমন এরিয়ার আলো চালায়।" },
      { label: "বাণিজ্যিক ও শিল্প", title: "৫০ কিলোওয়াট – ১ মেগাওয়াট+ ছাদের প্ল্যান্ট", sub: "কারখানা, RMG ইউনিট ও গুদামের জন্য।" },
      { label: "গ্রাউন্ড-মাউন্টেড", title: "১–৫০+ মেগাওয়াটের সোলার প্ল্যান্ট", sub: "অকৃষি জমিতে নির্মিত।" },
    ],
  },
};
