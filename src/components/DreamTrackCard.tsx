"use client";

import React from "react";
import Panel3D from "./Panel3D";

type DreamTrackCardProps = {
  title: string;
  value: string;
  /** 0–100 progress % */
  progress: number;
  helper?: string;
};

export default function DreamTrackCard({
  title,
  value,
  progress,
  helper,
}: DreamTrackCardProps) {
  const safeProgress = Math.min(100, Math.max(0, progress));

  return (
    <Panel3D>
      <p className="mb-1 text-[11px] uppercase tracking-[0.18em] text-slate-400">
        {title}
      </p>

      <p className="text-sm font-medium text-slate-50">{value}</p>

      <div className="mt-3 h-1.5 w-full rounded-full bg-slate-800">
        <div
          className="h-1.5 rounded-full bg-emerald-400"
          style={{ width: `${safeProgress}%` }}
        />
      </div>

      {helper && (
        <p className="mt-2 text-[11px] text-slate-500">{helper}</p>
      )}
    </Panel3D>
  );
}
