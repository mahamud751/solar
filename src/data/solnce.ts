import { cities } from "./cities";

export interface SolarService {
  slug: string;
  title: string;
  shortTitle: string;
  category: "Installations" | "Financing" | "Operations";
  tagline: string;
  description: string;
  highlightMetric: string;
  highlightLabel: string;
  image: string;
  idealFor: string[];
  benefits: string[];
  deliverables: string[];
  process: { step: string; title: string; detail: string }[];
}

export interface BrandPartner {
  name: string;
  shortCode: string;
  kind: "panel" | "inverter" | "battery";
  tier: string;
  efficiency: string;
  warranty: string;
  wattage: string;
  tempCoeff: string;
  origin: string;
}

export interface Testimonial {
  name: string;
  role: string;
  location: string;
  segment: "Residential" | "Industrial";
  capacity: string;
  quote: string;
  savingsNote: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface BlogArticle {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readTime: string;
  image: string;
  author: string;
  sections: {
    heading: string;
    paragraphs: string[];
    bullets?: string[];
  }[];
}

export interface DiscomOption {
  id: string;
  name: string;
  region: string;
  ratePerUnit: number; // ৳ per kWh (approx. average)
  sunHours: number; // peak sun hours / day
  netMeteringNote: string;
}

export const COMPANY_INFO = {
  name: "Green Dhaka",
  legalName: "Green Dhaka",
  tagline: "Rooftop Solar for Homes & Businesses in Bangladesh",
  phone: "01976-000908",
  phoneHref: "tel:+8801976000908",
  email: "mygreendhaka@gmail.com",
  emailHref: "mailto:mygreendhaka@gmail.com",
  address: "Dhaka, Bangladesh",
  addressBn: "ঢাকা, বাংলাদেশ",
  hoursWeekday: "Sat – Thu: 9:30 AM – 6:30 PM",
  hoursWeekdayBn: "শনি – বৃহস্পতি: সকাল ৯:৩০ – সন্ধ্যা ৬:৩০",
  hoursSaturday: "Friday: Closed",
  hoursSaturdayBn: "শুক্রবার: বন্ধ",
  appStoreUrl: "",
  playStoreUrl: "",
  sharkTankUrl: "",
  // Add Green Dhaka's social profiles here; empty links are hidden in the footer.
  socials: {
    instagram: "",
    linkedin: "",
    youtube: "",
    facebook: "https://www.facebook.com/mygreendhaka",
  },
};

// Headline numbers shared with the Green Dhaka homepage stats.
export const HERO_STATS = [
  { value: 150, suffix: " MW", unit: "MW", label: "Solar installed" },
  { value: 20000, suffix: "+", unit: "", label: "Homes powered" },
  { value: 250, suffix: " Cr+", unit: "৳", label: "Customer savings (৳)" },
];

export const SERVICES: SolarService[] = [
  {
    slug: "residential-solar",
    title: "Residential Solar",
    shortTitle: "Residential",
    category: "Installations",
    tagline: "Rooftop solar for homes — cut your electricity bill by up to 90%.",
    description:
      "Turn your rooftop into a clean 25-year power plant. Green Dhaka surveys your roof, designs the system, installs it with in-house engineers and handles SREDA net-metering approval with DESCO, DPDC, NESCO or your local PBS — with 20% down EMI available.",
    highlightMetric: "Up to 90%",
    highlightLabel: "Lower electricity bills",
    image: "/images/residential-solar.jpg",
    idealFor: [
      "Independent houses & duplexes",
      "Rooftops of owner-occupied apartment buildings",
      "Housing societies & flat owners' associations",
    ],
    benefits: [
      "Cut monthly electricity bills by 70–90% with bi-directional net metering",
      "Tier-1 LONGi & Trina panels with Growatt / Solis inverters",
      "Net-metering application, utility inspection & meter change handled for you",
      "25-year performance warranty plus free annual maintenance",
    ],
    deliverables: [
      "Shadow analysis & generation estimate for your roof",
      "GreenPro Mount™ hot-dip galvanised structure, storm-tested to 170 km/h",
      "Mono-PERC / TOPCon modules & smart Wi-Fi inverter",
      "Complete net-metering documentation with your utility",
    ],
    process: [
      {
        step: "01",
        title: "Free Survey & Sizing",
        detail: "Share your monthly bill; our engineer visits, checks shading and sizes the right kW.",
      },
      {
        step: "02",
        title: "Design & Transparent Quote",
        detail: "Get a roof layout and an itemised quote with every component brand named.",
      },
      {
        step: "03",
        title: "Installation in About 7 Days",
        detail: "In-house crew mounts, wires, earths and tests every string to IEC standards.",
      },
      {
        step: "04",
        title: "Net Metering & App Tracking",
        detail: "Bi-directional meter fitted by your utility; watch live generation in the app.",
      },
    ],
  },
  {
    slug: "industrial-solar",
    title: "Industrial Solar",
    shortTitle: "Industrial",
    category: "Installations",
    tagline:
      "Large rooftop solar plants for factories, RMG units and warehouses.",
    description:
      "Cut daytime grid and diesel-generator costs for 25 years. Green Dhaka engineers high-yield plants on tin-shed and RCC roofs for garment factories, textile mills and warehouses — installed with zero disruption to production.",
    highlightMetric: "3 – 4 yrs",
    highlightLabel: "Typical C&I payback",
    image: "/images/industrial-solar.jpg",
    idealFor: [
      "Garment (RMG), textile & manufacturing plants",
      "Cold storages & logistics warehouses",
      "Hospitals, universities & commercial complexes",
    ],
    benefits: [
      "Lower cost per unit than grid and diesel generation during working hours",
      "Supports buyer ESG and green-factory requirements for exporters",
      "Non-penetrating clamps & walkways that protect tin-shed roofs",
      "String-level monitoring with uptime-backed O&M contracts",
    ],
    deliverables: [
      "Structural load audit & storm-rated mounting engineering",
      "Walkways, lifelines, lightning protection & cleaning water lines",
      "Statutory electrical inspection & utility synchronisation",
      "Drone thermal inspection before final handover",
    ],
    process: [
      {
        step: "01",
        title: "Load Profile & Roof Audit",
        detail: "Analyse sanctioned load, tariff, generator use and roof structural capacity.",
      },
      {
        step: "02",
        title: "Engineering Design & Yield Model",
        detail: "Deliver a PVsyst yield simulation, single-line diagram and ROI cash-flow model.",
      },
      {
        step: "03",
        title: "Safety-First EPC Execution",
        detail: "Install without halting production, following strict site safety protocols.",
      },
      {
        step: "04",
        title: "Grid Sync & Drone Handover",
        detail: "Complete inspection, aerial thermography QA and O&M onboarding.",
      },
    ],
  },
  {
    slug: "ppa",
    title: "Solar PPA",
    shortTitle: "Solar PPA",
    category: "Financing",
    tagline: "Zero upfront cost — pay only for the solar power you use.",
    description:
      "Switch to solar with zero capital expenditure (OPEX / RESCO model). Green Dhaka arranges an investor to build, own and maintain the plant on your roof, while you buy the solar power at a per-unit rate below your grid tariff.",
    highlightMetric: "৳0 Upfront",
    highlightLabel: "Zero CapEx investment",
    image: "/images/ground-mounted-solar.jpg",
    idealFor: [
      "Commercial & industrial rooftops (200 kW+)",
      "Companies preserving capital for core expansion",
      "Established factories, malls & educational campuses",
    ],
    benefits: [
      "Savings from day one compared with commercial grid tariffs",
      "No capital outlay and no maintenance responsibility",
      "Fixed or predictable tariff over a 10–20 year term",
      "Option to buy the plant at the end of the contract",
    ],
    deliverables: [
      "Tariff benchmarking & PPA term-sheet structuring",
      "Investor matching & legal documentation",
      "Turnkey EPC construction with 100% O&M included",
      "Monthly meter billing & generation reconciliation",
    ],
    process: [
      {
        step: "01",
        title: "Credit & Roof Eligibility",
        detail: "Quick review of recent financials, roof area and sanctioned load.",
      },
      {
        step: "02",
        title: "PPA Tariff Proposal",
        detail: "Receive a locked per-unit solar tariff offer from our financing partners.",
      },
      {
        step: "03",
        title: "Zero-Cost Commissioning",
        detail: "The partner funds and commissions the plant under Green Dhaka quality oversight.",
      },
      {
        step: "04",
        title: "Pay-As-You-Generate",
        detail: "Pay monthly only for verified solar units consumed.",
      },
    ],
  },
  {
    slug: "solar-loan",
    title: "Solar Loan",
    shortTitle: "Solar Loan",
    category: "Financing",
    tagline: "Easy solar financing — 20% down with monthly EMIs.",
    description:
      "Own your solar system from day one without draining your savings. Green Dhaka offers 20% down EMI for homes and connects businesses with partner banks for green financing, so your monthly bill savings help cover the instalment.",
    highlightMetric: "20% Down",
    highlightLabel: "Easy EMI plans",
    image: "/images/residential-solar.jpg",
    idealFor: [
      "Homeowners who prefer monthly instalments",
      "SMEs financing rooftop solar without large upfront cash",
      "Commercial buildings replacing high grid bills with fixed EMIs",
    ],
    benefits: [
      "20% down-payment EMI options for residential systems",
      "Simple documentation with help from our team",
      "Monthly bill savings often cover most of the EMI",
      "Full ownership of the system and 25 years of savings",
    ],
    deliverables: [
      "EMI plan & partner bank comparison",
      "Documentation & application assistance",
      "Disbursement coordinated with installation milestones",
      "Transparent repayment & payback schedule",
    ],
    process: [
      {
        step: "01",
        title: "Check EMI Eligibility",
        detail: "Tell us your bill and system size; we show EMI options side by side.",
      },
      {
        step: "02",
        title: "Submit Documents",
        detail: "NID, electricity bill and income proof — our team helps you prepare them.",
      },
      {
        step: "03",
        title: "Approval & Installation",
        detail: "Once approved, installation is scheduled straight away.",
      },
      {
        step: "04",
        title: "Savings Offset Your EMI",
        detail: "Lower bills from month one while the system pays for itself.",
      },
    ],
  },
  {
    slug: "solar-cleaning",
    title: "Solar Cleaning",
    shortTitle: "Cleaning",
    category: "Operations",
    tagline:
      "Professional panel cleaning — manual, jet-spray and sprinkler systems.",
    description:
      "Dust, smog, bird droppings and brick-kiln soot can cut your plant's output by 15–30%, especially in the dry season. Book on-demand cleaning or install automated sprinkler and robotic cleaning systems through Green Dhaka.",
    highlightMetric: "+18–25%",
    highlightLabel: "Generation recovery",
    image: "/images/solar-engineering.jpg",
    idealFor: [
      "Home rooftops in dusty city areas",
      "Factory sheds near roads, brick kilns or industrial zones",
      "Large ground-mounted plants needing waterless robotics",
    ],
    benefits: [
      "Scratch-free soft brushes and demineralised water",
      "Timer-based sprinkler lines or autonomous dry-cleaning robots",
      "Before-and-after photos & generation recovery logs in the app",
      "Prevents hot-spots and protects the panel's anti-reflective coating",
    ],
    deliverables: [
      "One-off visits or monthly / fortnightly cleaning plans",
      "Automated sprinkler kit installation",
      "Dry robotic cleaning for large commercial plants",
      "Visual inspection of connectors & shading every visit",
    ],
    process: [
      {
        step: "01",
        title: "Pick Cleaning Mode",
        detail: "Choose manual / jet wash, automated sprinklers or dry robotics.",
      },
      {
        step: "02",
        title: "Schedule a Slot",
        detail: "Morning slots are best, when panels are cool and avoid thermal shock.",
      },
      {
        step: "03",
        title: "Trained Crew Execution",
        detail: "Harnessed technicians clean thoroughly with non-abrasive tools.",
      },
      {
        step: "04",
        title: "Photo Proof & Report",
        detail: "Review before/after photos and the kWh uplift on your dashboard.",
      },
    ],
  },
  {
    slug: "ground-mounted",
    title: "Ground Mounted Solar",
    shortTitle: "Ground Mount",
    category: "Installations",
    tagline: "Ground-mounted solar plants on non-agricultural land.",
    description:
      "Turn unused industrial or non-agricultural land into a high-yield captive or utility solar plant. Engineered for optimal tilt, flood-safe raised foundations and clean evacuation to the grid substation.",
    highlightMetric: "1 MW – 50+ MW",
    highlightLabel: "Scalable solar plants",
    image: "/images/ground-mounted-solar.jpg",
    idealFor: [
      "Industrial parks & export processing zones",
      "Captive plants for large factories",
      "Landowners & IPPs developing non-agricultural land",
    ],
    benefits: [
      "South-facing tilt optimised for Bangladesh's latitude",
      "Bifacial TOPCon modules capturing rear-side ground reflection",
      "Land survey, soil testing, raised flood-safe piling & HT bay work",
      "Guaranteed Performance Ratio (PR) with bankable EPC warranties",
    ],
    deliverables: [
      "Topographic drone survey, flood-level study & geotechnical testing",
      "Foundations, perimeter fencing, drainage & inverter rooms",
      "11 kV / 33 kV substation & line work",
      "Grid synchronisation with the utility",
    ],
    process: [
      {
        step: "01",
        title: "Land & Grid Feasibility",
        detail: "Evaluate irradiance, flood history, substation distance and approvals.",
      },
      {
        step: "02",
        title: "Detailed Plant Engineering",
        detail: "Optimise row spacing, bifacial gain, foundation height and transformer sizing.",
      },
      {
        step: "03",
        title: "Turnkey Plant Construction",
        detail: "Execute piling, module mounting, DC/AC trenching and SCADA integration.",
      },
      {
        step: "04",
        title: "Grid Sync & Asset O&M",
        detail: "Commission the plant and move to 24/7 O&M monitoring.",
      },
    ],
  },
  {
    slug: "solar-maintenance",
    title: "Solar Maintenance",
    shortTitle: "O&M",
    category: "Operations",
    tagline:
      "Annual O&M contracts to keep your plant performing at its best.",
    description:
      "Protect your solar savings for all 25 years. Our Annual Maintenance Contracts combine preventive electrical checks, thermal imaging, inverter health checks and fast breakdown response — including pre-monsoon structure inspections.",
    highlightMetric: "99%+",
    highlightLabel: "Target plant uptime",
    image: "/images/solar-engineering.jpg",
    idealFor: [
      "Existing home & commercial solar owners",
      "Factories seeing lower-than-expected generation",
      "Plants whose original installer is no longer responsive",
    ],
    benefits: [
      "Quarterly electrical audits: earthing, torque, MC4 & surge-protection checks",
      "Thermal imaging to catch micro-cracks and failing diodes early",
      "24–48 hour breakdown response & warranty claim handling",
      "Monthly performance reports in the Green Dhaka app",
    ],
    deliverables: [
      "Full plant health audit & string IV-curve diagnostics",
      "Preventive & corrective visits with spare-parts management",
      "Remote generation monitoring & fault alerts",
      "Pre-monsoon structure & waterproofing inspection",
    ],
    process: [
      {
        step: "01",
        title: "Baseline Health Audit",
        detail: "Inspect strings, inverters, earthing resistance and past generation.",
      },
      {
        step: "02",
        title: "Fix Hidden Losses",
        detail: "Repair loose terminations, tripped strings and shading problems.",
      },
      {
        step: "03",
        title: "Scheduled Preventive Care",
        detail: "Quarterly checklists, thermography and automated generation alerts.",
      },
      {
        step: "04",
        title: "Monthly Reporting",
        detail: "Track actual vs. expected generation right in the app.",
      },
    ],
  },
  {
    slug: "carbon-credits",
    title: "Carbon Credits",
    shortTitle: "Carbon Credits",
    category: "Operations",
    tagline: "Monetise the carbon your solar plant offsets.",
    description:
      "Every megawatt-hour of solar power displaces gas- and oil-fired grid generation. Green Dhaka helps commercial and industrial plant owners register, verify and sell International Renewable Energy Certificates (I-RECs) and voluntary carbon credits.",
    highlightMetric: "Extra Revenue",
    highlightLabel: "Verified ESG & I-RECs",
    image: "/images/ground-mounted-solar.jpg",
    idealFor: [
      "Commercial & industrial solar owners (500 kW+)",
      "Export-oriented RMG & textile manufacturers with ESG targets",
      "Solar portfolios seeking green certification",
    ],
    benefits: [
      "Recurring green revenue on top of electricity savings",
      "Registry onboarding (I-REC, Verra, Gold Standard)",
      "Supports Scope 2 reporting and international buyer requirements",
      "Verification from Green Dhaka's digital monitoring data",
    ],
    deliverables: [
      "Eligibility & carbon-yield feasibility assessment",
      "Project documentation & third-party validation coordination",
      "Periodic meter verification & certificate issuance",
      "Transparent brokerage & direct settlement",
    ],
    process: [
      {
        step: "01",
        title: "Plant Eligibility Check",
        detail: "Confirm commissioning date, capacity and registry qualification.",
      },
      {
        step: "02",
        title: "Registry Documentation",
        detail: "Prepare the documents and submit your plant for validation.",
      },
      {
        step: "03",
        title: "Generation Verification",
        detail: "Audit verified kWh data to issue tradable certificates or credits.",
      },
      {
        step: "04",
        title: "Sell or Retire",
        detail: "Sell certificates for revenue or retire them toward your ESG goals.",
      },
    ],
  },
  {
    slug: "housing-society-solar",
    title: "Housing Society Solar",
    shortTitle: "Housing Society",
    category: "Installations",
    tagline: "Rooftop solar for housing societies — cut common-area bills by up to 90%.",
    description:
      "Power your society's lifts, water pumps, parking and staircase lighting from its own rooftop. Green Dhaka surveys the building, prepares an AGM-ready proposal with savings and payback, installs with in-house engineers and handles SREDA net-metering approval with DESCO, DPDC, NESCO or REB.",
    highlightMetric: "Up to 90%",
    highlightLabel: "Lower common-area bills",
    image: "/images/gd/offer-society.jpg",
    idealFor: [
      "Apartment owners' associations",
      "Housing societies & gated communities",
      "Multi-storey residential buildings with shared roofs",
    ],
    benefits: [
      "Cut lift, pump and common-lighting bills by 70–90% with net metering",
      "Surplus units exported and credited by your utility under SREDA policy",
      "Reserve fund, per-flat contribution or bank EMI — including 20% down plans",
      "25-year performance warranty with ongoing maintenance support",
    ],
    deliverables: [
      "Roof survey, structural check and generation estimate",
      "AGM-ready proposal with savings, payback and financing options",
      "Tier-1 modules, smart inverter and storm-tested mounting structure",
      "Complete net-metering documentation with your utility",
    ],
    process: [
      {
        step: "01",
        title: "Free Society Visit",
        detail: "Our society desk surveys the roof and reviews the common-area electricity bills.",
      },
      {
        step: "02",
        title: "Committee Proposal",
        detail: "Get a savings, payback and financing proposal your committee can present at the AGM.",
      },
      {
        step: "03",
        title: "Installation",
        detail: "In-house crew installs, wires and tests the system with minimal disruption to residents.",
      },
      {
        step: "04",
        title: "Net Metering & Tracking",
        detail: "Your utility fits the bi-directional meter; the society tracks generation and savings live.",
      },
    ],
  },
];

export const APP_STEPS = [
  {
    number: "01",
    title: "Calculate Your Solar Needs",
    description:
      "Pick your utility, enter your monthly bill and get the right system size for your roof.",
    badge: "Clear-sky sizing",
    screenTitle: "Solar Roof Sizer",
    screenSub: "DESCO · Dhaka",
  },
  {
    number: "02",
    title: "Pick Your Solar Panels",
    description:
      "Choose a Tier-1 panel brand and see the cost, savings and payback before you commit.",
    badge: "Tier-1 certified",
    screenTitle: "Select Panel Brand",
    screenSub: "LONGi · Trina Solar",
  },
  {
    number: "03",
    title: "Compare Panels Side by Side",
    description:
      "Weigh rated power, module efficiency and heat performance for Bangladesh's climate.",
    badge: "Zero guesswork",
    screenTitle: "Side-by-Side Specs",
    screenSub: "N-Type TOPCon vs Mono-PERC",
  },
  {
    number: "04",
    title: "Approve Your Design and Track It",
    description:
      "Review an itemised quote and roof layout, approve it, then track every stage to switch-on.",
    badge: "Live tracking",
    screenTitle: "Quote & Live Tracker",
    screenSub: "Stage 3 of 5 · Net Metering",
  },
];

/** Equipment brands used on Green Dhaka installations (same list as greendhaka-main). */
export const BRAND_PARTNERS: BrandPartner[] = [
  {
    name: "LONGi",
    shortCode: "LNG",
    kind: "panel",
    tier: "Tier-1 panels",
    efficiency: "22.8%",
    warranty: "30 yrs",
    wattage: "580 Wp",
    tempCoeff: "-0.29%/°C",
    origin: "China",
  },
  {
    name: "Trina Solar",
    shortCode: "TRN",
    kind: "panel",
    tier: "Tier-1 panels",
    efficiency: "22.5%",
    warranty: "30 yrs",
    wattage: "585 Wp",
    tempCoeff: "-0.30%/°C",
    origin: "China",
  },
  {
    name: "Growatt",
    shortCode: "GRW",
    kind: "inverter",
    tier: "Inverters",
    efficiency: "98.4% max",
    warranty: "5–10 yrs",
    wattage: "3–50 kW",
    tempCoeff: "—",
    origin: "China",
  },
  {
    name: "Solis",
    shortCode: "SLS",
    kind: "inverter",
    tier: "Inverters",
    efficiency: "98.3% max",
    warranty: "5–10 yrs",
    wattage: "3–110 kW",
    tempCoeff: "—",
    origin: "China",
  },
  {
    name: "LVTOPSUN",
    shortCode: "LVT",
    kind: "battery",
    tier: "Lithium batteries",
    efficiency: "6,000+ cycles",
    warranty: "5–10 yrs",
    wattage: "5–15 kWh",
    tempCoeff: "—",
    origin: "China",
  },
];

/** Panel brands only (used by the calculator and app showcase). */
export const PANEL_BRANDS = BRAND_PARTNERS.filter((b) => b.kind === "panel");

// Same customer reviews as greendhaka-main (src/components/site/Blocks.tsx).
export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Rahim U.",
    role: "Green Dhaka customer",
    location: "Dhaka",
    segment: "Residential",
    capacity: "Rooftop solar",
    quote:
      "Our bill went from ৳8,000 to under ৳900. Installation was spotless and on time.",
    savingsNote: "৳8,000 → ৳900 bill",
  },
  {
    name: "Nusrat H.",
    role: "Green Dhaka customer",
    location: "Chattogram",
    segment: "Residential",
    capacity: "Rooftop solar",
    quote:
      "They took care of everything including the net-metering application. The app is genuinely useful.",
    savingsNote: "Net metering handled",
  },
  {
    name: "Tanvir K.",
    role: "Green Dhaka customer",
    location: "Sylhet",
    segment: "Residential",
    capacity: "Rooftop solar",
    quote: "Professional team from survey to commissioning. Highly recommend.",
    savingsNote: "Survey to switch-on",
  },
];

