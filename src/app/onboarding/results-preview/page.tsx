"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

type QAGroup = {
  title: string;
  questions: string[];
};

const DREAM_KEY = "outcome_onboarding_dream_v1";
const REALITY_KEY = "outcome_onboarding_reality_v1";

const DREAM_GROUPS: QAGroup[] = [
  {
    title: "Lifestyle & Environment (Dream)",
    questions: [
      "Where do you imagine living in your ideal future?",
      "What does your home and daily environment look and feel like?",
      "Who shares this space or lifestyle with you?",
      "How does your ideal morning begin?",
      "What experiences fill your weekends and free time?",
    ],
  },
  {
    title: "Career & Wealth (Dream)",
    questions: [
      "What path or profession do you see yourself thriving in?",
      "How does your ideal work make you feel every day?",
      "What level of freedom or stability do you want financially?",
      "Who do you serve, help, or inspire through your work?",
      "What kind of impact or legacy do you want to create?",
    ],
  },
  {
    title: "Health & Body (Dream)",
    questions: [
      "What does your body look and feel like?",
      "What health habits are effortless for you in this future?",
      "What physical challenge have you mastered?",
      "What do you want to eliminate (pain, fatigue, weight etc.)?",
      "How do you feel in your body every day?",
    ],
  },
  {
    title: "Relationships & Social (Dream)",
    questions: [
      "Describe your ideal romantic relationship.",
      "What qualities define your social circle?",
      "Who do you collaborate with or learn from?",
      "What do people respect most about you socially?",
      "What kind of experiences do you share with friends?",
    ],
  },
  {
    title: "Mindset & Identity (Dream)",
    questions: [
      "What 3 words describe your ideal self?",
      "How do you think under pressure?",
      "What beliefs drive your success?",
      "What routines keep you focused?",
      "What legacy do you want to leave?",
    ],
  },
];

const REALITY_GROUPS: QAGroup[] = [
  {
    title: "Lifestyle & Environment (Now)",
    questions: [
      "Where do you live right now, and how do you feel about it?",
      "What’s your current home environment like day-to-day?",
      "Who are you surrounded by most weeks?",
      "How does your morning usually start right now?",
      "What do your weekends and free time usually look like?",
    ],
  },
  {
    title: "Career & Wealth (Now)",
    questions: [
      "What do you do for work (or study) right now?",
      "What’s your current income or financial situation?",
      "How many hours per week are you working and why?",
      "Who do you currently serve/help/influence through your work?",
      "What’s the biggest money or career obstacle you’re facing right now?",
    ],
  },
  {
    title: "Health & Body (Now)",
    questions: [
      "How would you describe your body and health right now?",
      "What health habits are you consistent with currently?",
      "What physical challenge or weakness is holding you back most?",
      "What do you want to improve or eliminate (pain, fatigue, weight, etc.)?",
      "How’s your energy and confidence on an average day?",
    ],
  },
  {
    title: "Relationships & Social (Now)",
    questions: [
      "Describe your romantic life right now (if relevant).",
      "What is your current social circle like?",
      "Who do you spend the most time with and why?",
      "What’s missing in your relationships or friendships right now?",
      "How do you feel socially on an average week?",
    ],
  },
  {
    title: "Mindset & Identity (Now)",
    questions: [
      "What 3 words describe you right now?",
      "How do you usually act under pressure today?",
      "What beliefs are currently limiting you most?",
      "What routines help you stay focused (or what’s stopping you)?",
      "What are you most proud of about yourself right now?",
    ],
  },
];

