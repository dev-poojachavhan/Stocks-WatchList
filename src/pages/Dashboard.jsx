import React, { useContext, useEffect, useState } from "react";
import { StockCard } from "../components/StockCard";
import { WatchlistContext } from "../context/WatchlistContext";
import { StockDetails } from "../Components/StockDetails";

import { CandleChart } from "../components/CandleChart";

export const Dashboard = () => {
  const { watchlist } = useContext(WatchlistContext);
  const [selectedStock, setSelectedStock] = useState(null);

  //default stock
  useEffect(() => {
    if (watchlist.length > 0 && !selectedStock) {
      setSelectedStock(watchlist[0]);
    }
  }, [watchlist,selectedStock]);

  useEffect(() => {
    if (!selectedStock) return;

    const exists = watchlist.find(
  (s) => s.symbol === selectedStock?.symbol
);

    if (!exists) {
      setSelectedStock(null);
    }
  }, [watchlist, selectedStock]);

  return (
    <div
      className="p-7 min-h-screen 
bg-[#f6f7fb] 
dark:bg-gradient-to-br dark:from-[#21212f] dark:via-[#131728] dark:to-black"
    >
      <h1 className="text-2xl font-bold  p-2">My Watchlist</h1>

      <div className="grid grid-cols-[300px_1fr_320px] gap-4 mt-5">
        {/* LEFT SIDEBAR */}
        <aside className="space-y-3"> 
          {watchlist.map((stock) => (
            <StockCard  
              key={stock.symbol}
              stock={stock}
              onClick={() => setSelectedStock(stock)}
              isActive={selectedStock?.symbol === stock.symbol}
            />
          ))}
        </aside>

        {/* CENTER CHART */}
        <main>{selectedStock && <CandleChart stock={selectedStock} />}</main>

        {/* RIGHT PANEL */}
        <section
          className="
    rounded-xl border p-4
    bg-white border-gray-200 shadow-sm

    dark:bg-white/[0.04]
    dark:border-white/10
    "
        >
          <h2 className="text-lg font-semibold mb-4">Stock Details</h2>

          {selectedStock ? (
           <StockDetails stock={selectedStock} />
          ) : (
            <p className="text-gray-500">Select a stock</p>
          )}
        </section>
      </div>
    </div>
  );
};
