import { Sentiment } from '@/lib/types';

export default function SentimentTag({ sentiment }: { sentiment: Sentiment }) {
  return (
    <span className={`sentiment-tag ${sentiment}`}>
      <span className="sentiment-dot" />
      {sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}
    </span>
  );
}
