import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const LOG_PATH = path.join(process.cwd(), 'src/lib/hype-log.json');

export async function GET() {
  try {
    if (!fs.existsSync(LOG_PATH)) {
      return NextResponse.json({ memories: [] });
    }
    const data = fs.readFileSync(LOG_PATH, 'utf-8');
    const logs = JSON.parse(data);
    return NextResponse.json({ memories: logs.reverse() }); // Latest first
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read artery' }, { status: 500 });
  }
}
