  import { useEffect, useState } from "react";

  import { motion } from "framer-motion";

  import { fetchStockNews } from "../services/newsApi";
import { useContext } from "react";
import { WatchlistContext } from "../context/WatchlistContext";
import { Shimmer } from "./LoadingShimmer/Shimmer";

  export const StockNews = ({ symbol }) => {
    const [news, setNews] = useState([]);

    const { loadingMap, startLoading, stopLoading, } = useContext(WatchlistContext)

    useEffect(() => {
      if (!symbol) return;

    const loadNews = async () => {
  try {
    startLoading("news");

    const data =
      await fetchStockNews(symbol);

    setNews(data);

  } catch (err) {

    console.error(
      "News fetch error:",
      err
    );

  } finally {

    stopLoading("news");
  }
};
      loadNews();
    }, [symbol]);

    return (
      <div className="w-full
    rounded-3xl
    border
    border border-emerald-400/20
    bg-white/[0.03]
    p-6">
        {/* HEADER */}
       
        <div className="mb-6">
  <h2 className="text-2xl font-bold text-white">
    Market News
  </h2>

  <p className="text-gray-400 mt-2">
    Trending market stories & stock coverage
  </p>
</div>

        {/* LOADING */}
        {loadingMap.news && (
  <div className="space-y-4">
    {[1,2,3].map((i) => (
      <Shimmer
        key={i}
        className="h-[130px]"
      />
    ))}
  </div>
)}

        {/* NEWS LIST */}
        <div className="space-y-4  max-h-[520px] overflow-y-auto pr-3">
          {news.map((item, index) => (
            <motion.a
              key={item.uuid}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}

              whileHover={{
              y: -6,
              scale: 1.01,
              }}

              transition={{
                delay: index * 0.08,
              }}
              className="
              flex
   items-stretch

  min-h-[130px]
    rounded-2xl
    border border-white/10

    bg-white/[0.03]

    hover:bg-white/[0.05]

    transition
              "
            >
              {/* IMAGE */}
              {item.image_url && (
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="
    w-[190px]
min-h-[145px]
object-cover
rounded-l-2xl
flex-shrink-0
   
  "
                />
              )}

              {/* CONTENT */}
              <div className="flex-1 p-5 flex
    flex-col
    justify-between">
                {/* SENTIMENT */}
                <div
                  className={`
                    inline-flex
                    w-fit
                    rounded-full
                    px-2 py-1
                    text-[10px]
                    font-medium
                    mb-3

                    ${
                      item.entities?.[0]?.sentiment_score > 0
                        ? `
                          bg-green-500/10
                          text-green-400
                        `
                        : `
                          bg-red-500/10
                          text-red-400
                        `
                    }
                  `}
                >
                  {item.entities?.[0]?.sentiment_score > 0
                    ? "Bullish"
                    : "Bearish"}
                </div>

                {/* TITLE */}
                <h4
                  className="
                    text-[15px]
                    font-semibold
                    text-white
                    leading-6
                    line-clamp-2
  "
                >
                  {item.title}
                </h4>

                {/* META */}
                <div
                  className="
                    mt-4
                    flex items-center
                    justify-between
                    
                    text-xs
                    text-gray-500
                  "
                >
                  <span>{item.source}</span>

                  <span>{new Date(item.published_at).toLocaleDateString()}</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    );
  };
