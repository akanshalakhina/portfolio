"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-full bg-white/10 animate-pulse" />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative w-10 h-10 rounded-full flex items-center justify-center overflow-hidden cursor-pointer group transition-all duration-300 hover:scale-110 active:scale-95"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "Day" : "Night"} mode`}
      style={{
        background: isDark
          ? "linear-gradient(135deg, #1a1a3e 0%, #2d1b69 100%)"
          : "linear-gradient(135deg, #87CEEB 0%, #FFD700 100%)",
        border: isDark
          ? "1.5px solid rgba(203, 172, 249, 0.4)"
          : "1.5px solid rgba(3, 35, 75, 0.15)",
        boxShadow: isDark
          ? "0 0 12px rgba(203, 172, 249, 0.2), inset 0 1px 1px rgba(255,255,255,0.1)"
          : "0 0 12px rgba(255, 209, 0, 0.25), inset 0 1px 1px rgba(255,255,255,0.5)",
      }}
    >
      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.div
            key="moon"
            initial={{ rotate: -90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex items-center justify-center"
          >
            {/* Moon Icon */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                fill="#CBACF9"
                stroke="#CBACF9"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {/* Tiny stars */}
            <motion.div
              className="absolute top-1 right-1.5 w-1 h-1 rounded-full bg-[#CBACF9]/60"
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-2 left-1.5 w-0.5 h-0.5 rounded-full bg-white/50"
              animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
            />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ rotate: 90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="relative flex items-center justify-center"
          >
            {/* Sun Icon */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="4" fill="#FF8C00" stroke="#FF8C00" strokeWidth="1.5" />
              <path
                d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41"
                stroke="#FF8C00"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            {/* Sun rays animation */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              style={{
                background:
                  "conic-gradient(from 0deg, transparent, rgba(255, 140, 0, 0.1), transparent, rgba(255, 140, 0, 0.1), transparent)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};
