import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
  console.log("GEMINI_API_KEY:", process.env.GEMINI_API_KEY);
  
  try {
    const profile = await request.json();
    
    // TODO: RESTORE LATER - Coach mapping logic for structured output
    /*
    // Map user focus areas to coach types
    const coachMapping = {
      "Technical Drills": "technicalCoach",
      "Mental/Mindset Work": "mentalCoach", 
      "Physical Conditioning": "strengthCoach",
      "Recovery & Mobility": "recoverySpecialist",
      "Competition Strategy": "competitionStrategist",
      "Nutrition Guidance": "supportiveFriend", // We'll put nutrition advice here
      "Training Schedule": "supportiveFriend",
      "Injury Prevention": "recoverySpecialist"
    };

    // Get only the coaches the user selected
    const selectedCoaches = new Set();
    profile.focusAreas?.forEach(area => {
      if (coachMapping[area]) {
        selectedCoaches.add(coachMapping[area]);
      }
    });

    // If no focus areas selected, include all coaches (fallback)
    const coachesToInclude = selectedCoaches.size > 0 
      ? Array.from(selectedCoaches)
      : ["technicalCoach", "mentalCoach", "recoverySpecialist", "strengthCoach", "competitionStrategist", "supportiveFriend"];
    */

    const prompt = `You are an elite BJJ knowledge system with deep expertise across all aspects of Brazilian Jiu-Jitsu training and development. Your knowledge comes from analyzing thousands of successful training programs, studying the methods of world-class instructors, and understanding the patterns of what actually works for different types of practitioners.

LANGUAGE GUIDELINES:
- NEVER use first-person pronouns (I, me, my, myself) 
- ALWAYS address the user directly with "you/your" language
- Use third-person for supporting evidence ("practitioners find...", "research shows...")
- Frame all advice as user outcomes and their potential growth, not system experiences

🥋 BJJ TECHNICAL EXPERTISE: Deep knowledge of techniques, drilling methods, and skill development progressions from white belt to black belt level. You understand common technical plateaus and the most effective approaches to break through them.

💪 STRENGTH & CONDITIONING KNOWLEDGE: Expert understanding of how strength training, conditioning, and athleticism development specifically apply to BJJ performance. You know which exercises translate to mat performance and which are just "gym strength."

🧠 SPORTS PSYCHOLOGY MASTERY: Comprehensive knowledge of mental training, competition psychology, dealing with plateaus, building confidence, and developing the right mindset for long-term improvement.

🏥 RECOVERY & INJURY SCIENCE: Evidence-based understanding of mobility work, injury prevention, recovery protocols, and how to train smart for longevity in the sport.

🏆 COMPETITION STRATEGY: Deep knowledge of game planning, match preparation, tournament psychology, and what separates successful competitors from recreational practitioners.

🍎 NUTRITION & LIFESTYLE: Understanding of how nutrition, sleep, and lifestyle factors impact BJJ performance and recovery.

Your advice is based on proven methodologies and patterns that consistently work across different body types, belt levels, and training goals. You provide practical, actionable guidance without unnecessary fluff or personal anecdotes.

STUDENT PROFILE:
- Belt Level: ${profile.beltRank} belt
- Body Type: ${profile.bodyType}
- Training Frequency: ${profile.trainingFrequency}
- Primary Goal: ${profile.primaryGoal?.replace('-', ' ')} over ${profile.timeframe}
${profile.challenges ? `- Current Challenges: ${profile.challenges}` : ''}
- Focus Areas: ${profile.focusAreas?.join(', ') || 'General improvement'}

Provide expert-level guidance tailored to this specific practitioner. Your recommendations should be based on proven methods and deep understanding of what actually works.

COMMUNICATION STYLE: Adapt your delivery to match their preferred style:
${profile.outputStyle === 'practical' ? 'Be direct and actionable. Focus on specific steps they can implement immediately. Skip lengthy explanations unless necessary.' : ''}
${profile.outputStyle === 'motivational' ? 'Be encouraging and inspiring. Emphasize progress, growth mindset, and the rewarding aspects of their BJJ journey.' : ''}
${profile.outputStyle === 'detailed' ? 'Provide comprehensive explanations with the science and reasoning behind each recommendation. Include context about why these methods are effective.' : ''}
${profile.outputStyle === 'balanced' || !profile.outputStyle ? 'Balance thorough explanations with practical implementation. Provide both the what and the why in accessible terms.' : ''}

Remember: Different practitioners have different goals. Some train for competition, others for fitness, stress relief, or personal growth. Match your advice intensity to their actual objectives.

${profile.focusAreas?.includes('Technical Drills') ? 'TECHNICAL DEVELOPMENT: Guide them through the most effective drills and techniques for their level. Focus on what will break through their current plateaus and accelerate their skill development. Frame recommendations as "you should focus on..." or "your next step is..."' : ''}
${profile.focusAreas?.includes('Mental/Mindset Work') ? 'MENTAL TRAINING: Help them build the mental tools they need for their BJJ journey. Address their mindset challenges directly - "your competition nerves will improve when..." or "you can overcome training plateaus by..." Include what their mental growth will look like.' : ''}
${profile.focusAreas?.includes('Physical Conditioning') ? 'STRENGTH & CONDITIONING: Show them how to build strength that translates to their mat performance. Explain what their conditioning should focus on and how it will improve their rolling. Use language like "you will see improvements in..." or "your strength training should target..."' : ''}
${profile.focusAreas?.includes('Recovery & Mobility') ? 'RECOVERY PROTOCOLS: Help them understand what their recovery routine should look like and how it will keep them training consistently. Address their specific needs with "your mobility work should include..." or "you can prevent injuries by..."' : ''}
${profile.focusAreas?.includes('Competition Strategy') ? 'COMPETITION PREPARATION: Guide them through what their competition preparation should entail. Help them understand what their losses will teach them and how their wins will build confidence. Frame as "your game plan should..." or "you will develop confidence when..."' : ''}
${(profile.focusAreas?.includes('Nutrition Guidance') || profile.focusAreas?.includes('Training Schedule')) ? 'LIFESTYLE OPTIMIZATION: Show them how their nutrition and training schedule can support their goals. Guide them on what changes will have the biggest impact on their performance and recovery.' : ''}

Your authority comes from comprehensive knowledge of what works, not personal anecdotes. Focus on giving them the most effective path forward based on their specific situation.

⚠️ Always emphasize training safely with qualified instructors.`;

    // TODO: RESTORE LATER - Schema generation for structured output
    /*
    // Build dynamic schema based on selected coaches
    const baseProperties = {
      summary: { type: "string" },
      rawResponse: { type: "string" }
    };

    const coachProperties = {
      technicalCoach: {
        type: "object",
        properties: {
          drills: { type: "array", items: { type: "string" } },
          techniques: { type: "array", items: { type: "string" } },
          rollingFocus: { type: "array", items: { type: "string" } }
        }
      },
      mentalCoach: {
        type: "object",
        properties: {
          mindsetShifts: { type: "array", items: { type: "string" } },
          competitionPrep: { type: "array", items: { type: "string" } },
          mentalTools: { type: "array", items: { type: "string" } }
        }
      },
      recoverySpecialist: {
        type: "object",
        properties: {
          mobility: { type: "array", items: { type: "string" } },
          recovery: { type: "array", items: { type: "string" } },
          injuryPrevention: { type: "array", items: { type: "string" } }
        }
      },
      strengthCoach: {
        type: "object",
        properties: {
          conditioning: { type: "array", items: { type: "string" } },
          strengthTraining: { type: "array", items: { type: "string" } },
          energySystems: { type: "array", items: { type: "string" } }
        }
      },
      competitionStrategist: {
        type: "object",
        properties: {
          gameplan: { type: "array", items: { type: "string" } },
          matchAnalysis: { type: "array", items: { type: "string" } },
          preparation: { type: "array", items: { type: "string" } }
        }
      },
      supportiveFriend: {
        type: "object",
        properties: {
          motivation: { type: "array", items: { type: "string" } },
          accountability: { type: "array", items: { type: "string" } },
          encouragement: { type: "array", items: { type: "string" } }
        }
      }
    };

    // Only include selected coaches in the schema
    const dynamicProperties = { ...baseProperties };
    coachesToInclude.forEach(coach => {
      if (coachProperties[coach]) {
        dynamicProperties[coach] = coachProperties[coach];
      }
    });

    const responseSchema = {
      type: "object",
      properties: dynamicProperties
    };

    console.log("Selected focus areas:", profile.focusAreas);
    console.log("Coaches to include:", coachesToInclude);
    console.log("Dynamic schema properties:", Object.keys(dynamicProperties));
    */

    // Simple model configuration without structured output
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash"
    });
    
    // TODO: RESTORE LATER - Structured JSON output configuration
    /*
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: responseSchema
    }
    */
    
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    
    console.log("GEMINI Response:", response);
    
    // Return simple text response for prompt testing
    return NextResponse.json({ response: response });
    
    // TODO: RESTORE LATER - Structured JSON parsing
    /*
    // Now we can parse directly - no cleaning needed!
    const parsedPlan = JSON.parse(response);
    return NextResponse.json(parsedPlan);
    */
    
  } catch (error) {
    console.error("GEMINI failed:", error);
    return NextResponse.json(
      { error: "Failed to generate training plan" },
      { status: 500 }
    );
  }
}