export default function ResultsPreviewPage() {
  const router = useRouter();

  const [dream, setDream] = useState<Record<string, string>>({});
  const [reality, setReality] = useState<Record<string, string>>({});

  useEffect(() => {
    try {
      const d = localStorage.getItem(DREAM_KEY);
      const r = localStorage.getItem(REALITY_KEY);
      if (d) setDream(JSON.parse(d));
      if (r) setReality(JSON.parse(r));
    } catch {}
  }, []);

  const stats = useMemo(() => {
    const dreamQs = DREAM_GROUPS.flatMap((g) => g.questions);
    const realityQs = REALITY_GROUPS.flatMap((g) => g.questions);

    const dreamFilled = dreamQs.filter((q) => dream[q]?.trim()).length;
    const realityFilled = realityQs.filter((q) => reality[q]?.trim()).length;

    const dreamPct =
      dreamQs.length === 0 ? 0 : Math.round((dreamFilled / dreamQs.length) * 100);
    const realityPct =
      realityQs.length === 0
        ? 0
        : Math.round((realityFilled / realityQs.length) * 100);

    const overallPct = Math.round((dreamPct + realityPct) / 2);

    return {
      dreamQs,
      realityQs,
      dreamFilled,
      realityFilled,
      dreamPct,
      realityPct,
      overallPct,
    };
  }, [dream, reality]);

  function goDashboard() {
    router.push("/dashboard");
  }

  function editDream() {
    router.push("/onboarding/questions-dream");
  }

  function editReality() {
    router.push("/onboarding/questions-reality");
  }

  function back() {
    router.push("/onboarding/questions-reality");
  }

  return (
    <main className="min-h-screen bg-white text-slate-900 dark:bg-[#0a0a0a] dark:text-white">
      <div className="mx-auto max-w-6xl px-4 md:px-8 py-10 md:py-14">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={back}
            className="text-sm text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white transition"
          >
            ← Back
          </button>
          <div className="text-xs text-black/60 dark:text-white/60">
            Step 3 of 3 — Results Preview
          </div>
        </div>

        {/* Title + progress */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Your Dream vs Reality
          </h1>
          <p className="mt-2 text-sm md:text-base text-black/70 dark:text-white/70">
            Here’s your baseline. You can edit anything before moving into the dashboard.
          </p>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-4">
              <div className="text-xs text-black/50 dark:text-white/50 mb-1">
                Dream Clarity
              </div>
              <div className="text-xl font-semibold">{stats.dreamPct}%</div>
              <div className="text-xs text-black/60 dark:text-white/60">
                {stats.dreamFilled}/{stats.dreamQs.length} answered
              </div>
            </div>

            <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-4">
              <div className="text-xs text-black/50 dark:text-white/50 mb-1">
                Reality Baseline
              </div>
              <div className="text-xl font-semibold">{stats.realityPct}%</div>
              <div className="text-xs text-black/60 dark:text-white/60">
                {stats.realityFilled}/{stats.realityQs.length} answered
              </div>
            </div>

            <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-4">
              <div className="text-xs text-black/50 dark:text-white/50 mb-1">
                Overall Setup
              </div>
              <div className="text-xl font-semibold">{stats.overallPct}%</div>
              <div className="text-xs text-black/60 dark:text-white/60">
                Ready to generate your roadmap
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-5">
            <div className="h-2 w-full rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${stats.overallPct}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-blue-600 to-blue-400 dark:from-orange-500 dark:to-yellow-400"
              />
            </div>
          </div>
        </motion.div>

        {/* Two columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Dream column */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Dream Life</h2>
              <button
                onClick={editDream}
                className="text-xs px-3 py-1.5 rounded-full border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition"
              >
                Edit Dream
              </button>
            </div>

            {DREAM_GROUPS.map((g) => (
              <div
                key={g.title}
                className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="font-semibold">{g.title}</div>
                  <div className="text-xs text-black/50 dark:text-white/50">
                    {
                      g.questions.filter((q) => dream[q]?.trim()).length
                    }/{g.questions.length}
                  </div>
                </div>

                <div className="space-y-3">
                  {g.questions.map((q) => {
                    const a = dream[q]?.trim();
                    return (
                      <div key={q} className="text-sm">
                        <div className="text-black/80 dark:text-white/80 font-medium">
                          {q}
                        </div>
                        <div
                          className={`mt-1 rounded-lg px-3 py-2 text-sm border
                            ${
                              a
                                ? "bg-white dark:bg-black/40 border-black/10 dark:border-white/10"
                                : "bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-black/50 dark:text-white/50 italic"
                            }`}
                        >
                          {a || "Not answered yet."}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </section>

          {/* Reality column */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Reality Check</h2>
              <button
                onClick={editReality}
                className="text-xs px-3 py-1.5 rounded-full border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition"
              >
                Edit Reality
              </button>
            </div>

            {REALITY_GROUPS.map((g) => (
              <div
                key={g.title}
                className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="font-semibold">{g.title}</div>
                  <div className="text-xs text-black/50 dark:text-white/50">
                    {
                      g.questions.filter((q) => reality[q]?.trim()).length
                    }/{g.questions.length}
                  </div>
                </div>

                <div className="space-y-3">
                  {g.questions.map((q) => {
                    const a = reality[q]?.trim();
                    return (
                      <div key={q} className="text-sm">
                        <div className="text-black/80 dark:text-white/80 font-medium">
                          {q}
                        </div>
                        <div
                          className={`mt-1 rounded-lg px-3 py-2 text-sm border
                            ${
                              a
                                ? "bg-white dark:bg-black/40 border-black/10 dark:border-white/10"
                                : "bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-black/50 dark:text-white/50 italic"
                            }`}
                        >
                          {a || "Not answered yet."}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </section>
        </div>

        {/* Bottom actions */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="text-xs text-black/60 dark:text-white/60">
            You can refine this anytime from the dashboard.
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            <button
              onClick={goDashboard}
              className="w-full md:w-auto rounded-md px-5 py-2.5 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition dark:bg-orange-500 dark:hover:bg-orange-600"
            >
              Continue to Dashboard
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
