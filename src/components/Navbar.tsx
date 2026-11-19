"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Menu,
  PhoneCall,
  ArrowUpRight,
  Sun,
  Factory,
  FileCheck2,
  Landmark,
  Sparkles,
  Grid2x2,
  Wrench,
  Leaf,
  Home as HomeIcon,
  Building2,
  Store,
  PlugZap,
  BatteryCharging,
} from "lucide-react";
import { BrandLogo } from "./BrandLogo";
import { useContent } from "@/data/content";
import { LangToggle, useLang } from "@/i18n/lang";
import {
  citiesNav,
  offeringsNav,
  solutionsNav,
} from "@/components/site/SiteChrome";

const ICON = "h-4 w-4 text-primary-deep";

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  "residential-solar": <Sun className={ICON} aria-hidden="true" />,
  "industrial-solar": <Factory className={ICON} aria-hidden="true" />,
  ppa: <FileCheck2 className={ICON} aria-hidden="true" />,
  "solar-loan": <Landmark className={ICON} aria-hidden="true" />,
  "solar-cleaning": <Sparkles className={ICON} aria-hidden="true" />,
  "ground-mounted": <Grid2x2 className={ICON} aria-hidden="true" />,
  "solar-maintenance": <Wrench className={ICON} aria-hidden="true" />,
  "carbon-credits": <Leaf className="h-4 w-4 text-success" aria-hidden="true" />,
};

const GD_ICONS: Record<string, React.ReactNode> = {
  "/homes": <HomeIcon className={ICON} aria-hidden="true" />,
  "/housing-society": <Building2 className={ICON} aria-hidden="true" />,
  "/commercial": <Store className={ICON} aria-hidden="true" />,
  "/on-grid-solar-system": <PlugZap className={ICON} aria-hidden="true" />,
  "/off-grid-solar-system": <BatteryCharging className={ICON} aria-hidden="true" />,
};

// Labels for the remaining menu items, per language.
const NAV_LABELS = {
  en: { menu: "Menu", services: "Services", allServices: (n: number) => `Explore all ${n} solar solutions`, calculator: "Calculator", about: "About", blog: "Blog", contact: "Contact" },
  bn: { menu: "মেনু", services: "সার্ভিস", allServices: (n: number) => `সব ${n}টি সোলার সার্ভিস দেখুন`, calculator: "ক্যালকুলেটর", about: "আমাদের সম্পর্কে", blog: "ব্লগ", contact: "যোগাযোগ" },
} as const;

const NAV_LINK =
  "nav-link block rounded-full px-2.5 py-2 text-sm font-semibold text-foreground/85 transition-colors hover:bg-primary-soft hover:text-primary-deep";

const LAYOUT_EVENT = "navlayoutchange";

function hidePopover(el: HTMLElement | null) {
  if (el && typeof el.hidePopover === "function") {
    try {
      el.hidePopover();
    } catch {
      // not open
    }
  }
}

type DropdownItem = {
  href: string;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
};

/**
 * One navbar dropdown. In the wide layout the list is an `auto` popover opened
 * on hover/click; in the narrow layout it is an inline disclosure inside the
 * mobile menu. The Navbar toggles the popover attribute when the layout changes.
 */
