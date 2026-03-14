'use client';
import Link from 'next/link';

interface PanelHeaderProps {
  title: string;
  tabs?: string[];
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  linkText?: string;
  linkHref?: string;
}

export default function PanelHeader({ title, tabs, activeTab, onTabChange, linkText, linkHref }: PanelHeaderProps) {
  return (
    <div className="panel-header">
      <span className="panel-title">{title}</span>
      {tabs && (
        <div style={{ display: 'flex', gap: 2 }}>
          {tabs.map(tab => (
            <span
              key={tab}
              className={`panel-tab${activeTab === tab ? ' active' : ''}`}
              onClick={() => onTabChange?.(tab)}
            >
              {tab}
            </span>
          ))}
        </div>
      )}
      {linkText && linkHref && (
        <Link href={linkHref} className="panel-link">{linkText}</Link>
      )}
    </div>
  );
}
