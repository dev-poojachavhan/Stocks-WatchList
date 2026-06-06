
import { AnalyticsCard } from "./AnalyticsCard";

export const AnalyticsSection = ({
  totalValue,
  watchlistLength,
  topGainer,
  topLoser,
}) => {
  return (
    <>
      <div className="mb-4">
        <h2 className="text-xl tracking-tight font-semibold text-[var(--text)]">
          Portfolio Analytics
        </h2>

        <p className="text-xs text-[var(--text-muted)] mt-1">
          Quick market overview
        </p>
      </div>

      <div className="grid gap-3">
        <AnalyticsCard
          label="Portfolio"
          value={`$${totalValue.toFixed(2)}`}
        />

        <AnalyticsCard
          label="Assets"
          value={watchlistLength}
        />

        <AnalyticsCard
          label="Top Gainer"
          value={topGainer?.symbol || "--"}
          subValue={`+${topGainer?.percent_change?.toFixed(2) || 0}%`}
          positive
        />

        <AnalyticsCard
          label="Top Loser"
          value={topLoser?.symbol || "--"}
          subValue={`${topLoser?.percent_change?.toFixed(2) || 0}%`}
          negative
        />
      </div>
    </>
  );
};