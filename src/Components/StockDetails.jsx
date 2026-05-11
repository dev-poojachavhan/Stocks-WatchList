export const StockDetails = ({ stock }) => {
  if (!stock) {
    return (
      <p className="text-gray-500">
        Select a stock
      </p>
    );
  }

  const isPositive = stock.percent_change >= 0;

  return (
    <div className="space-y-5">

      {/* HEADER */}
      <div>
        <h2 className="text-xl font-bold text-white">
          {stock.symbol}
        </h2>

        <p className="text-3xl font-bold text-white mt-1">
          {stock.currency === "USD" ? "$" : "₹"}
          {Number(stock.price).toFixed(2)}
        </p>

        <p
          className={`mt-1 font-medium ${
            isPositive
              ? "text-green-400"
              : "text-red-400"
          }`}
        >
          {Number(stock.percent_change).toFixed(2)}%
        </p>
      </div>

      {/* METRICS GRID */}
      <div className="grid grid-cols-2 gap-3">

       
    <MetricCard
    label="Open"
    value={stock.open?.toFixed(2)}
  />

  <MetricCard
    label="High"
          value={stock.high?.toFixed(2)}
          valueClassName="text-green-400"
           cardClassName="
    border-green-500/20
    bg-green-500/[0.03]
  "
  />

  <MetricCard
    label="Low"
          value={stock.low?.toFixed(2)}
          valueClassName="text-red-400"
           cardClassName="
    border-red-500/20
    bg-red-500/[0.03]
  "
  />

  <MetricCard
    label="Prev Close"
    value={stock.previous_close?.toFixed(2)}
  />

  <MetricCard
    label="Volume"
          value={stock.volume}
          valueClassName="text-cyan-400"
          cardClassName="
    border-cyan-500/20
    bg-cyan-500/[0.03]
  "

  />

  <MetricCard
    label="Market Cap"
          value={stock.market_cap || "--"}
          valueClassName="text-blue-400"
            cardClassName="
    border-blue-500/20
    bg-blue-500/[0.03]
  "
  />
        

        <MetricCard
          label="Symbol"
          value={stock.symbol}
        />

        <MetricCard
          label="Price"
          value={Number(stock.price).toFixed(2)}
        />

        <MetricCard
          label="Change"
          value={`${Number(stock.percent_change).toFixed(2)}%`}
          valueClassName={
            stock.percent_change >= 0
              ? "text-green-400"
              : "text-red-400"}
          
          cardClassName={
    stock.percent_change >= 0
      ? `
        border-green-500/20
        bg-green-500/[0.03]
      `
      : `
        border-red-500/20
        bg-red-500/[0.03]
      `
  }
        />

      </div>
    </div>
  );
};

const MetricCard = ({ label, value,  valueClassName = "text-white",  cardClassName = "",}) => {
  return (
    <div
      className={`
      rounded-lg
      border
      border-white/5  
      bg-white/[0.02]
      p-3
       transition-all duration-300

  hover:bg-white/[0.05]
  hover:-translate-y-[1px]
         ${cardClassName}
      `}
    >
      <p className="text-xs text-gray-400 mb-1">
        {label}
      </p>

      <p className={`text-sm font-semibold ${valueClassName}`}>
        {value || "--"}
      </p>
    </div>
  );
};