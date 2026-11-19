import {
  BookOpen, CircleHelp, CircuitBoard, FileText, GalleryHorizontalEnd, Images, Inbox, Languages,
  LayoutDashboard, LayoutTemplate, MapPin, MessageSquareQuote, PlugZap, ScanSearch, Settings, Zap,
  type LucideIcon,
} from "lucide-react";

/** One icon per admin section, shared by the sidebar, page headings and tables. */
export const adminIcons: Record<string, LucideIcon> = {
  overview: LayoutDashboard, inquiries: Inbox, media: Images, services: Zap, articles: BookOpen,
  faqs: CircleHelp, testimonials: MessageSquareQuote, aerial: GalleryHorizontalEnd, brands: CircuitBoard,
  utilities: PlugZap, cities: MapPin, settings: Settings, blocks: LayoutTemplate, copy: Languages, seo: ScanSearch,
};

export const adminIcon = (id: string): LucideIcon => adminIcons[id] ?? FileText;
