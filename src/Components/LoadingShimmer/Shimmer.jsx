import { motion } from "framer-motion";

export const Shimmer = ({ className = "" }) => {
  return (
    <div
      className={`
        relative
        overflow-hidden
        rounded-2xl
        border border-white/10
        bg-white/[0.03]

        ${className}
      `}
    >
      {/* SHIMMER STRIP */}
      <motion.div
        animate={{
          x: ["-100%", "220%"],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "linear",
        }}
        className="
          absolute
          inset-y-0
          left-0
          w-1/3

          bg-gradient-to-r
          from-transparent
          via-white/10
          to-transparent

          skew-x-[-20deg]
        "
      />
    </div>
  );
};
