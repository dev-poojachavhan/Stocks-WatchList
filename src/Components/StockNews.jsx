import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import { fetchStockNews } from "../services/newsApi";
import { useContext } from "react";
import { WatchlistContext } from "../context/WatchlistContext";
import { Shimmer } from "./LoadingShimmer/Shimmer";

export const StockNews = ({ symbol }) => {
  const [news, setNews] = useState([]);

  const { loadingMap, startLoading, stopLoading } =
    useContext(WatchlistContext);

  useEffect(() => {
    if (!symbol) return;

    const loadNews = async () => {
      try {
        startLoading("news");

        const data = await fetchStockNews(symbol);

        setNews(data);
      } catch (err) {
        console.error("News fetch error:", err);
      } finally {
        stopLoading("news");
      }
    };
    loadNews();
  }, [symbol]);

  return (
    <div
      className="w-full
            rounded-3xl
            border
            border border-[var(--surface-border)]
            bg-[var(--surface-panel)]
            shadow-[var(--surface-shadow)]
            backdrop-blur-xl
            p-4 lg:p-6"
    >
      {/* HEADER */}

      <div className="mb-4 lg:mb-6">
        <h2 className="text-xl lg:text-2xl font-bold text-[var(--text)]">
          Market News
        </h2>

        <p className="text-[var(--text-muted)] mt-2">
          Trending market stories & stock coverage
        </p>
      </div>

      {/* LOADING */}
      {loadingMap.news && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Shimmer key={i} className="h-[130px]" />
          ))}
        </div>
      )}

      {/* NEWS LIST */}
      <div className="space-y-4 max-h-none  lg:max-h-[520px] overflow-visible lg:overflow-y-auto lg:  pr-3 shadow-[var(--card-shadow)]">
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
              scale: 1,
            }}
            transition={{
              delay: index * 0.09,
            }}
            className="
              flex flex-col
              lg:flex-row
              items-stretch
              min-h-[130px]
              rounded-2xl
              border border-[var(--surface-border)]
              bg-[var(--surface-glass)]
              hover:bg-white/[0.05]
              hover:border-emerald-400/20
              overflow-hidden
              "
          >
            {/* IMAGE */}
            {item.image_url && (
              <img
                src={item.image_url}
                alt={item.title}
                className="
                 lg:w-[190px]
                 lg:min-h-[145px]
                 w-full
                 h-[130px]
                sm:h-[150px]
                lg:h-[180px]
                 object-cover
                 rounded-t-2xl
                 lg:rounded-t-none
                 lg:rounded-l-2xl
                 flex-shrink-0"
              />
            )}

            {/* CONTENT */}
            <div
              className="flex-1 p-4 lg:p-5 flex
                   flex-col
                   justify-between"
            >
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
                   text-[var(--text)]
                   leading-5 lg:leading-6
                   line-clamp-3
                   lg:line-clamp-2
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
                    text-[var(--text-muted)]
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
