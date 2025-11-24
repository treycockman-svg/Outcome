"use client";

import { motion } from "framer-motion";

interface TestimonialCardProps {
  quote: string;
  name: string;
  role?: string;
  avatarUrl?: string;
  rating?: number; // 1-5
  company?: string;
  index?: number;
}

function Star({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={`h-4 w-4 ${filled ? "text-blue-600 dark:text-orange-300" : "text-black/20 dark:text-white/20"}`}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M10 1.6 12.6 6.9l5.8.8-4.2 4.1 1 5.8L10 14.9 4.8 17.6l1-5.8L1.6 7.7l5.8-.8L10 1.6z" />
    </svg>
  );
}

export default function TestimonialCard({
  quote,
  name,
  role,
  avatarUrl,
  rating = 5,
  company,
  index = 0,
}: TestimonialCardProps) {
  const stars = Array.from({ length: 5 }, (_, i) => i < rating);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: "easeOut", delay: index * 0.06 }}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md p-6 shadow-sm hover:shadow-md transition"
    >
      {/* Glow */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300">
        <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full blur-3xl bg-blue-500/20 dark:bg-orange-500/20" />
        <div className="absolute -bottom-24 -left-24 h-56 w-56 rounded-full blur-3xl bg-blue-300/20 dark:bg-yellow-400/20" />
      </div>

      <div className="relative z-10">
        {/* Stars */}
        <div className="flex items-center gap-1 mb-3">
          {stars.map((filled, i) => (
            <Star key={i} filled={filled} />
          ))}
        </div>

        {/* Quote */}
        <p className="text-base leading-relaxed text-black/80 dark:text-white/80">
          “{quote}”
        </p>

        {/* Footer */}
        <div className="mt-5 flex items-center gap-3">
          <div className="h-10 w-10 rounded-full overflow-hidden border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 flex items-center justify-center">
            {avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={avatarUrl}
                alt={name}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-sm font-semibold text-black/70 dark:text-white/70">
                {name.slice(0, 1).toUpperCase()}
              </span>
            )}
          </div>

          <div className="min-w-0">
            <p className="text-sm font-semibold text-black dark:text-white truncate">
              {name}
            </p>
            <p className="text-xs text-black/60 dark:text-white/60 truncate">
              {role}{company ? (role ? ` · ${company}` : company) : ""}
            </p>
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="mt-5 h-[2px] w-full rounded-full bg-gradient-to-r from-blue-500/60 via-blue-300/40 to-transparent dark:from-orange-500/60 dark:via-yellow-400/40 dark:to-transparent" />
      </div>
    </motion.div>
  );
}
