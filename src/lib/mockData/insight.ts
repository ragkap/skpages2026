import { InsightDetail } from '../types';

const insight: InsightDetail = {
  slug: 'top-9-korean-multiomics',
  sentiment: 'bullish',
  ticker: 'Toolgen',
  title: 'Top 9 Korean Companies to Benefit from the Rapidly Growing Demand for Multiomics',
  category: 'Equity Bottom-Up',
  views: 115,
  publishedAt: '14 Mar 2026 16:40',
  smartTakes: [
    "Cathie Wood's ARK Investments has identified multiomics as one of the top 5 sectors for 2026, driving Korean biotech interest.",
    'The 9 companies span genomics infrastructure, diagnostics, therapeutics, and AI-driven drug discovery.',
    'Falling multiomics data costs are a key catalyst — making these companies increasingly competitive globally.',
  ],
  executiveSummary: [
    'In this insight, we discuss the top 9 Korean companies to benefit from the rapidly growing global demand for multiomics as described by Cathie Wood at ARK Investments.',
    'Cathie Wood is often called 돈나무 in Korea which is translated as "money tree." Cathie Wood has selected multiomics as one of top five sectors that could shine in 2026.',
    'It may be worthwhile to keep careful watch on these 9 companies, especially as the economics of multiomics continue to favor these companies by lowering the multiomics data costs.',
  ],
  detailBlockquote: 'Love her or hate her, one thing is for sure which is Cathie Wood is followed heavily among Korean investors (including millions of retail ant investors). ARK Investments recently published its annual "BIG IDEAS" presentation for 2026. The 5 Core Innovative Platforms that ARK Investments highlighted for 2026 include Artificial Intelligence (AI), Robotics, Energy Storage, Public Blockchain, and Multiomics.\n\nRegarding multiomics (Genomics), AI-driven drug discovery is expected to shift healthcare from reactive treatment to proactive cures, potentially adding $1.5 trillion in value to the biotech sector.',
  bodyParagraphs: [
    { type: 'h3', text: 'Bioneer Company Background' },
    { type: 'p', text: 'Established in 1992, Bioneer was the first in Korea to develop and supply essential enzymes and primers for PCR. Bioneer is positioning itself for the "post-genome era" by integrating biochemistry with photonics and electronics to create next-generation molecular technologies.' },
    { type: 'bullets', items: [
      'Life Sciences & Research Tools — Bioneer manufactures a vast array of reagents and instruments.',
      'Molecular Diagnostics (MDx) — Bioneer\'s diagnostic division focuses on high-precision detection of infectious diseases and genetic conditions.',
      'Therapeutics & Drug Discovery — The company leverages its genomic expertise to develop novel drugs, particularly through its SAMiRNA™ platform.',
    ]},
    { type: 'h3', text: 'Cha Biotech Company Background' },
    { type: 'p', text: 'Founded as a core division of the CHA Medical Group, Cha Biotech is a global leader in regenerative medicine, stem cell research, and cell-based therapies. It operates as a vertically integrated biotechnology hub, connecting clinical hospitals, research institutes, and commercial manufacturing to develop treatments for incurable diseases.' },
    { type: 'bullets', items: [
      'Cell Therapy R&D — Developing therapies for cancer, Parkinson\'s disease, and degenerative cell disease.',
      'CDMO Services — Offering cell and gene therapy contract development and manufacturing.',
      'Cord Blood Banking — Operating Korea\'s leading service for newborn stem cells.',
    ]},
    { type: 'p', text: 'However, it may be worthwhile to keep careful watch on these companies, especially as the economics of multiomics continue to favor these companies by lowering the multiomics data costs and accelerate AI driven drug development.' },
  ],
  author: {
    name: 'Douglas Kim',
    initials: 'DK',
    gradientFrom: '#059669',
    gradientTo: '#34d399',
    spec: 'Korea/Asia, Events, IPOs',
    firm: 'Douglas Research Advisory',
    topBadge: 'Top 5%',
    tags: ['South Korea', 'Equity Bottom-Up', 'Equity Capital Markets'],
    bio: 'Nearly 30 years of experience in the Korean/Asian equity research. Major sectors coverage include the following: Tech, Healthcare, Consumer, Financials, and Real Estate.',
    isFollowing: true,
  },
  entityName: 'Toolgen',
  entityTicker: '199800 KS',
  price: '47,950',
  currency: 'KRW',
  changePct: '-1.03%',
  direction: 'down',
  smartScore: 2.8,
  smartScoreDimensions: [
    { label: 'Value', score: 2 },
    { label: 'Dividend', score: 1 },
    { label: 'Growth', score: 3 },
    { label: 'Resilience', score: 3 },
    { label: 'Momentum', score: 5 },
  ],
  sentimentValue: 0.55,
  insightStream: [
    { id: 'is1', sentiment: 'bullish', title: 'Top 9 Korean Companies to Benefit from the Rapidly Growing Demand for Multiomics', date: '14 Mar 2026' },
    { id: 'is2', sentiment: 'neutral', title: 'Lunit - Rights Offering of 250 Billion Won', date: '30 Jan 2026' },
    { id: 'is3', sentiment: 'neutral', title: 'Samsung Bioepis Holdings and Samsung Biologics to Start Trading on 24 November', date: '20 Nov 2025' },
    { id: 'is4', sentiment: 'bullish', title: 'SK Bioscience IPO Preview - Biggest IPO in Korea in 1Q 2021', date: '07 Feb 2021' },
  ],
  relatedEntities: [
    { ticker: '199800 KS', name: 'Toolgen', sentiment: 'bullish' },
  ],
  relatedInsights: [
    { id: 'ri1', title: 'Top 9 Korean Companies to Benefit from the Rapidly Growing Demand for Multiomics', sentiment: 'bullish' },
  ],
  trendingCollections: ['Index Rebalance', 'Japan', 'Event-Driven', 'India', 'Singapore', 'Equity Bottom-Up', 'Singapore Value-Up', 'South Korea', 'About To Go Viral', 'Unpaywalled Insights'],
  trendingInsights: [
    { id: 'ti1', title: 'HSI INDEX: Tactical View as Iran War Enters Week 3', views: 842 },
    { id: 'ti2', title: 'MV US Listed Semiconductor 25 Index Rebalance: 2 Changes & US$4.9bn Trade', views: 631 },
    { id: 'ti3', title: 'Top 9 Korean Companies to Benefit from the Rapidly Growing Demand for Multiomics', views: 115 },
    { id: 'ti4', title: 'HEW: Inflation Devours Doves', views: 98 },
    { id: 'ti5', title: '[Japan M&A] Now Rohm (6963) And Toshiba Mulling Power Semis Integration, Thwarting Denso?', views: 74 },
  ],
};

export function getInsightBySlug(slug: string): InsightDetail | null {
  if (slug === insight.slug) return insight;
  return insight; // fallback: always return the mock for any slug
}
