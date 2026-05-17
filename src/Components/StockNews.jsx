import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import { fetchStockNews } from "../services/newsApi";

export const StockNews = ({ symbol }) => {
  const [news, setNews] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!symbol) return;

    const loadNews = async () => {
      setLoading(true);

      const data = await fetchStockNews(symbol);

      setNews(data);

      setLoading(false);
    };

    loadNews();
  }, [symbol]);

  return (
    <div className="min-h-screen">
      {/* HEADER */}
      <div
        className="
          flex items-center
          justify-between gap-2
          mb-1
        "
      >
        
      </div>

      {/* LOADING */}
      {loading && (
        <div className=" grid  md:grid-cols-2 xl:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="
                h-32
                rounded-xl
                bg-white/[0.03]
                animate-pulse
              "
            />
          ))}
        </div>
      )}

      {/* NEWS LIST */}
      <div className="space-y-5 h-[300px] px-5">
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
              block
              overflow-hidden
            
              rounded-2xl
              border
              border-white/10

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
                  h-28
                  w-full
                  object-cover
                "
              />
            )}

            {/* CONTENT */}
            <div className="p-4">
              {/* SENTIMENT */}
              <div
                className={`
                  inline-flex
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
                  text-sm
                  font-semibold
                  text-white
                  leading-6
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
