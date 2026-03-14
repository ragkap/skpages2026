'use client';
import { useState } from 'react';
import styles from './tools.module.css';

const filterTabs = [
  { id: 'all', label: 'All tools' },
  { id: 'screeners', label: 'Screeners & Comparisons', icon: '≡' },
  { id: 'markets', label: 'Markets', icon: '↗' },
  { id: 'commodities', label: 'Commodities', icon: '◎' },
  { id: 'event-driven', label: 'Event-Driven', icon: '▦' },
  { id: 'charting', label: 'Charting', icon: '↗' },
  { id: 'providers', label: 'For Insight Providers' },
  { id: 'partners', label: 'For Channel Partners' },
];

interface Tool {
  id: string;
  name: string;
  desc: string;
  icon: string;
  iconBg: string;
  category: string;
  isNew?: boolean;
}

const tools: Tool[] = [
  // Screeners & Comparisons
  { id: 't1', name: 'SmartScore Screener', desc: 'Screen for companies on SmartScore Factors', icon: '≡↑', iconBg: '#1a7a5e', category: 'screeners' },
  { id: 't2', name: 'Executives Analytics', desc: 'Screen for top executives based on the performance of their trades done on thei…', icon: '👤', iconBg: '#1a7a5e', category: 'screeners' },
  { id: 't3', name: 'Relative Value', desc: 'Monitor price ratios of closely correlated pairs such as HoldCos, and Share classes', icon: '≈', iconBg: '#1a7a5e', category: 'screeners' },
  { id: 't4', name: 'Discovery', desc: 'Most searched Entities with fewest number of Insights published recently', icon: '◎', iconBg: '#1a7a5e', category: 'screeners' },
  { id: 't5', name: 'Peers Comparison', desc: 'Compare fundamentals of Peer Companies', icon: '⊞', iconBg: '#1a7a5e', category: 'screeners' },
  { id: 't6', name: 'Taiwan Monthly Revenue Monitor', desc: 'Track monthly revenue trends of Taiwanese listed companies with…', icon: '↗', iconBg: '#1a7a5e', category: 'screeners', isNew: true },
  { id: 't7', name: 'Fund Screener', desc: 'Screen for Funds & Fund Managers', icon: '≡', iconBg: '#1a7a5e', category: 'screeners', isNew: true },
  { id: 't8', name: 'Model Portfolios', desc: 'Model Portfolios and Thematic Baskets', icon: '↗', iconBg: '#1a7a5e', category: 'screeners', isNew: true },
  { id: 't9', name: 'M&A Transaction Comparables', desc: 'Retrieve precedent transactions and valuations of comparable peers', icon: '⇄', iconBg: '#1a7a5e', category: 'screeners', isNew: true },
  { id: 't10', name: 'Korea Value-up Screener', desc: 'Screen Korean stocks for value-up potential', icon: 'K', iconBg: '#1a7a5e', category: 'screeners', isNew: true },

  // Markets
  { id: 't11', name: 'Market Overview', desc: 'Global markets performance, gainers and losers and key events', icon: '↕', iconBg: '#1a5a9e', category: 'markets' },
  { id: 't12', name: 'FX & Rates', desc: 'Real-time FX quotes, forex heatmap and screener', icon: '$', iconBg: '#1a5a9e', category: 'markets' },
  { id: 't13', name: 'Crypto', desc: 'Crypto asset pricing, fundamental data, heatmap, screener and key news', icon: '₿', iconBg: '#1a5a9e', category: 'markets' },
  { id: 't14', name: 'Heteronomics Inflation Forecasts', desc: 'EU/UK forecasts and proprietary indicators from Heteronomics', icon: 'i', iconBg: '#1a5a9e', category: 'markets' },

  // Commodities
  { id: 't15', name: 'Rubber (Helixtap)', desc: 'Data, analysis, and forecasts for the Rubber market', icon: '🌿', iconBg: '#2d6a2d', category: 'commodities', isNew: true },

  // Event-Driven
  { id: 't16', name: 'Active Situations Monitor', desc: 'Track active event-driven, index rebalance and ECM situations', icon: '⟳', iconBg: '#6a3a9e', category: 'event-driven', isNew: true },
  { id: 't17', name: 'Quiddity Northbound Monitor', desc: 'Monitor China/HK Northbound Liquidity flows', icon: 'N↑', iconBg: '#6a3a9e', category: 'event-driven' },
  { id: 't18', name: 'Quiddity Southbound Monitor', desc: 'Monitor China/HK Southbound Liquidity flows', icon: 'S↓', iconBg: '#6a3a9e', category: 'event-driven' },
  { id: 't19', name: 'Quiddity A/H Shares Monitor', desc: 'Track China/HK A/H share Premia and Performance by Sector', icon: 'A/H', iconBg: '#6a3a9e', category: 'event-driven' },

  // Charting
  { id: 't20', name: 'Advanced Charting', desc: 'Full-featured charting with technical indicators and drawing tools', icon: '📈', iconBg: '#1a5a9e', category: 'charting' },
  { id: 't21', name: 'Correlation Matrix', desc: 'Visualise correlations between equities, sectors and indices', icon: '⊞', iconBg: '#1a5a9e', category: 'charting' },
];

const recentlyVisited: Tool[] = [
  { id: 'r1', name: 'Korea Value-up Screener', desc: '', icon: 'K', iconBg: '#1a7a5e', category: 'screeners', isNew: true },
  { id: 'r2', name: 'Payment Analytics', desc: '', icon: '⊞', iconBg: '#1a5a9e', category: 'markets' },
  { id: 'r3', name: 'Taiwan Monthly Revenue Monitor', desc: '', icon: '↗', iconBg: '#1a7a5e', category: 'screeners', isNew: true },
];

const sections = [
  { id: 'screeners', label: 'SCREENERS & COMPARISONS' },
  { id: 'markets', label: 'MARKETS' },
  { id: 'commodities', label: 'COMMODITIES' },
  { id: 'event-driven', label: 'EVENT-DRIVEN' },
  { id: 'charting', label: 'CHARTING' },
];

function ToolCard({ tool }: { tool: Tool }) {
  return (
    <div className={styles.toolCard}>
      {tool.isNew && <span className={styles.newBadge}>NEW</span>}
      <div className={styles.toolIcon} style={{ background: tool.iconBg }}>
        <span className={styles.toolIconText}>{tool.icon}</span>
      </div>
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
      {/* ── Filter tab bar ── */}
      <div className={styles.filterBar}>
        {filterTabs.map(tab => (
          <button
            key={tab.id}
            className={`${styles.filterTab} ${activeFilter === tab.id ? styles.filterTabActive : ''}`}
            onClick={() => setActiveFilter(tab.id)}
          >
            {tab.icon && <span className={styles.filterTabIcon}>{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Scrollable content ── */}
      <div className={styles.content}>
        {/* Recently Visited */}
        {activeFilter === 'all' && (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionIcon}>ℹ</span>
              <span className={styles.sectionLabel}>RECENTLY VISITED</span>
              <div className={styles.sectionLine} />
            </div>
            <div className={styles.recentRow}>
              {recentlyVisited.map(tool => (
                <div key={tool.id} className={styles.recentCard}>
                  {tool.isNew && <span className={styles.newBadge}>NEW</span>}
                  <div className={styles.toolIcon} style={{ background: tool.iconBg }}>
                    <span className={styles.toolIconText}>{tool.icon}</span>
                  </div>
                  <span className={styles.toolName}>{tool.name}</span>
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
  );
}
