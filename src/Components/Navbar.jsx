import React, { useState, useEffect, useContext } from "react";
import { fetchStock } from "../services/api";
import { WatchlistContext } from "../context/WatchlistContext";
import { ThemeToggle } from "../components/ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";

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

export const Navbar = ({ setShowDashboard }) => {
  const [query, setQuery] = useState("");
  const [searchedStock, setSearchedStock] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const { addStock } = useContext(WatchlistContext);
  const [error, setError] = useState("");

  const filteredSuggestions = TRENDING_STOCKS.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase()),
  );

  // 🔍 Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setSearchedStock(null);
      setError("");
      return;
    }

    let isActive = true; // 👈 important

    const delay = setTimeout(async () => {
      try {
        setLoading(true);

        const data = await fetchStock(query.toUpperCase());
        // console.log(data);

        if (!isActive) return; // 🚨 ignore old responses

        if (data?.error) {
          setSearchedStock(null);

          if (data.message === "API_LIMIT") {
            setError("API limit reached. Please wait for 1 minute.");
          } else if (data.message === "INVALID_SYMBOL") {
            setError("Invalid symbol");
          } else {
            setError("Something went wrong");
          }

          return;
        }
        setError("");
        setSearchedStock(data);
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    }, 600);

    return () => {
      clearTimeout(delay);
      isActive = false; // 🚨 cancel previous request
    };
  }, [query]);

  useEffect(() => {
    if (!error) return;

    const timer = setTimeout(() => {
      setError("");
    }, 5000);

    return () => clearTimeout(timer);
  }, [error]);
  return (
    <header
      className="sticky top-0 z-50 backdrop-blur relative
          border-b
          border-[var(--border)]
          bg-[var(--nav-bg)]
          backdrop-blur-2xl
          shadow-[var(--nav-shadow)]"
    >
      <div
        className="
        absolute
        inset-0
        pointer-events-none
        bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.06),transparent_65%)]
  "
      />
      <div className="flex items-center justify-between px-4 gap-3  py-4 sm:px-6 sm:py-6">
        <button
          onClick={() => {
            setShowDashboard(false);
          }}
          className="
            group
            rounded-2xl
            border
            border-[var(--border)]
            bg-[var(--surface)]
            px-3 py-2
            sm:px-4 sm:py-2.5
            text-sm
            text-[var(--text-muted)]
            backdrop-blur-xl
            transition-colors
            duration-300
            hover:border-emerald-400/30
            hover:text-[var(--text)]
            hover:bg-[var(--accent-soft)]
            "
        >
          ← Back
        </button>

        <div className="flex-1 min-w-0 flex justify-center ">
          <div
            className="
                absolute
                inset-0
                rounded-full
                opacity-0
                focus-within:opacity-100
                transition-opacity
                duration-300
                bg-[radial-gradient(circle,rgba(16,185,129,0.08),transparent_70%)]
                shadow-[inset_0_1px_2px_rgba(255,255,255,0.35)]
                pointer-events-none
              "
          />
          <div className="relative w-full sm:w-[320px] lg:w-[420px]">
            <input
              type="text"
              placeholder="Search (AAPL)"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(-1);
                setError("");
                setSearchedStock(null);
              }}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  e.preventDefault();

                  setSelectedIndex((prev) =>
                    prev < filteredSuggestions.length - 1 ? prev + 1 : prev,
                  );
                }

                if (e.key === "ArrowUp") {
                  e.preventDefault();

                  setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
                }

                if (e.key === "Enter") {
                  if (filteredSuggestions[selectedIndex]) {
                    setQuery(filteredSuggestions[selectedIndex]);
                  }
                }
              }}
              className="
                  px-4
                  py-2
                  rounded-full
                  w-full
                  sm:w-[320px]
                  lg:w-[420px]
                  border
                  border-[var(--border)]
                  bg-[var(--surface)]
                  text-[var(--text)]
                  placeholder:text-[var(--text-muted)]
                  backdrop-blur-xl
                  transition-colors
                  duration-300
                  focus:outline-none
                  focus:border-emerald-500/30
                  focus:shadow-[0_0_30px_rgba(16,185,129,0.12)]
                  "
            />

            {query && filteredSuggestions.length > 0 && (
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
        border border-[var(--border)]
        bg-[var(--surface-solid)]
        shadow-2xl
        backdrop-blur-xl
      "
              >
                {filteredSuggestions.map((item, index) => (
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
                    bg-[var(--accent-soft)]
                    text-[var(--text)]
                  `
                  : `
                    hover:bg-[var(--accent-soft)]
                     text-[var(--text)]
                  `
              }
            `}
                  >
                    {item}
                  </button>
                ))}
              </motion.div>
            )}
          </div>

          <AnimatePresence>
            {error && (
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
                className="
                  absolute
                  top-[60px]
                  left-1/2
                  -translate-x-1/2
                  z-50
                  w-[300px]
                  rounded-xl
                  border
                  border-amber-500/20
                  bg-amber-500/10
                  px-4
                  py-3
                  text-center
                  text-sm
                  text-amber-300
                  backdrop-blur-xl
                 "
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <ThemeToggle />
      </div>

      {/* 🔄 Loading */}
      {loading && (
        <p className="px-4 text-sm text-[var(--text-muted)]">Loading...</p>
      )}

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
         w-[92vw]
        sm:w-[300px]
        max-w-[300px]
      "
          >
            <div
              className="
          rounded-2xl
          border
          shadow-xl
          p-4
          border-[var(--border)]
          bg-[var(--surface-solid)]
          shadow-[var(--surface-shadow)]
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
                  <p className="font-semibold">{searchedStock.symbol}</p>

                  <p className="text-sm text-[var(--text-muted)]">
                    {searchedStock.currency}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-semibold">
                    ${Number(searchedStock.price).toFixed(2)}
                  </p>

                  <p
                    className={
                      searchedStock.percent_change >= 0
                        ? "text-green-400"
                        : "text-red-400"
                    }
                  >
                    {searchedStock.percent_change}%
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
                    border border-emerald-400/20
                    bg-emerald-500/12
                    py-2
                    font-medium
                    text-emerald-400
                    transition-all
                    duration-300
                    hover:bg-emerald-500/18
                    hover:border-emerald-400/30
                    hover:shadow-[0_0_25px_rgba(16,185,129,0.12)]
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
