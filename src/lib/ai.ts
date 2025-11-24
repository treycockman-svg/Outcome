// src/lib/ai.ts

import type { OutcomePlan, QuestionnaireAnswers } from "./types";

/**
 * Call the Outcome API route to turn questionnaire answers into
 * a fully structured OutcomePlan.
 *
 * This keeps your OpenAI key on the server – never in the browser.
 */
export async function generateOutcomePlan(
  answers: QuestionnaireAnswers,
): Promise<OutcomePlan> {
  const response = await fetch("/api/outcome", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ answers }),
  });

  if (!response.ok) {
    // You can add more detailed logging here if you want
    throw new Error("Failed to generate Outcome plan");
  }

  const data = (await response.json()) as OutcomePlan;
  return data;
}
