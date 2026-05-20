import { motion } from "framer-motion";

export const MarketHeatmap = ({
  watchlist,
  selectedSymbol,
  setSelectedSymbol,
}) => {
  return (
    <div className="mt-8 rounded-3xl  border border-white/10 bg-white/[0.03]  p-6">
      <h2 className="text-2xl font-bold text-white mb-4">
        Market Heatmap
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[120px]">
        {watchlist.map((stock, index) => {
          const percent = Number(stock.percent_change);

            const isPositive = percent >= 0;
            const intensity = Math.min(Math.abs(percent) * 12,70);

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
                hover:shadow-[0_0_30px_rgba(34,211,238,0.12)]

               ${
                isPositive
                    ? `border-green-400/30`
                    : `border-red-400/30`
                }

                ${
                  selectedSymbol === stock.symbol
                    ? "ring-2 ring-cyan-400"
                    : ""
                }

                ${
                 Math.abs(percent) > 2
                ? "md:col-span-2 md:row-span-2"
                : ""
                }
              `}
                
                style={{
                 backgroundColor: isPositive
                    ? `rgba(34,197,94,${intensity / 100})`
                    : `rgba(239,68,68,${intensity / 100
                    })`,
                }}
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