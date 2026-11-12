"use client";

import { useEffect } from "react";

import { profile } from "@/data/portfolio";

/** A hello for the engineers who open DevTools. */
export function ConsoleEgg() {
  useEffect(() => {
    const big = "font: 600 22px/1.4 system-ui; color: #C8FF3D;";
    const body = "font: 13px/1.6 ui-monospace, monospace; color: #A6A6B4;";
    // eslint-disable-next-line no-console
    console.log(
      `%c👋 Hey, engineer.\n%cYou're reading the console, so we'd probably get along.\nThis site: Next.js 14 · React Three Fiber (custom GLSL) · Framer Motion · Lenis.\nSource: https://github.com/akanshalakhina/portfolio\nSay hi: ${profile.email}`,
      big,
      body,
    );
  }, []);
  return null;
}
