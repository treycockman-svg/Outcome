<StatsCard
  label="Probability engine"
  value="Live % odds"
  helper="Updated as you complete tasks and upgrade habits."
/>
"use client";

import React from "react";
import Panel3D from "./Panel3D";

type StatsCardProps = {
  label: string;
  value: string | number;
  /** small line under the value, e.g. extra explanation */
  sub?: string;
  /** secondary helper text – all those long sentences */
  helper?: string;
};

export default function StatsCard({
  label,
  value,
  sub,
  helper,
}: StatsCardProps) {
  return (
    <Panel3D>
      <p className="mb-1 text-[11px] uppercase tracking-[0.18em] text-slate-400">
        {label}
      </p>

      <p className="text-2xl font-semibold text-slate-50">{value}</p>

      {sub && (
        <p className="mt-1 text-xs text-slate-300/90">
          {sub}
        </p>
      )}

      {helper && (
        <p className="mt-2 text-[11px] leading-relaxed text-slate-500">
          {helper}
        </p>
      )}
    </Panel3D>
  );
}
