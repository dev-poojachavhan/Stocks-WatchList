  import React, { useContext, useEffect, useState } from "react";
  import { StockCard } from "../components/StockCard";
  import { WatchlistContext } from "../context/WatchlistContext";
 
  import { CandleChart } from "../components/CandleChart";

  export const Dashboard = () => {
    const { watchlist } = useContext(WatchlistContext);
    const [selectedStock, setSelectedStock] = useState(null);


  //default stock 
  useEffect(() => {
    if (watchlist.length > 0 && !selectedStock) {
      setSelectedStock(watchlist[0].symbol);
    }
  }, [watchlist]);
    

    useEffect(() => {
    if (!selectedStock) return;

    const exists = watchlist.find(
      (s) => s.symbol === selectedStock
    );

    if (!exists) {
      setSelectedStock(null);
    }
  }, [watchlist, selectedStock]);

    return (
      <div className="p-6 min-h-screen 
bg-[#f6f7fb] 
dark:bg-gradient-to-br dark:from-[#0a0a0f] dark:via-[#0d0f1a] dark:to-black">
        <h1 className="text-2xl font-bold mb-4">My Watchlist</h1>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {watchlist.map((stock) => (
            <StockCard
              key={stock.symbol}
              stock={stock}
              onClick={() => setSelectedStock(stock.symbol)}
              isActive={selectedStock === stock.symbol}
            />
          ))}
        </div>

        {/* ✅ Chart goes HERE */}
    
        {selectedStock && (
    <div className="transition-opacity duration-300">
      
  <CandleChart symbol={selectedStock} />
    </div>
  )}
      </div>
    );
  };