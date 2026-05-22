import { useContext } from "react";
import { Shimmer } from "./LoadingShimmer/Shimmer";

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
        mt-5
        rounded-3xl
        border border-cyan-400/10
        bg-white/[0.03]
        p-5
        backdrop-blur-sm
      "
    >
      {/* HEADER */}
      <div className="mb-5">

        <h2 className="text-lg font-semibold text-white">
          Crypto Market
        </h2>

        <p className="text-sm text-gray-400 mt-1">
          Live crypto overview
        </p>

      </div>

      {/* LIST */}
      <div className="space-y-4">

        {cryptoData.map((coin) => {

          const positive =
            coin.percent_change >= 0;

          return (

            <div
              key={coin.symbol}

              className="
                flex
                items-center
                justify-between

                rounded-2xl
                bg-white/[0.04]
                p-3
              "
            >
              <div>

                <h3 className="font-medium text-white">
                  {coin.symbol}
                </h3>

                <p className="text-xs text-gray-400 mt-1">
                  Crypto Asset
                </p>

              </div>

              <div className="text-right">

                <p className="text-white font-semibold">
                  $
                  {Number(
                    coin.price
                  ).toFixed(2)}
                </p>

                <p
                  className={`text-sm mt-1 ${
                    positive
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {Number(
                    coin.percent_change
                  ).toFixed(2)}%
                </p>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};