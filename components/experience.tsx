"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { FiArrowUpRight } from "react-icons/fi";

import { Eyebrow, Reveal, RevealText } from "@/components/ui/motion";
import { experience, profile } from "@/data/portfolio";

export function Experience() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 70%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section id="experience" className="relative py-28 sm:py-40">
      <div className="container-x grid gap-14 lg:grid-cols-[0.85fr_1.6fr] lg:gap-20">
        <div>
          <div className="lg:sticky lg:top-28">
            <Eyebrow index="03">Experience</Eyebrow>
            <RevealText
              text="Where I've *built.*"
              className="mt-8 text-[clamp(2.6rem,6vw,5rem)] font-semibold leading-[0.92] tracking-[-0.05em]"
            />
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-fg-2">
                Four engineering roles while studying full-time — from React interfaces to owning entire AI systems
                end to end.
              </p>
              <a
                href={profile.resume}
                target="_blank"
                rel="noreferrer"
                className="group mt-8 inline-flex items-center gap-2 border-b border-volt/50 pb-1 text-[14px] font-medium text-volt"
              >
                Full résumé
                <FiArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Reveal>
          </div>
        </div>

        <ol ref={listRef} className="relative">
          <span className="absolute bottom-2 left-[7px] top-2 w-px bg-line" aria-hidden />
          <motion.span
            className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-gradient-to-b from-volt via-iris to-aqua"
            style={{ scaleY }}
            aria-hidden
          />
          {experience.map((job, i) => (
            <li key={job.company} className="relative pb-14 pl-12 last:pb-0">
              <motion.span
                className="absolute left-0 top-1.5 grid h-[15px] w-[15px] place-items-center rounded-full border border-white/20 bg-ink"
                initial={{ scale: 0.6, borderColor: "rgba(255,255,255,0.2)" }}
                whileInView={{ scale: 1, borderColor: "rgba(200,255,61,0.9)" }}
                viewport={{ margin: "-40% 0px -40% 0px" }}
                transition={{ duration: 0.4 }}
                aria-hidden
              >
                <span className={`h-[5px] w-[5px] rounded-full ${job.current ? "animate-pulse-dot bg-volt" : "bg-white/40"}`} />
              </motion.span>

              <Reveal delay={i * 0.03}>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-fg-3">
                  <span>{job.period}</span>
                  <span className="h-px w-4 bg-white/15" />
                  <span>{job.place}</span>
                  {job.current && (
                    <span className="rounded-full border border-volt/30 bg-volt/10 px-2 py-0.5 text-volt">now</span>
                  )}
                </div>
                <h3 className="mt-3 text-[clamp(1.6rem,3vw,2.4rem)] font-semibold leading-tight tracking-[-0.03em]">
                  {job.company}
                </h3>
                <div className="mt-1 text-[15px] text-fg-2">{job.role}</div>
                <ul className="mt-5 space-y-2.5">
                  {job.points.map((p) => (
                    <li key={p} className="flex gap-3 text-[15px] leading-relaxed text-fg-2">
                      <span className="mt-[10px] h-px w-3 shrink-0 bg-volt/70" />
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {job.tags.map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
