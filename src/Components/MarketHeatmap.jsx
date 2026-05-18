import { motion } from "framer-motion";

export const MarketHeatmap = ({
  watchlist,
  selectedSymbol,
  setSelectedSymbol,
}) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-white mb-4">
        Market Heatmap
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[120px]">
        {watchlist.map((stock, index) => {
          const percent = Number(stock.percent_change);

          const isPositive = percent >= 0;

          return (
            <motion.div
              key={stock.symbol}
              whileHover={{
                scale: 1.03,
              }}
              whileTap={{
                scale: 0.98,
              }}
              onClick={() =>
                setSelectedSymbol(stock.symbol)
              }
              className={`
                rounded-2xl
                p-4
                cursor-pointer
                border
                transition-all
                duration-300
                flex
                flex-col
                justify-between

                ${
                  isPositive
                    ? "bg-green-500/20 border-green-400/30"
                    : "bg-red-500/20 border-red-400/30"
                }

                ${
                  selectedSymbol === stock.symbol
                    ? "ring-2 ring-cyan-400"
                    : ""
                }

                ${
                  index % 5 === 0
                    ? "md:col-span-2 md:row-span-2"
                    : ""
                }
              `}
            >
              <div>
                <h3 className="text-white font-bold text-lg">
                  {stock.symbol}
                </h3>

                <p className="text-white/70 text-sm">
                  ${Number(stock.price).toFixed(2)}
                </p>
              </div>

              <div
                className={`text-2xl font-bold ${
                  isPositive
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {percent.toFixed(2)}%
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};