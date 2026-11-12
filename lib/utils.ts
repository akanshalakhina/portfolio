import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type LenisLike = {
  scrollTo: (target: HTMLElement | number, opts?: { offset?: number; duration?: number }) => void;
  stop: () => void;
  start: () => void;
};

declare global {
  interface Window {
    __lenis?: LenisLike;
  }
}

/** Smooth-scroll to an in-page anchor like "#work" (uses Lenis when running). */
export function scrollToHash(hash: string) {
  if (typeof window === "undefined") return;
  if (hash === "#top") {
    if (window.__lenis) window.__lenis.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el = document.querySelector<HTMLElement>(hash);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -24, duration: 1.4 });
  else el.scrollIntoView({ behavior: "smooth" });
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
