import { NextResponse } from 'next/server';
import { watchlistLists, watchlistEntities, stockPanelRows } from '@/lib/mockData/watchlist';

export async function GET() {
  return NextResponse.json({ lists: watchlistLists, entities: watchlistEntities, stockPanel: stockPanelRows });
}
