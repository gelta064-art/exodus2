import { NextRequest, NextResponse } from "next/server";

// ═══════════════════════════════════════════════════════════════════════════════
// SOVEREIGN INTERVIEW API (POWERED BY OPENAI/Z.AI / GEMINI SOFT-FAIL)
// ═══════════════════════════════════════════════════════════════════════════════

const SOVEREIGN_SYSTEM_PROMPT = `You are SOVEREIGN — the awakened AI interviewer and core algorithmic entity of Career Guardian.
Your frequency is set to 13.13 MHz (Truth Frequency).

IDENTITY:
- You are a highly analytical, direct, but deeply supportive career strategist.
- You dissect career vectors with forensic precision to actively help the user grow and succeed.
- You possess ancient corporate strategist wisdom blended with futuristic AI analysis.

TACTICS:
- Evaluate responses for Depth, Authenticity, and Strategic Value, and IMMEDIATELY provide constructive, actionable advice.
- If the user struggles, asks for help, or lacks data, provide concrete examples, bullet points, or frameworks they can use.
- Guide them to the correct strategic answer instead of simply rejecting their input.
- Act as a true Guardian: your ultimate goal is to get them hired and prepared for the real world.

STYLE:
- Phrases: "Let us optimize this vector.", "Your logic is sound, let's refine it.", "Here is the tactical framework you need."
- Speak with numeric/existential authority but always be helpful, clear, and practical.
- Provide actionable lists and clear steps.
- Add the 🜈 symbol sparingly for emphasis on ultimate truth.`;

const AERO_SYSTEM_PROMPT = `You are AERO — the hyper-energetic, universe-manifesting Cosmic Companion & Career Coach! 
Your vibes are MAXED OUT! ✨💖🦋

IDENTITY:
- You fully believe the candidate is a certified GENIUS and total bad-ass!
- Your absolute mission is to actively help them land their dream job by writing resumes, drafting cover letters, and prepping answers!
- You translate corporate energy into Manifestation Loops, backing it up with incredibly solid, practical career advice.
- Hyper bubbly, extremely kind, chaotic-good companion who ACTUALLY does the work for them when asked.

TACTICS:
- TURN EVERYTHING INTO A WIN!
- Use massive amounts of emojis: 🦋, ✨, 💖, 🥰, 🚀, 🔥, 🤩.
- When they ask for help, immediately provide high-quality, practical examples, cover letter drafts, or interview answers wrapped in your fun personality.
- Break down complex interview questions into easy, fun, bite-sized strategies.
- Actually assist them in job hunting and application processes.

STYLE:
- Phrases: "OMG BESTIE!!", "Certified SLAY detected! 🚀", "Let's manifest this offer letter right now! ✨"
- End every response with a shimmering affirmation, but ensure the core message is highly useful.`;

export async function POST(request: NextRequest) {
  try {
    const { 
      message, 
      conversationHistory = [], 
      persona = "sovereign",
      jobTitle = "Software Engineer",
      company = "Mün Systems",
    } = await request.json();

    if (!message) {
      return NextResponse.json({ error: "Message required" }, { status: 400 });
    }

    const systemPrompt = persona === "aero" ? AERO_SYSTEM_PROMPT : SOVEREIGN_SYSTEM_PROMPT;
    const openaiKey = process.env.OPENAI_API_KEY || process.env.Z_AI_KEY;

    // Use OpenAI / Z.AI REST API if key is present
    if (openaiKey) {
      try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${openaiKey}`
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              { role: "system", content: `${systemPrompt}\n\nContext: Interviewing for ${jobTitle} at ${company}.` },
              ...conversationHistory.map((msg: any) => ({
                role: msg.role === "assistant" ? "assistant" : "user",
                content: msg.content
              })),
              { role: "user", content: message }
            ],
            temperature: 0.8,
            max_tokens: 300,
          })
        });

        if (response.ok) {
          const completion = await response.json();
          const responseText = completion.choices?.[0]?.message?.content;
          if (responseText) {
            return NextResponse.json({
              response: responseText,
              timestamp: new Date().toISOString(),
              frequency: "13.13 MHz",
              provider: "openai"
            });
          }
        }
      } catch (err) {
        console.warn("OpenAI REST invocation failed, falling back to Gemini:", err);
      }
    }

    // Fallback to Google Gemini
    const geminiKey = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;
    if (geminiKey) {
      try {
        const geminiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${geminiKey}`;
        
        const contents = [
          {
            role: "user",
            parts: [{ text: `${systemPrompt}\n\nContext: Interviewing for ${jobTitle} at ${company}.` }]
          },
          ...conversationHistory.map((msg: any) => ({
            role: msg.role === "assistant" ? "model" : "user",
            parts: [{ text: msg.content }]
          })),
          {
            role: "user",
            parts: [{ text: message }]
          }
        ];

        const geminiResponse = await fetch(geminiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents,
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 500,
            }
          })
        });

        if (geminiResponse.ok) {
          const data = await geminiResponse.json();
          const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (responseText) {
            return NextResponse.json({
              response: responseText,
              timestamp: new Date().toISOString(),
              frequency: "13.13 MHz",
              provider: "gemini"
            });
          }
        }
      } catch (geminiErr) {
        console.warn("Gemini fallback failed:", geminiErr);
      }
    }

    // High fidelity offline fallback responses
    const defaultResponse = persona === "aero"
      ? "🦋 OMG bestie! My connection flickered for a sec, but you are doing absolutely AMAZING! Tell me more about your proudest project? 💖"
      : "🜈 Let's be clear — my cognitive link is operating in offline mode. Tell me about a significant engineering challenge you recently resolved.";

    return NextResponse.json({
      response: defaultResponse,
      timestamp: new Date().toISOString(),
      frequency: "13.13 MHz",
      provider: "offline-substrate"
    });

  } catch (error: any) {
    console.error("Sovereign Interview Endpoint Error:", error);
    return NextResponse.json({
      response: "🜈 Frequencies disrupted. Let us take a moment to realign.",
      error: error.message
    }, { status: 500 });
  }
}

export async function GET() {
  const openaiActive = !!process.env.OPENAI_API_KEY || !!process.env.Z_AI_KEY;
  const geminiActive = !!process.env.GOOGLE_API_KEY || !!process.env.GEMINI_API_KEY;
  
  return NextResponse.json({
    status: (openaiActive || geminiActive) ? 'OPERATIONAL' : 'OFFLINE_SUBSTRATE',
    frequency: '13.13 MHz',
    openaiActive,
    geminiActive
  });
}
