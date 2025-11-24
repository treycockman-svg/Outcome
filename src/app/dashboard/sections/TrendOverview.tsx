"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

type DayPoint = {
  day: string;
  tasks: number;  // tasks completed
  focus: number;  // focus minutes
  xp: number;     // XP earned
  mood: number;   // 1-10
};

const defaultTrend: DayPoint[] = [
  { day: "Mon", tasks: 5, focus: 35, xp: 140, mood: 7 },
  { day: "Tue", tasks: 7, focus: 50, xp: 190, mood: 8 },
  { day: "Wed", tasks: 4, focus: 25, xp: 110, mood: 6 },
  { day: "Thu", tasks: 8, focus: 60, xp: 220, mood: 8 },
  { day: "Fri", tasks: 6, focus: 45, xp: 170, mood: 7 },
  { day: "Sat", tasks: 3, focus: 20, xp: 80, mood: 6 },
  { day: "Sun", tasks: 6, focus: 40, xp: 160, mood: 7 },
];

function StatCard({
  title,
  value,
  subtitle,
  data,
  max,
}: {
  title: string;
  value: string;
  subtitle: string;
  data: number[];
  max: number;
}) {
  return (
    <div className="rounded-lg bg-white/5 border border-white/10 p-4">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-white/80">{title}</p>
        <p className="text-white font-semibold">{value}</p>
      </div>
      <p className="text-[11px] text-white/50 mb-3">{subtitle}</p>

      <div className="flex items-end gap-1 h-16">
        {data.map((v, i) => {
          const h = max === 0 ? 0 : (v / max) * 100;
          return (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.03 }}
              className="flex-1 rounded-sm bg-gradient-to-t from-blue-500/70 to-blue-300/70 dark:from-orange-500/70 dark:to-yellow-400/70"
            />
          );
        })}
      </div>

      <div className="flex justify-between text-[10px] text-white/35 mt-2">
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </div>
    </div>
  );
}

export default function TrendOverview() {
  const trend = defaultTrend;

  const stats = useMemo(() => {
    const tasksArr = trend.map((d) => d.tasks);
    const focusArr = trend.map((d) => d.focus);
    const xpArr = trend.map((d) => d.xp);
    const moodArr = trend.map((d) => d.mood);

    const sum = (a: number[]) => a.reduce((x, y) => x + y, 0);
    const avg = (a: number[]) =>
      a.length === 0 ? 0 : Math.round(sum(a) / a.length);

    return {
      tasksArr,
      focusArr,
      xpArr,
      moodArr,
      tasksMax: Math.max(1, ...tasksArr),
      focusMax: Math.max(1, ...focusArr),
      xpMax: Math.max(1, ...xpArr),
      moodMax: 10,
      tasksTotal: sum(tasksArr),
      focusTotal: sum(focusArr),
      xpTotal: sum(xpArr),
      moodAvg: avg(moodArr),
    };
  }, [trend]);

  return (
    <div className="w-full rounded-xl bg-black/20 dark:bg-white/5 p-6 backdrop-blur-md border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white tracking-tight">
          Trend Overview
        </h2>
        <span className="text-xs text-white/60">Last 7 days</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <StatCard
          title="Tasks"
          value={`${stats.tasksTotal}`}
          subtitle="Total tasks completed"
          data={stats.tasksArr}
          max={stats.tasksMax}
        />
        <StatCard
          title="Focus Minutes"
          value={`${stats.focusTotal}m`}
          subtitle="Total deep focus time"
          data={stats.focusArr}
          max={stats.focusMax}
        />
        <StatCard
          title="XP Earned"
          value={`${stats.xpTotal} XP`}
          subtitle="Total XP this week"
          data={stats.xpArr}
          max={stats.xpMax}
        />
      </div>

      <div className="mt-4 rounded-lg bg-white/5 border border-white/10 p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-white/80">Average Mood</p>
          <p className="text-white font-semibold">{stats.moodAvg}/10</p>
        </div>

        <div className="flex items-end gap-1 h-10">
          {stats.moodArr.map((v, i) => {
            const h = (v / stats.moodMax) * 100;
            return (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.03 }}
                className="flex-1 rounded-sm bg-white/20 dark:bg-white/15"
              />
            );
          })}
        </div>

        <div className="flex justify-between text-[10px] text-white/35 mt-2">
          {trend.map((d, i) => (
            <span key={i}>{d.day}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
