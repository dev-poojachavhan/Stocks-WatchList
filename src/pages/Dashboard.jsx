import React, { useContext, useEffect, useState } from "react";
import { StockCard } from "../components/StockCard";
import { WatchlistContext } from "../context/WatchlistContext";
import { StockDetails } from "../Components/StockDetails";
import { AnimatePresence, motion } from "framer-motion";
import { CandleChart } from "../components/CandleChart";
import { AnalyticsCard } from "../Components/AnalyticsCard";
import { StockNews } from "../Components/StockNews";
import { MarketHeatmap } from "../Components/MarketHeatmap";
import { PopularStocks } from "../Components/PopularStocks";
import { CryptoWidget } from "../Components/CryptoWidget";
import { Shimmer } from "../Components/LoadingShimmer/Shimmer";
import { fetchStock } from "../services/api";

export const Dashboard = ({ initialSymbol }) => {
  const { watchlist, loadingMap, addStock } = useContext(WatchlistContext);
  const [theme, setTheme] = useState(
  document.documentElement.getAttribute("data-theme") || "light"
);

  const [selectedSymbol, setSelectedSymbol] = useState(null);
  const selectedStock = watchlist.find(
    (stock) => stock.symbol === selectedSymbol,
  );

  const totalValue = watchlist.reduce(
    (acc, stock) => acc + Number(stock.price || 0),
    0,
  );

  const topGainer = [...watchlist].sort(
    (a, b) => b.percent_change - a.percent_change,
  )[0];

  const topLoser = [...watchlist].sort(
    (a, b) => a.percent_change - b.percent_change,
  )[0];

  useEffect(() => {
  const observer = new MutationObserver(() => {
    setTheme(
      document.documentElement.getAttribute("data-theme")
    );
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });

  return () => observer.disconnect();
}, []);

  //default stock
  useEffect(() => {
    if (watchlist.length > 0 && !selectedSymbol) {
      setSelectedSymbol(watchlist[0].symbol);
    }
  }, [watchlist, selectedSymbol]);

  useEffect(() => {
    const loadInitialStock = async () => {
      if (!initialSymbol) return;

      try {
        const stockData = await fetchStock(initialSymbol);

        if (!stockData) return;

        addStock(stockData);

        setSelectedSymbol(stockData.symbol);
      } catch (err) {
        console.error("Initial stock load failed:", err);
      }
    };

    loadInitialStock();
  }, [initialSymbol, addStock]);

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: -20,
      }}
      transition={{
        duration: 0.45,
        ease: "easeOut",
      }}
      className="
      relative


  min-h-screen
  px-6
  py-6
bg-[var(--bg)]

    "
    >


      {/* ATMOSPHERIC BACKGROUND */}

<div
  className="
    pointer-events-none
    absolute
    inset-0
    overflow-hidden
  "
>
  {/* TOP EMERALD */}
  <div
    className="
      absolute
      top-[-120px]
      left-[18%]

      h-[320px]
      w-[320px]

      rounded-full

      bg-emerald-400/[0.08]
      blur-[120px]
    "
  />

  {/* RIGHT CYAN */}
  <div
    className="
      absolute
    right-[-120px]
    top-[28%]

    h-[320px]
    w-[320px]

    rounded-full

   bg-teal-400/[0.06]
    blur-[140px]
    "
  />

  {/* CENTER PURPLE */}
  <div
    className="
      absolute
      left-[40%]
      top-[10%]

      h-[260px]
      w-[260px]

      rounded-full

      bg-violet-500/5
      blur-[150px]
    "
  />
</div>


      {/* MAIN GRID */}
      <div
        className="
        max-w-[1700px]
        mx-auto
        relative z-10
         grid
    grid-cols-[260px_1fr_320px]
    grid-rows-[90px_560px_auto_auto]

    gap-6
    items-start
      "
      >
        {/* ================================= */}
        {/* TOP LEFT TITLE */}
        {/* ================================= */}

        <div
          className="
          col-start-1
          row-start-1
          flex flex-col justify-start
           
        "
        >
          <h2
            className="
      text-4xl
      font-bold
      text-[var(--text)]
    "
          >
            My Watchlist
          </h2>

          <p className="text-[var(--text-soft)] text-sm mt-3">
            Track your market movers & portfolio performance
          </p>
        </div>

        {/* ================================= */}
        {/* POPULAR STOCKS */}
        {/* ================================= */}

        <div
          className="
          col-start-2
          row-start-1

          overflow-hidden
          rounded-2xl

          border border-emerald-400/15

bg-[var(--surface-glass)]

backdrop-blur-xl

