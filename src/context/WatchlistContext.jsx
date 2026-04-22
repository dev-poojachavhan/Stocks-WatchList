import { createContext, useState, useEffect } from "react";

export const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {

  const [watchlist, setWatchlist] = useState(() => {
    try{
      const saved = localStorage.getItem("watchlist");
      return saved ? JSON.parse(saved) : [];
    }
  catch {
    return [];
  }
  });

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  const addStock = (stock) => {
    setWatchlist((prev) => {
      const exists = prev.find((s) => s.symbol === stock.symbol);
      if (exists) return prev;
      return [...prev, stock];
    });
  };

  const removeStock = (symbol) => {
    setWatchlist((prev) =>
      prev.filter((s) => s.symbol !== symbol)
    );
  };

  return (
    <WatchlistContext.Provider value={{ watchlist, addStock, removeStock }}>
      {children}
    </WatchlistContext.Provider>
  );
};