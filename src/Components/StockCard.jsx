import { useContext, useEffect, useRef, useState } from "react";
import { WatchlistContext } from "../context/WatchlistContext";
import { SparklineChart } from "../Components/SparklineChart";
import { motion } from "framer-motion";
import { FiStar } from "react-icons/fi";
import { Shimmer } from "./LoadingShimmer/Shimmer";

export const StockCard = ({ stock, onClick, isActive }) => {
  const { removeStock, togglePin, loadingMap } = useContext(WatchlistContext);
  const isPositive = stock.percent_change >= 0;

  const price = Number(stock.price);
  const percent = Number(stock.percent_change);

  const previousPrice = useRef(stock.price);

  const [flash, setFlash] = useState("");

  const sparklineData = stock.sparkline || [];

  useEffect(() => {
    if (previousPrice.current < stock.price) {
      setFlash("green");
    } else if (previousPrice.current > stock.price) {
      setFlash("red");
    }

    previousPrice.current = stock.price;

    const timer = setTimeout(() => {
      setFlash("");
    }, 700);

    return () => clearTimeout(timer);
  }, [stock.price]);

  return (
    <motion.div
      layout
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
        boxShadow:
          flash === "green"
            ? "0 0 30px rgba(16,185,129,0.22)"
            : flash === "red"
              ? "0 0 30px rgba(239,68,68,0.20)"
              : isActive
                ? "0 0 40px rgba(16,185,129,0.16)"
                : "0 0 25px rgba(16,185,129,0.04)",
      }}
      exit={{
        opacity: 0,
        scale: 0.08,
      }}
      whileHover={{
         y: -4,
        scale: 1.01,
      }}
      whileTap={{
        scale: 0.98,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        boxShadow: {
        duration: 0.35,
        },

       scale: {
       duration: 0.2,
        },
        

       
      }}
      onClick={onClick}
      className={`

relative
group


h-[110px]
cursor-pointer

rounded-2xl
border



backdrop-blur-xl

bg-[var(--watchlist-card-bg)]



border-emerald-400/10

shadow-[var(--card-shadow)]

hover:border-emerald-400/20
hover:shadow-[0_0_35px_rgba(16,185,129,0.08)]

p-3

${
  isActive
    ? `
      border-emerald-400/30

bg-[var(--watchlist-card-active)]
      shadow-[0_0_40px_rgba(16,185,129,0.14)]
    `
    : ""
}
`}
    >
     
            <button
              onClick={(e) => {
                e.stopPropagation();

                togglePin(stock.symbol);
              }}
              className="
                    absolute
                    top-3
                    right-7
                    z-20
                      "
                   >
              <FiStar
                className={`
                transition

                ${stock.pinned ? "fill-yellow-400 text-yellow-400" : "text-[var(--text-muted)]"}
              `}
             /></button>

          {/* ❌ Remove Button */}
           <button
          onClick={(e) => {
          e.stopPropagation(); // 🔥 IMPORTANT
          removeStock(stock.symbol);
            }}
            className="
                absolute
                top-2
                right-2
                z-10
                
                text-red-400/80
                
                opacity-0
                group-hover:opacity-100
                
                
                
                hover:scale-110
                "
              >
              ✕
               </button>

            <div className="flex items-center justify-between gap-4">
        {/* LEFT SIDE */}
        <div>
          <h2 className="text-sm font-semibold text-[var(--text-strong)]">
            {stock.symbol}
          </h2>

          <p className="text-lg font-medium text-[var(--text)]">
            {stock.currency === "USD" ? "$" : "₹"}
            {price.toFixed(2)}
          </p>

          <p className={isPositive ? "text-green-400" : "text-red-400"}>
            {percent.toFixed(2)}%
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-[160px]">
          <SparklineChart data={sparklineData} isPositive={isPositive} />
        </div>
             </div>
    </motion.div>
  );
};
