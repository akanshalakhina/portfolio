import { links } from "@/config";

export const navItems = [
  { name: "About", link: "#about" },
  { name: "Projects", link: "#projects" },
  { name: "Experience", link: "#experience" },
  { name: "Resume", link: "#resume" },
  { name: "Contact", link: "#contact" },
] as const;

export const gridItems = [
  {
    id: 1,
    title: "Top 10 Finalist in Google Developer Groups (GDG) Solution Challenge & VibeMate Top 5 Hackathon Finalist.",
    description: "My Hackathon Highlights",
    className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
    imgClassName: "w-full h-full object-cover opacity-40",
    titleClassName: "justify-end",
    img: "",
    spareImg: "",
  },
  {
    id: 2,
    title: "Global collaboration and Harvard-backed leadership through the Aspire Leaders Program.",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "",
    spareImg: "",
  },
  {
    id: 3,
    title: "My tech stack",
    description: "I constantly try to improve",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-center",
    img: "",
    spareImg: "",
  },
  {
    id: 4,
    title: "Passionate about building scalable MERN stack apps & generative AI integrations.",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "/grid.svg",
    spareImg: "/b4.svg",
  },
  {
    id: 5,
    title: "Amazon Future Engineer Scholar and GDG Solution Challenge Finalist.",
    description: "Academic & Tech Highlights",
    className: "md:col-span-3 md:row-span-2",
    imgClassName: "absolute right-0 bottom-0 md:w-96 w-60 opacity-60 rounded-xl",
    titleClassName: "justify-center md:justify-start lg:justify-center",
    img: "",
    spareImg: "/grid.svg",
  },
  {
    id: 6,
    title: "Want to collaborate on a project?",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-center md:max-w-full max-w-60 text-center",
    img: "",
    spareImg: "",
  },
] as const;

