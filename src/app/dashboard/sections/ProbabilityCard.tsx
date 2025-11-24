"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

interface ProbabilityCardProps {
  completedTasks?: number;
  totalTasks?: number;
  completedBlocks?: number;
  totalBlocks?: number;
}

/**
 * ProbabilityCard
 *
 * Small predictive widget that estimates your chance of
 * hitting today's Outcome based on task + time-block completion.
 *
 * Can later be wired to real data – for now it uses props with
 * sensible defaults so it works standalone.
 */
export default function ProbabilityCard({
  completedTasks = 7,
  totalTasks = 10,
  completedBlocks = 3,
  totalBlocks = 4,
}: ProbabilityCardProps) {
  const metrics = useMemo(() => {
    const taskRate = totalTasks === 0 ? 0 : completedTasks / totalTasks;
    const blockRate = totalBlocks === 0 ? 0 : completedBlocks / totalBlocks;

    // simple weighted formula you can tweak later
    const rawScore = taskRate * 0.6 + blockRate * 0.4;
    const probability = Math.round(rawScore * 100);

    return {
      taskRate: Math.round(taskRate * 100),
      blockRate: Math.round(blockRate * 100),
      probability: Math.min(100, Math.max(0, probability)),
    };
  }, [completedTasks, totalTasks, completedBlocks, totalBlocks]);

  const gaugeRotation = (metrics.probability / 100) * 180 - 90; // -90deg to +90deg

  return (
    <div className="w-full rounded-xl bg-black/20 dark:bg-white/5 p-6 backdrop-blur-md border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white tracking-tight">
          Today&apos;s Outcome Probability
        </h2>
        <span className="text-xs text-white/60">Live estimate</span>
      </div>

      <div className="flex flex-col md:flex-row gap-5 items-center">
        {/* Gauge */}
        <div className="relative h-32 w-32 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/10 to-white/0 border border-white/10" />

          {/* semi-circle track */}
          <div className="absolute inset-3 rounded-full border-t border-l border-r border-b-0 border-white/15" />

          {/* needle */}
          <motion.div
            initial={{ rotate: -90 }}
            animate={{ rotate: gaugeRotation }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="absolute bottom-1 left-1/2 origin-bottom h-14 w-[2px] bg-gradient-to-t from-blue-500 to-blue-300 dark:from-orange-500 dark:to-yellow-400"
          />

          <div className="relative z-10 text-center mt-6">
            <p className="text-3xl font-semibold text-white tabular-nums">
              {metrics.probability}%
            </p>
            <p className="text-[11px] text-white/50 mt-1">
              Chance you hit everything today
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex-1 w-full space-y-4">
          <div>
            <div className="flex justify-between text-xs text-white/60 mb-1">
              <span>Tasks completed</span>
              <span>
                {completedTasks}/{totalTasks} · {metrics.taskRate}%
              </span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${metrics.taskRate}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-blue-500 to-blue-300 dark:from-orange-500 dark:to-yellow-400"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs text-white/60 mb-1">
              <span>Time blocks honoured</span>
              <span>
                {completedBlocks}/{totalBlocks} · {metrics.blockRate}%
              </span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${metrics.blockRate}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-blue-500 to-blue-300 dark:from-orange-500 dark:to-yellow-400"
              />
            </div>
          </div>

          <p className="text-[11px] text-white/45">
            This estimate is based on your completion rates for tasks and
            scheduled blocks. Wire this card to real data later to make it fully
            dynamic.
          </p>
        </div>
      </div>
    </div>
  );
}
