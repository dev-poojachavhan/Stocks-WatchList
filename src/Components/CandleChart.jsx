import React, { useContext, useEffect, useRef, useState } from "react";
import { createChart, CandlestickSeries } from "lightweight-charts";
import { useQuery } from "@tanstack/react-query";
import {FiMaximize2,FiMinimize2,FiRotateCcw,FiMoon,FiSun} from "react-icons/fi";
import { Shimmer } from "./LoadingShimmer/Shimmer";
import { WatchlistContext } from "../context/WatchlistContext";
import { motion } from "framer-motion";






export const CandleChart = ({ stock, chartTheme}) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const seriesRef = useRef(null);
  const [timeframe, setTimeframe] = useState("DAILY");
  const [hoverData, setHoverData] = useState(null);
  const containerRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false); //changing icon state
  const {loadingMap} = useContext(WatchlistContext)

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

 
 

  const handleResetZoom = () => {
  chartInstance.current?.timeScale().fitContent();
  };
  

  //Create chart ONLY once
  useEffect(() => {
    
    if (!chartRef.current) return;
   

 
     // create chart
    chartInstance.current = createChart(
      chartRef.current,
      {
      width: chartRef.current.clientWidth,
      height:   chartRef.current.clientHeight,
    layout: {
  background: {
    color:
      chartTheme === "dark"
        ? "#07101a"
        : "#ffffff",
  },

  textColor:
    chartTheme === "dark"
      ? "#d1d5db"
      : "#111827",
},
      grid: {
        vertLines: { color: "rgba(255,255,255,0.06)"  },
        horzLines: { color: "rgba(255,255,255,0.06)"  },
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

 setTimeout(() => {

  if (!chartRef.current) return;

  chartInstance.current.applyOptions({
    width:chartRef.current.clientWidth,
    height:chartRef.current.clientHeight,
  });

  chartInstance.current.timeScale().fitContent();

}, 0);

    seriesRef.current = chartInstance.current.addSeries(CandlestickSeries);

    if (data) {
  seriesRef.current.setData(data);
  chartInstance.current.timeScale().fitContent();
}

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
         height:
      chartRef.current.clientHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chartInstance.current.remove();
    };
  }, [chartTheme]);

  useEffect(() => {
    if (data && seriesRef.current) {
      seriesRef.current.setData(data);
      chartInstance.current.timeScale().fitContent();
    }
  }, [data]);


  


  return (
    <div
      ref={containerRef}
      className="relative    
                h-[420px] sm:h-[500px] lg:h-[540px]
                 overflow-hidden
                 rounded-[26px]
                 border
                 p-5
                 border-emerald-400/15
                 bg-[var(--chart-bg)]
                 backdrop-blur-xl 
                 shadow-[0_0_60px_rgba(16,185,129,0.05)]"
    >
      <div
  className="
    absolute
    inset-0
    pointer-events-none
     
    bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.08),transparent_28%)]
  "
/>
      <h2 className="mb-4 text-sm font-semibold  text-[var(--text-soft)]">
        {stock.symbol}
      </h2>

      <p className="text-2xl sm:text-3xl font-bold text-[var(--text)]">
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
     <div className="flex items-center justify-between sm:flex-row sm:items-center
    sm:justify-between mb-5">

  {/* LEFT */}
  <div className="flex gap-2">
    {["DAILY", "WEEKLY", "MONTHLY"].map((item) => (
      <button
        key={item}
        onClick={() => setTimeframe(item)}
        className={`
          px-3 py-1.5
          rounded-xl
          text-sm
          transition-all
          duration-300

          ${
            timeframe === item
              ? `bg-emerald-400/14
                   border border-emerald-400/20
                   text-emerald-200
                   shadow-[0_0_20px_rgba(16,185,129,0.10)]`
              : ` bg-[var(--surface)]
                  border border-[var(--border)]
                  text-[var(--text-soft)]
                  hover:bg-[var(--accent-soft)]`
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
                 bg-[var(--surface)]
                 border border-[var(--border)]
                 text-[var(--text-soft)]
                 hover:bg-emerald-400/[0.08]
                 hover:border-emerald-400/15
                 hover:text-emerald-200
                 transition"
    >
      <FiRotateCcw size={16} />
      </button>

      <button
      onClick={handleFullscreen}
      className=" p-2 rounded-lg
                border border-white/[0.05]
                hover:bg-emerald-400/[0.08]
                hover:border-emerald-400/15
                hover:text-emerald-200
                transition"
      >
    
     { document.fullscreenElement ? (<FiMinimize2 size={16} />) : (<FiMaximize2 size={16} />) }
    </button>
  </div>
</div>


      {/* 🔥 Error */}
      {error && <p className="text-red-400 mb-2">{error.message}</p>}

     <div className="relative  ">

  {/* LIVE HOVER PANEL */}
  {hoverData && (
    <div
      className="
      absolute top-2 left-2 z-10
      rounded-lg
      border border-white/10
      bg-[#08111d]/90
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
        <span className="text-emerald-300 ml-1">
          {Number(hoverData?.close || 0).toFixed(2)}
        </span>
      </p>
    </div>
  )}


        


        <div className="relative h-[240px] sm:h-[320px] lg:h-[350px] ">

  {/* CHART ALWAYS MOUNTED */}
  <div
    ref={chartRef}
    className={`
      h-full
      transition-opacity
      duration-300
      
      ${isLoading ? "opacity-0" : "opacity-100"}
    `}
  />

  {/* SHIMMER OVERLAY */}
  {isLoading && (
    <div
      className="
        absolute
        inset-0
        z-20
        overflow-hidden
        rounded-xl
        border border-emerald-400/10
        bg-[#07101a]/88
        
      "
    >
      <motion.div
        animate={{
          x: ["-100%", "220%"],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.4,
          ease: "linear",
        }}
        className="
          absolute
          inset-y-0
          left-0
          w-1/3
          skew-x-[-20deg]
       
        "
      />

      <div className="absolute inset-0 p-6 ">
        <div className="space-y-4 opacity-40">

          <div className="h-4 w-32 rounded bg-white/10" />

          <div className="h-[250px] rounded-xl " />

          <div className="flex gap-3">
            {[1,2,3].map((i) => (
              <div
                key={i}
                className="
                  h-8
                  w-16
                  rounded-lg
                  bg-white/10
                "
              />
            ))}
          </div>

        </div>
      </div>
    </div>
  )}
</div>
</div>
  </div>
  );
};
