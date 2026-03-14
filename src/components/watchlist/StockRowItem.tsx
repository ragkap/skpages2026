import { StockRow } from '@/lib/types';

export default function StockRowItem({ stock }: { stock: StockRow }) {
  return (
    <div className="stock-row">
      <div className="stock-info">
        <div className="stock-name">{stock.name}</div>
        <div className="stock-ticker">{stock.ticker}</div>
      </div>
      <div className="stock-nums">
        <span className="stock-price">{stock.price}</span>
        <span className={`stock-change ${stock.direction}`}>{stock.change}</span>
      </div>
    </div>
  );
}
