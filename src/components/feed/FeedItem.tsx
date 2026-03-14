'use client';
import { FeedItem as FeedItemType } from '@/lib/types';
import SentimentTag from '@/components/ui/SentimentTag';
import TickerChip from '@/components/ui/TickerChip';
import Avatar from '@/components/ui/Avatar';

interface FeedItemProps {
  item: FeedItemType;
  titleLineClamp?: 1 | 2;
}

export default function FeedItem({ item, titleLineClamp = 2 }: FeedItemProps) {
  return (
    <div className="feed-item">
      <div className="feed-item-top">
        <SentimentTag sentiment={item.sentiment} />
        <TickerChip ticker={item.ticker} />
        {item.brokerChip && (
          <span style={{ fontSize: 9.5, color: 'var(--text-muted)', background: 'rgba(255,255,255,0.06)', padding: '2px 6px', borderRadius: 3, border: '1px solid var(--border)' }}>
            {item.brokerChip}
          </span>
        )}
        <span className="feed-time">{item.time}</span>
      </div>
      <div className="feed-title" style={{ WebkitLineClamp: titleLineClamp }}>
        {item.title}
      </div>
      {item.excerpt && <div className="feed-excerpt">{item.excerpt}</div>}
      <div className="feed-item-meta">
        <div className="meta-author">
          <Avatar initials={item.author.initials} gradientFrom={item.author.gradientFrom} gradientTo={item.author.gradientTo} />
          <span className="author-name">{item.author.name}</span>
        </div>
        <div className="meta-stats">
          <span className="meta-stat">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="11" height="11">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
            {item.views}
          </span>
        </div>
      </div>
    </div>
  );
}
