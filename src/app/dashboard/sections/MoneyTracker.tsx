"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

type TxType = "Income" | "Expense";
type TxCategory = "Business" | "Lifestyle" | "Health" | "Investing" | "Bills" | "Other";

interface Transaction {
  id: string;
  title: string;
  amount: number; // positive number
  type: TxType;
  category: TxCategory;
  date: string; // yyyy-mm-dd
}

const defaultTxs: Transaction[] = [
  { id: "t1", title: "Bricklaying pay", amount: 1200, type: "Income", category: "Lifestyle", date: "2025-11-18" },
  { id: "t2", title: "Gym membership", amount: 18, type: "Expense", category: "Health", date: "2025-11-19" },
  { id: "t3", title: "Outcome tools", amount: 45, type: "Expense", category: "Business", date: "2025-11-20" },
  { id: "t4", title: "Fuel", amount: 90, type: "Expense", category: "Bills", date: "2025-11-21" },
  { id: "t5", title: "Side hustle", amount: 320, type: "Income", category: "Business", date: "2025-11-22" },
];

const categoryBadge: Record<TxCategory, string> = {
  Business:
    "bg-purple-500/15 text-purple-200 border-purple-500/30 dark:bg-yellow-500/15 dark:text-yellow-200 dark:border-yellow-500/30",
  Lifestyle:
    "bg-blue-500/15 text-blue-200 border-blue-500/30 dark:bg-orange-500/15 dark:text-orange-200 dark:border-orange-500/30",
  Health:
    "bg-emerald-500/15 text-emerald-200 border-emerald-500/30 dark:bg-lime-500/15 dark:text-lime-200 dark:border-lime-500/30",
  Investing:
    "bg-slate-500/15 text-slate-200 border-slate-500/30 dark:bg-sky-500/15 dark:text-sky-200 dark:border-sky-500/30",
  Bills:
    "bg-pink-500/15 text-pink-200 border-pink-500/30 dark:bg-rose-500/15 dark:text-rose-200 dark:border-rose-500/30",
  Other:
    "bg-white/10 text-white/80 border-white/20 dark:bg-white/10 dark:text-white/80 dark:border-white/20",
};

