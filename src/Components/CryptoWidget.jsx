import { useContext } from "react";
import { Shimmer } from "./LoadingShimmer/Shimmer";
import { motion } from "framer-motion"
import { WatchlistContext }
from "../context/WatchlistContext";

export const CryptoWidget = () => {



  const {
    cryptoData = [],
    loadingMap
  } = useContext(WatchlistContext);
  
  if (loadingMap.crypto) {
  return (
    <div className="space-y-4">
      {[1,2,3,4].map((i) => (
        <Shimmer
          key={i}
          className="h-[90px]"
        />
      ))}
    </div>
  );
}

  return (
    <div
      className="
        relative
mt-5
rounded-3xl
border

border-[var(--surface-border)]

bg-[var(--surface-panel)]

p-5

backdrop-blur-xl

shadow-[var(--surface-shadow)]
      "
    >
      {/* HEADER */}
      <div className="mb-5">

        <h2 className="text-lg font-semibold text-[var(--text)]">
          Crypto Market
        </h2>

        <p className="text-sm text-[var(--text-muted)] mt-1">
          Live crypto overview
        </p>

      </div>

      {/* LIST */}
      <div className="space-y-4">

        {cryptoData.map((coin,index) => {

        const positive =
  coin.percent_change >= 0;

          return (

            <motion.div
               initial={{
    opacity: 0,
    y: 15,
  }}

  animate={{
    opacity: 1,
    y: 0,
  }}

  transition={{
     type: "spring",
  stiffness: 320,
  damping: 24,

  delay: index * 0.06,
  }}

  whileHover={{
    y: -2,
    scale: 1.01,
  }}
              key={coin.symbol}

              className="
                group
    relative

    flex
    items-center
    justify-between

    overflow-hidden
shadow-[var(--card-shadow)]
    rounded-2xl
   border border-[var(--surface-border)]

bg-[var(--surface-glass)]
    p-3

  hover:border-emerald-400/20
hover:shadow-[0_0_20px_rgba(16,185,129,0.06)]

              "
            >
               <div
    className="
      absolute
    inset-0

    opacity-0
    group-hover:opacity-100

    transition-opacity
    duration-300

    pointer-events-none

    bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.10),transparent_60%)]
    "
  />

  
              <div>

                <h4 className="font-medium text-[var(--text)]">
                  {coin.symbol}
                </h4>

                <p className="text-xs text-[var(--text-soft)] mt-1">
                  Crypto Asset
                </p>

              </div>

              <div className="text-right">

                <p className="text-white font-semibold">
                 ${coin.price?.toFixed(2) || "--"}
                </p>

                <p
                  className={`text-sm mt-1 ${
                    positive
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {coin.percent_change?.toFixed(2) || "--"}%
                </p>

              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};