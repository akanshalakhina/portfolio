"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";

import { Eyebrow, Reveal, RevealText, Spotlight } from "@/components/ui/motion";
import { profile, sideProjects, type SideProject } from "@/data/portfolio";

function Generative({ title }: { title: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-ink-3">
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse at center, black 20%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 20%, transparent 75%)",
        }}
      />
      <motion.div
        className="absolute -left-1/4 -top-1/4 h-[90%] w-[90%] rounded-full bg-iris/40 blur-[70px]"
        animate={{ x: ["0%", "30%", "0%"], y: ["0%", "20%", "0%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-1/4 -right-1/4 h-[80%] w-[80%] rounded-full bg-volt/25 blur-[70px]"
        animate={{ x: ["0%", "-25%", "0%"], y: ["0%", "-15%", "0%"] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 grid place-items-center">
        <span className="font-serif text-[clamp(3rem,7vw,5rem)] italic tracking-tight text-white/90">{title}</span>
      </div>
    </div>
  );
}

function Card({ p, i }: { p: SideProject; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [7, -7]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [0, 1], [-9, 9]), { stiffness: 200, damping: 20 });
  const primary = p.live ?? p.code;

  return (
    <Reveal delay={(i % 3) * 0.08}>
      <motion.div
        ref={ref}
        style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse") return;
          const r = ref.current!.getBoundingClientRect();
          mx.set((e.clientX - r.left) / r.width);
          my.set((e.clientY - r.top) / r.height);
        }}
        onPointerLeave={() => {
          mx.set(0.5);
          my.set(0.5);
        }}
        className="group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-line bg-ink-2 transition-colors duration-500 hover:border-white/20"
      >
        <Spotlight />
        <a
          href={primary}
          target="_blank"
          rel="noreferrer"
          data-cursor={p.live ? "Live" : "Code"}
          className="relative block aspect-[16/10] overflow-hidden"
          aria-label={`${p.title} — open ${p.live ? "live site" : "source code"}`}
        >
          {p.img ? (
            <Image
              src={p.img}
              alt={`${p.title} screenshot`}
              fill
              sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 90vw"
              className="object-cover object-top transition duration-700 group-hover:scale-[1.05]"
            />
          ) : (
            <Generative title={p.title} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink-2 via-transparent to-transparent" />
          {p.badge && (
            <span className="absolute left-3 top-3 rounded-full bg-volt px-2.5 py-1 font-mono text-[10px] font-semibold text-ink">
              {p.badge}
            </span>
          )}
        </a>

        <div className="relative flex flex-1 flex-col p-6">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-xl font-semibold tracking-tight">{p.title}</h3>
            <div className="flex shrink-0 gap-1">
              <a
                href={p.code}
                target="_blank"
                rel="noreferrer"
                aria-label={`${p.title} source code`}
                className="grid h-8 w-8 place-items-center rounded-full border border-line text-fg-2 transition hover:bg-fg hover:text-ink"
              >
                <FiGithub className="h-3.5 w-3.5" />
              </a>
              {p.live && (
                <a
                  href={p.live}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${p.title} live site`}
                  className="grid h-8 w-8 place-items-center rounded-full border border-line text-fg-2 transition hover:bg-volt hover:text-ink"
                >
                  <FiArrowUpRight className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>
          <p className="mt-2 flex-1 text-[14px] leading-relaxed text-fg-2">{p.blurb}</p>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {p.stack.map((s) => (
              <span key={s} className="chip !text-[10px]">
                {s}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </Reveal>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative py-28 sm:py-36">
      <div className="container-x">
        <Eyebrow index="04">Side projects</Eyebrow>
        <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
          <RevealText
            text="Built for *fun* — and hackathons."
            className="max-w-[16ch] text-[clamp(2.6rem,6vw,5rem)] font-semibold leading-[0.92] tracking-[-0.05em]"
          />
          <Reveal delay={0.15}>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-[13px] font-medium transition hover:bg-fg hover:text-ink"
            >
              <FiGithub /> More on GitHub
              <FiArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sideProjects.map((p, i) => (
            <Card key={p.title} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
