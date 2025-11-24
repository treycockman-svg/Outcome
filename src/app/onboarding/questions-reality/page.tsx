"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

type RealityCategory =
  | "Lifestyle & Environment (Now)"
  | "Career & Wealth (Now)"
  | "Health & Body (Now)"
  | "Relationships & Social (Now)"
  | "Mindset & Identity (Now)";

type RealityGroup = {
  category: RealityCategory;
  questions: string[];
};

const REALITY_GROUPS: RealityGroup[] = [
  {
    category: "Lifestyle & Environment (Now)",
    questions: [
      "Where do you live right now, and how do you feel about it?",
      "What’s your current home environment like day-to-day?",
      "Who are you surrounded by most weeks?",
      "How does your morning usually start right now?",
      "What do your weekends and free time usually look like?",
    ],
  },
  {
    category: "Career & Wealth (Now)",
    questions: [
      "What do you do for work (or study) right now?",
      "What’s your current income or financial situation?",
      "How many hours per week are you working and why?",
      "Who do you currently serve/help/influence through your work?",
      "What’s the biggest money or career obstacle you’re facing right now?",
    ],
  },
  {
    category: "Health & Body (Now)",
    questions: [
      "How would you describe your body and health right now?",
      "What health habits are you consistent with currently?",
      "What physical challenge or weakness is holding you back most?",
      "What do you want to improve or eliminate (pain, fatigue, weight, etc.)?",
      "How’s your energy and confidence on an average day?",
    ],
  },
  {
    category: "Relationships & Social (Now)",
    questions: [
      "Describe your romantic life right now (if relevant).",
      "What is your current social circle like?",
      "Who do you spend the most time with and why?",
      "What’s missing in your relationships or friendships right now?",
      "How do you feel socially on an average week?",
    ],
  },
  {
    category: "Mindset & Identity (Now)",
    questions: [
      "What 3 words describe you right now?",
      "How do you usually act under pressure today?",
      "What beliefs are currently limiting you most?",
      "What routines help you stay focused (or what’s stopping you)?",
      "What are you most proud of about yourself right now?",
    ],
  },
];

const STORAGE_KEY = "outcome_onboarding_reality_v1";

export default function QuestionsRealityPage() {
  const router = useRouter();

  const flatQuestions = useMemo(
    () =>
      REALITY_GROUPS.flatMap((g) =>
        g.questions.map((q) => ({ category: g.category, q }))
      ),
    []
  );

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") setAnswers(parsed);
      }
    } catch {}
  }, []);

  const progress = useMemo(() => {
    const total = flatQuestions.length;
    const filled = flatQuestions.filter(({ q }) => answers[q]?.trim()).length;
    return {
      total,
      filled,
      pct: total === 0 ? 0 : Math.round((filled / total) * 100),
    };
  }, [answers, flatQuestions]);

  function setAnswer(question: string, value: string) {
    setAnswers((prev) => ({ ...prev, [question]: value }));
  }

  async function saveAndNext() {
    setSaving(true);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    } catch {}
    setSaving(false);
    router.push("/results-preview");
  }

  function back() {
    router.push("/onboarding/questions-dream");
  }

  return (
    <main className="min-h-screen bg-white text-slate-900 dark:bg-[#0a0a0a] dark:text-white">
      <div className="mx-auto max-w-3xl px-4 md:px-8 py-10 md:py-14">
        {/* Step header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={back}
            className="text-sm text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white transition"
          >
            ← Back
          </button>
          <div className="text-xs text-black/60 dark:text-white/60">
            Step 2 of 3 — Reality Check
          </div>
        </div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Reality Check
          </h1>
          <p className="mt-2 text-sm md:text-base text-black/70 dark:text-white/70">
            This is your current baseline — no judgement, just truth.
          </p>
        </motion.div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-black/60 dark:text-white/60">
              {progress.filled}/{progress.total} answered
            </span>
            <span className="text-black/60 dark:text-white/60">
              {progress.pct}%
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress.pct}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-blue-600 to-blue-400 dark:from-orange-500 dark:to-yellow-400"
            />
          </div>
        </div>

        {/* Question groups */}
        <div className="space-y-6">
          {REALITY_GROUPS.map((group, gi) => (
            <section
              key={group.category}
              className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur p-5 md:p-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-base md:text-lg font-semibold">
                  {group.category}
                </h2>
                <span className="text-xs text-black/50 dark:text-white/50">
                  {gi + 1}/{REALITY_GROUPS.length}
                </span>
              </div>

              <div className="mt-4 space-y-4">
                {group.questions.map((question, qi) => {
                  const val = answers[question] ?? "";
                  const isTouched = touched[question];
                  const showWarn = isTouched && !val.trim();

                  return (
                    <div key={question} className="space-y-2">
                      <label className="text-sm font-medium text-black/90 dark:text-white/90">
                        {qi + 1}. {question}
                      </label>
                      <textarea
                        value={val}
                        onChange={(e) => setAnswer(question, e.target.value)}
                        onBlur={() =>
                          setTouched((p) => ({ ...p, [question]: true }))
                        }
                        placeholder="Type your answer..."
                        rows={3}
                        className={`w-full resize-none rounded-xl border px-3 py-2 text-sm outline-none transition
                          bg-white dark:bg-black/40
                          border-black/10 dark:border-white/10
                          focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
                          dark:focus:border-orange-400 dark:focus:ring-orange-400/20
                          ${showWarn ? "border-red-400 focus:border-red-400 focus:ring-red-400/10" : ""}
                        `}
                      />
                      {showWarn && (
                        <p className="text-xs text-red-500">
                          Add something here or leave a quick note.
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        {/* Bottom actions */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="text-xs text-black/60 dark:text-white/60">
            The gap between Dream and Reality is your roadmap.
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <button
              onClick={saveAndNext}
              disabled={saving}
              className="w-full md:w-auto rounded-md px-5 py-2.5 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-60 dark:bg-orange-500 dark:hover:bg-orange-600"
            >
              {saving ? "Saving..." : "Next → Results Preview"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
