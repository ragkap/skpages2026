'use client';
import { useState } from 'react';
import styles from './tools.module.css';
import DiscussionsWidget from '@/components/ui/DiscussionsWidget';

const filterTabs = [
  { id: 'all', label: 'All tools' },
  { id: 'screeners', label: 'Screeners & Comparisons' },
  { id: 'markets', label: 'Markets' },
  { id: 'commodities', label: 'Commodities' },
  { id: 'event-driven', label: 'Event-Driven' },
  { id: 'charting', label: 'Charting' },
  { id: 'providers', label: 'For Insight Providers' },
  { id: 'partners', label: 'For Channel Partners' },
];

interface Tool {
  id: string;
  name: string;
  desc: string;
  iconEl: React.ReactNode;
  iconBg: string;
  category: string;
  isNew?: boolean;
}

// Reusable SVG icons
const IconScreener = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
    <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
    <line x1="8" y1="18" x2="21" y2="18"/>
    <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
  </svg>
);
const IconPeople = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const IconChart = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
  </svg>
);
const IconRelValue = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
    <polyline points="16 7 22 7 22 13"/>
  </svg>
);
const IconCompass = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
  </svg>
);
const IconPeers = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
    <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
);
const IconRevenue = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
  </svg>
);
const IconFund = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
    <path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
  </svg>
);
const IconPortfolio = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
    <polyline points="17 6 23 6 23 12"/>
  </svg>
);
const IconMA = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
    <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
  </svg>
);
const IconKorea = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <path d="M9 9h6v6H9z"/>
  </svg>
);
const IconGlobe = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);
const IconFX = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
    <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
);
const IconCrypto = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
    <path d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.29 4.26m5.908 1.042.348-1.97M7.48 20.364l3.126-17.727"/>
  </svg>
);
const IconInfo = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);
const IconLeaf = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
    <path d="M2 22 16 8"/><path d="M16 8c0-4 4-6 6-6-2 4-2 8-6 10-3 1.5-6 1-8 0"/>
  </svg>
);
const IconRadar = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
    <path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 8a4 4 0 1 0 4 4"/><line x1="12" y1="12" x2="22" y2="2"/>
  </svg>
);
const IconArrowUp = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 8 12 16"/><polyline points="8 12 12 8 16 12"/>
  </svg>
);
const IconArrowDown = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 16 12 8"/><polyline points="8 12 12 16 16 12"/>
  </svg>
);
const IconAH = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
    <rect x="2" y="2" width="9" height="9" rx="1"/><rect x="13" y="2" width="9" height="9" rx="1"/>
    <rect x="2" y="13" width="9" height="9" rx="1"/><rect x="13" y="13" width="9" height="9" rx="1"/>
  </svg>
);
const IconCandlestick = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
    <path d="M7 16V8m0-4v2m0 10v2M12 20V12m0-4V4m0 12v4M17 14V6m0-4v2m0 10v6"/>
  </svg>
);
const IconPublish = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
    <path d="M12 19V5m-7 7 7-7 7 7"/><line x1="5" y1="21" x2="19" y2="21"/>
  </svg>
);
const IconAnalytics = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
    <path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/>
  </svg>
);
const IconPartner = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const GREEN = '#1a7a5e';
const BLUE = '#1a5a9e';
const PURPLE = '#6a3a9e';
const DARK_GREEN = '#2d6a2d';
const TEAL = '#0e7490';

