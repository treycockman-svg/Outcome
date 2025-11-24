"use client";

import { motion } from "framer-motion";

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
  compact?: boolean;
}

/**
 * SectionTitle
 * Reusable marketing section heading.
 * Light mode = blue accents, dark mode = orange accents.
 */
export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className = "",
  compact = false,
}: SectionTitleProps) {
  const alignCls =
    align === "left"
      ? "text-left items-start"
      : align === "right"
      ? "text-right items-end"
      : "text-center items-center";

  return (
    <div
      className={`w-full flex flex-col ${alignCls} ${
        compact ? "gap-2" : "gap-3"
      } ${className}`}
    >
      {eyebrow && (
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="text-xs font-semibold tracking-widest uppercase text-blue-600 dark:text-orange-300"
        >
          {eyebrow}
        </motion.p>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className={`font-semibold tracking-tight text-black dark:text-white ${
          compact ? "text-2xl md:text-3xl" : "text-3xl md:text-4xl"
        }`}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.05 }}
          className={`max-w-2xl text-sm md:text-base leading-relaxed text-black/70 dark:text-white/70`}
        >
          {subtitle}
        </motion.p>
      )}

      {/* Accent underline */}
      <div
        className={`h-[2px] rounded-full bg-gradient-to-r from-blue-500/70 via-blue-300/50 to-transparent dark:from-orange-500/70 dark:via-yellow-400/50 dark:to-transparent ${
          align === "center"
            ? "w-44"
            : align === "left"
            ? "w-40"
            : "w-40 ml-auto"
        }`}
      />
    </div>
  );
}
