'use client';
import { useState } from 'react';
import PanelHeader from './PanelHeader';
import styles from './DiscussionsWidget.module.css';

const discussions = [
  {
    id: 'd1',
    companyLabel: 'SIA SP',
    title: 'SIA cargo outlook post-CNY',
    preview: 'Air cargo demand has softened post-Chinese New Year...',
    author: { initials: 'AK', name: 'Anil Kumar', gradientFrom: '#00b386', gradientTo: '#6366f1' },
    time: '4h',
  },
  {
    id: 'd2',
    companyLabel: '005930 KS',
    title: 'Samsung HBM3E delay implications',
    preview: 'The qualification slip means Q2 guidance will need revising...',
    author: { initials: 'NK', name: 'Nader Khouri', gradientFrom: '#3b82f6', gradientTo: '#8b5cf6' },
    time: '6h',
  },
  {
    id: 'd3',
    companyLabel: 'DBS SP',
    title: 'DBS dividend upgrade — when?',
    preview: 'Q4 beat gives the board cover to raise the interim dividend...',
    author: { initials: 'SP', name: 'Sunil Prakash', gradientFrom: '#10b981', gradientTo: '#00c896' },
    time: '8h',
  },
  {
    id: 'd4',
    companyLabel: '17 HK',
    title: 'New World — covenant breach risk?',
    preview: 'Debt-to-equity now at 1.8x. The question is whether lenders...',
    author: { initials: 'DB', name: 'David Blennerhassett', gradientFrom: '#3b82f6', gradientTo: '#6366f1' },
    time: '12h',
  },
];

export default function DiscussionsWidget({ bordered = false }: { bordered?: boolean }) {
  const [draft, setDraft] = useState('');

  return (
    <aside
      className={styles.widget}
      style={bordered ? { borderLeft: '1px solid var(--border)' } : {}}
    >
      <PanelHeader title="Discussions" tabs={['For Me', 'All']} activeTab="For Me" linkText="View All" linkHref="/discussions" />
      <div className={styles.list}>
        {discussions.map(d => (
          <div key={d.id} className={styles.item}>
            <div className={styles.entityRow}>
              <div className={styles.entityDot} />
              <span className={styles.entityLabel}>{d.companyLabel}</span>
            </div>
            <div className={styles.title}>{d.title}</div>
            <div className={styles.preview}>{d.preview}</div>
            <div className={styles.footer}>
              <div
                className={styles.avatar}
                style={{ background: `linear-gradient(135deg, ${d.author.gradientFrom}, ${d.author.gradientTo})` }}
              >
                {d.author.initials}
              </div>
              <span className={styles.authorName}>{d.author.name}</span>
              <span className={styles.time}>{d.time}</span>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.compose}>
        <div className={styles.composeLabel}>Post a Discussion</div>
        <textarea
          className={styles.composeTextarea}
          placeholder="Share your market insight or question…"
          value={draft}
          onChange={e => setDraft(e.target.value)}
        />
        <div className={styles.composeFooter}>
          <button className={styles.postBtn}>Post</button>
        </div>
      </div>
    </aside>
  );
}
