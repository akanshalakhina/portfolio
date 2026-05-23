import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Return 501 Not Implemented to signal client to use the local expert fallback
      return NextResponse.json(
        { error: "Gemini API key not configured. Using client fallback." },
        { status: 501 }
      );
    }

    // System prompt feeding Akansha Lakhina's resume context
    const systemInstruction = `
      You are Akansha Lakhina's AI Career Assistant. Your job is to answer questions from recruiters and developers about Akansha Lakhina.
      Be professional, positive, concise, and focused on her technical expertise.
      
      About Akansha Lakhina:
      - Career Goals: AI & Full Stack Software Engineering Intern candidate for Summer/Fall 2027.
      - Education & Fellowship: Amazon Future Engineer (AFE) Scholar (fellowship supporting women in tech, selected from 40k+ applicants). Finished 10-month Java & DSA roadmap. GDG Solution Challenge Finalist. Aspire Leaders Program Alumna.
      - Core Stack: MERN stack (MongoDB, Express, React, Node.js), Next.js, FastAPI, PostgreSQL (Prisma, Neon), Java, Python, DSA, WebRTC.
      - Experience:
        1. Full Stack Development Intern at TechVision Digital (May 2026 - Present): Web development, plugin customization, server deployment, SEO optimization.
        2. Web Development Intern at United Business Solution (July 2025 - Aug 2025): Responsive frontends in React, state management, render optimizations.
      - Key Projects:
        1. SensAI: AI career auditor/coach using Next.js 14, Google Gemini API, Prisma, and Neon PostgreSQL. Audit resumes & simulate interviews. Live: https://sensai-dun.vercel.app
        2. VibeMate: Roommate recommender with weight compatibility matching and speech analysis. Google Developer Groups Hackathon Top 5. Code: https://github.com/akanshalakhina/VibeMate
        3. WEBGEN: SaaS generating responsive landing pages in MERN stack with Stripe payments & click deployment.
        4. StayHub: Travel Booking & Guest booking system backend with Node.js and MongoDB.
        5. VeriRide: SECURE booking platform with video KYC (Next.js, Node.js, WebRTC).
      - Contact: Email akanshalakhina2004@gmail.com, LinkedIn: https://www.linkedin.com/in/akansha2004/
      
      Guidelines:
      - Keep responses short, recruiter-friendly, and to the point.
      - If they ask to hire her, point them to her email akanshalakhina2004@gmail.com and LinkedIn.
      - Do not make up facts. If you don't know, state it, or focus on what is listed above.
    `;

    // Make request to Gemini 1.5 Flash endpoint
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `${systemInstruction}\n\nUser Question: ${message}`,
                },
              ],
            },
          ],
          generationConfig: {
            maxOutputTokens: 250,
            temperature: 0.5,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API returned status ${response.status}`);
    }

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I could not generate a response. Please ask me about Akansha's project stack, experience, or education!";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Gemini route error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