export const AERIAL_SHOWCASE_SLIDES = [
  {
    id: "commercial-rooftop",
    label: "Commercial Rooftop",
    headline: "Every inch of roof, turned into savings",
    description:
      "Precision string layouts engineered to maximise kW on factory sheds while keeping safe access walkways for maintenance.",
    metric: "Factory rooftops · 50 kW – 1 MW+",
    ctaLabel: "Explore commercial solar",
    ctaHref: "/commercial",
    image: "/images/industrial-solar.jpg",
    alt: "Aerial view of a commercial roof covered edge to edge with solar panels",
  },
  {
    id: "engineering",
    label: "Engineering",
    headline: "Mounted, wired and sealed to last 25 years",
    description:
      "GreenPro Mount™ galvanised structures, UV-protected conduits, anti-skid walkways and weatherproof DC/AC protection built for monsoon and cyclone seasons.",
    metric: "170 km/h storm-tested · BUET approved",
    ctaLabel: "See maintenance & QA",
    ctaHref: "/service/solar-maintenance",
    image: "/images/solar-engineering.jpg",
    alt: "Low aerial pass along panel rows, walkways and cable runs",
  },
  {
    id: "site-handover",
    label: "Site Handover",
    headline: "Inspected from the air before we hand it over",
    description:
      "Commercial projects finish with an aerial visual and thermal check so hot-spots, shading errors or loose rows don't slip through.",
    metric: "Drone QA on every commercial plant",
    ctaLabel: "Request a site audit",
    ctaHref: "/contact",
    image: "/images/ground-mounted-solar.jpg",
    alt: "Wide aerial orbit of a completed factory rooftop solar installation",
  },
];

