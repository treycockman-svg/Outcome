"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface PricingCardProps {
  name: string;
  price: string;
  period?: string; // e.g. "/mo"
  description?: string;
  features: string[];
  ctaLabel?: string;
  onCtaClick?: () => void;
  popular?: boolean;
  badge?: string; // e.g. "Most Popular"
  icon?: ReactNode;
  index?: number;
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-4 w-4 shrink-0"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M7.7 13.3 4.9 10.5l-1.1 1.1 3.9 3.9L16.2 7l-1.1-1.1z" />
    </svg>
  );
}

export default function PricingCard({
  name,
  price,
  period = "/mo",
  description,
  features,
  ctaLabel = "Get Started",
  onCtaClick,
  popular = false,
  badge,
  icon,
  index = 0,
}: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: "easeOut", delay: index * 0.06 }}
      whileHover={{ y: -4 }}
      className={`relative overflow-hidden rounded-2xl border backdrop-blur-md p-6 shadow-sm transition
        ${
          popular
            ? "border-blue-500/50 bg-blue-500/10 dark:border-orange-500/50 dark:bg-orange-500/10"
            : "border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5"
        }`}
    >
      {/* Corner glow */}
      <div className="pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full blur-3xl bg-blue-500/20 dark:bg-orange-500/20" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full blur-3xl bg-blue-300/20 dark:bg-yellow-400/20" />

      {/* Badge */}
      {(popular || badge) && (
        <div className="absolute top-4 right-4 text-[11px] px-2 py-0.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-700 dark:border-orange-500/30 dark:bg-orange-500/10 dark:text-orange-200">
          {badge || "Most Popular"}
        </div>
      )}

      <div className="relative z-10 flex items-start gap-3">
        {icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-black dark:text-white">
            {icon}
          </div>
        )}

        <div className="min-w-0">
          <h3 className="text-lg font-semibold text-black dark:text-white tracking-tight">
            {name}
          </h3>
          {description && (
            <p className="mt-1 text-sm text-black/70 dark:text-white/70">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Price */}
      <div className="relative z-10 mt-5 flex items-end gap-2">
        <p className="text-3xl font-semibold text-black dark:text-white">
          {price}
        </p>
        <p className="text-sm text-black/60 dark:text-white/60 pb-1">
          {period}
        </p>
      </div>

      {/* Features */}
      <ul className="relative z-10 mt-5 space-y-2">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2 text-sm">
            <span className="mt-0.5 text-blue-600 dark:text-orange-300">
              <CheckIcon />
            </span>
            <span className="text-black/80 dark:text-white/80">{f}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="relative z-10 mt-6">
        <button
          onClick={onCtaClick}
          className={`w-full rounded-md px-4 py-2 text-sm font-medium transition border
            ${
              popular
                ? "bg-blue-600 text-white border-blue-500/50 hover:bg-blue-700 dark:bg-orange-500 dark:border-orange-400/60 dark:hover:bg-orange-600"
                : "bg-black text-white border-black/20 hover:bg-black/90 dark:bg-white/10 dark:text-white dark:border-white/15 dark:hover:bg-white/15"
            }`}
        >
          {ctaLabel}
        </button>

        <p className="mt-2 text-[11px] text-black/50 dark:text-white/45 text-center">
          Cancel anytime · Upgrade/downgrade whenever
        </p>
      </div>

      {/* Bottom line */}
      <div className="relative z-10 mt-5 h-[2px] w-full rounded-full bg-gradient-to-r from-blue-500/60 via-blue-300/40 to-transparent dark:from-orange-500/60 dark:via-yellow-400/40 dark:to-transparent" />
    </motion.div>
  );
}
