import { NextResponse } from "next/server";

import { SYSTEM_PROMPT } from "@/lib/twin";

type Turn = { role: "user" | "ai"; text: string };

// Best-effort per-instance rate limit: 20 questions per IP per 10 minutes.
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 20;
const hits = new Map<string, number[]>();

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > LIMIT;
}

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    // 501 tells the client to answer from its offline knowledge base instead.
    return NextResponse.json({ error: "No model configured." }, { status: 501 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (limited(ip)) {
    return NextResponse.json({ error: "Too many questions — try again in a few minutes." }, { status: 429 });
  }

  let body: { message?: unknown; history?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const message = typeof body.message === "string" ? body.message.trim().slice(0, 500) : "";
  if (!message) return NextResponse.json({ error: "Message is required." }, { status: 400 });

  const history: Turn[] = Array.isArray(body.history)
    ? (body.history as Turn[])
        .filter((t) => t && (t.role === "user" || t.role === "ai") && typeof t.text === "string")
        .slice(-6)
        .map((t) => ({ role: t.role, text: t.text.slice(0, 800) }))
    : [];

  const model = process.env.GEMINI_MODEL ?? "gemini-2.5-flash";

  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT() }] },
        contents: [
          ...history.map((t) => ({ role: t.role === "ai" ? "model" : "user", parts: [{ text: t.text }] })),
          { role: "user", parts: [{ text: message }] },
        ],
        generationConfig: { maxOutputTokens: 300, temperature: 0.4 },
      }),
      signal: AbortSignal.timeout(15_000),
    });

    if (!res.ok) throw new Error(`Gemini returned ${res.status}`);
    const data = await res.json();
    const reply: string | undefined = data?.candidates?.[0]?.content?.parts
      ?.map((p: { text?: string }) => p.text ?? "")
      .join("")
      .trim();
    if (!reply) throw new Error("Empty reply");
    return NextResponse.json({ reply });
  } catch (err) {
    console.error("chat route:", err);
    return NextResponse.json({ error: "Model unavailable." }, { status: 502 });
  }
}
