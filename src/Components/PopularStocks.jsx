import { useContext } from "react";
import { WatchlistContext } from "../context/WatchlistContext";
import { Shimmer } from "./LoadingShimmer/Shimmer";

import { motion } from "framer-motion";

export const PopularStocks = () => {

  const {
    popularStocks = [], loadingMap, } = useContext(WatchlistContext);
  
  if (loadingMap.popular) {
  return (
    <div className="flex gap-3 overflow-hidden">
      {[1,2,3,4,5,6].map((i) => (
        <Shimmer
          key={i}
          className="w-[80px] h-[80px]"
        />
      ))}
    </div>
  );
}

  return (
    <div
    className="
  rounded-2xl   h-[90px]
  
  px-3
  py-2

"
    >
    {/* STOCK ROW */}
      <div className="overflow-hidden">

  <motion.div
    className="flex gap-3 w-max"
    
    animate={{
      x: ["0%", "-60%"],
    }}

    transition={{
      repeat: Infinity,
      duration: 22,
      ease: "linear",
    }}
  >
    {[...popularStocks, ...popularStocks].map(
      (stock, index) => {

    const positive =
  stock.percent_change >= 0;

        return (

          <motion.div
            key={`${stock.symbol}-${index}`}

            whileHover={{
              y: -2,
              scale: 1.015,
            }}

            className="
              min-w-[100px]
              rounded-xl
              border border border-[var(--surface-border)]


              bg-[var(--surface-glass)]
              shadow-[var(--card-shadow)]
              hover:border-emerald-400/15

              px-2
              py-2
              shrink-0
              cursor-pointer
            "
          >
            <div className="flex items-center justify-between">

              <h3 className="text-sm font-semibold text-[var(--text)]">
                {stock.symbol}
              </h3>

              <span
                className={
                  positive
                    ? "text-green-400 text-xs"
                    : "text-red-400 text-xs"
                }
              >
                {positive ? "▲" : "▼"}
              </span>

            </div>

            <p className="text-sm font-bold text-white mt-1">
               ${stock.price?.toFixed(2) || "--"}
            </p>

            <p
              className={`text-xs mt-0.5 ${
                positive
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {stock.percent_change?.toFixed(2) || "--"}%
            </p>

          </motion.div>
        );
      }
    )}
  </motion.div>
</div>
    </div>
  );
};