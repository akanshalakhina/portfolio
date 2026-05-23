"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FaDownload, FaExpand, FaSearchMinus, FaSearchPlus, FaTimes, FaExternalLinkAlt } from "react-icons/fa";
import { links } from "@/config";

export const ResumeViewer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [zoom, setZoom] = useState(1);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 2));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.5));
  const handleResetZoom = () => setZoom(1);

  const modal = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl h-[85vh] bg-[#0a0a1a] rounded-2xl border border-white/10 overflow-hidden flex flex-col"
          >
            {/* Toolbar — compact icon buttons */}
            <div className="flex items-center justify-between px-2 py-2 sm:px-4 sm:py-3 bg-[#0d0d2b] border-b border-white/10">
              <span className="text-white font-semibold text-[11px] sm:text-sm truncate mr-2">Resume</span>

              <div className="flex items-center gap-1">
                <button onClick={handleZoomOut} className="p-1.5 sm:p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors" title="Zoom Out">
                  <FaSearchMinus size={12} />
                </button>
                <button onClick={handleResetZoom} className="p-1.5 sm:p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors text-[10px] sm:text-xs font-mono" title="Reset Zoom">
                  {Math.round(zoom * 100)}%
                </button>
                <button onClick={handleZoomIn} className="p-1.5 sm:p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors" title="Zoom In">
                  <FaSearchPlus size={12} />
                </button>

                <div className="w-px h-5 bg-white/10 mx-0.5" />

                <a href={links.resumeDownloadUrl} target="_blank" rel="noreferrer noopener" className="p-1.5 sm:p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors" title="Download PDF">
                  <FaDownload size={12} />
                </a>
                <a href={links.resumeUrl} target="_blank" rel="noreferrer noopener" className="p-1.5 sm:p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors" title="Open in New Tab">
                  <FaExternalLinkAlt size={12} />
                </a>

                <div className="w-px h-5 bg-white/10 mx-0.5" />

                <button onClick={() => { setIsOpen(false); setZoom(1); }} className="p-1.5 sm:p-2 rounded-lg bg-red-500/20 hover:bg-red-500/40 text-red-400 hover:text-red-300 transition-colors" title="Close">
                  <FaTimes size={14} />
                </button>
              </div>
            </div>

            {/* iframe */}
            <div className="flex-1 overflow-auto">
              <div
                style={{
                  transform: `scale(${zoom})`,
                  transformOrigin: "top center",
                  width: `${100 / zoom}%`,
                  height: `${100 / zoom}%`,
                }}
              >
                <iframe
                  src={links.resumeEmbedUrl}
                  className="w-full h-full border-0"
                  title="Akansha Lakhina Resume"
                  allow="autoplay"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <section id="resume" className="relative z-10 py-20">
      <h1 className="heading">
        My <span className="text-purple">Resume</span>
      </h1>

      <div className="mt-12 flex flex-col items-center gap-6">
        <p className="text-center text-white-200 max-w-2xl">
          Full-stack developer with expertise in modern web technologies, specializing in React, Next.js, Node.js, and cloud solutions.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
          <button
            onClick={() => setIsOpen(true)}
            className="relative inline-flex h-12 overflow-hidden rounded-lg p-[1px] focus:outline-none cursor-pointer"
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-slate-950 px-8 text-sm font-medium text-white backdrop-blur-3xl gap-2">
              <FaExpand className="text-purple" />
              View Resume
            </span>
          </button>

          <a
            href={links.resumeDownloadUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="relative inline-flex h-12 overflow-hidden rounded-lg p-[1px] focus:outline-none cursor-pointer"
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-slate-950 px-8 text-sm font-medium text-white backdrop-blur-3xl gap-2">
              <FaDownload className="text-purple" />
              Download PDF
            </span>
          </a>
        </div>
      </div>

      {/* Portal: renders modal at document.body level, escaping all parent stacking contexts */}
      {typeof document !== "undefined" && createPortal(modal, document.body)}
    </section>
  );
};

