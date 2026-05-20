import React, { useEffect, useRef, useState } from "react";
import { createChart, CandlestickSeries } from "lightweight-charts";
import { useQuery } from "@tanstack/react-query";
import {FiMaximize2,FiMinimize2,FiRotateCcw,FiMoon,FiSun} from "react-icons/fi";







export const CandleChart = ({ stock }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const seriesRef = useRef(null);
  const [timeframe, setTimeframe] = useState("DAILY");
  const [hoverData, setHoverData] = useState(null);
  const [chartTheme, setChartTheme] = useState("dark");
  const containerRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false); //changing icon state

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

// fullscreen chart
  const handleFullscreen = async () => {
  if (!document.fullscreenElement) {
    await containerRef.current?.requestFullscreen();
    setIsFullscreen(true);
  } else {
    await document.exitFullscreen();
    setIsFullscreen(false);
  }
};

  //screenshoot
 

  const handleResetZoom = () => {
  chartInstance.current?.timeScale().fitContent();
  };
  
  const toggleTheme = () => {
  setChartTheme((prev) =>
    prev === "dark" ? "light" : "dark"
  );
};
  //Create chart ONLY once
  useEffect(() => {
    if (!chartRef.current) return;

    chartInstance.current = createChart(chartRef.current, {
      width: chartRef.current.clientWidth,
      height: 380,
      layout: {
        background: {
  color:
    chartTheme === "dark"
      ? "#09090b"
      : "#ffffff",
},

textColor:
  chartTheme === "dark"
    ? "#d1d5db"
    : "#111827",
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

    chartInstance.current.subscribeCrosshairMove(
  (param) => {
    if (
      !param.time ||
      !param.seriesData.size
    ) {
      setHoverData(null);
      return;
    }

    const candle =
      param.seriesData.get(
        seriesRef.current
      );

    if (!candle) return;

    setHoverData({
      open: candle.open,
      high: candle.high,
      low: candle.low,
      close: candle.close,
      time: param.time,
    });
  }
);

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

  useEffect(() => {
  if (!chartInstance.current) return;

  chartInstance.current.applyOptions({
    layout: {
      background: {
        color:
          chartTheme === "dark"
            ? "#09090b"
            : "#ffffff",
      },

      textColor:
        chartTheme === "dark"
          ? "#d1d5db"
          : "#111827",
    },
  });
}, [chartTheme]);

  return (
    <div
      ref={containerRef}
      className=" p-4 rounded-xl border min-h-[430px] border-gray-200 shadow-sm  
                 dark:bg-gradient-to-br dark:from-white/[0.03] dark:to-white/[0.02] 
                 dark:border-white/10 backdrop-blur-md"
      >
      <h2 className="mb-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
        {stock.symbol}
      </h2>

      <p className="text-3xl font-bold text-white">
          {stock.currency === "USD" ? "$" : "₹"}
           {Number(stock?.price || 0).toFixed(2)}
     </p>

<p
  className={
     Number(stock?.percent_change || 0) >= 0
      ? "text-green-400"
      : "text-red-400"
  }
>
 {Number(
    stock?.percent_change || 0
  ).toFixed(2)}
  %
</p>  

      {/* 🔥 Timeframe buttons */}
     <div className="flex items-center justify-between mb-5">

  {/* LEFT */}
  <div className="flex gap-2">
    {["DAILY", "WEEKLY", "MONTHLY"].map((item) => (
      <button
        key={item}
        onClick={() => setTimeframe(item)}
        className={`
          px-3 py-1 rounded-lg text-sm transition

          ${
            timeframe === item
              ? "bg-blue-500 text-white"
              : "bg-zinc-700 text-gray-300"
          }
        `}
      >
        {item === "DAILY"
          ? "1D"
          : item === "WEEKLY"
          ? "1W"
          : "1M"}
      </button>
    ))}
  </div>

  {/* RIGHT */}
  <div className="flex items-center gap-2">

    <button
      onClick={handleResetZoom}
      className="p-2 rounded-lg
      bg-zinc-700 hover:bg-zinc-600
      transition"
    >
      <FiRotateCcw size={16} />
    </button>

    <button
      onClick={handleFullscreen}
      className=" p-2 rounded-lg
      bg-zinc-700 hover:bg-zinc-600
      transition"
    >
    {
  document.fullscreenElement ? (
    <FiMinimize2 size={16} />
  ) : (
    <FiMaximize2 size={16} />
  )
}
    </button>

  

    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg
      bg-zinc-700 hover:bg-zinc-600
      transition
    "
    >
    {chartTheme === "dark" ? (
    <FiSun size={16} />
  ) : (
    <FiMoon size={16} />
  )}
    </button>

  </div>
</div>

      {/* Loading */}
     {isLoading && (
  <div
    className="
      h-[380px]
      rounded-xl
      bg-white/[0.08]
      animate-pulse
    "
  />
)}

      {/* 🔥 Error */}
      {error && <p className="text-red-400 mb-2">{error.message}</p>}

     <div className="relative">

  {/* LIVE HOVER PANEL */}
  {hoverData && (
    <div
      className="
      absolute top-2 left-2 z-10
      rounded-lg
      border border-white/10
      bg-black/70
      backdrop-blur-md
      px-3 py-2
      text-xs
      space-y-1
      "
    >
      <p className="text-gray-400">
        O:
        <span className="text-white ml-1">
         {Number( hoverData?.open || 0).toFixed(2)}
        </span>
      </p>

      <p className="text-gray-400">
        H:
        <span className="text-green-400 ml-1">
          {Number(hoverData?.high || 0).toFixed(2)}
        </span>
      </p>

      <p className="text-gray-400">
        L:
        <span className="text-red-400 ml-1">
          {Number(hoverData?.low || 0).toFixed(2)}
        </span>
      </p>

      <p className="text-gray-400">
        C:
        <span className="text-cyan-400 ml-1">
          {Number(hoverData?.close || 0).toFixed(2)}
        </span>
      </p>
    </div>
  )}

        {!isLoading && (
  <div ref={chartRef} />
)}
</div>
  </div>
  );
};