shadow-[var(--surface-shadow)]

          px-4
          py-2
          h-[90px]
          flex items-center
        "
        >
          <PopularStocks />
        </div>

        {/* ================================= */}
        {/* STOCK DETAILS */}
        {/* ================================= */}

        <section
          className="
         col-start-3
    row-start-1
    row-span-4

    sticky
    top-24
    self-start

    flex
    flex-col
    gap-6

    h-fit
        "
        >
          {/* {STOCK DETAILS} */}

          <div
            className="
            rounded-2xl
            border border-[var(--surface-border)]

            bg-[var(--surface-panel)]

            backdrop-blur-xl

           shadow-[var(--surface-shadow)]
            p-5
          "
          >
            <h2 className="text-xl font-semibold text-[var(--text)] mb-5">
              Stock Details
            </h2>

            {selectedStock ? (
              <StockDetails stock={selectedStock} />
            ) : (
              <p className="text-[var(--text-muted)]">Select a stock</p>
            )}
          </div>

          {/* ================================= */}
          {/* CRYPTO MARKET */}
          {/* ================================= */}

          <div
            className="
      rounded-2xl
      
      border border-[var(--surface-border)]

bg-[var(--surface-panel)]
      p-5
    "
          >
            <CryptoWidget />
          </div>
        </section>

        {/* ================================= */}
        {/* WATCHLIST */}
        {/* ================================= */}

        <aside
          className="
     col-start-1
    row-start-2

    sticky
    top-24
    self-start

    flex
    flex-col
    gap-6
   
    pr-2
    self-start
  "
        >
          <div
            className="
      flex
      flex-col
      gap-6

      max-h-[470px]
      overflow-y-auto
     
      scrollbar-thin
      scrollbar-thumb-emerald-400/30
      hover:scrollbar-thumb-emerald-300/50
      scrollbar-track-transparent
      pb-4
      pr-3
    "
          >
            <AnimatePresence>
              {loadingMap.watchlist ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <Shimmer key={i} className="h-[110px]" />
                  ))}
                </div>
              ) : watchlist.length === 0 ? (
                <div
                  className="
      rounded-2xl
      border border-dashed border-white/10

     bg-gradient-to-br
from-emerald-400/[0.08]
to-transparent

      p-10
      text-center
    "
                >
                  <div className="text-5xl mb-4">📈</div>

                  <h3
                    className="
        text-xl
        font-semibold
        text-[var(--text)]
      "
                  >
                    Build Your Watchlist
                  </h3>

                  <p className="mt-3 text-[var(--text-soft)]">
                    Search stocks from landing page to begin tracking markets.
                  </p>
                </div>
              ) : (
                watchlist.map((stock) => (
                  <StockCard
                    key={stock.symbol}
                    stock={stock}
                    onClick={() => setSelectedSymbol(stock.symbol)}
                    isActive={selectedSymbol === stock.symbol}
                  />
                ))
              )}
            </AnimatePresence>
          </div>
          {/* ================================= */}
          {/* ANALYTICS */}
          {/* ================================= */}

          <div
            className="
          col-start-1
          row-start-3

          rounded-2xl
         border border-[var(--surface-border)]

          bg-[var(--surface-panel)]

backdrop-blur-xl

          p-4

          h-fit
        "
          >
            <div className="mb-4">
              <h2 className="text-xl tracking-tight font-semibold text-[var(--text)]">
                Portfolio Analytics
              </h2>

              <p className="text-xs text-[var(--text-muted)] mt-1">
                Quick market overview
              </p>
            </div>

            <div className="grid gap-3">
              <AnalyticsCard
                label="Portfolio"
                value={`$${totalValue.toFixed(2)}`}
              />

              <AnalyticsCard label="Assets" value={watchlist.length} />

              <AnalyticsCard
                label="Top Gainer"
                value={topGainer?.symbol || "--"}
                subValue={`+${topGainer?.percent_change?.toFixed(2) || 0}%`}
                positive
              />

              <AnalyticsCard
                label="Top Loser"
                value={topLoser?.symbol || "--"}
                subValue={`${topLoser?.percent_change?.toFixed(2) || 0}%`}
                negative
              />
            </div>
          </div>
        </aside>

        {/* ================================= */}
        {/* CENTER CHART */}
        {/* ================================= */}

        <div
          className="
          col-start-2
          row-start-2
          
          overflow-hidden
        "
        >
          <div>{selectedStock && <CandleChart stock={selectedStock} chartTheme={theme} />}</div>
        </div>

        {/* ================================= */}
        {/* CENTER LOWER CONTENT */}
        {/* ================================= */}

        {/* HEATMAP */}

        <div
          className="
    col-start-2
    row-start-3

    rounded-2xl
   border border-[var(--surface-border)]
bg-[var(--surface-panel)]

backdrop-blur-xl

    p-5
    h-fit
  "
        >
          <div className="mb-5">
            <h2 className="text-2xl font-bold text-[var(--text)]">Market Heatmap</h2>

            <p className="text-sm text-[var(--text-muted)] mt-2">
              Visual market movement overview
            </p>
          </div>

          <MarketHeatmap
            watchlist={watchlist}
            selectedSymbol={selectedSymbol}
            setSelectedSymbol={setSelectedSymbol}
          />
        </div>

        {/* NEWS */}

        <div
          className="
    col-start-2
    row-start-4
   "
        >
          {selectedStock && <StockNews symbol={selectedStock.symbol} />}
        </div>
      </div>
    </motion.div>
  );
};
