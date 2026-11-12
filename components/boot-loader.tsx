"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { useSite } from "@/components/site-context";
import { prefersReducedMotion } from "@/lib/utils";

const LINES = [
  ["akansha.os", "v2.0"],
  ["spawning agents", "18/18"],
  ["arming guardrails", "ok"],
  ["compiling shaders", "ok"],
  ["portfolio", "ready"],
] as const;

/** One-per-session boot sequence; sets `booted` so the hero can choreograph its entrance. */
export function BootLoader() {
  const { setBooted } = useSite();
  const [show, setShow] = useState(true);
  const [pct, setPct] = useState(0);
  const [skip, setSkip] = useState<boolean | null>(null);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("booted") === "1";
      sessionStorage.setItem("booted", "1");
    } catch {
      /* storage blocked: just play it */
    }
    if (seen || prefersReducedMotion()) {
      setSkip(true);
      setShow(false);
      setBooted(true);
      return;
    }
    setSkip(false);
    document.documentElement.style.overflow = "hidden";

    const start = performance.now();
    const DURATION = 1700;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION);
      const eased = 1 - Math.pow(1 - p, 3);
      setPct(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setTimeout(() => {
          setShow(false);
          setBooted(true);
          document.documentElement.style.overflow = "";
        }, 220);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.style.overflow = "";
    };
  }, [setBooted]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="boot"
          className="fixed inset-0 z-[90] flex flex-col justify-between bg-ink p-6 sm:p-10"
          style={{ visibility: skip === null || skip === false ? "visible" : "hidden" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="space-y-1.5 font-mono text-[12px] text-fg-3 sm:text-[13px]">
            {LINES.map(([k, v], i) => {
              const visible = pct >= i * 20;
              return (
                <div
                  key={k}
                  className="flex max-w-sm justify-between gap-6 transition-opacity duration-200"
                  style={{ opacity: visible ? 1 : 0 }}
                >
                  <span>
                    <span className="text-volt">›</span> {k}
                  </span>
                  <span className={i === LINES.length - 1 ? "text-volt" : "text-fg-2"}>
                    {pct >= i * 20 + 14 ? v : "…"}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-end justify-between">
            <div className="h-px w-1/2 overflow-hidden bg-white/10">
              <div className="h-full bg-volt" style={{ width: `${pct}%` }} />
            </div>
            <div className="font-sans text-[22vw] font-semibold leading-[0.8] tracking-[-0.06em] text-fg sm:text-[14vw]">
              {pct}
              <span className="text-volt">%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
