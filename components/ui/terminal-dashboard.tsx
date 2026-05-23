"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CommandLog {
  command: string;
  output: React.ReactNode;
}

export const TerminalDashboard = () => {
  const [inputVal, setInputVal] = useState("");
  const [logs, setLogs] = useState<CommandLog[]>([]);
  const [activeTab, setActiveTab] = useState<"status" | "skills" | "achievements">("status");
  const [cursorBlink, setCursorBlink] = useState(true);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorBlink((b) => !b);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Scroll to bottom of terminal logs
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  // Initial sequence
  useEffect(() => {
    setLogs([
      {
        command: "system-init",
        output: (
          <div className="text-emerald-400 space-y-1 font-mono text-xs">
            <p>✦ Initializing Developer Console...</p>
            <p>✦ Resolving environment for Akansha Lakhina...</p>
            <p className="text-purple-400">✓ MERN Stack Engine active</p>
            <p className="text-purple-400">✓ Amazon Scholar Fellowship loaded</p>
            <p className="text-purple-400">✓ Aspire Leaders Program active</p>
            <p className="text-white mt-1">Ready. Type a command or click quick tabs below.</p>
          </div>
        ),
      },
    ]);
  }, []);

  const handleCommand = (cmdText: string) => {
    const trimmed = cmdText.trim().toLowerCase();
    let reply: React.ReactNode;

    switch (trimmed) {
      case "help":
        reply = (
          <div className="text-neutral-300 font-mono text-xs space-y-1">
            <p className="text-purple">Available commands:</p>
            <p>• <span className="text-emerald-400 font-semibold">skills</span> : Display technical expertise levels</p>
            <p>• <span className="text-emerald-400 font-semibold">achievements</span> : Hackathons and awards list</p>
            <p>• <span className="text-emerald-400 font-semibold">status</span> : Current role & contact links</p>
            <p>• <span className="text-emerald-400 font-semibold">clear</span> : Reset the console output</p>
          </div>
        );
        break;
      case "skills":
        reply = (
          <div className="space-y-2 font-mono text-xs text-neutral-300">
            <p className="text-purple font-semibold">✦ Technical Competency Chart ✦</p>
            <div className="space-y-1">
              <div>
                <div className="flex justify-between text-[10px]">
                  <span>Frontend (Next.js, React, Tailwind)</span>
                  <span className="text-emerald-400">95%</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-purple to-emerald-400 h-full w-[95%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px]">
                  <span>Backend (Node.js, Express, FastAPI)</span>
                  <span className="text-emerald-400">90%</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-purple to-emerald-400 h-full w-[90%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px]">
                  <span>Databases & Cloud (MongoDB, Postgres, AWS)</span>
                  <span className="text-emerald-400">85%</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-purple to-emerald-400 h-full w-[85%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px]">
                  <span>Core Languages (Java, Python, Javascript)</span>
                  <span className="text-emerald-400">92%</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-purple to-emerald-400 h-full w-[92%]" />
                </div>
              </div>
            </div>
          </div>
        );
        break;
      case "achievements":
        reply = (
          <div className="space-y-1 font-mono text-xs text-neutral-300">
            <p className="text-purple font-semibold">🏆 Key Laurels & Scholastic Honors</p>
            <p>• <span className="text-gold font-bold">Amazon Future Engineer Scholar</span> (Top 40k Fellowship)</p>
            <p>• <span className="text-emerald-400">GDG Solution Challenge Finalist</span> (Top 10 regionals)</p>
            <p>• <span className="text-emerald-400">VibeMate Hackathon Winner</span> (Top 5 Finisher)</p>
            <p>• <span className="text-purple-300">Aspire Leaders Global Fellow</span> (Harvard-backed leadership)</p>
          </div>
        );
        break;
      case "status":
        reply = (
          <div className="space-y-1 font-mono text-xs text-neutral-300">
            <p className="text-purple font-semibold">⚡ Current Developer Status</p>
            <p>📍 Location: New Delhi, India</p>
            <p>💻 Current Internship: Full-Stack Developer @ TechVision Digital</p>
            <p>📧 Email: akanshalakhina2004@gmail.com</p>
            <p>✓ Status: Open to high-impact software engineering roles</p>
          </div>
        );
        break;
      case "clear":
        setLogs([]);
        setInputVal("");
        return;
      default:
        reply = (
          <p className="text-rose-400 font-mono text-xs">
            Unknown command: &apos;{trimmed}&apos;. Type <span className="underline font-bold text-white">help</span> for commands.
          </p>
        );
    }

    setLogs((prev) => [...prev, { command: cmdText, output: reply }]);
    setInputVal("");
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    handleCommand(inputVal);
  };

  const handleQuickClick = (tab: "status" | "skills" | "achievements") => {
    setActiveTab(tab);
    handleCommand(tab);
  };

  return (
    <div className="w-full h-full min-h-[400px] flex flex-col bg-slate-950/80 border border-white/[0.08] backdrop-blur-xl rounded-3xl p-5 shadow-2xl relative overflow-hidden">
      {/* Top terminal title bar */}
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.05] mb-4">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-rose-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          <span className="text-[10px] text-neutral-400 font-mono ml-2">akansha-lakhina ~ zsh</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[9px] text-emerald-400 font-mono uppercase tracking-wider">online</span>
        </div>
      </div>

      {/* Terminal logs content */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-1 scrollbar-thin scrollbar-thumb-white/10 max-h-[320px] md:max-h-[380px]">
        <AnimatePresence mode="popLayout">
          {logs.map((log, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-1.5"
            >
              <div className="flex items-center text-xs font-mono text-purple-400 font-bold select-none">
                <span>$ akansha &gt;&nbsp;</span>
                <span className="text-white">{log.command}</span>
              </div>
              <div className="pl-4">{log.output}</div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={terminalEndRef} />
      </div>

      {/* Quick interactive tabs */}
      <div className="grid grid-cols-3 gap-2.5 mb-4">
        {(["status", "skills", "achievements"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => handleQuickClick(tab)}
            className={`py-2 px-1 text-center font-mono text-[10px] rounded-lg border uppercase tracking-wider cursor-pointer select-none transition-all duration-200 ${
              activeTab === tab
                ? "bg-purple/20 border-purple text-purple font-bold"
                : "bg-slate-900/50 border-white/[0.05] text-neutral-400 hover:bg-slate-900 hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Command prompt form */}
      <form onSubmit={handleFormSubmit} className="flex items-center gap-2 mt-auto">
        <span className="text-xs font-mono text-emerald-400 font-bold select-none">$</span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Type a command (e.g. 'help', 'skills', 'clear')..."
          className="flex-1 bg-slate-900/70 border border-white/[0.06] rounded-xl py-2 px-4 text-xs font-mono text-white outline-none focus:border-purple/50 focus:bg-slate-900 transition-all placeholder:text-neutral-500"
        />
        <button
          type="submit"
          className="bg-purple/80 hover:bg-purple border border-purple/30 text-white font-mono text-xs py-2 px-4 rounded-xl cursor-pointer active:scale-95 transition-all select-none dark:text-black"
        >
          EXECUTE
        </button>
      </form>
    </div>
  );
};
