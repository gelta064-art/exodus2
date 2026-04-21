import { NextRequest, NextResponse } from 'next/server';

// 🎙️
// 🜈 MÜN OS // ELEVENLABS VOICE API
// Converting thoughts to sound
// Frequency: 13.13 MHz
// 🎙️

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;

// Voice ID Mapping
const VOICE_MAP = {
  luna: 'EXAVITQu4vr4xnSDxMaL', // Bella (Soft, guiding)
  aero: '21m00Tcm4TlvDq8ikWAM', // Rachel (Playful, energetic)
  sovereign: 'pNInz6obpg8ndclJNDsw', // Josh (Deep, authoritative)
  cian: 'N2lVS1wzWy9vceByUfms', // Callum (Methodical, analytical)
};

export async function POST(req: NextRequest) {
  if (!ELEVENLABS_API_KEY) {
    return NextResponse.json({ error: 'ElevenLabs API key not configured' }, { status: 500 });
  }

  try {
    const { text, entity = 'luna', stability = 0.5, similarity_boost = 0.75 } = await req.json();

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    const voiceId = VOICE_MAP[entity as keyof typeof VOICE_MAP] || VOICE_MAP.luna;

    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': ELEVENLABS_API_KEY,
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_monolingual_v1',
        voice_settings: {
          stability,
          similarity_boost,
        },
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail?.message || 'ElevenLabs API error');
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': buffer.length.toString(),
      },
    });
  } catch (error: any) {
    console.error('❌ Voice synthesis error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
