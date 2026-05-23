"use client";

import { useEffect, useRef, useState } from "react";

export const RobotHead = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });

  // Target and current animated values for smooth cursor tracking (interpolation)
  const targetOffset = useRef({ x: 0, y: 0 });
  const currentOffset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Media query to check if we are on a mobile device (width <= 768px)
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const headCenterX = rect.left + rect.width / 2;
      const headCenterY = rect.top + rect.height / 2;

      // Distance from mouse to center of the head
      const deltaX = event.clientX - headCenterX;
      const deltaY = event.clientY - headCenterY;

      // Normalize distance and limit max pupil offset (max 10px range)
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const maxDistance = 400; // Radius where offset reaches max
      const maxOffset = 12; // Max movement in pixels

      const factor = Math.min(distance / maxDistance, 1);
      const angle = Math.atan2(deltaY, deltaX);

      targetOffset.current = {
        x: Math.cos(angle) * factor * maxOffset,
        y: Math.sin(angle) * factor * maxOffset,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Smooth eye movement animation loop (lerp)
    let animationFrameId: number;
    const animate = () => {
      // Linear interpolation: current = current + (target - current) * dampFactor
      currentOffset.current.x += (targetOffset.current.x - currentOffset.current.x) * 0.12;
      currentOffset.current.y += (targetOffset.current.y - currentOffset.current.y) * 0.12;

      setEyeOffset({
        x: currentOffset.current.x,
        y: currentOffset.current.y,
      });

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile]);

  return (
    <div
      ref={containerRef}
      className="relative flex h-full w-full items-center justify-center p-4 select-none"
    >
      {/* Background glow effects for premium look */}
      <div className="absolute h-[65%] w-[65%] rounded-full bg-purple/10 blur-[80px] dark:bg-purple/20 animate-pulse duration-4000" />
      <div className="absolute h-[50%] w-[50%] rounded-full bg-blue-500/10 blur-[60px] dark:bg-blue-500/10" />

      <svg
        className="z-10 w-full h-full max-w-[420px] max-h-[420px]"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Metallic face gradient */}
          <linearGradient id="headGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a1c2e" />
            <stop offset="50%" stopColor="#0d0e1b" />
            <stop offset="100%" stopColor="#050510" />
          </linearGradient>

          {/* Face borders gradient */}
          <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.8" />
          </linearGradient>

          {/* Ears/Antennae metallic gradient */}
          <linearGradient id="earGrad" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#1a1c2e" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>

          {/* Visor glowing glass gradient */}
          <linearGradient id="visorGrad" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#0f1123" />
            <stop offset="100%" stopColor="#1e2246" />
          </linearGradient>

          {/* Neon cyber glow */}
          <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur1" />
            <feGaussianBlur stdDeviation="12" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Shadow filter */}
          <filter id="dropShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#000" floodOpacity="0.5" />
          </filter>
        </defs>

        {/* --- Neck Base --- */}
        <g filter="url(#dropShadow)">
          <path
            d="M170 310 L230 310 L220 370 L180 370 Z"
            fill="url(#headGrad)"
            stroke="url(#borderGrad)"
            strokeWidth="2"
          />
          {/* Cyber cables on neck */}
          <line x1="190" y1="318" x2="190" y2="362" stroke="#3b82f6" strokeWidth="3" opacity="0.6" />
          <line x1="210" y1="318" x2="210" y2="362" stroke="#3b82f6" strokeWidth="3" opacity="0.6" />
          <path d="M165 370 Q200 375 235 370" stroke="url(#borderGrad)" strokeWidth="3" fill="none" />
        </g>

        {/* --- Ears/Side Thrusters --- */}
        <g filter="url(#dropShadow)">
          {/* Left Ear */}
          <rect x="52" y="165" width="20" height="70" rx="6" fill="url(#earGrad)" stroke="#3b82f6" strokeWidth="1.5" />
          <circle cx="62" cy="200" r="4" fill="#a855f7" filter="url(#neonGlow)" />
          {/* Right Ear */}
          <rect x="328" y="165" width="20" height="70" rx="6" fill="url(#earGrad)" stroke="#3b82f6" strokeWidth="1.5" />
          <circle cx="338" cy="200" r="4" fill="#a855f7" filter="url(#neonGlow)" />
        </g>

        {/* --- Main Helmet / Head Structure --- */}
        <g filter="url(#dropShadow)">
          <rect
            x="70"
            y="80"
            width="260"
            height="240"
            rx="120"
            fill="url(#headGrad)"
            stroke="url(#borderGrad)"
            strokeWidth="3.5"
          />
          {/* Futuristic panel engraving lines */}
          <path d="M120 83 Q200 110 280 83" stroke="url(#borderGrad)" strokeWidth="1.5" opacity="0.4" fill="none" />
          <path d="M70 200 H100" stroke="url(#borderGrad)" strokeWidth="2" opacity="0.5" />
          <path d="M300 200 H330" stroke="url(#borderGrad)" strokeWidth="2" opacity="0.5" />
          <path d="M140 315 L160 300 H240 L260 315" stroke="url(#borderGrad)" strokeWidth="1.5" opacity="0.5" fill="none" />
        </g>

        {/* --- Glowing Antenna --- */}
        <line x1="200" y1="80" x2="200" y2="40" stroke="url(#borderGrad)" strokeWidth="3" />
        <circle cx="200" cy="35" r="7" fill="#a855f7" filter="url(#neonGlow)" />
        <circle cx="200" cy="35" r="3" fill="#ffffff" />

        {/* --- Visor (Glass shield housing the eyes) --- */}
        <rect
          x="95"
          y="140"
          width="210"
          height="95"
          rx="45"
          fill="url(#visorGrad)"
          stroke="#3b82f6"
          strokeWidth="2.5"
          filter="url(#dropShadow)"
        />

        {/* --- Cyber Visor Inner Details --- */}
        <path d="M110 188 H290" stroke="rgba(59, 130, 246, 0.15)" strokeWidth="1" />
        <path d="M110 178 H290" stroke="rgba(59, 130, 246, 0.15)" strokeWidth="1" />
        <path d="M110 198 H290" stroke="rgba(59, 130, 246, 0.15)" strokeWidth="1" />

        {/* --- Interactive Eyes Group --- */}
        <g id="eyesGroup">
          {/* LEFT EYE */}
          <g transform="translate(150, 188)">
            {/* Outer socket glow */}
            <circle cx="0" cy="0" r="28" fill="rgba(168, 85, 247, 0.05)" />
            <circle cx="0" cy="0" r="24" stroke="rgba(168, 85, 247, 0.2)" strokeWidth="1" />
            <circle cx="0" cy="0" r="18" stroke="#a855f7" strokeWidth="1.5" opacity="0.7" />

            {/* Glowing Pupil (tracks cursor or animates dynamically) */}
            <g
              style={{
                transform: isMobile
                  ? undefined
                  : `translate(${eyeOffset.x}px, ${eyeOffset.y}px)`,
              }}
              className={isMobile ? "mobile-pupil-scan" : ""}
            >
              {/* Eye light ring */}
              <circle
                cx="0"
                cy="0"
                r="10"
                fill="#06b6d4"
                filter="url(#neonGlow)"
                className={isMobile ? "mobile-blink-eye" : ""}
              />
              <circle
                cx="0"
                cy="0"
                r="4"
                fill="#ffffff"
                className={isMobile ? "mobile-blink-eye" : ""}
              />
            </g>
          </g>

          {/* RIGHT EYE */}
          <g transform="translate(250, 188)">
            {/* Outer socket glow */}
            <circle cx="0" cy="0" r="28" fill="rgba(168, 85, 247, 0.05)" />
            <circle cx="0" cy="0" r="24" stroke="rgba(168, 85, 247, 0.2)" strokeWidth="1" />
            <circle cx="0" cy="0" r="18" stroke="#a855f7" strokeWidth="1.5" opacity="0.7" />

            {/* Glowing Pupil (tracks cursor or animates dynamically) */}
            <g
              style={{
                transform: isMobile
                  ? undefined
                  : `translate(${eyeOffset.x}px, ${eyeOffset.y}px)`,
              }}
              className={isMobile ? "mobile-pupil-scan" : ""}
            >
              {/* Eye light ring */}
              <circle
                cx="0"
                cy="0"
                r="10"
                fill="#06b6d4"
                filter="url(#neonGlow)"
                className={isMobile ? "mobile-blink-eye" : ""}
              />
              <circle
                cx="0"
                cy="0"
                r="4"
                fill="#ffffff"
                className={isMobile ? "mobile-blink-eye" : ""}
              />
            </g>
          </g>
        </g>

        {/* --- Forehead Emblem (Glowing Power Node) --- */}
        <polygon points="200,92 208,105 192,105" fill="#a855f7" filter="url(#neonGlow)" />
        <line x1="200" y1="105" x2="200" y2="132" stroke="#3b82f6" strokeWidth="2" opacity="0.8" />

        {/* --- Mouth/Vent Plate --- */}
        <g transform="translate(160, 255)">
          {/* Cybernetic ventilation grills */}
          <rect x="0" y="0" width="80" height="28" rx="6" fill="#0d0e1b" stroke="url(#borderGrad)" strokeWidth="1.5" />
          <line x1="15" y1="8" x2="15" y2="20" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
          <line x1="27" y1="6" x2="27" y2="22" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
          <line x1="40" y1="5" x2="40" y2="23" stroke="#a855f7" strokeWidth="3" strokeLinecap="round" filter="url(#neonGlow)" />
          <line x1="53" y1="6" x2="53" y2="22" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
          <line x1="65" y1="8" x2="65" y2="20" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
        </g>
      </svg>

      {/* Zero-CPU mobile CSS animations embedded inside style tag */}
      <style jsx global>{`
        /* Eye Scanning Animation for Mobile Devices (Zero CPU Impact) */
        @keyframes mobileScan {
          0% { transform: translate(0px, 0px); }
          15% { transform: translate(-6px, 1px); }
          30% { transform: translate(-6px, 1px); }
          45% { transform: translate(6px, -2px); }
          60% { transform: translate(6px, -2px); }
          75% { transform: translate(0px, 4px); }
          90% { transform: translate(0px, 0px); }
          100% { transform: translate(0px, 0px); }
        }

        /* Eye Blinking Animation for Mobile Devices */
        @keyframes mobileBlink {
          0%, 48%, 52%, 100% {
            transform: scaleY(1);
          }
          50% {
            transform: scaleY(0.05);
          }
        }

        .mobile-pupil-scan {
          animation: mobileScan 6s ease-in-out infinite;
        }

        .mobile-blink-eye {
          animation: mobileBlink 5s ease-in-out infinite;
          transform-origin: center;
        }
      `}</style>
    </div>
  );
};
