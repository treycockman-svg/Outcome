"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

interface StreakHabit {
  id: string;
  title: string;
  streak: number;      // current streak days
  best: number;        // best streak days
  completedToday: boolean;
  last7: boolean[];    // last 7 days completion (oldest -> newest)
}

const defaultHabits: StreakHabit[] = [
  {
    id: "h1",
    title: "Gym / Training",
    streak: 6,
    best: 18,
    completedToday: false,
    last7: [true, true, true, false, true, true, false],
  },
  {
    id: "h2",
    title: "Deep Work",
    streak: 4,
    best: 12,
    completedToday: true,
    last7: [true, false, true, true, true, false, true],
  },
  {
    id: "h3",
    title: "Morning Routine",
    streak: 9,
    best: 21,
    completedToday: true,
    last7: [true, true, true, true, true, true, true],
  },
];

function weekdayLabels() {
  // small labels for last 7 days
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  return days;
}

export default function OutcomeStreaks() {
  const [habits, setHabits] = useState<StreakHabit[]>(defaultHabits);

  const totals = useMemo(() => {
    const current = habits.reduce((a, h) => a + h.streak, 0);
    const best = habits.reduce((a, h) => a + h.best, 0);
    const doneToday = habits.filter((h) => h.completedToday).length;
    const pctToday = habits.length === 0 ? 0 : (doneToday / habits.length) * 100;
    return { current, best, doneToday, pctToday };
  }, [habits]);

  function toggleToday(id: string) {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id !== id) return h;
        const completedToday = !h.completedToday;

        // update streak logic (simple local mock)
        let streak = h.streak;
        let best = h.best;
        if (completedToday) {
          streak = h.streak + 1;
          best = Math.max(best, streak);
        } else {
          // undo today completion: roll back streak by 1 but not below 0
          streak = Math.max(0, h.streak - 1);
        }

        const last7 = [...h.last7];
        last7[last7.length - 1] = completedToday;

        return { ...h, completedToday, streak, best, last7 };
      })
    );
  }

  const days = weekdayLabels();

  return (
    <div className="w-full rounded-xl bg-black/20 dark:bg-white/5 p-6 backdrop-blur-md border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white tracking-tight">
          Outcome Streaks
        </h2>
        <div className="text-sm text-white/60">
          {totals.doneToday}/{habits.length} done today
        </div>
      </div>

      {/* Overall streak summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        <div className="rounded-lg bg-white/5 border border-white/10 p-3">
          <p className="text-[11px] text-white/50">Total Current Streak</p>
          <p className="text-white font-semibold mt-1">{totals.current} days</p>
        </div>
        <div className="rounded-lg bg-white/5 border border-white/10 p-3">
          <p className="text-[11px] text-white/50">Total Best Streak</p>
          <p className="text-white font-semibold mt-1">{totals.best} days</p>
        </div>
        <div className="rounded-lg bg-white/5 border border-white/10 p-3">
          <p className="text-[11px] text-white/50">Today Completion</p>
          <p className="text-white font-semibold mt-1">
            {Math.round(totals.pctToday)}%
          </p>
        </div>
        <div className="rounded-lg bg-white/5 border border-white/10 p-3">
          <p className="text-[11px] text-white/50">Active Habits</p>
          <p className="text-white font-semibold mt-1">{habits.length}</p>
        </div>
      </div>

      {/* Today progress bar */}
      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-5">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${totals.pctToday}%` }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-blue-500 to-blue-300 dark:from-orange-500 dark:to-yellow-400"
        />
      </div>

      {/* Habits list */}
      <div className="space-y-3">
        {habits.map((h) => (
          <div
            key={h.id}
            className="rounded-lg border border-white/10 bg-white/5 px-4 py-3"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-white font-medium truncate">{h.title}</p>
                <div className="flex items-center gap-3 mt-1 text-xs text-white/60">
                  <span>Current: {h.streak}d</span>
                  <span>Best: {h.best}d</span>
                </div>
              </div>

              <button
                onClick={() => toggleToday(h.id)}
                className={`h-9 px-4 rounded-md text-sm font-medium transition border ${
                  h.completedToday
                    ? "bg-blue-500/80 border-blue-400/50 text-white dark:bg-orange-500/80 dark:border-orange-400/50"
                    : "bg-white/5 border-white/10 text-white/90 hover:bg-white/10"
                }`}
              >
                {h.completedToday ? "Done" : "Mark Done"}
              </button>
            </div>

            {/* last 7 days mini heatmap */}
            <div className="mt-3 flex items-center gap-2">
              {days.map((d, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div
                    className={`h-3 w-3 rounded-sm border ${
                      h.last7[i]
                        ? "bg-blue-500/70 border-blue-300/60 dark:bg-orange-500/70 dark:border-orange-300/60"
                        : "bg-white/5 border-white/10"
                    }`}
                  />
                  <span className="text-[10px] text-white/40">{d}</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {habits.length === 0 && (
          <div className="text-white/60 text-sm py-6 text-center">
            No streak habits yet.
          </div>
        )}
      </div>
    </div>
  );
}
