import { motion } from "framer-motion";
import { Shimmer } from "./LoadingShimmer/Shimmer";
import { useContext } from "react";
import { WatchlistContext } from "../context/WatchlistContext";

export const MarketHeatmap = ({
  watchlist,
  selectedSymbol,
  setSelectedSymbol,
}) => {
  const { loadingMap } = useContext(WatchlistContext);

  if (loadingMap.heatmap) {
    return (
      <div
        className="
      grid
      grid-cols-2
      xl:grid-cols-3
      gap-4
    "
      >
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Shimmer key={i} className="h-[140px]" />
        ))}
      </div>
    );
  }

  return (
    <div
      className="  
    lg:max-h-[420px]
    lg:overflow-y-auto
    pr-2
    overflow-visible
    overflow-y-auto
    "
    >
      <div
        className="
      grid
      grid-cols-2
      xl:grid-cols-3
      gap-3
     sm:gap-4
      auto-rows-fr
      p-2  
  "
      >
        {watchlist.map((stock) => (
          <motion.div
            key={stock.symbol}
            whileHover={{ scale: 1.015 }}
            onClick={() => setSelectedSymbol(stock.symbol)}
            className={`
       rounded-2xl
       p-3 
       cursor-pointer
      flex
      flex-col
      justify-between
      backdrop-blur-xl
      h-[95px]
      sm:h-[115px]

        ${
          stock.percent_change >= 0
            ? `
              bg-green-500/20
              border border-green-500/30
            `
            : `
              bg-red-500/20
              border border-red-500/30
            `
        }

        ${
          selectedSymbol === stock.symbol
            ? `border-cyan-400
           shadow-[0_0_0_1px_rgba(34,211,238,0.9),0_0_18px_rgba(34,211,238,0.18)]`
            : ""
        }
      `}
          >
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-[var(--text-strong)]">
                {stock.symbol}
              </h3>

              <p className="text-[var(--text-strong)] text-sm mt-1">
                ${Number(stock.price).toFixed(2)}
              </p>
            </div>

            <p
              className={`
          text-xl 
          font-bold

          ${stock.percent_change >= 0 ? "text-green-400" : "text-red-400"}
        `}
            >
              {stock.percent_change?.toFixed(2)}%
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
