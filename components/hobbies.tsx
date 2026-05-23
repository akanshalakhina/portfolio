"use client";

import { motion } from "framer-motion";
import { hobbies } from "@/data";

export const Hobbies = () => {
  return (
    <section className="py-20">
      <h1 className="heading">
        Hobbies & <span className="text-purple">Interests</span>
      </h1>

      <div className="mt-12 flex flex-wrap items-center justify-center gap-8 max-w-4xl mx-auto">
        {hobbies.map((hobby, index) => (
          <motion.div
            key={hobby.id}
            initial={{ opacity: 0, y: 30, rotateY: -15 }}
            whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            whileHover={{
              scale: 1.05,
              rotateY: 5,
              rotateX: -5,
              transition: { duration: 0.3 },
            }}
            className="group relative w-full sm:w-[280px] overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 cursor-pointer dark:border-white/[0.1] dark:from-[#04071d] dark:to-[#0c0e23]"
            style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
          >
            {/* Animated glow border */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-gold/20 via-purple/10 to-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <motion.span
                className="text-5xl mb-4"
                whileHover={{ scale: 1.3, rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                {hobby.emoji}
              </motion.span>

              <h3 className="text-xl font-bold text-foreground mb-1">
                {hobby.title}
              </h3>

              <p className="text-gold dark:text-purple text-sm font-semibold mb-3">
                {hobby.role}
              </p>

              <p className="text-muted-foreground text-sm leading-relaxed italic">
                &ldquo;{hobby.description}&rdquo;
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
