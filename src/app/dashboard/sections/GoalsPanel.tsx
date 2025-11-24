"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

type GoalCategory = "Lifestyle" | "Wealth" | "Health" | "Social" | "Mindset";

interface Goal {
  id: string;
  title: string;
  category: GoalCategory;
  progress: number; // 0-100
  due: string; // e.g. "2026-02-01"
  priority: "Low" | "Medium" | "High";
}

const defaultGoals: Goal[] = [
  {
    id: "g1",
    title: "Get to 10% body fat",
    category: "Health",
    progress: 42,
    due: "2026-02-01",
    priority: "High",
  },
  {
    id: "g2",
    title: "Launch Outcome v2 beta",
    category: "Wealth",
    progress: 58,
    due: "2025-12-20",
    priority: "High",
  },
  {
    id: "g3",
    title: "Move into a high-rise apartment",
    category: "Lifestyle",
    progress: 25,
    due: "2026-06-01",
    priority: "Medium",
  },
];

const categoryBadge: Record<GoalCategory, string> = {
  Lifestyle:
    "bg-blue-500/15 text-blue-200 border-blue-500/30 dark:bg-orange-500/15 dark:text-orange-200 dark:border-orange-500/30",
  Wealth:
    "bg-purple-500/15 text-purple-200 border-purple-500/30 dark:bg-yellow-500/15 dark:text-yellow-200 dark:border-yellow-500/30",
  Health:
    "bg-emerald-500/15 text-emerald-200 border-emerald-500/30 dark:bg-lime-500/15 dark:text-lime-200 dark:border-lime-500/30",
  Social:
    "bg-pink-500/15 text-pink-200 border-pink-500/30 dark:bg-rose-500/15 dark:text-rose-200 dark:border-rose-500/30",
  Mindset:
    "bg-slate-500/15 text-slate-200 border-slate-500/30 dark:bg-sky-500/15 dark:text-sky-200 dark:border-sky-500/30",
};

export default function GoalsPanel() {
  const [goals, setGoals] = useState<Goal[]>(defaultGoals);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<GoalCategory>("Lifestyle");

  const summary = useMemo(() => {
    const total = goals.length;
    const avg =
      total === 0
        ? 0
        : Math.round(goals.reduce((a, g) => a + g.progress, 0) / total);
    const complete = goals.filter((g) => g.progress >= 100).length;
    return { total, avg, complete };
  }, [goals]);

  function addGoal() {
    const title = newTitle.trim();
    if (!title) return;

    const g: Goal = {
      id: `g-${Date.now()}`,
      title,
      category: newCategory,
      progress: 0,
      due: "",
      priority: "Medium",
    };
    setGoals((prev) => [g, ...prev]);
    setNewTitle("");
  }

  function removeGoal(id: string) {
    setGoals((prev) => prev.filter((g) => g.id !== id));
  }

  function bumpProgress(id: string, delta: number) {
    setGoals((prev) =>
      prev.map((g) =>
        g.id === id
          ? { ...g, progress: Math.min(100, Math.max(0, g.progress + delta)) }
          : g
      )
    );
  }

  function toggleDone(id: string) {
    setGoals((prev) =>
      prev.map((g) =>
        g.id === id ? { ...g, progress: g.progress >= 100 ? 80 : 100 } : g
      )
    );
  }

  return (
    <div className="w-full rounded-xl bg-black/20 dark:bg-white/5 p-6 backdrop-blur-md border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white tracking-tight">
          Goals
        </h2>
        <div className="text-sm text-white/60">
          {summary.complete}/{summary.total} complete · avg {summary.avg}%
        </div>
      </div>

      {/* Add Goal */}
      <div className="flex flex-col md:flex-row gap-2 mb-5">
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addGoal()}
          placeholder="Add a new goal..."
          className="flex-1 rounded-md bg-white/5 border border-white/10 px-3 py-2 text-white placeholder:text-white/30 outline-none focus:border-blue-500/60 dark:focus:border-orange-500/60"
        />
        <select
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value as GoalCategory)}
          className="rounded-md bg-white/5 border border-white/10 px-3 py-2 text-white outline-none"
        >
          {(["Lifestyle", "Wealth", "Health", "Social", "Mindset"] as GoalCategory[]).map(
            (c) => (
              <option key={c} value={c} className="bg-black text-white">
                {c}
              </option>
            )
          )}
        </select>
        <button
          onClick={addGoal}
          className="rounded-md px-4 py-2 text-sm font-medium text-white bg-blue-500/80 hover:bg-blue-500 transition dark:bg-orange-500/80 dark:hover:bg-orange-500"
        >
          Add
        </button>
      </div>

      {/* Goals List */}
      <div className="space-y-3">
        {goals.map((g) => (
          <div
            key={g.id}
            className="rounded-lg border border-white/10 bg-white/5 px-4 py-3"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p
                    className={`text-white font-medium truncate ${
                      g.progress >= 100 ? "line-through text-white/50" : ""
                    }`}
                  >
                    {g.title}
                  </p>
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-full border ${categoryBadge[g.category]}`}
                  >
                    {g.category}
                  </span>
                  {g.priority === "High" && (
                    <span className="text-[11px] px-2 py-0.5 rounded-full border border-red-500/30 bg-red-500/15 text-red-200">
                      High
                    </span>
                  )}
                </div>

                {g.due && (
                  <p className="text-white/50 text-xs mt-0.5">
                    Due {new Date(g.due).toLocaleDateString()}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => bumpProgress(g.id, -10)}
                  className="h-8 w-8 rounded-md bg-white/5 border border-white/10 text-white/80 hover:bg-white/10"
                  aria-label="decrease progress"
                >
                  −
                </button>
                <button
                  onClick={() => bumpProgress(g.id, 10)}
                  className="h-8 w-8 rounded-md bg-white/5 border border-white/10 text-white/80 hover:bg-white/10"
                  aria-label="increase progress"
                >
                  +
                </button>
                <button
                  onClick={() => toggleDone(g.id)}
                  className="h-8 px-3 rounded-md bg-white/5 border border-white/10 text-xs text-white/90 hover:bg-white/10"
                >
                  {g.progress >= 100 ? "Undo" : "Done"}
                </button>
                <button
                  onClick={() => removeGoal(g.id)}
                  className="h-8 px-3 rounded-md bg-white/5 border border-white/10 text-xs text-white/70 hover:bg-white/10"
                >
                  Remove
                </button>
              </div>
            </div>

            <div className="mt-3">
              <div className="flex justify-between text-[11px] text-white/50 mb-1">
                <span>Progress</span>
                <span>{g.progress}%</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${g.progress}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-300 dark:from-orange-500 dark:to-yellow-400"
                />
              </div>
            </div>
          </div>
        ))}

        {goals.length === 0 && (
          <div className="text-white/60 text-sm py-6 text-center">
            No goals yet.
          </div>
        )}
      </div>
    </div>
  );
}
