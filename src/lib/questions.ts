// src/lib/questions.ts

import type { Question } from "./types";

/**
 * DREAM QUESTIONS
 * “Ideal future” – where the user wants to be.
 */

export const dreamQuestions: Question[] = [
  // Lifestyle & environment
  {
    id: "dream_lifestyle_1",
    area: "lifestyle",
    kind: "dream",
    prompt: "Where do you ideally live, and what does your day-to-day environment look like?",
  },
  {
    id: "dream_lifestyle_2",
    area: "lifestyle",
    kind: "dream",
    prompt: "Describe your ideal home, room by room. What does it feel like to walk through it?",
  },
  {
    id: "dream_lifestyle_3",
    area: "lifestyle",
    kind: "dream",
    prompt: "What does a perfect normal day look like for you in this future life?",
  },
  {
    id: "dream_lifestyle_4",
    area: "lifestyle",
    kind: "dream",
    prompt: "How much free time do you have each week, and what do you do with it?",
  },
  {
    id: "dream_lifestyle_5",
    area: "lifestyle",
    kind: "dream",
    prompt: "What experiences, hobbies, or adventures are a normal part of your lifestyle?",
  },

  // Career & wealth
  {
    id: "dream_career_1",
    area: "career",
    kind: "dream",
    prompt: "What career or business are you known for in your dream life?",
  },
  {
    id: "dream_career_2",
    area: "career",
    kind: "dream",
    prompt: "How does your ideal workday feel from start to finish?",
  },
  {
    id: "dream_wealth_1",
    area: "wealth",
    kind: "dream",
    prompt: "What is your ideal monthly income, and what does that income give you freedom to do?",
  },
  {
    id: "dream_wealth_2",
    area: "wealth",
    kind: "dream",
    prompt: "What assets or investments do you own in your ideal future?",
  },
  {
    id: "dream_career_3",
    area: "career",
    kind: "dream",
    prompt: "How do people describe your professional reputation when you’re at your best?",
  },

  // Health
  {
    id: "dream_health_1",
    area: "health",
    kind: "dream",
    prompt: "What does your ideal body look and feel like (energy, strength, appearance)?",
  },
  {
    id: "dream_health_2",
    area: "health",
    kind: "dream",
    prompt: "Which health habits are automatic and effortless for you in this future?",
  },
  {
    id: "dream_health_3",
    area: "health",
    kind: "dream",
    prompt: "What physical challenge or goal have you completely mastered?",
  },
  {
    id: "dream_health_4",
    area: "health",
    kind: "dream",
    prompt: "What have you eliminated from your life (pain, fatigue, injuries, weight, etc.)?",
  },
  {
    id: "dream_health_5",
    area: "health",
    kind: "dream",
    prompt: "How does your ideal morning and evening routine support your health?",
  },

  // Relationships & social
  {
    id: "dream_relationships_1",
    area: "relationships",
    kind: "dream",
    prompt: "Describe your ideal romantic relationship or partner dynamic.",
  },
  {
    id: "dream_relationships_2",
    area: "relationships",
    kind: "dream",
    prompt: "What does your social circle look like? Who are you surrounded by?",
  },
  {
    id: "dream_relationships_3",
    area: "relationships",
    kind: "dream",
    prompt: "What kind of collaborators, mentors, or teammates are you working with?",
  },
  {
    id: "dream_relationships_4",
    area: "relationships",
    kind: "dream",
    prompt: "How do people feel after spending time around you?",
  },
  {
    id: "dream_relationships_5",
    area: "relationships",
    kind: "dream",
    prompt: "How do you regularly give back or contribute to people you care about?",
  },

  // Mindset & identity
  {
    id: "dream_mindset_1",
    area: "mindset",
    kind: "dream",
    prompt: "What 3 words best describe the future version of you you’re building?",
  },
  {
    id: "dream_mindset_2",
    area: "mindset",
    kind: "dream",
    prompt: "How do you think and make decisions under pressure in your ideal state?",
  },
  {
    id: "dream_mindset_3",
    area: "mindset",
    kind: "dream",
    prompt: "What core beliefs and principles drive your success in this future?",
  },
  {
    id: "dream_mindset_4",
    area: "mindset",
    kind: "dream",
    prompt: "How do you handle failure or setbacks when you’re operating at your best?",
  },
  {
    id: "dream_mindset_5",
    area: "mindset",
    kind: "dream",
    prompt: "What legacy do you want to leave behind, and for who?",
  },
];

