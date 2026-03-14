'use client';
import { useState } from 'react';
import { feedItems } from '@/lib/mockData/feed';
import FeedItem from '@/components/feed/FeedItem';
// import Avatar from '@/components/ui/Avatar';
import styles from './collection.module.css';
import DiscussionsWidget from '@/components/ui/DiscussionsWidget';

// Mock collection data
const collectionMeta = {
  name: '2025 High Conviction Ideas',
  desc: 'High Conviction Ideas going into 2025',
  color: '#c8a96e',
  emoji: '💡',
  insightCount: 39,
  views: '36.8k',
  followers: 48,
};

const sidebarNavItems = [
  { id: 'research', label: 'Research' },
  { id: 'discussions', label: 'Discussions' },
  { id: 'themes', label: 'Themes', badge: 1 },
];

const relatedProviders = [
  { initials: 'AG', name: 'Arun George', spec: 'IPOs and Catalysts/Events / Global Equity Research Ltd', gradientFrom: '#059669', gradientTo: '#34d399', following: true },
  { initials: 'DB', name: 'David Blennerhassett', spec: 'Pan-Asia Catalysts/Events / Quiddity Advisors', gradientFrom: '#3b82f6', gradientTo: '#6366f1', following: true },
  { initials: 'DK', name: 'Douglas Kim', spec: 'Korea/Asia, Events, IPOs / Douglas Research Advisory', gradientFrom: '#059669', gradientTo: '#34d399', following: true },
  { initials: 'XW', name: 'Xinyao (Criss) Wang', spec: 'Healthcare/Biopharma, China', gradientFrom: '#7c3aed', gradientTo: '#a78bfa', following: true },
];

const relatedCollections = [
  { id: 'rc1', name: '2026 High Conviction Ideas', color: '#7b8fa1', emoji: '🎯', following: true },
  { id: 'rc2', name: 'Event-Driven', color: '#5a6b7c', emoji: '⚡', following: false },
];

const sideDiscussions = [
  {
    id: 'sd1',
    entity: 'Samsung Electronics',
    title: 'An Update of Our 2025 High Conviction Pi…',
    author: { initials: 'DK', name: 'Douglas Kim', gradientFrom: '#059669', gradientTo: '#34d399' },
    authorSpec: 'Korea/Asia, Events, IPOs, Douglas Re…',
    body: 'Samsung Electronics and SK Hynix up 15.8% and 11.5%, respectively so far in',
    likes: 1,
    time: '06 Jan 2026 17:34',
  },
  {
    id: 'sd2',
    entity: 'ZIM Integrated Shipping Services',
    title: 'Short ZIM Against Long Position in China …',
    author: { initials: 'DH', name: 'Daniel Hellberg', gradientFrom: '#3b82f6', gradientTo: '#8b5cf6' },
    authorSpec: 'Asian Equities Analyst, Logistics & Tr…',
    body: 'With a few hours of US trading left in 2025, this pair is up about 4% excluding',
    likes: 0,
    time: '31 Dec 2025 23:43',
  },
];

// Use a subset of feed items as collection insights
const collectionInsights = feedItems.slice(0, 8).map((item, i) => ({
  ...item,
  sentiment: (['bullish', 'bullish', 'bullish', 'bullish', 'bullish'] as const)[i % 5] || item.sentiment,
}));

