import AttributesPanel from "./sections/AttributesPanel";
import DailyBlocks from "./sections/DailyBlocks";
import FocusBlock from "./sections/FocusBlock";
import GoalsPanel from "./sections/GoalsPanel";
import MoneyTracker from "./sections/MoneyTracker";
import OutcomeStreaks from "./sections/OutcomeStreaks";
import ProbabilityCard from "./sections/ProbabilityCard";
import TaskPanel from "./sections/TaskPanel";
import TrendOverview from "./sections/TrendOverview";

export default function DashboardPage() {
  return (
    <div className="min-h-screen w-full bg-[#0b0b0f] text-white">
      {/* Subtle background glow */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full blur-3xl bg-blue-500/10 dark:bg-orange-500/10" />
        <div className="absolute -bottom-48 -left-48 h-[520px] w-[520px] rounded-full blur-3xl bg-blue-300/10 dark:bg-yellow-400/10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/30 to-black/60" />
      </div>

      <div className="min-h-screen w-full px-4 md:px-8 py-8">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
              Dashboard
            </h1>
            <p className="text-white/60 text-sm mt-1">
              Your daily operating system.
            </p>
          </div>

          {/* Main grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Row 1 */}
            <div className="lg:col-span-12">
              <ProbabilityCard />
            </div>

            {/* Row 2 */}
            <div className="lg:col-span-4">
              <AttributesPanel />
            </div>
            <div className="lg:col-span-4">
              <FocusBlock />
            </div>
            <div className="lg:col-span-4">
              <OutcomeStreaks />
            </div>

            {/* Row 3 */}
            <div className="lg:col-span-6">
              <TaskPanel />
            </div>
            <div className="lg:col-span-6">
              <DailyBlocks />
            </div>

            {/* Row 4 */}
            <div className="lg:col-span-7">
              <GoalsPanel />
            </div>
            <div className="lg:col-span-5">
              <MoneyTracker />
            </div>

            {/* Row 5 */}
            <div className="lg:col-span-12">
              <TrendOverview />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
