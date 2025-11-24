"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

type TaskTag = "Routine" | "Work" | "Health" | "Social" | "Recovery";

interface Task {
  id: string;
  title: string;
  tag: TaskTag;
  priority: "Low" | "Medium" | "High";
  completed: boolean;
  due?: string; // yyyy-mm-dd
  xp: number;
}

const defaultTasks: Task[] = [
  {
    id: "tk1",
    title: "Finish dashboard UI pass",
    tag: "Work",
    priority: "High",
    completed: false,
    due: "2025-11-26",
    xp: 120,
  },
  {
    id: "tk2",
    title: "Gym session (push)",
    tag: "Health",
    priority: "High",
    completed: true,
    xp: 80,
  },
  {
    id: "tk3",
    title: "Morning routine: water + sunlight",
    tag: "Routine",
    priority: "Medium",
    completed: false,
    xp: 30,
  },
  {
    id: "tk4",
    title: "Client follow-ups",
    tag: "Work",
    priority: "Medium",
    completed: false,
    xp: 60,
  },
];

const tagBadge: Record<TaskTag, string> = {
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

export default function TaskPanel() {
  const [tasks, setTasks] = useState<Task[]>(defaultTasks);

  const [newTitle, setNewTitle] = useState("");
  const [newTag, setNewTag] = useState<TaskTag>("Routine");
  const [newPriority, setNewPriority] = useState<Task["priority"]>("Medium");
  const [newXp, setNewXp] = useState<number>(40);

  const summary = useMemo(() => {
    const total = tasks.length;
    const done = tasks.filter((t) => t.completed).length;
    const pct = total === 0 ? 0 : (done / total) * 100;
    const xpEarned = tasks.filter((t) => t.completed).reduce((a, t) => a + t.xp, 0);
    const xpTotal = tasks.reduce((a, t) => a + t.xp, 0);
    return { total, done, pct, xpEarned, xpTotal };
  }, [tasks]);

  function addTask() {
    const title = newTitle.trim();
    if (!title) return;

    const t: Task = {
      id: `tk-${Date.now()}`,
      title,
      tag: newTag,
      priority: newPriority,
      completed: false,
      xp: Math.max(5, Math.min(500, Number(newXp) || 40)),
    };

    setTasks((prev) => [t, ...prev]);
    setNewTitle("");
    setNewTag("Routine");
    setNewPriority("Medium");
    setNewXp(40);
  }

  function toggleTask(id: string) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  function removeTask(id: string) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  const sortedTasks = useMemo(() => {
    // incomplete first, then high priority
    const rankP = (p: Task["priority"]) =>
      p === "High" ? 0 : p === "Medium" ? 1 : 2;
    return [...tasks].sort((a, b) => {
      if (a.completed !== b.completed) return a.completed ? 1 : -1;
      return rankP(a.priority) - rankP(b.priority);
    });
  }, [tasks]);

  return (
    <div className="w-full rounded-xl bg-black/20 dark:bg-white/5 p-6 backdrop-blur-md border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white tracking-tight">
          Tasks
        </h2>
        <div className="text-sm text-white/60">
          {summary.done}/{summary.total} done · {summary.xpEarned}/{summary.xpTotal} XP
        </div>
      </div>

      {/* completion bar */}
      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-5">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${summary.pct}%` }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-blue-500 to-blue-300 dark:from-orange-500 dark:to-yellow-400"
        />
      </div>

      {/* Add task */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-2 mb-5">
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          placeholder="Add a task..."
          className="md:col-span-3 rounded-md bg-white/5 border border-white/10 px-3 py-2 text-white placeholder:text-white/30 outline-none focus:border-blue-500/60 dark:focus:border-orange-500/60"
        />
        <select
          value={newTag}
          onChange={(e) => setNewTag(e.target.value as TaskTag)}
          className="rounded-md bg-white/5 border border-white/10 px-3 py-2 text-white outline-none"
        >
          {(["Routine", "Work", "Health", "Social", "Recovery"] as TaskTag[]).map(
            (t) => (
              <option key={t} value={t} className="bg-black text-white">
                {t}
              </option>
            )
          )}
        </select>
        <select
          value={newPriority}
          onChange={(e) =>
            setNewPriority(e.target.value as Task["priority"])
          }
          className="rounded-md bg-white/5 border border-white/10 px-3 py-2 text-white outline-none"
        >
          {(["Low", "Medium", "High"] as Task["priority"][]).map((p) => (
            <option key={p} value={p} className="bg-black text-white">
              {p}
            </option>
          ))}
        </select>
        <div className="flex gap-2">
          <input
            type="number"
            min={5}
            max={500}
            value={newXp}
            onChange={(e) => setNewXp(Number(e.target.value || 0))}
            className="w-20 rounded-md bg-white/5 border border-white/10 px-2 py-2 text-white text-sm outline-none"
            placeholder="XP"
          />
          <button
            onClick={addTask}
            className="flex-1 rounded-md px-4 py-2 text-sm font-medium text-white bg-blue-500/80 hover:bg-blue-500 transition dark:bg-orange-500/80 dark:hover:bg-orange-500"
          >
            Add
          </button>
        </div>
      </div>

      {/* tasks list */}
      <div className="space-y-2">
        {sortedTasks.map((t) => (
          <div
            key={t.id}
            className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-3"
          >
            <div className="flex items-center gap-3 min-w-0">
              <button
                onClick={() => toggleTask(t.id)}
                className={`h-5 w-5 rounded border border-white/30 flex items-center justify-center transition ${
                  t.completed
                    ? "bg-blue-500/80 dark:bg-orange-500/80"
                    : "bg-transparent"
                }`}
                aria-label="toggle task"
              >
                {t.completed && (
                  <span className="text-white text-xs font-bold">✓</span>
                )}
              </button>

              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p
                    className={`text-white font-medium truncate ${
                      t.completed ? "line-through text-white/40" : ""
                    }`}
                  >
                    {t.title}
                  </p>

                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-full border ${tagBadge[t.tag]}`}
                  >
                    {t.tag}
                  </span>

                  {t.priority === "High" && (
                    <span className="text-[11px] px-2 py-0.5 rounded-full border border-red-500/30 bg-red-500/15 text-red-200">
                      High
                    </span>
                  )}
                </div>

                {t.due && (
                  <p className="text-white/50 text-xs mt-0.5">
                    Due {new Date(t.due).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs text-white/60">{t.xp} XP</span>
              <button
                onClick={() => removeTask(t.id)}
                className="text-xs text-white/60 hover:text-white"
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        {sortedTasks.length === 0 && (
          <div className="text-white/60 text-sm py-6 text-center">
            No tasks yet.
          </div>
        )}
      </div>
    </div>
  );
}
