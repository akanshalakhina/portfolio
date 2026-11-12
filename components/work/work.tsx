"use client";

import { motion } from "framer-motion";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";

import { Eyebrow, Reveal, RevealText } from "@/components/ui/motion";
import { AgentGraph } from "@/components/work/agent-graph";
import { GuardrailDemo } from "@/components/work/guardrail-demo";
import { PlatformStack } from "@/components/work/platform-stack";
import { caseStudies, type CaseStudy } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const VISUALS = {
  agents: AgentGraph,
  guardrails: GuardrailDemo,
  platform: PlatformStack,
} as const;

function Case({ cs, flip }: { cs: CaseStudy; flip: boolean }) {
  const Visual = VISUALS[cs.visual];
  return (
    <article id={cs.id} className="container-x relative grid gap-10 py-16 lg:grid-cols-2 lg:gap-20 lg:py-24">
      {/* Visual — sticky while the story scrolls */}
      <div className={cn("relative", flip && "lg:order-last")}>
        <div className="lg:sticky lg:top-[11vh]">
          <div
            aria-hidden
            className="absolute -inset-10 -z-10 rounded-full opacity-30 blur-[90px]"
            style={{ background: `radial-gradient(closest-side, ${cs.accent}, transparent)` }}
          />
          <Reveal y={40}>
            <div className="relative h-[560px] overflow-hidden rounded-[28px] border border-line bg-ink-2/90 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] backdrop-blur sm:h-[640px] lg:h-[78vh] lg:max-h-[760px]">
              <Visual />
            </div>
          </Reveal>
        </div>
      </div>

      {/* Story */}
      <div className="lg:py-[6vh]">
        <Reveal>
          <div className="flex flex-wrap items-center gap-3">
            <span
              className="font-mono text-6xl font-bold leading-none text-transparent sm:text-7xl"
              style={{ WebkitTextStroke: `1px ${cs.accent}` }}
            >
              {cs.index}
            </span>
            <div className="flex flex-col gap-1">
              <span className="chip w-fit" style={{ color: cs.accent, borderColor: `${cs.accent}44` }}>
                {cs.company}
              </span>
              <span className="font-mono text-[11px] text-fg-3">{cs.period}</span>
            </div>
          </div>
        </Reveal>

        <RevealText
          as="h3"
          text={cs.title}
          className="mt-8 text-[clamp(2.4rem,5vw,4.2rem)] font-semibold leading-[0.95] tracking-[-0.045em]"
        />
        <Reveal delay={0.1}>
          <div className="mt-3 font-mono text-[12px] text-fg-3">{cs.role}</div>
          <p className="mt-6 text-[clamp(1.05rem,1.4vw,1.25rem)] leading-relaxed text-fg">{cs.tagline}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 rounded-2xl border border-line bg-white/[0.02] p-5">
            <div className="label">The problem</div>
            <p className="mt-2 text-[15px] leading-relaxed text-fg-2">{cs.problem}</p>
          </div>
        </Reveal>

        <div className="mt-10">
          <div className="label mb-4">What I built</div>
          <ol className="space-y-0">
            {cs.built.map((b, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <li className="group flex gap-4 border-t border-line py-4 text-[15px] leading-relaxed text-fg-2 transition-colors hover:text-fg">
                  <span className="mt-1 font-mono text-[11px]" style={{ color: cs.accent }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{b}</span>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal>
          <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
            {cs.metrics.map((m) => (
              <div key={m.label} className="bg-ink p-4">
                <div className="text-2xl font-semibold tracking-tight" style={{ color: cs.accent }}>
                  {m.value}
                </div>
                <div className="mt-1 font-mono text-[10px] leading-snug text-fg-3">{m.label}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-8 flex flex-wrap gap-1.5">
            {cs.stack.map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {cs.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-[13px] font-medium transition hover:border-transparent hover:bg-fg hover:text-ink"
              >
                <FiGithub /> {l.label}
                <FiArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </article>
  );
}

export function Work() {
  return (
    <section id="work" className="relative overflow-x-clip pt-16 sm:pt-24">
      <div className="container-x">
        <Eyebrow index="02">Selected work</Eyebrow>
        <div className="mt-8 grid items-end gap-8 lg:grid-cols-[1.4fr_1fr]">
          <RevealText
            text="Production AI, *shipped* — not demoed."
            className="text-[clamp(2.6rem,7vw,6.2rem)] font-semibold leading-[0.92] tracking-[-0.05em]"
          />
          <Reveal delay={0.2}>
            <p className="max-w-md text-[15px] leading-relaxed text-fg-2">
              Three systems I built at two startups in 2026. Each panel is an interactive replay of how the real system
              behaves, with the engineering story beside it.
            </p>
          </Reveal>
        </div>
      </div>

      {caseStudies.map((cs, i) => (
        <div key={cs.id} className="relative">
          {i > 0 && <div className="container-x"><div className="hairline" /></div>}
          <Case cs={cs} flip={i % 2 === 1} />
        </div>
      ))}

      <motion.div
        className="container-x pb-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <p className="font-mono text-[11px] text-fg-3">
          Screenshots show demo-tenant data. Replays are animations of the real pipelines, not recordings.
        </p>
      </motion.div>
    </section>
  );
}
