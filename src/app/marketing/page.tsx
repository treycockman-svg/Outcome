"use client";

import Link from "next/link";
import ThemeToggle from "../../components/ThemeToggle";

const features = [
  {
    title: "Probability engine",
    body: "Outcome scores your current life path and estimates your odds of hitting your dream outcome.",
  },
  {
    title: "AI task planner",
    body: "Daily, weekly, and monthly tasks generated from your answers – no generic advice.",
  },
  {
    title: "Outcome streaks",
    body: "Track deep-work blocks, habits, and wins that actually move the needle.",
  },
  {
    title: "Money & career tracking",
    body: "Income, savings, and skills mapped directly to the future you said you want.",
  },
];

const steps = [
  {
    label: "01",
    title: "Tell Outcome your dream life",
    body: "Answer 25 fast questions about where you really want to be – lifestyle, money, health, relationships, and skills.",
  },
  {
    label: "02",
    title: "Show Outcome your reality",
    body: "Then you answer 25 questions about where you are right now so Outcome can see the full gap.",
  },
  {
    label: "03",
    title: "AI runs the simulation",
    body: "Outcome uses OpenAI to model your path, calculate probabilities, and design the most direct route from A → B.",
  },
  {
    label: "04",
    title: "See your dashboard",
    body: "You get a preview of your Outcome score, key bottlenecks, and a sample of the tasks the AI wants you to run.",
  },
];

const tiers = [
  {
    name: "Preview",
    price: "Free",
    description: "Take the questionnaire and see a high-level snapshot of your Outcome.",
    highlight: false,
    items: [
      "Dream vs reality questionnaire",
      "Single Outcome score preview",
      "Example tasks & goals",
      "No card required",
    ],
  },
  {
    name: "Outcome OS",
    price: "$25 / month",
    description: "The full Outcome dashboard, live AI coaching, and all analytics unlocked.",
    highlight: true,
    items: [
      "Full Outcome probability engine",
      "Daily & weekly AI-generated task lists",
      "Money, habits, and skills tracking",
      "Unlimited simulations and scenarios",
      "Priority feature access",
    ],
  },
];

