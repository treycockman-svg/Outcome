"use client";

import React from "react";
import Panel3D from "./Panel3D";

type Block = {
  label: string;
  time: string;
  status?: "done" | "upcoming" | "focus";
};

type BlockMapProps = {
  title: string;
  periodLabel?: string;
  blocks: Block[];
};

export default function BlockMap({ title, periodLabel, blocks }: BlockMapProps) {
  return (
    <Panel3D>
      <div className="mb-3 flex items-center justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
            {title}
          </p>
          {periodLabel && (
            <p className="mt-1 text-xs text-slate-400">{periodLabel}</p>
          )}
        </div>
      </div>

      <div className="mt-1 space-y-2">
        {blocks.map((block, i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-2xl bg-slate-900/70 px-3 py-2"
          >
            <div>
              <p className="text-xs font-medium text-slate-50">
                {block.label}
              </p>
              <p className="text-[11px] text-slate-400">{block.time}</p>
            </div>

            {block.status && (
              <span className="rounded-full bg-slate-800 px-2 py-1 text-[10px] uppercase tracking-wide text-slate-300">
                {block.status}
              </span>
            )}
          </div>
        ))}
      </div>
    </Panel3D>
  );
}
