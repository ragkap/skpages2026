export type Sentiment = 'bullish' | 'bearish' | 'neutral';

export interface Author {
  initials: string;
  name: string;
  gradientFrom: string;
  gradientTo: string;
}

export interface FeedItem {
  id: string;
  sentiment: Sentiment;
  ticker: string;
  title: string;
  excerpt: string;
  author: Author;
  time: string;
  views: number;
  brokerChip?: string;
  syndicated?: boolean;
}

export interface DiscussionCard {
  id: string;
  sentiment: Sentiment;
  title: string;
  body: string;
  author: Author;
  time: string;
  impressions: number;
  replies?: DiscussionReply[];
}

export interface DiscussionReply {
  id: string;
  body: string;
  author: Author;
  time: string;
}

export interface DiscussionItem {
  id: string;
  companyLabel: string;
  title: string;
  preview: string;
  author: Author;
  time: string;
}

export interface WatchlistInsight {
  id: string;
  type: 'research' | 'filing';
  date: string;
  title: string;
}

export interface WatchlistEntity {
  id: string;
  ticker: string;
  name: string;
  price: string;
  currency: string;
  change: string;
  direction: 'up' | 'down';
  logoColor: string;
  logoInitials: string;
  insights: WatchlistInsight[];
}

export interface StockRow {
  id: string;
  ticker: string;
  name: string;
  price: string;
  change: string;
  direction: 'up' | 'down';
}

export interface CompanyProfile {
  ticker: string;
  name: string;
  price: string;
  priceChangePct: string;
  direction: 'up' | 'down';
  currency: string;
  marketCap: string;
  peRatio: string;
  dividend: string;
  smartScore: string;
  insights: FeedItem[];
  discussions: DiscussionItem[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  text: string;
  insightCards?: InsightCard[];
  followUp?: string;
}

export interface InsightCard {
  id: string;
  sentiment: Sentiment;
  ticker: string;
  title: string;
  author: Author;
  views: number;
}

export interface InsightAuthor {
  name: string;
  initials: string;
  gradientFrom: string;
  gradientTo: string;
  spec: string;
  firm: string;
  topBadge?: string;
  tags: string[];
  bio: string;
  isFollowing: boolean;
}

export interface SmartScoreDimension {
  label: string;
  score: number;
}

export interface InsightStreamItem {
  id: string;
  sentiment: Sentiment;
  title: string;
  date: string;
}

export interface InsightDetail {
  slug: string;
  sentiment: Sentiment;
  ticker: string;
  title: string;
  category: string;
  views: number;
  publishedAt: string;
  smartTakes: string[];
  executiveSummary: string[];
  detailBlockquote: string;
  bodyParagraphs: Array<{ type: 'p' | 'h3' | 'bullets'; text?: string; items?: string[] }>;
  author: InsightAuthor;
  entityName: string;
  entityTicker: string;
  price: string;
  currency: string;
  changePct: string;
  direction: 'up' | 'down';
  smartScore: number;
  smartScoreDimensions: SmartScoreDimension[];
  sentimentValue: number;
  insightStream: InsightStreamItem[];
  relatedEntities: Array<{ ticker: string; name: string; sentiment: Sentiment }>;
  relatedInsights: Array<{ id: string; title: string; sentiment: Sentiment }>;
  trendingCollections: string[];
  trendingInsights: Array<{ id: string; title: string; views: number }>;
}
