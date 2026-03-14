'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: 'Dashboard' },
  { href: '/ask', label: 'aSK' },
  { href: '/discussions', label: 'Discussions' },
  { href: '/watchlist', label: 'Watchlists' },
  { href: '/company/SIA', label: 'Company' },
  { href: '/collections', label: 'Collections' },
  { href: '/tools', label: 'Tools' },
  { href: '/insight/top-9-korean-multiomics', label: 'Insight' },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [searchVal, setSearchVal] = useState('');

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchVal.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchVal.trim())}`);
    }
  };

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href === '/company/SIA') return pathname.startsWith('/company');
    if (href.startsWith('/insight/')) return pathname.startsWith('/insight');
    return pathname.startsWith(href);
  };

  return (
    <nav className="navbar">
      <Link href="/" className="nav-logo">
        <Image
          src="https://sk-assets.s3.amazonaws.com/online-branding-manual/01-logotypes/curation-compass-box-full-colour-1000px.png"
          alt="Smartkarma"
          className="nav-logo-img"
          width={120}
          height={32}
          unoptimized
        />
      </Link>

      <div className="nav-links">
        {navLinks.map(({ href, label }) => (
          <Link key={label} href={href} className={`nav-link${isActive(href) ? ' active' : ''}`}>
            {label}
          </Link>
        ))}
      </div>

      <div className="nav-search">
        <svg
          width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          style={{ cursor: 'pointer', flexShrink: 0 }}
          onClick={() => { if (searchVal.trim()) router.push(`/search?q=${encodeURIComponent(searchVal.trim())}`); }}
        >
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          type="text"
          placeholder="aSK or Search…"
          value={searchVal}
          onChange={e => setSearchVal(e.target.value)}
          onKeyDown={handleSearch}
        />
      </div>

      <div className="nav-actions">
        <button className="btn btn-ghost">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          Publish
        </button>
        <button className="btn btn-primary">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          Discuss
        </button>
        <button className="btn-icon">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
          <span className="badge">3</span>
        </button>
        <button className="btn-icon">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.07 4.93A10 10 0 0 0 4.93 19.07M4.93 4.93A10 10 0 0 1 19.07 19.07"/>
          </svg>
        </button>
        <div className="avatar">RK</div>
      </div>
    </nav>
  );
}
