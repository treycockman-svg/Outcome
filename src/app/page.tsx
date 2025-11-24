'use client';

import { useMemo, useState } from 'react';

// ✅ IMPORTANT: match your actual tree
import ThemeToggle from '@/app/marketing/_components/ThemeToggle';
import Panel3D from '@/app/marketing/_components/Panel3D';
import StatsCard from '@/app/marketing/_components/StatsCard';
import TrendChart from '@/app/marketing/_components/TrendChart';
import DreamTrackCard from '@/app/marketing/_components/DreamTrackCard';
import PipelineCard from '@/app/marketing/_components/PipelineCard';
import BlockMap from '@/app/marketing/_components/BlockMap';

type Step =
  | 'hero'
  | 'dream'
  | 'reality'
  | 'preview'
  | 'paywall'
  | 'dashboard';

const dreamQuestions: string[] = [
  'Where do you imagine living in your ideal future?',
  'What does your home and daily environment look and feel like?',
  'Who shares this space or lifestyle with you?',
  'How does your ideal morning begin?',
  'What experiences fill your weekends and free time?',
  'What path or profession do you see yourself thriving in?',
  'How does your ideal work make you feel every day?',
  'What level of freedom or stability do you want financially?',
  'Who do you serve, help, or inspire through your work?',
  'What kind of impact or legacy do you want to create in your field?',
  'How does your body feel when you wake up each day?',
  'What daily habits keep you energized and strong?',
  'How do you move, train, or stay active?',
  'What foods or routines support your best self?',
  'How confident and comfortable do you feel in your body?',
  'Who are the most important people in your dream life?',
  'What does your ideal romantic or family relationship look like?',
  'What kind of friendships or community surround you?',
  'How do you celebrate success and connection with others?',
  'What does your social life teach or bring out in you?',
  'What 3 words describe the person you are becoming?',
  'What emotions or attitudes guide your daily life?',
  'How do you handle pressure or challenges when they appear?',
  'What beliefs drive your progress and decisions?',
  'When you’ve achieved your dream life, what’s the very first thing you do?'
];

const realityQuestions: string[] = [
  'Where do you currently live, and how does it feel day to day?',
  'How organised or balanced is your current lifestyle (1–10)?',
  'How much genuine free time do you have each week?',
  'What’s your morning routine like right now?',
  'How often do you feel calm and present in your environment?',
  'What do you currently do for income?',
  'How fulfilled are you by your work or studies (1–10)?',
  'How consistent or secure is your financial situation?',
  'What skills or opportunities are you building right now?',
  'How clear are you about your long-term career direction (1–10)?',
  'How do you feel physically most days (energy level 1–10)?',
  'How often do you exercise or move your body each week?',
  'How healthy is your current diet or sleep routine?',
  'Do you experience any pain, fatigue, or health issues?',
  'How confident are you in your current appearance (1–10)?',
  'How supportive is your current circle of friends or mentors?',
  'What’s your current romantic or family situation like?',
  'How socially fulfilled do you feel (1–10)?',
  'How often do you connect or collaborate with new people?',
  'How respected or valued do you feel in your social circles?',
  'How disciplined or focused are you right now (1–10)?',
  'What’s your biggest recurring mental barrier or distraction?',
  'How often do you reflect, plan, or journal about your growth?',
  'How confident are you making decisions for your future (1–10)?',
  'What one habit would change everything if you mastered it?'
];

