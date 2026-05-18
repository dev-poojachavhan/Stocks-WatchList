import React, { useContext, useEffect, useState } from "react";
import { StockCard } from "../components/StockCard";
import { WatchlistContext } from "../context/WatchlistContext";
import { StockDetails } from "../Components/StockDetails";
import { AnimatePresence } from "framer-motion";
import { CandleChart } from "../components/CandleChart";
import { AnalyticsCard } from "../Components/AnalyticsCard";
import { StockNews } from "../Components/StockNews";
import { MarketHeatmap } from "../Components/MarketHeatmap";






export const Dashboard = () => {
  const { watchlist } = useContext(WatchlistContext);
  
  const [selectedSymbol, setSelectedSymbol] = useState(null);
  const selectedStock =
  watchlist.find(
    (stock) =>
      stock.symbol === selectedSymbol
  );

  const totalValue = watchlist.reduce(
    (acc, stock) => acc + Number(stock.price || 0),
    0,
  );

  const topGainer = [...watchlist].sort(
    (a, b) => b.percent_change - a.percent_change,
  )[0];

  const topLoser = [...watchlist].sort(
    (a, b) => a.percent_change - b.percent_change,
  )[0];

  //default stock
  useEffect(() => {
    if (
    watchlist.length > 0 &&
    !selectedSymbol
  ) {
    setSelectedSymbol(
      watchlist[0].symbol
    );
  }
  },[ watchlist, selectedSymbol]);





  return (
    <div
      className="px-6 py-5 min-h-screen lg:px-7 bg-[#f6f7fb] 
      dark:bg-gradient-to-br dark:from-[#21212f] dark:via-[#131728] dark:to-black"
    >
      <div className="flex items-end justify-between  mb-5 ">
        {/* LEFT */}
        <div>
          <h2 className="text-4xl font-bold tracking-tight  text-white">
            My Watchlist
          </h2>

          <p className="text-gray-400 text-sm mt-3">
            Track your market movers & portfolio performance
          </p>
        </div>
      </div>
      {/* LEFT SIDEBAR */}
      <div className="grid grid-cols-[300px_minmax(0,1fr)_320px]   gap-x-5 gap-y-4   p-3">
        <aside
          className="   sticky top-10 h-[calc(100vh-50px)] p-1
        grid
    grid-rows-[1fr_350px]
    gap-5"
        >
          <div
            className="space-y-3 overflow-y-auto pr-3 pt-1 pl-1 pb-2 
                      scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
          >
            <AnimatePresence>
              {watchlist.map((stock) => (
  <StockCard
    key={stock.symbol}
    stock={stock}
    onClick={() =>
      setSelectedSymbol(stock.symbol)
    }
    isActive={
      selectedSymbol === stock.symbol
    }
  />
))}
                             
                           
                          
                        
                    
                  
             
            </AnimatePresence>
          </div>

          {/* ANALYTICS */}
          <div
            className="rounded-2xl border   p-4 bg-white border-gray-200 shadow-sm dark:bg-white/[0.05]
                   dark:border-white/10 dark:shadow-black/30 backdrop-blur-md h-fit
                   transition-all duration-300 hover:border-white/20"
          >
            {/* HEADING */}
            <div className="mb-4">
              <h2 className="text-xl tracking-tight  font-semibold">
                Portfolio Analytics
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                Quick market overview
              </p>
            </div>

            {/* GRID */}
            <div className="grid grid-rows-2 gap-3">
              <AnalyticsCard
                label="Portfolio"
                value={`$${totalValue.toFixed(2)}`}
              />

              <AnalyticsCard label="Assets" value={watchlist.length} />

              <AnalyticsCard
                label="Top Gainer"
                value={topGainer?.symbol || "--"}
                subValue={`+${topGainer?.percent_change?.toFixed(2) || 0}%`}
                positive
              />

              <AnalyticsCard
                label="Top Loser"
                value={topLoser?.symbol || "--"}
                subValue={`${topLoser?.percent_change?.toFixed(2) || 0}%`}
                negative
              />
            </div>
             
          </div>
        </aside>
        
        {/* CENTER CHART */}
        <main className=" flex flex-col  gap-8 min-w-0 ">
          {/* CHART */}

          <div className="h-[430px] ">
            {selectedStock && <CandleChart stock={selectedStock} />}
          </div>

          {/* NEWS */}

          <div
            className="mt-12 
    pt-10
    border-t border-white/20  
    min-h-0
    flex flex-col gap-5"
          >
            {/* HEADER */}

            <div className="flex items-center justify-between mb-5 px-5">
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-white mt-2">
                  Market News
                </h2>

                <p className="text-sm text-gray-400 mt-1">
                  Trending market stories & stock coverage
                </p>
              </div>
            </div>
            <div
              className="
    overflow-y-auto
    pr-2
    min-h-0
   "
            >
              {/* NEWS CARDS */}
              {selectedStock && <StockNews symbol={selectedStock.symbol} />}
            </div>
          </div>

            <MarketHeatmap
  watchlist={watchlist}
  selectedSymbol={selectedSymbol}
  setSelectedSymbol={setSelectedSymbol}
/>
        </main>

        {/* RIGHT PANEL */}
        <section
          className="rounded-2xl border p-5 self-start  max-h-[calc(100vh-20px)] 
                   bg-white border-gray-400 shadow-sm 

                   dark:bg-white/[0.05]
                   dark:border-white/30
                    dark:shadow-black/30
                    
                     sticky top-6"
        >
          <h2 className="text-xl font-semibold tracking-tight p-2  text-white mb-5">
            Stock Details
          </h2>

          <div
            className="rounded-2xl
  border
  border-white/10
 
  backdrop-blur-md
  shadow-sm
  p-5"
          >
            {selectedStock ? (
              <StockDetails stock={selectedStock} />
            ) : (
              <p className="text-gray-500">Select a stock</p>
            )}
          </div>
          
        </section>

      
        
      </div>
     
    </div>
    
  );
};
