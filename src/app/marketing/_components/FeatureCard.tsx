"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  badge?: string;
  index?: number;
}

export default function FeatureCard({
  title,
  description,
  icon,
  badge,
  index = 0,
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md p-6 shadow-sm hover:shadow-md transition"
    >
      {/* Accent glow */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300">
        <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full blur-3xl bg-blue-500/20 dark:bg-orange-500/20" />
        <div className="absolute -bottom-24 -left-24 h-56 w-56 rounded-full blur-3xl bg-blue-300/20 dark:bg-yellow-400/20" />
      </div>

      <div className="relative z-10 flex items-start gap-4">
        {icon && (
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-black dark:text-white">
            {icon}
          </div>
        )}

        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-semibold text-black dark:text-white tracking-tight truncate">
              {title}
            </h3>

            {badge && (
              <span className="text-[11px] px-2 py-0.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-700 dark:border-orange-500/30 dark:bg-orange-500/10 dark:text-orange-200">
                {badge}
              </span>
            )}
          </div>

          <p className="text-sm leading-relaxed text-black/70 dark:text-white/70">
            {description}
          </p>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="mt-5 h-[2px] w-full rounded-full bg-gradient-to-r from-blue-500/60 via-blue-300/40 to-transparent dark:from-orange-500/60 dark:via-yellow-400/40 dark:to-transparent" />
    </motion.div>
  );
}