export const FAQS: FaqItem[] = [
  {
    id: "what-is-green-dhaka",
    question: "What is Green Dhaka?",
    answer:
      "Green Dhaka is a rooftop solar company serving homes, housing societies and businesses across Bangladesh. We handle everything end to end: free site survey, system design, installation by in-house engineers, net-metering approval with your utility, financing and 25 years of after-sales service.",
  },
  {
    id: "why-choose-green-dhaka",
    question: "Why choose Green Dhaka?",
    answer:
      "We offer a Savings Guarantee with a money-back promise, BUET-approved GreenPro Mount™ structures tested for 170 km/h storms, Tier-1 LONGi and Trina panels, net-metering paperwork handled for you, 20% down EMI and proactive maintenance visits — all without middlemen.",
  },
  {
    id: "how-does-solar-work",
    question: "How does solar work?",
    answer:
      "Solar panels on your roof turn sunlight into DC electricity. An inverter converts it into AC power that runs your lights, fans, AC and appliances. With an on-grid net-metered system, surplus daytime power is exported to the grid (DESCO, DPDC, NESCO, WZPDCO, BPDB or your PBS) and credited against your bill.",
  },
  {
    id: "benefits-of-installing-solar",
    question: "What are the benefits of installing solar panels at home?",
    answer:
      "Homeowners typically cut electricity bills by 70–90%, recover their investment in about 4–6 years, and enjoy 20+ more years of near-free power while protecting themselves from future tariff increases. There is no cash subsidy for rooftop solar in Bangladesh, but net metering credits every surplus unit you export.",
  },
  {
    id: "is-there-a-subsidy",
    question: "Is there a government subsidy for rooftop solar in Bangladesh?",
    answer:
      "There is no upfront cash subsidy for residential rooftop solar. Instead, the SREDA net-metering guideline lets grid-connected homes and businesses export surplus power and have it adjusted against their bills. Green Dhaka prepares and submits the full net-metering application for you.",
  },
  {
    id: "load-shedding",
    question: "Will solar work during load-shedding?",
    answer:
      "A standard on-grid system switches off during a grid outage for safety. If you face frequent load-shedding, choose a hybrid or off-grid system with lithium battery backup — it keeps essential loads running when the grid is down.",
  },
  {
    id: "do-solar-panels-work-at-night",
    question: "Do solar panels work at night?",
    answer:
      "No — panels need sunlight. With an on-grid net-metered system, the credit you earn from daytime exports offsets the grid power you use at night. Hybrid systems with batteries can also power your home after sunset.",
  },
];

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    slug: "net-metering-bangladesh-desco-dpdc-guide-2026",
    category: "Solar Basics",
    title: "Net Metering in Bangladesh: How It Works with DESCO, DPDC and Your PBS (2026)",
    excerpt:
      "Net metering lets you export surplus rooftop solar power and have it adjusted against your electricity bill. This guide explains how it works in Bangladesh, what your utility checks, and how to avoid the most common delays.",
    publishedAt: "March 2026",
    readTime: "6 min read",
    image: "/images/residential-solar.jpg",
    author: "Green Dhaka Engineering Desk",
    sections: [
      {
        heading: "How Net Metering Works in Bangladesh",
        paragraphs: [
          "Under the net-metering guideline issued by SREDA (Sustainable and Renewable Energy Development Authority), grid-connected customers can install rooftop solar and connect it through a bi-directional meter. Solar power is used in your home first; surplus power flows into the grid during the day.",
          "Your utility records both the units you import and the units you export. On your bill, exported units are adjusted against imported units, so you pay only for the net energy you take from the grid.",
        ],
      },
      {
        heading: "What Your Utility Checks",
        paragraphs: [
          "Whether you are served by DESCO, DPDC, NESCO, WZPDCO, BPDB or a Palli Bidyut Samity (PBS) under BREB, the application follows the same broad steps — but inspection checklists and timelines vary by office.",
        ],
        bullets: [
          "Application: submitted to your local distribution office with your latest bill, NID and the system's technical details.",
          "System size: the allowed solar capacity is linked to your sanctioned load; we confirm the current limit for your connection during the survey.",
          "Safety: inspectors check earthing, surge protection, AC/DC isolators and the inverter's anti-islanding function.",
          "Meter change: once approved, the utility installs or programmes a bi-directional meter and the system is switched on.",
        ],
      },
      {
        heading: "How Green Dhaka Handles the Paperwork",
        paragraphs: [
          "Most delays come from a name mismatch between the bill and the applicant, missing single-line drawings or incomplete equipment certificates. Green Dhaka prepares the drawings and documents, submits the application and coordinates the inspection and meter change — you just sign.",
        ],
      },
    ],
  },
  {
    slug: "how-to-choose-solar-company-bangladesh",
    category: "Solar Basics",
    title: "How to Choose the Right Solar Company in Bangladesh (2026 Checklist)",
    excerpt:
      "Panels are only one part of a 25-year investment. Use this checklist to compare solar installers in Bangladesh on design, structure, warranties and after-sales service before you sign.",
    publishedAt: "February 2026",
    readTime: "7 min read",
    image: "/images/industrial-solar.jpg",
    author: "Green Dhaka Research Team",
    sections: [
      {
        heading: "Why the Installer Matters More Than the Panel Brand",
        paragraphs: [
          "A solar system is 25-year infrastructure on your roof. Even Tier-1 panels underperform or fail early if they sit on thin steel, are wired with undersized cable or have poor earthing.",
          "In Bangladesh the structure matters even more: monsoon rain, humidity and cyclone-strength winds punish weak mounting and badly sealed roof penetrations.",
        ],
      },
      {
        heading: "5-Point Checklist Before You Sign",
        paragraphs: ["Ask every installer for these five things:"],
        bullets: [
          "An itemised quote: exact panel and inverter models, DC cable size (4 or 6 sq.mm UV-resistant) and the galvanising thickness of the structure.",
          "A shadow analysis: water tanks, stair rooms and neighbouring buildings can pull down a whole string if the layout ignores them.",
          "Storm-rated mounting: ask what wind speed the structure is designed and tested for.",
          "Workmanship & waterproofing warranty: beyond the 25-year panel warranty, insist on cover for installation quality and roof leaks.",
          "Realistic generation: in Bangladesh a well-designed system produces roughly 1,350–1,500 units per kW per year. Be wary of promises far above that.",
        ],
      },
      {
        heading: "How Green Dhaka Compares",
        paragraphs: [
          "Green Dhaka gives you an itemised quote, a BUET-approved GreenPro Mount™ structure tested for 170 km/h storms, in-house installation teams, net-metering paperwork handled end to end, and a Savings Guarantee backed by a money-back promise.",
        ],
      },
    ],
  },
  {
    slug: "solar-for-apartment-buildings-dhaka-2026",
    category: "Solar Basics",
    title: "Solar for Apartment Buildings and Housing Societies in Dhaka: Cost, Savings and Approval (2026)",
    excerpt:
      "Lifts, water pumps, corridor lights and generators make common-area electricity one of the biggest monthly costs for apartment buildings. Here's how a shared rooftop solar system cuts it.",
    publishedAt: "January 2026",
    readTime: "5 min read",
    image: "/images/ground-mounted-solar.jpg",
    author: "Green Dhaka Team",
    sections: [
      {
        heading: "Why Apartment Buildings Benefit Most",
        paragraphs: [
          "For flat owners' associations and housing societies in Dhaka, Chattogram and other cities, the common meter powers lifts, water pumps, parking and corridor lighting, intercoms and security systems — often the largest item in the monthly service charge.",
          "A shared rooftop solar system offsets much of that daytime load, lowering the service charge for every flat while the roof stays usable under a raised structure.",
        ],
      },
      {
        heading: "Typical Costs and Payback",
        paragraphs: [
          "Indicative figures for common-area systems (final numbers depend on the roof and load):",
        ],
        bullets: [
          "System size: most apartment buildings fit 10 kW – 50 kW on the roof.",
          "Cost: roughly ৳80,000 – ৳95,000 per kW installed, including structure, inverter and net metering.",
          "Payback: typically 4–5 years from bill savings, with 20+ years of savings after that.",
          "Raised structures: elevating the panels keeps the roof usable for drying clothes, gatherings and water-tank access, and keeps top-floor flats cooler.",
        ],
      },
      {
        heading: "Getting Your Committee's Approval",
        paragraphs: [
          "Start with a committee resolution, a copy of the common-meter electricity bill and the building's ownership documents. Green Dhaka prepares an AGM-ready proposal with the roof layout, cost, financing options and payback, presents it to residents, and then handles installation and net metering.",
        ],
      },
    ],
  },
];

