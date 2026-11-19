import type { Metadata, Viewport } from "next";
import { Sora, Manrope, Hind_Siliguri, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SITE_NAME, SITE_URL } from "@/data/site";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#002b4b",
  width: "device-width",
  initialScale: 1,
};

const DEFAULT_TITLE = "Green Dhaka — Rooftop Solar for Homes & Businesses in Bangladesh";
const DEFAULT_DESCRIPTION =
  "Go solar with Green Dhaka's end-to-end rooftop installation, financing and long-term support. Save up to 90% on electricity bills with net metering, 0% down EMI and a 25-year warranty.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | Green Dhaka",
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  keywords: [
    "Green Dhaka",
    "rooftop solar Bangladesh",
    "solar company in Dhaka",
    "solar panel price in Bangladesh",
    "net metering Bangladesh",
    "on-grid solar system",
    "off-grid solar system",
    "commercial solar Bangladesh",
    "solar EMI",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    locale: "en_BD",
    images: [{ url: "/images/gd/hero-solar.jpg", width: 1600, height: 1008 }],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ["/images/gd/hero-solar.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${sora.variable} ${manrope.variable} ${hindSiliguri.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="flex min-h-full flex-col bg-background text-foreground selection:bg-primary/30 selection:text-ink-deep"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