/**
 * REALITY QUESTIONS
 * “Current snapshot” – where the user is right now.
 */

export const realityQuestions: Question[] = [
  // Lifestyle & environment
  {
    id: "reality_lifestyle_1",
    area: "lifestyle",
    kind: "reality",
    prompt: "Where are you currently living, and how does your daily environment feel?",
  },
  {
    id: "reality_lifestyle_2",
    area: "lifestyle",
    kind: "reality",
    prompt: "Walk me through a normal weekday from the moment you wake up.",
  },
  {
    id: "reality_lifestyle_3",
    area: "lifestyle",
    kind: "reality",
    prompt: "How many hours of genuine free time do you have each week right now?",
  },
  {
    id: "reality_lifestyle_4",
    area: "lifestyle",
    kind: "reality",
    prompt: "What are the biggest lifestyle habits or environments holding you back?",
  },
  {
    id: "reality_lifestyle_5",
    area: "lifestyle",
    kind: "reality",
    prompt: "What’s one area of your lifestyle that already feels close to your ideal?",
  },

  // Career & wealth
  {
    id: "reality_career_1",
    area: "career",
    kind: "reality",
    prompt: "What do you currently do for work or study, and how do you feel about it?",
  },
  {
    id: "reality_career_2",
    area: "career",
    kind: "reality",
    prompt: "What skills are you actively using right now that make you valuable?",
  },
  {
    id: "reality_wealth_1",
    area: "wealth",
    kind: "reality",
    prompt: "What is your current average monthly income?",
  },
  {
    id: "reality_wealth_2",
    area: "wealth",
    kind: "reality",
    prompt: "Roughly how much do you currently have saved or invested?",
  },
  {
    id: "reality_career_3",
    area: "career",
    kind: "reality",
    prompt: "How would your manager, clients, or peers honestly describe your reputation today?",
  },

  // Health
  {
    id: "reality_health_1",
    area: "health",
    kind: "reality",
    prompt: "How would you rate your current physical health and energy out of 10?",
  },
  {
    id: "reality_health_2",
    area: "health",
    kind: "reality",
    prompt: "What does your current training or movement routine look like in a typical week?",
  },
  {
    id: "reality_health_3",
    area: "health",
    kind: "reality",
    prompt: "How are your sleep quality, stress levels, and recovery right now?",
  },
  {
    id: "reality_health_4",
    area: "health",
    kind: "reality",
    prompt: "Is there any pain, injury, or health issue you’re currently dealing with?",
  },
  {
    id: "reality_health_5",
    area: "health",
    kind: "reality",
    prompt: "What’s the most consistent healthy habit you already have locked in?",
  },

  // Relationships & social
  {
    id: "reality_relationships_1",
    area: "relationships",
    kind: "reality",
    prompt: "What does your current romantic situation look like (single, dating, relationship)?",
  },
  {
    id: "reality_relationships_2",
    area: "relationships",
    kind: "reality",
    prompt: "Describe the people you spend the most time with week to week.",
  },
  {
    id: "reality_relationships_3",
    area: "relationships",
    kind: "reality",
    prompt: "Do you currently have mentors, role models, or a community that pushes you?",
  },
  {
    id: "reality_relationships_4",
    area: "relationships",
    kind: "reality",
    prompt: "Where do you feel the most social friction, conflict, or lack of support?",
  },
  {
    id: "reality_relationships_5",
    area: "relationships",
    kind: "reality",
    prompt: "In what ways are you already a strong friend, partner, or teammate?",
  },

  // Mindset & identity
  {
    id: "reality_mindset_1",
    area: "mindset",
    kind: "reality",
    prompt: "What beliefs or internal stories currently limit you the most?",
  },
  {
    id: "reality_mindset_2",
    area: "mindset",
    kind: "reality",
    prompt: "How do you usually react when things don’t go to plan or you fail at something?",
  },
  {
    id: "reality_mindset_3",
    area: "mindset",
    kind: "reality",
    prompt: "How focused are you day to day? What are your biggest distractions?",
  },
  {
    id: "reality_mindset_4",
    area: "mindset",
    kind: "reality",
    prompt: "What routines or systems do you actually have in place to keep you on track?",
  },
  {
    id: "reality_mindset_5",
    area: "mindset",
    kind: "reality",
    prompt: "If nothing changed, where do you realistically see yourself in 3 years?",
  },
];

/**
 * Handy combined export if you ever want the whole list.
 */
export const allQuestions: Question[] = [...dreamQuestions, ...realityQuestions];
