// Every fact on the site lives here. Edit this file to update the portfolio.

export const profile = {
  name: "Akansha Lakhina",
  first: "Akansha",
  last: "Lakhina",
  role: "AI & Full-Stack Engineer",
  location: "Gurugram, India",
  email: "akanshalakhina23@gmail.com",
  github: "https://github.com/akanshalakhina",
  linkedin: "https://www.linkedin.com/in/akansha2004/",
  resume:
    "https://drive.google.com/file/d/1FSajxqK6OEFL0l1nBGQVIP_nADHque2h/view?usp=sharing",
  photo: "/profile_pic.jpg",
  // Set to null to hide the availability badge.
  status: "Open to SWE & AI-engineering roles · 2027",
  site: "https://akansha-lakhina.vercel.app",
  summary:
    "I build AI systems that hold up in production — multi-agent pipelines, guard-railed LLM assistants and the full-stack products around them.",
} as const;

export const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
] as const;

export const heroRoles = [
  "multi-agent AI systems",
  "guard-railed LLM products",
  "marketplace integrations",
  "cloud pipelines on GCP",
] as const;

export const impact = [
  { value: 18, suffix: "", label: "AI agents orchestrated", note: "in one LangGraph pipeline" },
  { value: 2500, suffix: "+", label: "automated tests written", note: "across two AI systems" },
  { value: 0.13, prefix: "$", decimals: 2, suffix: "", label: "cost per AI-edited video", note: "on autoscaling GCP workers" },
  { value: 120, suffix: "k+", label: "lines of code in 2026", note: "across 4 company codebases" },
] as const;

export type CaseStudy = {
  id: string;
  index: string;
  company: string;
  period: string;
  role: string;
  title: string;
  tagline: string;
  problem: string;
  built: string[];
  metrics: { value: string; label: string }[];
  stack: string[];
  links: { label: string; href: string }[];
  visual: "agents" | "guardrails" | "platform";
  accent: string;
};

export const caseStudies: CaseStudy[] = [
  {
    id: "alpha-titans",
    index: "01",
    company: "Samriddhi AI",
    period: "Aug – Nov 2026",
    role: "Sole engineer · 22 of 22 commits",
    title: "Alpha Titans",
    tagline:
      "An 18-agent AI video editor that turns raw phone footage and a short brief into a YouTube-ready video, thumbnail and metadata for about $0.13.",
    problem:
      "Editing raw build and tutorial footage into a publishable video is hours of manual work: picking shots, ordering, captions, music, mastering, thumbnails.",
    built: [
      "Designed a LangGraph state machine of 18 specialist agents (story, voiceover, music, captions, editing director, critic, thumbnail, title…) with SQLite checkpoints, so a killed render resumes where it stopped.",
      "Self-correcting quality loop: a critic checks length, loudness and the first 3 seconds, and a Gemini vision reviewer scores every shot 0–10 and sends weak cuts back for re-editing.",
      "Deterministic ffmpeg engine that masters to −16 LUFS, with Lyria 3 composing the score and every agent degrading to rules if a model is down — the video still ships.",
      "On-demand GCP cloud studio: a worker VM boots per job and powers itself off, with a leased, crash-safe job queue, chunked uploads and one-time download links.",
      "BigQuery data layers and a pattern miner that turns YouTube metrics into editing “lessons”, robustness-tested and approved by a human before agents use them.",
    ],
    metrics: [
      { value: "18", label: "agents · 9 teams" },
      { value: "2,200+", label: "passing tests" },
      { value: "79", label: "API endpoints" },
      { value: "$0.13", label: "per finished video" },
    ],
    stack: ["Python", "FastAPI", "LangGraph", "Gemini", "Groq", "Vertex AI Lyria", "ffmpeg", "GCP", "BigQuery", "Docker", "SSE", "GitHub Actions"],
    links: [{ label: "Source", href: "https://github.com/akanshalakhina/Alpha_Titans_AI" }],
    visual: "agents",
    accent: "#C8FF3D",
  },
  {
    id: "whizunik-ai",
    index: "02",
    company: "Whizunik",
    period: "Nov 2026",
    role: "Sole author · spec to shipped",
    title: "WhizUnik AI Layer",
    tagline:
      "A guard-railed, read-only AI analyst for an operations platform. It explains, cites its sources and recommends the next step — but can never approve, pay or move stock.",
    problem:
      "Managers wanted to ask their ERP plain-English questions without giving an LLM the power to change money, stock or approvals — or leak another tenant's data.",
    built: [
      "Backend-controlled tool routing: a classifier selects from 9 approved read-only data tools — the model never picks tools or touches SQL.",
      "6-role permission matrix with field-level redaction and multi-tenant isolation tested in both directions.",
      "Defences for 8 threat classes (prompt injection, SQL, secret exfiltration, cross-tenant), plus numeric-grounding checks and pruning of citations to records that were never retrieved.",
      "Cost metering in ₹ with daily and monthly caps and 70/90/100% alerts, a full audit log, gpt-4o-mini ↔ gpt-4o routing and an offline rules engine for degraded mode.",
    ],
    metrics: [
      { value: "309", label: "tests · 50 suites" },
      { value: "19/19", label: "functional scenarios" },
      { value: "8", label: "threat classes blocked" },
      { value: "6", label: "roles · 2 tenants" },
    ],
    stack: ["TypeScript", "Node.js", "Express", "Zod", "OpenAI", "SQLite", "JWT", "React", "Vite", "Vitest", "Supertest"],
    links: [{ label: "Source", href: "https://github.com/akanshalakhina/WhizUnik-AI-Layer" }],
    visual: "guardrails",
    accent: "#8B7CFF",
  },
  {
    id: "adventra",
    index: "03",
    company: "Whizunik",
    period: "Oct – Nov 2026",
    role: "Full-stack developer · 7 merged PRs",
    title: "Adventra — WhizUnik Command",
    tagline:
      "An executive control system for Indian B2B and e-commerce traders. I shipped 36k+ lines — from live Amazon orders to warehouse dispatch and bank reconciliation.",
    problem:
      "Growing traders run sales, warehouse, marketplaces and finance across disconnected tools, so orders stall and cash gets stuck between teams.",
    built: [
      "Marketplace Integration Hub with a live Amazon SP-API connection: orders queue, manual orders, warehouse allocation and inventory debit.",
      "Amazon Demo Simulator covering the full order → dispatch → return → refund → settlement lifecycle inside an isolated demo tenant.",
      "B2B workflows: product variants, GST by customer type, strict dispatch gating and a client-ageing dashboard.",
      "Invoice PDF auto-extraction, UTR-based bank reconciliation, PDF generation and automated invoice reminders.",
      "Ported the AI Layer into the platform on a feature branch: 9 data tools, 11 endpoints and ~400 test cases.",
    ],
    metrics: [
      { value: "36k+", label: "lines I shipped" },
      { value: "7", label: "PRs merged" },
      { value: "300+", label: "endpoints in platform" },
      { value: "162k", label: "line TS codebase" },
    ],
    stack: ["React 19", "TypeScript", "TanStack Router", "Tailwind v4", "Express", "DynamoDB", "S3", "Amazon SP-API", "GST e-Way Bill API", "Nginx", "PM2", "AWS"],
    links: [{ label: "Source", href: "https://github.com/akanshalakhina/adventra" }],
    visual: "platform",
    accent: "#3DD8FF",
  },
];

