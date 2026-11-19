"use client";

import { createContext, useContext, useEffect, useSyncExternalStore, type ReactNode } from "react";

export type Lang = "en" | "bn";
/** A piece of content available in both languages. */
export type Bi<T> = Record<Lang, T>;

type LangState = { lang: Lang; setLang: (l: Lang) => void };
type SiteCopy = Record<string, Bi<string>>;
const CopyContext = createContext<SiteCopy>({});

const STORAGE_KEY = "gd-lang";

const listeners = new Set<() => void>();
let current: Lang | null = null;

function readInitial(): Lang {
  let stored: string | null = null;
  try {
    stored = localStorage.getItem(STORAGE_KEY);
  } catch {
    /* storage unavailable */
  }
  if (stored === "bn" || stored === "en") return stored;
  return (navigator.language || "").toLowerCase().startsWith("bn") ? "bn" : "en";
}

const store = {
  subscribe(cb: () => void) {
    listeners.add(cb);
    return () => listeners.delete(cb);
  },
  getSnapshot(): Lang {
    if (current === null) current = readInitial();
    return current;
  },
  // Server and hydration render are always English; the visitor's stored or
  // browser language is applied right after hydration.
  getServerSnapshot(): Lang {
    return "en";
  },
  set(l: Lang) {
    current = l;
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* storage unavailable */
    }
    listeners.forEach((cb) => cb());
  },
};

const LangContext = createContext<LangState>({ lang: "en", setLang: () => {} });

export function LanguageProvider({ children, copy = {} }: { children: ReactNode; copy?: SiteCopy }) {
  const lang = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot);

  useEffect(() => {
    document.documentElement.lang = lang === "bn" ? "bn" : "en";
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang: store.set }}>
      <CopyContext.Provider value={copy}>{children}</CopyContext.Provider>
    </LangContext.Provider>
  );
}

export function useLang(): LangState {
  return useContext(LangContext);
}

/** Returns a picker: t("English", "বাংলা") gives the string for the active language. */
export function useT() {
  const { lang } = useLang();
  const copy = useContext(CopyContext);
  return (en: string, bn: string, copyKey?: string) =>
    (copyKey ? copy[copyKey]?.[lang] : undefined) ?? (lang === "bn" ? bn : en);
}

/**
 * Inline bilingual text, usable inside Server Components:
 * <T en="Get a quote" bn="কোটেশন নিন" />
 */
export function T({ en, bn, copyKey }: { en: string; bn: string; copyKey?: string }) {
  return <>{useT()(en, bn, copyKey)}</>;
}

/** Fixed-size toggle shown in the header on every page. */
export function LangToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLang();
  return (
    <button
      type="button"
      onClick={() => setLang(lang === "en" ? "bn" : "en")}
      aria-label={lang === "en" ? "বাংলায় দেখুন" : "View in English"}
      className={`shrink-0 rounded-full border border-border bg-card px-3.5 py-2 text-xs font-bold whitespace-nowrap text-foreground transition hover:border-primary hover:text-primary-deep ${className}`}
    >
      {lang === "en" ? "বাংলা" : "English"}
    </button>
  );
}
