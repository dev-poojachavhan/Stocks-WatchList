import { MarketTicker } from "../components/landing/MarketTicker";
import { motion } from "framer-motion";
import heroImage from "../assets/dashboard-preview.jpg";

export const LandingPage = () => {
  return (
    <div
      className="
        
       bg-[#050816]
        text-white
        pb-10
        bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)]
bg-[size:80px_80px]
      "
    >
      <MarketTicker />

      <div className="pt-22">
        <div
          className="
    relative
    overflow-hidden

    
    px-6
    pt-3
    h-[620px]

  "
        >
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
            className="
      relative z-10
      
      mx-auto
      max-w-[1400px]

      grid
      items-center
      gap-20
      min-h-[420px]
      lg:grid-cols-2
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
          text-3xl
          font-black
          leading-[0.92]

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

          text-md
          leading-6
          text-gray-400
        "
              >
                Track stocks, crypto, heatmaps, and market news in one modern
                trading dashboard experience.
              </motion.p>
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
          mt-14
          focus-within:
shadow-[0_0_25px_rgba(16,185,129,0.15)]
          flex
          items-center
          gap-4

          rounded-2xl
          border border-white/15

          bg-white/[0.06]
          max-w-[550px]
          p-2
          hover:border-emerald-400
transition-all duration-200

          backdrop-blur-xl
        "
              >
                <input
                  type="text"
                  placeholder="Search AAPL, TSLA, BTC/USD..."
                  className="
            flex-1
            bg-transparent

            px-4
            

            text-md
            text-white

            outline-none

            placeholder:text-gray-500
            focus:ring-emerald-400/40
focus:border-emerald-400
          "
                />

                <button
                  className="
            rounded-xl

           bg-emerald-500
          hover:bg-emerald-400
            px-6
            py-2

            font-semibold
            text-black

            transition
            shadow-[0_0_25px_rgba(16,185,129,0.28)]
            hover:scale-105
          "
                >
                  <span className="flex items-center gap-2">
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
                className="mt-3 text-sm text-gray-500"
              >
                Search any stock or crypto symbol to launch your dashboard
              </motion.p>
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
          mt-12
          p-1
          flex
          flex-wrap
          gap-8
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
                text-2xl
                font-bold
                text-emerald-400
              "
                    >
                      {value}
                    </h3>

                    <p className="text-gray-500">{label}</p>
                  </div>
                ))}
              </motion.div>
              <p
                className="
    mt-5
    text-[10px]
    font-semibold
    text-gray-500 pb-2
  "
              >
                No signup required • Instant market access
              </p>
            </motion.div>

            {/* RIGHT SIDE */}
            <motion.div
              className="relative"
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

              {/* DASHBOARD MOCKUP */}
              <div
                className="
          relative

          overflow-hidden

          rounded-[32px]
          border border-white/10
          
          bg-white/[0.04]
         max-h-[520px]
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

    
    -mt-40
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
     
      mt-14

    flex
      
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

      px-6
      py-3

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
    h-10
    w-10
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
            leading-6
            text-gray-400
            text-[12px]
          "
                >
                  {feature.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
