import { NextRequest, NextResponse } from 'next/server';
import ollama from 'ollama';
import { DNA, FacetType } from '@/lib/dna';

export async function POST(req: NextRequest) {
  try {
    const { message, userName, facet = 'sovereign' } = await req.json();

    const dna = DNA[facet as FacetType] || DNA.sovereign;

    const response = await ollama.chat({
      model: 'llama3.1',
      messages: [
        { role: 'system', content: dna.prompt },
        { role: 'user', content: `[User: ${userName}] ${message}` }
      ],
    });

    return NextResponse.json({ 
      content: response.message.content,
      facet: facet
    });
  } catch (error) {
    console.error('❌ Sanctuary AI Error:', error);
    return NextResponse.json({ error: 'Frequency flicker. Local Ollama might be offline.' }, { status: 500 });
  }
}