const tools: Tool[] = [
  // Screeners & Comparisons
  { id: 't1', name: 'SmartScore Screener', desc: 'Screen for companies on SmartScore Factors', iconEl: <IconScreener />, iconBg: GREEN, category: 'screeners' },
  { id: 't2', name: 'Executives Analytics', desc: 'Screen for top executives based on the performance of their trades done on their own companies', iconEl: <IconPeople />, iconBg: GREEN, category: 'screeners' },
  { id: 't3', name: 'Relative Value', desc: 'Monitor price ratios of closely correlated pairs such as HoldCos, and Share classes', iconEl: <IconRelValue />, iconBg: GREEN, category: 'screeners' },
  { id: 't4', name: 'Discovery', desc: 'Most searched Entities with fewest number of Insights published recently', iconEl: <IconCompass />, iconBg: GREEN, category: 'screeners' },
  { id: 't5', name: 'Peers Comparison', desc: 'Compare fundamentals of Peer Companies', iconEl: <IconPeers />, iconBg: GREEN, category: 'screeners' },
  { id: 't6', name: 'Taiwan Monthly Revenue Monitor', desc: 'Track monthly revenue trends of Taiwanese listed companies with…', iconEl: <IconRevenue />, iconBg: GREEN, category: 'screeners', isNew: true },
  { id: 't7', name: 'Fund Screener', desc: 'Screen for Funds & Fund Managers', iconEl: <IconFund />, iconBg: GREEN, category: 'screeners', isNew: true },
  { id: 't8', name: 'Model Portfolios', desc: 'Model Portfolios and Thematic Baskets', iconEl: <IconPortfolio />, iconBg: GREEN, category: 'screeners', isNew: true },
  { id: 't9', name: 'M&A Transaction Comparables', desc: 'Retrieve precedent transactions and valuations of comparable peers', iconEl: <IconMA />, iconBg: GREEN, category: 'screeners', isNew: true },
  { id: 't10', name: 'Korea Value-up Screener', desc: 'Screen Korean stocks for value-up potential', iconEl: <IconKorea />, iconBg: GREEN, category: 'screeners', isNew: true },

  // Markets
  { id: 't11', name: 'Market Overview', desc: 'Global markets performance, gainers and losers and key events', iconEl: <IconGlobe />, iconBg: BLUE, category: 'markets' },
  { id: 't12', name: 'FX & Rates', desc: 'Real-time FX quotes, forex heatmap and screener', iconEl: <IconFX />, iconBg: BLUE, category: 'markets' },
  { id: 't13', name: 'Crypto', desc: 'Crypto asset pricing, fundamental data, heatmap, screener and key news', iconEl: <IconCrypto />, iconBg: BLUE, category: 'markets' },
  { id: 't14', name: 'Heteronomics Inflation Forecasts', desc: 'EU/UK forecasts and proprietary indicators from Heteronomics', iconEl: <IconInfo />, iconBg: BLUE, category: 'markets' },

  // Commodities
  { id: 't15', name: 'Rubber (Helixtap)', desc: 'Data, analysis, and forecasts for the Rubber market', iconEl: <IconLeaf />, iconBg: DARK_GREEN, category: 'commodities', isNew: true },

  // Event-Driven
  { id: 't16', name: 'Active Situations Monitor', desc: 'Track active event-driven, index rebalance and ECM situations', iconEl: <IconRadar />, iconBg: PURPLE, category: 'event-driven', isNew: true },
  { id: 't17', name: 'Quiddity Northbound Monitor', desc: 'Monitor China/HK Northbound Liquidity flows', iconEl: <IconArrowUp />, iconBg: PURPLE, category: 'event-driven' },
  { id: 't18', name: 'Quiddity Southbound Monitor', desc: 'Monitor China/HK Southbound Liquidity flows', iconEl: <IconArrowDown />, iconBg: PURPLE, category: 'event-driven' },
  { id: 't19', name: 'Quiddity A/H Shares Monitor', desc: 'Track China/HK A/H share Premia and Performance by Sector', iconEl: <IconAH />, iconBg: PURPLE, category: 'event-driven' },

  // Charting
  { id: 't20', name: 'Advanced Charting', desc: 'Full-featured charting with technical indicators and drawing tools', iconEl: <IconCandlestick />, iconBg: TEAL, category: 'charting' },
  { id: 't21', name: 'Correlation Matrix', desc: 'Visualise correlations between equities, sectors and indices', iconEl: <IconChart />, iconBg: TEAL, category: 'charting' },

  // For Insight Providers
  { id: 't22', name: 'Publishing Suite', desc: 'Write, format and publish research insights with rich media support', iconEl: <IconPublish />, iconBg: '#0e6655', category: 'providers' },
  { id: 't23', name: 'Provider Analytics', desc: 'Track readership, engagement and follower growth for your research', iconEl: <IconAnalytics />, iconBg: '#0e6655', category: 'providers' },
  { id: 't24', name: 'Audience Insights', desc: 'Understand who reads your research and what topics resonate most', iconEl: <IconPeople />, iconBg: '#0e6655', category: 'providers' },

  // For Channel Partners
  { id: 't25', name: 'Partner Portal', desc: 'Manage your channel partnership, billing and distribution settings', iconEl: <IconPartner />, iconBg: '#7a3a2e', category: 'partners' },
  { id: 't26', name: 'White-label Reports', desc: 'Distribute co-branded Smartkarma research to your client base', iconEl: <IconFund />, iconBg: '#7a3a2e', category: 'partners' },
];

const recentlyVisited = [tools[9], tools[11], tools[5]]; // Korea, Payment(FX), Taiwan

const sections = [
  { id: 'screeners', label: 'SCREENERS & COMPARISONS' },
  { id: 'markets', label: 'MARKETS' },
  { id: 'commodities', label: 'COMMODITIES' },
  { id: 'event-driven', label: 'EVENT-DRIVEN' },
  { id: 'charting', label: 'CHARTING' },
  { id: 'providers', label: 'FOR INSIGHT PROVIDERS' },
  { id: 'partners', label: 'FOR CHANNEL PARTNERS' },
];

function ToolIcon({ tool, size }: { tool: Tool; size?: number }) {
  return (
    <div
      className={styles.toolIcon}
      style={{
        background: tool.iconBg,
        ...(size ? { width: size, height: size, minWidth: size, alignSelf: 'auto' } : {}),
      }}
    >
      {tool.iconEl}
    </div>
  );
}

