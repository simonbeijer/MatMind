export async function generateTrainingPlan(profile) {
  // For now, return a mock training plan since we don't have AI SDK setup
  // In a real implementation, you would use the AI SDK to generate this
  
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Sanitize input to prevent injection attacks
    const sanitizedProfile = {
      beltRank: String(profile.beltRank || '').replace(/[<>]/g, ''),
      primaryGoal: String(profile.primaryGoal || '').replace(/[<>]/g, ''),
      timeframe: String(profile.timeframe || '').replace(/[<>]/g, ''),
      bodyType: String(profile.bodyType || '').replace(/[<>]/g, '')
    };
    
    // Fallback plan based on user profile
    return {
      summary: `Personalized training plan for ${sanitizedProfile.beltRank} belt focusing on ${sanitizedProfile.primaryGoal.replace("-", " ")} over ${sanitizedProfile.timeframe}. This plan addresses your specific challenges and leverages your ${sanitizedProfile.bodyType} body type for optimal development.`,
      technicalCoach: {
        drills: [
          "Guard retention drills focusing on hip mobility",
          "Takedown entries from standing position", 
          "Submission chains from dominant positions",
          "Escape sequences from bad positions",
        ],
        techniques: [
          "Closed guard attacks and sweeps",
          "Half guard recovery techniques",
          "Side control escapes and transitions",
          "Back control defense and escapes",
        ],
        rollingFocus: [
          "Focus on position before submission",
          "Work on maintaining dominant positions", 
          "Practice specific scenarios repeatedly",
          "Emphasize smooth transitions between positions",
        ],
      },
      mentalCoach: {
        mindsetShifts: [
          "Embrace the learning process over winning",
          "View tapping as information gathering",
          "Focus on small improvements each session",
          "Develop patience in your game development",
        ],
        competitionPrep: [
          "Visualize match scenarios regularly",
          "Practice competition-specific warm-ups",
          "Develop pre-match routines", 
          "Study video of potential opponents",
        ],
        mentalTools: [
          "Breathing techniques for stress management",
          "Positive self-talk during difficult moments",
          "Goal setting for each training session",
          "Mindfulness practices for focus improvement",
        ],
      },
      recoverySpecialist: {
        mobility: [
          "Hip flexor stretches for guard work",
          "Shoulder mobility for arm positioning",
          "Spinal rotation exercises",
          "Ankle mobility for better base",
        ],
        recovery: [
          "Proper sleep schedule (7-9 hours)",
          "Post-training stretching routine",
          "Hydration and nutrition timing",
          "Active recovery on rest days",
        ],
        injuryPrevention: [
          "Proper warm-up before training",
          "Strength training for joint stability", 
          "Listen to your body's signals",
          "Regular massage or soft tissue work",
        ],
      },
      strengthCoach: {
        conditioning: [
          "BJJ-specific cardio intervals",
          "Grip strength endurance training",
          "Core stability exercises", 
          "Functional movement patterns",
        ],
        strengthTraining: [
          "Compound movements (squats, deadlifts)",
          "Pull-ups and rowing exercises",
          "Single-leg stability work",
          "Rotational power development",
        ],
        energySystems: [
          "Alactic power for explosive movements",
          "Aerobic base for recovery between rounds",
          "Lactate threshold for sustained effort",
          "Neuromuscular coordination drills",
        ],
      },
      competitionStrategist: {
        gameplan: [
          "Develop A, B, and C game strategies",
          "Identify your strongest positions",
          "Plan for different opponent types", 
          "Practice competition-specific techniques",
        ],
        matchAnalysis: [
          "Record and review your rolls",
          "Identify recurring problems",
          "Study successful competitors in your division",
          "Analyze your win/loss patterns",
        ],
        preparation: [
          "Simulate competition conditions in training",
          "Practice your competition game plan",
          "Mental rehearsal of match scenarios",
          "Physical preparation and weight management",
        ],
      },
      supportiveFriend: {
        motivation: [
          "Remember why you started BJJ",
          "Celebrate small victories and progress",
          "Connect with your training partners",
          "Set achievable short-term goals",
        ],
        accountability: [
          "Track your training sessions",
          "Set weekly technique goals",
          "Find a training partner for accountability",
          "Regular check-ins on your progress",
        ],
        encouragement: [
          "Every black belt was once a beginner",
          "Consistency beats intensity over time",
          "Your unique style is developing with each roll",
          "Trust the process and enjoy the journey",
        ],
      },
    }
  } catch (error) {
    console.error("Error generating training plan:", error)
    throw new Error("Failed to generate training plan")
  }
}