function fmt(n: number) {
  return n.toLocaleString("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 });
}

export default function MoneyTracker() {
  const [txs, setTxs] = useState<Transaction[]>(defaultTxs);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState<string>("");
  const [type, setType] = useState<TxType>("Expense");
  const [category, setCategory] = useState<TxCategory>("Other");
  const [goal, setGoal] = useState<number>(5000); // monthly savings goal

  const summary = useMemo(() => {
    const income = txs.filter(t => t.type === "Income").reduce((a, t) => a + t.amount, 0);
    const expense = txs.filter(t => t.type === "Expense").reduce((a, t) => a + t.amount, 0);
    const net = income - expense;
    const saved = Math.max(net, 0);
    const pct = goal > 0 ? Math.min(100, (saved / goal) * 100) : 0;
    return { income, expense, net, saved, pct };
  }, [txs, goal]);

  function addTx() {
    const t = title.trim();
    const a = Number(amount);
    if (!t || !isFinite(a) || a <= 0) return;

    const newTx: Transaction = {
      id: `t-${Date.now()}`,
      title: t,
      amount: a,
      type,
      category,
      date: new Date().toISOString().slice(0, 10),
    };

    setTxs(prev => [newTx, ...prev]);
    setTitle("");
    setAmount("");
    setType("Expense");
    setCategory("Other");
  }

  function removeTx(id: string) {
    setTxs(prev => prev.filter(t => t.id !== id));
  }

  return (
    <div className="w-full rounded-xl bg-black/20 dark:bg-white/5 p-6 backdrop-blur-md border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white tracking-tight">Money Tracker</h2>
        <div className={`text-sm ${summary.net >= 0 ? "text-white/70" : "text-red-200"}`}>
          Net {fmt(summary.net)}
        </div>
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="rounded-lg bg-white/5 border border-white/10 p-3">
          <p className="text-[11px] text-white/50">Income</p>
          <p className="text-white font-semibold mt-1">{fmt(summary.income)}</p>
        </div>
        <div className="rounded-lg bg-white/5 border border-white/10 p-3">
          <p className="text-[11px] text-white/50">Expenses</p>
          <p className="text-white font-semibold mt-1">{fmt(summary.expense)}</p>
        </div>
        <div className="rounded-lg bg-white/5 border border-white/10 p-3">
          <p className="text-[11px] text-white/50">Saved</p>
          <p className="text-white font-semibold mt-1">{fmt(summary.saved)}</p>
        </div>
      </div>

      {/* Goal */}
      <div className="rounded-lg bg-white/5 border border-white/10 p-4 mb-5">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-white/80">Monthly Savings Goal</p>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={0}
              value={goal}
              onChange={e => setGoal(Number(e.target.value || 0))}
              className="w-24 rounded-md bg-white/5 border border-white/10 px-2 py-1 text-white text-xs outline-none"
            />
            <span className="text-xs text-white/50">AUD</span>
          </div>
        </div>

        <div className="flex justify-between text-[11px] text-white/50 mb-1">
          <span>{fmt(summary.saved)} saved</span>
          <span>{Math.round(summary.pct)}%</span>
        </div>

        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${summary.pct}%` }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-blue-500 to-blue-300 dark:from-orange-500 dark:to-yellow-400"
          />
        </div>
      </div>

      {/* Add transaction */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2 mb-5">
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          onKeyDown={e => e.key === "Enter" && addTx()}
          placeholder="Transaction title"
          className="md:col-span-2 rounded-md bg-white/5 border border-white/10 px-3 py-2 text-white placeholder:text-white/30 outline-none focus:border-blue-500/60 dark:focus:border-orange-500/60"
        />
        <input
          value={amount}
          onChange={e => setAmount(e.target.value)}
          onKeyDown={e => e.key === "Enter" && addTx()}
          placeholder="Amount"
          type="number"
          min={0}
          className="rounded-md bg-white/5 border border-white/10 px-3 py-2 text-white placeholder:text-white/30 outline-none"
        />
        <select
          value={type}
          onChange={e => setType(e.target.value as TxType)}
          className="rounded-md bg-white/5 border border-white/10 px-3 py-2 text-white outline-none"
        >
          <option value="Expense" className="bg-black text-white">Expense</option>
          <option value="Income" className="bg-black text-white">Income</option>
        </select>
        <div className="flex gap-2">
          <select
            value={category}
            onChange={e => setCategory(e.target.value as TxCategory)}
            className="flex-1 rounded-md bg-white/5 border border-white/10 px-3 py-2 text-white outline-none"
          >
            {(["Business","Lifestyle","Health","Investing","Bills","Other"] as TxCategory[]).map(c => (
              <option key={c} value={c} className="bg-black text-white">{c}</option>
            ))}
          </select>
          <button
            onClick={addTx}
            className="rounded-md px-4 py-2 text-sm font-medium text-white bg-blue-500/80 hover:bg-blue-500 transition dark:bg-orange-500/80 dark:hover:bg-orange-500"
          >
            Add
          </button>
        </div>
      </div>

      {/* Transactions list */}
      <div className="space-y-2">
        {txs.map(t => (
          <div
            key={t.id}
            className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-3"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-white font-medium truncate">{t.title}</p>
                <span className={`text-[11px] px-2 py-0.5 rounded-full border ${categoryBadge[t.category]}`}>
                  {t.category}
                </span>
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full border ${
                    t.type === "Income"
                      ? "border-emerald-500/30 bg-emerald-500/15 text-emerald-200"
                      : "border-red-500/30 bg-red-500/15 text-red-200"
                  }`}
                >
                  {t.type}
                </span>
              </div>
              <p className="text-white/50 text-xs mt-0.5">
                {new Date(t.date).toLocaleDateString()}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <p className={`font-semibold ${t.type === "Income" ? "text-emerald-200" : "text-white"}`}>
                {t.type === "Expense" ? "-" : "+"}{fmt(t.amount)}
              </p>
              <button
                onClick={() => removeTx(t.id)}
                className="text-xs text-white/60 hover:text-white"
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        {txs.length === 0 && (
          <div className="text-white/60 text-sm py-6 text-center">
            No transactions yet.
          </div>
        )}
      </div>
    </div>
  );
}
