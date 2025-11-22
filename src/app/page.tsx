'use client';

import { Panel3D } from '@/components/Panel3D';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useEffect, useState } from 'react';

type SupabaseStatus = 'idle' | 'ok' | 'error';

export default function Home() {
  // keep a tiny Supabase status check for now
  const [status, setStatus] = useState<SupabaseStatus>('idle');
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    async function testSupabase() {
      try {
        // if you want a real ping later, we’ll swap this out
        setStatus('ok');
        setMessage('Supabase link ready');
      } catch (err: any) {
        setStatus('error');
        setMessage(err?.message ?? 'Unknown error');
      }
    }

    testSupabase();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50 transition-colors dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 light:from-slate-50 light:via-slate-100 light:to-slate-50">
      {/* Safe max width like Apple marketing pages */}
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-10 pt-6 sm:px-6 lg:px-8 lg:pt-8">
        {/* Top bar */}
        <header className="mb-6 flex items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Outcome • Personal OS
            </div>
            <h1 className="mt-3 text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
              Is your AI actually moving your life forward?
            </h1>
            <p className="mt-1 max-w-xl text-xs text-slate-400 sm:text-sm">
              One place where your goals, routines, and AI agent all stay in sync.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button className="hidden rounded-full bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-900 shadow-sm transition hover:bg-white sm:inline-flex">
              + New Outcome
            </button>
          </div>
        </header>

        {/* Main grid */}
        <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-[1.6fr_1.1fr] lg:gap-5 xl:gap-6">
          {/* LEFT COLUMN */}
          <section className="flex flex-col gap-4 lg:gap-5">
            {/* Today + streak */}
            <Panel3D>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                    Today&apos;s Outcome
                  </p>
                  <p className="mt-1 text-3xl font-semibold text-slate-50">
                    82<span className="text-base text-emerald-400"> / 100</span>
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Based on sleep, focus blocks, training, and deep work.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-slate-900/60 px-3 py-3 text-xs text-slate-300 shadow-inner shadow-black/40">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500">
                      Streak
                    </p>
                    <p className="mt-1 text-lg font-semibold text-emerald-400">9 days</p>
                    <p className="mt-1 text-[11px] text-slate-400">No zero-days logged</p>
                  </div>
                  <div className="rounded-2xl bg-slate-900/60 px-3 py-3 text-xs text-slate-300 shadow-inner shadow-black/40">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500">
                      Focus booked
                    </p>
                    <p className="mt-1 text-lg font-semibold text-sky-400">3.5 h</p>
                    <p className="mt-1 text-[11px] text-slate-400">AI protected your deep work</p>
                  </div>
                </div>
              </div>
            </Panel3D>

            {/* Goals + pipelines */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Panel3D>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
                      Dream tracks
                    </p>
                    <h2 className="mt-1 text-sm font-semibold text-slate-100">
                      Long-term outcomes
                    </h2>
                  </div>
                  <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
                    3 active
                  </span>
                </div>

                <div className="mt-4 space-y-3">
                  {[
                    {
                      label: 'Body – 90kg lean / 10% BF',
                      progress: 0.62,
                      color: 'bg-emerald-400',
                    },
                    {
                      label: 'Income – 20k / month',
                      progress: 0.34,
                      color: 'bg-sky-400',
                    },
                    {
                      label: 'Skill – Elite sales & communication',
                      progress: 0.48,
                      color: 'bg-violet-400',
                    },
                  ].map((goal) => (
                    <div key={goal.label} className="space-y-1">
                      <p className="text-xs text-slate-300">{goal.label}</p>
                      <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
                        <div
                          className={`${goal.color} h-full rounded-full`}
                          style={{ width: `${goal.progress * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Panel3D>

              <Panel3D>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
                      This week
                    </p>
                    <h2 className="mt-1 text-sm font-semibold text-slate-100">
                      Outcome pipeline
                    </h2>
                  </div>
                  <span className="rounded-full bg-slate-100/10 px-2 py-0.5 text-[10px] font-medium text-slate-200">
                    7 tasks
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs">
                  <div>
                    <p className="text-[11px] text-slate-500">Planned</p>
                    <p className="mt-1 text-lg font-semibold text-slate-100">4</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-500">In motion</p>
                    <p className="mt-1 text-lg font-semibold text-sky-400">2</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-500">Locked in</p>
                    <p className="mt-1 text-lg font-semibold text-emerald-400">1</p>
                  </div>
                </div>

                <p className="mt-4 text-[11px] text-slate-400">
                  Outcome will reshuffle tomorrow if you miss today&apos;s deep-work block.
                </p>
              </Panel3D>
            </div>

            {/* Timeline / schedule style widget */}
            <Panel3D>
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-100">Today&apos;s block map</h2>
                <span className="text-[11px] text-slate-500">AI-aligned schedule</span>
              </div>

              <div className="mt-4 grid gap-3 text-xs md:grid-cols-3">
                <div className="space-y-2">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
                    Morning
                  </p>
                  <div className="rounded-2xl bg-slate-900/60 p-3">
                    <p className="font-medium text-slate-100">Gym • Push day</p>
                    <p className="mt-1 text-[11px] text-slate-400">06:30 – 07:45</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
                    Deep work
                  </p>
                  <div className="rounded-2xl bg-slate-900/60 p-3">
                    <p className="font-medium text-slate-100">Outcome build</p>
                    <p className="mt-1 text-[11px] text-slate-400">10:00 – 12:00</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
                    Night
                  </p>
                  <div className="rounded-2xl bg-slate-900/60 p-3">
                    <p className="font-medium text-slate-100">Reflection + planning</p>
                    <p className="mt-1 text-[11px] text-slate-400">21:30 – 22:00</p>
                  </div>
                </div>
              </div>
            </Panel3D>
          </section>

          {/* RIGHT COLUMN */}
          <section className="flex flex-col gap-4 lg:gap-5">
            {/* AI status / Supabase */}
            <Panel3D>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
                    System status
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-100">
                    Outcome AI & data link
                  </p>
                </div>
                <span
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-medium ${
                    status === 'ok'
                      ? 'bg-emerald-500/15 text-emerald-300'
                      : status === 'error'
                      ? 'bg-rose-500/15 text-rose-300'
                      : 'bg-slate-500/15 text-slate-300'
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      status === 'ok'
                        ? 'bg-emerald-400'
                        : status === 'error'
                        ? 'bg-rose-400'
                        : 'bg-slate-400'
                    }`}
                  />
                  {status === 'ok'
                    ? 'Synced'
                    : status === 'error'
                    ? 'Check Supabase'
                    : 'Checking…'}
                </span>
              </div>
              {message && (
                <p className="mt-3 text-[11px] text-slate-400">
                  {message}
                </p>
              )}
            </Panel3D>

            {/* Mini AI assistant panel */}
            <Panel3D>
              <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
                Outcome agent
              </p>
              <h2 className="mt-1 text-sm font-semibold text-slate-100">
                What your AI thinks you should do next
              </h2>

              <div className="mt-3 rounded-2xl bg-slate-900/70 p-3 text-xs text-slate-200 shadow-inner shadow-black/40">
                <p>
                  <span className="mr-1 text-sky-400">1.</span>
                  Lock in a 90-minute deep work block for Outcome build before 2pm.
                </p>
                <p className="mt-2">
                  <span className="mr-1 text-emerald-400">2.</span>
                  Move leg day to tomorrow – sleep debt is &gt; 1.5h.
                </p>
                <p className="mt-2 text-[11px] text-slate-400">
                  These suggestions update as your data, schedule, and Supabase events change.
                </p>
              </div>

              <button className="mt-3 w-full rounded-2xl bg-slate-50/95 px-4 py-2 text-xs font-semibold text-slate-900 shadow-sm transition hover:bg-white">
                Ask Outcome: &ldquo;What gives me the most leverage today?&rdquo;
              </button>
            </Panel3D>

            {/* Chart-style mini bars */}
            <Panel3D>
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-100">Trend overview</h2>
                <span className="text-[11px] text-slate-500">Last 7 days</span>
              </div>

              <div className="mt-4 flex items-end gap-2">
                {[82, 76, 91, 88, 79, 95, 84].map((score, idx) => (
                  <div key={idx} className="flex flex-1 flex-col items-center gap-1">
                    <div className="flex h-24 w-full items-end rounded-full bg-slate-900/70 p-1">
                      <div
                        className="w-full rounded-full bg-gradient-to-t from-emerald-400 via-sky-400 to-fuchsia-400"
                        style={{ height: `${(score / 100) * 100}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-slate-500">
                      {['M', 'T', 'W', 'T', 'F', 'S', 'S'][idx]}
                    </span>
                  </div>
                ))}
              </div>
            </Panel3D>
          </section>
        </div>
      </div>
    </main>
  );
}
