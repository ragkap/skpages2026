'use client';
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import styles from './search.module.css';

// ── Mock data ──────────────────────────────────────────────────────────────

const RESULTS = [
  {
    id: '1',
    type: 'insight',
    sentiment: 'bearish' as const,
    date: '09 Mar 2026 08:42',
    title: 'China: Prepared for a Long War!',
    excerpt: 'China is buying record volumes of Russian crude as India has retreated. No one really knows the extent of Chinese inventories.',
    author: { name: 'David Mudd', initials: 'DM', gradientFrom: '#1d4ed8', gradientTo: '#3b82f6', avatar: null },
    views: 126,
    entity: null,
  },
  {
    id: '2',
    type: 'insight',
    sentiment: 'bullish' as const,
    date: '11 Mar 2026 11:57',
    title: "CX Daily: China's Humanoid Robot Boom Faces Reality Check",
    excerpt: "TOP STORIES In Depth: China's Humanoid Robot Boom Faces Reality Check Four Chinese embodied artificial intelligence (AI)…",
    author: { name: 'Caixin Global', initials: 'CG', gradientFrom: '#7c3aed', gradientTo: '#a78bfa', avatar: 'caixin' },
    views: 99,
    entity: null,
  },
  {
    id: '3',
    type: 'insight',
    sentiment: 'bullish' as const,
    date: '08 Mar 2026 10:05',
    title: 'HK Connect Flows Weekly (Mar 6th): Alibaba, Tencent, China Life, Xiaomi, Petrochina, ICBC',
    excerpt: 'Life/2628 HK ($-385m, second chart below), China Pacific Insurance/2601 HK ($-209m, third chart below), Kuaishou/1024 HK ($-202…',
    author: { name: 'Ke Yan, CFA, FRM', initials: 'KY', gradientFrom: '#0369a1', gradientTo: '#38bdf8', avatar: null },
    views: 159,
    entity: null,
  },
  {
    id: '5',
    type: 'insight',
    sentiment: 'bullish' as const,
    date: '04 Mar 2026 08:49',
    title: 'Primer: China Everbright Water (CEWL SP) - Mar 2026',
    excerpt: "China Everbright Water's primary competitive advantage stems from its affiliation with the state-owned China Everbright Group.",
    author: { name: 'aSK', initials: 'AS', gradientFrom: '#00b386', gradientTo: '#00c896', avatar: 'ask' },
    views: 110,
    entity: 'China Everbright Water',
  },
];

const DISCUSSION_CARDS = [
  {
    id: 'd1',
    entity: 'China Treasury',
    date: '01 May 2024 10:49',
    body: 'China Property - Beijing relaxes housing rules for the first time in 13 years, summary:- Multi-person households with local residency to buy an extra flat outside the 5th ring.- Single-person households to purchase additional property in the same area.- Non-residents with 5+ years of local tax...',
    author: { name: 'Raghav Kapoor', initials: 'RK', gradientFrom: '#7c3aed', gradientTo: '#a78bfa' },
  },
  {
    id: 'd2',
    entity: 'China Treasury',
    date: '10 Mar 2023 10:57',
    body: "CHINA'S PARLIAMENT ELECTS XI JINPING AS CHINA'S PRESIDENT - STATE MEDIA China Treasury (CHINA GOVT)",
    author: { name: 'Travis Lundy', initials: 'TL', gradientFrom: '#059669', gradientTo: '#34d399' },
  },
  {
    id: 'd3',
    entity: 'China Mobile',
    date: '01 Nov 20...',
    body: 'China Mobile (941 HK) review its application fo... later, and the stock wa... July, The A-Share IPO la... later, and the stock was later.  There was a thre...',
    author: { name: 'Travis Lundy', initials: 'TL', gradientFrom: '#059669', gradientTo: '#34d399' },
  },
];

const RIGHT_ENTITIES = [
  { id: 'e1', name: 'China Treasury', ticker: 'CHINA GOVT', icon: '🏛', followed: false },
  { id: 'e2', name: 'China Merchants China Direct Investments', ticker: '133 HK', icon: '🏢', followed: false },
  { id: 'e3', name: 'China E Learning', ticker: '8055 HK', icon: '🍽', followed: false },
];

const RIGHT_PEOPLE = [
  { id: 'p1', name: 'China Knowledge', subtitle: 'Reports from China Knowledge / China Knowledge', initials: 'CK', gradientFrom: '#1d4ed8', gradientTo: '#3b82f6' },
  { id: 'p2', name: 'China Knowledge', subtitle: '', initials: 'CK', gradientFrom: '#1d4ed8', gradientTo: '#3b82f6' },
  { id: 'p3', name: 'Nigel Chiang', subtitle: 'Economist / Centennial Asia Advisors', initials: 'NC', gradientFrom: '#374151', gradientTo: '#6b7280' },
];