export default function OutcomePage() {
  const [step, setStep] = useState<Step>('hero');

  const [dreamAnswers, setDreamAnswers] = useState<string[]>(
    Array(dreamQuestions.length).fill('')
  );
  const [realityAnswers, setRealityAnswers] = useState<string[]>(
    Array(realityQuestions.length).fill('')
  );

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [previewScore, setPreviewScore] = useState<number | null>(null);
  const [previewSummary, setPreviewSummary] = useState('');
  const [pillarsPreview, setPillarsPreview] = useState<
    { label: string; score: number }[]
  >([]);

  const allDreamAnswered = useMemo(
    () => dreamAnswers.filter((a) => a.trim().length > 3).length,
    [dreamAnswers]
  );
  const allRealityAnswered = useMemo(
    () => realityAnswers.filter((a) => a.trim().length > 3).length,
    [realityAnswers]
  );

  const totalQuestions = dreamQuestions.length + realityQuestions.length;
  const totalAnswered = allDreamAnswered + allRealityAnswered;
  const completionPercent = Math.round(
    (totalAnswered / totalQuestions) * 100
  );

  // ✅ Required props for PipelineCard
  const pipelinePreview = useMemo(() => {
    const planned = Math.max(0, totalQuestions - totalAnswered);
    const inMotion = Math.min(totalAnswered, 8);
    const lockedIn =
      completionPercent >= 70 ? 3 : completionPercent >= 40 ? 1 : 0;

    return {
      title: 'Execution pipeline',
      planned,
      inMotion,
      lockedIn
    };
  }, [totalQuestions, totalAnswered, completionPercent]);

  const dreamTrackCard = useMemo(
    () => ({
      title: 'Dream vs reality',
      value: `${totalAnswered}/${totalQuestions} prompts answered`,
      helper: 'Completing prompts raises your core probability.'
    }),
    [totalAnswered, totalQuestions]
  );

  // ✅ Required props for BlockMap
  const blocksPreview = useMemo(() => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const formatTime = (hour: number) => {
      const normalizedHour = ((hour + 11) % 12) + 1;
      const suffix = hour >= 12 ? 'pm' : 'am';
      return `${normalizedHour}:00${suffix}`;
    };

    return days.map((day, index) => {
      const progress = Math.min(
        100,
        Math.max(0, completionPercent - index * 8)
      );
      const status =
        progress >= 70 ? 'done' : progress >= 40 ? 'focus' : 'upcoming';

      const startHour = 6 + index;
      const endHour = startHour + 2;

      return {
        label: day,
        time: `${formatTime(startHour)} - ${formatTime(endHour)}`,
        status
      };
    });
  }, [completionPercent]);

  function handleDreamChange(index: number, value: string) {
    setDreamAnswers((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  }

  function handleRealityChange(index: number, value: string) {
    setRealityAnswers((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  }

  async function handleAnalyzeClick() {
    setIsAnalyzing(true);
    try {
      const base = 40;
      const boostFromCompletion = Math.round(
        (completionPercent / 100) * 50
      );
      const overall = Math.min(95, base + boostFromCompletion);

      const pillars = [
        { label: 'Mindset', score: Math.min(99, overall + 3) },
        { label: 'Health', score: Math.max(40, overall - 8) },
        { label: 'Wealth', score: Math.max(35, overall - 10) },
        { label: 'Network', score: Math.max(30, overall - 12) },
        { label: 'Execution', score: Math.min(99, overall + 1) }
      ];

      setPreviewScore(overall);
      setPillarsPreview(pillars);
      setPreviewSummary(
        'Based on your dream vs reality answers, Outcome estimates a strong foundation – but with clear upside if you sharpen wealth, health and network over the next 90 days.'
      );
      setStep('preview');
    } finally {
      setIsAnalyzing(false);
    }
  }

  // -------------------------------------------------------
  // ✅ FIXED HERO SECTION — THIS IS THE PART YOU ASKED FOR
  // -------------------------------------------------------
  function renderHero() {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-black text-slate-50">
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-xl bg-gradient-to-br from-sky-500 to-lime-400 shadow-lg shadow-sky-500/40" />
            <div className="text-xs uppercase tracking-[0.35em] text-slate-400">
              Outcome
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
          </div>
        </div>

        <main className="max-w-6xl mx-auto px-4 pb-16 pt-6 grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
          <section className="space-y-8">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                Life OS · Simulation Access
              </p>
              <h1 className="mt-3 text-4xl md:text-5xl font-semibold leading-tight">
                See your <span className="text-sky-400">probability</span> of
                reaching your dream life.
              </h1>
              <p className="mt-3 text-sm md:text-base text-slate-400 max-w-xl">
                Outcome runs a deep scan on your Dream vs Reality, then builds
                a live simulation of your odds, daily tasks and 90-day plan –
                so you can execute like it&apos;s already done.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setStep('dream')}
                className="inline-flex items-center rounded-full bg-sky-500 px-6 py-2.5 text-sm font-medium text-white shadow-[0_0_35px_rgba(56,189,248,0.7)] hover:bg-sky-400 transition"
              >
                Get Started · Free scan
              </button>
              <button
                onClick={() => setStep('dashboard')}
                className="text-sm text-slate-400 hover:text-slate-100 transition"
              >
                See dashboard preview →
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <StatsCard
                label="Probability engine"
                value="Live % odds"
                helper="Updated as you complete tasks and upgrade habits."
              />
              <StatsCard
                label="Daily Outcome Tasks"
                value="5–9 / day"
                helper="AI chooses the highest-leverage moves for your build."
              />
              <StatsCard
                label="Simulation Access"
                value="Outcome V1"
                helper="Your life, rendered like a career mode save file."
              />
            </div>
          </section>

          {/* RIGHT SIDE CARDS */}
          <section className="space-y-4">
            <Panel3D />

            <DreamTrackCard
              title={dreamTrackCard.title}
              value={dreamTrackCard.value}
              progress={completionPercent}
              helper={dreamTrackCard.helper}
            />

            {/* PipelineCard: needs title, planned, inMotion, lockedIn */}
            <PipelineCard
              title={pipelinePreview.title}
              planned={pipelinePreview.planned}
              inMotion={pipelinePreview.inMotion}
              lockedIn={pipelinePreview.lockedIn}
            />
          </section>
        </main>
      </div>
    );
  }
  function renderQuestionnaire(
    mode: 'dream' | 'reality',
    questions: string[],
    answers: string[],
    onChange: (index: number, value: string) => void,
    onNext: () => void,
    onBack?: () => void
  ) {
    const title =
      mode === 'dream'
        ? 'Design your dream build'
        : 'Scan your current reality';

    const subtitle =
      mode === 'dream'
        ? 'Answer these prompts so Outcome can see the exact life you want to simulate.'
        : 'Be brutally honest – the closer we get to the truth, the more accurate the simulation.';

    const isRealityStep = mode === 'reality';

    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-black text-slate-50">
        <div className="max-w-5xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-xl bg-gradient-to-br from-sky-500 to-lime-400 shadow-lg shadow-sky-500/40" />
            <div className="text-xs uppercase tracking-[0.35em] text-slate-400">
              Outcome · {mode === 'dream' ? 'Dream scan' : 'Reality scan'}
            </div>
          </div>
          <ThemeToggle />
        </div>

        <main className="max-w-5xl mx-auto px-4 pb-16 space-y-8">
          <div className="space-y-3">
            <h1 className="text-3xl md:text-4xl font-semibold">{title}</h1>
            <p className="text-sm text-slate-400 max-w-2xl">{subtitle}</p>
          </div>

          <div className="text-xs text-slate-500 flex items-center justify-between">
            <span>
              {mode === 'dream'
                ? `${allDreamAnswered}/${dreamQuestions.length} dream prompts answered`
                : `${allRealityAnswered}/${realityQuestions.length} reality prompts answered`}
            </span>
            <span>{completionPercent}% overall completion</span>
          </div>

          <div className="mt-2 grid gap-4 max-h-[60vh] overflow-y-auto pr-2">
            {questions.map((q, i) => (
              <div
                key={`${mode}-${i}`}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4"
              >
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500 mb-1">
                  Q{i + 1}
                </p>
                <p className="text-sm text-slate-100 mb-3">{q}</p>
                <textarea
                  className="w-full rounded-xl bg-black/40 border border-slate-800 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/60 resize-none"
                  rows={3}
                  value={answers[i] ?? ''}
                  onChange={(e) => onChange(i, e.target.value)}
                  placeholder="Type your answer here…"
                />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4">
            <button
              className="text-xs text-slate-500 hover:text-slate-200 transition"
              onClick={() => setStep('hero')}
            >
              ← Back to overview
            </button>
            <div className="flex items-center gap-3">
              {onBack && (
                <button
                  className="text-sm text-slate-400 hover:text-slate-100 transition"
                  onClick={onBack}
                >
                  Back
                </button>
              )}
              <button
                disabled={isRealityStep && isAnalyzing}
                className={`rounded-full px-5 py-2 text-sm font-medium text-white shadow-[0_0_25px_rgba(56,189,248,0.6)] transition
                  ${isRealityStep && isAnalyzing
                    ? 'bg-slate-700 cursor-not-allowed'
                    : 'bg-sky-500 hover:bg-sky-400'}`}
                onClick={onNext}
              >
                {isRealityStep && isAnalyzing ? 'Analyzing…' : 'Next step →'}
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ------------------------------
  // PREVIEW SCREEN
  // ------------------------------
  function renderPreview() {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-black text-slate-50">
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-xl bg-gradient-to-br from-sky-500 to-lime-400 shadow-lg shadow-sky-500/40" />
            <div className="text-xs uppercase tracking-[0.35em] text-slate-400">
              Outcome · Preview
            </div>
          </div>
          <ThemeToggle />
        </div>

        <main className="max-w-6xl mx-auto px-4 pb-16 space-y-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
            <section className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6 md:p-8 space-y-5">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                Simulation snapshot
              </p>
              <h1 className="text-3xl font-semibold">
                Your current probability is{' '}
                <span className="text-sky-400">
                  {previewScore ?? '—'}%
                </span>
              </h1>
              <p className="text-sm text-slate-400 max-w-xl">
                {previewSummary ||
                  "Outcome has built a first-pass estimate of your odds based on your inputs. To unlock the full breakdown, daily tasks and 90-day plan, you'll step into the full dashboard."}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                {pillarsPreview.map((p) => (
                  <StatsCard
                    key={p.label}
                    label={p.label}
                    value={`${p.score}`}
                    helper="AI pillar score"
                  />
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <TrendChart />
              <DreamTrackCard
                title={dreamTrackCard.title}
                value={dreamTrackCard.value}
                progress={completionPercent}
                helper={dreamTrackCard.helper}
              />
            </section>
          </div>

          <section className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                Unlock full Outcome
              </p>
              <h2 className="mt-2 text-lg font-semibold">
                See the full breakdown, tasks and 90-day build.
              </h2>
              <p className="text-sm text-slate-400 max-w-xl">
                Get access to your full life dashboard: daily Outcome tasks,
                money tracking, probability timeline, habit scoring and build
                archetype – updated live as you move.
              </p>
            </div>
            <div className="flex flex-col items-start gap-2">
              <button
                onClick={() => setStep('paywall')}
                className="rounded-full bg-emerald-500 px-6 py-2.5 text-sm font-medium text-black shadow-[0_0_35px_rgba(16,185,129,0.7)] hover:bg-emerald-400 transition"
              >
                See subscription options →
              </button>
              <button
                onClick={() => setStep('dashboard')}
                className="text-xs text-slate-500 hover:text-slate-200 transition"
              >
                Or preview the dashboard layout
              </button>
            </div>
          </section>
        </main>
      </div>
    );
  }

  // ------------------------------
  // PAYWALL SCREEN
  // ------------------------------
  function renderPaywall() {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-black text-slate-50">
        <div className="max-w-5xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-xl bg-gradient-to-br from-sky-500 to-lime-400 shadow-lg shadow-sky-500/40" />
            <div className="text-xs uppercase tracking-[0.35em] text-slate-400">
              Outcome · Access
            </div>
          </div>
          <ThemeToggle />
        </div>

        <main className="max-w-5xl mx-auto px-4 pb-16 space-y-8">
          <div className="space-y-3">
            <h1 className="text-3xl md:text-4xl font-semibold">
              Choose your Simulation Access.
            </h1>
            <p className="text-sm text-slate-400 max-w-2xl">
              All plans unlock your live probability dashboard, AI tasks,
              money and attribute tracking, plus full build history. Cancel
              anytime – your data stays saved.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {/* STARTER */}
            <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-5 flex flex-col justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                  Starter
                </p>
                <h2 className="mt-2 text-xl font-semibold">Weekly access</h2>
                <p className="mt-1 text-sm text-slate-400">
                  Test the engine, get your build and tasks for the next 7
                  days.
                </p>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-semibold">$50</p>
                <p className="text-xs text-slate-500">per week</p>
                <button
                  onClick={() => setStep('dashboard')}
                  className="mt-3 w-full rounded-full bg-slate-800 px-4 py-2 text-xs font-medium hover:bg-slate-700 transition"
                >
                  Start weekly simulation
                </button>
              </div>
            </div>

            {/* CORE BUILD */}
            <div className="rounded-3xl border border-emerald-500/60 bg-gradient-to-b from-emerald-500/10 via-slate-950 to-slate-950 p-5 flex flex-col justify-between shadow-[0_0_40px_rgba(16,185,129,0.5)]">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-emerald-400">
                  Core Build
                </p>
                <h2 className="mt-2 text-xl font-semibold">
                  Monthly Outcome
                </h2>
                <p className="mt-1 text-sm text-slate-200">
                  Full access to Outcome, updated daily. Recommended for real
                  builders.
                </p>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-semibold">$200</p>
                <p className="text-xs text-slate-500">per month</p>
                <button
                  onClick={() => setStep('dashboard')}
                  className="mt-3 w-full rounded-full bg-emerald-500 px-4 py-2 text-xs font-medium text-black hover:bg-emerald-400 transition"
                >
                  Unlock full dashboard
                </button>
              </div>
            </div>

            {/* ELITE */}
            <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-5 flex flex-col justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                  High Net Worth
                </p>
                <h2 className="mt-2 text-xl font-semibold">
                  Elite build access
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  White-glove support, custom archetype builds and future
                  features first.
                </p>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-semibold">$500</p>
                <p className="text-xs text-slate-500">per week</p>
                <button
                  onClick={() => setStep('dashboard')}
                  className="mt-3 w-full rounded-full bg-slate-800 px-4 py-2 text-xs font-medium hover:bg-slate-700 transition"
                >
                  Request elite access
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ------------------------------
  // DASHBOARD PREVIEW SCREEN
  // ------------------------------
  function renderDashboardPreview() {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-black text-slate-50">
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-xl bg-gradient-to-br from-sky-500 to-lime-400 shadow-lg shadow-sky-500/40" />
            <div className="text-xs uppercase tracking-[0.35em] text-slate-400">
              Outcome · Dashboard preview
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="text-xs text-slate-500 hover:text-slate-100 transition"
              onClick={() => setStep('hero')}
            >
              ← Back to overview
            </button>
            <ThemeToggle />
          </div>
        </div>

        <main className="max-w-6xl mx-auto px-4 pb-16 space-y-6">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
            <section className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                    Core probability
                  </p>
                  <h1 className="mt-2 text-2xl font-semibold">
                    73% chance you reach your current build.
                  </h1>
                  <p className="mt-1 text-xs text-slate-400 max-w-md">
                    This is recalculated every day as you tick off Outcome
                    tasks and update your money, habits and attributes.
                  </p>
                </div>
              </div>
              <TrendChart />
            </section>

            <section className="space-y-4">
              <DreamTrackCard
                title={dreamTrackCard.title}
                value={dreamTrackCard.value}
                progress={completionPercent}
                helper={dreamTrackCard.helper}
              />

              {/* FIXED: BlockMap requires title + blocks[] */}
              <BlockMap
                title="Weekly execution map"
                blocks={blocksPreview}
              />
            </section>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <StatsCard
              label="Daily Outcome Tasks"
              value="7"
              helper="Execution pipeline"
            />
            <StatsCard
              label="Money Track"
              value="$12.4k"
              helper="Current runway / war chest"
            />
            <StatsCard
              label="Next Milestone"
              value="90 days"
              helper="Until next Outcome reset"
            />
          </div>

          <section className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                Ready to make this real?
              </p>
              <h2 className="mt-2 text-lg font-semibold">
                Turn this preview into your live Outcome instance.
              </h2>
              <p className="mt-1 text-sm text-slate-400 max-w-xl">
                Once you subscribe, Outcome saves your build, locks in your
                archetype and begins tracking your tasks, money, attributes and
                probability in real time.
              </p>
            </div>
            <button
              onClick={() => setStep('paywall')}
              className="rounded-full bg-sky-500 px-6 py-2.5 text-sm font-medium text-white shadow-[0_0_35px_rgba(56,189,248,0.7)] hover:bg-sky-400 transition"
            >
              Unlock full Outcome →
            </button>
          </section>
        </main>
      </div>
    );
  }

  // ------------------------------
  // MAIN ROUTER
  // ------------------------------
  if (step === 'dream') {
    return renderQuestionnaire(
      'dream',
      dreamQuestions,
      dreamAnswers,
      handleDreamChange,
      () => setStep('reality')
    );
  }

  if (step === 'reality') {
    return renderQuestionnaire(
      'reality',
      realityQuestions,
      realityAnswers,
      handleRealityChange,
      handleAnalyzeClick,
      () => setStep('dream')
    );
  }

  if (step === 'preview') return renderPreview();
  if (step === 'paywall') return renderPaywall();
  if (step === 'dashboard') return renderDashboardPreview();

  return renderHero();
}
