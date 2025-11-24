"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

type DreamCategory =
  | "Lifestyle & Environment"
  | "Career & Wealth"
  | "Health & Body"
  | "Relationships & Social"
  | "Mindset & Identity";

type DreamGroup = {
  category: DreamCategory;
  questions: string[];
};

const DREAM_GROUPS: DreamGroup[] = [
  {
    category: "Lifestyle & Environment",
    questions: [
      "Where do you ideally live in your future life?",
      "What does your home look and feel like?",
      "Who shares this space or lifestyle with you?",
      "How does your ideal morning begin?",
      "What experiences fill your weekends and free time?",
    ],
  },
  {
    category: "Career & Wealth",
    questions: [
      "What career or business do you run?",
      "What is your monthly income goal in that future?",
      "How many hours per week do you work, and why?",
      "Who do you serve, help, or inspire through your work?",
      "What level of freedom or stability do you want financially?",
    ],
  },
  {
    category: "Health & Body",
    questions: [
      "What does your body look and feel like in that future?",
      "What health habits are effortless for you?",
      "What physical challenge have you mastered?",
      "What do you want to eliminate (pain, fatigue, weight, etc.)?",
      "How do you maintain energy and confidence daily?",
    ],
  },
  {
    category: "Relationships & Social",
    questions: [
      "Describe your ideal romantic relationship.",
      "What qualities define your social circle?",
      "Who do you collaborate with or learn from?",
      "What do people respect most about you socially?",
      "What kind of experiences do you share with friends?",
    ],
  },
  {
    category: "Mindset & Identity",
    questions: [
      "What 3 words describe your ideal self?",
      "How do you think and act under pressure?",
      "What beliefs drive your success in that future?",
      "What routines keep you focused and disciplined?",
      "What legacy do you want to leave?",
    ],
  },
];

const STORAGE_KEY = "outcome_onboarding_dream_v1";

export default function QuestionsDreamPage() {
  const router = useRouter();

  const flatQuestions = useMemo(
    () =>
      DREAM_GROUPS.flatMap((g) =>
        g.questions.map((q) => ({ category: g.category, q }))
      ),
    []
  );

  const [answers, setAnswers] = useState<Record<string, string>>(() => {
    if (typeof window === "undefined") return {};
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : null;
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch {
      return {};
    }
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [saving, setSaving] = useState(false);

  const progress = useMemo(() => {
    const total = flatQuestions.length;
    const filled = flatQuestions.filter(({ q }) => answers[q]?.trim()).length;
    return { total, filled, pct: total === 0 ? 0 : Math.round((filled / total) * 100) };
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
    router.push("/onboarding/questions-reality");
  }

  function back() {
    router.push("/onboarding");
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
            Step 1 of 3 — Dream Life
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
            Dream Life Vision
          </h1>
          <p className="mt-2 text-sm md:text-base text-black/70 dark:text-white/70">
            Answer honestly. This becomes your blueprint.
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
          {DREAM_GROUPS.map((group, gi) => (
            <section
              key={group.category}
              className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur p-5 md:p-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-base md:text-lg font-semibold">
                  {group.category}
                </h2>
                <span className="text-xs text-black/50 dark:text-white/50">
                  {gi + 1}/{DREAM_GROUPS.length}
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
            Don’t overthink. You can edit later.
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <button
              onClick={saveAndNext}
              disabled={saving}
              className="w-full md:w-auto rounded-md px-5 py-2.5 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-60 dark:bg-orange-500 dark:hover:bg-orange-600"
            >
              {saving ? "Saving..." : "Next → Reality Check"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
