import { NextResponse } from 'next/server';
import { discussionCards } from '@/lib/mockData/discussions';

let cards = [...discussionCards];

export async function GET() {
  return NextResponse.json(cards);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newCard = {
    id: String(Date.now()),
    sentiment: body.sentiment || 'neutral',
    title: body.title || 'New Discussion',
    body: body.body || '',
    author: body.author || { initials: 'RK', name: 'Raghav Kapoor', gradientFrom: '#7c3aed', gradientTo: '#a78bfa' },
    time: 'just now',
    impressions: 0,
  };
  cards = [newCard, ...cards];
  return NextResponse.json(newCard, { status: 201 });
}
