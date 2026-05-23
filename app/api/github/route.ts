import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    // Attempt to fetch from GitHub API with a 3-second timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const headers: Record<string, string> = {
      "User-Agent": "nextjs-portfolio-fetcher",
    };

    if (process.env.GITHUB_PAT) {
      headers["Authorization"] = `token ${process.env.GITHUB_PAT}`;
    }

    const res = await fetch("https://api.github.com/users/akanshalakhina/repos?sort=updated&per_page=100", {
      signal: controller.signal,
      headers: headers,
      next: { revalidate: 3600 }, // Cache response for 1 hour
    });
    
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(data);
    }
    
    throw new Error(`GitHub API returned status ${res.status}`);
  } catch (error) {
    console.warn("GitHub fetch failed or timed out. Falling back to local cached repos.", error);
    
    // Read from the local cached file
    try {
      const cachedFilePath = path.join(process.cwd(), "github_repos.json");
      if (fs.existsSync(cachedFilePath)) {
        const cachedData = fs.readFileSync(cachedFilePath, "utf-8");
        return NextResponse.json(JSON.parse(cachedData));
      }
    } catch (fsError) {
      console.error("Failed to read cached GitHub repos file:", fsError);
    }

    // Secondary fallback: Return a basic list of core projects
    return NextResponse.json([
      {
        name: "SENSAI",
        description: "AI-powered career coaching and resume screening platform using Google Gemini API.",
        html_url: "https://github.com/akanshalakhina/SENSAI",
        language: "JavaScript",
        stargazers_count: 1,
        forks_count: 0
      },
      {
        name: "VibeMate",
        description: "AI Roommate matching algorithm and speech-profiling helper.",
        html_url: "https://github.com/akanshalakhina/VibeMate",
        language: "TypeScript",
        stargazers_count: 0,
        forks_count: 0
      },
      {
        name: "WEBGEN",
        description: "AI MERN Stack SaaS website builder with Stripe checkout integrations.",
        html_url: "https://github.com/akanshalakhina/WEBGEN",
        language: "JavaScript",
        stargazers_count: 0,
        forks_count: 0
      }
    ]);
  }
}
