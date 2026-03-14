'use client';
import { useState } from 'react';
import { discussionCards } from '@/lib/mockData/discussions';
import DiscussionCard from '@/components/discussions/DiscussionCard';

const navItems = [
  { id: 'for-me', label: 'For Me', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
  { id: 'following', label: 'Following', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
  { id: 'all', label: 'All', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> },
  { id: 'my-posts', label: 'My Posts', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
  { id: 'mentions', label: 'Mentions', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg> },
  { id: 'liked', label: 'Liked', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg> },
];

const mostDiscussedInsights = [
  'uniQure Faces FDA Trial Design Challenge Amid Strong Public…',
  'Docebo Announces $60M Odd-Lot Tender Offer Amidst Declining Shar…',
  'On Sun Hung Kai (16 HK)\'s Interim Results',
  'We Need To Talk About New World (17 HK)',
  'Timing for Samsung Electronics KRW 3.2tn Block: Next Thursday',
  'Tredegar\'s Strategic Review and Potential Sale: Analyzing Upside,…',
  'STAAR Surgical Faces Shareholder Activism and Alcon\'s Revised Bid…',
  'Golden Entertainment\'s Controversial Buyout: Activists Challenge…',
];

const mostDiscussedEntities = [
  { name: 'Sarepta Therapeutics', followed: false },
  { name: 'Sun Hung Kai Properties', followed: true },
  { name: 'Samsung Electronics', followed: true },
  { name: 'uniQure NV', followed: false },
  { name: 'Monster Beverage', followed: false },
  { name: 'Axon Enterprise', followed: false },
];

export default function DiscussionsPage() {
  const [activeNav, setActiveNav] = useState('for-me');
  const [followed, setFollowed] = useState<Record<string, boolean>>(
    Object.fromEntries(mostDiscussedEntities.map(e => [e.name, e.followed]))
  );
  const [focused, setFocused] = useState(false);

  return (
    <div className="main-body">
      {/* ─── LEFT SIDEBAR ─── */}
      <aside className="sidebar-left" style={{ width: 180, minWidth: 180 }}>
        <button style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          width: 'calc(100% - 16px)', margin: '10px 8px 8px', padding: '7px 12px',
          background: 'var(--accent)', color: '#fff', fontSize: 12, fontWeight: 600,
          border: 'none', borderRadius: 8, cursor: 'pointer',
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          Start New
        </button>

        <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', paddingBottom: 8 }}>
          <div style={{ padding: '0 8px 4px' }}>
            {navItems.slice(0, 3).map(item => (
              <a
                key={item.id}
                href="#"
                className={`sidebar-nav-item${activeNav === item.id ? ' active' : ''}`}
                onClick={e => { e.preventDefault(); setActiveNav(item.id); }}
              >
                {item.icon}
                {item.label}
              </a>
            ))}
          </div>
          <div className="sidebar-divider" />
          <div style={{ padding: '0 8px 4px' }}>
            <div className="sidebar-section-label" style={{ padding: '0 8px', marginBottom: 5 }}>Posts &amp; Mentions</div>
            {navItems.slice(3).map(item => (
              <a
                key={item.id}
                href="#"
                className={`sidebar-nav-item${activeNav === item.id ? ' active' : ''}`}
                onClick={e => { e.preventDefault(); setActiveNav(item.id); }}
              >
                {item.icon}
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </aside>

      {/* ─── CENTER COLUMN ─── */}
      <main className="center-col">
        {/* Toolbar */}
        <div className="center-toolbar" style={{ padding: '0 14px', gap: 10 }}>
          <div className="toolbar-search" style={{ width: 200 }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input type="text" placeholder="Search discussions…" />
          </div>
          <div style={{ marginLeft: 'auto' }} className="toggle-wrap">
            <span>Focused</span>
            <div
              className={`toggle${focused ? ' on' : ''}`}
              onClick={() => setFocused(!focused)}
            >
              <div className="toggle-knob" />
            </div>
          </div>
        </div>

        {/* Discussion feed */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '8px 14px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          {discussionCards.map(card => (
            <div key={card.id} style={{ width: '100%', maxWidth: 640 }}>
              <DiscussionCard card={card} />
            </div>
          ))}
        </div>
      </main>

      {/* ─── RIGHT SIDEBAR ─── */}
      <aside style={{ width: 280, minWidth: 280, background: 'var(--bg-card)', borderLeft: '1px solid var(--border)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Most Discussed Insights */}
        <div style={{ flex: '0 0 auto', maxHeight: '52%', overflowY: 'auto', borderBottom: '1px solid var(--border)', display: 'flex', flexDirection: 'column' }}>
          <div className="panel-header">
            <span className="panel-title">Most Discussed Insights</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {mostDiscussedInsights.map((title, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '7px 12px', borderBottom: '1px solid var(--border)', cursor: 'pointer', transition: 'background 0.13s' }}>
                <div style={{ width: 28, height: 28, borderRadius: 5, background: 'linear-gradient(135deg, #0f1520, #1e2d3d)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '6.5px', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.3px', flexShrink: 0 }}>SSI</div>
                <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', flex: 1, minWidth: 0 }}>{title}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Most Discussed Entities */}
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
          <div className="panel-header">
            <span className="panel-title">Most Discussed Entities</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {mostDiscussedEntities.map(entity => (
              <div key={entity.name} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 12px', borderBottom: '1px solid var(--border)', cursor: 'pointer', transition: 'background 0.13s' }}>
                <div style={{ width: 28, height: 28, borderRadius: 5, background: 'linear-gradient(135deg, #0f1520, #1a2535)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 7, fontWeight: 700, color: 'var(--text-muted)', flexShrink: 0 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                </div>
                <span style={{ fontSize: '11.5px', fontWeight: 500, color: 'var(--text-primary)', flex: 1, minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{entity.name}</span>
                <button
                  onClick={() => setFollowed(prev => ({ ...prev, [entity.name]: !prev[entity.name] }))}
                  style={{ width: 22, height: 22, borderRadius: '50%', border: '1px solid var(--accent)', background: followed[entity.name] ? 'var(--accent-dim)' : 'transparent', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, fontSize: 11, fontWeight: 600 }}
                >
                  {followed[entity.name] ? '✓' : '+'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
