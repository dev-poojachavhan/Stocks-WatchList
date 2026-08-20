import { useRef } from "react";
import { motion } from "framer-motion";
import { SUPPORTED_MARKETS } from "../../data/supportedMarkets";

export const SupportedMarkets = ({ onSelectSymbol }) => {
  const sliderRef = useRef(null);

  const market = SUPPORTED_MARKETS[0];

  const slide = (direction) => {
    if (!sliderRef.current) return;

    sliderRef.current.scrollBy({
      left: direction === "next" ? 240 : -240,
      behavior: "smooth",
    });
  };



  const stockVariants = {
  hidden: {
    opacity: 0,
    y: 10,
    scale: 0.96,
  },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.35,
      delay: index * 0.06,
      ease: "easeOut",
    },
  }),
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
        mt-8
        w-full
        max-w-[550px]
        rounded-2xl
        border border-white/[0.08]
        bg-[#0a1020]/80
        p-3
        shadow-[0_0_30px_rgba(16,185,129,0.05)]
        backdrop-blur-lg
        shadow-green-400/30

        sm:mt-9
        sm:p-4

        lg:mt-10
      "
    >
      {/* HEADER */}
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h3
            className="
              text-xs
              font-semibold
              text-emerald-400
              sm:text-sm
            "
          >
            Popular US Stocks
          </h3>

          <p
            className="
              mt-0.5
              text-[10px]
              text-slate-400
              sm:text-[11px]
            "
          >
            Explore popular stocks
          </p>
        </div>

        {/* ARROWS */}
        <div className="flex shrink-0 gap-1.5">
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
              border border-white/[0.10]
              bg-white/[0.035]
              text-xs
              text-slate-400
              transition-all

              hover:border-emerald-400/40
              hover:bg-emerald-400/20
              hover:text-emerald-400

              active:scale-90

              sm:h-8
              sm:w-8
              sm:text-sm
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
              border border-white/[0.08]
              bg-white/[0.035]
              text-xs
              text-slate-400
              transition-all

             
              hover:border-emerald-400/40
              hover:bg-emerald-400/20
              hover:text-emerald-400
              active:scale-90

              sm:h-8
              sm:w-8
              sm:text-sm
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
            snap-x
            snap-mandatory

            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
          "
        >
          {market.symbols.map((stock,index) => (
            <motion.button
               custom={index}
  variants={stockVariants}
  initial="hidden"
  animate="visible"
              key={stock.symbol}
              onClick={() => onSelectSymbol(stock.symbol)}
              className="
                min-w-[108px]
                snap-start
                rounded-xl
                border
                border-white/[0.08]
                bg-[#0d1627]
                px-2.5
                py-2.5
                text-left
                transition-all
                duration-200

                

                hover:-translate-y-0.5
                hover:border-emerald-400/30
                hover:bg-emerald-400/[0.10]
                hover:shadow-[0_0_15px_rgba(16,185,129,0.08)]

                active:scale-[0.96]

                sm:min-w-[120px]
                sm:px-3
              "
            >
              <p
                className="
                  text-xs
                  font-bold
                  tracking-wide
                  text-white
                  sm:text-sm
                "
              >
                {stock.symbol}
              </p>

              <p
                className="
                  mt-1
                  truncate
                  text-[9px]
                  text-slate-500
                  sm:text-[10px]
                "
              >
                {stock.name}
              </p>
            </motion.button>
          ))}
        </div>

        {/* RIGHT FADE */}
        <div
          className="
            pointer-events-none
            absolute
            right-0
            top-0
            h-full
            w-6
            bg-gradient-to-l
            from-[#0a1020]
            to-transparent

            sm:w-10
          "
        />
      </div>

      {/* FOOTER */}
      <div className="mt-2 flex items-center justify-between">
        <span
          className="
            text-[9px]
            text-slate-600
            sm:text-[10px]
          "
        >
          <span className="sm:hidden">Swipe →</span>
          <span className="hidden sm:inline">
            Swipe to explore more →
          </span>
        </span>

        <span
          className="
            text-[9px]
            text-slate-600
            sm:text-[10px]
          "
        >
          {market.symbols.length} stocks
        </span>
      </div>
    </motion.div>
  );
};