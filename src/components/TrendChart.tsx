"use client";

import React from "react";
import Panel3D from "./Panel3D";

const days = ["M", "T", "W", "T", "F", "S", "S"];

// Just static fake data for now – we can wire this to real Supabase data later
const values = [72, 88, 64, 90, 82, 55, 61];

export default function TrendChart() {
  return (
    <Panel3D>
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
            Trend overview
          </p>
          <p className="mt-1 text-xs text-slate-400">Last 7 days</p>
        </div>
      </div>

      <div className="mt-2 flex items-end justify-between gap-3">
        {values.map((v, idx) => (
          <div key={idx} className="flex flex-col items-center gap-1">
            <div className="flex h-28 w-7 items-end justify-center rounded-full bg-slate-900/80">
              <div
                className="w-5 rounded-full bg-gradient-to-t from-sky-500 via-emerald-400 to-fuchsia-500"
                style={{ height: `${30 + (v / 100) * 60}%` }}
              />
            </div>
            <span className="text-[11px] text-slate-400">{days[idx]}</span>
          </div>
        ))}
      </div>
    </Panel3D>
  );
}
