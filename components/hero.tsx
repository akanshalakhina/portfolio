"use client";

import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { FiArrowDownRight, FiGithub, FiLinkedin } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";

import { useSite } from "@/components/site-context";
import { Magnetic } from "@/components/ui/motion";
import { experience, heroRoles, profile } from "@/data/portfolio";

const NeuralCore = dynamic(() => import("@/components/three/neural-core"), { ssr: false });

const EASE = [0.22, 1, 0.36, 1] as const;

function Letters({ word, delay, play, className }: { word: string; delay: number; play: boolean; className?: string }) {
  return (
    <span className={`block overflow-hidden pb-[0.08em] ${className ?? ""}`} aria-hidden>
      {word.split("").map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block will-change-transform"
          initial={{ y: "110%", rotate: 8 }}
          animate={play ? { y: "0%", rotate: 0 } : undefined}
          transition={{ duration: 1.1, delay: delay + i * 0.045, ease: EASE }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

function useIndiaTime() {
  const [time, setTime] = useState<string>("");
  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata",
      }).format(new Date());
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 20_000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export function Hero() {
  const { booted, setAiOpen } = useSite();
  const sectionRef = useRef<HTMLElement>(null);
  const scroll = useRef(0);
  const [visible, setVisible] = useState(true);
  const [role, setRole] = useState(0);
  const time = useIndiaTime();

  useEffect(() => {
    const onScroll = () => {
      scroll.current = Math.min(1.2, window.scrollY / window.innerHeight);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0 });
    if (sectionRef.current) io.observe(sectionRef.current);
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    const id = setInterval(() => setRole((r) => (r + 1) % heroRoles.length), 2600);
    return () => clearInterval(id);
  }, []);

  const d = 0.15;
  const current = experience.filter((j) => j.current).map((j) => j.company);

  return (
    <section ref={sectionRef} id="top" className="relative isolate min-h-[100svh] overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_72%_42%,rgba(91,75,255,0.20),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(30%_30%_at_70%_45%,rgba(200,255,61,0.07),transparent_70%)]" />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(ellipse 70% 60% at 60% 40%, black 30%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 60% 40%, black 30%, transparent 75%)",
          }}
        />
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: booted ? 1 : 0 }}
          transition={{ duration: 1.6, delay: 0.1 }}
        >
          <NeuralCore scroll={scroll} active={visible} />
        </motion.div>
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-ink" />
      </div>

      <div className="container-x relative flex min-h-[100svh] flex-col justify-end pb-10 pt-28 sm:pb-14">
        {profile.status && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={booted ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.8, delay: d, ease: EASE }}
            className="mb-6 inline-flex w-fit items-center gap-2.5 rounded-full border border-volt/25 bg-volt/[0.06] px-3.5 py-1.5 font-mono text-[11px] text-volt backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-volt opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-volt" />
            </span>
            {profile.status}
          </motion.div>
        )}

        <h1
          className="select-none text-[clamp(4.2rem,18vw,13.5rem)] font-semibold leading-[0.84] tracking-[-0.055em] text-fg"
          aria-label={profile.name}
        >
          <Letters word={profile.first} delay={d + 0.05} play={booted} />
          <Letters
            word={profile.last}
            delay={d + 0.3}
            play={booted}
            className="pl-[0.12em] font-serif font-normal italic tracking-[-0.03em] text-transparent [-webkit-text-stroke:1.5px_rgba(237,237,242,0.85)] sm:pl-[0.9em]"
          />
        </h1>

        <div className="mt-8 grid items-end gap-10 lg:grid-cols-[1.25fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={booted ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 1, delay: d + 0.7, ease: EASE }}
          >
            <p className="text-[clamp(1.25rem,2.2vw,1.75rem)] font-medium leading-snug tracking-tight text-fg">
              AI & full-stack engineer building{" "}
              <span className="relative flex h-[1.35em] overflow-hidden sm:inline-flex sm:min-w-[12ch] sm:align-bottom">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={role}
                    className="whitespace-nowrap font-serif text-[1.12em] italic text-volt"
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.55, ease: EASE }}
                  >
                    {heroRoles[role]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </p>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-fg-2 sm:text-base">
              {profile.summary} Amazon Future Engineer Scholar · B.Tech CS ’27 · 9.7 CGPA.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Magnetic>
                <a
                  href="#work"
                  className="group flex items-center gap-2 rounded-full bg-volt px-6 py-3.5 text-[14px] font-semibold text-ink shadow-[0_0_40px_-8px_rgba(200,255,61,0.6)] transition-shadow hover:shadow-[0_0_60px_-6px_rgba(200,255,61,0.8)]"
                >
                  See the work
                  <FiArrowDownRight className="transition-transform duration-300 group-hover:rotate-[-45deg]" />
                </a>
              </Magnetic>
              <Magnetic>
                <button
                  onClick={() => setAiOpen(true)}
                  className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3.5 text-[14px] font-medium text-fg backdrop-blur transition hover:border-iris/60 hover:bg-iris/10"
                >
                  <HiSparkles className="text-iris" /> Ask my AI twin
                </button>
              </Magnetic>
              <div className="ml-1 flex items-center gap-1">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="grid h-11 w-11 place-items-center rounded-full text-fg-2 transition hover:bg-white/5 hover:text-fg"
                >
                  <FiGithub className="h-[18px] w-[18px]" />
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="grid h-11 w-11 place-items-center rounded-full text-fg-2 transition hover:bg-white/5 hover:text-fg"
                >
                  <FiLinkedin className="h-[18px] w-[18px]" />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={booted ? { opacity: 1 } : undefined}
            transition={{ duration: 1, delay: d + 1 }}
            className="hidden grid-cols-3 gap-6 border-t border-line pt-5 font-mono text-[11px] lg:grid"
          >
            <div>
              <dt className="text-fg-3">NOW</dt>
              <dd className="mt-1.5 text-fg">{current.join(" · ")}</dd>
            </div>
            <div>
              <dt className="text-fg-3">BEFORE</dt>
              <dd className="mt-1.5 text-fg">Samriddhi AI</dd>
            </div>
            <div>
              <dt className="text-fg-3">LOCAL</dt>
              <dd className="mt-1.5 text-fg" suppressHydrationWarning>
                {profile.location.split(",")[0]} · {time || "—"}
              </dd>
            </div>
          </motion.dl>
        </div>
      </div>

      <motion.div
        aria-hidden
        className="absolute bottom-6 right-6 hidden items-center gap-3 font-mono text-[10px] tracking-[0.3em] text-fg-3 sm:flex"
        initial={{ opacity: 0 }}
        animate={booted ? { opacity: 1 } : undefined}
        transition={{ delay: d + 1.4 }}
        style={{ writingMode: "vertical-rl" }}
      >
        SCROLL
        <span className="relative h-14 w-px overflow-hidden bg-white/10">
          <motion.span
            className="absolute left-0 top-0 h-1/2 w-full bg-volt"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
