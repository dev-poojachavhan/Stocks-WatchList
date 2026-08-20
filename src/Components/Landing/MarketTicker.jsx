import { motion } from "framer-motion";

export const MarketTicker = () => {
  const messages = [
    " Live Market Feed Active",
    "Data refreshes periodically on free-tier APIs",
    "Search results may take a few moments during sync cycles",
    "Track stocks, crypto & market news in real time",
  ];

  return (
    <div
      className="
        fixed top-0 left-0 z-50
        w-full
        overflow-hidden
        border-b border-white/10
        bg-black/60
        backdrop-blur-xl
      "
    >
      <motion.div
        className="
          flex
          gap-8
          whitespace-nowrap
          py-1.5
           sm:gap-12
          sm:py-2
        "
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "linear",
        }}
      >
        {[...messages, ...messages].map((item, index) => (
          <div
            key={index}
            className="
                flex
                items-center
                gap-2
                text-[12px]
                text-gray-300
                shrink-0
                sm:text-sm
                 sm:gap-3
              "
          >
            <div
              className="
                  h-2 w-2
                  rounded-full
                  bg-emerald-400
                  animate-pulse
                "
            />

            <span>{item}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
