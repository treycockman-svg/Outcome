"use client";

import React from "react";
import Panel3D from "./Panel3D";

type PipelineCardProps = {
  title: string;
  planned: number;
  inMotion: number;
  lockedIn: number;
  helper?: string;
};

export default function PipelineCard({
  title,
  planned,
  inMotion,
  lockedIn,
  helper,
}: PipelineCardProps) {
  return (
    <Panel3D>
      <p className="mb-1 text-[11px] uppercase tracking-[0.18em] text-slate-400">
        {title}
      </p>

      <div className="mt-2 flex items-center gap-6 text-sm text-slate-200">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Planned
          </p>
          <p className="text-lg font-semibold">{planned}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400">
            In motion
          </p>
          <p className="text-lg font-semibold text-emerald-400">{inMotion}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Locked in
          </p>
          <p className="text-lg font-semibold text-sky-300">{lockedIn}</p>
        </div>
      </div>

      {helper && (
        <p className="mt-3 text-[11px] text-slate-500">{helper}</p>
      )}
    </Panel3D>
  );
}