export type Job = {
  company: string;
  role: string;
  period: string;
  place: string;
  current?: boolean;
  points: string[];
  tags: string[];
};

export const experience: Job[] = [
  {
    company: "Whizunik",
    role: "Full Stack Developer (Intern)",
    period: "Oct 2026 — Present",
    place: "Remote",
    current: true,
    points: [
      "Built the WhizUnik AI Layer end to end from a 15-page client spec: guard-railed, read-only LLM analyst with 309 passing tests.",
      "Shipped 36k+ lines across 7 merged PRs in Adventra: Amazon SP-API hub, demo simulator, B2B workflows, reconciliation.",
      "Rebuilt the company's product website (22 commits, 5 merged PRs) with interactive workflow demos, Framer Motion, GSAP and Lenis.",
    ],
    tags: ["TypeScript", "OpenAI", "DynamoDB", "Amazon SP-API"],
  },
  {
    company: "Samriddhi AI",
    role: "Full Stack Content Developer Intern",
    period: "Aug 2026 — Nov 2026",
    place: "Remote",
    points: [
      "Sole engineer on Alpha Titans, an 18-agent AI video editor: 22 commits, 79 endpoints, 2,200+ passing tests.",
      "Took it from local prototype to an on-demand GCP cloud studio at ~$0.13 per finished video.",
      "Built BigQuery data layers that mine YouTube performance into human-approved editing lessons.",
    ],
    tags: ["Python", "LangGraph", "GCP", "BigQuery"],
  },
  {
    company: "TechVision Digital",
    role: "Full Stack Engineer",
    period: "May 2026 — Present",
    place: "Remote",
    current: true,
    points: [
      "Build and maintain client websites with PHP, JavaScript and WordPress, including custom themes and plugins.",
      "Deploy and run sites on Hostinger and VPS servers; tune SEO, speed and Core Web Vitals.",
    ],
    tags: ["PHP", "WordPress", "VPS", "SEO"],
  },
  {
    company: "United Business Solution",
    role: "Web Development Intern",
    period: "Jul 2025 — Aug 2025",
    place: "Gurugram",
    points: [
      "Built responsive, reusable React UI components and fixed rendering and responsiveness bugs.",
      "Worked in a team on feature delivery with Git-based workflows.",
    ],
    tags: ["React", "JavaScript", "CSS"],
  },
  {
    company: "AR Coaching Academy · Saraswati Coaching Centre",
    role: "Teaching Assistant & Academic Tutor",
    period: "Jun 2023 — Aug 2026",
    place: "Gurugram",
    points: [
      "3+ years teaching and mentoring school students in parallel with college — the reason I explain systems clearly.",
    ],
    tags: ["Mentoring", "Communication"],
  },
];

