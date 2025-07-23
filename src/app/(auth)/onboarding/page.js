"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Progress } from "../../components/ui/progress"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { ProfileStep } from "../../components/onboarding/profileStep"
import { GoalsStep } from "../../components/onboarding/goalsStep"
import { FocusStep } from "../../components/onboarding/focusStep"
import { useRouter } from "next/navigation"

const initialProfile = {
  // Profile data
  beltRank: "",
  age: "",
  trainingFrequency: "",
  bodyType: "",
  gender: "",
  weight: "",
  flexibility: 5,
  strength: 5,
  cardio: 5,
  giPreference: 50,
  experience: "",
  currentChallenges: [],
  otherChallenges: "",

  // Goals data
  primaryGoal: "",
  specificGoals: [],
  timeframe: "",
  improvementFocus: "",
  areaFocus: "",
  motivationLevel: 5,
  effortCapacity: 5,

  // Focus areas
  focusAreas: [],
  outputStyle: "balanced",
  planLength: "detailed",
}

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [profile, setProfile] = useState(initialProfile)
  const [isGenerating, setIsGenerating] = useState(false)
  const router = useRouter()

  const totalSteps = 3
  const progress = (currentStep / totalSteps) * 100

  // Emit step change events for header
  useEffect(() => {
    const event = new CustomEvent('onboardingStepChange', {
      detail: { currentStep, totalSteps }
    });
    window.dispatchEvent(event);
  }, [currentStep, totalSteps]);

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else {
      handleGeneratePlan()
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleGeneratePlan = async () => {
    setIsGenerating(true)

    // Store profile data in localStorage for the plan page
    localStorage.setItem("userProfile", JSON.stringify(profile))

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    router.push("/plan")
  }

  const updateProfile = (updates) => {
    setProfile((prev) => ({ ...prev, ...updates }))
  }

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Tell Us About Yourself"
      case 2:
        return "What Are Your Goals?"
      case 3:
        return "Customize Your Plan"
      default:
        return ""
    }
  }

  const getStepDescription = () => {
    switch (currentStep) {
      case 1:
        return "Help us understand your current situation and background"
      case 2:
        return "Define what you want to achieve with your training"
      case 3:
        return "Choose your focus areas and plan preferences"
      default:
        return ""
    }
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return profile.beltRank && profile.age && profile.trainingFrequency && profile.weight
      case 2:
        return profile.primaryGoal && profile.specificGoals.length > 0 && profile.timeframe
      case 3:
        return profile.focusAreas.length > 0
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-onboarding-bg-primary via-onboarding-bg-secondary to-onboarding-bg-primary">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-onboarding-text-muted mb-2">
              <span>Progress</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Main Card */}
          <Card className="backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">
                {getStepTitle()}
              </CardTitle>
              <CardDescription>
                {getStepDescription()}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {currentStep === 1 && <ProfileStep profile={profile} updateProfile={updateProfile} />}
              {currentStep === 2 && <GoalsStep profile={profile} updateProfile={updateProfile} />}
              {currentStep === 3 && <FocusStep profile={profile} updateProfile={updateProfile} />}

              {/* Navigation */}
              <div className="flex justify-between pt-6">
                <button
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-onboarding-accent-end disabled:pointer-events-none disabled:opacity-50 border border-onboarding-border-input text-onboarding-text-primary hover:bg-onboarding-hover-bg bg-transparent h-10 px-4 py-2"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </button>

                <button
                  onClick={handleNext}
                  disabled={!isStepValid() || isGenerating}
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-onboarding-accent-end disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-onboarding-accent-start to-onboarding-accent-end hover:from-onboarding-accent-start/80 hover:to-onboarding-accent-end/80 text-onboarding-bg-primary h-10 px-4 py-2"
                >
                  {isGenerating ? (
                    "Generating Plan..."
                  ) : currentStep === totalSteps ? (
                    "Generate My Plan"
                  ) : (
                    <>
                      Next
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}