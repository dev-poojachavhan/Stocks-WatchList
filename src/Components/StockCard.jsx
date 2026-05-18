import { useContext, useEffect,useRef,useState } from "react";
import { WatchlistContext } from "../context/WatchlistContext";
import { SparklineChart } from "../Components/SparklineChart";
import { motion } from "framer-motion";
import { FiStar } from "react-icons/fi";

export const StockCard = ({ stock, onClick, isActive }) => {

  const { removeStock,togglePin  } = useContext(WatchlistContext);
  const isPositive = stock.percent_change >= 0;

  const price = Number(stock.price);
  const percent = Number(stock.percent_change);

  const previousPrice = useRef(stock.price);

const [flash, setFlash] = useState("");

  const sparklineData = stock.sparkline || [];

  useEffect(() => {
  if (
    previousPrice.current <
    stock.price
  ) {
    setFlash("green");
  }

  else if (
    previousPrice.current >
    stock.price
  ) {
    setFlash("red");
  }

  previousPrice.current =
    stock.price;

  const timer = setTimeout(() => {
    setFlash("");
  }, 700);

  return () => clearTimeout(timer);

}, [stock.price]);  

  return (
    <motion.div
      layout

      initial={{
        opacity: 0,
        y:20,
      }}

      animate={{
        opacity: 1,
        y: 0,
        boxShadow:
       flash === "green"
      ? "0 0 20px rgba(34,197,94,0.18)"
      : flash === "red"
      ? "0 0 20px rgba(239,68,68,0.18)"
      : "0 0 0px rgba(0,0,0,0)",
      }}

      exit={{
        opacity: 0,
        scale: 0.08,
      }}

      whileHover={{
        y: -4,
        scale: 1.01,
      }}
      whileTap={{
        scale: 0.98,
      }}
      
     
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        boxShadow: {
        duration: 0.35,
        },

       scale: {
       duration: 0.2,
        },
      }}
     
      onClick={onClick}
      className={`relative group p-5 rounded-xl cursor-pointer transition-all duration-300
  border h-[115px] relative

  bg-white border-gray-200 shadow-sm
  hover:shadow-md hover:-translate-y-[2px]

  dark:bg-white/[0.04] dark:border-white/20 dark:shadow-none dark:hover:bg-white/[0.07]

${
  isActive
    ? `
      !bg-cyan-500/10
      !border-cyan-400/50

      shadow-[0_0_30px_rgba(34,211,238,0.18)]

      scale-[1.01]
    `
    : ""
}
`}
    >
      <button
  onClick={(e) => {
    e.stopPropagation();

    togglePin(stock.symbol);
  }}

  className="
    absolute
    top-3
    right-7
    z-20
  "
>
  <FiStar
    className={`
      transition

      ${
        stock.pinned
          ? "fill-yellow-400 text-yellow-400"
          : "text-gray-500"
      }
    `}
  />
</button>
      {/* ❌ Remove Button */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // 🔥 IMPORTANT
          removeStock(stock.symbol);
        }}
        className="absolute top-2 right-2 z-10 text-red-400 opacity-0 group-hover:opacity-100 transition"
      >
        ✕
      </button>

      <div className="flex items-center justify-between ">
        {/* LEFT SIDE */}
        <div>
          <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            {stock.symbol}
          </h2>

          <p className="text-lg font-medium text-gray-900 dark:text-white">
            {stock.currency === "USD" ? "$" : "₹"}
            {price.toFixed(2)}
          </p>

          <p className={isPositive ? "text-green-400" : "text-red-400"}>
            {percent.toFixed(2)}%
          </p>
        </div >

        {/* RIGHT SIDE */}
        <div className="w-[160px]">
        <SparklineChart data={sparklineData} isPositive={isPositive} /></div>
      </div>

     
    </motion.div>
  );
};
