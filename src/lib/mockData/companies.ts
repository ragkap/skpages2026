import { CompanyProfile } from '../types';

export const companies: Record<string, CompanyProfile> = {
  SIA: {
    ticker: 'SIA SP',
    name: 'Singapore Airlines',
    price: '6.78',
    priceChangePct: '▼ 2.3%',
    direction: 'down',
    currency: 'SGD',
    marketCap: 'S$8.02B',
    peRatio: '12.4x',
    dividend: '4.2%',
    smartScore: '7/10',
    insights: [
      {
        id: 'c1', sentiment: 'bearish', ticker: 'SIA SP',
        title: 'Singapore Airlines: Fuel Hedging Losses Could Drag FY26 Earnings',
        excerpt: 'Jet fuel at $95/bbl vs hedges at $78/bbl creates a ~S$180M headwind in the back half of the year.',
        author: { initials: 'RK', name: 'Raghav Kapoor', gradientFrom: '#7c3aed', gradientTo: '#a78bfa' },
        time: '2h', views: 198,
      },
      {
        id: 'c2', sentiment: 'bullish', ticker: 'SIA SP',
        title: 'Premium Cabin Load Factors Hit 5-Year High — Yield Management Working',
        excerpt: 'Business class load factors exceeded 82% in February, the highest since 2019.',
        author: { initials: 'SP', name: 'Sunil Prakash', gradientFrom: '#10b981', gradientTo: '#00c896' },
        time: '1d', views: 334,
      },
      {
        id: 'c3', sentiment: 'neutral', ticker: 'SIA SP',
        title: 'SIA Fleet Renewal: A321XLR Order Confirmed for 2027 Delivery',
        excerpt: 'Order for 12 aircraft at ~$155M list price each. Replaces aging A320ceo fleet on short-haul routes.',
        author: { initials: 'WL', name: 'Wei Lin', gradientFrom: '#0369a1', gradientTo: '#0891b2' },
        time: '2d', views: 156,
      },
    ],
    discussions: [
      {
        id: 'd1', companyLabel: 'SIA SP', title: 'Thoughts on SIA\'s cargo revenue outlook post-CNY',
        preview: 'Air cargo demand has softened post-Chinese New Year. SIA\'s cargo revenue could disappoint in Q1.',
        author: { initials: 'AK', name: 'Anil Kumar', gradientFrom: '#00b386', gradientTo: '#6366f1' },
        time: '4h',
      },
    ],
  },
};

export function getCompany(ticker: string): CompanyProfile | null {
  return companies[ticker.toUpperCase()] || null;
}
