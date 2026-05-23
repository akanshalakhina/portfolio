"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { internships, certifications, communityAndMentorship } from "@/data";

export const Experience = () => {
  const [activeTab, setActiveTab] = useState<"internships" | "certifications" | "community">("internships");

  const activeData =
    activeTab === "internships"
      ? internships
      : activeTab === "certifications"
      ? certifications
      : communityAndMentorship;

  return (
    <section id="experience" className="py-20 max-w-5xl mx-auto px-4">
      <h1 className="heading mb-8">
        My <span className="text-purple">professional journey</span>
      </h1>
      <p className="text-center text-white-100 text-sm md:text-base max-w-xl mx-auto mb-12">
        Click through tabs to explore my professional internships, academic certifications, and community mentorship involvements.
      </p>

      {/* Tabs Selector */}
      <div className="flex flex-wrap justify-center gap-3 mb-16 max-w-xl mx-auto">
        <button
          onClick={() => setActiveTab("internships")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border transition-all duration-300 ${
            activeTab === "internships"
              ? "bg-purple text-white border-purple shadow-lg shadow-purple/20"
              : "bg-white/[0.02] border-white/5 text-white-200 hover:border-white/10 hover:text-white"
          }`}
        >
          <span>💼</span> Internships
        </button>
        <button
          onClick={() => setActiveTab("certifications")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border transition-all duration-300 ${
            activeTab === "certifications"
              ? "bg-purple text-white border-purple shadow-lg shadow-purple/20"
              : "bg-white/[0.02] border-white/5 text-white-200 hover:border-white/10 hover:text-white"
          }`}
        >
          <span>📜</span> Certifications
        </button>
        <button
          onClick={() => setActiveTab("community")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border transition-all duration-300 ${
            activeTab === "community"
              ? "bg-purple text-white border-purple shadow-lg shadow-purple/20"
              : "bg-white/[0.02] border-white/5 text-white-200 hover:border-white/10 hover:text-white"
          }`}
        >
          <span>🤝</span> Mentorship & Community
        </button>
      </div>

      <div className="relative border-l border-white/10 md:border-l-0 md:flex md:flex-col md:items-center">
        {/* Central timeline neon line on desktop */}
        <div className="absolute left-[8px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-purple via-cyan-500 to-purple/20 md:-translate-x-1/2 hidden md:block" />

        {/* Mobile vertical line */}
        <div className="absolute left-[8px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-purple via-cyan-500 to-purple/20 md:hidden" />

        <div className="space-y-12 w-full">
          <AnimatePresence mode="popLayout">
            {activeData.map((exp, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={`${activeTab}-${exp.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className={`relative flex flex-col md:flex-row items-start md:items-center w-full ${
                    isEven ? "md:justify-start" : "md:justify-end"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-[2px] md:left-1/2 top-1.5 md:top-1/2 h-[14px] w-[14px] rounded-full bg-black-100 border-2 border-purple shadow-lg shadow-purple/50 md:-translate-x-1/2 md:-translate-y-1/2 z-20 flex items-center justify-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  </div>

                  {/* Content Card container */}
                  <div
                    className={`w-full pl-8 md:pl-0 md:w-[45%] ${
                      isEven ? "md:text-right md:pr-8" : "md:text-left md:pl-8"
                    }`}
                  >
                    <div className="relative group p-6 rounded-2xl border border-white/5 bg-black-100/40 backdrop-blur-md hover:border-purple/30 hover:shadow-xl hover:shadow-purple/5 transition-all duration-300">
                      {/* Corner accent glow */}
                      <div className="absolute top-0 right-0 h-10 w-10 bg-purple/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />

                      <div className={`flex flex-col ${isEven ? "md:items-end" : "md:items-start"} gap-3`}>
                        {/* Image Thumbnail */}
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 p-2.5 border border-white/10">
                          <Image
                            width={40}
                            height={40}
                            src={exp.thumbnail}
                            alt={exp.title}
                            className="object-contain"
                          />
                        </div>

                        <div className="w-full">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/20 border border-cyan-800/30 px-2.5 py-1 rounded-full">
                            {exp.period}
                          </span>
                          
                          <h3 className="text-base sm:text-lg font-bold text-white mt-2 group-hover:text-purple transition-colors">
                            {exp.title}
                          </h3>
                          
                          <p className="text-xs sm:text-sm font-semibold text-purple mt-0.5">
                            {exp.company}
                          </p>
                        </div>
                      </div>

                      {/* Bullet points description */}
                      <ul className="mt-3.5 space-y-2 text-left">
                        {exp.desc.map((bullet, bIdx) => (
                          <li key={bIdx} className="text-xs sm:text-sm font-light text-white-200 leading-relaxed flex items-start gap-2">
                            <span className="text-purple mt-1.5 h-1.5 w-1.5 rounded-full bg-purple flex-shrink-0" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Optional verify credential link */}
                      {"link" in exp && exp.link && (
                        <div className="mt-4 text-left">
                          <a
                            href={exp.link}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="inline-flex items-center gap-1.5 text-xs text-purple font-semibold hover:underline border border-purple/20 bg-purple/5 px-3 py-1.5 rounded-lg hover:bg-purple/10 transition-colors"
                          >
                            Verify Credential &rarr;
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

