"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { FiArrowUpRight, FiCommand, FiMenu, FiX } from "react-icons/fi";

import { useSite } from "@/components/site-context";
import { navLinks, profile } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export function Nav() {
  const { setPaletteOpen, booted } = useSite();
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [menu, setMenu] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 600 && !menu);
    setScrolled(y > 40);
  });

  // Highlight the section currently in view.
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        initial={{ y: -100, opacity: 0 }}
        animate={booted ? { y: hidden ? -100 : 0, opacity: 1 } : { y: -100, opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: booted && !scrolled ? 1.1 : 0 }}
      >
        <motion.div className="absolute left-0 top-0 h-[2px] w-full origin-left bg-volt" style={{ scaleX: progress }} />
        <div className="container-x flex items-center justify-between py-4">
          <a href="#top" aria-label="Back to top" className="group flex items-center gap-3">
            <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-xl border border-line bg-ink-2 font-mono text-[13px] font-bold text-fg">
              <span className="transition-transform duration-500 group-hover:-translate-y-8">AL</span>
              <span className="absolute translate-y-8 text-volt transition-transform duration-500 group-hover:translate-y-0">
                ↑
              </span>
            </span>
            <span className="hidden font-mono text-[12px] text-fg-2 sm:block">
              akansha<span className="text-volt">.</span>dev
            </span>
          </a>

          <nav
            className={cn(
              "hidden items-center gap-1 rounded-full border p-1 transition-colors duration-500 md:flex",
              scrolled ? "border-line bg-ink/70 backdrop-blur-xl" : "border-transparent",
            )}
          >
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={cn(
                  "relative rounded-full px-4 py-2 text-[13px] transition-colors",
                  active === l.href ? "text-ink" : "text-fg-2 hover:text-fg",
                )}
              >
                {active === l.href && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-volt"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{l.label}</span>
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPaletteOpen(true)}
              className="hidden items-center gap-2 rounded-full border border-line bg-ink-2/80 px-3 py-2 font-mono text-[11px] text-fg-2 backdrop-blur transition hover:border-white/20 hover:text-fg sm:flex"
              aria-label="Open command menu"
            >
              <FiCommand className="h-3.5 w-3.5" /> K
            </button>
            <a
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-1.5 rounded-full bg-fg px-4 py-2 text-[13px] font-medium text-ink transition hover:bg-volt sm:flex"
            >
              Résumé <FiArrowUpRight />
            </a>
            <button
              onClick={() => setMenu((m) => !m)}
              className="grid h-10 w-10 place-items-center rounded-full border border-line bg-ink-2/80 backdrop-blur md:hidden"
              aria-label={menu ? "Close menu" : "Open menu"}
              aria-expanded={menu}
            >
              {menu ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menu && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-end bg-ink/95 px-6 pb-12 backdrop-blur-xl md:hidden"
            initial={{ clipPath: "circle(0% at 92% 4%)" }}
            animate={{ clipPath: "circle(150% at 92% 4%)" }}
            exit={{ clipPath: "circle(0% at 92% 4%)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul className="space-y-2">
              {navLinks.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06 }}
                >
                  <a
                    href={l.href}
                    onClick={() => setMenu(false)}
                    className="flex items-baseline gap-4 text-5xl font-semibold tracking-tight"
                  >
                    <span className="font-mono text-xs text-volt">0{i + 1}</span>
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="mt-10 flex gap-3">
              <a href={profile.resume} target="_blank" rel="noreferrer" className="chip !px-4 !py-2 !text-[12px]">
                Résumé ↗
              </a>
              <button
                onClick={() => {
                  setMenu(false);
                  setPaletteOpen(true);
                }}
                className="chip !px-4 !py-2 !text-[12px]"
              >
                Command menu
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
