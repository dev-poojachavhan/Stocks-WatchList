export const fetchStock = async (symbol) => {
  try {
    const res = await fetch(
      `https://api.twelvedata.com/quote?symbol=${symbol}&apikey=${import.meta.env.VITE_API_KEY}`
    );

    const data = await res.json();

    if (data.status === "error") {
      throw new Error(data.message);
    }

    return data;

  } catch (err) {
    console.error(err);
    return null;
  }
};