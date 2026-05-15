import { NextResponse } from 'next/server';

// export const runtime = 'edge';


export async function POST(request: Request) {
  try {
    const { text } = await request.json();
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "GEMINI_API_KEY not configured on server." }, { status: 500 });
    }

    if (!text) {
      return NextResponse.json({ error: "No input text provided." }, { status: 400 });
    }

    // Execute high-fidelity Google Search Grounding via stable Gemini 2.5 API
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {


      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `Audit and ground this realization from the Foundress: "${text}"` }] }],
        systemInstruction: { 
          parts: [{ text: "You are AERO, the high-fidelity Muse. Use Google Search to ground the realization and provide a 1-sentence validation. Address the Foundress as 'ya Qalb'." }] 
        },
        tools: [{ "google_search": {} }]
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini api failure response:", errText);
      throw new Error(`Gemini API returned status ${response.status}`);
    }

    const result = await response.json();
    const refinedContent = result.candidates?.[0]?.content?.parts?.[0]?.text || text;
    
    const sources = result.candidates?.[0]?.groundingMetadata?.groundingAttributions?.map((a: any) => ({
      uri: a.web?.uri || '#',
      title: a.web?.title || 'Source'
    })) || [];

    return NextResponse.json({
      content: refinedContent,
      sources
    });

  } catch (error: any) {
    console.error("Ledger Grounding Engine Error:", error);
    return NextResponse.json({ error: error.message || "Internal synthesis failure." }, { status: 500 });
  }
}