function NavDropdown({
  label,
  items,
  active,
  pathname,
  isWideRef,
  compact = false,
  footer,
}: {
  label: string;
  items: DropdownItem[];
  active: boolean;
  pathname: string;
  isWideRef: React.RefObject<boolean>;
  compact?: boolean;
  footer?: React.ReactNode;
}) {
  const listId = `nav-dd-${useId().replace(/:/g, "")}`;
  const liRef = useRef<HTMLLIElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const hoverPreviewRef = useRef(false);
  const [expanded, setExpanded] = useState(false);

  // Reset when the layout switches between wide and narrow
  useEffect(() => {
    const header = liRef.current?.closest(".site-header");
    if (!header) return;
    const onLayout = () => {
      hoverPreviewRef.current = false;
      setExpanded(false);
    };
    header.addEventListener(LAYOUT_EVENT, onLayout);
    return () => header.removeEventListener(LAYOUT_EVENT, onLayout);
  }, []);

  // Popover toggle listener + placement fallback without anchor positioning
  useEffect(() => {
    const list = listRef.current;
    const trigger = triggerRef.current;
    if (!list || !trigger) return;
    const handleToggle = (event: Event) => {
      const open = (event as ToggleEvent).newState === "open";
      setExpanded(open);
      if (!open) hoverPreviewRef.current = false;
      if (
        open &&
        isWideRef.current &&
        typeof CSS !== "undefined" &&
        !CSS.supports("position-area", "block-end")
      ) {
        const t = trigger.getBoundingClientRect();
        const m = list.getBoundingClientRect();
        let top = t.bottom + 8;
        if (top + m.height > window.innerHeight - 12) {
          top = Math.max(12, t.top - m.height - 8);
        }
        const left = Math.max(12, Math.min(t.left, window.innerWidth - m.width - 12));
        list.style.top = `${top}px`;
        list.style.left = `${left}px`;
      }
    };
    list.addEventListener("toggle", handleToggle);
    return () => list.removeEventListener("toggle", handleToggle);
  }, [isWideRef]);

  // Close on navigation
  useEffect(() => {
    hidePopover(listRef.current);
    if (listRef.current && !isWideRef.current) {
      listRef.current.hidden = true;
      setExpanded(false);
    }
  }, [pathname, isWideRef]);

  const onTriggerClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const list = listRef.current;
    if (!list) return;
    if (isWideRef.current) {
      // Clicking while hover-previewing pins it open instead of closing
      if (hoverPreviewRef.current) {
        hoverPreviewRef.current = false;
        e.preventDefault();
      }
      return;
    }
    e.preventDefault();
    const nextHidden = !list.hidden;
    list.hidden = nextHidden;
    setExpanded(!nextHidden);
  };

  const onPointerEnter = (e: React.PointerEvent<HTMLLIElement>) => {
    if (
      !isWideRef.current ||
      e.pointerType === "touch" ||
      !window.matchMedia("(hover: hover)").matches
    ) {
      return;
    }
    const list = listRef.current;
    const trigger = triggerRef.current;
    if (!list || !trigger) return;
    if (!list.matches(":popover-open") && typeof list.showPopover === "function") {
      hoverPreviewRef.current = true;
      try {
        (list.showPopover as (opts?: { source?: Element }) => void)({ source: trigger });
      } catch {
        try {
          list.showPopover();
        } catch {
          // ignore
        }
      }
    }
  };

  const onPointerLeave = () => {
    if (!isWideRef.current || !hoverPreviewRef.current) return;
    hoverPreviewRef.current = false;
    hidePopover(listRef.current);
  };

  const onFocusOut = (e: React.FocusEvent<HTMLLIElement>) => {
    if (!isWideRef.current) return;
    const next = e.relatedTarget as Node | null;
    if (next && liRef.current && !liRef.current.contains(next)) {
      hoverPreviewRef.current = false;
      hidePopover(listRef.current);
    }
  };

  return (
    <li
      ref={liRef}
      className="nav-dropdown relative"
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onBlur={onFocusOut}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={expanded}
        aria-controls={listId}
        popoverTarget={listId}
        onClick={onTriggerClick}
        className={`nav-link nav-dropdown-trigger flex w-full items-center justify-between gap-1 rounded-full px-2.5 py-2 text-sm font-semibold transition-colors hover:bg-primary-soft hover:text-primary-deep ${
          active ? "bg-primary-soft font-bold text-primary-deep" : "text-foreground/85"
        }`}
      >
        <span>{label}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      <ul
        ref={listRef}
        id={listId}
        className={`dropdown-list mt-1 space-y-1 pl-2 sm:mt-0 sm:pl-0 ${compact ? "dropdown-compact" : ""}`}
      >
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              className="group flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-primary-soft"
            >
              {item.icon && (
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-soft group-hover:bg-white">
                  {item.icon}
                </span>
              )}
              <span className="min-w-0 self-center whitespace-normal">
                <span className="block text-sm font-semibold text-ink-deep group-hover:text-primary-deep">
                  {item.title}
                </span>
                {item.subtitle && (
                  <span className="block text-xs text-muted-foreground line-clamp-1">
                    {item.subtitle}
                  </span>
                )}
              </span>
            </Link>
          </li>
        ))}
        {footer}
      </ul>
    </li>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const { lang } = useLang();
  const navLang = lang;
  // Pages that have their own quote form (#quote) on the page itself
  const hasLeadForm = /^\/(homes|housing-society|commercial|on-grid-solar-system|off-grid-solar-system|solar-company-in-|contact)/.test(pathname);
  const offerings = offeringsNav[navLang];
  const solutions = solutionsNav[navLang];
  const labels = NAV_LABELS[navLang];
  const { SERVICES, COMPANY_INFO } = useContent();

  const baseId = useId().replace(/:/g, "");
  const menuId = `site-menu-${baseId}`;

  const headerRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  const [isWide, setIsWide] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const lastHeaderWidthRef = useRef(0);
  const isWideRef = useRef(false);

  // Conditionally load popover polyfill only when native support is missing
  useEffect(() => {
    if (
      typeof HTMLElement !== "undefined" &&
      !Object.hasOwn(HTMLElement.prototype, "popover")
    ) {
      import("@oddbird/popover-polyfill").catch(() => {});
    }
  }, []);

  // Scroll-driven header fallback for browsers without animation-timeline: scroll()
  useEffect(() => {
    if (
      typeof CSS !== "undefined" &&
      CSS.supports("(animation-timeline: scroll()) and (animation-range: 0% 100%)")
    ) {
      return;
    }
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Responsive single-tree measurement: inline menu when it fits, popover menu otherwise
  useEffect(() => {
    const header = headerRef.current;
    const inner = innerRef.current;
    const menu = menuRef.current;
    if (!header || !inner || !menu) return;

    const lists = () => Array.from(header.querySelectorAll<HTMLUListElement>(".dropdown-list"));

    const syncLayout = (force = false) => {
      const currentWidth = header.clientWidth;
      if (!force && !isWideRef.current && currentWidth <= lastHeaderWidthRef.current) {
        return;
      }
      lastHeaderWidthRef.current = currentWidth;

      const wasMenuOpen =
        menu.matches(":popover-open") || menu.classList.contains(":popover-open");

      header.classList.add("is-measuring");
      header.classList.add("is-wide");
      menu.removeAttribute("popover");
      for (const list of lists()) {
        list.setAttribute("popover", "auto");
        list.hidden = false;
      }

      const fits = inner.scrollWidth <= inner.clientWidth + 1;
      isWideRef.current = fits;
      setIsWide(fits);

      if (fits) {
        header.classList.add("is-wide");
        menu.removeAttribute("popover");
      } else {
        header.classList.remove("is-wide");
        menu.setAttribute("popover", "auto");
        for (const list of lists()) {
          list.removeAttribute("popover");
          list.hidden = true;
        }
        if (wasMenuOpen && typeof menu.showPopover === "function") {
          try {
            menu.showPopover();
          } catch {
            // ignore if already shown
          }
        }
      }
      header.dispatchEvent(new Event(LAYOUT_EVENT));

      requestAnimationFrame(() => header.classList.remove("is-measuring"));
    };

    syncLayout(true);

    const ro = new ResizeObserver(() => syncLayout(false));
    ro.observe(header);
    ro.observe(menu);
    return () => ro.disconnect();
    // Re-measure when the language changes: Bangla labels have different widths
  }, [navLang]);

  // Close the mobile menu on navigation
  useEffect(() => {
    hidePopover(menuRef.current);
  }, [pathname]);

  const offeringItems: DropdownItem[] = offerings.items.map(([title, href]) => ({
    href,
    title,
    icon: GD_ICONS[href],
  }));
  const solutionItems: DropdownItem[] = solutions.items.map(([title, href]) => ({
    href,
    title,
    icon: GD_ICONS[href],
  }));
  const serviceItems: DropdownItem[] = SERVICES.map((svc) => ({
    href: `/service/${svc.slug}`,
    title: svc.title,
    subtitle: `${svc.highlightMetric} · ${svc.highlightLabel}`,
    icon: SERVICE_ICONS[svc.slug],
  }));

  return (
    <header
      ref={headerRef}
      className={`site-header ${isWide ? "is-wide" : ""} ${isScrolled ? "is-scrolled" : ""}`}
    >
      <div ref={innerRef} className="header-inner">
        <Link
          href="/"
          className="rounded-xl py-1 focus-visible:outline-primary"
          aria-label="Green Dhaka home"
        >
          <BrandLogo />
        </Link>

        <nav className="site-nav flex items-center gap-2" aria-label="Primary">
          <button
            className="menu-button inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-2 text-sm font-semibold text-ink-deep shadow-card transition-colors hover:border-primary/40 hover:bg-primary-soft"
            type="button"
            popoverTarget={menuId}
            popoverTargetAction="toggle"
            aria-controls={menuId}
          >
            <Menu className="h-4 w-4 text-primary-deep" aria-hidden="true" />
            <span>{labels.menu}</span>
          </button>

          <ul
            ref={menuRef}
            id={menuId}
            className="site-menu"
            {...({ popover: "auto" } as Record<string, string>)}
          >
            <li>
              <Link
                href="/"
                aria-current={pathname === "/" ? "page" : undefined}
                className={NAV_LINK}
              >
                {navLang === "bn" ? "হোম" : "Home"}
              </Link>
            </li>

            <NavDropdown
              label={offerings.label}
              items={offeringItems}
              active={offerings.items.some(([, href]) => pathname === href)}
              pathname={pathname}
              isWideRef={isWideRef}
              compact
            />

            <NavDropdown
              label={solutions.label}
              items={solutionItems}
              active={solutions.items.some(([, href]) => pathname === href)}
              pathname={pathname}
              isWideRef={isWideRef}
              compact
            />

            <li>
              <Link
                href="/cities"
                aria-current={
                  pathname === "/cities" || pathname.startsWith("/solar-company-in")
                    ? "page"
                    : undefined
                }
                className={NAV_LINK}
              >
                {citiesNav[navLang]}
              </Link>
            </li>

            <NavDropdown
              label={labels.services}
              items={serviceItems}
              active={pathname.startsWith("/service")}
              pathname={pathname}
              isWideRef={isWideRef}
              footer={
                <li className="col-span-full mt-1 border-t border-border pt-2">
                  <Link
                    href="/service"
                    className="flex items-center justify-between rounded-xl px-3 py-2 text-xs font-bold text-primary-deep transition-colors hover:bg-primary-soft"
                  >
                    <span>{labels.allServices(SERVICES.length)}</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </li>
              }
            />

            <li>
              <Link
                href="/solar-calculator"
                aria-current={pathname === "/solar-calculator" ? "page" : undefined}
                className={NAV_LINK}
              >
                {labels.calculator}
              </Link>
            </li>

            <li>
              <Link
                href="/about-us"
                aria-current={pathname === "/about-us" ? "page" : undefined}
                className={NAV_LINK}
              >
                {labels.about}
              </Link>
            </li>

            <li>
              <Link
                href="/blog"
                aria-current={pathname.startsWith("/blog") ? "page" : undefined}
                className={NAV_LINK}
              >
                {labels.blog}
              </Link>
            </li>

            <li>
              <Link
                href="/contact"
                aria-current={pathname === "/contact" ? "page" : undefined}
                className={NAV_LINK}
              >
                {labels.contact}
              </Link>
            </li>

            <li className="mt-2 flex items-center gap-2 border-t border-border pt-2.5 lg:mt-0 lg:border-0 lg:pt-0 lg:pl-2">
              <a
                href={COMPANY_INFO.phoneHref}
                className="hidden items-center gap-1.5 rounded-full border border-border bg-card px-3 py-2 text-xs font-semibold text-ink-deep transition-colors hover:border-primary/40 hover:text-primary-deep 2xl:inline-flex"
              >
                <PhoneCall className="h-3.5 w-3.5 text-primary-deep" aria-hidden="true" />
                <span className="font-mono">{COMPANY_INFO.phone}</span>
              </a>
              <Link
                href={hasLeadForm ? "#quote" : "/contact#quote"}
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-brand-gradient px-3.5 py-2.5 text-sm font-bold text-primary-foreground shadow-glow transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0 lg:w-auto"
              >
                <span>{navLang === "bn" ? "ফ্রি কোটেশন নিন" : "Get a free quote"}</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </li>
          </ul>
          <LangToggle />
        </nav>
      </div>
    </header>
  );
}
