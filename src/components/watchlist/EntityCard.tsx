import { WatchlistEntity } from '@/lib/types';

export default function EntityCard({ entity }: { entity: WatchlistEntity }) {
  return (
    <div className="entity-card">
      <div className="entity-header">
        <div className="entity-logo" style={{ background: entity.logoColor }}>
          {entity.logoInitials}
        </div>
        <span className="entity-name">{entity.name}</span>
        <span className="entity-sep">|</span>
        <span className="entity-price">{entity.price}</span>
        <span className="entity-currency">{entity.currency}</span>
        <span className={`entity-change ${entity.direction}`}>{entity.change}</span>
      </div>
      {entity.insights.map(insight => (
        <div key={insight.id} className="insight-row">
          <div className="insight-top">
            <a href="#" className="insight-meta">
              <span className={`insight-type ${insight.type}`}>{insight.type.charAt(0).toUpperCase() + insight.type.slice(1)}</span>
              <span className="insight-date">{insight.date}</span>
            </a>
            <a href="#" className="insight-share">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                <polyline points="16 6 12 2 8 6"/>
                <line x1="12" y1="2" x2="12" y2="15"/>
              </svg>
              Share
            </a>
          </div>
          <a href="#" className="insight-title">{insight.title}</a>
        </div>
      ))}
    </div>
  );
}
