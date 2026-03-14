'use client';
import { useState } from 'react';
import { watchlistLists, watchlistEntities, stockPanelRows } from '@/lib/mockData/watchlist';
import EntityCard from '@/components/watchlist/EntityCard';
import StockRowItem from '@/components/watchlist/StockRowItem';

export default function WatchlistPage() {
  const [activeList, setActiveList] = useState('0. My Watchlist');
  const [activeTab, setActiveTab] = useState('A - Z');
  const [focused, setFocused] = useState(false);

  return (
    <div className="main-body">
      {/* ─── LEFT SIDEBAR ─── */}
      <aside className="sidebar-left" style={{ width: 200, minWidth: 200, overflowY: 'auto' }}>
        <button style={{
          display: 'block', margin: '10px 10px 6px', padding: '7px 12px',
          background: 'var(--accent)', color: '#fff', fontSize: 12, fontWeight: 600,
          borderRadius: 6, textDecoration: 'none', cursor: 'pointer', border: 'none',
          width: 'calc(100% - 20px)', textAlign: 'left', letterSpacing: '0.2px',
        }}>
          + New Watchlist
        </button>
        <div style={{ flex: 1, padding: '4px 0 8px' }}>
          {watchlistLists.map(list => (
            <a
              key={list}
              href="#"
              onClick={e => { e.preventDefault(); setActiveList(list); }}
              style={{
                display: 'block', padding: '7px 14px', fontSize: '12.5px', fontWeight: activeList === list ? 600 : 400,
                color: activeList === list ? 'var(--accent)' : 'var(--text-secondary)',
                textDecoration: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
                overflow: 'hidden', textOverflow: 'ellipsis',
              }}
            >
              {list}
            </a>
          ))}
        </div>
      </aside>

      {/* ─── CENTER COLUMN ─── */}
      <main className="center-col">
        {/* Toolbar */}
        <div className="center-toolbar" style={{ padding: '0 16px', gap: 10 }}>
          <div className="toolbar-search" style={{ width: 180 }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input type="text" placeholder="Search…" />
          </div>
          <div style={{ flex: 1, textAlign: 'center', fontSize: 11, color: 'var(--text-muted)' }}>30 entities have updates</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto' }}>
            <div className="toggle-wrap">
              <span>Focused</span>
              <div className={`toggle${focused ? ' on' : ''}`} onClick={() => setFocused(!focused)}>
                <div className="toggle-knob" />
              </div>
            </div>
            <select className="sort-select" style={{ background: 'var(--bg-card)', borderRadius: 5, padding: '3px 8px' }}>
              <option>24 Hours ▾</option>
              <option>7 Days</option>
              <option>30 Days</option>
            </select>
            <select className="sort-select" style={{ background: 'var(--bg-card)', borderRadius: 5, padding: '3px 8px' }}>
              <option>A-Z ▾</option>
              <option>Z-A</option>
              <option>% Change ↓</option>
              <option>% Change ↑</option>
            </select>
          </div>
        </div>

        {/* Feed area */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '8px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {watchlistEntities.map(entity => (
            <EntityCard key={entity.id} entity={entity} />
          ))}
        </div>
      </main>

      {/* ─── RIGHT SIDEBAR ─── */}
      <aside style={{ display: 'flex', flexDirection: 'row', width: 260, minWidth: 260, borderLeft: '1px solid var(--border)', overflow: 'hidden', background: 'var(--bg-card)' }}>
        {/* Icon strip */}
        <div style={{ width: 40, minWidth: 40, borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '8px 0', gap: 4, background: 'var(--bg-card)' }}>
          {[
            <><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></>,
            <><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></>,
            <><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></>,
            <><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></>,
            <><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></>,
          ].map((paths, i) => (
            <button key={i} style={{ width: 32, height: 32, borderRadius: 5, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{paths}</svg>
            </button>
          ))}
        </div>

        {/* Stock panel */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Add entity input */}
          <div style={{ padding: '8px 10px 6px', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-base)', border: '1px solid var(--border)', borderRadius: 5, padding: '0 8px', gap: 6, height: 28, width: '100%' }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--text-muted)', flexShrink: 0 }}>
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input type="text" placeholder="+ Add Entity" style={{ background: 'none', border: 'none', outline: 'none', color: 'var(--text-secondary)', fontSize: '11.5px', fontFamily: 'Inter,sans-serif', width: '100%' }} />
            </div>
          </div>

          {/* Sort tabs */}
          <div style={{ display: 'flex', gap: 0, padding: '6px 8px', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
            {['A - Z', '%Change ↓', '%Change ↑'].map(tab => (
              <span
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{ padding: '3px 8px', borderRadius: 3, fontSize: 10, fontWeight: 500, cursor: 'pointer', color: activeTab === tab ? 'var(--accent)' : 'var(--text-muted)', background: activeTab === tab ? 'var(--accent-dim)' : 'transparent', whiteSpace: 'nowrap' }}
              >
                {tab}
              </span>
            ))}
          </div>

          {/* Stock list */}
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {stockPanelRows.map(stock => (
              <StockRowItem key={stock.id} stock={stock} />
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
