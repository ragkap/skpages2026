import Link from 'next/link';
import { feedItems } from '@/lib/mockData/feed';
import FeedItem from '@/components/feed/FeedItem';
import PanelHeader from '@/components/ui/PanelHeader';
import DiscussionsWidget from '@/components/ui/DiscussionsWidget';


const followSuggestions = [
  { initials: 'DB', name: 'David Blennerhassett', spec: 'Event-Driven · HK/China', gradientFrom: '#3b82f6', gradientTo: '#6366f1' },
  { initials: 'DK', name: 'Douglas Kim', spec: 'Korea Special Situations', gradientFrom: '#059669', gradientTo: '#34d399' },
  { initials: 'AK', name: 'Anil Kumar', spec: 'APAC Tech / Semis', gradientFrom: '#00b386', gradientTo: '#6366f1' },
  { initials: 'SP', name: 'Sunil Prakash', spec: 'Singapore Banks', gradientFrom: '#10b981', gradientTo: '#00c896' },
];

const rightWatchlist = [
  { ticker: 'AMZN US', name: 'Amazon', price: '209.53', change: '▼ 1.47%', dir: 'down' },
  { ticker: 'SIA SP', name: 'Singapore Airlines', price: '6.78', change: '▼ 2.3%', dir: 'down' },
  { ticker: 'DBS SP', name: 'DBS Group Holdings', price: '41.18', change: '▲ 0.93%', dir: 'up' },
  { ticker: 'GLXY US', name: 'Galaxy Digital', price: '28.47', change: '▲ 4.21%', dir: 'up' },
  { ticker: '005930 KS', name: 'Samsung Electronics', price: '67,400', change: '▼ 1.17%', dir: 'down' },
];

export default function DashboardPage() {
  return (
    <div className="main-body">
      {/* ─── LEFT SIDEBAR ─── */}
      <aside className="sidebar-left" style={{ width: 220, minWidth: 220 }}>
        <div className="sidebar-section">
          <Link href="/ask" className="sidebar-ask-btn" style={{
            display: 'flex', alignItems: 'center', gap: 7, width: '100%',
            padding: '8px 12px', background: 'var(--accent)', color: '#fff',
            fontSize: 12, fontWeight: 600, letterSpacing: '0.3px', borderRadius: 6,
            textDecoration: 'none', transition: 'opacity 0.15s',
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
            aSK
          </Link>
        </div>
        <div className="sidebar-divider" />
        <div className="sidebar-section">
          <div className="sidebar-section-label">Discover</div>
          <a href="#" className="sidebar-nav-item active">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            </svg>
            Feed
            <span style={{ marginLeft: 'auto', fontSize: 10, fontFamily: 'JetBrains Mono,monospace', padding: '1px 5px', borderRadius: 3, background: 'var(--amber-dim)', color: 'var(--amber)' }}>12</span>
          </a>
          <a href="#" className="sidebar-nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            Following
            <span style={{ marginLeft: 'auto', fontSize: 10, fontFamily: 'JetBrains Mono,monospace', padding: '1px 5px', borderRadius: 3, background: 'rgba(255,255,255,0.07)', color: 'var(--text-muted)' }}>4</span>
          </a>
          <a href="#" className="sidebar-nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
              <polyline points="17 6 23 6 23 12"/>
            </svg>
            Trending
          </a>
          <a href="#" className="sidebar-nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            Browse
          </a>
        </div>
      </aside>

      {/* ─── CENTER COLUMN ─── */}
      <main className="center-col">
        {/* Feed Toolbar */}
        <div style={{ display: 'flex', alignItems: 'center', height: 40, minHeight: 40, borderBottom: '1px solid var(--border)', padding: '0 10px', background: 'var(--bg-card)', gap: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
            {['All Insights', 'Equity', 'Macro', 'Credit', 'Crypto', 'Quant'].map((tab, i) => (
              <span key={tab} style={{ padding: '5px 11px', borderRadius: 5, fontSize: '11.5px', fontWeight: 500, cursor: 'pointer', color: i === 0 ? 'var(--accent)' : 'var(--text-secondary)', background: i === 0 ? 'var(--accent-dim)' : 'transparent', border: i === 0 ? '1px solid rgba(56,189,248,0.2)' : '1px solid transparent', whiteSpace: 'nowrap' }}>{tab}</span>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginLeft: 'auto' }}>
            <div className="toggle-wrap">
              <span>Focused</span>
              <div className="toggle">
                <div className="toggle-knob" />
              </div>
            </div>
            <select className="sort-select"><option>Latest ▾</option><option>Top Rated</option><option>Most Viewed</option></select>
          </div>
        </div>

        {/* Feed list */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '6px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {feedItems.map(item => (
            <div key={item.id} style={{ width: '100%', maxWidth: 640 }}>
              <FeedItem item={item} titleLineClamp={1} />
            </div>
          ))}
        </div>
      </main>

      {/* ─── RIGHT SIDEBAR ─── */}
      <aside style={{ display: 'flex', flexDirection: 'row', borderLeft: '1px solid var(--border)', overflow: 'hidden' }}>
        <DiscussionsWidget />

        {/* Widgets panel */}
        <div style={{ width: 220, minWidth: 220, background: 'var(--bg-card)', borderLeft: '1px solid var(--border)', display: 'flex', flexDirection: 'column', overflow: 'hidden', order: 2 }}>
          {/* Who to Follow */}
          <div style={{ flex: '0 0 auto', borderBottom: '1px solid var(--border)', display: 'flex', flexDirection: 'column' }}>
            <PanelHeader title="Who to Follow" />
            {followSuggestions.map(f => (
              <div key={f.name} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '7px 12px', borderBottom: '1px solid var(--border)', transition: 'background 0.13s' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9.5px', fontWeight: 700, color: '#fff', background: `linear-gradient(135deg, ${f.gradientFrom}, ${f.gradientTo})` }}>{f.initials}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '11.5px', fontWeight: 500, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{f.name}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{f.spec}</div>
                </div>
                <button style={{ width: 24, height: 24, borderRadius: '50%', border: '1px solid var(--accent)', background: 'transparent', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, fontSize: 14, lineHeight: 1 }}>+</button>
              </div>
            ))}
          </div>

          {/* Watchlist panel */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <PanelHeader title="Watchlist" linkText="View All" linkHref="/watchlist" />
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {rightWatchlist.map(w => (
                <div key={w.ticker} style={{ display: 'flex', alignItems: 'center', padding: '7px 12px', borderBottom: '1px solid var(--border)', cursor: 'pointer', gap: 8 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '11.5px', fontWeight: 600, fontFamily: 'JetBrains Mono,monospace', color: 'var(--text-primary)' }}>{w.ticker}</div>
                    <div style={{ fontSize: '9.5px', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 140 }}>{w.name}</div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 500, fontFamily: 'JetBrains Mono,monospace', color: 'var(--text-primary)' }}>{w.price}</div>
                    <span style={{ fontSize: 10, fontFamily: 'JetBrains Mono,monospace', fontWeight: 600, padding: '1px 5px', borderRadius: 3, display: 'inline-block', marginTop: 1, color: w.dir === 'up' ? 'var(--bullish)' : 'var(--bearish)', background: w.dir === 'up' ? 'var(--bullish-dim)' : 'var(--bearish-dim)' }}>{w.change}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
