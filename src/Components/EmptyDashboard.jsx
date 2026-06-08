export const EmptyDashboard = () => {
  return (
    <div
      className="
      col-span-full

      rounded-3xl
      border border-dashed border-white/10

      bg-gradient-to-br
      from-emerald-400/[0.08]
      to-transparent

      p-12

      text-center
    "
    >
      <div className="text-6xl mb-4">
        📈
      </div>

      <h3 className="text-2xl font-semibold text-[var(--text)]">
        Build Your Watchlist
      </h3>

      <p className="mt-3 text-[var(--text-soft)]">
        Search stocks from the navbar above
        to begin tracking markets.
      </p>
    </div>
  );
};