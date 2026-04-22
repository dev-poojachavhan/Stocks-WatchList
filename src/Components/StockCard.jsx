export const StockCard = ({ stock, onClick }) => {
  const price = Number(stock.price);
  const percent = Number(stock.percent_change);

  return (
    <div
      onClick={onClick}
      
      className="p-4 bg-gray-800 rounded text-white">
      <h2 className="text-lg font-semibold">{stock.symbol}</h2>

      <p>
        {stock.currency === "USD" ? "$" : "₹"} {price.toFixed(2)}
      </p>

      <p className={percent > 0 ? "text-green-400" : "text-red-400"}>
        {percent.toFixed(2)}%
      </p>
    </div>
  );
};
