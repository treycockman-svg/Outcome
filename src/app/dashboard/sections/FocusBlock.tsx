"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

const PRESETS = [
  { label: "25m", minutes: 25 },
  { label: "45m", minutes: 45 },
  { label: "60m", minutes: 60 },
];

function formatTime(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

export default function FocusBlock() {
  const [sessionName, setSessionName] = useState("Deep Focus");
  const [durationMin, setDurationMin] = useState(25);
  const [secondsLeft, setSecondsLeft] = useState(durationMin * 60);
  const [running, setRunning] = useState(false);

  // keep timer in sync when preset changes (only if not running)
  useEffect(() => {
    if (!running) setSecondsLeft(durationMin * 60);
  }, [durationMin, running]);

  // tick
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(id);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  // auto-stop at 0
  useEffect(() => {
    if (secondsLeft === 0) setRunning(false);
  }, [secondsLeft]);

  const totalSeconds = durationMin * 60;
  const progress = useMemo(() => {
    if (totalSeconds === 0) return 0;
    return 1 - secondsLeft / totalSeconds; // 0 -> 1
  }, [secondsLeft, totalSeconds]);

  const progressDeg = Math.round(progress * 360);

  function startPause() {
    if (secondsLeft === 0) {
      setSecondsLeft(totalSeconds);
    }
    setRunning((r) => !r);
  }

  function reset() {
    setRunning(false);
    setSecondsLeft(totalSeconds);
  }

  return (
    <div className="w-full rounded-xl bg-black/20 dark:bg-white/5 p-6 backdrop-blur-md border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white tracking-tight">
          Focus Block
        </h2>
        <span className="text-xs text-white/60">
          {running ? "In session" : secondsLeft === 0 ? "Complete" : "Ready"}
        </span>
      </div>

      <div className="flex flex-col lg:flex-row gap-5 items-center">
        {/* Timer Ring */}
        <div className="relative h-40 w-40 flex items-center justify-center">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `conic-gradient(${
                // light blue -> dark blue, dark orange -> yellow
                "var(--ring-accent)"
              } ${progressDeg}deg, rgba(255,255,255,0.08) 0deg)`,
            }}
          />
          <div className="absolute inset-2 rounded-full bg-black/40 dark:bg-black/60 border border-white/10" />
          <div className="relative z-10 text-center">
            <div className="text-3xl font-semibold text-white tabular-nums">
              {formatTime(secondsLeft)}
            </div>
            <div className="text-xs text-white/60 mt-1">
              {durationMin} min session
            </div>
          </div>

          {/* CSS var for accent based on theme */}
          <style jsx>{`
            :root {
              --ring-accent: #3b82f6; /* blue-500 */
            }
            .dark :root {
              --ring-accent: #f97316; /* orange-500 */
            }
          `}</style>
        </div>

        {/* Controls */}
        <div className="flex-1 w-full">
          <label className="text-xs text-white/60">Session name</label>
          <input
            value={sessionName}
            onChange={(e) => setSessionName(e.target.value)}
            className="mt-1 w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-white placeholder:text-white/30 outline-none focus:border-blue-500/60 dark:focus:border-orange-500/60"
            placeholder="What are you focusing on?"
          />

          <div className="flex flex-wrap gap-2 mt-4">
            {PRESETS.map((p) => (
              <button
                key={p.minutes}
                onClick={() => setDurationMin(p.minutes)}
                disabled={running}
                className={`px-3 py-1.5 rounded-full text-xs border transition ${
                  durationMin === p.minutes
                    ? "border-blue-400/80 bg-blue-500/20 text-blue-100 dark:border-orange-400/80 dark:bg-orange-500/20 dark:text-orange-100"
                    : "border-white/15 bg-white/5 text-white/80 hover:bg-white/10"
                } ${running ? "opacity-60 cursor-not-allowed" : ""}`}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="flex gap-2 mt-5">
            <button
              onClick={startPause}
              className="flex-1 rounded-md px-4 py-2 text-sm font-medium text-white bg-blue-500/80 hover:bg-blue-500 transition dark:bg-orange-500/80 dark:hover:bg-orange-500"
            >
              {running ? "Pause" : secondsLeft === 0 ? "Restart" : "Start"}
            </button>
            <button
              onClick={reset}
              className="rounded-md px-4 py-2 text-sm font-medium text-white/90 bg-white/5 hover:bg-white/10 border border-white/10 transition"
            >
              Reset
            </button>
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="flex justify-between text-[11px] text-white/50 mb-1">
              <span>{sessionName || "Focus"}</span>
              <span>{Math.round(progress * 100)}%</span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress * 100}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-blue-500 to-blue-300 dark:from-orange-500 dark:to-yellow-400"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
