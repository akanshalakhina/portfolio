"use client";

import React, { useRef, useState, Suspense, useEffect } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF, Html, useProgress } from "@react-three/drei";
import { links } from "@/config";

// Loading placeholder for Three.js Canvas
const CanvasLoader = () => {
  const { progress } = useProgress();
  return (
    <Html
      as="div"
      center
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div className="w-10 h-10 border-4 border-purple border-t-transparent rounded-full animate-spin"></div>
      <p className="text-xs font-bold text-purple mt-2">{progress.toFixed(1)}%</p>
    </Html>
  );
};

// 3D Earth Model loader
const Earth = () => {
  const earth = useGLTF("/planet/scene.gltf", true);
  return (
    <primitive
      object={earth.scene}
      scale={2.6}
      position-y={0}
      rotation-y={0}
      dispose={null}
    />
  );
};

// Earth Canvas wrapper
const EarthCanvas = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div className="w-full h-full bg-muted rounded-2xl animate-pulse"></div>;

  return (
    <Canvas
      shadows={false}
      frameloop="demand"
      dpr={[1, 1.5]}
      gl={{
        preserveDrawingBuffer: true,
        powerPreference: "high-performance",
        antialias: false,
      }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <OrbitControls
          autoRotate
          autoRotateSpeed={0.6}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Earth />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

// slideIn motion helper
const slideIn = (direction: string, type: string, delay: number, duration: number) => {
  return {
    hidden: {
      x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
      y: direction === "up" ? "100%" : direction === "down" ? "-100%" : 0,
    },
    show: {
      x: 0,
      y: 0,
      transition: {
        type: type,
        delay: delay,
        duration: duration,
        ease: "easeOut",
      },
    },
  };
};

export const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error" | null; text: string }>({
    type: null,
    text: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg({ type: null, text: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setLoading(false);
        setStatusMsg({
          type: "success",
          text: "Thank you! Your message has been sent successfully.",
        });
        setForm({
          name: "",
          email: "",
          message: "",
        });
      } else {
        throw new Error(data.error || "Failed to submit contact form.");
      }
    } catch (error: any) {
      setLoading(false);
      console.error(error);
      setStatusMsg({
        type: "error",
        text: `Something went wrong: ${error.message || error}. Please try again or email me directly at ${links.ownerEmail}`,
      });
    }
  };

  return (
    <section id="contact" className="relative z-10 py-20 max-w-6xl mx-auto">
      <h1 className="heading mb-12">
        Get in <span className="text-purple">Touch</span>
      </h1>

      <div className="flex xl:flex-row flex-col gap-10 overflow-hidden px-4 md:px-0">
        <motion.div
          variants={slideIn("left", "tween", 0.2, 0.8)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex-[0.75] bg-white border border-slate-200 p-8 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.04)] dark:bg-[#04071d] dark:border-white/[0.08]"
        >
          <p className="text-sm font-semibold tracking-wider text-gold uppercase">Let&apos;s collaborate</p>
          <h3 className="text-foreground text-3xl font-bold mt-1">Contact me.</h3>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col gap-6"
          >
            <label className="flex flex-col">
              <span className="text-foreground font-semibold mb-2 text-sm">Your Name</span>
              <input
                required
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="What should I call you?"
                className="bg-muted py-4 px-6 placeholder:text-muted-foreground text-foreground rounded-xl outline-none border border-transparent focus:border-ring/30 font-medium transition-all"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-foreground font-semibold mb-2 text-sm">Your Email</span>
              <input
                required
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Where can I reach you back?"
                className="bg-muted py-4 px-6 placeholder:text-muted-foreground text-foreground rounded-xl outline-none border border-transparent focus:border-ring/30 font-medium transition-all"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-foreground font-semibold mb-2 text-sm">Your Message</span>
              <textarea
                required
                rows={6}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Write your beautiful idea here..."
                className="bg-muted py-4 px-6 placeholder:text-muted-foreground text-foreground rounded-xl outline-none border border-transparent focus:border-ring/30 font-medium transition-all resize-none"
              />
            </label>

            <div className="flex flex-col gap-4">
              <button
                type="submit"
                className="bg-purple py-3.5 px-8 rounded-xl outline-none w-full sm:w-fit text-white font-bold shadow-md shadow-purple/10 hover:opacity-90 active:scale-95 transition-all text-sm tracking-wider uppercase cursor-pointer dark:text-black"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>

              {statusMsg.type && (
                <div
                  className={`text-sm font-semibold p-4 rounded-xl mt-2 ${
                    statusMsg.type === "success"
                      ? "bg-green-50 text-green-700 border border-green-200 dark:bg-green-950/20 dark:text-green-400 dark:border-green-800/20"
                      : "bg-red-50 text-red-700 border border-red-200 dark:bg-red-950/20 dark:text-red-400 dark:border-red-800/20"
                  }`}
                >
                  {statusMsg.text}
                </div>
              )}
            </div>
          </form>
        </motion.div>

        <motion.div
          variants={slideIn("right", "tween", 0.2, 0.8)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="xl:flex-1 w-full h-auto min-h-[400px] flex items-center justify-center rounded-3xl overflow-hidden border border-border bg-muted/30"
        >
          <EarthCanvas />
        </motion.div>
      </div>
    </section>
  );
};
