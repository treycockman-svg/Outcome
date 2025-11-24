import Hero from "./_components/Hero";
import FeatureCard from "./_components/FeatureCard";
import SectionTitle from "./_components/SectionTitle";
import NeonDivider from "./_components/NeonDivider";
import TestimonialCard from "./_components/TestimonialCard";
import PricingCard from "./_components/PricingCard";

export default function MarketingPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 dark:bg-[#0a0a0a] dark:text-white">
      <Hero />

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 md:px-8 py-16 md:py-20">
        <SectionTitle
          eyebrow="WHAT OUTCOME DOES"
          title="Your life, organised like a game you actually want to win."
          subtitle="Outcome turns your dream life into a daily operating system: goals, focus blocks, tasks, streaks, and progress — all in one clean dashboard."
        />

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <FeatureCard
            index={0}
            title="Dream → Reality Blueprint"
            description="Answer powerful prompts, define your future, and see a clear path from where you are to where you’re going."
            badge="Onboarding"
            icon={<span className="text-xl">🌅</span>}
          />
          <FeatureCard
            index={1}
            title="Daily Task Engine"
            description="Plan your day with structured tasks, tags, XP, priorities, and completion flow."
            badge="Dashboard"
            icon={<span className="text-xl">✅</span>}
          />
          <FeatureCard
            index={2}
            title="Focus Blocks"
            description="Lock in deep work sessions with timers, preset modes, and streak-friendly pacing."
            badge="Productivity"
            icon={<span className="text-xl">⏳</span>}
          />
          <FeatureCard
            index={3}
            title="Goals & Progress"
            description="Track goals across life categories with clear % progress and deadlines."
            badge="Tracking"
            icon={<span className="text-xl">🎯</span>}
          />
          <FeatureCard
            index={4}
            title="Outcome Streaks"
            description="Build habits that compound. Streak heatmaps keep momentum visible."
            badge="Habits"
            icon={<span className="text-xl">🔥</span>}
          />
          <FeatureCard
            index={5}
            title="Probability Forecast"
            description="Get a live estimate of how likely you are to finish your day based on completion trends."
            badge="AI Insight"
            icon={<span className="text-xl">📈</span>}
          />
        </div>
      </section>

      <NeonDivider label="PROOF" />

      {/* Testimonials */}
      <section className="mx-auto max-w-6xl px-4 md:px-8 py-16 md:py-20">
        <SectionTitle
          eyebrow="RESULTS"
          title="People move faster with Outcome."
          subtitle="Outcome is built to make discipline feel simple — and progress feel addictive."
        />

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          <TestimonialCard
            index={0}
            quote="This feels like having a coach, planner, and progress tracker in one. I finally know what to do every day."
            name="Jordan W."
            role="Creator"
            rating={5}
          />
          <TestimonialCard
            index={1}
            quote="The streaks + daily blocks changed my consistency. I’m getting more done with less stress."
            name="Mia R."
            role="Student"
            rating={5}
          />
          <TestimonialCard
            index={2}
            quote="Outcome turned vague goals into a real system. It’s the first app that actually keeps me accountable."
            name="Ethan K."
            role="Founder"
            rating={5}
          />
        </div>
      </section>

      <NeonDivider label="PRICING" />

      {/* Pricing */}
      <section className="mx-auto max-w-6xl px-4 md:px-8 py-16 md:py-20">
        <SectionTitle
          eyebrow="PLANS"
          title="Start free. Upgrade when you’re ready to go all-in."
          subtitle="Light mode uses blue accents. Dark mode uses orange accents — matching your Outcome theme."
        />

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          <PricingCard
            index={0}
            name="Free"
            price="$0"
            description="Get rolling with the core system."
            features={[
              "Dream Life onboarding prompts",
              "Basic daily tasks + blocks",
              "Streak tracking (limited)",
              "Weekly trend overview",
            ]}
            ctaLabel="Start Free"
            onCtaClick={() => (window.location.href = "/onboarding")}
          />

          <PricingCard
            index={1}
            name="Outcome Pro"
            price="$25"
            popular
            badge="Most Popular"
            description="Full system, full momentum."
            features={[
              "Everything in Free",
              "Unlimited streak habits",
              "Advanced focus modes",
              "Goal categories + timelines",
              "Probability forecasting",
              "Priority support",
            ]}
            ctaLabel="Go Pro"
            onCtaClick={() => (window.location.href = "/onboarding/paywall")}
          />

          <PricingCard
            index={2}
            name="Outcome Elite"
            price="$70"
            description="For people building a serious future."
            features={[
              "Everything in Pro",
              "Elite dashboards & analytics",
              "Custom life blueprint reviews",
              "Monthly progress reports",
              "Early access to new features",
            ]}
            ctaLabel="Join Elite"
            onCtaClick={() => (window.location.href = "/onboarding/paywall")}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 md:px-8 pb-20">
        <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">
              Ready to build your dream life?
            </h3>
            <p className="mt-2 text-sm md:text-base text-black/70 dark:text-white/70">
              Outcome gives you the structure to win the day — and the future.
            </p>
          </div>
          <div className="flex gap-2">
            <a
              href="/onboarding"
              className="rounded-md px-5 py-2.5 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition dark:bg-orange-500 dark:hover:bg-orange-600"
            >
              Start Now
            </a>
            <a
              href="/dashboard"
              className="rounded-md px-5 py-2.5 text-sm font-medium bg-black text-white hover:bg-black/90 transition dark:bg-white/10 dark:hover:bg-white/15"
            >
              View Dashboard
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
