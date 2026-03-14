import { NextResponse } from 'next/server';
import { feedItems } from '@/lib/mockData/feed';

export async function GET() {
  return NextResponse.json(feedItems);
}
