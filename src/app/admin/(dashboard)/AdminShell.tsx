"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useSyncExternalStore, type ReactNode } from "react";
import { ChevronRight, Earth, ExternalLink, LogOut, Menu, PanelLeftClose, PanelLeftOpen, X } from "lucide-react";
import { logout } from "../actions";
import { adminIcon } from "./admin-icons";
import { Avatar } from "./AdminUI";

type NavigationGroup = {
  label: string;
  items: { id: string; label: string; href: string }[];
};

// Desktop sidebar collapse preference, kept in localStorage (per browser).
const COLLAPSE_KEY = "gd-admin-sidebar-collapsed";
const collapseListeners = new Set<() => void>();
const collapseStore = {
  subscribe(cb: () => void) { collapseListeners.add(cb); return () => collapseListeners.delete(cb); },
  get() { try { return localStorage.getItem(COLLAPSE_KEY) === "1"; } catch { return false; } },
  set(value: boolean) {
    try { localStorage.setItem(COLLAPSE_KEY, value ? "1" : "0"); } catch { /* storage unavailable */ }
    collapseListeners.forEach((cb) => cb());
  },
};

export function AdminShell({ email, groups, children }: { email: string; groups: NavigationGroup[]; children: ReactNode }) {
  const pathname = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  const menu = useRef<HTMLButtonElement>(null);
  const collapsed = useSyncExternalStore(collapseStore.subscribe, collapseStore.get, () => false);

  const activeGroup = groups.find(({ items }) => items.some(({ href }) =>
    pathname === href || (href !== "/admin" && pathname.startsWith(href + "/"))));
  const active = activeGroup?.items.find(({ href }) =>
    pathname === href || (href !== "/admin" && pathname.startsWith(href + "/")));

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 801px)");
    const closeDrawer = () => { if (desktop.matches) dialog.current?.close(); };
    desktop.addEventListener("change", closeDrawer);
    return () => desktop.removeEventListener("change", closeDrawer);
  }, []);

  function navigation(drawer: boolean) {
    const close = () => dialog.current?.close();
    return (
      <>
        <div className="admin-brand-row">
          <Link className="admin-brand" href="/admin" onClick={close} aria-label="Green Dhaka admin home">
            <Image src="/images/gd/green-dhaka-logo.png" alt="" width={730} height={330} className="admin-brand-logo" priority />
            <span className="admin-brand-mark" aria-hidden="true">GD</span>
            <span className="admin-brand-badge">Admin</span>
          </Link>
        </div>

        <nav className="admin-nav" aria-label="Admin navigation">
          {groups.map(({ label, items }) => (
            <section key={label} aria-label={label}>
              <p className="admin-nav-heading">{label}</p>
              {items.map(({ id, label, href }) => {
                const Icon = adminIcon(id);
                return (
                  <Link key={id} href={href} className="admin-nav-link" data-label={label}
                    aria-current={active?.id === id ? "page" : undefined} onClick={close}>
                    <span className="admin-nav-icon"><Icon size={17} aria-hidden="true" /></span>
                    <span className="admin-nav-text">{label}</span>
                  </Link>
                );
              })}
            </section>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <Link className="admin-nav-link" href="/" data-label="View website" target="_blank">
            <span className="admin-nav-icon"><Earth size={17} aria-hidden="true" /></span>
            <span className="admin-nav-text">View website</span>
          </Link>
          {!drawer && (
            <button type="button" className="admin-nav-link admin-collapse-toggle" data-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              aria-pressed={collapsed} onClick={() => collapseStore.set(!collapsed)}>
              <span className="admin-nav-icon">
                {collapsed ? <PanelLeftOpen size={17} aria-hidden="true" /> : <PanelLeftClose size={17} aria-hidden="true" />}
              </span>
              <span className="admin-nav-text">Collapse sidebar</span>
            </button>
          )}
          <div className="admin-user-card">
            <Avatar name={email} size={36} />
            <span className="admin-user-meta"><strong>Administrator</strong><small title={email}>{email}</small></span>
            <form action={logout}>
              <button type="submit" className="admin-icon-button" aria-label="Sign out" title="Sign out">
                <LogOut size={17} aria-hidden="true" />
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="admin-shell" data-collapsed={collapsed || undefined}>
      <a className="admin-skip" href="#main-content">Skip to content</a>
      <aside className="admin-sidebar">{navigation(false)}</aside>
      <dialog ref={dialog} className="admin-drawer" id="admin-menu" aria-label="Admin menu"
        onClose={() => menu.current?.focus()}
        onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
        <div className="admin-drawer-body">
          <button type="button" className="admin-drawer-close" aria-label="Close menu" onClick={() => dialog.current?.close()}>
            <X size={20} aria-hidden="true" />
          </button>
          {navigation(true)}
        </div>
      </dialog>
      <div className="admin-workspace">
        <header className="admin-topbar">
          <button ref={menu} type="button" className="admin-menu-toggle" aria-label="Open menu" aria-controls="admin-menu"
            aria-haspopup="dialog" onClick={() => dialog.current?.showModal()}><Menu size={20} aria-hidden="true" /></button>
          <nav className="admin-breadcrumb" aria-label="Breadcrumb">
            <ol>
              <li><Link href="/admin">Admin</Link></li>
              {activeGroup && activeGroup.label !== "Workspace" && (
                <li><ChevronRight size={14} aria-hidden="true" /><span>{activeGroup.label}</span></li>
              )}
              {active && active.id !== "overview" && (
                <li><ChevronRight size={14} aria-hidden="true" />
                  <Link href={active.href} aria-current={pathname === active.href ? "page" : undefined}>{active.label}</Link></li>
              )}
            </ol>
          </nav>
          <div className="admin-topbar-actions">
            <Link className="admin-button admin-button-ghost admin-topbar-site" href="/" target="_blank">
              <ExternalLink size={15} aria-hidden="true" /> <span>View site</span>
            </Link>
            <span className="admin-topbar-user" title={email}><Avatar name={email} size={34} /></span>
          </div>
        </header>
        <main id="main-content" tabIndex={-1} className="admin-main">
          <div key={pathname} className="admin-page">{children}</div>
        </main>
      </div>
    </div>
  );
}
