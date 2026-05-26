import React, { useState, useEffect, } from "react";
import { WatchlistProvider } from "./context/WatchlistContext";
import { ThemeToggle } from "./components/ThemeToggle";
import { AnimatePresence, motion } from "framer-motion";
import { Navbar } from "./components/Navbar";
import { Dashboard } from "./pages/Dashboard";
import { LandingPage } from "./pages/LandingPage";
import { Toaster } from "react-hot-toast";

function App() {
  const [showDashboard, setShowDashboard] =  useState(() => {

    return (
      localStorage.getItem(
        "showDashboard"
      ) === "true"
    );

  });
  const [isLaunching, setIsLaunching] =
  useState(false);

  const [initialSymbol, setInitialSymbol] = useState("");

   useEffect(() => {

    localStorage.setItem(
      "showDashboard",
      showDashboard
    );

  }, [showDashboard]);

   if (isLaunching) {
    return (
      <div
        className="
          flex
          min-h-screen
          items-center
          justify-center

          bg-[#050816]
          text-white
        "
      >
        <div className="text-center">

          <div
            className="
              mx-auto
              mb-6

              h-16
              w-16

              animate-spin

              rounded-full
              border-4
              border-emerald-400/20
              border-t-emerald-400
            "
          />

          <h2
            className="
              text-2xl
              font-bold
            "
          >
            Launching Dashboard...
          </h2>

          <p className="mt-3 text-gray-400">
            Preparing live market data
          </p>

        </div>
      </div>
    );
  }
  return (
    <>
      <WatchlistProvider>
        <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] ">

          <Toaster
      position="top-right"
    />
          <AnimatePresence mode="wait">
            {showDashboard ? (
              <motion.div key="dashboard"
              

                initial={{
                  opacity: 0,
                  scale: 0.98,
                }}
              
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
              
                exit={{
                  opacity: 0,
                  scale: 1.02,
                }}
              
                transition={{
                  duration: 0.45,
                  ease: "easeOut",
                }}>
                <Navbar setShowDashboard={setShowDashboard}
                   
/>
                

                <main>
                  <Dashboard initialSymbol={initialSymbol}
                    
                  />
                </main>
              </motion.div>
            ) : (
                <motion.div
                 key="landing"

                  initial={{
                    opacity: 0,
                  }}

                  animate={{
                    opacity: 1,
                  }}

                  exit={{
                    opacity: 0,
                  }}

                  transition={{
                    duration: 0.35,
                  }}>
                {/* LANDING PAGE VIEW */}
                <LandingPage
                  key="landing"
                  setShowDashboard={setShowDashboard}
                    setInitialSymbol={setInitialSymbol}
                    setIsLaunching={setIsLaunching}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </WatchlistProvider>
    </>
  );
}

export default App;
