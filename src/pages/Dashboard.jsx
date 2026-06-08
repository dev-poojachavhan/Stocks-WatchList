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
import { AnalyticsSection } from "../Components/AnalyticsSection";
import { EmptyDashboard } from "../Components/EmptyDashboard";



export const Dashboard = ({ initialSymbol }) => {
  const { watchlist, loadingMap, addStock } = useContext(WatchlistContext);
  
  const [theme, setTheme] = useState(
    document.documentElement.getAttribute("data-theme") || "light",
  );

  const [selectedSymbol, setSelectedSymbol] = useState(null);
  const selectedStock = watchlist.find(
    (stock) => stock.symbol === selectedSymbol,
  );

  const isEmpty = watchlist.length === 0;

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
      setTheme(document.documentElement.getAttribute("data-theme"));
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

  useEffect(() => {
  if (watchlist.length === 0) {
    setSelectedSymbol(null);
  }
}, [watchlist]);

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
      relative min-h-screen
      px-4 py-4 sm:px-6 sm:py-6
      bg-[var(--bg)]"
    >
      {/* ATMOSPHERIC BACKGROUND */}

      <div
        className="
        pointer-events-none
        absolute
        inset-0
        overflow-hidden"
      >
        {/* TOP EMERALD */}
        <div
          className="
          absolute
          top-[-120px]
          left-[18%]
          h-[320px] w-[320px]
          rounded-full
        bg-emerald-400/[0.08]
          blur-[120px] "
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
   b      g-teal-400/[0.06]
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
           blur-[150px]"
        />
      </div>

      {/* MAIN GRID */}
      <div
        className="
        max-w-[1700px]
        mx-auto
        relative z-10
        grid
        grid-cols-1
        lg:grid-cols-[260px_1fr_320px]
        lg:grid-rows-[90px_560px_auto_auto]
         gap-6
         items-start"
      >
        {/* ================================= */}
        {/* TOP LEFT TITLE */}
        {/* ================================= */}

        <div
          className="
          order-2
          lg:order-none
          lg:col-start-1
          lg:row-start-1
          flex flex-col justify-start
           "
        >
          <h2
            className="
            text-2xl
            sm:text-3xl
            xl:text-4xl
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

        {isEmpty && <EmptyDashboard />}

        {!isEmpty && (
  <>

        {/* ================================= */}
        {/* POPULAR STOCKS */}
        {/* ================================= */}

        <div
          className="
          order-1
          lg:order-none
          col-span-1
          lg:col-start-2
          lg:row-start-1
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
            order-5
            lg:order-none
            lg:col-start-3
            lg:row-start-1
            lg:row-span-4

            lg:sticky
            lg:top-24
            self-start

            flex
            flex-col
            gap-6

            h-fit
        "
        >
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
            order-7
            rounded-2xl 
            border border-[var(--surface-border)]
            bg-[var(--surface-panel)]
            p-5"
          >
            <CryptoWidget />
          </div>
        </section>

        {/* ================================= */}
        {/* MOBILE ANALYTICS */}
        {/* ================================= */}

        <div
          className="
            order-6
            lg:order-none
             lg:hidden
          lg:col-start-1
          lg:row-start-3
          rounded-2xl
         border border-[var(--surface-border)]
          bg-[var(--surface-panel)]
          backdrop-blur-xl
          p-4
          h-fit
        "
        >
          <AnalyticsSection
            totalValue={totalValue}
            watchlistLength={watchlist.length}
            topGainer={topGainer}
            topLoser={topLoser}
          />
        </div>

        {/* ================================= */}
        {/* WATCHLIST */}
        {/* ================================= */}

        <aside
          className="
          order-3
          lg:order-none
          lg:col-start-1
          lg:row-start-2
          lg:sticky
          lg:top-24
          self-start
          flex
          flex-col
          gap-6  
          pr-2"
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
              pr-3"
          >
            <AnimatePresence>
              {loadingMap.watchlist ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <Shimmer key={i} className="h-[110px]" />
                  ))}
                </div>
              ) 
                 : (
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

          <div className="hidden lg:block">
            <div
              className="
            order-6
            lg:order-none
          lg:col-start-1
          lg:row-start-3
          rounded-2xl
         border border-[var(--surface-border)]
          bg-[var(--surface-panel)]
          backdrop-blur-xl
          p-4
          h-fit
        "
            >
              <AnalyticsSection
                totalValue={totalValue}
                watchlistLength={watchlist.length}
                topGainer={topGainer}
                topLoser={topLoser}
              />
            </div>
          </div>
        </aside>

        {/* ================================= */}
        {/* CENTER CHART */}
        {/* ================================= */}

        <div
          className="
          order-4

  lg:order-none
          lg:col-start-2
          lg:row-start-2
          
          overflow-hidden
        "
        >
          <div>
            
            
              {selectedStock && (
  <CandleChart
    stock={selectedStock}
    chartTheme={theme}
  />
)}
            
          </div>
        </div>

        {/* ================================= */}
        {/* CENTER LOWER CONTENT */}
        {/* ================================= */}

        {/* HEATMAP */}

        <div
          className="
          order-7

lg:order-none
    lg:col-start-2
    lg:row-start-3

    rounded-2xl
   border border-[var(--surface-border)]
bg-[var(--surface-panel)]

backdrop-blur-xl

    p-5
    h-fit
  "
        >
          <div className="mb-5">
            <h2 className="text-2xl font-bold text-[var(--text)]">
              Market Heatmap
            </h2>

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
          order-9
          lg:col-start-2
          lg:row-start-4
   "
        >
          
           {selectedStock && (
  <StockNews symbol={selectedStock.symbol} />
)}
          
                </div>
          </>)}
          </div>
      
    </motion.div> 
    
  );
};
