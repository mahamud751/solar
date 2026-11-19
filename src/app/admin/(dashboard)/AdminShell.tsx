"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";
import {
  BookOpen, CircleHelp, CircuitBoard, Earth, FileText, GalleryHorizontalEnd, Images, Inbox, Languages,
  LayoutDashboard, LayoutTemplate, LogOut, MapPin, Menu, MessageSquareQuote, PlugZap, ScanSearch,
  Settings, Sun, X, Zap, type LucideIcon,
} from "lucide-react";
import { logout } from "../actions";

const icons: Record<string, LucideIcon> = {
  overview: LayoutDashboard, inquiries: Inbox, media: Images, services: Zap, articles: BookOpen,
  faqs: CircleHelp, testimonials: MessageSquareQuote, aerial: GalleryHorizontalEnd, brands: CircuitBoard,
  utilities: PlugZap, cities: MapPin, settings: Settings, blocks: LayoutTemplate, copy: Languages, seo: ScanSearch,
};

type NavigationGroup = {
  label: string;
  items: { id: string; label: string; href: string }[];
};

export function AdminShell({ email, groups, children }: { email: string; groups: NavigationGroup[]; children: ReactNode }) {
  const pathname = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  const menu = useRef<HTMLButtonElement>(null);
  const active = groups.flatMap(({ items }) => items).find(({ href }) =>
    pathname === href || (href !== "/admin" && pathname.startsWith(href + "/")));

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 801px)");
    const closeDrawer = () => { if (desktop.matches) dialog.current?.close(); };
    desktop.addEventListener("change", closeDrawer);
    return () => desktop.removeEventListener("change", closeDrawer);
  }, []);

  function navigation() {
    return (
      <>
        <Link className="admin-brand" href="/admin" onClick={() => dialog.current?.close()}>
          <span className="admin-brand-icon"><Sun aria-hidden="true" size={23} /></span>
          <span><strong>Green Dhaka</strong><small>Solar admin</small></span>
        </Link>
        <nav className="admin-nav" aria-label="Admin navigation">
          {groups.map(({ label, items }) => (
            <section key={label} aria-label={label}>
              <p className="admin-nav-heading">{label}</p>
              {items.map(({ id, label, href }) => {
                const Icon = icons[id] ?? FileText;
                return (
                  <Link key={id} href={href} className="admin-nav-link" aria-current={active?.id === id ? "page" : undefined}
                    onClick={() => dialog.current?.close()}>
                    <Icon size={17} aria-hidden="true" /> <span>{label}</span>
                  </Link>
                );
              })}
            </section>
          ))}
        </nav>
        <div className="admin-sidebar-footer">
          <Link className="admin-nav-link" href="/"><Earth size={17} aria-hidden="true" /> View website</Link>
          <form action={logout}><button type="submit" className="admin-nav-link"><LogOut size={17} aria-hidden="true" /> Sign out</button></form>
        </div>
      </>
    );
  }

  return (
    <div className="admin-shell">
      <a className="admin-skip" href="#main-content">Skip to content</a>
      <aside className="admin-sidebar">{navigation()}</aside>
      <dialog ref={dialog} className="admin-drawer" id="admin-menu" aria-label="Admin menu"
        onClose={() => menu.current?.focus()}
        onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
        <div className="admin-drawer-body">
          <button type="button" className="admin-drawer-close" aria-label="Close menu" onClick={() => dialog.current?.close()}>
            <X size={20} aria-hidden="true" />
          </button>
          {navigation()}
        </div>
      </dialog>
      <div className="admin-workspace">
        <header className="admin-topbar">
          <button ref={menu} type="button" className="admin-menu-toggle" aria-label="Open menu" aria-controls="admin-menu"
            aria-haspopup="dialog" onClick={() => dialog.current?.showModal()}><Menu size={22} aria-hidden="true" /></button>
          <span className="admin-topbar-location">{active?.label ?? "Admin"}</span>
          <div className="admin-account"><span className="admin-avatar" aria-hidden="true">{email.charAt(0).toUpperCase()}</span><span>{email}</span></div>
        </header>
        <main id="main-content" tabIndex={-1} className="admin-main">
          <div className="admin-page">{children}</div>
        </main>
      </div>
    </div>
  );
}
