"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaLocationArrow, FaGithub, FaStar, FaCodeBranch, FaMagnifyingGlass } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data";

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
}

// Categories list
const CATEGORIES = ["All", "AI & LLM", "MERN Stack", "Algorithms"] as const;

const getLanguageColor = (lang: string) => {
  const colors: Record<string, string> = {
    TypeScript: "bg-blue-500",
    JavaScript: "bg-yellow-400",
    Python: "bg-blue-600",
    HTML: "bg-orange-500",
    CSS: "bg-purple-500",
    "Jupyter Notebook": "bg-emerald-500",
    C: "bg-amber-600",
    "C++": "bg-pink-500",
  };
  return colors[lang] || "bg-gray-400";
};

const getRepoTechStack = (name: string, language: string, desc: string): string[] => {
  const tags: string[] = [];
  const nameLower = name.toLowerCase();
  const descLower = (desc || "").toLowerCase();
  const langLower = (language || "").toLowerCase();

  // Keyword mapping
  if (
    nameLower.includes("sensai") ||
    nameLower.includes("reducate") ||
    descLower.includes("ai") ||
    descLower.includes("gemini") ||
    descLower.includes("openai") ||
    descLower.includes("aws") ||
    descLower.includes("bedrock") ||
    descLower.includes("detection") ||
    descLower.includes("spam") ||
    descLower.includes("assistant")
  ) {
    tags.push("Gemini/AI");
  }
  
  if (nameLower.includes("next") || descLower.includes("next.js") || descLower.includes("nextjs")) {
    tags.push("Next.js");
  } else if (
    nameLower.includes("react") ||
    descLower.includes("react") ||
    descLower.includes("react.js") ||
    nameLower.includes("stayhub") ||
    nameLower.includes("service") ||
    nameLower.includes("accredian") ||
    nameLower.includes("packers")
  ) {
    tags.push("React");
  }

  if (
    nameLower.includes("node") ||
    descLower.includes("node") ||
    descLower.includes("express") ||
    nameLower.includes("stayhub") ||
    nameLower.includes("service")
  ) {
    tags.push("Node.js");
  }

  if (
    descLower.includes("mongodb") ||
    descLower.includes("mongoose") ||
    nameLower.includes("stayhub") ||
    nameLower.includes("service")
  ) {
    tags.push("MongoDB");
  }

  if (
    descLower.includes("postgres") ||
    descLower.includes("neon") ||
    descLower.includes("prisma") ||
    nameLower.includes("sensai")
  ) {
    tags.push("PostgreSQL");
  }

  if (
    descLower.includes("stripe") ||
    nameLower.includes("webgen") ||
    nameLower.includes("novastore") ||
    descLower.includes("ecommerce") ||
    descLower.includes("checkout")
  ) {
    tags.push("Stripe");
  }

  if (descLower.includes("tailwind") || descLower.includes("responsive") || nameLower.includes("swipe")) {
    tags.push("Tailwind");
  }

  if (nameLower.includes("webrtc") || descLower.includes("webrtc") || descLower.includes("kyc")) {
    tags.push("WebRTC");
  }

  if (langLower === "typescript" || langLower === "ts") {
    if (!tags.includes("TypeScript")) tags.push("TypeScript");
  } else if (langLower === "javascript" || langLower === "js") {
    if (!tags.includes("JavaScript")) tags.push("JavaScript");
  } else if (langLower === "python" || langLower === "py") {
    if (!tags.includes("Python")) tags.push("Python");
  } else if (langLower === "java") {
    if (!tags.includes("Java")) tags.push("Java");
  }

  // Ensure we have at least one or two tags
  if (tags.length === 0) {
    tags.push(language || "Web Dev");
  }

  return Array.from(new Set(tags)).slice(0, 3);
};

