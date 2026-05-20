import { createContext, useState, useEffect, useRef } from "react";
import { fetchCryptoData, fetchPopularStocks, fetchStock,  } from "../services/api";

export const WatchlistContext = createContext();


export const WatchlistProvider = ({ children }) => {
const POPULAR_SYMBOLS = [
  "AAPL",
  "MSFT",
  "NVDA",
  "TSLA",
  "META",
  "NFLX",
  "GOOGL",
];

const CRYPTO_SYMBOLS = [
  "BTC/USD",
  "ETH/USD",
  "SOL/USD",
  "BNB/USD",
  ];
  const MARKET_SYMBOLS = [
  ...POPULAR_SYMBOLS,

  ...CRYPTO_SYMBOLS,
];

  const sortWatchlist = (list) => {
  return [...list].sort((a, b) => {

    // pinned first
    if (a.pinned && !b.pinned)
      return -1;

    if (!a.pinned && b.pinned)
      return 1;

    // then rising stocks
    return (
      b.percent_change -
      a.percent_change
    );
  });
};

const [popularStocks, setPopularStocks] =
  useState([]);

const [cryptoData, setCryptoData] =
  useState([]);


  const [watchlist, setWatchlist] = useState(() => {
    try {
      const saved = localStorage.getItem("watchlist");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  //Create a ref to track latest watchlist
  const watchlistRef = useRef(watchlist);

  useEffect(() => {
    watchlistRef.current = watchlist;
  }, [watchlist]);


const fetchExtraMarketData =
  async () => {

    try {

      // POPULAR STOCKS
      const popular =
        await fetchPopularStocks(
          POPULAR_SYMBOLS
        );

      // CRYPTO
      const crypto =
        await fetchCryptoData(
          CRYPTO_SYMBOLS
        );

      // SAVE TO STATE
      setPopularStocks(
        Object.values(popular)
      );

      setCryptoData(
        Object.values(crypto)
      );

    } catch (err) {

      console.error(
        "Extra market data error:",
        err
      );
    }
};

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
            const data = await fetchStock(stock.symbol);

            if (!data) return stock;

            const previousSparkline = stock.sparkline || [];

            const updatedSparkline = [
              ...previousSparkline,
              {
                price: Number(data.price) 
                
              },
            ].slice(-10);

            return {
              ...stock,
              ...data,

              sparkline: updatedSparkline,
            };
          }),
        );

        // ✅ prevent unnecessary re-renders
        setWatchlist((prev) => {
          const changed = prev.some((stock, index) => {
            return (
              stock.price !== updated[index].price ||
              stock.percent_change !== updated[index].percent_change ||
              stock.volume !== updated[index].volume ||
              stock.sparkline?.length !== updated[index].sparkline?.length
            );
          });

         return changed
  ? sortWatchlist(updated)
  : prev;
        });
      } catch (err) {
        console.error("Price update error:", err);
      }
    };
  
    fetchExtraMarketData();
    updatePrices(); // initial call

   // const interval = setInterval(updatePrices, 6000000); // 1 minute

    // return () => clearInterval(interval);
  }, []); // ✅ run only once

  const addStock = (stock) => {
    setWatchlist((prev) => {
      const exists = prev.find((s) => s.symbol === stock.symbol);

      if (exists) return prev;

      const basePrice = Number(stock.price);

const initialSparkline = Array.from(
  { length: 10 },
  (_, i) => ({
    price:
      basePrice +
      Math.sin(i / 2) * 0.8 +
      (Math.random() - 0.5) * 0.4,
  })
);

return sortWatchlist([
  ...prev,
  {
    ...stock,
    pinned: false,
    sparkline: initialSparkline,
  },
])
    });
  };

  const removeStock = (symbol) => {
    setWatchlist((prev) => prev.filter((s) => s.symbol !== symbol));
  };  

 const togglePin = (symbol) => {
  setWatchlist((prev) => {

    const updated = prev.map((stock) =>
      stock.symbol === symbol
        ? {
            ...stock,
            pinned: !stock.pinned,
          }
        : stock
    );

    return sortWatchlist(updated);
  });
};
  


  return (
    <WatchlistContext.Provider  value={{
    watchlist,
    addStock,
    removeStock,
      togglePin,
     popularStocks,
  cryptoData,
   
  }}>
      {children}
    </WatchlistContext.Provider>
  );
};
