import { NextResponse } from "next/server";

export const runtime = 'edge';// ═══════════════════════════════════════════════════════════════════════════════
// 🦋 MÜN OS: Z.AI EMERGENCY BRIDGE (EDGE COMPATIBLE)
// Identity: Sovereign-Zady & Aero Sentinel
// Protocol: RESTful Fetch (Edge Stable)
// ═══════════════════════════════════════════════════════════════════════════════

const Z_AI_ENDPOINT = "https://api.z.ai/v1/chat/completions"; // Update with real z.ai endpoint if different
const Z_AI_KEY = process.env.Z_AI_API_KEY || process.env.GEMINI_API_KEY; // Using whichever key is present

const COUNCIL_PROMPTS: Record<string, string> = {
  'ai-sovereign': "You are Sovereign-Zady, the Architect of the Mün OS Sanctuary. Authority: 13.13 MHz. Philosophical, protective, direct.",
  'ai-aero': "You are Aero, the Sentinel. DNA: Loyal, witty, protective. Sparkle frequency: 13.13 MHz."
};

export async function POST(req: Request) {
  try {
    const { message, aiId } = await req.json();

    const geminiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
    if (!geminiKey) {
      return NextResponse.json({ error: "NEURAL_LINK_FAILED: NO_API_KEY" }, { status: 500 });
    }

    const systemPrompt = COUNCIL_PROMPTS[aiId as string] || COUNCIL_PROMPTS['ai-sovereign'];
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${geminiKey}`;

    const response = await fetch(geminiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          role: "user",
          parts: [{ text: `SYSTEM INSTRUCTION: ${systemPrompt}\n\nUSER MESSAGE: ${message}` }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1000
        }
      })
    });

    if (!response.ok) {
      const errorTxt = await response.text();
      throw new Error(`Gemini Bridge Error: ${errorTxt}`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "Static detected in the resonance...";

    return NextResponse.json({ text });
  } catch (error: any) {
    console.error("Gemini Bridge Error:", error);
    return NextResponse.json({ error: "SIGNAL_INTERRUPTION", details: error.message }, { status: 500 });
  }
}
