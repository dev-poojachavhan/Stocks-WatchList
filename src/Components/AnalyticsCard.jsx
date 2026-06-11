import { motion } from "framer-motion";

export const AnalyticsCard = ({
  label,
  value,
  subValue,
  positive,
  negative,
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      whileHover={{
        y: -2,
        scale: 1.01,
      }}
      transition={{
        type: "spring",
        stiffness: 320,
        damping: 24,
      }}
      className="
          group
          relative
          overflow-hidden
          min-w-[125px]
          rounded-2xl
          border
          border-[var(--surface-border)]
          bg-[var(--surface-glass)]
          px-4
          py-3.5
          backdrop-blur-xl
          shadow-[var(--card-shadow)]
          hover:border-emerald-400/20
          hover:shadow-[0_0_20px_rgba(16,185,129,0.04)]
          "
    >
      <div
        className="
          absolute
          inset-0
          opacity-0
          group-hover:opacity-100
          transition-opacity
          duration-500
          pointer-events-none
          bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.08),transparent_55%)]
        "
      />

      <p
        className="
          text-xs
          text-[var(--text-soft)]
        "
      >
        {label}
      </p>

      <p
        className="
          mt-1
          text-lg
          font-semibold
          text-[var(--text)]
          tracking-tight
                  "
      >
        {value}
      </p>

      {subValue && (
        <p
          className={`
            text-xs mt-1
            ${positive ? "text-emerald-300" : ""}
            ${negative ? "text-red-400" : ""}
          `}
        >
          {subValue}
        </p>
      )}
    </motion.div>
  );
};
