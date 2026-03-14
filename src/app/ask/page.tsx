'use client';
import { useState, useRef } from 'react';
import { ChatMessage, InsightCard } from '@/lib/types';
import SentimentTag from '@/components/ui/SentimentTag';
import TickerChip from '@/components/ui/TickerChip';

const SUGGESTIONS = [
  'Singapore Airlines outlook',
  'Samsung HBM3E delays',
  'DBS dividend upgrade',
  'TSMC N2 yield ramp',
  'Galaxy Digital index inclusion',
];

export default function AskPage() {
  const [query, setQuery] = useState('');
  const [chatMode, setChatMode] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setChatMode(true);
    setQuery('');
    setLoading(true);

    try {
      const res = await fetch(`/api/ask?q=${encodeURIComponent(text)}`);
      const data = await res.json();
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        text: data.text,
        insightCards: data.insightCards,
        followUp: data.followUp,
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch {
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'ai', text: 'Sorry, something went wrong.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(query);
    }
  };

  return (
    <div className="main-body">
      <div className="main-area">
        {!chatMode ? (
          /* ─── WELCOME STATE ─── */
          <div className="welcome-state">
            <div className="welcome-icon">
              <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <h1 className="welcome-heading">Ask Smartkarma</h1>
            <p className="welcome-subtext">
              Get instant, analyst-backed answers on any stock, sector, or market theme.
              Powered by 1,200+ independent analysts covering Asia Pacific and beyond.
            </p>

            <div className="prompt-box">
              <div className="prompt-textarea-wrap">
                <span className="prompt-sparkle-prefix">✦</span>
                <textarea
                  ref={textareaRef}
                  className="prompt-textarea"
                  placeholder="Ask about any company, sector, or market theme…"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  rows={2}
                />
              </div>
              <div className="prompt-bottom-row">
                <span className="prompt-hint-link">Try: &ldquo;What are analysts saying about Samsung Electronics?&rdquo;</span>
                <button
                  className={`send-btn${query.trim() ? ' active' : ''}`}
                  disabled={!query.trim()}
                  onClick={() => sendMessage(query)}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="22" y1="2" x2="11" y2="13"/>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                </button>
              </div>
            </div>

            <div className="category-chips">
              {SUGGESTIONS.map(s => (
                <button key={s} className="chip" onClick={() => sendMessage(s)}>
                  {s}
                </button>
              ))}
            </div>

            <div className="welcome-footer">
              aSK synthesises research from Smartkarma&apos;s analyst network.&nbsp;
              <a href="#">Learn more</a>
            </div>
          </div>
        ) : (
          /* ─── CHAT STATE ─── */
          <>
            <div className="chat-topbar">
              <div className="chat-topbar-brand">
                <span className="chat-topbar-brand-icon">✦</span>
                aSK
                <span className="chat-topbar-sub">Smartkarma Analyst Intelligence</span>
              </div>
              <button className="new-chat-btn" onClick={() => { setChatMode(false); setMessages([]); setQuery(''); }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 5v14M5 12h14"/>
                </svg>
                New Chat
              </button>
            </div>

            <div className="chat-messages">
              <div className="chat-messages-inner">
                {messages.map(msg => (
                  msg.role === 'user' ? (
                    <div key={msg.id} className="msg-user">
                      <div className="msg-user-bubble">{msg.text}</div>
                    </div>
                  ) : (
                    <div key={msg.id} className="msg-ai">
                      <div className="msg-ai-header">
                        <span className="msg-ai-icon">✦</span>
                        <div className="msg-ai-text" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                      </div>
                      {msg.insightCards && msg.insightCards.length > 0 && (
                        <div className="insight-cards">
                          {msg.insightCards.map((card: InsightCard) => (
                            <div key={card.id} className="insight-card">
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
                                <div className="insight-stat">
                                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="11" height="11">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                    <circle cx="12" cy="12" r="3"/>
                                  </svg>
                                  {card.views} views
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      {msg.followUp && (
                        <div className="ai-followup">{msg.followUp}</div>
                      )}
                    </div>
                  )
                ))}
                {loading && (
                  <div className="msg-ai">
                    <div className="thinking">
                      <span style={{ color: 'var(--accent)', fontSize: 16 }}>✦</span>
                      <div className="thinking-dots">
                        <div className="thinking-dot" />
                        <div className="thinking-dot" />
                        <div className="thinking-dot" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="chat-input-area">
              <div className="chat-prompt-box">
                <div className="chat-prompt-inner">
                  <span className="chat-prompt-icon">✦</span>
                  <textarea
                    className="chat-textarea"
                    placeholder="Ask a follow-up question…"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    rows={1}
                  />
                  <button
                    className={`chat-send-btn${query.trim() ? ' active' : ''}`}
                    disabled={!query.trim() || loading}
                    onClick={() => sendMessage(query)}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="22" y1="2" x2="11" y2="13"/>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
