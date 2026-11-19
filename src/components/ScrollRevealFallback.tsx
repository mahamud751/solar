"use client";

import { useEffect } from "react";

/**
 * Progressive IntersectionObserver fallback for .reveal-on-scroll elements
 * strictly when CSS Scroll-Driven Animations (view() + animation-range) are unsupported
 * and the user has no reduced-motion preference.
 */
export function ScrollRevealFallback() {
  useEffect(() => {
    if (typeof window === "undefined" || typeof CSS === "undefined") return;

    const supportsViewTimeline = CSS.supports(
      "(animation-timeline: view()) and (animation-range: entry)"
    );
    const wantsMotion = window.matchMedia(
      "(prefers-reduced-motion: no-preference)"
    ).matches;

    if (supportsViewTimeline || !wantsMotion) return;

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(
        "main .reveal-on-scroll, main :is(.rounded-2xl, .rounded-3xl).shadow-card:not(.rise, .marquee-track *)"
      )
    );
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const target = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            target.style.opacity = "1";
            target.style.transform = "translateY(0)";
            observer.unobserve(target);
          }
        }
      },
      { threshold: 0.12 }
    );

    for (const el of elements) {
      // Skip anything already on screen at load so nothing visible flashes away
      if (el.getBoundingClientRect().top < window.innerHeight) continue;
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "opacity 0.55s ease-out, transform 0.55s ease-out";
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return null;
}
