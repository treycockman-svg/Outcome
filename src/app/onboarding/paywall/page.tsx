"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import PricingCard from "../../marketing/_components/PricingCard";
import SectionTitle from "../../marketing/_components/SectionTitle";
import NeonDivider from "../../marketing/_components/NeonDivider";

type Billing = "monthly" | "yearly";

export default function PaywallPage() {
  const router = useRouter();
  const [billing, setBilling] = useState<Billing>("monthly");

  const prices = useMemo(() => {
    // simple yearly discount (2 months free)
    const proMonthly = 25;
    const eliteMonthly = 70;

    return {
      pro: billing === "monthly" ? `$${proMonthly}` : `$${proMonthly * 10}`,
      elite:
        billing === "monthly" ? `$${eliteMonthly}` : `$${eliteMonthly * 10}`,
      period: billing === "monthly" ? "/mo" : "/yr",
      sub:
        billing === "monthly"
          ? "Billed monthly"
          : "Billed yearly (2 months free)",
    };
  }, [billing]);

  function go(plan: "free" | "pro" | "elite") {
    router.push(`/onboarding?plan=${plan}&billing=${billing}`);
  }

  return (
    <main className="min-h-screen bg-white text-slate-900 dark:bg-[#0a0a0a] dark:text-white">
      <div className="mx-auto max-w-6xl px-4 md:px-8 py-10 md:py-14">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => router.back()}
            className="text-sm text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white transition"
          >
            ← Back
          </button>

          <div className="flex items-center gap-1 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 p-1">
            <button
              onClick={() => setBilling("monthly")}
              className={`px-3 py-1 text-xs rounded-full transition ${
                billing === "monthly"
                  ? "bg-blue-600 text-white dark:bg-orange-500"
                  : "text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling("yearly")}
              className={`px-3 py-1 text-xs rounded-full transition ${
                billing === "yearly"
                  ? "bg-blue-600 text-white dark:bg-orange-500"
                  : "text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white"
              }`}
            >
              Yearly
            </button>
          </div>
        </div>

        <SectionTitle
          eyebrow="OUTCOME PLANS"
          title="Pick the system that matches your ambition."
          subtitle="Start free. Upgrade anytime. Cancel whenever."
        />

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <PricingCard
            index={0}
            name="Free"
            price="$0"
            period="/mo"
            description="Core system to get started."
            features={[
              "Dream Life onboarding prompts",
              "Basic tasks + daily blocks",
              "Streak tracking (limited)",
              "Weekly trend overview",
            ]}
            ctaLabel="Start Free"
            onCtaClick={() => go("free")}
          />

          <PricingCard
            index={1}
            name="Outcome Pro"
            price={prices.pro}
            period={prices.period}
            popular
            badge="Most Popular"
            description={prices.sub}
            features={[
              "Everything in Free",
              "Unlimited streak habits",
              "Advanced focus modes",
              "Goal categories + timelines",
              "Probability forecasting",
              "Priority support",
            ]}
            ctaLabel="Go Pro"
            onCtaClick={() => go("pro")}
          />

          <PricingCard
            index={2}
            name="Outcome Elite"
            price={prices.elite}
            period={prices.period}
            description={prices.sub}
            features={[
              "Everything in Pro",
              "Elite dashboards & analytics",
              "Custom life blueprint reviews",
              "Monthly progress reports",
              "Early access to new features",
            ]}
            ctaLabel="Join Elite"
            onCtaClick={() => go("elite")}
          />
        </div>

        <NeonDivider className="mt-8" />

        {/* Benefits strip */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            {
              title: "Cancel anytime",
              desc: "No lock-ins. Keep control.",
            },
            {
              title: "Instant upgrade",
              desc: "Unlock Pro/Elite features right away.",
            },
            {
              title: "Your system grows with you",
              desc: "Outcome scales from day 1 to day 10,000.",
            },
          ].map((b) => (
            <div
              key={b.title}
              className="rounded-2xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 p-5"
            >
              <p className="font-semibold">{b.title}</p>
              <p className="text-sm mt-1 text-black/70 dark:text-white/70">
                {b.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4 rounded-2xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur p-6">
          <div>
            <p className="text-lg font-semibold">Not sure yet?</p>
            <p className="text-sm text-black/70 dark:text-white/70 mt-1">
              Start Free and upgrade when you feel the momentum.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => go("free")}
              className="rounded-md px-5 py-2.5 text-sm font-medium bg-black text-white hover:bg-black/90 transition dark:bg-white/10 dark:hover:bg-white/15"
            >
              Continue Free
            </button>
            <button
              onClick={() => go("pro")}
              className="rounded-md px-5 py-2.5 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition dark:bg-orange-500 dark:hover:bg-orange-600"
            >
              Upgrade to Pro
            </button>
          </div>
        </div>

        <p className="mt-6 text-center text-[11px] text-black/50 dark:text-white/45">
          By continuing you agree to Outcome’s Terms & Privacy Policy.
        </p>
      </div>
    </main>
  );
}