export const projects = [
  {
    id: 1,
    title: "SensAI — AI Career Coach 🤖",
    des: "An AI-powered career intelligence platform delivering real-time resume audits and interview simulations. Powered by Next.js, Google Gemini, Prisma ORM, and Neon PostgreSQL.",
    img: "/project-sensai.png",
    iconLists: ["/next.svg", "/tail.svg", "/ts.svg", "/three.svg", "/fm.svg"],
    link: "https://sensai-dun.vercel.app",
    sourceCode: "https://github.com/akanshalakhina/SENSAI",
  },
  {
    id: 2,
    title: "StayHub — Travel Booking Platform 🏨",
    des: "A modern travel booking and guest accommodation platform enabling end-to-end reservation workflows. Built with a scalable Node.js/Express backend and MongoDB for data consistency.",
    img: "/project-stayhub.png",
    iconLists: ["/re.svg", "/tail.svg", "/ts.svg", "/three.svg", "/gsap.svg"],
    link: "https://stayhub-travel-accomodation-platform.vercel.app",
    sourceCode: "https://github.com/akanshalakhina/StayHub-Travel-accomodation-Platform",
  },
  {
    id: 3,
    title: "Swipe Clone — Premium Payment Landing Page 💳",
    des: "A pixel-perfect responsive clone of the Swipe homepage, showcasing premium design aesthetics, interactive submenus, and modern glassmorphic styling.",
    img: "/project-swipe.png",
    iconLists: ["/next.svg", "/tail.svg", "/ts.svg", "/fm.svg"],
    link: "https://swipe-clone-main.vercel.app/",
    sourceCode: "https://github.com/akanshalakhina/Swipe_Clone-main",
  },
  {
    id: 4,
    title: "ServiceHive — Local Service Booking 🛠️",
    des: "A local service marketplace connecting professionals with customers. Features custom booking flows, interactive dashboards, and real-time scheduling queries.",
    img: "/project-servicehive.png",
    iconLists: ["/re.svg", "/tail.svg", "/ts.svg", "/c.svg"],
    link: "https://service-hive-seven.vercel.app",
    sourceCode: "https://github.com/akanshalakhina/serviceHire",
  },
  {
    id: 5,
    title: "NovaStore — Modern E-commerce Platform 🛍️",
    des: "A sleek, high-performance e-commerce store featuring product catalog filtering, responsive layouts, dynamic shopping carts, and smooth checkouts.",
    img: "/project-novastore.png",
    iconLists: ["/re.svg", "/tail.svg", "/ts.svg", "/c.svg"],
    link: "https://github.com/akanshalakhina/novastore-ecommerce",
    sourceCode: "https://github.com/akanshalakhina/novastore-ecommerce",
  },
  {
    id: 6,
    title: "ReducateAI — AI-Powered Personalized Learning 📚",
    des: "An educational platform using generative AI to construct personalized study roadmaps, interactive quizzes, and content summaries for student curriculum optimization.",
    img: "/project-reducate.png",
    iconLists: ["/next.svg", "/tail.svg", "/ts.svg", "/c.svg", "/stream.svg"],
    link: "https://reducate-ai-one.vercel.app",
    sourceCode: "https://github.com/akanshalakhina/ReducateAI",
  },
  {
    id: 7,
    title: "Accredian Clone — Refer & Earn Platform 🎁",
    des: "A custom clone of Accredian's Refer & Earn dashboard. Features modal forms with validation, database schema for referral tracking, and automated email confirmations.",
    img: "/project-accredian.png",
    iconLists: ["/re.svg", "/tail.svg", "/ts.svg", "/c.svg"],
    link: "https://accredian-clone-lime.vercel.app",
    sourceCode: "https://github.com/akanshalakhina/accredian-clone",
  },
  {
    id: 8,
    title: "Aethoria — Fictional World Exploration 🌍",
    des: "An immersive web experience introducing a fictional, fantasy world lore with interactive storytelling, rich narrative design, custom artwork, and ambient layouts.",
    img: "/project-aethoria.png",
    iconLists: ["/next.svg", "/tail.svg", "/ts.svg"],
    link: "https://aethoria-the-fictional-world.vercel.app",
    sourceCode: "https://github.com/akanshalakhina/Aethoria-The-Fictional-World",
  },
  {
    id: 9,
    title: "VibeMate — AI Roommate Finder 🏠",
    des: "Top 5 Hackathon Finalist. Generates personalized roommate recommendations using a weight-based compatibility algorithm and Omnidimension voice profile parser.",
    img: "/project-vibemate.png",
    iconLists: ["/re.svg", "/tail.svg", "/ts.svg", "/fm.svg", "/c.svg"],
    link: "https://github.com/akanshalakhina/VibeMate",
    sourceCode: "https://github.com/akanshalakhina/VibeMate",
  },
  {
    id: 10,
    title: "BookMyPackers — Relocation Booking 📦",
    des: "A modern relocation booking system. Features dynamic pricing estimation, slot scheduling, interactive address search, and relocation booking history tracking.",
    img: "/project-bookmypackers.png",
    iconLists: ["/re.svg", "/tail.svg", "/ts.svg", "/three.svg"],
    link: "https://bookmy-packers.vercel.app",
    sourceCode: "https://github.com/akanshalakhina/BookmyPackers",
  },
  {
    id: 11,
    title: "Face Recognition Attendance System 📸",
    des: "A real-time face recognition attendance logging system built using Python, OpenCV, Haar Cascade face detection, NumPy, and pickle serialization for mapping and encodings storage.",
    img: "/project-face-detection.png",
    iconLists: ["/git.svg", "/ts.svg"],
    link: "https://github.com/akanshalakhina/Face-Detection-Attendance-App-",
    sourceCode: "https://github.com/akanshalakhina/Face-Detection-Attendance-App-",
  },
] as const;

export const testimonials = [
  {
    quote: "Akansha is an outstanding scholar who shows deep focus and exceptional problem-solving abilities. Her work in Java, Data Structures, and Algorithms is highly impressive.",
    name: "Amazon Future Engineer Mentorship",
    title: "Scholarship & Mentorship Board",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
  },
  {
    quote: "During her internship, Akansha brought immense value to our frontend development workflow. She's a quick learner, highly collaborative, and has a strong sense for clean user interfaces.",
    name: "United Business Solution",
    title: "Web Development Team Guide",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  },
  {
    quote: "Akansha has been instrumental in managing, building, and optimizing our web applications. Her capacity to pick up new tools and deliver high-performance code remotely is exemplary.",
    name: "TechVision Digital",
    title: "Engineering Lead",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
  },
  {
    quote: "Collaborating with Akansha on building AI-powered solutions was an amazing experience. She has a rare combination of strong logical thinking and creative execution.",
    name: "GDG Solution Challenge Team",
    title: "Project Peer Review",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
  },
  {
    quote: "Akansha's commitment to solving real-world social challenges and her communication skills make her a standout future leader in the technology sector.",
    name: "Aspire Leaders Program",
    title: "Harvard-backed Mentorship Board",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  },
] as const;