export default function MarketingPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* Top gradient bar / glow */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-0 h-40 bg-gradient-to-b from-lime-400/30 via-cyan-400/10 to-transparent blur-3xl" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-20 pt-8 lg:px-8">
        {/* NAV */}
        <header className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-900/80 shadow-[0_0_20px_rgba(190,242,100,0.35)]">
              <span className="text-xs font-semibold tracking-[0.18em] text-lime-300">
                O
              </span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold tracking-[0.26em] text-slate-200">
                OUTCOME
              </span>
              <span className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                Personal OS
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-xs font-medium text-slate-400 hover:text-slate-100"
            >
              Dashboard
            </Link>
            <ThemeToggle />
            <Link
              href="#pricing"
              className="hidden rounded-full border border-lime-300/30 bg-lime-300/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-lime-200 hover:bg-lime-300/20 sm:inline-flex"
            >
              Get Outcome
            </Link>
          </div>
        </header>

        {/* HERO SECTION */}
        <section className="relative mb-16 grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-center">
          {/* Left copy */}
          <div>
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/80 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.24em] text-slate-400">
              <span className="h-1 w-1 rounded-full bg-lime-400" />
              Is your AI actually moving your life forward?
            </p>

            <h1 className="mb-4 text-balance text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl lg:text-5xl">
              Turn your{" "}
              <span className="bg-gradient-to-r from-lime-300 via-cyan-300 to-lime-300 bg-clip-text text-transparent">
                dream life
              </span>{" "}
              into a measurable, winnable plan.
            </h1>

            <p className="mb-6 max-w-xl text-sm text-slate-400 sm:text-base">
              Outcome connects your goals, routines, and an AI agent into a
              single personal OS. It scores your current path, runs the
              simulation, and then tells you exactly what to do next.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="#how-it-works"
                className="group inline-flex items-center gap-2 rounded-full bg-slate-50 px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.22em] text-slate-950 hover:bg-lime-300"
              >
                Get started
                <span className="translate-y-[1px] text-base group-hover:translate-x-1 transition-transform">
                  ↗
                </span>
              </Link>
              <button className="inline-flex items-center text-xs font-medium text-slate-300 hover:text-lime-300">
                Watch preview
                <span className="ml-2 h-px w-8 bg-gradient-to-r from-slate-600 to-lime-300" />
              </button>
            </div>

            <div className="mt-6 flex flex-wrap gap-6 text-xs text-slate-500">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em]">
                  CURRENT USERS
                </p>
                <p className="mt-1 text-sm text-slate-200">Early access cohort</p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em]">
                  BUILT FOR
                </p>
                <p className="mt-1 text-sm text-slate-200">
                  Founders, athletes, creators, high performers.
                </p>
              </div>
            </div>
          </div>

          {/* Right hero panel */}
          <div className="relative">
            <div className="pointer-events-none absolute -inset-6 rounded-[40px] bg-gradient-to-br from-lime-300/25 via-cyan-400/15 to-transparent blur-2xl" />
            <div className="relative overflow-hidden rounded-[32px] border border-slate-800/80 bg-slate-900/90 shadow-[0_24px_80px_rgba(15,23,42,0.85)]">
              {/* Top bar */}
              <div className="flex items-center justify-between border-b border-slate-800/80 px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-rose-500/70" />
                  <span className="h-2 w-2 rounded-full bg-amber-400/70" />
                  <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
                  <span className="ml-2 text-[11px] text-slate-500">
                    outcome / live-sim
                  </span>
                </div>
                <span className="rounded-full border border-lime-300/30 bg-lime-300/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-lime-200">
                  synced
                </span>
              </div>

              {/* Faux dashboard preview */}
              <div className="grid gap-4 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 px-4 pb-4 pt-3 sm:grid-cols-2">
                <div className="space-y-3">
                  <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-3">
                    <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-500">
                      Today&apos;s Outcome
                    </p>
                    <div className="mt-3 flex items-end justify-between">
                      <p className="text-3xl font-semibold text-lime-300">
                        82
                        <span className="ml-1 text-xs text-slate-500">/100</span>
                      </p>
                      <p className="rounded-full bg-slate-950/80 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-emerald-300">
                        on track
                      </p>
                    </div>
                    <p className="mt-3 text-[11px] text-slate-500">
                      Based on deep work, habits, and sleep in the last 7 days.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-3">
                    <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-500">
                      Trend overview
                    </p>
                    <div className="mt-2 flex items-end justify-between gap-2">
                      {Array.from({ length: 7 }).map((_, i) => (
                        <div
                          key={i}
                          className="flex flex-1 flex-col items-center gap-1"
                        >
                          <div className="flex h-16 w-6 items-end justify-center overflow-hidden rounded-full bg-slate-900">
                            <div className="h-10 w-full rounded-full bg-gradient-to-t from-lime-300 via-cyan-300 to-slate-50" />
                          </div>
                          <span className="text-[10px] text-slate-500">
                            {"SMTWTFS"[i]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-3">
                    <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-500">
                      Outcome agent says
                    </p>
                    <ul className="mt-2 space-y-2 text-[11px] text-slate-300">
                      <li>• Lock a 90-minute deep work block before 2pm.</li>
                      <li>
                        • Move leg day to tomorrow – sleep debt is &gt; 1.5h.
                      </li>
                      <li>• Review your offers pipeline for 10 minutes.</li>
                    </ul>
                    <button className="mt-3 w-full rounded-full bg-slate-50 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-950 hover:bg-lime-300">
                      Ask Outcome: “What gives me the most leverage today?”
                    </button>
                  </div>

                  <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-3">
                    <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-500">
                      Dream tracks
                    </p>
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-slate-300">
                        <span>Body — 90kg lean / 10% BF</span>
                        <span className="text-lime-300">63%</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
                        <div className="h-full w-2/3 rounded-full bg-lime-300" />
                      </div>

                      <div className="mt-2 flex items-center justify-between text-[11px] text-slate-300">
                        <span>Income — 20k / month</span>
                        <span className="text-lime-300">41%</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
                        <div className="h-full w-2/5 rounded-full bg-cyan-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURE GRID */}
        <section className="mb-16 space-y-6">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.26em] text-slate-400">
              Outcome in one glance
            </h2>
            <p className="max-w-sm text-xs text-slate-500">
              Everything you see in the preview panel becomes fully interactive
              once you subscribe – every number is clickable and backed by AI.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-5 py-5 shadow-[0_16px_40px_rgba(15,23,42,0.9)] transition-transform hover:-translate-y-1 hover:shadow-[0_26px_80px_rgba(15,23,42,1)]"
              >
                <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.22em] text-lime-300/80">
                  FEATURE
                </p>
                <h3 className="mb-2 text-base font-semibold text-slate-50">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-400">{feature.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="mb-16 space-y-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.26em] text-slate-400">
                How Outcome works
              </h2>
              <p className="mt-2 max-w-md text-sm text-slate-300">
                From first question to full live dashboard in under ten minutes.
                Outcome gives you a clean funnel from curiosity → clarity →
                commitment.
              </p>
            </div>
            <p className="max-w-xs text-xs text-slate-500">
              You can stay on the free preview, or unlock the full OS whenever
              you&apos;re ready to actually commit.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {steps.map((step) => (
              <div
                key={step.label}
                className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/60 px-5 py-5"
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rotate-6 rounded-full border border-lime-300/40 bg-gradient-to-br from-lime-300/20 via-transparent to-transparent blur-xl" />
                <p className="mb-2 text-[11px] font-semibold tracking-[0.26em] text-slate-500">
                  {step.label}
                </p>
                <h3 className="mb-2 text-sm font-semibold text-slate-50">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-400">{step.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="mb-20 space-y-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.26em] text-slate-400">
                Pricing
              </h2>
              <p className="mt-2 text-sm text-slate-300">
                Start with the free preview. Upgrade only if you want the full
                AI dashboard and daily execution engine.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative flex flex-col rounded-3xl border bg-slate-950/80 p-6 ${
                  tier.highlight
                    ? "border-lime-300/70 shadow-[0_24px_80px_rgba(190,242,100,0.4)]"
                    : "border-slate-800"
                }`}
              >
                {tier.highlight && (
                  <div className="absolute right-6 top-6 rounded-full bg-lime-300 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-950">
                    Best for Outcome users
                  </div>
                )}
                <h3 className="text-sm font-semibold text-slate-50">
                  {tier.name}
                </h3>
                <p className="mt-1 text-lg font-semibold text-slate-50">
                  {tier.price}
                </p>
                <p className="mt-2 text-sm text-slate-400">{tier.description}</p>

                <ul className="mt-4 flex-1 space-y-2 text-sm text-slate-300">
                  {tier.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-1 w-4 rounded-full bg-lime-300" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={tier.highlight ? "/signup" : "#how-it-works"}
                  className={`mt-6 inline-flex items-center justify-center rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] ${
                    tier.highlight
                      ? "bg-lime-300 text-slate-950 hover:bg-lime-200"
                      : "border border-slate-700 text-slate-100 hover:border-lime-300 hover:text-lime-300"
                  }`}
                >
                  {tier.highlight ? "Unlock Outcome" : "Start free preview"}
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER / FINAL CTA */}
        <footer className="border-t border-slate-800 pt-6 text-xs text-slate-500">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p>
              Outcome · Personal OS for people who actually plan to win their
              own life.
            </p>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="hover:text-slate-300">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-slate-300">
                Terms
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
