const API_KEY = import.meta.env.VITE_MARKETAUX_API_KEY;

export const fetchStockNews = async (symbol) => {
  try {
    const res = await fetch(
      `https://api.marketaux.com/v1/news/all?symbols=${symbol}&filter_entities=true&language=en&limit=3&api_token=${API_KEY}`,
    );

    const data = await res.json();

    return data.data || [];
  } catch (err) {
    // console.error("News fetch error:", err);

    return [];
  }
};
