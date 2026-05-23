"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMessage, FaXmark, FaPaperPlane, FaRobot } from "react-icons/fa6";

interface Message {
  sender: "user" | "bot";
  text: string;
}

// Predefined suggestion chips for recruiters
const SUGGESTIONS = [
  "Tell me about SensAI 🤖",
  "What is her tech stack? 💻",
  "Is she looking for internships? 📅",
  "Tell me about VibeMate 🏠",
  "What is her experience? 🏆",
];

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Hi! I'm Akansha's AI Career Assistant. Feel free to ask me about her full-stack projects, tech stack, internships, or academic honors!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Local Expert Heuristics fallback responses when API is missing/fails
  const getFallbackResponse = (query: string): string => {
    const q = query.toLowerCase();

    // Project: SensAI
    if (q.includes("sensai") || q.includes("career coach") || q.includes("resume audit")) {
      return "SensAI is Akansha's AI-powered career coach platform! It performs real-time resume reviews and simulated interview coaching. Built with Next.js 14, Google Gemini API, Prisma ORM, and Neon PostgreSQL. You can view the code here: https://github.com/akanshalakhina/SENSAI";
    }

    // Project: VibeMate
    if (q.includes("vibemate") || q.includes("roommate") || q.includes("matching")) {
      return "VibeMate is an AI Roommate Finder platform that placed in the Top 5 at a Google Developer Groups (GDG) hackathon! It matches roommates using a weight-based compatibility algorithm and analyzes vocal profiles with the Omnidimension Voice API. Check it out: https://github.com/akanshalakhina/VibeMate";
    }

    // Project: WEBGEN
    if (q.includes("webgen") || q.includes("saas") || q.includes("website builder")) {
      return "WEBGEN is a MERN-stack SaaS platform that allows users to instantly generate fully-responsive landing pages using AI and deploy them with one click. It includes Stripe subscriptions and stripe-checkout integrations.";
    }

    // Projects general
    if (q.includes("project") || q.includes("portfolio") || q.includes("stayhub") || q.includes("veriride")) {
      return "Akansha has built several high-impact full-stack and AI projects:\n\n1. **SensAI**: AI Career Coach (Next.js, Gemini API, Prisma, Neon PostgreSQL)\n2. **VibeMate**: AI Roommate Finder (GDG Hackathon Top 5)\n3. **WEBGEN**: AI Landing Page SaaS Builder (React, Express, Node, MongoDB, Stripe)\n4. **StayHub**: Accommodation Booking Platform (Express, Mongoose, Node.js)\n5. **VeriRide**: Secure Video KYC vehicle booking platform (Next.js, WebRTC, Node.js)\n\nWhich of these would you like to know more about?";
    }

    // Tech Stack
    if (q.includes("tech stack") || q.includes("skills") || q.includes("languages") || q.includes("stack") || q.includes("code")) {
      return "Akansha is highly proficient across frontend, backend, and AI integration:\n\n• **Frontend**: React.js, Next.js (App Router), TypeScript, JavaScript, Tailwind CSS, Framer Motion, HTML5/CSS3\n• **Backend & Databases**: Node.js, Express.js, FastAPI, MongoDB, PostgreSQL (Prisma & Neon), SQL\n• **AI & Cloud**: Google Gemini API, OpenAI APIs, AWS Bedrock integrations\n• **Languages & Algorithmic Tools**: Java, Python, Data Structures & Algorithms (DSA)";
    }

    // Experience / Internships
    if (q.includes("experience") || q.includes("intern") || q.includes("work") || q.includes("job") || q.includes("techvision") || q.includes("united")) {
      return "Akansha has hands-on industry experience through two internships:\n\n1. **Full Stack Development Intern** at TechVision Digital (May 2026 – Present): Customizing web apps, building plugins, managing hosting environments, and optimizing SEO and speeds.\n2. **Web Development Intern** at United Business Solution (July 2025 – August 2025): Streamlined interactive user interfaces, refactored React component render cycles, and improved cross-browser compatibility.\n\nShe is currently seeking competitive big-tech software engineering internships for Summer/Fall 2027!";
    }

    // Education / Scholars / Amazon
    if (q.includes("education") || q.includes("college") || q.includes("degree") || q.includes("scholar") || q.includes("amazon") || q.includes("afe")) {
      return "Akansha is an **Amazon Future Engineer (AFE) Scholar** (2023 - Expected Graduation 2027), selected among 40,000+ applicants for a fellowship supporting women in technology. Under the program, she completed an intensive 10-month DSA training in Java. She is also a **GDG Solution Challenge Finalist** and an alumnus of the Harvard-backed **Aspire Leaders Program** (2025).";
    }

    // Hire / Contact / Availability
    if (q.includes("hire") || q.includes("contact") || q.includes("email") || q.includes("open") || q.includes("resume") || q.includes("linkedin")) {
      return "Yes! Akansha is actively looking for software engineering internship opportunities! You can contact her at **akanshalakhina2004@gmail.com**, visit her LinkedIn (https://www.linkedin.com/in/akansha2004/), or download her Resume directly from the navigation bar. Let's build something great!";
    }

    // Hello / Greetings
    if (q.includes("hi") || q.includes("hello") || q.includes("hey") || q.includes("greetings")) {
      return "Hello! How can I help you today? I can answer questions about Akansha's project stack, technical experience, or check her internship availability.";
    }

    // Default Fallback response
    return "That's a great question! While I don't have a specific answer for that, I can tell you that Akansha is a MERN Stack & AI developer, Amazon Future Engineer Scholar, and GDG hackathon winner. Try asking about her projects (like SensAI or VibeMate), her tech stack, or her work experience!";
  };

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text: textToSend }]);
    setInput("");
    setIsLoading(true);

    try {
      // Send message to our portfolio server chat API
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
      } else {
        throw new Error("API call failed");
      }
    } catch (err) {
      // API call failed or timed out: execute local expert heuristics fallback
      setTimeout(() => {
        const fallbackText = getFallbackResponse(textToSend);
        setMessages((prev) => [...prev, { sender: "bot", text: fallbackText }]);
      }, 500);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button Trigger */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen((prev) => !prev)}
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-purple to-cyan-500 text-white shadow-lg shadow-purple/30 focus:outline-none"
        >
          {isOpen ? (
            <FaXmark className="text-xl" />
          ) : (
            <>
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-teal-500"></span>
              </span>
              <FaMessage className="text-xl animate-pulse" />
            </>
          )}
        </motion.button>
      </div>

      {/* Chat Window Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className="fixed bottom-24 right-6 z-50 w-[350px] sm:w-[380px] h-[500px] rounded-3xl border border-white/10 bg-black-100/90 backdrop-blur-xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-purple/10 to-cyan-500/10 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple/20 border border-purple/30 text-purple shadow-inner">
                  <FaRobot className="text-lg animate-bounce" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Akansha&apos;s Career AI</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-teal-400 inline-block animate-pulse"></span>
                    <span className="text-[11px] text-teal-400 font-medium">Online & Ready</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white-200 hover:text-white p-1 hover:bg-white/5 rounded-lg transition-colors"
              >
                <FaXmark className="text-lg" />
              </button>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar-thin scrollbar-thumb-white/10">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-purple text-white rounded-br-none shadow-md shadow-purple/20"
                        : "bg-white/[0.04] border border-white/5 text-white-100 rounded-bl-none font-light"
                    } whitespace-pre-line`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {/* Typing loader */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/[0.04] border border-white/5 text-white rounded-2xl rounded-bl-none px-4 py-3 flex gap-1.5 items-center">
                    <span className="h-2 w-2 bg-purple rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                    <span className="h-2 w-2 bg-purple rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                    <span className="h-2 w-2 bg-purple rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick replies suggestion pills */}
            <div className="px-4 py-2 border-t border-white/5 bg-black-200/20 overflow-x-auto flex gap-2 scrollbar-none whitespace-nowrap">
              {SUGGESTIONS.map((sug) => (
                <button
                  key={sug}
                  onClick={() => handleSend(sug)}
                  className="px-3 py-1.5 rounded-full bg-white/5 border border-white/5 hover:border-purple/30 hover:bg-purple/5 text-white-200 hover:text-white text-xs transition-all duration-200"
                >
                  {sug}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="p-3 border-t border-white/5 bg-black-100/40 backdrop-blur-md flex gap-2"
            >
              <input
                type="text"
                placeholder="Ask me anything about Akansha..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-white/[0.03] border border-white/5 hover:border-white/10 focus:border-purple focus:outline-none rounded-xl px-4 py-2.5 text-sm text-white placeholder-white-200/40 transition-colors"
              />
              <button
                type="submit"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple text-white shadow-lg hover:shadow-purple/20 hover:scale-105 active:scale-95 transition-all focus:outline-none"
              >
                <FaPaperPlane className="text-sm" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
