"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { FiArrowUpRight, FiCheck, FiCopy, FiGithub, FiLinkedin, FiFileText } from "react-icons/fi";

import { Eyebrow, Magnetic, Reveal, RevealText } from "@/components/ui/motion";
import { profile } from "@/data/portfolio";
import { cn } from "@/lib/utils";

type Status = { kind: "idle" | "sending" | "ok" | "error"; msg?: string };

function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || json.success === false) throw new Error(json.error ?? "Something went wrong.");
      form.reset();
      setStatus({ kind: "ok", msg: "Message sent — I'll get back to you soon." });
    } catch (err) {
      setStatus({
        kind: "error",
        msg: `${err instanceof Error ? err.message : "Couldn't send."} You can always email ${profile.email}.`,
      });
    }
  };

  const field =
    "peer w-full rounded-xl border border-line bg-ink px-4 pb-2.5 pt-6 text-[15px] text-fg outline-none transition placeholder:text-transparent focus:border-volt/60 focus:bg-ink-3";
  const label =
    "pointer-events-none absolute left-4 top-2 font-mono text-[10px] uppercase tracking-[0.18em] text-fg-3 transition peer-focus:text-volt";

  return (
    <form onSubmit={submit} className="space-y-3 rounded-[28px] border border-line bg-ink-2/80 p-5 backdrop-blur sm:p-7">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="relative">
          <input id="name" name="name" required maxLength={120} placeholder="Name" className={field} autoComplete="name" />
          <label htmlFor="name" className={label}>
            Name
          </label>
        </div>
        <div className="relative">
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={200}
            placeholder="Email"
            className={field}
            autoComplete="email"
          />
          <label htmlFor="email" className={label}>
            Email
          </label>
        </div>
      </div>
      <div className="relative">
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          maxLength={4000}
          placeholder="Message"
          className={cn(field, "resize-none")}
        />
        <label htmlFor="message" className={label}>
          What are we building?
        </label>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <AnimatePresence mode="wait">
          <motion.p
            key={status.kind}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={cn(
              "max-w-xs font-mono text-[11px]",
              status.kind === "ok" ? "text-volt" : status.kind === "error" ? "text-[#FF8A8A]" : "text-fg-3",
            )}
            role="status"
          >
            {status.msg ?? "Goes straight to my inbox."}
          </motion.p>
        </AnimatePresence>
        <button
          type="submit"
          disabled={status.kind === "sending"}
          className="group flex items-center gap-2 rounded-full bg-volt px-6 py-3 text-[14px] font-semibold text-ink transition hover:shadow-[0_0_40px_-6px_rgba(200,255,61,0.8)] disabled:opacity-60"
        >
          {status.kind === "sending" ? "Sending…" : "Send message"}
          <FiArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </button>
      </div>
    </form>
  );
}

export function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const links = [
    { label: "LinkedIn", href: profile.linkedin, icon: FiLinkedin },
    { label: "GitHub", href: profile.github, icon: FiGithub },
    { label: "Résumé", href: profile.resume, icon: FiFileText },
  ];

  return (
    <section id="contact" className="relative overflow-hidden pb-16 pt-28 sm:pt-40">
      <div
        aria-hidden
        className="absolute bottom-0 left-1/2 -z-10 h-[600px] w-[1100px] -translate-x-1/2 translate-y-1/3 rounded-full bg-[radial-gradient(closest-side,rgba(139,124,255,0.25),transparent)] blur-2xl"
      />
      <div className="container-x">
        <Eyebrow index="07">Contact</Eyebrow>
        <RevealText
          text="Let's build something *intelligent.*"
          className="mt-8 max-w-[12ch] text-[clamp(3rem,9vw,8.5rem)] font-semibold leading-[0.88] tracking-[-0.055em]"
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          <Reveal>
            <p className="max-w-md text-[16px] leading-relaxed text-fg-2">
              I&apos;m looking for software-engineering and AI-engineering roles where I can own hard problems end to
              end. Recruiters, founders and engineers — my inbox is open.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Magnetic strength={0.2}>
                <a
                  href={`mailto:${profile.email}`}
                  className="text-[clamp(1.2rem,2.4vw,1.9rem)] font-medium tracking-tight underline decoration-volt/50 decoration-2 underline-offset-[10px] transition hover:decoration-volt"
                >
                  {profile.email}
                </a>
              </Magnetic>
              <button
                onClick={copy}
                className="grid h-10 w-10 place-items-center rounded-full border border-line text-fg-2 transition hover:border-volt/50 hover:text-volt"
                aria-label="Copy email address"
              >
                {copied ? <FiCheck /> : <FiCopy />}
              </button>
              <AnimatePresence>
                {copied && (
                  <motion.span
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="font-mono text-[11px] text-volt"
                  >
                    copied!
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            <ul className="mt-12 border-b border-line">
              {links.map(({ label, href, icon: Icon }) => (
                <li key={label} className="border-t border-line">
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between py-5 text-xl font-medium tracking-tight transition-colors hover:text-volt"
                  >
                    <span className="flex items-center gap-4">
                      <Icon className="h-5 w-5 text-fg-3 transition-colors group-hover:text-volt" />
                      <span className="transition-transform duration-500 group-hover:translate-x-2">{label}</span>
                    </span>
                    <FiArrowUpRight className="transition-transform duration-500 group-hover:rotate-45" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative border-t border-line">
      <div className="container-x flex flex-col gap-6 py-10 font-mono text-[11px] text-fg-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          © {new Date().getFullYear()} {profile.name} · Designed &amp; engineered by me
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <span>Next.js · React Three Fiber · Framer Motion</span>
          <a href="https://github.com/akanshalakhina/portfolio" target="_blank" rel="noreferrer" className="hover:text-fg">
            Source ↗
          </a>
          <a href="#top" className="hover:text-volt">
            Back to top ↑
          </a>
        </div>
      </div>
      <div aria-hidden className="pointer-events-none select-none overflow-hidden">
        <div className="container-x">
          <div className="translate-y-[18%] whitespace-nowrap text-center text-[19vw] font-semibold leading-none tracking-[-0.07em] text-white/[0.035]">
            akansha
          </div>
        </div>
      </div>
    </footer>
  );
}
