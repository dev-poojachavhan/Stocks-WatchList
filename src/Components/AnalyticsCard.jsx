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
  y: -3,
  scale: 1.02,
}}

transition={{
  type: "spring",
  stiffness: 260,
  damping: 18,
}}
      className="
        min-w-[120px]
        rounded-2xl
        border
        border-white/10

        bg-white/[0.04]

        px-4 py-3

        backdrop-blur-md
      "
    >

      <p
        className="
          text-xs
          text-gray-400
        "
      >
        {label}
      </p>

      <p
        className="
          mt-1
          text-lg
          font-bold
        "
      >
        {value}
      </p>

      {subValue && (
        <p
          className={`
            text-xs mt-1

            ${
              positive
                ? "text-green-400"
                : ""
            }

            ${
              negative
                ? "text-red-400"
                : ""
            }
          `}
        >
          {subValue}
        </p>
      )}

    </motion.div>
  );
};