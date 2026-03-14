'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from './collections.module.css';

const sidebarNavItems = [
  { id: 'for-me', label: 'For Me' },
  { id: 'trending', label: 'Trending / Top' },
  { id: 'browse', label: 'Browse All' },
];

// Emoji/flag placeholders for cover images
const followedCollections = [
  { id: 'c1', name: '2025 High Conviction Ideas', desc: 'High Conviction Ideas going into 2025', color: '#c8a96e', emoji: '💡' },
  { id: 'c2', name: '2026 High Conviction Ideas', desc: 'High Conviction Ideas going into 2026', color: '#7b8fa1', emoji: '🎯' },
  { id: 'c3', name: 'About To Go Viral', desc: 'Insights that deserve your attention', color: '#6b8cba', emoji: '🚀' },
  { id: 'c4', name: 'Asia ECM', desc: 'Coverage of Asian IPOs & Placements', color: '#c87941', emoji: '🏙️' },
  { id: 'c5', name: 'Equity Derivatives', desc: 'Equity Derivatives (EQD) and Vol-Based Insights', color: '#8a9bb0', emoji: '📊' },
  { id: 'c6', name: 'Event-Driven', desc: 'Event-Driven Insights', color: '#5a6b7c', emoji: '⚡' },
  { id: 'c7', name: 'Forensic Accounting', desc: 'Accounting Diagnostics, Red Flags, Short-sell risk', color: '#7a5c8a', emoji: '🔍' },
  { id: 'c8', name: 'Index Rebalance', desc: 'Index Inclusion / Exclusions Analysis', color: '#b8a060', emoji: '⚖️' },
  { id: 'c9', name: 'Japan Activism', desc: 'Governance & Activism in Japanese Markets', color: '#6a7a8c', emoji: '🗻' },
  { id: 'c10', name: 'Korea Small Cap', desc: 'Gems in the Korean market', color: '#3a6b9c', emoji: '🏢' },
  { id: 'c11', name: 'M&A Guides', desc: 'Essential guides to regional m&a frameworks', color: '#8c4a4a', emoji: '🤝' },
  { id: 'c12', name: 'Philippines', desc: 'Insights on Philippines', color: '#1a5fa8', emoji: '🇵🇭' },
  { id: 'c13', name: 'Private Capital Markets (PCM)', desc: 'Insights on Private Capital Markets (PCM)', color: '#4a7a9c', emoji: '🏗️' },
  { id: 'c14', name: 'Sell / Short Ideas', desc: 'Outperform on the downside', color: '#9c8060', emoji: '🐻' },
  { id: 'c15', name: 'Singapore Value-Up', desc: 'Singapore value opportunities', color: '#d44a4a', emoji: '🦁' },
  { id: 'c16', name: 'Smartkarma Originals', desc: 'Exclusive original research', color: '#4a5c8c', emoji: '⭐' },
];

export default function CollectionsPage() {
  const [activeTab, setActiveTab] = useState<'followed' | 'recommended'>('followed');
  const [activeNav, setActiveNav] = useState('for-me');
  const [followed, setFollowed] = useState<Set<string>>(new Set(followedCollections.map(c => c.id)));

  const toggleFollow = (id: string) => {
    setFollowed(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="main-body">
      {/* ─── LEFT SIDEBAR ─── */}
      <aside className="sidebar-left" style={{ width: 180, minWidth: 180, padding: '16px 8px', flexShrink: 0 }}>
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
          </a>
        ))}
      </aside>

      {/* ─── MAIN CONTENT ─── */}
      <div className={styles.content}>
        {/* Top toggle tabs */}
        <div className={styles.topTabs}>
          <button
            className={`${styles.topTab} ${activeTab === 'followed' ? styles.topTabActive : ''}`}
            onClick={() => setActiveTab('followed')}
          >
            Followed
          </button>
          <button
            className={`${styles.topTab} ${activeTab === 'recommended' ? styles.topTabActive : ''}`}
            onClick={() => setActiveTab('recommended')}
          >
            Recommended
          </button>
        </div>

        {/* Collections area */}
        <div className={styles.collectionsArea}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTitle}>{activeTab === 'followed' ? 'Followed' : 'Recommended'}</span>
            <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace', flexShrink: 0 }}>
              {followedCollections.length}
            </span>
            <div className={styles.sectionDivider} />
          </div>

          <div className={styles.grid}>
            {followedCollections.map(col => (
              <div key={col.id} className={styles.card}>
                {/* Cover image */}
                <Link href={`/collections/${col.id}`} style={{ display: 'contents' }}>
                  <div className={styles.cardCover} style={{ background: col.color }}>
                    <span className={styles.cardEmoji}>{col.emoji}</span>
                  </div>
                  {/* Info */}
                  <div className={styles.cardInfo}>
                    <div className={styles.cardName}>{col.name}</div>
                    <div className={styles.cardDesc}>{col.desc}</div>
                  </div>
                </Link>
                {/* Follow button */}
                <button
                  className={`${styles.followBtn} ${followed.has(col.id) ? styles.followBtnActive : ''}`}
                  onClick={() => toggleFollow(col.id)}
                  title={followed.has(col.id) ? 'Unfollow' : 'Follow'}
                >
                  {followed.has(col.id) ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 5v14M5 12h14"/>
                    </svg>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