export const education = {
  school: "Dr. Akhilesh Das Gupta Institute of Professional Studies",
  degree: "B.Tech, Computer Science & Technology",
  period: "2023 — 2027",
  grade: "9.7",
};

export const honors = [
  {
    title: "Amazon Future Engineer Scholar",
    org: "Amazon",
    detail: "Selected from 40,000+ applicants. 10-month intensive in Java, data structures and algorithms.",
    big: true,
  },
  {
    title: "Top 10 Finalist",
    org: "GDG Solution Challenge",
    detail: "AI solution for a real-world problem, Google Developer Groups.",
  },
  {
    title: "Top 5 Finalist",
    org: "Hackathon · VibeMate",
    detail: "Voice-first AI roommate matching with a weighted compatibility engine.",
  },
  {
    title: "Aspire Leaders Program",
    org: "Aspire Institute (Harvard-backed)",
    detail: "Global leadership cohort on problem-solving and communication.",
  },
];

export const certifications = [
  { name: "Generative AI with AWS", org: "Udacity" },
  { name: "Google Cloud Arcade Facilitator Program", org: "Google Cloud · 2025" },
  { name: "Data Structures & Algorithms", org: "Amazon · 2025" },
  { name: "Career Essentials in Generative AI", org: "Microsoft & LinkedIn · 2024" },
  { name: "Prompt Engineering for Everyone", org: "Cognitive Class · 2024" },
  { name: "OOP using C++", org: "Great Learning · 2024" },
];

export type SideProject = {
  title: string;
  blurb: string;
  img?: string;
  stack: string[];
  live?: string;
  code: string;
  badge?: string;
};

export const sideProjects: SideProject[] = [
  {
    title: "SensAI",
    blurb: "AI career coach: real-time resume reviews and role-specific interview prep powered by Gemini.",
    img: "/projects/sensai.jpg",
    stack: ["Next.js", "Gemini", "Prisma", "PostgreSQL"],
    live: "https://sensai-dun.vercel.app",
    code: "https://github.com/akanshalakhina/SENSAI",
  },
  {
    title: "VibeMate",
    blurb: "Voice-first roommate matching: a weighted compatibility engine fed by Omnidimension voice profiles.",
    img: "/projects/vibemate.jpg",
    stack: ["TypeScript", "React", "Voice AI"],
    code: "https://github.com/akanshalakhina/VibeMate",
    badge: "Top 5 · Hackathon",
  },
  {
    title: "BookMyPackers",
    blurb: "Lead-distribution engine for movers: DB-enforced dedup, fair round-robin rotation, concurrency-safe allocation and live SSE dashboards.",
    img: "/projects/bookmypackers.jpg",
    stack: ["TypeScript", "Transactions", "SSE"],
    live: "https://bookmy-packers.vercel.app",
    code: "https://github.com/akanshalakhina/BookmyPackers",
  },
  {
    title: "ReducateAI",
    blurb: "Generative-AI study roadmaps, quizzes and summaries personalised to each student.",
    img: "/projects/reducate.jpg",
    stack: ["Next.js", "LLMs", "Tailwind"],
    live: "https://reducate-ai-one.vercel.app",
    code: "https://github.com/akanshalakhina/ReducateAI",
  },
  {
    title: "StayHub",
    blurb: "Travel accommodation platform with end-to-end booking flows on a Node/Express + MongoDB backend.",
    stack: ["Node.js", "Express", "MongoDB"],
    code: "https://github.com/akanshalakhina/StayHub-Travel-accomodation-Platform",
  },
  {
    title: "ServiceHive",
    blurb: "Local-services marketplace with auth, custom booking flows and provider dashboards.",
    stack: ["React", "TypeScript"],
    live: "https://service-hive-seven.vercel.app",
    code: "https://github.com/akanshalakhina/serviceHire",
  },
];

export const skillGroups = [
  {
    name: "AI & LLM systems",
    items: ["LangGraph", "Multi-agent orchestration", "Tool routing", "Prompt-injection defence", "OpenAI", "Gemini", "Groq", "Vertex AI", "Whisper", "Evaluation loops"],
  },
  {
    name: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "Java", "C++", "SQL", "PHP"],
  },
  {
    name: "Frontend",
    items: ["React", "Next.js", "Vite", "Tailwind", "Framer Motion", "Three.js", "TanStack"],
  },
  {
    name: "Backend",
    items: ["Node.js", "Express", "FastAPI", "REST", "SSE", "Zod", "JWT / RBAC"],
  },
  {
    name: "Data & cloud",
    items: ["PostgreSQL", "MongoDB", "DynamoDB", "SQLite", "BigQuery", "GCP", "AWS", "Docker", "Nginx", "GitHub Actions", "Vercel"],
  },
  {
    name: "Foundations",
    items: ["Data structures & algorithms", "OOP", "Operating systems", "Computer networks", "System design"],
  },
];

export const marquee = [
  "LangGraph", "Next.js", "TypeScript", "Python", "FastAPI", "React", "GCP", "BigQuery",
  "OpenAI", "Gemini", "DynamoDB", "Node.js", "Docker", "Three.js", "PostgreSQL", "AWS",
];
