"use client";

import { useEffect, useMemo, useRef } from "react";

import { Eyebrow, Reveal, RevealText } from "@/components/ui/motion";
import { skillGroups } from "@/data/portfolio";
import { prefersReducedMotion } from "@/lib/utils";

/** DOM-based 3D tag sphere: crisp text, drag to spin, inertia, pauses off-screen. */
function SkillSphere() {
  const wrap = useRef<HTMLDivElement>(null);
  const tags = useRef<(HTMLSpanElement | null)[]>([]);

  const items = useMemo(() => {
    const seen = new Set<string>();
    const out: { name: string; hot: boolean }[] = [];
    skillGroups.forEach((g, gi) =>
      g.items.forEach((name) => {
        if (seen.has(name)) return;
        seen.add(name);
        out.push({ name, hot: gi === 0 });
      }),
    );
    return out;
  }, []);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const n = items.length;
    const golden = Math.PI * (3 - Math.sqrt(5));
    const base = items.map((_, i) => {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      return [Math.cos(golden * i) * r, y, Math.sin(golden * i) * r] as const;
    });

    let ax = 0.3;
    let ay = 0;
    let vx = 0.0012;
    let vy = 0.0035;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let visible = true;
    let raf = 0;
    const reduced = prefersReducedMotion();

    const render = () => {
      const R = Math.min(el.clientWidth, el.clientHeight) * 0.4;
      const cx = Math.cos(ax);
      const sx = Math.sin(ax);
      const cy = Math.cos(ay);
      const sy = Math.sin(ay);
      base.forEach(([x0, y0, z0], i) => {
        // rotate around Y, then X
        const x1 = x0 * cy + z0 * sy;
        const z1 = -x0 * sy + z0 * cy;
        const y2 = y0 * cx - z1 * sx;
        const z2 = y0 * sx + z1 * cx;
        const depth = (z2 + 1) / 2; // 0 back → 1 front
        const s = 0.55 + depth * 0.65;
        const t = tags.current[i];
        if (!t) return;
        t.style.transform = `translate(-50%, -50%) translate3d(${x1 * R}px, ${y2 * R}px, 0) scale(${s})`;
        t.style.opacity = String(0.18 + depth * 0.82);
        t.style.zIndex = String(Math.round(depth * 100));
        t.style.filter = depth < 0.35 ? `blur(${(0.35 - depth) * 4}px)` : "none";
      });
    };

    const loop = () => {
      if (visible && !dragging && !reduced) {
        ay += vy;
        ax += vx;
        vy += (0.0035 - vy) * 0.02;
        vx += (0.0012 - vx) * 0.02;
      }
      render();
      raf = requestAnimationFrame(loop);
    };

    const down = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      el.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      vy = dx * 0.005;
      vx = -dy * 0.005;
      ay += vy;
      ax += vx;
    };
    const up = () => {
      dragging = false;
    };

    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(el);
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
    };
  }, [items]);

  return (
    <div
      ref={wrap}
      data-cursor="Drag"
      className="relative aspect-square w-full touch-pan-y select-none"
      aria-label="Skills sphere — drag to rotate"
    >
      <div className="absolute inset-[18%] rounded-full bg-[radial-gradient(circle,rgba(139,124,255,0.22),transparent_70%)] blur-2xl" />
      {items.map((it, i) => (
        <span
          key={it.name}
          ref={(node) => {
            tags.current[i] = node;
          }}
          className={`absolute left-1/2 top-1/2 whitespace-nowrap rounded-full border px-3 py-1 text-[13px] font-medium will-change-transform ${
            it.hot ? "border-volt/30 bg-volt/10 text-volt" : "border-white/10 bg-ink-2/80 text-fg"
          }`}
        >
          {it.name}
        </span>
      ))}
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden py-28 sm:py-36">
      <div className="container-x">
        <Eyebrow index="05">Toolkit</Eyebrow>
        <RevealText
          text="The *stack* behind the systems."
          className="mt-8 max-w-[14ch] text-[clamp(2.6rem,6vw,5rem)] font-semibold leading-[0.92] tracking-[-0.05em]"
        />

        <div className="mt-12 grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <SkillSphere />
          </Reveal>
          <div className="grid gap-px overflow-hidden rounded-[24px] border border-line bg-line sm:grid-cols-2">
            {skillGroups.map((g, i) => (
              <Reveal key={g.name} delay={i * 0.05} className="bg-ink">
                <div className="h-full p-6">
                  <div className="label flex items-center gap-2">
                    <span className={i === 0 ? "text-volt" : "text-fg-3"}>0{i + 1}</span> {g.name}
                  </div>
                  <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1.5 text-[14px] text-fg-2">
                    {g.items.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
