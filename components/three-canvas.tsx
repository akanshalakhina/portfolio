"use client";

import { useEffect, useRef } from "react";

export const ThreeCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    // Track mouse coordinates
    const mouse = {
      x: null as number | null,
      y: null as number | null,
      radius: 180, // mouse interaction radius
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    // Particle class definition
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      alpha: number;
      baseRadius: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        // Float slowly
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() - 0.5) * 0.35;
        this.baseRadius = Math.random() * 2 + 1;
        this.radius = this.baseRadius;
        
        // Curated neon gradient colors (Purple / Blue / Magenta / Cyan)
        const rand = Math.random();
        if (rand < 0.4) {
          this.color = "168, 85, 247"; // #a855f7 purple
        } else if (rand < 0.7) {
          this.color = "0, 242, 254";  // #00f2fe cyan
        } else {
          this.color = "203, 60, 255"; // #cb3cff magenta
        }
        this.alpha = Math.random() * 0.5 + 0.2;
      }

      update() {
        // Move particle
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around boundaries
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        // Mouse interaction (repulsion)
        if (mouse.x !== null && mouse.y !== null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            // Push away from mouse
            const forceX = (dx / dist) * force * 1.5;
            const forceY = (dy / dist) * force * 1.5;
            
            this.x += forceX;
            this.y += forceY;
            // Flare up in size and brightness
            this.radius = this.baseRadius * 1.8;
          } else {
            // Gradually shrink back
            if (this.radius > this.baseRadius) {
              this.radius -= 0.15;
            }
          }
        } else {
          if (this.radius > this.baseRadius) {
            this.radius -= 0.15;
          }
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
        
        // Add sublte glow to larger particles
        if (this.radius > 2.5) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = `rgba(${this.color}, 0.8)`;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fill();
      }
    }

    // Set up particles list based on screen width (fewer on mobile)
    const particleCount = Math.floor((width * height) / 9000);
    const particles: Particle[] = [];
    for (let i = 0; i < Math.min(particleCount, 120); i++) {
      particles.push(new Particle());
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    // Animation frame loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Update and draw particles
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      // 2. Draw connecting lines
      ctx.shadowBlur = 0; // reset shadow for fast line drawing
      const maxDistance = 115;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            // Line opacity scales with distance
            const alpha = (1 - dist / maxDistance) * 0.15;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            
            // Create nice gradient colored line
            const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
            grad.addColorStop(0, `rgba(${p1.color}, ${alpha})`);
            grad.addColorStop(1, `rgba(${p2.color}, ${alpha})`);
            
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.65;
            ctx.stroke();
          }
        }
      }

      // 3. Draw connection from mouse to nearby particles
      if (mouse.x !== null && mouse.y !== null) {
        particles.forEach((p) => {
          const dx = p.x - mouse.x!;
          const dy = p.y - mouse.y!;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const alpha = (1 - dist / mouse.radius) * 0.22;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x!, mouse.y!);
            ctx.strokeStyle = `rgba(${p.color}, ${alpha})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        });
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full pointer-events-none opacity-50 md:opacity-75"
      style={{ mixBlendMode: "screen" }}
    />
  );
};
