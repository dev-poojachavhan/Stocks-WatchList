import { MarketTicker } from "../components/landing/MarketTicker";
import { SupportedMarkets } from "../components/landing/SupportedMarkets";
  import { fetchStock } from "../services/api";
  import { AnimatePresence,motion } from "framer-motion";
  import heroImage from "../assets/dashboard-preview.jpg";
  import { useEffect, useState } from "react";
  import { Toaster } from "react-hot-toast";
  import logo from "../assets/arrow.png";

  export const LandingPage = ({
    setShowDashboard,
    setInitialSymbol,
     setInitialStockData,
    setIsLaunching,
  }) => {
    const [search, setSearch] = useState("");
    const [invalidSymbol, setInvalidSymbol] = useState("");
    const [hasWatchlist, setHasWatchlist] = useState(false);

    useEffect(() => {
      try {
        const savedWatchlist = JSON.parse(
          localStorage.getItem("watchlist") || "[]",
        );

        setHasWatchlist(savedWatchlist.length > 0);
      } catch {
        setHasWatchlist(false);
      }
    }, []);

const launchDashboard = async (symbol = search) => {
  const trimmedSymbol = symbol.trim();

  if (!trimmedSymbol) return;

  try {
    // Validate/fetch stock while staying on landing page
    const stockData = await fetchStock(trimmedSymbol);

    // Invalid / API error
    if (stockData?.error) {
      if (stockData.message === "INVALID_SYMBOL") {
        setInvalidSymbol(trimmedSymbol);
      } else if (stockData.message === "API_LIMIT") {
        setInvalidSymbol("API_LIMIT");
      } else {
        setInvalidSymbol("API_ERROR");
      }

      return;
    }

    // Valid stock
    setInitialSymbol(trimmedSymbol);
    setInitialStockData(stockData);

    // Only now show the launching screen
    setIsLaunching(true);

    setTimeout(() => {
      setShowDashboard(true);
      setIsLaunching(false);
    }, 800);
  } catch (error) {
    console.error("Launch failed:", error);

    setInvalidSymbol("API_ERROR");
  }
};
    return (
      <motion.div
        className="   
        w-full
overflow-x-hidden   
        bg-[#050816]
          text-white
          pb-10
          bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)]
          bg-[size:80px_80px]
        "
      >
        <MarketTicker />

        {/* back to dashboard */}
        {hasWatchlist && (
          <div className="mx-auto max-w-[1400px]  p-8 mt-5 flex justify-end">
            <button
              onClick={() => setShowDashboard(true)}
              className="
          rounded-full
          border border-emerald-500/30
          bg-emerald-500/10
          px-4 py-2
          text-sm font-medium
          text-emerald-400
          hover:bg-emerald-500/20
          transition-all
        "
            >
              ← Dashboard
            </button>
          </div>
        )}

        <div className="pt-10">
          <div
            className="
                relative
                overflow-hidden    
                px-6
                pt-3
                min-h-[650px]
                lg:min-h-[490px]

            "
          >
            <div className="flex items-center gap-2 mb-15">
              <img src={logo} alt="StockWatch" className="w-7 h-7" />
              <span className="font-semibold text-xl">StockWatch</span>
            </div>

            {/* BACKGROUND GLOW */}
            <div
              className="
                absolute
                top-40 left-1/2
                h-[500px]
                w-[500px]
                -translate-x-1/2
                rounded-full
                bg-gradient-to-r
              from-emerald-500/10
              to-teal-500/10
                blur-[140px]
            "
            />

      <AnimatePresence>
         {invalidSymbol && (
    <motion.div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        bg-black/60
        px-4
        backdrop-blur-sm
      "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.92,
          y: 20,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          scale: 0.95,
          y: 10,
        }}
        transition={{
          duration: 0.25,
          ease: "easeOut",
        }}
        className="
           w-[calc(100%-2rem)]
  max-w-md
  rounded-2xl
  border border-white/[0.08]
  bg-[#0b1220]
  p-5
  text-center
  shadow-[0_0_60px_rgba(0,0,0,0.45)]

  sm:rounded-3xl
  sm:p-7
        "
      >
        {invalidSymbol === "API_LIMIT" ? (
          <>
            <div
              className="
                mx-auto
                mb-5
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-amber-400/10
                text-2xl
              "
            >
              ⏳
            </div>

            <h2 className="text-lg font-bold text-white sm:text-xl">
              Market Data Temporarily Unavailable
            </h2>

            <p className="mt-3
  text-xs
  leading-5
  text-slate-400
  sm:text-sm
  sm:leading-6">
              We've reached the free market-data request limit.
              Please wait a moment and try again.
            </p>
          </>
        ) : (
          <>
            <div
              className="
                mx-auto
                mb-5
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-emerald-400/10
                text-2xl
              "
            >
              🔎
            </div>

            <h2 className="text-xl font-bold text-white">
              Stock Not Available
            </h2>

            {invalidSymbol !== "API_ERROR" && (
              <p className="mt-2 text-sm font-semibold text-emerald-400">
                {invalidSymbol.toUpperCase()}
              </p>
            )}

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-gray-400">
              We couldn't find market data for this symbol.
              Try a supported US stock or choose one from the
              popular stocks below.
            </p>
          </>
        )}

        <button
          onClick={() => setInvalidSymbol("")}
          className="
            mt-6
            rounded-xl
            bg-emerald-500
            px-6
            py-3
            text-sm
            font-semibold
            text-black
            transition
            hover:bg-emerald-400
            hover:scale-[1.02]
          "
        >
          Got it
        </button>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>      




            {/* HERO */}
            <motion.div
              
              initial={{
                opacity: 0,
                y: 40,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
              }}
              exit={{
                opacity: 0,
                y: -20,
                scale: 0.98,
              }}
              className="
             
                relative 
                z-10  
                mx-auto
                 w-full
                max-w-[1400px]  
                lg:grid
                lg:items-center
                gap-10
                px-1
                lg:grid-cols-2
                lg:gap-16
              "
            >
              {/* LEFT SIDE */}

              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.15,
                    },
                  },
                }}
              >
                {" "}
                <motion.h1
                  className="          
                     font-black
    text-[2rem]
    leading-[1.05]
    tracking-tight
    sm:text-5xl
    lg:text-6xl
                    
                "
                >
                  Build Your{" "}
                  <span
                    className="bg-gradient-to-r
                        from-emerald-400
                        to-teal-300
                        bg-clip-text
                        text-transparent"
                  >
                    Market Watchlist
                  </span>
                </motion.h1>
                <motion.p
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: 30,
                    },

                    visible: {
                      opacity: 1,
                      y: 0,
                    },
                  }}
                  className="
                      mt-5
                      max-w-[620px]
                      text-xs
                      lg:text-sm
                      sm:text-base
                      leading-6
                      leading-6
                      text-gray-400
                    "
                >
                  Track stocks, crypto, heatmaps, and market news in one modern
                  trading dashboard experience.
                </motion.p>


                {/* MOBILE DASHBOARD PREVIEW */}
                <div className="block lg:hidden mt-8 ">
                  <div
                    className="
                      
                        max-w-[750px]
                        
    overflow-hidden
    rounded-2xl
    border border-white/[0.08]
    bg-[#0b1220]
    p-2
    shadow-[0_0_30px_rgba(16,185,129,0.12)]

    sm:rounded-3xl
    sm:p-3
                "
                  >
                    <img
                      src={heroImage}
                      alt="StockWatch dashboard"
                      className="
                        h-[180px]
      w-full
      rounded-xl
      object-cover
      object-top
      overflow-hidden
      sm:h-[230px] 
      md:h-[260px] 
                        "
                    />
                  </div>
                </div>
                {/* SEARCH BAR */}
                <motion.div
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: 30,
                    },

                    visible: {
                      opacity: 1,
                      y: 0,
                    },
                  }}
                  className="
                        mt-8
  mb-2
  flex
  w-full
  max-w-[550px]
  flex-col
  gap-2
  rounded-2xl
  border
  border-white/[0.08]
  bg-[#0b1220]/80
  p-2.5
  backdrop-blur-xl
  transition-all

  focus-within:border-emerald-400/40
  focus-within:shadow-[0_0_25px_rgba(16,185,129,0.10)]

  sm:mt-10
  sm:flex-row
  sm:items-center
  sm:gap-3
  sm:p-3
          "
                >
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => {
      if (e.key === "Enter") {
        launchDashboard();
      }
    }}
                    type="text"
                    placeholder="Search stocks, crypto or symbols..."
                    className="
                        min-w-0
  flex-1
  bg-transparent
  px-2
  py-2
  text-sm
  text-white
  outline-none
  placeholder:text-slate-600

  sm:px-3
  sm:text-base
                  "
                  />

                  {!hasWatchlist && (
                    <button
                      onClick={() => launchDashboard()}
                      
                     className={`
  w-full
  rounded-xl
  px-4
  py-2.5
  text-sm
  font-semibold
  transition-all

  sm:w-auto

  ${
    search.trim()
      ? `
        bg-emerald-500
        text-black
        shadow-[0_0_20px_rgba(16,185,129,0.20)]
        hover:bg-emerald-400
        hover:shadow-[0_0_25px_rgba(16,185,129,0.30)]
      `
      : `
        cursor-not-allowed
        bg-slate-700/50
        text-slate-500
      `
  }
`}
                    >
                      <span className="flex items-center justify-center gap-2 py-1.5 lg:py-3 px-4">
                        Launch Dashboard
                        <motion.span
                          animate={{
                            x: [0, 4, 0],
                          }}
                          transition={{
                            duration: 1.4,
                            repeat: Infinity,
                          }}
                        >
                          →
                        </motion.span>
                      </span>
                    </button>
                  )}
                </motion.div>
                <motion.p
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: 30,
                    },

                    visible: {
                      opacity: 1,
                      y: 0,
                    },
                  }}
                  className="mt-2 text-sm text-gray-500"
                >
                 Search a symbol or explore popular stocks below
                </motion.p>

                {/* SUPPORTED MARKETS */}
