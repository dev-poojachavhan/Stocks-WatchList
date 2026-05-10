import { useContext } from "react";
import { WatchlistContext } from "../context/WatchlistContext";


export const StockCard = ({ stock, onClick,isActive  }) => {

  const { removeStock } = useContext(WatchlistContext);
  const isPositive = stock.percent_change >= 0;

  const price = Number(stock.price);
  const percent = Number(stock.percent_change);

  return (
    <div
      onClick={onClick}
      className={`relative group p-4 rounded-xl cursor-pointer transition-all duration-300
  border

  bg-white border-gray-200 shadow-sm
  hover:shadow-md hover:-translate-y-[2px]

  dark:bg-white/[0.04] dark:border-white/10 dark:shadow-none dark:hover:bg-white/[0.06]

  ${isActive ? "ring-1 ring-gray-400 dark:ring-white/20" : ""}
`}>
      
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


      <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-200">{stock.symbol}</h2>

      <p className="text-lg font-medium text-gray-900 dark:text-white">
        {stock.currency === "USD" ? "$" : "₹"} {price.toFixed(2)}
      </p>

      <p className={isPositive ? "text-green-400" : "text-red-400"}>  
        {percent.toFixed(2)}%
      </p>

      <div className="absolute top-8 left-1/2 -translate-x-1/2 
  opacity-0 group-hover:opacity-100 z-10
 translate-y-2 group-hover:translate-y-0 duration-300
  bg-black text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap">

  Click to view chart 📊
</div>
    </div>
  );
};
