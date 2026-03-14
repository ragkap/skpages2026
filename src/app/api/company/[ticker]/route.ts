import { NextResponse } from 'next/server';
import { getCompany } from '@/lib/mockData/companies';

export async function GET(_req: Request, { params }: { params: { ticker: string } }) {
  const company = getCompany(params.ticker);
  if (!company) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(company);
}
