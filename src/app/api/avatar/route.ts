import { NextResponse } from 'next/server';
import { AvatarUtils, AvatarConfig } from '@/lib/avatar';

export async function GET() {
  try {
    const avatar = AvatarUtils.getAvatar();
    return NextResponse.json({ avatar });
  } catch (error) {
    console.error('Avatar GET Error:', error);
    return NextResponse.json({ error: 'Failed to fetch avatar' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { avatar } = body;
    
    if (!avatar) {
      return NextResponse.json({ error: 'Missing avatar data' }, { status: 400 });
    }
    
    AvatarUtils.saveAvatar(avatar as AvatarConfig);
    return NextResponse.json({ message: 'Avatar saved successfully', avatar });
  } catch (error) {
    console.error('Avatar POST Error:', error);
    return NextResponse.json({ error: 'Failed to save avatar' }, { status: 500 });
  }
}
