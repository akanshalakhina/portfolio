"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

import { Counter, Eyebrow, Reveal, ScrollParagraph } from "@/components/ui/motion";
import { education, impact, marquee, profile } from "@/data/portfolio";

export function Marquee() {
  const items = [...marquee, ...marquee];
  return (
    <div className="relative overflow-hidden border-y border-line bg-ink-2/60 py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink to-transparent" />
      <div className="flex w-max animate-marquee items-center gap-10 hover:[animation-play-state:paused]">
        {items.map((m, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap text-[15px] font-medium text-fg-2">
            {m}
            <span className="text-volt">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function About() {
  const photoRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: photoRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section id="about" className="relative py-28 sm:py-40">
      <div className="container-x">
        <Eyebrow index="01">About</Eyebrow>
        <ScrollParagraph
          className="mt-10 max-w-[22ch] text-[clamp(2rem,5.2vw,4.6rem)] font-medium leading-[1.04] tracking-[-0.035em] sm:max-w-[26ch]"
          text="I treat AI like *infrastructure:* orchestrated, tested, observable and cheap to run. In 2026 I shipped *multi-agent* systems and *guard-railed* LLM products for two startups, end to end."
        />

        <div className="mt-20 grid gap-10 lg:mt-28 lg:grid-cols-[0.8fr_1.6fr] lg:gap-16">
          <Reveal>
            <div
              ref={photoRef}
              data-cursor="hi!"
              className="group relative aspect-[4/5] overflow-hidden rounded-[28px] border border-line bg-ink-2"
            >
              <motion.div className="absolute inset-[-10%]" style={{ y }}>
                <Image
                  src={profile.photo}
                  alt={`${profile.name}, smiling`}
                  fill
                  sizes="(min-width: 1024px) 32vw, 90vw"
                  className="object-cover object-[50%_30%] grayscale contrast-[1.1] transition duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
              <div className="absolute inset-0 bg-iris/20 mix-blend-color transition-opacity duration-700 group-hover:opacity-0" />
              <div className="absolute inset-x-5 bottom-5 flex items-end justify-between">
                <div>
                  <div className="text-lg font-semibold">{profile.name}</div>
                  <div className="font-mono text-[11px] text-fg-2">{profile.location}</div>
                </div>
                <div className="rounded-full border border-white/15 bg-ink/60 px-3 py-1 font-mono text-[10px] text-fg-2 backdrop-blur">
                  she/her
                </div>
              </div>
            </div>
          </Reveal>

          <div className="flex flex-col justify-between gap-12">
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[28px] border border-line bg-line">
              {impact.map((s, i) => (
                <Reveal key={s.label} delay={i * 0.08} className="bg-ink">
                  <div className="flex h-full flex-col justify-between gap-8 p-6 sm:p-8">
                    <span className="font-mono text-[11px] text-fg-3">0{i + 1}</span>
                    <div>
                      <Counter
                        value={s.value}
                        decimals={"decimals" in s ? s.decimals : 0}
                        prefix={"prefix" in s ? s.prefix : ""}
                        suffix={s.suffix}
                        className="block text-[clamp(2.6rem,6vw,5rem)] font-semibold leading-none tracking-[-0.05em] text-fg"
                      />
                      <div className="mt-3 text-[15px] font-medium text-fg">{s.label}</div>
                      <div className="mt-1 font-mono text-[11px] text-fg-3">{s.note}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <div className="flex flex-col gap-4 rounded-[28px] border border-line bg-ink-2/60 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
                <div>
                  <div className="label">Education</div>
                  <div className="mt-2 text-lg font-semibold">{education.degree}</div>
                  <div className="text-[14px] text-fg-2">
                    {education.school} · {education.period}
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-semibold tracking-tight text-volt">{education.grade}</span>
                  <span className="font-mono text-[11px] text-fg-3">/ 10 CGPA</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
