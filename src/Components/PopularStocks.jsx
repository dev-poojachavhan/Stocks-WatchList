import { useContext } from "react";
import { WatchlistContext } from "../context/WatchlistContext";

import { motion } from "framer-motion";

export const PopularStocks = () => {

  const {
  popularStocks = [],
} = useContext(WatchlistContext);

  return (
    <div
    className="
  rounded-2xl
  
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
      duration: 18,
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
              scale: 1.03,
            }}

            className="
              min-w-[10 0px]
              rounded-xl
              border border-white/10
              bg-white/[0.04]
              px-2
              py-1.5
              shrink-0
              cursor-pointer
            "
          >
            <div className="flex items-center justify-between">

              <h3 className="text-sm font-semibold text-white">
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
              $
              {Number(stock.price).toFixed(2)}
            </p>

            <p
              className={`text-xs mt-0.5 ${
                positive
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {Number(
                stock.percent_change
              ).toFixed(2)}%
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