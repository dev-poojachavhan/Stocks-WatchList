const API_KEY = import.meta.env.VITE_TWELVE_API_KEY;
const POPULAR_API_KEY = import.meta.env.VITE_TWELVE_POPULARSTOCKS_API_KEY;
const CRYPTO_API_KEY = import.meta.env.VITE_TWELVE_CRYPTOSTOCKS_API_KEY;

// ================================
// FETCH SINGLE STOCK QUOTE
// ================================
export const fetchStock = async (symbol) => {
  try {
    const res = await fetch(
      `https://api.twelvedata.com/quote?symbol=${symbol}&apikey=${API_KEY}`,
    );

    const data = await res.json();

    if (data.status === "error") {
      if (data.code === 429) {
        throw new Error("API_LIMIT");
      }

      if (data.code === 404) {
        throw new Error("INVALID_SYMBOL");
      }

      throw new Error("API_ERROR");
    }

    return {
      symbol: data.symbol,

      // Core
      price: parseFloat(data.close),
      percent_change: parseFloat(data.percent_change),

      // Metrics
      open: parseFloat(data.open),
      high: parseFloat(data.high),
      low: parseFloat(data.low),

      previous_close: parseFloat(data.previous_close),

      volume: data.volume,

      market_cap: data.market_cap,

      is_market_open: data.is_market_open,

      exchange: data.exchange,

      currency: data.currency,
      sparkline: [], //Every stock now always has sparkline field
    };
  } catch (err) {
    console.error("fetchStock error:", err);

    return {
      error: true,
      message: err.message,
    };
  }
};

//POPULAR STOCKS
export const fetchPopularStocks = async (symbols) => {
  const symbolString = encodeURIComponent(symbols.join(","));

  const res = await fetch(
    `https://api.twelvedata.com/quote?symbol=${symbolString}&apikey=${POPULAR_API_KEY}`,
  );

  return await res.json();
};

//CRYPTO DATA
export const fetchCryptoData = async (symbols) => {
  const symbolString = encodeURIComponent(symbols.join(","));

  const res = await fetch(
    `https://api.twelvedata.com/quote?symbol=${symbolString}&apikey=${CRYPTO_API_KEY}`,
  );

  return await res.json();
};
