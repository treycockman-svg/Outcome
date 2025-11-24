"use client";

import { motion } from "framer-motion";

interface NeonDividerProps {
  label?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

/**
 * NeonDivider
 * Simple glowing section divider for the marketing site.
 * Light mode = blue glow, dark mode = orange/yellow glow.
 */
export default function NeonDivider({
  label,
  align = "center",
  className = "",
}: NeonDividerProps) {
  const justify =
    align === "left"
      ? "justify-start"
      : align === "right"
      ? "justify-end"
      : "justify-center";

  return (
    <div className={`w-full flex ${justify} ${className}`}>
      <div className="relative w-full max-w-5xl py-6">
        {/* Base line */}
        <div className="h-px w-full bg-black/10 dark:bg-white/10" />

        {/* Glow line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0.7 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(59,130,246,0.9), rgba(147,197,253,0.9), transparent)",
          }}
        />

        {/* Dark mode glow override */}
        <div
          className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] w-full hidden dark:block"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(249,115,22,0.95), rgba(250,204,21,0.95), transparent)",
          }}
        />

        {/* Soft bloom */}
        <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 h-6 blur-2xl opacity-40 bg-blue-500 dark:bg-orange-500" />

        {/* Optional label pill */}
        {label && (
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 px-3 py-1 rounded-full border border-black/10 dark:border-white/10 bg-white/80 dark:bg-black/60 backdrop-blur text-xs font-medium text-black/70 dark:text-white/70">
            {label}
          </div>
        )}
      </div>
    </div>
  );
}