/**
 * Electricity distribution utilities in Bangladesh.
 * ratePerUnit is an approximate average residential rate (৳/kWh) that solar offsets;
 * sunHours are typical peak sun hours per day.
 */
export const DISCOMS: DiscomOption[] = [
  {
    id: "desco",
    name: "DESCO",
    region: "Dhaka North",
    ratePerUnit: 10,
    sunHours: 4.7,
    netMeteringNote: "SREDA net metering · Gulshan, Uttara, Mirpur & more",
  },
  {
    id: "dpdc",
    name: "DPDC",
    region: "Dhaka South",
    ratePerUnit: 10,
    sunHours: 4.7,
    netMeteringNote: "SREDA net metering · Dhanmondi, Motijheel, Old Dhaka & more",
  },
  {
    id: "breb",
    name: "BREB / Palli Bidyut (PBS)",
    region: "Nationwide",
    ratePerUnit: 9.5,
    sunHours: 4.8,
    netMeteringNote: "District towns & rural areas · net metering via your local PBS",
  },
  {
    id: "bpdb",
    name: "BPDB",
    region: "Chattogram, Sylhet, Mymensingh & more",
    ratePerUnit: 10,
    sunHours: 4.7,
    netMeteringNote: "City distribution zones · SREDA net metering",
  },
  {
    id: "nesco",
    name: "NESCO",
    region: "Rajshahi & Rangpur",
    ratePerUnit: 9.8,
    sunHours: 4.9,
    netMeteringNote: "Strong sun in the north-west · higher yearly generation",
  },
  {
    id: "wzpdco",
    name: "WZPDCO",
    region: "Khulna & Barishal",
    ratePerUnit: 9.8,
    sunHours: 4.8,
    netMeteringNote: "Coastal sites · cyclone-rated mounting recommended",
  },
];

/** City-corporation cities, used for the contact page service network. */
export const CITIES = cities.filter((c) => c.cityCorp).map((c) => c.name);

/** Company values shown on the About page. */
export const VALUES = [
  {
    title: "Guaranteed savings",
    description:
      "A Savings Guarantee with a money-back promise: if your system under-generates, we pay the difference.",
  },
  {
    title: "No middlemen",
    description:
      "Survey, installation, net-metering paperwork and service are all handled directly by our own team.",
  },
  {
    title: "Built for Bangladesh's weather",
    description:
      "GreenPro Mount™ structures are tested for 170 km/h storms and approved by BUET.",
  },
  {
    title: "Service for 25 years",
    description:
      "Proactive maintenance visits and a 25-year warranty keep your system performing year after year.",
  },
];

/** Formats an amount in Bangladeshi taka with lakh/crore grouping, e.g. ৳2,50,000. */
export function formatBDT(amount: number): string {
  return `৳${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(
    Math.round(amount)
  )}`;
}
