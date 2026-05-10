import { createContext, useState, useEffect,useRef  } from "react";

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

  //Create a ref to track latest watchlist
  const watchlistRef = useRef(watchlist);

    useEffect(() => {
  watchlistRef.current = watchlist;
}, [watchlist]);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
  const updatePrices = async () => {
    const currentList = watchlistRef.current;

    if (currentList.length === 0) return;

    try {
      const updated = await Promise.all(
        currentList.map(async (stock) => {
          const res = await fetch(
            `https://api.twelvedata.com/quote?symbol=${stock.symbol}&apikey=${import.meta.env.VITE_TWELVE_API_KEY}`
          );

          const data = await res.json();

          if (!data || data.status === "error") return stock;

          return {
            ...stock,
            price: parseFloat(data.close),
            percent_change: parseFloat(data.percent_change),
          };
        })
      );

      // ✅ prevent unnecessary re-renders
      setWatchlist((prev) => {
        let changed = false;

for (let i = 0; i < prev.length; i++) {
  if (
    prev[i].price !== updated[i].price ||
    prev[i].percent_change !== updated[i].percent_change
  ) {
    changed = true;
    break;
  }
}

return changed ? updated : prev;
      });

    } catch (err) {
      console.error("Price update error:", err);
    }
  };

  updatePrices(); // initial call

  const interval = setInterval(updatePrices, 60000); // every 15s

  return () => clearInterval(interval);
}, []); // ✅ run only once



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