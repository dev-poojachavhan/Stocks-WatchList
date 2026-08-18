import { useRef } from "react";
import { motion } from "framer-motion";
import { SUPPORTED_MARKETS } from "../../data/supportedMarkets";

export const SupportedMarkets = ({ onSelectSymbol }) => {
  const sliderRef = useRef(null);

  const market = SUPPORTED_MARKETS[0];

  const slide = (direction) => {
    if (!sliderRef.current) return;

    sliderRef.current.scrollBy({
      left: direction === "next" ? 260 : -260,
      behavior: "smooth",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: 0.25,
      }}
      className="
        mt-10
        max-w-[550px]
        rounded-2xl
        border border-white/10
        bg-white/[0.045]
        p-4
        backdrop-blur-sm
        shadow-green-400/40
        shadow-[0_0_25px_rgba(16,185,129,0.06)]
      "
    >
      {/* HEADER */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* <span className="text-lg">{market.icon}</span> */}

          <div>
            <h3 className="text-sm font-semibold text-green-400">
              Popular US Stocks
            </h3>

            <p className="text-[11px] text-gray-400">
               Explore popular stocks 
            </p>
          </div>
        </div>

        {/* ARROWS */}
        <div className="flex gap-1.5">
          <button
            onClick={() => slide("prev")}
            aria-label="Previous stocks"
            className="
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-lg
              border
              border-white/10
              bg-white/[0.04]
              text-gray-400
              transition
              hover:border-emerald-400/30
              hover:bg-emerald-400/10
              hover:text-emerald-400
            "
          >
            ←
          </button>

          <button
            onClick={() => slide("next")}
            aria-label="Next stocks"
            className="
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-lg
              border
              border-white/10
              bg-white/[0.04]
              text-gray-400
              transition
              hover:border-emerald-400/30
              hover:bg-emerald-400/10
              hover:text-emerald-400
            "
          >
            →
          </button>
        </div>
      </div>

          {/* STOCK SLIDER */}
          <div className="relative">
      <div
        ref={sliderRef}
        className="
          flex
          gap-2
          overflow-x-auto
          scroll-smooth
          pb-1
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
        "
      >
        {market.symbols.map((stock) => (
          <button
            key={stock.symbol}
            onClick={() => onSelectSymbol(stock.symbol)}
            className="
              min-w-[120px]
              snap-start
              rounded-xl
              border
              border-white/10
              bg-[#0b1220]
              px-3
              py-2.5
              text-left
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:border-emerald-400/40
              hover:bg-emerald-400/[0.07]
              hover:shadow-[0_0_15px_rgba(16,185,129,0.08)]
              active:scale-95
            "
          >
            <p className="text-sm font-bold text-white">
              {stock.symbol}
            </p>

            <p className="mt-0.5 truncate text-[10px] text-gray-500">
              {stock.name}
            </p>
          </button>
        ))}
          </div>
            <div
    className="
      pointer-events-none
      absolute
      right-0
      top-0
      h-full
      w-12
      bg-gradient-to-l
      from-[#121b2f]
      to-transparent
    "
  />
</div>

      {/* SLIDER HINT */}
      <div className="mt-2 flex items-center justify-between">
        <span className="text-[10px] text-gray-600">
         Swipe to explore more →
        </span>

        <span className="text-[10px] text-gray-600">
          {market.symbols.length} stocks
        </span>
      </div>
    </motion.div>
  );
};