const RIGHT_COLLECTIONS = [
  { id: 'c1', name: 'China', emoji: '🇨🇳' },
  { id: 'c2', name: 'China Largecap', emoji: '🏙' },
  { id: 'c3', name: 'China Stimulus', emoji: '🏗' },
];

const RIGHT_SAVED = [
  { id: 's1', title: 'China obesity' },
  { id: 's2', title: 'Imax China' },
  { id: 's3', title: 'air china - buying LOT' },
];

const FILTER_TABS = ['All', 'Analysis', 'Discussions', 'Entities', 'Collections', 'People', 'Tools', 'Saved'];

// ── Highlight helper ───────────────────────────────────────────────────────

function Highlight({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className={styles.highlight}>{part}</mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

// ── Component ─────────────────────────────────────────────────────────────

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="center-col" />}>
      <SearchPageInner />
    </Suspense>
  );
}

function SearchPageInner() {
  const searchParams = useSearchParams();
  const q = searchParams.get('q') || 'China';
  const [activeTab, setActiveTab] = useState('All');
  const [followedEntities, setFollowedEntities] = useState<Set<string>>(new Set());

  const toggleFollow = (id: string) => {
    setFollowedEntities(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className={styles.page}>
      {/* ── Left sidebar ── */}
      <aside className={`sidebar-left ${styles.leftSidebar}`}>
        <div className="sidebar-section">
          <Link href="/ask" className={styles.askBtn}>
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
          <div className="sidebar-section-label">Search</div>
          <Link href="/search" className={`sidebar-nav-item active`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            Results
          </Link>
          <a href="#" className="sidebar-nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
              <polyline points="17 6 23 6 23 12"/>
            </svg>
            Trending
          </a>
          <a href="#" className="sidebar-nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
            </svg>
            Saved
          </a>
        </div>
      </aside>

      {/* ── Right content area ── */}
      <div className={styles.content}>

        {/* ── Toolbar (matches dashboard center-toolbar) ── */}
        <div className="center-toolbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
            {FILTER_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '4px 10px', borderRadius: 5, fontSize: 11.5, fontWeight: 500,
                  cursor: 'pointer', border: '1px solid transparent', whiteSpace: 'nowrap',
                  fontFamily: 'Inter, sans-serif', transition: 'all 0.13s',
                  color: activeTab === tab ? 'var(--accent)' : 'var(--text-secondary)',
                  background: activeTab === tab ? 'var(--accent-dim)' : 'transparent',
                  borderColor: activeTab === tab ? 'rgba(0,179,134,0.25)' : 'transparent',
                }}
              >
                {tab}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto', flexShrink: 0 }}>
            <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>
              10,000+ results
            </span>
            <select className="sort-select">
              <option>Relevance ▾</option>
              <option>Latest</option>
              <option>Most Viewed</option>
            </select>
          </div>
        </div>

      <div className={styles.body}>
        {/* ── Main results column ── */}
        <main className={styles.main}>

          {/* Insight results as feed-item cards */}
          {RESULTS.map((result) => (
            <div key={result.id} className="feed-item" style={{ marginBottom: 4 }}>
              <div className="feed-item-top">
                <span className={`sentiment-tag ${result.sentiment}`}>
                  <span className="sentiment-dot" />
                  {result.sentiment.charAt(0).toUpperCase() + result.sentiment.slice(1)}
                </span>
                {result.entity && (
                  <span className="ticker-chip">
                    <Highlight text={result.entity} query={q} />
                  </span>
                )}
                <span className="feed-time">{result.date}</span>
              </div>
              <div className="feed-title" style={{ WebkitLineClamp: 2 }}>
                <Highlight text={result.title} query={q} />
              </div>
              <div className="feed-excerpt">
                <Highlight text={result.excerpt} query={q} />
              </div>
              <div className="feed-item-meta">
                <div className="meta-author">
                  <div
                    className="author-avatar"
                    style={{ background: `linear-gradient(135deg, ${result.author.gradientFrom}, ${result.author.gradientTo})` }}
                  >
                    {result.author.initials}
                  </div>
                  <span className="author-name">{result.author.name}</span>
                </div>
                <div className="meta-stats">
                  <span className="meta-stat">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="11" height="11">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                    {result.views}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </main>

        {/* ── Right sidebar: two columns side-by-side ── */}
        <aside className={styles.sidebar}>

          {/* Left col: Discussions */}
          <div className={styles.discCol}>
            <div className={styles.sidePanelHeader}>
              <span className={styles.sidePanelTitle}>Discussions</span>
              <a href="/discussions" className={styles.viewMoreLink}>View more »</a>
            </div>
            <div className={styles.discWidget}>
              {DISCUSSION_CARDS.map(dc => (
                <div key={dc.id} className={styles.discWidgetItem}>
                  <div className={styles.discWidgetMeta}>
                    <span className={styles.discCardEntity}>
                      <Highlight text={dc.entity} query={q} />
                    </span>
                    <span className={styles.discCardDate}>{dc.date}</span>
                  </div>
                  <p className={styles.discWidgetBody}>
                    <Highlight text={dc.body} query={q} />
                  </p>
                  <div className={styles.discCardFooter}>
                    <div
                      className={styles.discAuthorAvatar}
                      style={{ background: `linear-gradient(135deg, ${dc.author.gradientFrom}, ${dc.author.gradientTo})` }}
                    >
                      {dc.author.initials}
                    </div>
                    <span className={styles.discAuthorName}>{dc.author.name}</span>
                    <span className={styles.discImpression}>Impression</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right col: Entities / People / Collections / Saved */}
          <div className={styles.widgetsCol}>

            <div className={styles.sidePanel}>
              <div className={styles.sidePanelHeader}>
                <span className={styles.sidePanelTitle}>Entities</span>
                <a href="#" className={styles.viewMoreLink}>View 771 More »</a>
              </div>
              {RIGHT_ENTITIES.map(e => (
                <div key={e.id} className={styles.sideRow}>
                  <div className={styles.sideEntityIcon}>{e.icon}</div>
                  <div className={styles.sideRowInfo}>
                    <span className={styles.sideRowName}><Highlight text={e.name} query={q} /></span>
                    <span className={styles.sideRowSub}>{e.ticker}</span>
                  </div>
                  <button
                    className={`${styles.followBtn} ${followedEntities.has(e.id) ? styles.followBtnActive : ''}`}
                    onClick={() => toggleFollow(e.id)}
                  >
                    {followedEntities.has(e.id) ? '✓' : '+'}
                  </button>
                </div>
              ))}
            </div>

            <div className={styles.sidePanel}>
              <div className={styles.sidePanelHeader}>
                <span className={styles.sidePanelTitle}>People</span>
                <a href="#" className={styles.viewMoreLink}>View 120 More »</a>
              </div>
              {RIGHT_PEOPLE.map(p => (
                <div key={p.id} className={styles.sideRow}>
                  <div className={styles.sidePersonAvatar} style={{ background: `linear-gradient(135deg, ${p.gradientFrom}, ${p.gradientTo})` }}>
                    {p.initials}
                  </div>
                  <div className={styles.sideRowInfo}>
                    <span className={styles.sideRowName}><Highlight text={p.name} query={q} /></span>
                    {p.subtitle && <span className={styles.sideRowSub}><Highlight text={p.subtitle} query={q} /></span>}
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.sidePanel}>
              <div className={styles.sidePanelHeader}>
                <span className={styles.sidePanelTitle}>Collections</span>
                <a href="#" className={styles.viewMoreLink}>View 8 More »</a>
              </div>
              {RIGHT_COLLECTIONS.map(c => (
                <div key={c.id} className={styles.sideRow}>
                  <div className={styles.sideCollectionIcon}>{c.emoji}</div>
                  <div className={styles.sideRowInfo}>
                    <span className={styles.sideRowName}><Highlight text={c.name} query={q} /></span>
                  </div>
                  <button className={styles.rssBtn} title="Subscribe">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 11a9 9 0 0 1 9 9"/><path d="M4 4a16 16 0 0 1 16 16"/>
                      <circle cx="5" cy="19" r="1" fill="currentColor"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            <div className={styles.sidePanel}>
              <div className={styles.sidePanelHeader}>
                <span className={styles.sidePanelTitle}>Saved</span>
                <a href="#" className={styles.viewMoreLink}>View 38 More »</a>
              </div>
              {RIGHT_SAVED.map(s => (
                <div key={s.id} className={styles.sideRow}>
                  <div className={styles.sideBookmarkIcon}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                    </svg>
                  </div>
                  <div className={styles.sideRowInfo}>
                    <span className={styles.sideRowName}><Highlight text={s.title} query={q} /></span>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </aside>
      </div>
      </div>
    </div>
  );
}
