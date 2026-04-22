import React, { useContext, useState } from "react";
import { StockCard } from "../components/StockCard";
import { WatchlistContext } from "../context/WatchlistContext";
import { Chart } from "../components/Chart";

export const Dashboard = () => {
  const { watchlist } = useContext(WatchlistContext);
  const [selectedStock, setSelectedStock] = useState(null);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Watchlist</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {watchlist.map((stock) => (
          <StockCard
            key={stock.symbol}
            stock={stock}
            onClick={() => setSelectedStock(stock.symbol)}
          />
        ))}
      </div>

      {/* ✅ Chart goes HERE */}
   
      {selectedStock && (
        <Chart symbol={selectedStock} />
      )}
    </div>
  );
};