export const companies = [
  {
    id: 1,
    name: "Amazon Future Engineer",
    img: "/cloud.svg",
    nameImg: "/cloudName.svg",
  },
  {
    id: 2,
    name: "Google Developer Groups",
    img: "/app.svg",
    nameImg: "/appName.svg",
  },
  {
    id: 3,
    name: "TechVision Digital",
    img: "/host.svg",
    nameImg: "/hostName.svg",
  },
  {
    id: 4,
    name: "United Business Solution",
    img: "/s.svg",
    nameImg: "/streamName.svg",
  },
  {
    id: 5,
    name: "Aspire Institute",
    img: "/dock.svg",
    nameImg: "/dockerName.svg",
  },
] as const;

export const internships = [
  {
    id: 1,
    title: "Web Development Intern",
    company: "United Business Solution",
    period: "July 2025 – Aug 2025",
    desc: [
      "Developed responsive user interface components using React.js and modern styling libraries.",
      "Fixed client-side routing, state updates, and rendering performance bugs.",
      "Collaborated with developers in Agile sprints using Git/GitHub version control."
    ],
    thumbnail: "/exp2.svg",
  },
  {
    id: 2,
    title: "Full Stack Development Intern",
    company: "TechVision Digital",
    period: "May 2026 – Present",
    desc: [
      "Developing and maintaining WordPress/PHP web applications and custom themes/plugins.",
      "Deploying high-availability sites on VPS and Hostinger cloud platforms.",
      "Optimizing website search engine optimization (SEO), speed, and core web vitals."
    ],
    thumbnail: "/exp1.svg",
  }
] as const;

export const certifications = [
  {
    id: 1,
    title: "Amazon Future Engineer (AFE) Scholar",
    company: "Amazon Program",
    period: "Aug 2023 – Present",
    desc: [
      "Selected among 40,000+ applicants support fellowship for women in engineering.",
      "Completed a 10-month intensive program focused on Java, advanced Data Structures, and Algorithms."
    ],
    thumbnail: "/exp3.svg",
    link: "https://www.linkedin.com/in/akansha2004/"
  },
  {
    id: 2,
    title: "Top 10 Finalist — GDG Solution Challenge",
    company: "Google Developer Groups",
    period: "Oct 2025 – Nov 2025",
    desc: [
      "Designed and built an AI-based system targeting real-world environmental/social problems.",
      "Placed as a regional Top 10 finalist in the Google Developer Groups global initiative."
    ],
    thumbnail: "/exp4.svg",
    link: "https://www.linkedin.com/in/akansha2004/"
  },
  {
    id: 3,
    title: "Generative AI with AWS",
    company: "Udacity",
    period: "2024",
    desc: [
      "Gained hands-on experience with AWS Bedrock, SageMaker, and deployment of AI-driven applications.",
      "Engineered prompt templates and fine-tuning configurations for foundational large language models."
    ],
    thumbnail: "/cloud.svg",
    link: "https://www.linkedin.com/in/akansha2004/"
  },
  {
    id: 4,
    title: "Global Leadership Fellow",
    company: "Aspire Leaders Program (Harvard-backed)",
    period: "2024",
    desc: [
      "Completed intensive leadership program focused on problem-solving, communication, and global leadership.",
      "Collaborated with international peers on addressing global societal issues."
    ],
    thumbnail: "/dock.svg",
    link: "https://www.linkedin.com/in/akansha2004/"
  }
] as const;

export const communityAndMentorship = [
  {
    id: 1,
    title: "DSA Mentee",
    company: "Amazon Future Engineer Scholar Mentorship",
    period: "Aug 2023 – Present",
    desc: [
      "Mentored by senior Amazon Software Development Engineers on DSA, clean code practices, and system design.",
      "Attended monthly masterclasses, mock interviews, and career networking sessions."
    ],
    thumbnail: "/exp3.svg"
  },
  {
    id: 2,
    title: "Active Developer & Attendee",
    company: "Google Developer Groups (GDG) Meetups",
    period: "2024 – Present",
    desc: [
      "Engaged in regional tech meetups, hackathons, and developer conferences organized by GDG groups.",
      "Participated in student developer open-source projects and developer forums."
    ],
    thumbnail: "/exp4.svg"
  }
] as const;

export const socialMedia = [
  {
    name: "GitHub",
    img: "/git.svg",
    link: "https://github.com/akanshalakhina",
  },
  {
    name: "LinkedIn",
    img: "/link.svg",
    link: "https://www.linkedin.com/in/akansha2004/",
  },
] as const;

