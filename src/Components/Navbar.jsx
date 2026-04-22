import React, { useState, useEffect, useContext } from "react";
import { fetchStock } from "../services/api";
import { WatchlistContext } from "../context/WatchlistContext";

export const Navbar = () => {
  const [query, setQuery] = useState("");
  const [searchedStock, setSearchedStock] = useState(null);
  const [loading, setLoading] = useState(false);

  const { addStock } = useContext(WatchlistContext);

  // 🔍 Debounced search
useEffect(() => {
  if (!query) {
    setSearchedStock(null);
    return;
  }

  let isActive = true; // 👈 important

  const delay = setTimeout(async () => {
    setLoading(true);

    const data = await fetchStock(query.toUpperCase());

    if (!isActive) return; // 🚨 ignore old responses

    if (data && !data.status) {
      console.log(data);
      
      setSearchedStock(data);
    } else {
      setSearchedStock(null);
    }

    setLoading(false);
  }, 600);

  return () => {
    clearTimeout(delay);
    isActive = false; // 🚨 cancel previous request
  };
}, [query]);

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-zinc-900/70 border-b border-white/10">
      <div className="flex items-center justify-between px-4 py-3">
        <h1 className="font-semibold">StockWatch</h1>

        <input
          type="text"
          placeholder="Search (AAPL)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-zinc-800 px-3 py-2 rounded-lg"
        />
      </div>

      {/* 🔄 Loading */}
      {loading && (
        <p className="px-4 text-sm text-zinc-400">Loading...</p>
      )}

      {/* 📊 Search Result */}
      {searchedStock && (
        <div className="px-4 pb-3">
          <div className="bg-zinc-800 p-3 rounded-lg mt-2 text-white">
            <p className="font-medium">{searchedStock.symbol}</p>
            <p>₹ {searchedStock.price || searchedStock.close}</p>

            <p
              className={
                searchedStock.percent_change > 0
                  ? "text-green-400"
                  : "text-red-400"
              }
            >
              {searchedStock.percent_change}%
            </p>

            <button
  onClick={() => {
    addStock({
    symbol: searchedStock.symbol,
    price: parseFloat(searchedStock.close),
    percent_change: parseFloat(searchedStock.percent_change),
    currency: searchedStock.currency, // ✅ ADD HERE
  });

    setQuery("");
    setSearchedStock(null);
  }}
  className="mt-2 px-3 py-1 bg-blue-500 rounded"
>
  Add to Watchlist
</button>
          </div>
        </div>
      )}
    </header>
  );
};