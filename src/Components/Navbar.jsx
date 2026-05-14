import React, { useState, useEffect, useContext } from "react";
import { fetchStock } from "../services/api";
import { WatchlistContext } from "../context/WatchlistContext";
import { ThemeToggle } from "../components/ThemeToggle";

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
    <header
      className="sticky top-0 z-50 backdrop-blur 
bg-white/80 border-b border-gray-200
dark:bg-[#0d0f1a]/80 dark:border-white/10"
    >
      <div className="flex items-center justify-between px-6 gap-4  py-4">
        <h1  className="font-semibold text-gray-800 dark:text-white tracking-wide">
          StockWatch
        </h1>

        <input
          type="text"
          placeholder="Search (AAPL)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-4 py-2 rounded-full w-[250px]
bg-gray-100 text-gray-800 placeholder-gray-400
focus:outline-none focus:ring-2 focus:ring-gray-300

dark:bg-white/10 dark:text-white dark:placeholder-gray-500" 
        />

        <ThemeToggle />
      </div>

      {/* 🔄 Loading */}
      {loading && (
        <p className="px-4 text-sm text-gray-500 dark:text-gray-400">
          Loading...
        </p>
      )}

      {/* 📊 Search Result */}
      {searchedStock && (
        <div className="px-4 pb-3">
          <div
            className="p-3 rounded-xl mt-2 border shadow-sm
bg-white border-gray-200 text-gray-800
dark:bg-white/5 dark:border-white/10 dark:text-white backdrop-blur-md"
          >
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
                addStock(searchedStock);

                setQuery("");
                setSearchedStock(null);
              }}
              className="mt-2 px-3 py-1 rounded-md bg-blue-500 text-white 
hover:bg-blue-600 transition shadow-sm"
            >
              Add to Watchlist
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
