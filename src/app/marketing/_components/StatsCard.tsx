"use client";

import React from "react";
import Panel3D from "./Panel3D";

type StatsCardProps = {
  label: string;
  value: string | number;
  /** optional small subtitle under value */
  sub?: string;
  /** optional longer helper text */
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
      {/* Label */}
      <p className="mb-1 text-[11px] uppercase tracking-[0.18em] text-slate-400">
        {label}
      </p>

      {/* Main Value */}
      <p className="text-2xl font-semibold text-slate-50">
        {value}
      </p>

      {/* Optional Subtext */}
      {sub && (
        <p className="mt-1 text-xs text-slate-300/90">
          {sub}
        </p>
      )}

      {/* Optional Helper Text */}
      {helper && (
        <p className="mt-2 text-[11px] leading-relaxed text-slate-500">
          {helper}
        </p>
      )}
    </Panel3D>
  );
}
