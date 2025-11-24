"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-black dark:from-[#050507] dark:via-[#050507] dark:to-black 
                      bg-white dark:bg-[#050507]" />

      {/* Accent glow blobs */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-80 w-80 rounded-full bg-[#4ED2FF]/30 blur-3xl dark:hidden" />
      <div className="pointer-events-none absolute -bottom-40 -left-20 h-80 w-80 rounded-full bg-[#FF7E2E]/25 blur-3xl hidden dark:block" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 py-24 text-center sm:px-6 lg:px-8 lg:py-28">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/70 px-3 py-1 text-xs font-medium text-slate-700 shadow-sm backdrop-blur
                     dark:border-slate-700/80 dark:bg-slate-900/70 dark:text-slate-200"
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#4ED2FF] dark:bg-[#FF7E2E]" />
          Personal Operating System for Your Dream Life
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="max-w-3xl text-balance text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl md:text-6xl
                     dark:text-slate-50"
        >
          Build your{" "}
          <span className="bg-gradient-to-r from-[#4ED2FF] via-[#4ED2FF] to-[#1A8CFF] bg-clip-text text-transparent dark:from-[#FF7E2E] dark:via-[#FF9A4B] dark:to-[#FFB86C]">
            future like a billionaire
          </span>
          , one outcome at a time.
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.12 }}
          className="mt-5 max-w-2xl text-balance text-sm text-slate-600 sm:text-base md:text-lg
                     dark:text-slate-300"
        >
          OUTCOME turns your goals into a live dashboard. Track every rep, dollar, and decision — with an interface that
          feels like your own personal Jarvis.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <button
            className="inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-medium
                       text-white shadow-lg shadow-[#4ED2FF]/40 transition
                       bg-gradient-to-r from-[#4ED2FF] to-[#1A8CFF] hover:brightness-110
                       dark:from-[#FF7E2E] dark:to-[#FF9A4B] dark:shadow-[#FF7E2E]/40"
          >
            Get started in 60 seconds
          </button>

          <button
            className="inline-flex items-center justify-center rounded-full border border-slate-200/80 bg-white/70 px-5 py-2.5 text-sm font-medium
                       text-slate-800 backdrop-blur hover:bg-slate-100
                       dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:bg-slate-800/80"
          >
            Watch how it works
          </button>
        </motion.div>

        {/* Glass card + stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.28 }}
          className="mt-12 w-full max-w-4xl"
        >
          <div
            className="mx-auto flex flex-col gap-6 rounded-2xl border border-slate-200/80 bg-white/70 p-5 shadow-xl shadow-slate-900/5 backdrop-blur
                       sm:flex-row sm:items-center sm:justify-between
                       dark:border-slate-800 dark:bg-slate-900/60 dark:shadow-black/40"
          >
            {/* Mini preview / tagline */}
            <div className="text-left">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                LIVE DASHBOARD
              </p>
              <p className="mt-1 text-sm text-slate-700 dark:text-slate-200">
                See your money, body, skills, and relationships in one clean, billionaire-grade dashboard.
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-5 sm:justify-end">
              <div className="text-left">
                <p className="text-xs text-slate-500 dark:text-slate-400">Users planning their future</p>
                <p className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                  3,247<span className="text-xs font-normal text-[#4ED2FF] dark:text-[#FF7E2E]">+ this month</span>
                </p>
              </div>
              <div className="h-10 w-px bg-slate-200/80 dark:bg-slate-700/70 hidden sm:block" />
              <div className="text-left">
                <p className="text-xs text-slate-500 dark:text-slate-400">Average weekly actions tracked</p>
                <p className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                  142<span className="text-xs font-normal text-slate-500 dark:text-slate-400"> per user</span>
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* “Trusted by” strip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.35 }}
          className="mt-10 w-full max-w-4xl"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-slate-500 text-center dark:text-slate-500">
            BUILT FOR
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-slate-500 dark:text-slate-400">
            <span>Founders</span>
            <span className="hidden h-1 w-1 rounded-full bg-slate-400 sm:inline-block" />
            <span>Athletes</span>
            <span className="hidden h-1 w-1 rounded-full bg-slate-400 sm:inline-block" />
            <span>Traders</span>
            <span className="hidden h-1 w-1 rounded-full bg-slate-400 sm:inline-block" />
            <span>Creators</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
