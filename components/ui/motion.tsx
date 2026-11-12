"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState, type PropsWithChildren, type ReactNode } from "react";

import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Fade + rise when scrolled into view. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: PropsWithChildren<{ delay?: number; y?: number; className?: string }>) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Word-by-word masked reveal for headings. Wrap a word in *asterisks* to set it in the italic serif. */
export function RevealText({
  text,
  className,
  delay = 0,
  as: Tag = "h2",
  play,
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  play?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  const show = play ?? inView;
  const words = text.split(" ");
  return (
    <Tag ref={ref as never} className={className} aria-label={text.replace(/\*/g, "")}>
      {words.map((w, i) => {
        const serif = w.startsWith("*") && w.replace(/[.,!?]$/, "").endsWith("*");
        const clean = w.replace(/\*/g, "");
        return (
          <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.12em] align-top -mb-[0.12em]">
            <motion.span
              className={cn("inline-block", serif && "font-serif font-normal italic tracking-normal text-volt")}
              initial={{ y: "110%" }}
              animate={show ? { y: "0%" } : { y: "110%" }}
              transition={{ duration: 1, delay: delay + i * 0.06, ease: EASE }}
            >
              {clean}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        );
      })}
    </Tag>
  );
}

/** A paragraph whose words light up as it scrolls through the viewport. */
export function ScrollParagraph({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className} aria-label={text.replace(/\*/g, "")}>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} word={w} />
      ))}
    </p>
  );
}

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const highlight = word.startsWith("*");
  const clean = word.replace(/\*/g, "");
  return (
    <motion.span
      aria-hidden
      style={{ opacity }}
      className={cn(highlight && "font-serif italic text-volt")}
    >
      {clean}{" "}
    </motion.span>
  );
}

/** Pulls its child toward the pointer — used for primary buttons. */
export function Magnetic({ children, strength = 0.35, className }: PropsWithChildren<{ strength?: number; className?: string }>) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });
  return (
    <motion.div
      ref={ref}
      className={cn("inline-block", className)}
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/** Counts up to `value` the first time it scrolls into view. */
export function Counter({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, value]);
  const formatted = display.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

/** Small mono eyebrow used above every section title. */
export function Eyebrow({ index, children }: { index: string; children: ReactNode }) {
  return (
    <div className="label flex items-center gap-3">
      <span className="text-volt">{index}</span>
      <span className="h-px w-8 bg-white/15" />
      <span>{children}</span>
    </div>
  );
}

/** Mouse-following spotlight for cards. Put `group relative overflow-hidden` on the parent. */
export function Spotlight({ color = "rgba(200,255,61,0.10)", size = 380 }: { color?: string; size?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current?.parentElement;
    if (!el) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      ref.current!.style.setProperty("--x", `${e.clientX - r.left}px`);
      ref.current!.style.setProperty("--y", `${e.clientY - r.top}px`);
    };
    el.addEventListener("pointermove", move);
    return () => el.removeEventListener("pointermove", move);
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      style={{
        background: `radial-gradient(${size}px circle at var(--x, 50%) var(--y, 50%), ${color}, transparent 70%)`,
      }}
    />
  );
}
