import { FiActivity } from "react-icons/fi";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const StockDetails = ({ stock }) => {
  if (!stock) {
    return <p className="text-[var(--text-muted)]">Select a stock</p>;
  }

  const isPositive = stock.percent_change >= 0;
  const [flash, setFlash] = useState(null);
  const prevPriceRef = useRef(stock.price);

  useEffect(() => {
    if (stock.price > prevPriceRef.current) {
      setFlash("green");
    } else if (stock.price < prevPriceRef.current) {
      setFlash("red");
    }

    prevPriceRef.current = stock.price;

    const timeout = setTimeout(() => {
      setFlash(null);
    }, 500);

    return () => clearTimeout(timeout);
  }, [stock.price]);

  return (
    <motion.div
      key={stock.symbol}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-3 h-fit"
    >
      {/* HEADER */}
      <div>
        <h2 className="text-lg font-semibold text-[var(--text-strong)] tracking-tight">{stock.symbol}</h2>

        <motion.p
          key={stock.price}
          initial={{
            opacity: 0.6,
            y: 8,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.25,
          }}
          className={`
    text-3xl font-bold text-[var(--text)] mt-1
    transition-all duration-500

    ${flash === "green" ? "drop-shadow-[0_0_18px_rgba(16,185,129,0.30)]" : ""}

    ${flash === "red" ? "drop-shadow-[0_0_18px_rgba(239,68,68,0.28)]" : ""}
  `}
        >
          {stock.currency === "USD" ? "$" : "₹"}

          {stock.price.toFixed(2) || "--"}
        </motion.p>

        <div className="flex items-center gap-2">
          <motion.p
            key={stock.percent_change}
            initial={{
              opacity: 0.5,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.2,
            }}
            className={`mt-1 font-medium ${
              isPositive ? "text-green-400" : "text-red-400"
            }`}
          >
            {stock.percent_change.toFixed(2) || "--"}%
          </motion.p>

          <div
            className={`
    mt-3  inline-flex items-center gap-2
    rounded-full px-3 py-1 text-xs font-medium
    border

    ${  
      stock.is_market_open
        ? `
        border-emerald-400/30
        bg-emerald-500/[0.10]
        text-emerald-400
        `
        : `
        border-red-400/20
        bg-red-500/[0.20]
        text-red-400
        `
    }
  `}
          >
            <FiActivity size={14} />

            {stock.is_market_open ? "Market Open" : "Market Closed"}
          </div>
        </div>
      </div>

      {/* METRICS GRID */}
      <div className="grid grid-cols-2 gap-3  ">
        <MetricCard label="Open" value={stock.open?.toFixed(2)} />

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
          valueClassName="text-emerald-300"
          cardClassName="
    border-emerald-400/20
bg-emerald-400/[0.04]
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

        <MetricCard label="Symbol" value={stock.symbol} />

        <MetricCard label="Price" value={Number(stock.price).toFixed(2)} />

        <MetricCard
          label="Change"
          value={`${Number(stock.percent_change).toFixed(2)}%`}
          valueClassName={
            stock.percent_change >= 0 ? "text-green-400" : "text-red-400"
          }
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

      {/*//overview section*/}
      <div className="pt-5 border-t border-[var(--surface-border)]">
        <h3 className="text-sm font-semibold text-[var(--text-soft)] mb-3">Overview</h3>

        <div className="space-y-3">
          <OverviewRow label="Exchange" value={stock.exchange || "--"} />

          <OverviewRow label="Currency" value={stock.currency || "--"} />

          <OverviewRow label="Symbol" value={stock.symbol || "--"} />
        </div>
      </div>
    </motion.div>
  );
};

const MetricCard = ({
  label,
  value,
  valueClassName = "text-white",
  cardClassName = "",
}) => {
  return (
    <div
      className={`
       rounded-xl
  border

  border-[var(--surface-border)]

  
bg-[var(--surface-glass)]

  backdrop-blur-xl

  p-3.5

  transition-all
  duration-300

 
  hover:bg-white/[0.02]

hover:border-white/10
  hover:-translate-y-[1px]

  shadow-[var(--surface-shadow)]

         ${cardClassName}
      `}
    >
      <p className="text-xs text-[var(--text-soft)] mb-1">{label}</p>

      <p className={`text-sm font-semibold ${valueClassName}`}>
        {value || "--"}
      </p>
    </div>
  );
};

const OverviewRow = ({ label, value }) => {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-[var(--text-soft)]">{label}</p>

      <p className="text-sm font-medium text-[var(--text)]">{value}</p>
    </div>
  );
};
