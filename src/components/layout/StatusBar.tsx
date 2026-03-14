export default function StatusBar() {
  return (
    <div className="statusbar">
      <div className="status-item">
        <div className="status-dot" />
        <span>Live</span>
      </div>
      <span className="status-sep">|</span>
      <span>APAC Markets Open</span>
      <span className="status-sep">|</span>
      <span>13 Mar 2026 · 09:22 SGT</span>
      <span className="status-sep">|</span>
      <span>1,247 analysts online</span>
      <div className="status-right">
        <span>HSI <span className="status-price-down">23,104 ▼ 0.8%</span></span>
        <span>KOSPI <span className="status-price-up">2,611 ▲ 0.4%</span></span>
        <span>STI <span className="status-price-up">3,892 ▲ 0.3%</span></span>
        <span>NIFTY <span className="status-price-down">22,847 ▼ 0.2%</span></span>
        <span>BTC <span className="status-price-down">81,234 ▼ 2.1%</span></span>
      </div>
    </div>
  );
}
