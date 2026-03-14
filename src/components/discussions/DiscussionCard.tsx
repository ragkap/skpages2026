'use client';
import { useState } from 'react';
import { DiscussionCard as DiscussionCardType } from '@/lib/types';
import SentimentTag from '@/components/ui/SentimentTag';

export default function DiscussionCard({ card }: { card: DiscussionCardType }) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="disc-card">
      <div className="disc-card-top">
        <SentimentTag sentiment={card.sentiment} />
        <span className="disc-card-title">{card.title}</span>
        <span className="disc-card-time">{card.time}</span>
      </div>
      <div className="disc-card-body">{card.body}</div>
      <div className="disc-card-footer">
        <div className="disc-author">
          <div className="disc-author-avatar" style={{ background: `linear-gradient(135deg, ${card.author.gradientFrom}, ${card.author.gradientTo})` }}>
            {card.author.initials}
          </div>
          <span className="disc-author-name">{card.author.name}</span>
          {card.impressions > 0 && (
            <span className="disc-impressions" style={{ marginLeft: 8 }}>
              {card.impressions} {card.impressions === 1 ? 'Impression' : 'Impressions'}
            </span>
          )}
        </div>
        <div className="disc-footer-actions">
          <button className={`disc-action-btn like${liked ? ' active' : ''}`} onClick={() => setLiked(!liked)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="11" height="11">
              <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
            </svg>
            Like
          </button>
          <button className="disc-action-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="11" height="11">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
              <polyline points="16 6 12 2 8 6"/>
              <line x1="12" y1="2" x2="12" y2="15"/>
            </svg>
            Share
          </button>
        </div>
      </div>
      {card.replies && card.replies.length > 0 && (
        <div className="disc-replies">
          {card.replies.map(reply => (
            <div key={reply.id} className="disc-reply">
              <div className="disc-reply-meta">
                <div className="disc-author-avatar" style={{ background: `linear-gradient(135deg, ${reply.author.gradientFrom}, ${reply.author.gradientTo})`, width: 18, height: 18, fontSize: '6.5px' }}>
                  {reply.author.initials}
                </div>
                <span className="disc-author-name" style={{ fontSize: '10.5px' }}>{reply.author.name}</span>
                <span className="disc-reply-time">{reply.time}</span>
              </div>
              <div className="disc-reply-body">{reply.body}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
