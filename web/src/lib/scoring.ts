// lib/scoring.ts - GOVERN Assessment Scoring Logic
// Copy this entire file content to your lib/scoring.ts

export interface QuizResponse {
  questionId: string;
  subcategory: string; // "GOVERN.1.1", "GOVERN.2.1", etc.
  weight: "critical" | "important" | "good-to-have";
  selectedValue: number; // 0, 1, or 2
  selectedText: string;
}

export interface ScoreResult {
  governScore: number; // 0-5 scale with one decimal
  maturityTier: "Emerging" | "Developing" | "Maturing" | "Optimized";
  insights: {
    strongestArea: string;
    priorityFocus: string;
  };
  subcategoryScores: Record<string, number>; // For detailed breakdown
}

/**
 * Calculate weighted GOVERN maturity score (0-5 scale)
 */
export function calculateGOVERNScore(responses: QuizResponse[]): ScoreResult {
  let totalPoints = 0;
  let maxPoints = 0;
  
  // Track subcategory performance for insights
  const subcategoryPerformance: Record<string, { points: number; maxPoints: number; weight: number }> = {};
  
  responses.forEach(response => {
    // Get weight multiplier
    const weight = getQuestionWeight(response.weight);
    
    // Calculate points for this question
    const questionPoints = response.selectedValue * weight; // 0, 1, or 2 * weight
    const questionMaxPoints = 2 * weight; // Max 2 points per question * weight
    
    totalPoints += questionPoints;
    maxPoints += questionMaxPoints;
    
    // Track subcategory performance
    const subcategory = response.subcategory;
    if (!subcategoryPerformance[subcategory]) {
      subcategoryPerformance[subcategory] = { points: 0, maxPoints: 0, weight: 0 };
    }
    subcategoryPerformance[subcategory].points += questionPoints;
    subcategoryPerformance[subcategory].maxPoints += questionMaxPoints;
    subcategoryPerformance[subcategory].weight += weight;
  });
  
  // Calculate 0-5 scale score with one decimal place
  const rawScore = (totalPoints / maxPoints) * 5;
  const governScore = Math.round(rawScore * 10) / 10;
  
  // Determine maturity tier
  const maturityTier = getMaturityTier(governScore);
  
  // Generate insights
  const insights = generateInsights(subcategoryPerformance);
  
  // Calculate subcategory scores for detailed breakdown
  const subcategoryScores: Record<string, number> = {};
  Object.entries(subcategoryPerformance).forEach(([subcategory, performance]) => {
    subcategoryScores[subcategory] = Math.round((performance.points / performance.maxPoints) * 5 * 10) / 10;
  });
  
  return {
    governScore,
    maturityTier,
    insights,
    subcategoryScores
  };
}

/**
 * Get weight multiplier for question importance
 */
function getQuestionWeight(weight: string): number {
  switch (weight) {
    case "critical": return 3;
    case "important": return 2;
    case "good-to-have": return 1;
    default: return 1;
  }
}

/**
 * Map score to NIST maturity tier
 */
function getMaturityTier(score: number): "Emerging" | "Developing" | "Maturing" | "Optimized" {
  if (score >= 0.0 && score <= 1.2) return "Emerging";
  if (score >= 1.3 && score <= 2.4) return "Developing";
  if (score >= 2.5 && score <= 3.7) return "Maturing";
  if (score >= 3.8 && score <= 5.0) return "Optimized";
  return "Emerging"; // fallback
}

/**
 * Generate insights about strongest area and priority focus
 */
function generateInsights(subcategoryPerformance: Record<string, { points: number; maxPoints: number; weight: number }>): {
  strongestArea: string;
  priorityFocus: string;
} {
  const subcategoryNames: Record<string, string> = {
    "GOVERN.1": "Policies and Procedures",
    "GOVERN.2": "Accountability Structures", 
    "GOVERN.3": "Workforce Diversity",
    "GOVERN.4": "Risk Communication Culture",
    "GOVERN.5": "Stakeholder Engagement",
    "GOVERN.6": "Third-party Risk Management"
  };
  
  // Calculate performance percentage for each main subcategory
  const performanceByCategory: Record<string, number> = {};
  
  Object.entries(subcategoryPerformance).forEach(([subcategory, performance]) => {
    // Get main category (e.g., "GOVERN.1" from "GOVERN.1.2")
    const mainCategory = subcategory.split('.').slice(0, 2).join('.');
    
    if (!performanceByCategory[mainCategory]) {
      performanceByCategory[mainCategory] = 0;
    }
    
    const percentage = performance.points / performance.maxPoints;
    performanceByCategory[mainCategory] += percentage;
  });
  
  // Find strongest and weakest areas
  let strongestArea = "GOVERN.1";
  let weakestArea = "GOVERN.1";
  let highestScore = 0;
  let lowestScore = 1;
  
  Object.entries(performanceByCategory).forEach(([category, score]) => {
    if (score > highestScore) {
      highestScore = score;
      strongestArea = category;
    }
    if (score < lowestScore) {
      lowestScore = score;
      weakestArea = category;
    }
  });
  
  return {
    strongestArea: subcategoryNames[strongestArea] || "Executive Accountability",
    priorityFocus: subcategoryNames[weakestArea] || "Policy Documentation"
  };
}

/**
 * Generate tier-specific recommendations
 */
export function getTierRecommendations(tier: string): string[] {
  const recommendations: Record<string, string[]> = {
    "Emerging": [
      "Establish basic AI governance policies and assign clear ownership",
      "Identify and document current AI systems in use across your organization",
      "Create a simple risk assessment process for new AI implementations",
      "Designate someone responsible for AI oversight and decision-making"
    ],
    "Developing": [
      "Formalize your AI governance processes with documented procedures",
      "Expand your AI governance team with diverse perspectives and expertise",
      "Implement regular reviews of AI policies and risk assessments",
      "Create mechanisms for collecting feedback on AI system performance"
    ],
    "Maturing": [
      "Establish comprehensive metrics and monitoring for AI governance effectiveness",
      "Implement advanced risk management practices including third-party assessments",
      "Create stakeholder engagement programs for AI transparency and accountability",
      "Develop contingency plans for AI system failures or unexpected behaviors"
    ],
    "Optimized": [
      "Share your AI governance best practices with industry peers and communities",
      "Continuously adapt your framework to address emerging AI risks and regulations",
      "Lead innovation in AI risk management through research and development",
      "Mentor other organizations in developing their AI governance capabilities"
    ]
  };
  
  return recommendations[tier] || recommendations["Emerging"];
}

/**
 * Example usage and test data
 */
export function exampleUsage() {
  const sampleResponses: QuizResponse[] = [
    {
      questionId: "gov-1-1",
      subcategory: "GOVERN.1.1",
      weight: "critical",
      selectedValue: 2,
      selectedText: "Yes, with clearly defined responsibilities"
    },
    {
      questionId: "gov-1-2", 
      subcategory: "GOVERN.1.2",
      weight: "important",
      selectedValue: 1,
      selectedText: "Partially implemented"
    },
    {
      questionId: "gov-2-1",
      subcategory: "GOVERN.2.1", 
      weight: "critical",
      selectedValue: 0,
      selectedText: "No formal process"
    }
  ];
  
  const result = calculateGOVERNScore(sampleResponses);
  console.log("Score Result:", result);
  
  const recommendations = getTierRecommendations(result.maturityTier);
  console.log("Recommendations:", recommendations);
  
  return result;
}
