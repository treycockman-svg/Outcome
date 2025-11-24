// src/lib/types.ts

export type LifeArea =
  | "lifestyle"
  | "career"
  | "wealth"
  | "health"
  | "relationships"
  | "mindset";

/**
 * A single question in the Outcome questionnaire.
 */
export interface Question {
  id: string;
  area: LifeArea;
  kind: "dream" | "reality";
  prompt: string;
}

/**
 * All answers coming back from the onboarding flow.
 * Key is question.id, value is the user’s free-text answer.
 */
export interface QuestionnaireAnswers {
  dream: Record<string, string>;
  reality: Record<string, string>;
}

/**
 * A single task that Outcome generates for the user.
 */
export interface OutcomeTask {
  id: string;
  title: string;
  description: string;
  area: LifeArea;
  horizon: "today" | "this_week" | "this_month" | "long_term";
  effort: "low" | "medium" | "high";
  impact: "low" | "medium" | "high";
}

/**
 * Per-area score used for the probability engine + dashboard rings.
 */
export interface OutcomeScore {
  area: LifeArea;
  dreamScore: number;   // 0–100: how strong the dream is in this area
  realityScore: number; // 0–100: how strong current reality is
  gapScore: number;     // 0–100: how big the gap is (dream – reality)
}

/**
 * The full structured result we expect back from the AI route.
 * This is what powers the dashboard UI.
 */
export interface OutcomePlan {
  summary: string;          // 1–2 paragraph overview
  probability: number;      // 0–100 probability estimate
  narrative: string;        // longer written breakdown

  scores: OutcomeScore[];
  focusAreas: LifeArea[];

  tasksToday: OutcomeTask[];
  tasksThisWeek: OutcomeTask[];
  tasksThisMonth: OutcomeTask[];
  longTermMoves: OutcomeTask[];
}
