'use client';
import { useState } from 'react';
import { companies } from '@/lib/mockData/companies';
import FeedItem from '@/components/feed/FeedItem';
import DiscussionComposeBox from '@/components/discussions/DiscussionComposeBox';

const sidebarNavItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'insights', label: 'Insights' },
  { id: 'discussions', label: 'Discussions' },
  { id: 'filings', label: 'Filings' },
  { id: 'events', label: 'Events' },
  { id: 'ownership', label: 'Ownership' },
  { id: 'peers', label: 'Peers' },
];

const subnavTabs = [
  { id: 'insights', label: 'Insights' },
  { id: 'discussions', label: 'Discussions' },
  { id: 'filings', label: 'Filings' },
  { id: 'financials', label: 'Financials', badge: 'NEW' },
  { id: 'events', label: 'Events' },
  { id: 'ownership', label: 'Ownership' },
  { id: 'peers', label: 'Peers' },
];

// Mock SVG chart path for price chart
const chartPath = 'M0,60 L20,55 L40,58 L60,50 L80,52 L100,45 L120,48 L140,40 L160,42 L180,35 L200,38 L216,30';

export default function CompanyPage({ params }: { params: { ticker: string } }) {
  const [activeNav, setActiveNav] = useState('insights');
  const [activeSubnav, setActiveSubnav] = useState('insights');
  const [activePanelTab, setActivePanelTab] = useState('Discussions');

  const company = companies[params.ticker.toUpperCase()];
  if (!company) {
    return (
      <div className="main-body" style={{ alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: 'var(--text-muted)', fontSize: 14 }}>Company not found: {params.ticker}</div>
      </div>
    );
  }

  return (
    <div className="main-body" style={{ flex: 1, minHeight: 0 }}>
      {/* Left Sidebar — full height */}
      <aside className="sidebar-left" style={{ width: 180, minWidth: 180, padding: '12px 8px', flexShrink: 0 }}>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 7, width: '100%', padding: '8px 12px', background: 'var(--accent)', color: '#fff', fontSize: 12, fontWeight: 600, letterSpacing: '0.3px', borderRadius: 6, textDecoration: 'none', marginBottom: 10, boxSizing: 'border-box' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            SIA Primer
          </a>

          {sidebarNavItems.map(item => (
            <a
              key={item.id}
              href="#"
              onClick={e => { e.preventDefault(); setActiveNav(item.id); }}
              style={{
                display: 'flex', alignItems: 'center', gap: 6, padding: '7px 10px',
                borderRadius: 5, fontSize: 12, fontWeight: activeNav === item.id ? 600 : 400,
                color: activeNav === item.id ? 'var(--accent)' : 'var(--text-secondary)',
                cursor: 'pointer', transition: 'all 0.13s', textDecoration: 'none',
              }}
            >
              {item.label}
            </a>
          ))}
        </aside>

        {/* Content area — hero + subnav + toolbar + feed */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* ─── HERO BANNER ─── */}
          <div className="company-hero">
            <div className="hero-main">
              <div className="company-logo-box">
                <div className="company-logo-text">SIA</div>
              </div>
              <div className="company-info-col">
                <div className="company-name">{company.name}</div>
                <div className="price-row">
                  <span className="price-value">{company.price}</span>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{company.currency}</span>
                </div>
                <div className="price-change-row">
                  <span className="price-change">{company.priceChangePct}</span>
                </div>
              </div>
              <div className="hero-stats-bar">
                <span className="hero-divider">|</span>
                <div className="hero-stat">
                  <span className="hero-stat-num">{company.marketCap}</span>
                  <span className="hero-stat-label">Mkt Cap</span>
                </div>
                <span className="hero-divider">|</span>
                <div className="hero-stat">
                  <span className="hero-stat-num">{company.peRatio}</span>
                  <span className="hero-stat-label">P/E</span>
                </div>
                <span className="hero-divider">|</span>
                <div className="hero-stat">
                  <span className="hero-stat-num">{company.dividend}</span>
                  <span className="hero-stat-label">Div</span>
                </div>
                <span className="hero-divider">|</span>
                <span className="hero-industry">Airlines &amp; Aviation</span>
                <span className="hero-divider">|</span>
                <span className="entity-badge">Equity · SGX</span>
              </div>
            </div>
            <div className="hero-right">
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <span className="smartscore-label">SmartScore</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#f59e0b', fontFamily: 'JetBrains Mono,monospace' }}>7</span>
              </div>
              <button className="hero-check-btn">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              </button>
              <button className="contact-ir-btn">Contact IR</button>
            </div>
          </div>

          {/* Center + Right columns */}
          <div style={{ flex: 1, minHeight: 0, display: 'flex', overflow: 'hidden' }}>
            {/* Feed column with subnav + toolbar */}
            <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              {/* ─── SUB-NAV TABS ─── */}
              <div className="subnav-tabs">
                {subnavTabs.map(tab => (
                  <button
                    key={tab.id}
                    className={`subnav-tab${activeSubnav === tab.id ? ' active' : ''}`}
                    onClick={() => setActiveSubnav(tab.id)}
                  >
                    {tab.label}
                    {tab.badge && <span className="subnav-new-badge">{tab.badge}</span>}
                  </button>
                ))}
              </div>
              {/* Toolbar — belongs to feed column only */}
              <div className="center-toolbar" style={{ padding: '0 14px', gap: 10 }}>
                <div className="toolbar-search" style={{ width: 180 }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                  </svg>
                  <input type="text" placeholder="Search SIA insights…" />
                </div>
                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--text-secondary)' }}>
                    <span>Focused</span>
                    <div className="toggle on" style={{ background: 'var(--accent)' }}>
                      <div className="toggle-knob" style={{ transform: 'translateX(14px)' }} />
                    </div>
                  </div>
                  <button className="toolbar-btn">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                    Suggested
                  </button>
                  <div style={{ display: 'flex', gap: 4 }}>
                    <button style={{ width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 4, border: '1px solid rgba(0,179,134,0.3)', background: 'var(--accent-dim)', color: 'var(--accent)', cursor: 'pointer' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
                    </button>
                    <button style={{ width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 4, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                    </button>
                  </div>
                </div>
              </div>
              {/* Feed */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '8px 14px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {company.insights.map(item => (
                  <div key={item.id} style={{ width: '100%', maxWidth: 640 }}>
                    <FeedItem item={item} titleLineClamp={2} />
                  </div>
                ))}
              </div>
            </div>{/* end feed column */}

            {/* Right sidebar */}
            <div style={{ display: 'flex', flexDirection: 'row', borderLeft: '1px solid var(--border)', overflow: 'hidden' }}>
              {/* Discussions panel */}
              <div style={{ width: 300, minWidth: 300, background: 'var(--bg-card)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <div className="panel-header">
                  <span className="panel-title">Discussions</span>
                  <div style={{ display: 'flex', gap: 2 }}>
                    {['Discussions', 'Replies'].map(tab => (
                      <span key={tab} className={`panel-tab${activePanelTab === tab ? ' active' : ''}`} onClick={() => setActivePanelTab(tab)}>{tab}</span>
                    ))}
                  </div>
                </div>
                <div style={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
                  {company.discussions.map(d => (
                    <div key={d.id} style={{ padding: '9px 12px', borderBottom: '1px solid var(--border)', cursor: 'pointer', transition: 'background 0.13s' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--text-muted)', flexShrink: 0 }} />
                        <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.4px' }}>{d.companyLabel}</span>
                      </div>
                      <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-primary)', lineHeight: 1.4, marginBottom: 4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{d.title}</div>
                      <div style={{ fontSize: 10, color: 'var(--text-muted)', lineHeight: 1.4, fontStyle: 'italic', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', marginBottom: 5 }}>{d.preview}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        <div style={{ width: 16, height: 16, borderRadius: '50%', background: `linear-gradient(135deg, ${d.author.gradientFrom}, ${d.author.gradientTo})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 7, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{d.author.initials}</div>
                        <span style={{ fontSize: '9.5px', color: 'var(--text-secondary)', fontWeight: 500 }}>{d.author.name}</span>
                        <span style={{ fontSize: 9, color: 'var(--text-muted)', marginLeft: 'auto' }}>{d.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Compose box */}
                <div style={{ borderTop: '2px solid var(--accent)', padding: '10px 12px 12px', background: '#0f1a24', flexShrink: 0, boxShadow: '0 -4px 16px rgba(0,0,0,0.3)' }}>
                  <DiscussionComposeBox companyLabel="SIA SP" />
                </div>
              </div>

              {/* Snapshot / chart panel */}
              <div style={{ width: 240, minWidth: 240, background: 'var(--bg-card)', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
                <div className="panel-header">
                  <span className="panel-title">Snapshot</span>
                  <div style={{ display: 'flex', gap: 2 }}>
                    {['1W', '1M', '3M', '1Y'].map(p => (
                      <span key={p} className={`panel-tab${p === '1M' ? ' active' : ''}`}>{p}</span>
                    ))}
                  </div>
                </div>

                <div className="snapshot-price-badge">
                  <span className="snapshot-price-val">{company.price} {company.currency}</span>
                  <span className="snapshot-price-change">{company.priceChangePct}</span>
                </div>

                {/* Mini chart */}
                <div className="chart-area">
                  <svg className="chart-svg" height="70" viewBox="0 0 216 70" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ef4444" stopOpacity="0.15"/>
                        <stop offset="100%" stopColor="#ef4444" stopOpacity="0"/>
                      </linearGradient>
                    </defs>
                    <path d={`${chartPath} L216,70 L0,70 Z`} fill="url(#chartGrad)" />
                    <path d={chartPath} fill="none" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>

                {/* Price gauge */}
                <div className="price-gauge-row">
                  <div className="gauge-label">52-Week Range</div>
                  <div className="gauge-bar-wrap">
                    <div className="gauge-marker" style={{ left: '52%', background: '#ef4444' }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, fontSize: '9.5px', color: 'var(--text-muted)', fontFamily: 'JetBrains Mono,monospace' }}>
                    <span>5.48</span>
                    <span>8.84</span>
                  </div>
                </div>

                {/* Stats */}
                {[
                  { label: 'Market Cap', value: company.marketCap },
                  { label: 'P/E Ratio', value: company.peRatio },
                  { label: 'Div Yield', value: company.dividend },
                  { label: 'SmartScore', value: company.smartScore },
                  { label: 'Analysts', value: '12 covering' },
                  { label: 'Beta', value: '0.82' },
                ].map(({ label, value }) => (
                  <div key={label} className="snapshot-stat-row">
                    <span className="snapshot-stat-label">{label}</span>
                    <span className="snapshot-stat-value">{value}</span>
                  </div>
                ))}

                <a href="#" className="view-more-link">View Full Fundamentals →</a>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
