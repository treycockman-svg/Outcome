"use client";

import { motion } from "framer-motion";

const features = [
  {
    title: "AI Life Blueprint",
    desc: "Outcome analyses 50+ inputs about your goals and current life to generate a personalized blueprint.",
    icon: "/icons/ai.svg",
  },
  {
    title: "Probability Engine",
    desc: "A dynamic, mathematically-driven score updates daily based on your actions.",
    icon: "/icons/probability.svg",
  },
  {
    title: "Daily Tasks System",
    desc: "AI assigns high-leverage tasks based on weaknesses, habits, and long-term goals.",
    icon: "/icons/tasks.svg",
  },
  {
    title: "Dream vs Reality Scan",
    desc: "Outcome compares your ideal lifestyle to your current situation and maps the gap.",
    icon: "/icons/scan.svg",
  },
  {
    title: "Financial Tracking",
    desc: "Smart financial widgets track spending, savings habits, and wealth-building behavior.",
    icon: "/icons/money.svg",
  },
  {
    title: "Mindset & Attribute Scoring",
    desc: "Your discipline, focus, execution, mindset, and habits are scored and improved over time.",
    icon: "/icons/attributes.svg",
  },
];

export default function FeaturesGrid() {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-white dark:bg-[#050507]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
            What you get with <span className="bg-gradient-to-r from-[#4ED2FF] via-[#4ED2FF] to-[#1A8CFF] bg-clip-text text-transparent dark:from-[#FF7E2E] dark:via-[#FF9A4B] dark:to-[#FFB86C]">OUTCOME</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300">
            Each tool is designed to move you closer to your dream life. Unlock daily insights, actionable tasks, and meaningful metrics.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex flex-col rounded-xl border border-slate-200/80 bg-white p-6 shadow-lg transition hover:shadow-xl dark:border-slate-700 dark:bg-slate-900"
            >
              <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-800">
                <img src={feature.icon} alt={`${feature.title} Icon`} className="h-6 w-6" />
              </div>
              <h3 classcomma="mt-4 text-xl font-semibold text-slate-900 dark:text-slate-50">{feature.title}</h3>
              <p className="mt-2 text-slate-600 dark:text-slate-300">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
