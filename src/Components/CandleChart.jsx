import React, { useEffect, useRef, useState } from "react";
import { createChart, CandlestickSeries } from "lightweight-charts";
import { useQuery } from "@tanstack/react-query";

export const CandleChart = ({ stock  }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const seriesRef = useRef(null);
  const [timeframe, setTimeframe] = useState("DAILY");

  const symbol = stock?.symbol;
  //  Fetch function (TanStack handles caching)
  const fetchCandles = async ({ queryKey }) => {
    const [, symbol, timeframe] = queryKey;

    const intervalMap = {
      DAILY: "1day",
      WEEKLY: "1week",
      MONTHLY: "1month",
    };

    const res = await fetch(
      `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${intervalMap[timeframe]}&apikey=${import.meta.env.VITE_TWELVE_API_KEY}`,
    );

    const data = await res.json();

    console.log("TWELVE RESPONSE:", data);

    if (data.status === "error") {
      throw new Error(data.message || "Failed to fetch data");
    }

    if (!data.values) {
      throw new Error("No candle data available");
    }

    return data.values
      .map((item) => ({
        time: new Date(item.datetime).getTime() / 1000,
        open: parseFloat(item.open),
        high: parseFloat(item.high),
        low: parseFloat(item.low),
        close: parseFloat(item.close),
      }))
      .reverse();
  };

  // 🔥 TanStack Query
  const { data, isLoading, error } = useQuery({
    queryKey: ["candles", symbol, timeframe],
    queryFn: fetchCandles,
    enabled: !!symbol,
    staleTime: 1000 * 60 * 5, // 5 min cache

    placeholderData: (prev) => prev,

    retry: 3,
    retryDelay: 60000, // 1 minute
  });

  //Create chart ONLY once
  useEffect(() => {
    if (!chartRef.current) return;

    chartInstance.current = createChart(chartRef.current, {
      width: chartRef.current.clientWidth,
      height: 400,
      layout: {
        background: { color: "#09090b" },
        textColor: "#d1d5db",
      },
      grid: {
        vertLines: { color: "#27272a" },
        horzLines: { color: "#27272a" },
      },
      crosshair: { mode: 1 },
      rightPriceScale: {
        borderColor: "#444",
      },
      timeScale: {
        borderColor: "#444",
        timeVisible: true,
        secondsVisible: false,
      },
    });

    seriesRef.current = chartInstance.current.addSeries(CandlestickSeries);

    const handleResize = () => {
      chartInstance.current.applyOptions({
        width: chartRef.current.clientWidth,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chartInstance.current.remove();
    };
  }, []);

  useEffect(() => {
    if (data && seriesRef.current) {
      seriesRef.current.setData(data);
      chartInstance.current.timeScale().fitContent();
    }
  }, [data]);

  // useEffect(() => {
  //   if (!chartRef.current) return;

  //   const chart = createChart(chartRef.current, {
  //     width: chartRef.current.clientWidth,
  //     height: 300,
  //     layout: {
  //       background: { color: "#09090b" },
  //       textColor: "#d1d5db",
  //     },
  //     grid: {
  //       vertLines: { color: "#27272a" },
  //       horzLines: { color: "#27272a" },
  //     },
  //     crosshair: { mode: 1 },
  //     rightPriceScale: {
  //       borderColor: "#444",
  //     },
  //     timeScale: {
  //       borderColor: "#444",
  //       timeVisible: true,
  //        secondsVisible: false,
  //     },
  //     watermark: { visible: false },
  //   });

  //   const candleSeries = chart.addSeries(CandlestickSeries);

  //   // ✅ Apply data when available
  //   if (data) {
  //     candleSeries.setData(data);
  //     chart.timeScale().fitContent();
  //   }

  //   // ✅ Resize handling
  //   const handleResize = () => {
  //     chart.applyOptions({
  //       width: chartRef.current.clientWidth,
  //     });
  //   };

  //   window.addEventListener("resize", handleResize);

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //     chart.remove();
  //   };
  // }, [data]);

  return (
    <div
      className=" p-4 rounded-xl border 

 border-gray-200 shadow-sm  

dark:bg-gradient-to-br dark:from-white/[0.03] dark:to-white/[0.02] 
dark:border-white/10

backdrop-blur-md"
    >
      <h2 className="mb-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
        {stock.symbol}
      </h2>

      <p className="text-3xl font-bold text-white">
  {stock.currency === "USD" ? "$" : "₹"}
  {stock.price.toFixed(2)}
</p>

<p
  className={
    stock.percent_change >= 0
      ? "text-green-400"
      : "text-red-400"
  }
>
  {stock.percent_change.toFixed(2)}%
</p>  

      {/* 🔥 Timeframe buttons */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setTimeframe("DAILY")}
          disabled={timeframe === "DAILY"}
          className={`px-3 py-1 rounded transition 
          ${timeframe === "DAILY" ? "bg-blue-500" : "bg-zinc-700"}`}
        >
          1D
        </button>

        <button
          onClick={() => timeframe !== "WEEKLY" && setTimeframe("WEEKLY")}
          className={`px-3 py-1 rounded ${
            timeframe === "WEEKLY" ? "bg-blue-500" : "bg-zinc-700"
          }`}
        >
          1W
        </button>

        <button
          onClick={() => timeframe !== "MONTHLY" && setTimeframe("MONTHLY")}
          className={`px-3 py-1 rounded ${
            timeframe === "MONTHLY" ? "bg-blue-500" : "bg-zinc-700"
          }`}
        >
          1M
        </button>
      </div>

      {/* Loading */}
      {isLoading && <p className="text-gray-400 mb-2">Loading chart...</p>}

      {/* 🔥 Error */}
      {error && <p className="text-red-400 mb-2">{error.message}</p>}

      <div  ref={chartRef} />
    </div>
  );
};