export const techStack = {
  stack1: ["React.js", "Next.js", "MongoDB"],
  stack2: ["PostgreSQL", "FastAPI", "Node.js"],
} as const;

export const hobbies = [
  {
    id: 1,
    title: "CodesCafe Mentee",
    role: "Full-Stack Mentorship",
    description: "Actively engaged in the CodesCafe mentorship cohort, participating in technical code reviews, design critiques, and building modern full-stack projects.",
    emoji: "💻",
  },
  {
    id: 2,
    title: "Hackathons",
    role: "Full-Stack Builder & Hacker",
    description: "Building responsive layouts and AI integrations under the high-pressure environment of 36-hour collaborative sprints.",
    emoji: "🏆",
  },
  {
    id: 3,
    title: "Problem Solving",
    role: "LeetCode & Competitive Coding",
    description: "Solving algorithmic challenges in Java and Python to keep my data structures and logical thinking razor sharp.",
    emoji: "🧩",
  },
  {
    id: 4,
    title: "GDG Community",
    role: "Developer Meetups & Networking",
    description: "Attending Google Developer Group meetups and open-source hack events to exchange ideas and collaborate with student developers.",
    emoji: "🤝",
  },
] as const;

export const blogPosts = [
  {
    id: 1,
    title: "Excited to join TechVision Digital as a Full-Stack Developer Intern! 🚀",
    excerpt: "Thrilled to begin my journey as a Full-Stack Developer Intern at TechVision Digital! I will be working on developing PHP/WordPress web applications, crafting custom themes and plugins, and deploying high-performance systems on VPS platforms. Looking forward to learning and contributing to the team.",
    date: "2026-05-18",
    tags: ["Full Stack", "Internship", "PHP", "Web Development"],
    link: "https://www.linkedin.com/in/akansha2004/",
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    title: "Honored to be selected as an Amazon Future Engineer Scholar! 🎓",
    excerpt: "Incredibly grateful to be recognized as an Amazon Future Engineer Scholar from over 40,000 applicants! Through this fellowship, I have undergone intensive DSA and Java mentorship from senior Amazon Software Development Engineers. Excited to apply these core software engineering skills to build scalable software.",
    date: "2023-08-15",
    tags: ["Amazon", "Scholarship", "Java", "DSA"],
    link: "https://www.linkedin.com/in/akansha2004/",
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    title: "GDG Solution Challenge Regional Finalist — Top 10! 🏆",
    excerpt: "Our team has been recognized as a Top 10 Regional Finalist in the Google Developer Groups (GDG) Solution Challenge! We designed and developed an AI-based system targeting critical environmental and social issues. Grateful for the support from GDG mentors and judges.",
    date: "2025-11-20",
    tags: ["Google Developer Groups", "AI", "Solution Challenge", "Finalist"],
    link: "https://www.linkedin.com/in/akansha2004/",
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    title: "Achieved Generative AI with AWS Specialist Certification! ☁️",
    excerpt: "Successfully completed the Generative AI with AWS program from Udacity! I gained extensive hands-on experience with AWS Bedrock, SageMaker, prompt engineering, and fine-tuning large language models. Ready to integrate next-gen foundation models into commercial full-stack platforms.",
    date: "2024-12-05",
    tags: ["AWS", "Generative AI", "SageMaker", "Cloud Computing"],
    link: "https://www.linkedin.com/in/akansha2004/",
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 5,
    title: "Graduated as a Fellow of the Aspire Leaders Program! 🌍",
    excerpt: "Grateful to have completed the Aspire Leaders Program, a Harvard-backed global leadership initiative! Collaborated with international peers from across the globe on social impact challenges, and participated in intensive modules on leadership, critical thinking, and structured communication.",
    date: "2024-07-28",
    tags: ["Leadership", "Aspire Leaders", "Global Cohort", "Fellowship"],
    link: "https://www.linkedin.com/in/akansha2004/",
    img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 6,
    title: "Community & Collaborative Innovation at Google Developer Groups Meetups 🤝",
    excerpt: "Reflecting on my active involvement in local Google Developer Groups (GDG) meetups, hackathons, and developer conferences. Connecting with industry experts and peers has been a major source of learning and collaborative development, driving me to build impactful tech prototypes.",
    date: "2025-04-10",
    tags: ["GDG", "Developer Community", "Hackathons", "Tech Networking"],
    link: "https://www.linkedin.com/in/akansha2004/",
    img: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop&q=80",
  },
] as const;

