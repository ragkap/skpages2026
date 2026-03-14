import { InsightCard as InsightCardType } from '@/lib/types';
import SentimentTag from '@/components/ui/SentimentTag';
import TickerChip from '@/components/ui/TickerChip';

export default function InsightCard({ card }: { card: InsightCardType }) {
  return (
    <div className="insight-card">
      <div className="insight-card-top">
        <SentimentTag sentiment={card.sentiment} />
        <TickerChip ticker={card.ticker} />
      </div>
      <div className="insight-card-title">{card.title}</div>
      <div className="insight-card-meta">
        <div className="insight-author">
          <div className="author-avatar-sm" style={{ background: `linear-gradient(135deg, ${card.author.gradientFrom}, ${card.author.gradientTo})` }}>
            {card.author.initials}
          </div>
          <span>{card.author.name}</span>
        </div>
        <div className="insight-stat" style={{ marginLeft: 'auto' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="11" height="11">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
          {card.views} views
        </div>
      </div>
    </div>
  );
}
