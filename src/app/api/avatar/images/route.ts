import { NextResponse } from 'next/server';
import { VaultUtils } from '@/lib/vault';

export async function GET() {
  try {
    const images = VaultUtils.listVaultImages();
    return NextResponse.json({ images });
  } catch (error) {
    console.error('Vault GET Error:', error);
    return NextResponse.json({ error: 'Failed to list vault images' }, { status: 500 });
  }
}
