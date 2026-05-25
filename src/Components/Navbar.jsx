import React, { useState, useEffect, useContext } from "react";
import { fetchStock } from "../services/api";
import { WatchlistContext } from "../context/WatchlistContext";
import { ThemeToggle } from "../components/ThemeToggle";
import { motion, AnimatePresence, } from "framer-motion";


const TRENDING_STOCKS = [
  "AAPL",
  "TSLA",
  "NVDA",
  "MSFT",
  "META",
  "AMZN",
  "GOOGL",
  "NFLX",
  "BTC/USD",
  "ETH/USD",
];

export const Navbar = ({setShowDashboard}) => {
  const [query, setQuery] = useState("");
  const [searchedStock, setSearchedStock] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const { addStock } = useContext(WatchlistContext);

  const filteredSuggestions =
  TRENDING_STOCKS.filter((item) =>
    item
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  

  // 🔍 Debounced search  
  useEffect(() => {
    if (!query) {
      setSearchedStock(null);
      return;
    }

    let isActive = true; // 👈 important

    const delay = setTimeout(async () => {
      setLoading(true);

      const data = await fetchStock(query.toUpperCase());

      if (!isActive) return; // 🚨 ignore old responses

      if (data && !data.status) {
        console.log(data);

        setSearchedStock(data);
      } else {
        setSearchedStock(null);
      }

      setLoading(false);
    }, 600);

    return () => {
      clearTimeout(delay);
      isActive = false; // 🚨 cancel previous request
    };
  }, [query]);

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur 
bg-white/80 border-b border-gray-200
dark:bg-[#0d0f1a]/80 dark:border-white/10"
    >
      <div className="flex items-center justify-between px-6 gap-4  py-6">
        <h1  className="font-semibold text-gray-800 dark:text-white tracking-wide">
          StockWatch
        </h1>
        <button
  onClick={() => {
            setShowDashboard(false
      
    );
  }}

  className="
    rounded-xl
    border border-white/10

    px-4
    py-2

    text-sm
    text-gray-300

    hover:bg-white/[0.05]
  "
>
  ← Back
</button>

        <div className="relative">
            <input
          type="text"
          placeholder="Search (AAPL)"
          value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(-1);
            }}
             onKeyDown={(e) => {

    if (
      e.key === "ArrowDown"
    ) {

      e.preventDefault();

      setSelectedIndex((prev) =>
        prev <
        filteredSuggestions.length - 1
          ? prev + 1
          : prev
      );
    }

    if (
      e.key === "ArrowUp"
    ) {

      e.preventDefault();

      setSelectedIndex((prev) =>
        prev > 0
          ? prev - 1
          : 0
      );
    }

    if (
      e.key === "Enter"
    ) {

      if (
        filteredSuggestions[
          selectedIndex
        ]
      ) {

        setQuery(
          filteredSuggestions[
            selectedIndex
          ]
        );
      }
    }
  }}
          className="px-4 py-2 rounded-full w-[250px]
bg-gray-100 text-gray-800 placeholder-gray-400
focus:outline-none focus:ring-2 focus:ring-gray-300

dark:bg-white/10 dark:text-white dark:placeholder-gray-500" 
          />
          
          {query &&
  filteredSuggestions.length > 0 && (

    <motion.div

      initial={{
        opacity: 0,
        y: -8,
      }}

      animate={{
        opacity: 1,
        y: 0,
      }}

      exit={{
        opacity: 0,
        y: -8,
      }}

      className="
        absolute
        top-[55px]
        left-0

        z-50
        w-full

        overflow-hidden

        rounded-2xl
        border border-white/10

        bg-[#111827]

        shadow-2xl
        backdrop-blur-xl
      "
    >

      {filteredSuggestions.map(
        (item, index) => (

          <button
            key={item}

            onClick={() => {
              setQuery(item);
            }}

            className={`
              w-full
              px-4
              py-3
              text-left
              text-sm
              transition

              ${
                selectedIndex === index
                  ? `
                    bg-emerald-500/20
                    text-emerald-300
                  `
                  : `
                    hover:bg-white/[0.05]
                    text-white
                  `
              }
            `}
          >
            {item}
          </button>
        )
      )}

    </motion.div>
)}
      </div>

        <ThemeToggle />
      </div>

      {/* 🔄 Loading */}
      {loading && (
        <p className="px-4 text-sm text-gray-500 dark:text-gray-400">
          Loading...
        </p>
      )}

  


      {/* {replaced block} */}
      <AnimatePresence>

  {searchedStock && (

    <motion.div

      initial={{
        opacity: 0,
        y: -10,
      }}

      animate={{
        opacity: 1,
        y: 0,
      }}

      exit={{
        opacity: 0,
        y: -10,
      }}

      transition={{
        duration: 0.2,
      }}

      className="
        absolute
        top-[70px]
        left-1/2
        -translate-x-1/2
        z-50
        w-[300px]
      "
    >

      <div
        className="
          rounded-2xl
          border
          shadow-xl
          p-4

          bg-white
          border-gray-200

          dark:bg-[#111827]
          dark:border-white/10

          backdrop-blur-xl
        "
      >

        <div
          className="
            flex items-center
            justify-between
          "
        >

          <div>

            <p className="font-semibold">
              {searchedStock.symbol}
            </p>

            <p className="text-sm text-gray-400">
              {searchedStock.currency}
            </p>

          </div>

          <div className="text-right">

            <p className="font-semibold">
              $
              {Number(
                searchedStock.price
              ).toFixed(2)}
            </p>

            <p
              className={
                searchedStock.percent_change >= 0
                  ? "text-green-400"
                  : "text-red-400"
              }
            >
              {
                searchedStock.percent_change
              }%
            </p>

          </div>

        </div>

        <button
          onClick={() => {

            addStock({
              ...searchedStock,
            });

            setQuery("");
            setSearchedStock(null);

          }}

          className="
            mt-4
            w-full
            rounded-xl
            bg-cyan-500
            py-2
            font-medium
            text-white

            hover:bg-cyan-400

            transition
          "
        >
          Add to Watchlist
        </button>

      </div>

    </motion.div>

  )}

</AnimatePresence>




    </header>
  );
};
