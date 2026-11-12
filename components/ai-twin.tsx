"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { FiArrowUp, FiX } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";

import { useSite } from "@/components/site-context";
import { localAnswer, SUGGESTIONS } from "@/lib/twin";
import { cn } from "@/lib/utils";

type Msg = { role: "user" | "ai"; text: string };

async function ask(question: string, history: Msg[]): Promise<string> {
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: question, history: history.slice(-6) }),
    });
    if (!res.ok) throw new Error(String(res.status));
    const data = (await res.json()) as { reply?: string };
    if (!data.reply) throw new Error("empty");
    return data.reply;
  } catch {
    return localAnswer(question);
  }
}

export function AiTwin() {
  const { aiOpen: open, setAiOpen: setOpen, booted } = useSite();
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: "ai",
      text: "Hi — I'm Akansha's AI twin. Ask me what she's built, how she thinks about AI safety, or whether she's open to roles.",
    },
  ]);
  const [typing, setTyping] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 250);
  }, [open]);

  const send = async (text: string) => {
    const q = text.trim().slice(0, 500);
    if (!q || busy) return;
    setInput("");
    setBusy(true);
    const history = [...msgs, { role: "user" as const, text: q }];
    setMsgs(history);
    setTyping("");
    const reply = await ask(q, msgs);
    // Type the reply out for a streaming feel.
    for (let i = 1; i <= reply.length; i += 3) {
      setTyping(reply.slice(0, i));
      await new Promise((r) => setTimeout(r, 12));
    }
    setTyping(null);
    setMsgs([...history, { role: "ai", text: reply }]);
    setBusy(false);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    void send(input);
  };

  return (
    <>
      <AnimatePresence>
        {booted && !open && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ delay: 0.2 }}
            onClick={() => setOpen(true)}
            className="group fixed bottom-5 right-5 z-[70] flex items-center gap-2 rounded-full border border-iris/40 bg-ink-2/90 py-2.5 pl-3 pr-4 text-[13px] font-medium text-fg shadow-[0_10px_40px_-10px_rgba(139,124,255,0.7)] backdrop-blur-xl transition hover:border-iris"
            aria-label="Ask my AI twin"
          >
            <span className="relative grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-iris to-volt text-ink">
              <HiSparkles className="h-3.5 w-3.5" />
              <span className="absolute inset-0 animate-ping rounded-full bg-iris/40" />
            </span>
            Ask my AI
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Chat with Akansha's AI twin"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-3 bottom-3 z-[75] flex h-[min(560px,80svh)] flex-col overflow-hidden rounded-3xl border border-white/10 bg-ink-2/95 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.95)] backdrop-blur-2xl sm:inset-x-auto sm:bottom-5 sm:right-5 sm:w-[400px]"
            data-lenis-prevent
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-iris to-volt text-ink">
                  <HiSparkles />
                </span>
                <div>
                  <div className="text-[14px] font-semibold">Akansha&apos;s AI twin</div>
                  <div className="flex items-center gap-1.5 font-mono text-[10px] text-fg-3">
                    <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-volt" /> answers from her portfolio
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="grid h-8 w-8 place-items-center rounded-full text-fg-2 transition hover:bg-white/5 hover:text-fg"
                aria-label="Close chat"
              >
                <FiX />
              </button>
            </div>

            <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-5">
              {msgs.map((m, i) => (
                <Bubble key={i} m={m} />
              ))}
              {typing !== null && (
                <Bubble m={{ role: "ai", text: typing }} pending={typing.length === 0} />
              )}
              {msgs.length === 1 && typing === null && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => void send(s)}
                      className="rounded-full border border-line bg-white/[0.03] px-3 py-1.5 text-left text-[12px] text-fg-2 transition hover:border-iris/50 hover:text-fg"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form onSubmit={onSubmit} className="border-t border-line p-3">
              <div className="flex items-center gap-2 rounded-2xl border border-line bg-ink px-3 py-1.5 focus-within:border-iris/60">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  maxLength={500}
                  placeholder="Ask anything about Akansha…"
                  className="h-9 flex-1 bg-transparent text-[14px] text-fg outline-none placeholder:text-fg-3"
                  aria-label="Your question"
                />
                <button
                  type="submit"
                  disabled={busy || !input.trim()}
                  className="grid h-8 w-8 place-items-center rounded-xl bg-volt text-ink transition disabled:opacity-30"
                  aria-label="Send"
                >
                  <FiArrowUp />
                </button>
              </div>
              <p className="mt-2 px-1 font-mono text-[9.5px] text-fg-3">
                AI can be imperfect — verify anything important with Akansha directly.
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Bubble({ m, pending }: { m: Msg; pending?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "max-w-[86%] rounded-2xl px-4 py-2.5 text-[13.5px] leading-relaxed",
          m.role === "user" ? "rounded-br-md bg-volt text-ink" : "rounded-bl-md border border-line bg-ink-3 text-fg",
        )}
      >
        {pending ? (
          <span className="flex gap-1 py-1">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="h-1.5 w-1.5 rounded-full bg-fg-2"
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
              />
            ))}
          </span>
        ) : (
          m.text
        )}
      </div>
    </motion.div>
  );
}