export const RecentProjects = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"curated" | "github">("curated");
  
  // GitHub state
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loadingRepos, setLoadingRepos] = useState(false);

  // Fetch GitHub repos when user switches to the GitHub tab
  useEffect(() => {
    if (activeTab === "github" && repos.length === 0) {
      setLoadingRepos(true);
      fetch("/api/github")
        .then((res) => res.json())
        .then((data) => {
          // Sort by stars descending, then by updated date
          const sorted = Array.isArray(data) 
            ? data.sort((a, b) => b.stargazers_count - a.stargazers_count)
            : [];
          setRepos(sorted);
        })
        .catch((err) => console.error("Error fetching GitHub repositories:", err))
        .finally(() => setLoadingRepos(false));
    }
  }, [activeTab, repos.length]);

  // Project filter logic
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.des.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;
    if (activeCategory === "All") return true;

    if (activeCategory === "AI & LLM") {
      return project.title.toLowerCase().includes("ai") || project.des.toLowerCase().includes("ai") || project.des.toLowerCase().includes("gemini");
    }
    if (activeCategory === "MERN Stack") {
      return (
        project.des.toLowerCase().includes("mongodb") ||
        project.des.toLowerCase().includes("mern") ||
        project.title.toLowerCase().includes("webgen") ||
        project.title.toLowerCase().includes("stayhub") ||
        project.title.toLowerCase().includes("service")
      );
    }
    if (activeCategory === "Algorithms") {
      return project.des.toLowerCase().includes("algorithm") || project.des.toLowerCase().includes("kyc") || project.des.toLowerCase().includes("webrtc");
    }
    return true;
  });

  // Repo filter logic
  const filteredRepos = repos.filter((repo) => {
    return (
      repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (repo.description && repo.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (repo.language && repo.language.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <section id="projects" className="py-20 max-w-6xl mx-auto px-4">
      <h1 className="heading mb-4">
        A gallery of my <span className="text-purple">recent creations</span>
      </h1>
      <p className="text-center text-white-100 text-sm md:text-base max-w-xl mx-auto mb-10">
        Filter through my curated high-performance projects, or dive straight into my live GitHub repositories fetched in real-time.
      </p>

      {/* Tabs Switcher */}
      <div className="flex justify-center mb-8">
        <div className="flex border border-white/10 bg-black-100/50 backdrop-blur-md rounded-full p-1.5 p-[6px] gap-2">
          <button
            onClick={() => {
              setActiveTab("curated");
              setSearchQuery("");
            }}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
              activeTab === "curated"
                ? "bg-purple text-white shadow-lg shadow-purple/30"
                : "text-white-200 hover:text-white"
            }`}
          >
            Curated Showcases
          </button>
          <button
            onClick={() => {
              setActiveTab("github");
              setSearchQuery("");
            }}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
              activeTab === "github"
                ? "bg-purple text-white shadow-lg shadow-purple/30"
                : "text-white-200 hover:text-white"
            }`}
          >
            <FaGithub className="text-base" /> Live GitHub Repos
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12 border-b border-white/5 pb-6">
        {/* Category Pills (Only for Curated) */}
        {activeTab === "curated" ? (
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm transition-all duration-200 border ${
                  activeCategory === cat
                    ? "border-purple bg-purple/10 text-purple font-medium"
                    : "border-white/10 hover:border-white/30 text-white-200"
                }`}
              >
                {cat}
                {activeCategory === cat && (
                  <motion.div
                    layoutId="activeCategoryBorder"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-purple"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        ) : (
          <div className="text-white-200 font-semibold text-sm flex items-center gap-2">
            <FaGithub className="text-purple animate-pulse" /> Exploring {repos.length || "..."} repositories
          </div>
        )}

        {/* Search Bar */}
        <div className="relative w-full md:max-w-xs">
          <FaMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white-200 text-xs sm:text-sm" />
          <input
            type="text"
            placeholder={activeTab === "curated" ? "Search projects..." : "Search GitHub repositories..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-black-100/60 border border-white/10 hover:border-white/20 focus:border-purple focus:outline-none rounded-xl text-white placeholder-white-200/50 transition-colors"
          />
        </div>
      </div>

      {/* Main Grid Content */}
      <AnimatePresence mode="wait">
        {activeTab === "curated" ? (
          // Curated Projects Tab
          <motion.div
            key="curated"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {filteredProjects.map(({ id, des, iconLists, img, link, sourceCode, title }, index) => (
              <motion.div
                key={id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group relative rounded-3xl border border-white/[0.08] bg-black-100/40 backdrop-blur-md overflow-hidden hover:border-purple/40 hover:shadow-2xl hover:shadow-purple/10 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Project Image */}
                  <Link href={link} target="_blank" rel="noreferrer noopener">
                    <div className="relative h-[220px] sm:h-[260px] overflow-hidden bg-muted/50">
                      <div className="absolute inset-0 z-0">
                        <Image
                          height={330}
                          width={570}
                          src="/bg.png"
                          alt="bg-img"
                          className="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                      {/* Main Showcase Image */}
                      <img
                        src={img}
                        alt={title}
                        className="absolute inset-0 z-10 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                      />
                      {/* Glass Overlay Hover */}
                      <div className="absolute inset-0 z-20 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                        <div className="border border-white/20 px-5 py-2.5 rounded-xl bg-white/10 backdrop-blur-md text-white text-sm font-semibold flex items-center gap-2 transition-transform duration-300 translate-y-4 group-hover:translate-y-0">
                          Launch Live App <FaLocationArrow className="text-xs" />
                        </div>
                      </div>
                    </div>
                  </Link>

                  {/* Project Details */}
                  <div className="p-6">
                    <h2 className="text-lg font-bold md:text-xl text-white group-hover:text-purple transition-colors line-clamp-1">
                      {title}
                    </h2>
                    <p className="text-sm font-normal text-white-200 mt-2.5 leading-relaxed line-clamp-3">
                      {des}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 mt-auto">
                  <div className="flex items-center justify-between border-t border-white/5 pt-4">
                    {/* Tech icons stack */}
                    <div className="flex items-center">
                      {iconLists.map((icon, i) => (
                        <div
                          key={icon}
                          className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-white/[0.15] bg-black-100/90 transition-transform duration-200 hover:scale-115 hover:z-10"
                          style={{
                            transform: `translateX(-${6 * i}px)`,
                          }}
                        >
                          <Image
                            height={30}
                            width={30}
                            src={icon}
                            alt={icon}
                            className="p-1.5"
                          />
                        </div>
                      ))}
                    </div>

                    {/* Both links side-by-side */}
                    <div className="flex items-center gap-2.5">
                      <Link
                        href={sourceCode}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="flex items-center gap-1.5 bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 px-3 py-1.5 rounded-lg text-xs text-white-200 font-medium transition-all"
                      >
                        <FaGithub className="text-[11px]" /> Code
                      </Link>
                      <Link
                        href={link}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="flex items-center gap-1 bg-purple border border-purple/20 hover:bg-purple/80 px-3 py-1.5 rounded-lg text-xs text-white font-semibold transition-all shadow-md shadow-purple/20"
                      >
                        Live <FaLocationArrow className="text-[10px]" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {filteredProjects.length === 0 && (
              <div className="col-span-full py-16 text-center text-white-200">
                No projects matched your criteria.
              </div>
            )}
          </motion.div>
        ) : (
          // GitHub Real-Time Repositories Tab
          <motion.div
            key="github"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="w-full"
          >
            {loadingRepos ? (
              // Glassmorphism Shimmer Skeleton Loading State
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="h-[180px] w-full rounded-2xl border border-white/5 bg-white/[0.02] p-5 animate-pulse flex flex-col justify-between"
                  >
                    <div>
                      <div className="h-5 bg-white/10 rounded-md w-2/3 mb-4" />
                      <div className="h-3.5 bg-white/5 rounded-md w-full mb-2" />
                      <div className="h-3.5 bg-white/5 rounded-md w-4/5" />
                    </div>
                    <div className="h-4 bg-white/10 rounded-md w-1/3" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredRepos.slice(0, 15).map((repo) => (
                  <motion.div
                    key={repo.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="group relative rounded-2xl border border-white/5 bg-black-100/30 backdrop-blur-sm p-5 hover:border-purple/30 hover:bg-black-100/50 hover:shadow-lg hover:shadow-purple/5 transition-all duration-300 flex flex-col justify-between min-h-[220px]"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3.5">
                        <Link
                          href={repo.html_url}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="font-bold text-base text-white group-hover:text-purple transition-colors truncate max-w-[80%]"
                        >
                          {repo.name}
                        </Link>
                        <FaGithub className="text-white-200 text-lg opacity-60 group-hover:opacity-100 transition-opacity" />
                      </div>
                      
                      <p className="text-white-200 text-xs sm:text-sm line-clamp-3 mb-4 leading-relaxed font-light">
                        {repo.description || "No description provided."}
                      </p>
                    </div>

                    <div className="mt-auto">
                      {/* Mapped tech tags */}
                      <div className="flex flex-wrap gap-1.5 mb-3.5">
                        {getRepoTechStack(repo.name, repo.language, repo.description).map((tech) => (
                          <span key={tech} className="px-2 py-0.5 rounded-md bg-purple/10 border border-purple/20 text-purple text-[10px] font-semibold">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between border-t border-white/5 pt-3 text-xs">
                        {/* Language with color dot */}
                        <div className="flex items-center gap-1.5">
                          <span className={`h-2.5 w-2.5 rounded-full ${getLanguageColor(repo.language || "Markdown")}`} />
                          <span className="text-white-200 text-xs">
                            {repo.language || "Markdown"}
                          </span>
                        </div>

                        {/* Stars & Forks */}
                        <div className="flex items-center gap-3 text-white-200">
                          <span className="flex items-center gap-1 hover:text-yellow-400 transition-colors">
                            <FaStar className="text-yellow-500" /> {repo.stargazers_count}
                          </span>
                          <span className="flex items-center gap-1 hover:text-purple transition-colors">
                            <FaCodeBranch /> {repo.forks_count}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {filteredRepos.length === 0 && (
                  <div className="col-span-full py-16 text-center text-white-200">
                    No repositories matched your search query.
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};


