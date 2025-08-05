import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
  console.log("GEMINI_API_KEY:", process.env.GEMINI_API_KEY);
  
  try {
    const profile = await request.json();
    
    const prompt = `You are a BJJ expert with years of experience coaching students at all levels.

Profile: ${profile.beltRank} belt, ${profile.bodyType}, trains ${profile.trainingFrequency}
Goals: ${profile.primaryGoal?.replace('-', ' ')} over ${profile.timeframe}
${profile.challenges ? `Challenges: ${profile.challenges}` : ''}

IMPORTANT: Return ONLY a valid JSON object with this exact structure:

{
  "summary": "Brief summary of the training plan",
  "rawResponse": "AI-generated coaching advice",
  "technicalCoach": {
    "drills": ["drill 1", "drill 2", "drill 3"],
    "techniques": ["technique 1", "technique 2", "technique 3"],
    "rollingFocus": ["focus area 1", "focus area 2", "focus area 3"]
  },
  "mentalCoach": {
    "mindsetShifts": ["mindset 1", "mindset 2", "mindset 3"],
    "competitionPrep": ["prep 1", "prep 2", "prep 3"],
    "mentalTools": ["tool 1", "tool 2", "tool 3"]
  },
  "recoverySpecialist": {
    "mobility": ["mobility 1", "mobility 2", "mobility 3"],
    "recovery": ["recovery 1", "recovery 2", "recovery 3"],
    "injuryPrevention": ["prevention 1", "prevention 2", "prevention 3"]
  },
  "strengthCoach": {
    "conditioning": ["conditioning 1", "conditioning 2", "conditioning 3"],
    "strengthTraining": ["strength 1", "strength 2", "strength 3"],
    "energySystems": ["energy 1", "energy 2", "energy 3"]
  },
  "competitionStrategist": {
    "gameplan": ["gameplan 1", "gameplan 2", "gameplan 3"],
    "matchAnalysis": ["analysis 1", "analysis 2", "analysis 3"],
    "preparation": ["prep 1", "prep 2", "prep 3"]
  },
  "supportiveFriend": {
    "motivation": ["motivation 1", "motivation 2", "motivation 3"],
    "accountability": ["accountability 1", "accountability 2", "accountability 3"],
    "encouragement": ["encouragement 1", "encouragement 2", "encouragement 3"]
  }
}

Give specific, actionable advice for this ${profile.beltRank} belt practitioner. Be direct and practical. Focus on what they should prioritize right now.

⚠️ Always train safely with qualified instructors.

Return ONLY the JSON object, no other text.`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    
    console.log("GEMINI Response:", response);
    
    const parsedPlan = JSON.parse(response);
    return NextResponse.json(parsedPlan);
    
  } catch (error) {
    console.error("GEMINI failed:", error);
    return NextResponse.json(
      { error: "Failed to generate training plan" },
      { status: 500 }
    );
  }
}