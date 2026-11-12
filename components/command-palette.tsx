"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState, type ComponentType } from "react";
import {
  FiArrowRight,
  FiBriefcase,
  FiCode,
  FiCopy,
  FiFileText,
  FiGithub,
  FiHome,
  FiLinkedin,
  FiMail,
  FiSearch,
  FiStar,
} from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";

import { useSite } from "@/components/site-context";
import { caseStudies, profile } from "@/data/portfolio";
import { cn, scrollToHash } from "@/lib/utils";

type Cmd = {
  id: string;
  label: string;
  group: string;
  icon: ComponentType<{ className?: string }>;
  hint?: string;
  run: () => void;
};

export function CommandPalette() {
  const { paletteOpen: open, setPaletteOpen: setOpen, setAiOpen } = useSite();
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands = useMemo<Cmd[]>(() => {
    const go = (hash: string) => () => scrollToHash(hash);
    const open = (url: string) => () => window.open(url, "_blank", "noopener,noreferrer");
    return [
      { id: "ai", label: "Ask my AI twin a question", group: "Actions", icon: HiSparkles, hint: "AI", run: () => setAiOpen(true) },
      {
        id: "copy",
        label: "Copy email address",
        group: "Actions",
        icon: FiCopy,
        run: () => {
          navigator.clipboard?.writeText(profile.email).catch(() => {});
          setToast("Email copied");
        },
      },
      { id: "mail", label: "Send an email", group: "Actions", icon: FiMail, run: () => (window.location.href = `mailto:${profile.email}`) },
      { id: "resume", label: "Open résumé", group: "Actions", icon: FiFileText, run: open(profile.resume) },
      { id: "top", label: "Home", group: "Navigate", icon: FiHome, run: go("#top") },
      { id: "work", label: "Selected work", group: "Navigate", icon: FiStar, run: go("#work") },
      ...caseStudies.map((c) => ({
        id: c.id,
        label: `Case study: ${c.title}`,
        group: "Navigate",
        icon: FiArrowRight,
        hint: c.company,
        run: go(`#${c.id}`),
      })),
      { id: "exp", label: "Experience", group: "Navigate", icon: FiBriefcase, run: go("#experience") },
      { id: "proj", label: "Side projects", group: "Navigate", icon: FiCode, run: go("#projects") },
      { id: "contact", label: "Contact", group: "Navigate", icon: FiMail, run: go("#contact") },
      { id: "gh", label: "GitHub", group: "Elsewhere", icon: FiGithub, hint: "↗", run: open(profile.github) },
      { id: "li", label: "LinkedIn", group: "Elsewhere", icon: FiLinkedin, hint: "↗", run: open(profile.linkedin) },
      {
        id: "src",
        label: "View this site's source",
        group: "Elsewhere",
        icon: FiCode,
        hint: "↗",
        run: open("https://github.com/akanshalakhina/portfolio"),
      },
    ];
  }, [setAiOpen]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return commands;
    return commands.filter((c) => `${c.label} ${c.group} ${c.hint ?? ""}`.toLowerCase().includes(s));
  }, [q, commands]);

  // Global shortcut: ⌘K / Ctrl+K, or "/" when not typing.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = /input|textarea/i.test((e.target as HTMLElement)?.tagName ?? "");
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        setOpen(!open);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  useEffect(() => {
    if (open) {
      setQ("");
      setIdx(0);
      window.__lenis?.stop();
      setTimeout(() => inputRef.current?.focus(), 30);
    } else {
      window.__lenis?.start();
    }
  }, [open]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 1600);
    return () => clearTimeout(t);
  }, [toast]);

  const run = (c?: Cmd) => {
    if (!c) return;
    setOpen(false);
    setTimeout(c.run, 120);
  };

  let lastGroup = "";

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-start justify-center bg-ink/70 px-4 pt-[14vh] backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Command menu"
              className="w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-ink-2 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.9)]"
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 border-b border-line px-4">
                <FiSearch className="text-fg-3" />
                <input
                  ref={inputRef}
                  value={q}
                  onChange={(e) => {
                    setQ(e.target.value);
                    setIdx(0);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown") {
                      e.preventDefault();
                      setIdx((i) => Math.min(filtered.length - 1, i + 1));
                    } else if (e.key === "ArrowUp") {
                      e.preventDefault();
                      setIdx((i) => Math.max(0, i - 1));
                    } else if (e.key === "Enter") {
                      e.preventDefault();
                      run(filtered[idx]);
                    }
                  }}
                  placeholder="Type a command or search…"
                  className="h-14 flex-1 bg-transparent text-[15px] text-fg outline-none placeholder:text-fg-3"
                  aria-label="Search commands"
                />
                <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-fg-3">esc</kbd>
              </div>
              <ul className="max-h-[52vh] overflow-y-auto p-2" data-lenis-prevent>
                {filtered.length === 0 && <li className="px-3 py-8 text-center text-[14px] text-fg-3">No results.</li>}
                {filtered.map((c, i) => {
                  const header = c.group !== lastGroup ? c.group : null;
                  lastGroup = c.group;
                  const Icon = c.icon;
                  return (
                    <li key={c.id}>
                      {header && <div className="px-3 pb-1.5 pt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-fg-3">{header}</div>}
                      <button
                        onMouseEnter={() => setIdx(i)}
                        onClick={() => run(c)}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[14px] transition-colors",
                          i === idx ? "bg-white/[0.07] text-fg" : "text-fg-2",
                        )}
                      >
                        <Icon className={cn("h-4 w-4", i === idx ? "text-volt" : "text-fg-3")} />
                        <span className="flex-1">{c.label}</span>
                        {c.hint && <span className="font-mono text-[10px] text-fg-3">{c.hint}</span>}
                      </button>
                    </li>
                  );
                })}
              </ul>
              <div className="flex items-center justify-between border-t border-line px-4 py-2.5 font-mono text-[10px] text-fg-3">
                <span>↑↓ navigate · ↵ select</span>
                <span>
                  <span className="text-volt">⌘K</span> anywhere
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            className="fixed bottom-6 left-1/2 z-[85] -translate-x-1/2 rounded-full bg-volt px-4 py-2 font-mono text-[12px] font-semibold text-ink"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
