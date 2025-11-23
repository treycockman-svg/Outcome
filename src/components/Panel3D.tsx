"use client";

import React from "react";

type Panel3DProps = React.PropsWithChildren<{
  className?: string;
}>;

export default function Panel3D({ children, className }: Panel3DProps) {
  return (
    <div
      className={
        "relative overflow-hidden rounded-3xl border border-white/5 bg-slate-900/70 px-6 py-5 shadow-[0_22px_45px_rgba(15,23,42,0.8)] backdrop-blur-sm " +
        (className ?? "")
      }
    >
      {/* subtle glass / glow */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 via-transparent to-emerald-500/10 opacity-70" />
      <div className="relative">{children}</div>
    </div>
  );
}