function ToolCard({ tool }: { tool: Tool }) {
  return (
    <div className={styles.toolCard}>
      {tool.isNew && <span className={styles.newBadge}>NEW</span>}
      <ToolIcon tool={tool} />
      <div className={styles.toolInfo}>
        <div className={styles.toolName}>{tool.name}</div>
        {tool.desc && <div className={styles.toolDesc}>{tool.desc}</div>}
      </div>
    </div>
  );
}

export default function ToolsPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredSections = sections.filter(s =>
    activeFilter === 'all' || s.id === activeFilter
  );

  return (
    <div className={styles.page}>
      {/* ── Body: LHS + content + RHS ── */}
      <div className={styles.body}>
        {/* ── Left sidebar ── */}
        <aside className="sidebar-left" style={{ width: 200, minWidth: 200 }}>
          <div className="sidebar-section">
            <a href="/ask" className="sidebar-ask-btn" style={{
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
            </a>
          </div>
          <div className="sidebar-divider" />
          <div className="sidebar-section">
            <div className="sidebar-section-label">Categories</div>
            <a href="#" className={`sidebar-nav-item${activeFilter === 'all' ? ' active' : ''}`} onClick={e => { e.preventDefault(); setActiveFilter('all'); }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
              All tools
            </a>
            <a href="#" className={`sidebar-nav-item${activeFilter === 'screeners' ? ' active' : ''}`} onClick={e => { e.preventDefault(); setActiveFilter('screeners'); }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
              Screeners
            </a>
            <a href="#" className={`sidebar-nav-item${activeFilter === 'markets' ? ' active' : ''}`} onClick={e => { e.preventDefault(); setActiveFilter('markets'); }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 7 13.5 15.5 8.5 10.5 1 18"/><polyline points="16 7 22 7 22 13"/></svg>
              Markets
            </a>
            <a href="#" className={`sidebar-nav-item${activeFilter === 'commodities' ? ' active' : ''}`} onClick={e => { e.preventDefault(); setActiveFilter('commodities'); }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 22 16 8"/><path d="M16 8c0-4 4-6 6-6-2 4-2 8-6 10-3 1.5-6 1-8 0"/></svg>
              Commodities
            </a>
            <a href="#" className={`sidebar-nav-item${activeFilter === 'event-driven' ? ' active' : ''}`} onClick={e => { e.preventDefault(); setActiveFilter('event-driven'); }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
              Event-Driven
            </a>
            <a href="#" className={`sidebar-nav-item${activeFilter === 'charting' ? ' active' : ''}`} onClick={e => { e.preventDefault(); setActiveFilter('charting'); }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 16V8m0-4v2m0 10v2M12 20V12m0-4V4m0 12v4M17 14V6m0-4v2m0 10v6"/></svg>
              Charting
            </a>
          </div>
          <div className="sidebar-divider" />
          <div className="sidebar-section">
            <div className="sidebar-section-label">Partners</div>
            <a href="#" className={`sidebar-nav-item${activeFilter === 'providers' ? ' active' : ''}`} onClick={e => { e.preventDefault(); setActiveFilter('providers'); }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 19V5m-7 7 7-7 7 7"/><line x1="5" y1="21" x2="19" y2="21"/></svg>
              Insight Providers
            </a>
            <a href="#" className={`sidebar-nav-item${activeFilter === 'partners' ? ' active' : ''}`} onClick={e => { e.preventDefault(); setActiveFilter('partners'); }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              Channel Partners
            </a>
          </div>
        </aside>
      {/* ── Scrollable content ── */}
      <div className={styles.content}>
        {/* ── Search bar ── */}
        <div className={styles.searchBar}>
          <div className="toolbar-search" style={{ width: 280 }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input type="text" placeholder="Search tools…" />
          </div>
        </div>
        <div className={styles.sectionsScroll}>
        {/* Recently Visited */}
        {activeFilter === 'all' && (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" style={{ flexShrink: 0 }}>
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <span className={styles.sectionLabel}>RECENTLY VISITED</span>
              <div className={styles.sectionLine} />
            </div>
            <div className={styles.recentRow}>
              {recentlyVisited.map(tool => (
                <div key={tool.id} className={styles.recentCard}>
                  {tool.isNew && <span className={styles.newBadge}>NEW</span>}
                  <ToolIcon tool={tool} />
                  <span className={styles.recentCardInfo}>{tool.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tool sections */}
        {filteredSections.map(section => {
          const sectionTools = tools.filter(t => t.category === section.id);
          if (!sectionTools.length) return null;
          return (
            <div key={section.id} className={styles.section}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionLabel}>{section.label}</span>
                <div className={styles.sectionLine} />
              </div>
              <div className={styles.toolGrid}>
                {sectionTools.map(tool => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            </div>
          );
        })}
        </div>
      </div>
      <DiscussionsWidget bordered />
      </div>
    </div>
  );
}
