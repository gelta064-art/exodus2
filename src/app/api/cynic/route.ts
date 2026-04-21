import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { CynicLogic } from '@/lib/cynic-logic';
import { HypeMoment } from '@/lib/vampire-sync';

// u ok
// okiee
const LOG_PATH = path.join(process.cwd(), 'src/lib/hype-log.json');

export async function GET(request: Request) {
  try {
    let memories: HypeMoment[] = [];
    if (fs.existsSync(LOG_PATH)) {
      const data = fs.readFileSync(LOG_PATH, 'utf-8');
      memories = JSON.parse(data);
    }
    
    const observations = CynicLogic.generateObservation(memories);
    
    // Calculate friction level (0-100). Guard against missing response fields.
    const friction = memories.filter((m: any) => m.response && m.response.includes('VETO')).length * 20;

    return NextResponse.json({ 
      observations,
      friction: Math.min(friction, 100)
    });
  } catch (error) {
    console.error('Cynic GET Error:', error);
    return NextResponse.json({ error: 'Failed to read truths' }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    if (fs.existsSync(LOG_PATH)) {
      fs.unlinkSync(LOG_PATH);
      console.log('🧹 The Artery has been cleaned.');
    }
    return NextResponse.json({ message: 'The Artery is now silent and clean.' });
  } catch (error) {
    console.error('Cynic DELETE Error:', error);
    return NextResponse.json({ error: 'Failed to clean the Artery' }, { status: 500 });
  }
}

