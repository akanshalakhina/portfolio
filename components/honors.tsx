"use client";

import { motion } from "framer-motion";

import { Counter, Eyebrow, Reveal, RevealText, Spotlight } from "@/components/ui/motion";
import { certifications, honors } from "@/data/portfolio";

/** A field of dots with one lit — "selected from 40,000+". */
function OneInMany() {
  const cols = 34;
  const rows = 14;
  const lit = 7 * cols + 23;
  return (
    <div
      className="grid gap-[5px] opacity-80"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      aria-hidden
    >
      {Array.from({ length: cols * rows }).map((_, i) =>
        i === lit ? (
          <motion.span
            key={i}
            className="aspect-square rounded-full bg-volt"
            animate={{ boxShadow: ["0 0 0px #C8FF3D", "0 0 18px 4px #C8FF3D", "0 0 0px #C8FF3D"] }}
            transition={{ duration: 2.4, repeat: Infinity }}
          />
        ) : (
          <span key={i} className="aspect-square rounded-full bg-white/[0.09]" />
        ),
      )}
    </div>
  );
}

export function Honors() {
  const [afe, ...rest] = honors;
  return (
    <section id="honors" className="relative py-28 sm:py-36">
      <div className="container-x">
        <Eyebrow index="06">Recognition</Eyebrow>
        <RevealText
          text="Picked from the *crowd.*"
          className="mt-8 text-[clamp(2.6rem,6vw,5rem)] font-semibold leading-[0.92] tracking-[-0.05em]"
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-4">
          <Reveal className="lg:col-span-2 lg:row-span-2">
            <div className="group relative flex h-full flex-col justify-between gap-10 overflow-hidden rounded-[24px] border border-line bg-ink-2 p-7 sm:p-9">
              <Spotlight />
              <div>
                <div className="label text-volt">{afe.org}</div>
                <h3 className="mt-3 text-[clamp(1.8rem,3.4vw,2.8rem)] font-semibold leading-tight tracking-[-0.035em]">
                  {afe.title}
                </h3>
                <p className="mt-3 max-w-md text-[15px] leading-relaxed text-fg-2">{afe.detail}</p>
              </div>
              <OneInMany />
              <div className="flex items-end justify-between gap-4">
                <div>
                  <Counter value={40000} suffix="+" className="text-[clamp(2.8rem,6vw,4.5rem)] font-semibold leading-none tracking-[-0.05em]" />
                  <div className="mt-2 font-mono text-[11px] text-fg-3">applicants · women in tech</div>
                </div>
                <span className="font-serif text-2xl italic text-volt">1 of them.</span>
              </div>
            </div>
          </Reveal>

          {rest.map((h, i) => (
            <Reveal key={h.title} delay={0.05 * (i + 1)} className={i === 2 ? "lg:col-span-2" : undefined}>
              <div className="group relative flex h-full min-h-[190px] flex-col justify-between overflow-hidden rounded-[24px] border border-line bg-ink-2 p-7">
                <Spotlight color="rgba(139,124,255,0.14)" />
                <div className="label">{h.org}</div>
                <div>
                  <h3 className="mt-6 text-2xl font-semibold tracking-tight">{h.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-fg-2">{h.detail}</p>
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal className="lg:col-span-4">
            <div className="rounded-[24px] border border-line bg-ink-2 p-7">
              <div className="label">Certifications</div>
              <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
                {certifications.map((c) => (
                  <li key={c.name} className="flex items-baseline justify-between gap-4 border-t border-line pt-3">
                    <span className="text-[14px] text-fg">{c.name}</span>
                    <span className="shrink-0 font-mono text-[10px] text-fg-3">{c.org}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