<SupportedMarkets onSelectSymbol={launchDashboard} />



                {/* LIVE STATS */}
                <motion.div
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: 30,
                    },

                    visible: {
                      opacity: 1,
                      y: 0,
                    },
                  }}
                  className="
                mt-8
  grid
  grid-cols-3
  gap-2

  sm:mt-10
  sm:flex
  sm:gap-8

  lg:mt-16
          "
                >
                  {[
                    ["50+", "Market Assets"],
                    ["Live", "Market Tracking"],
                    ["Real-Time", "Heatmaps"],
                  ].map(([value, label]) => (
                    <div key={label}>
                      <h3
                        className="
                  text-lg
                  font-bold
                  text-emerald-400
                  sm:text-2xl
                "
                      >
                        {value}
                      </h3>

                      <p className=" mt-1
  text-[9px]
  leading-4
  text-slate-600
  sm:text-xs">{label}</p>
                    </div>
                  ))}
                </motion.div>
                <p
                  className="
                    mt-5
                    text-[12px]
                    font-semibold
                    text-gray-500 pb-2
    "
                >
                  No signup required • Instant market access
                </p>
              </motion.div>

              {/* RIGHT SIDE */}

              <motion.div
                className="relative hidden lg:block"
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* GLOW */}
                <div
                  className="
                  absolute
                  inset-0
                  rounded-[40px]
                  bg-gradient-to-r
                from-emerald-500/10
                to-teal-500/10
                blur-3xl
              "
                />

                {/* DASHBOARD preview */}
                <div
                  className="
                  relative
                  overflow-hidden
                  rounded-[32px]
                  border border-white/10         
                  bg-white/[0.04]
                  max-h-[240px]
                  sm:max-h-[320px]
                  lg:max-h-[520px]
                  p-5
                  shadow-[0_0_30px_rgba(16,185,129,0.22)]
                  hover:scale-[1.01]
                  transition-all duration-500
                  backdrop-blur-xl
              "
                >
                  <img
                    src={heroImage}
                    alt="dashboard"
                    className="
                        rounded-2xl
                        object-cover
                        w-full
                        h-full        
                  "
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>



    

        {/* FEATURE STRIP */}
        <div
          className="
              mx-auto    
              max-w-[1400px] 
              
              pb-10
          "
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: {},

              visible: {
                transition: {
                  staggerChildren: 0.12,
                },
              },
            }}
            className="
              mt-4
              grid
              grid-cols-2
              xl:grid-cols-5    
              overflow-hidden 
              border border-white/10  
              bg-white/[0.03]
              backdrop-blur-xl  
      "
          >
            {[
              {
                icon: "📈",
                title: "Interactive Charts",
                desc: "Advanced charting tools with multiple indicators",
              },
              {
                icon: "🟩",
                title: "Live Heatmaps",
                desc: "Market movements at a glance with visual heatmaps",
              },
              {
                icon: "₿",
                title: "Crypto Tracking",
                desc: "Track major cryptocurrencies in real-time",
              },
              {
                icon: "📰",
                title: "Market News",
                desc: "Latest financial news and market insights",
              },
              {
                icon: "📊",
                title: "Portfolio Analytics",
                desc: "Performance tracking and detailed analytics",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 14,
                    scale: 0.985,
                  },

                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  },
                }}
                transition={{
                  duration: 0.45,
                  ease: "easeOut",
                }}
                className={`
                    relative
                    flex-1
                    flex
                    items-start
                    gap-4    
                    p-3
                    min-h-[120px]
                    lg:px-6
                    w-full
                    sm:w-auto
                    hover:bg-white/[0.03]
                    hover:shadow-[0_0_20px_rgba(16,1  85,129,0.08)]
                    transition-all duration-300
                    border-r border-white/10
                    transform-gpu

            ${index !== 4 ? "xl:border-r xl:border-white/10" : ""}

            xl:pr-6
          `}
              >
                {/* ICON */}
                <motion.div
                  animate={{
                    scale: [1, 1.06, 1],
                    opacity: [0.9, 1, 0.9],
                  }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="
                    relative
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-2xl
                    bg-emerald-400/25
                    p-4
                    text-lg
                    shadow-[0_0_18px_rgba(16,185,129,0.12)]
                    transform-gpu
                    will-change-transform
    "
                >
                  {feature.icon}
                </motion.div>

                <div>
                  {/* TITLE */}
                  <h3
                    className="
              text-sm
              font-bold
              text-emerald-300
            "
                  >
                    {feature.title}
                  </h3>

                  {/* DESC */}
                  <p
                    className="
              mt-1
              leading-5
              text-gray-400
              text-[11px]
              line-clamp-2
            "
                  >
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    );
  };
