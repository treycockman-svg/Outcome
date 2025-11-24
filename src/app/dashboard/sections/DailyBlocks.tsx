"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

type BlockTag = "Routine" | "Work" | "Health" | "Social" | "Recovery";

interface DailyBlock {
  id: string;
  title: string;
  start: string; // "06:30"
  end: string;   // "08:00"
  tag: BlockTag;
  completed: boolean;
}

const defaultBlocks: DailyBlock[] = [
  { id: "1", title: "Morning Routine", start: "06:30", end: "08:00", tag: "Routine", completed: true },
  { id: "2", title: "Deep Work Sprint", start: "08:30", end: "11:00", tag: "Work", completed: false },
  { id: "3", title: "Gym / Training", start: "12:00", end: "13:30", tag: "Health", completed: false },
  { id: "4", title: "Admin / Calls", start: "14:00", end: "15:30", tag: "Work", completed: false },
  { id: "5", title: "Social / Family", start: "17:30", end: "19:00", tag: "Social", completed: false },
  { id: "6", title: "Night Review", start: "20:30", end: "21:00", tag: "Recovery", completed: false },
];

const tagStyles: Record<BlockTag, string> = {
  Routine:
    "bg-blue-500/15 text-blue-200 border-blue-500/30 dark:bg-orange-500/15 dark:text-orange-200 dark:border-orange-500/30",
  Work:
    "bg-purple-500/15 text-purple-200 border-purple-500/30 dark:bg-yellow-500/15 dark:text-yellow-200 dark:border-yellow-500/30",
  Health:
    "bg-emerald-500/15 text-emerald-200 border-emerald-500/30 dark:bg-lime-500/15 dark:text-lime-200 dark:border-lime-500/30",
  Social:
    "bg-pink-500/15 text-pink-200 border-pink-500/30 dark:bg-rose-500/15 dark:text-rose-200 dark:border-rose-500/30",
  Recovery:
    "bg-slate-500/15 text-slate-200 border-slate-500/30 dark:bg-sky-500/15 dark:text-sky-200 dark:border-sky-500/30",
};

function toMinutes(t: string) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

export default function DailyBlocks() {
  const [blocks, setBlocks] = useState<DailyBlock[]>(defaultBlocks);

  const completion = useMemo(() => {
    const total = blocks.length;
    const done = blocks.filter((b) => b.completed).length;
    const pct = total === 0 ? 0 : (done / total) * 100;
    return { total, done, pct };
  }, [blocks]);

  function toggleBlock(id: string) {
    setBlocks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, completed: !b.completed } : b))
    );
  }

  const sortedBlocks = useMemo(
    () => [...blocks].sort((a, b) => toMinutes(a.start) - toMinutes(b.start)),
    [blocks]
  );

  return (
    <div className="w-full rounded-xl bg-black/20 dark:bg-white/5 p-6 backdrop-blur-md border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white tracking-tight">
          Daily Blocks
        </h2>

        <div className="text-sm text-white/60">
          {completion.done}/{completion.total} completed
        </div>
      </div>

      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-5">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${completion.pct}%` }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-blue-500 to-blue-300 dark:from-orange-500 dark:to-yellow-400"
        />
      </div>

      <div className="space-y-3">
        {sortedBlocks.map((block) => (
          <div
            key={block.id}
            className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleBlock(block.id)}
                className={`h-5 w-5 rounded border border-white/30 flex items-center justify-center transition ${
                  block.completed
                    ? "bg-blue-500/80 dark:bg-orange-500/80"
                    : "bg-transparent"
                }`}
                aria-label="toggle complete"
              >
                {block.completed && (
                  <span className="text-white text-xs font-bold">✓</span>
                )}
              </button>

              <div>
                <div className="flex items-center gap-2">
                  <p
                    className={`text-white font-medium ${
                      block.completed ? "line-through text-white/40" : ""
                    }`}
                  >
                    {block.title}
                  </p>

                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-full border ${tagStyles[block.tag]}`}
                  >
                    {block.tag}
                  </span>
                </div>

                <p className="text-white/50 text-xs mt-0.5">
                  {block.start} – {block.end}
                </p>
              </div>
            </div>

            <div className="text-xs text-white/50">
              {toMinutes(block.end) - toMinutes(block.start)} min
            </div>
          </div>
        ))}

        {sortedBlocks.length === 0 && (
          <div className="text-white/60 text-sm py-6 text-center">
            No blocks yet.
          </div>
        )}
      </div>
    </div>
  );
}
