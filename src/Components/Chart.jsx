import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export const Chart = ({ symbol }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!symbol) return;

    const fetchChart = async () => {
      setLoading(true);

      try {
        const res = await fetch(
          `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1day&outputsize=30&apikey=${import.meta.env.VITE_API_KEY}`
        );

        const json = await res.json();
        

        if (json.values) {
          const formatted = json.values
            .reverse()
            .map((item) => ({
              date: item.datetime.split(" ")[0],
              price: parseFloat(item.close),
            }));

          setData((prev) => {
    if (JSON.stringify(prev) !== JSON.stringify(formatted)) {
      return formatted;
    }
    return prev;
  });
        }
      } catch (err) {
        console.error("Chart error:", err);
      }

      setLoading(false);
    };

      fetchChart();
      const interval = setInterval(fetchChart, 10000); // every 10 sec
       return () => clearInterval(interval); // cleanup
  }, [symbol]);
    

    const isUp =
  data.length > 1
    ? data[data.length - 1].price > data[0].price
    : true;

const lineColor = isUp ? "#22c55e" : "#ef4444";

  return (
    <div className="mt-6 bg-zinc-900 p-4 rounded-lg">
      <h2 className="mb-4 text-lg font-semibold">{symbol} Chart</h2>

      {loading ? (
        <p className="text-zinc-400">Loading chart...</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="date" hide />
            <YAxis domain={["auto", "auto"]} />
            <Tooltip />
            <Line
               type="monotone"
               dataKey="price"
               stroke={lineColor}        // ✅ dynamic color
               strokeWidth={2}
               dot={false}
               isAnimationActive={true}  // ✅ animation
               animationDuration={500}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};