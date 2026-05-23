import type { Metadata } from "next";

export const links = {
  sourceCode: "https://github.com/akanshalakhina/3d-portfolio",
  ownerName: "Akansha Lakhina",
  ownerEmail: "akanshalakhina23@gmail.com",
  ownerPhone: "+91 8882609127",
  resumeUrl: "https://drive.google.com/file/d/1FSajxqK6OEFL0l1nBGQVIP_nADHque2h/view?usp=sharing",
  resumeEmbedUrl: "https://drive.google.com/file/d/1FSajxqK6OEFL0l1nBGQVIP_nADHque2h/preview",
  resumeDownloadUrl: "https://drive.google.com/uc?export=download&id=1FSajxqK6OEFL0l1nBGQVIP_nADHque2h",
  github: "https://github.com/akanshalakhina",
  linkedin: "https://www.linkedin.com/in/akansha2004/",
} as const;

export const siteConfig: Metadata = {
  title: `${links.ownerName} | AI + Full Stack Developer | MERN Stack Developer`,
  description:
    "Akansha Lakhina — AI & Full Stack Developer specializing in MERN Stack, React, Next.js, Node.js, and FastAPI. Amazon Future Engineer Scholar, GDG Solution Challenge Finalist, and fast learner building intelligent web systems.",
  keywords: [
    "akansha lakhina",
    "ai developer",
    "full-stack developer",
    "mern stack developer",
    "react developer",
    "next.js developer",
    "node.js developer",
    "fastapi developer",
    "amazon future engineer scholar",
    "gdg solution challenge",
    "web developer portfolio",
    "3d portfolio",
    "typescript",
    "javascript",
    "python",
    "java",
    "data structures and algorithms",
    "framer motion",
    "three.js",
  ] as Array<string>,
  authors: {
    name: links.ownerName,
    url: links.github,
  },
} as const;

