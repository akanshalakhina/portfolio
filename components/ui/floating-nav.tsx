"use client";

import {
  AnimatePresence,
  motion,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";
import { useState } from "react";

import { navItems } from "@/data";
import { cn } from "@/lib/utils";

type FloatingNavProps = {
  navItems: typeof navItems;
  className?: string;
};

export const FloatingNav = ({ navItems, className }: FloatingNavProps) => {
  const { scrollY } = useScroll();

  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (current) => {
    if (typeof current === "number") {
       if (current < 50) {
        setVisible(true);
      } else {
        if (current > lastScrollY) {
          setVisible(false);
          setMobileOpen(false);
        } else {
          setVisible(true);
        }
      }
      setLastScrollY(current);
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.nav
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "fixed inset-x-0 top-5 md:top-10 z-[5000] mx-auto flex max-w-fit items-center justify-center rounded-3xl border border-white/[0.2] bg-black-100 px-3 py-3 md:py-5 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]",
          className
        )}
      >
        {/* Desktop nav links */}
        <div className="hidden md:flex items-center space-x-4">
          {navItems.map((navItem: any, idx: number) => (
            <Link
              key={`link-${idx}`}
              href={navItem.link}
              className={cn(
                "relative flex items-center space-x-1 text-neutral-600 hover:text-neutral-500 dark:text-neutral-50 dark:hover:text-neutral-300"
              )}
            >
              <span className="!cursor-pointer text-sm">{navItem.name}</span>
            </Link>
          ))}
        </div>

        {/* Mobile hamburger button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col items-center justify-center w-8 h-8 gap-[5px] cursor-pointer px-1"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            className="block w-5 h-[2px] bg-neutral-600 dark:bg-neutral-200 rounded-full origin-center"
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            className="block w-5 h-[2px] bg-neutral-600 dark:bg-neutral-200 rounded-full"
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            className="block w-5 h-[2px] bg-neutral-600 dark:bg-neutral-200 rounded-full origin-center"
          />
        </button>

        {/* Mobile nav label */}
        <span className="md:hidden text-sm font-medium text-neutral-600 dark:text-neutral-50 ml-1">
          Menu
        </span>
      </motion.nav>

      {/* Mobile dropdown menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed top-[70px] inset-x-0 z-[4999] mx-auto w-[90vw] max-w-xs md:hidden"
        >
          <div className="rounded-2xl border border-white/[0.15] bg-black-100 backdrop-blur-xl shadow-2xl p-4 flex flex-col gap-1">
            {navItems.map((navItem: any, idx: number) => (
              <Link
                key={`mobile-link-${idx}`}
                href={navItem.link}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-600 hover:text-neutral-900 hover:bg-black-200 dark:text-neutral-200 dark:hover:text-white dark:hover:bg-white/[0.06] transition-colors text-sm font-medium"
              >
                {navItem.name}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
