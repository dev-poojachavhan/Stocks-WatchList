const API_KEY = import.meta.env.VITE_TWELVE_API_KEY;

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
      throw new Error(data.message);
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
    return null;
  }
};