export default function CollectionDetailPage() {
  const [following, setFollowing] = useState(true);
  const [activeNav, setActiveNav] = useState('research');
  const [focused, setFocused] = useState(false);
  const [topPicksOnly, setTopPicksOnly] = useState(false);

  return (
    <div className="main-body" style={{ overflow: 'hidden' }}>
      {/* ─── LEFT SIDEBAR ─── */}
      <aside className="sidebar-left" style={{ width: 160, minWidth: 160, padding: '0 8px', flexShrink: 0 }}>
        <div style={{ paddingTop: 16 }}>
          {sidebarNavItems.map(item => (
            <a
              key={item.id}
              href="#"
              onClick={e => { e.preventDefault(); setActiveNav(item.id); }}
              className={styles.sideNavItem}
              style={{
                fontWeight: activeNav === item.id ? 600 : 400,
                color: activeNav === item.id ? 'var(--accent)' : 'var(--text-secondary)',
              }}
            >
              {item.label}
              {item.badge && (
                <span className={styles.sideNavBadge}>{item.badge}</span>
              )}
            </a>
          ))}
        </div>
      </aside>

      {/* ─── MAIN CONTENT ─── */}
      <div className={styles.content}>
        {/* ── Hero banner — compact single row like company page ── */}
        <div className={styles.hero}>
          {/* Cover icon */}
          <div className={styles.heroCover} style={{ background: collectionMeta.color }}>
            <span style={{ fontSize: 16 }}>{collectionMeta.emoji}</span>
          </div>
          {/* Name + desc */}
          <div className={styles.heroInfo}>
            <span className={styles.heroTitle}>{collectionMeta.name}</span>
            <span className={styles.heroDesc}>{collectionMeta.desc}</span>
          </div>
          {/* Stats inline */}
          <div className={styles.heroStats}>
            <span className={styles.heroDivider}>|</span>
            <div className={styles.heroStat}>
              <span className={styles.heroStatNum}>{collectionMeta.insightCount}</span>
              <span className={styles.heroStatLabel}>Insights</span>
            </div>
            <span className={styles.heroDivider}>|</span>
            <div className={styles.heroStat}>
              <span className={styles.heroStatNum}>{collectionMeta.views}</span>
              <span className={styles.heroStatLabel}>Views</span>
            </div>
            <span className={styles.heroDivider}>|</span>
            <div className={styles.heroStat}>
              <span className={styles.heroStatNum}>{collectionMeta.followers}</span>
              <span className={styles.heroStatLabel}>Followers</span>
            </div>
            <span className={styles.heroDivider}>|</span>
            <span className={styles.collectionBadge}>COLLECTION</span>
          </div>
          {/* Actions */}
          <div className={styles.heroActions}>
            <button
              className={`${styles.followBtn} ${following ? styles.followBtnActive : ''}`}
              onClick={() => setFollowing(f => !f)}
            >
              {following ? 'Following' : 'Follow'}
            </button>
            <button className={styles.shareBtn}>Share</button>
          </div>
        </div>

        {/* ── Filter row ── */}
        <div className={styles.filterRow}>
          {['Regions', 'Sectors', 'Verticals'].map(f => (
            <button key={f} className={styles.filterBtn}>
              {f}
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </button>
          ))}
          <button className={styles.filterBtnMore}>More Filters</button>
        </div>

        {/* ── Body: feed + RHS ── */}
        <div className={styles.body}>
          {/* Feed column */}
          <div className={styles.feedCol}>
            {/* Toolbar */}
            <div className={styles.toolbar}>
              <div className={styles.toolbarSearch}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                <input type="text" placeholder="" />
              </div>
              <div className={styles.toolbarToggle}>
                <span className={styles.toggleLabel}>Focused</span>
                <div
                  className={`toggle${focused ? ' on' : ''}`}
                  style={focused ? { background: 'var(--accent)' } : {}}
                  onClick={() => setFocused(f => !f)}
                >
                  <div className="toggle-knob" style={focused ? { transform: 'translateX(14px)' } : {}} />
                </div>
              </div>
              <div className={styles.toolbarToggle}>
                <span className={styles.toggleLabel}>Top Picks Only</span>
                <div
                  className={`toggle${topPicksOnly ? ' on' : ''}`}
                  style={topPicksOnly ? { background: 'var(--accent)' } : {}}
                  onClick={() => setTopPicksOnly(f => !f)}
                >
                  <div className="toggle-knob" style={topPicksOnly ? { transform: 'translateX(14px)' } : {}} />
                </div>
              </div>
              <button className={styles.recentBtn}>
                Recent
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </button>
              <div style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
                <button className={styles.viewBtn + ' ' + styles.viewBtnActive}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
                    <line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/>
                    <line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
                  </svg>
                </button>
                <button className={styles.viewBtn}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                    <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Feed items */}
            <div className={styles.feed}>
              {collectionInsights.map(item => (
                <FeedItem key={item.id} item={item} titleLineClamp={2} />
              ))}
            </div>
          </div>

          {/* ─── RIGHT SIDEBAR ─── */}
          <aside className={styles.rhs}>
            {/* Discussions widget — left col */}
            <DiscussionsWidget />

            {/* Widgets column — right col */}
            <div className={styles.widgetsCol}>
            {/* Related Providers panel */}
            <div className={styles.rhsPanel}>
              <div className="panel-header">
                <span className="panel-title">Related Providers</span>
              </div>
              {relatedProviders.map(p => (
                <div key={p.name} className={styles.providerRow}>
                  <div style={{ width: 30, height: 30, borderRadius: '50%', background: `linear-gradient(135deg, ${p.gradientFrom}, ${p.gradientTo})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{p.initials}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</div>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.spec}</div>
                  </div>
                  <button className={`${styles.miniFollowBtn} ${p.following ? styles.miniFollowBtnActive : ''}`}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* Related Collections panel */}
            <div className={styles.rhsPanel}>
              <div className="panel-header">
                <span className="panel-title">Related Collections</span>
              </div>
              {relatedCollections.map(c => (
                <div key={c.id} className={styles.relColRow}>
                  <div style={{ width: 30, height: 30, borderRadius: 6, background: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>{c.emoji}</div>
                  <div style={{ flex: 1, minWidth: 0, fontSize: 12, fontWeight: 500, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</div>
                  <button className={`${styles.miniFollowBtn} ${c.following ? styles.miniFollowBtnActive : ''}`}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            </div>{/* end widgetsCol */}
          </aside>
        </div>
      </div>
    </div>
  );
}
