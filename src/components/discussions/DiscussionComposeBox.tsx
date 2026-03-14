'use client';
import { useState } from 'react';

interface DiscussionComposeBoxProps {
  companyLabel?: string;
  onPost?: (text: string) => void;
}

export default function DiscussionComposeBox({ companyLabel, onPost }: DiscussionComposeBoxProps) {
  const [text, setText] = useState('');

  const handlePost = () => {
    if (text.trim()) {
      onPost?.(text.trim());
      setText('');
    }
  };

  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border)',
      borderTop: '2px solid var(--accent)',
      borderRadius: 8,
      padding: '10px 12px',
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
    }}>
      {companyLabel && (
        <div style={{ fontSize: 10.5, color: 'var(--text-muted)' }}>
          Discussing <span style={{ color: 'var(--accent)' }}>{companyLabel}</span>
        </div>
      )}
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Share your thoughts…"
        style={{
          background: 'transparent', border: 'none', outline: 'none',
          color: 'var(--text-primary)', fontSize: 12.5,
          fontFamily: 'Inter, sans-serif', resize: 'none',
          minHeight: 60, width: '100%', lineHeight: 1.5,
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          onClick={handlePost}
          disabled={!text.trim()}
          style={{
            padding: '5px 14px', borderRadius: 6, border: 'none',
            background: text.trim() ? 'var(--accent)' : 'var(--border)',
            color: text.trim() ? '#fff' : 'var(--text-muted)',
            fontSize: 11.5, fontWeight: 600, cursor: text.trim() ? 'pointer' : 'default',
            transition: 'all 0.15s',
          }}
        >
          Post
        </button>
      </div>
    </div>
  );
}
