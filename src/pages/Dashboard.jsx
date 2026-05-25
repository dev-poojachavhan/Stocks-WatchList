import React, { useContext, useEffect, useState } from "react";
import { StockCard } from "../components/StockCard";
import { WatchlistContext } from "../context/WatchlistContext";
import { StockDetails } from "../Components/StockDetails";
import { AnimatePresence,motion  } from "framer-motion";
import { CandleChart } from "../components/CandleChart";
import { AnalyticsCard } from "../Components/AnalyticsCard";
import { StockNews } from "../Components/StockNews";
import { MarketHeatmap } from "../Components/MarketHeatmap";
import { PopularStocks } from "../Components/PopularStocks";
import { CryptoWidget } from "../Components/CryptoWidget";
import { Shimmer } from "../Components/LoadingShimmer/Shimmer";
import { fetchStock } from "../services/api";




export const Dashboard = ({
  initialSymbol,
}) => {  
  
  const { watchlist, loadingMap,addStock, } = useContext(WatchlistContext);
  
  const [selectedSymbol, setSelectedSymbol] = useState(null);
  const selectedStock =
  watchlist.find(
    (stock) =>
      stock.symbol === selectedSymbol
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


  
  //default stock
  useEffect(() => {
    if (
    watchlist.length > 0 &&
    !selectedSymbol
  ) {
    setSelectedSymbol(
      watchlist[0].symbol
    );
  }
  },[ watchlist, selectedSymbol]);

useEffect(() => {

  const loadInitialStock = async () => {

    if (!initialSymbol) return;

    try {

      const stockData =
        await fetchStock(initialSymbol);

      if (!stockData) return;

      addStock(stockData);

      setSelectedSymbol(
        stockData.symbol
      );

    } catch (err) {

      console.error(
        "Initial stock load failed:",
        err
      );
    }
  };

  loadInitialStock();

}, [initialSymbol,addStock]);

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
      min-h-screen
      px-6
      py-6

      bg-[#f6f7fb]

      dark:bg-gradient-to-br
      dark:from-[#060607]
      dark:via-[#141722]
      dark:to-black
    "
  >
    {/* MAIN GRID */}
    <div
      className="
        max-w-[1700px]
        mx-auto

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
        <h2 className="text-2xl font-bold tracking-tight text-white">
          My Watchlist
        </h2>

        <p className="text-gray-400 text-sm mt-3">
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

          border border-white/10
          bg-white/[0.03]

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
            border border-white/10
            p-5
          "
          >
             <h2 className="text-xl font-semibold text-white mb-5">
          Stock Details
        </h2>

          {selectedStock ? (
            <StockDetails stock={selectedStock} />
          ) : (
            <p className="text-gray-500">
              Select a stock
            </p>
          )}
          </div>
          

            {/* ================================= */}
      {/* CRYPTO MARKET */}
      {/* ================================= */}

     <div
    className="
      rounded-2xl
      border border-white/10
      bg-white/[0.03]
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
      scrollbar-thumb-white/10
      scrollbar-track-transparent

      pr-3
    "
  >   
            <AnimatePresence>
              {loadingMap.watchlist ? (
  <div className="space-y-4">
    {[1,2,3,4].map((i) => (
      <Shimmer
        key={i}
        className="h-[110px]"
      />
    ))}
  </div>
) 
       : watchlist.length === 0 ? (

  <div
    className="
      rounded-2xl
      border border-dashed border-white/10

      bg-white/[0.03]

      p-10
      text-center
    "
  >
    <div className="text-5xl mb-4">
      📈
    </div>

    <h3
      className="
        text-xl
        font-semibold
        text-white
      "
    >
      Build Your Watchlist
    </h3>

    <p className="mt-3 text-gray-400">
      Search stocks from landing page
      to begin tracking markets.
    </p>

  </div>

) : (

  watchlist.map((stock) => (
    <StockCard
      key={stock.symbol}
      stock={stock}
      onClick={() =>
        setSelectedSymbol(stock.symbol)
      }
      isActive={
        selectedSymbol === stock.symbol
      }
    />
  )))}
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
          border border-white/10

          bg-white/[0.03]

          p-4

          h-fit
        "
      >
        <div className="mb-4">
          <h2 className="text-xl tracking-tight font-semibold text-white">
            Portfolio Analytics
          </h2>

          <p className="text-xs text-gray-400 mt-1">
            Quick market overview
          </p>
        </div>

        <div className="grid gap-3">

          <AnalyticsCard
            label="Portfolio"
            value={`$${totalValue.toFixed(2)}`}
          />

          <AnalyticsCard
            label="Assets"
            value={watchlist.length}
          />

          <AnalyticsCard
            label="Top Gainer"
            value={topGainer?.symbol || "--"}
            subValue={`+${
              topGainer?.percent_change?.toFixed(2) || 0
            }%`}
            positive
          />

          <AnalyticsCard
            label="Top Loser"
            value={topLoser?.symbol || "--"}
            subValue={`${
              topLoser?.percent_change?.toFixed(2) || 0
            }%`}
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
        <div>
          {selectedStock && (
            <CandleChart stock={selectedStock} />
          )}
        </div>
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
    border border-white/10
    bg-white/[0.03]

    p-5
    h-fit
  "
>
          <div className="mb-5">

            <h2 className="text-2xl font-bold text-white">
              Market Heatmap
            </h2>

            <p className="text-sm text-gray-400 mt-2">
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
    row-start-4">
         

          {selectedStock && (
            <StockNews
              symbol={selectedStock.symbol}
            />
          )}


        </div>
      

    

    </div>
  </motion.div>
);
};
