"use client";

import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-medium text-slate-100 backdrop-blur hover:bg-white/10 transition"
    >
      {theme === "dark" ? "Light mode" : "Dark mode"}
    </button>
  );
}
