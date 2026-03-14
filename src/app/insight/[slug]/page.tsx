'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { getInsightBySlug } from '@/lib/mockData/insight';
import SentimentTag from '@/components/ui/SentimentTag';
import PanelHeader from '@/components/ui/PanelHeader';
import DiscussionsWidget from '@/components/ui/DiscussionsWidget';
import styles from './insight.module.css';

const tocSections = [
  { id: 'executive-summary', label: 'Executive Summary' },
  { id: 'detail', label: 'Detail' },
  { id: 'company-backgrounds', label: 'Company Backgrounds' },
  { id: 'related', label: 'Related & Trending' },
  { id: 'discussions', label: 'Discussions' },
];

export default function InsightPage({ params }: { params: { slug: string } }) {
  const insight = getInsightBySlug(params.slug)!;
  const [smartTakesOpen, setSmartTakesOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likePopping, setLikePopping] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [activePeriod, setActivePeriod] = useState('1Y');
  const [draft, setDraft] = useState('');
  const [activeSection, setActiveSection] = useState('executive-summary');
  const [titlePinned, setTitlePinned] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const titleOffsetTop = titleRef.current?.offsetTop ?? 0;
      setTitlePinned(el.scrollTop > titleOffsetTop);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={styles.layout}>

      {/* ── Body row ── */}
      <div className={styles.body}>

      {/* ── Left sidebar ── */}
      <aside className="sidebar-left" style={{ width: 180, minWidth: 180 }}>
        <div className="sidebar-section">
          <Link href="/ask" className="sidebar-ask-btn" style={{
            display: 'flex', alignItems: 'center', gap: 7, width: '100%',
            padding: '8px 12px', background: 'var(--accent)', color: '#fff',
            fontSize: 12, fontWeight: 600, letterSpacing: '0.3px', borderRadius: 6,
            textDecoration: 'none',
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
            aSK
          </Link>
        </div>
        <div className="sidebar-divider" />
        <div className="sidebar-section">
          <div className="sidebar-section-label">Table of Contents</div>
          {tocSections.map(s => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`sidebar-nav-item${activeSection === s.id ? ' active' : ''}`}
              onClick={() => setActiveSection(s.id)}
            >
              {s.label}
            </a>
          ))}
        </div>
      </aside>

      {/* ── Center + action bar wrapper ── */}
      <div className={styles.centerWrapper}>
        {/* Pinned title bar — spans center col + action bar only */}
        <div className={styles.pinnedTitle} style={{ display: titlePinned ? 'flex' : 'none' }}>
          <SentimentTag sentiment={insight.sentiment} />
          <span className={styles.pinnedTitleText}>{insight.title}</span>
        </div>
        <div className={styles.centerRow}>

      {/* ── Center column ── */}
      <div className={styles.centerCol}>
        {/* Scrollable content */}
        <div className={styles.content} ref={scrollRef}>
        <div className={styles.contentInner}>

          {/* Header */}
          <div className={styles.insightMeta}>
            <SentimentTag sentiment={insight.sentiment} />
            <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 500 }}>{insight.ticker}</span>
            <button className={styles.watchlistBtn}>
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
              Watchlist
            </button>
          </div>
          <h1 className={styles.insightTitle} ref={titleRef}>{insight.title}</h1>
          <div className={styles.insightMetaRow}>
            <span className={styles.metaCat}>{insight.category}</span>
            <span className={styles.metaSep}>|</span>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            <span>{insight.views} Views</span>
            <span className={styles.metaSep}>·</span>
            <span>{insight.publishedAt}</span>
          </div>

          {/* Smart Takes */}
          <div className={styles.smartTakes}>
            <div className={styles.smartTakesHeader} onClick={() => setSmartTakesOpen(o => !o)}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              <span className={styles.smartTakesLabel}>Smart Takes</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: smartTakesOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s', color: 'var(--text-muted)' }}>
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </div>
            {smartTakesOpen && (
              <div className={styles.smartTakesBody}>
                {insight.smartTakes.map((take, i) => (
                  <div key={i} className={styles.smartTakeItem}>
                    <div className={styles.smartTakeDot} />
                    <span>{take}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Executive Summary */}
          <div id="executive-summary" className={styles.sectionLabel}>Executive Summary</div>
          <ul className={styles.bodyBullets}>
            {insight.executiveSummary.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          {/* Detail */}
          <div id="detail" className={styles.sectionLabel}>Detail</div>
          <div className={styles.blockquote}>
            {insight.detailBlockquote.split('\n\n').map((para, i) => (
              <p key={i} style={{ margin: i > 0 ? '10px 0 0' : 0 }}>{para}</p>
            ))}
          </div>

          {/* Body paragraphs */}
          <div id="company-backgrounds" />
          {insight.bodyParagraphs.map((block, i) => {
            if (block.type === 'h3') return <h3 key={i} className={styles.bodyH3}>{block.text}</h3>;
            if (block.type === 'p') return <p key={i} className={styles.bodyText}>{block.text}</p>;
            if (block.type === 'bullets') return (
              <ul key={i} className={styles.bodyBullets}>
                {block.items!.map((item, j) => <li key={j}>{item}</li>)}
              </ul>
            );
            return null;
          })}

          {/* Feedback CTA */}
          <div className={styles.feedbackBox}>
            <button className={`${styles.thumbBtn} ${liked ? styles.thumbBtnActive : ''}`} onClick={() => setLiked(l => !l)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/>
              </svg>
            </button>
            <div className={styles.feedbackTitle}>Found this Insight useful?</div>
            <div className={styles.feedbackSub}>Like this Insight to improve the Insight Provider&apos;s payout and<br />view more relevant content in your Reading List.</div>
          </div>

          {/* Disclosure */}
          <div className={styles.disclosureRow}>
            <span style={{ fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase', fontSize: 9.5 }}>Disclosure &amp; Certification</span>
            <button className={styles.disclosureToggle}>SHOW</button>
            <a href="#" className={styles.disclosureReport}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg>
              Report
            </a>
          </div>

          {/* Related Insights + Trending Collections */}
          <div id="related" />
          <div className={styles.twoCol}>
            <div>
              <div className={styles.sectionLabel} style={{ marginTop: 0 }}>Related Insights</div>
              {insight.relatedInsights.map(r => (
                <a key={r.id} href="#" className={styles.relatedInsightRow}>{r.title}</a>
              ))}
            </div>
            <div>
              <div className={styles.sectionLabel} style={{ marginTop: 0 }}>Trending Collections</div>
              <div className={styles.collectionGrid}>
                {insight.trendingCollections.map(c => (
                  <a key={c} href="#" className={styles.collectionLink}>{c}</a>
                ))}
              </div>
            </div>
          </div>

          {/* Trending Insights */}
          <div className={styles.trendingSection}>
            <div className={styles.sectionLabel} style={{ marginTop: 0 }}>Trending Insights</div>
            {insight.trendingInsights.map((t, i) => (
              <div key={t.id} className={styles.trendingRow}>
                <span className={styles.trendingNum}>{i + 1}</span>
                <span className={styles.trendingTitle}>{t.title}</span>
              </div>
            ))}
          </div>

          {/* Discussions */}
          <div id="discussions" />
          <div className={styles.discussionsSection}>
            <div className={styles.sectionLabel} style={{ marginTop: 0 }}>Discussions</div>
            <div className={styles.userRow}>
              <div className={styles.userAvatar}>RK</div>
              <div className={styles.composeArea}>
                <textarea
                  className={styles.composeInput}
                  placeholder="To tag, please use: '@' for an Analyst, '$' for an Entity and '#' for an Insight"
                  value={draft}
                  onChange={e => setDraft(e.target.value)}
                />
                <div className={styles.suggestedQuestions}>
                  {[
                    'Why have these Korean multiomics companies underperformed the KOSPI Index?',
                    'What are the specific advancements in AI that are impacting multiomics?',
                    'How can investors identify potential catalysts in the multiomics sector?',
                  ].map(q => (
                    <button key={q} className={styles.suggestedQ} onClick={() => setDraft(q)}>
                      <span className={styles.suggestedQIcon}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
                      </span>
                      {q}
                    </button>
                  ))}
                </div>
                <div className={styles.composeActions}>
                  <button className={styles.attachBtn}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
                    Attach
                  </button>
                  <button className={styles.postBtn} style={{ opacity: draft.trim() ? 1 : 0.5 }}>Post</button>
                </div>
              </div>
            </div>
          </div>

        </div>
        </div>{/* end scrollable content */}
      </div>{/* end centerCol */}

      {/* ── Floating action bar ── */}
      <div className={styles.actionBar}>
        {[
          { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>, label: 'stats' },
          { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>, label: 'comment' },
          { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>, label: 'share' },
        ].map(({ icon, label }) => (
          <button key={label} className={styles.actionBtn}>{icon}</button>
        ))}
        <button
          className={`${styles.actionBtn} ${bookmarked ? styles.actionBtnActive : ''}`}
          onClick={() => setBookmarked(b => !b)}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill={bookmarked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2"><path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
        </button>
        <button
          className={`${styles.likeBtn} ${liked ? styles.likeBtnActive : ''} ${likePopping ? styles.likeBtnPop : ''}`}
          onClick={() => {
            setLiked(l => !l);
            setLikePopping(true);
            setTimeout(() => setLikePopping(false), 400);
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/></svg>
        </button>
        <button className={styles.actionBtn}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H10z"/></svg>
        </button>
      </div>

        </div>{/* end centerRow */}
      </div>{/* end centerWrapper */}

      {/* ── Discussions widget ── */}
      <DiscussionsWidget bordered />

      {/* ── Right sidebar ── */}
      <aside className={styles.sidebar}>

        {/* Author card */}
        <div className={`${styles.sidePanel} ${styles.authorCard}`}>
          <div className={styles.authorTop}>
            <div
              className={styles.authorAvatar}
              style={{ background: `linear-gradient(135deg, ${insight.author.gradientFrom}, ${insight.author.gradientTo})` }}
            >
              {insight.author.initials}
            </div>
            <div className={styles.authorInfo}>
              <div className={styles.authorName}>{insight.author.name}</div>
              <div className={styles.authorSpec}>{insight.author.spec}<br />{insight.author.firm}</div>
              {insight.author.topBadge && <span className={styles.topBadge}>{insight.author.topBadge}</span>}
            </div>
          </div>
          <div className={styles.authorTags}>
            {insight.author.tags.map(tag => <span key={tag} className={styles.authorTag}>{tag}</span>)}
          </div>
          <div className={styles.authorBio}>{insight.author.bio}</div>
          <div className={styles.authorLinks}>
            <a href="#" className={styles.profileLink}>View Full Profile</a>
          </div>
          <div className={styles.authorActions}>
            <button className={styles.followingBtn}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              Following
            </button>
            <button className={styles.messageBtn}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              Message
            </button>
          </div>
        </div>

        {/* Entity price card */}
        <div className={`${styles.sidePanel} ${styles.entityCard}`}>
          <div className={styles.entityHeader}>
            <span className={styles.entityName}>{insight.entityName}</span>
            <span className={styles.entityScore}>{insight.smartScore}/5</span>
          </div>
          <div className={styles.periodTabs}>
            {['1D', '3M', '1Y', '5Y'].map(p => (
              <button key={p} className={`${styles.periodTab} ${activePeriod === p ? styles.periodTabActive : ''}`} onClick={() => setActivePeriod(p)}>{p}</button>
            ))}
            <span style={{ marginLeft: 'auto', fontSize: 10.5, fontFamily: 'JetBrains Mono,monospace', color: insight.direction === 'down' ? 'var(--bearish)' : 'var(--bullish)', fontWeight: 600 }}>
              {insight.currency} {insight.price} {insight.changePct}
            </span>
          </div>
          {/* Sparkline */}
          <svg className={styles.sparkline} viewBox="0 0 240 50" preserveAspectRatio="none">
            <defs>
              <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--bearish)" stopOpacity="0.3"/>
                <stop offset="100%" stopColor="var(--bearish)" stopOpacity="0"/>
              </linearGradient>
            </defs>
            <path d="M0,10 L20,12 L40,8 L60,15 L80,5 L100,20 L120,18 L140,35 L160,30 L180,38 L200,32 L220,40 L240,38" fill="none" stroke="var(--bearish)" strokeWidth="1.5"/>
            <path d="M0,10 L20,12 L40,8 L60,15 L80,5 L100,20 L120,18 L140,35 L160,30 L180,38 L200,32 L220,40 L240,38 L240,50 L0,50 Z" fill="url(#sparkGrad)"/>
          </svg>
          <div className={styles.entityPrice}>
            <span className={styles.entityPriceNum}>{insight.currency} {insight.price}</span>
            <span className={`${styles.entityChange} ${insight.direction === 'down' ? styles.entityChangeDown : styles.entityChangeUp}`}>{insight.changePct}</span>
          </div>
          {[
            { label: 'ADTV (USDm)', value: '1.35' },
            { label: 'ADV (millions)', value: '0.04' },
            { label: '52-week Range', value: '26650 - 82900' },
            { label: 'Market Cap (USDm)', value: '291' },
            { label: 'P/B', value: '7.88' },
          ].map(s => (
            <div key={s.label} className={styles.statRow}>
              <span className={styles.statLabel}>{s.label}</span>
              <span className={styles.statValue}>{s.value}</span>
            </div>
          ))}
          <a href="#" className={styles.viewAllLink}>View all Data »</a>
        </div>

        {/* SmartScore card */}
        <div className={`${styles.sidePanel} ${styles.smartScoreCard}`}>
          <PanelHeader title="Smartkarma SmartScore" />
          <div className={styles.scoreDisplay}>
            <span className={styles.scoreBig}>{insight.smartScore}</span>
            <span className={styles.scoreMax}>/ 5</span>
          </div>
          <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 10 }}>Relative to stocks in the same: <span style={{ color: 'var(--accent)' }}>Country &amp; Sector ▾</span></div>
          {insight.smartScoreDimensions.map(d => (
            <div key={d.label} className={styles.scoreDimRow}>
              <span className={styles.scoreDimLabel}>{d.label}</span>
              <div className={styles.scoreDimBar}>
                <div className={styles.scoreDimFill} style={{ width: `${(d.score / 5) * 100}%` }} />
              </div>
              <span style={{ fontSize: 10, fontFamily: 'JetBrains Mono,monospace', color: 'var(--text-muted)', width: 12, textAlign: 'right' }}>{d.score}</span>
            </div>
          ))}
          <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 10, marginBottom: 4 }}>Sentiment</div>
          <div className={styles.sentimentTrack}>
            <div className={styles.sentimentMarker} style={{ left: `${insight.sentimentValue * 100}%` }} />
          </div>
          <a href="#" className={styles.viewAllLink}>View SmartScore Screener »</a>
        </div>

        {/* Promo: Premium Subscriptions */}
        <div className={`${styles.sidePanel} ${styles.promoCard}`}>
          <svg className={styles.promoIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          <div className={styles.promoTitle}>{insight.author.name.split(' ')[0]}&apos;s Premium Subscriptions</div>
          <div className={styles.promoDesc}>Get high-touch access to {insight.author.name.split(' ')[0]} and their specialist services.</div>
          <a href="#" className={styles.promoLink}>Learn more about {insight.author.name.split(' ')[0]}&apos;s Premium Subscriptions.</a>
        </div>

        {/* Promo: Data Subscriptions */}
        <div className={`${styles.sidePanel} ${styles.promoCard}`} style={{ position: 'relative' }}>
          <span className={styles.newBadge}>NEW</span>
          <svg className={styles.promoIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="4.93" y1="4.93" x2="9.17" y2="9.17"/><line x1="14.83" y1="14.83" x2="19.07" y2="19.07"/><line x1="14.83" y1="9.17" x2="19.07" y2="4.93"/><line x1="4.93" y1="19.07" x2="9.17" y2="14.83"/></svg>
          <div className={styles.promoTitle}>Data Subscriptions</div>
          <div className={styles.promoDesc}>Access premium, alternative datasets for unique insights into public and private markets</div>
          <button className={styles.promoBtn}>Download Data Catalog</button>
          <a href="#" className={styles.promoLink}>Get in touch for more information</a>
        </div>

        {/* Insight Stream */}
        <div className={styles.sidePanel}>
          <PanelHeader title="Insight Stream" />
          {insight.insightStream.map(item => (
            <div key={item.id} className={styles.streamItem}>
              <div
                className={styles.streamDot}
                style={{ background: item.sentiment === 'bullish' ? 'var(--bullish)' : item.sentiment === 'bearish' ? 'var(--bearish)' : 'var(--amber)' }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className={styles.streamTitle}>{item.title}</div>
                <div className={styles.streamDate}>
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                  {item.date}
                </div>
              </div>
            </div>
          ))}
          <a href="#" className={styles.forkLink}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>
            Fork this Insight
          </a>
        </div>

        {/* Related Entities */}
        <div className={styles.sidePanel}>
          <PanelHeader title="Related Entities" />
          {insight.relatedEntities.map(e => (
            <div key={e.ticker} className={styles.entityRow}>
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', flex: 1 }}>{e.name} <span style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono,monospace' }}>({e.ticker})</span></span>
              <SentimentTag sentiment={e.sentiment} />
            </div>
          ))}
          <div className={styles.entityExpandRow}>
            <a href="#" className={styles.expandLink}>Expand All</a>
            <span style={{ color: 'var(--border)' }}>·</span>
            <a href="#" className={styles.expandLink}>Collapse All</a>
          </div>
        </div>

      </aside>
      </div>{/* end body */}
    </div>
  );
}
