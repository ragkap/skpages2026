import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') || '';

  return NextResponse.json({
    text: `Here's what Smartkarma analysts are currently saying about **${q || 'Samsung Electronics (005930 KS)'}**:`,
    insightCards: [
      {
        id: '1', sentiment: 'neutral', ticker: '005930 KS',
        title: 'HBM3E Qualification Timeline Slips Again — Supply Glut Risk Emerging',
        author: { initials: 'NK', name: 'Nader Khouri', gradientFrom: '#3b82f6', gradientTo: '#8b5cf6' },
        views: 88,
      },
      {
        id: '2', sentiment: 'bullish', ticker: '005930 KS',
        title: 'Timing for Samsung KRW 3.2tn Block: Next Thursday',
        author: { initials: 'DK', name: 'Douglas Kim', gradientFrom: '#059669', gradientTo: '#34d399' },
        views: 44,
      },
    ],
    followUp: 'Consensus is cautious near-term due to HBM3E delays at NVIDIA. However, the block trade signals potential institutional accumulation. Watch the April earnings call for yield guidance.',
  });
}
