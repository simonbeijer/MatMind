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

  // Session validation function
  const checkSession = async () => {
    try {
      const response = await fetch("/api/auth/user", {
        method: "GET",
        credentials: "include",
      })
      return response.ok
    } catch (error) {
      console.error("Session check failed:", error)
      return false
    }
  }

  // Handle session expiration
  const handleSessionExpired = () => {
    // Save current progress
    localStorage.setItem("onboardingProgress", JSON.stringify({
      currentStep,
      profile,
      returnUrl: "/onboarding"
    }))
    
    // Redirect to login
    router.push("/login?expired=true&return=/onboarding")
  }


  const totalSteps = 3
  const progress = (currentStep / totalSteps) * 100

  // Check for saved progress on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem("onboardingProgress")
    if (savedProgress) {
      const { currentStep: savedStep, profile: savedProfile } = JSON.parse(savedProgress)
      setCurrentStep(savedStep)
      setProfile(savedProfile)
      // Clear saved progress after restoring
      localStorage.removeItem("onboardingProgress")
    }
  }, [])

  // Emit step change events for header
  useEffect(() => {
    const event = new CustomEvent('onboardingStepChange', {
      detail: { currentStep, totalSteps }
    });
    window.dispatchEvent(event);
  }, [currentStep, totalSteps]);

  const handleNext = async () => {
    // Check session before proceeding
    const isSessionValid = await checkSession()
    if (!isSessionValid) {
      handleSessionExpired()
      return
    }

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
    <div className="min-h-screen bg-onboarding-bg-primary">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="mb-10">
          <div className="flex justify-between items-baseline mb-3">
            <span className="font-mono uppercase tracking-[0.2em] text-[11px] text-onboarding-text-muted">
              §0{currentStep} / {String(totalSteps).padStart(2, "0")}
            </span>
            <span className="font-mono uppercase tracking-[0.2em] text-[11px] text-onboarding-text-muted">
              {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} />
        </div>

        <div className="border border-onboarding-border-subtle bg-onboarding-bg-secondary">
          <header className="px-8 py-7 border-b border-onboarding-border-subtle">
            <h1 className="font-display uppercase tracking-[0.03em] text-2xl leading-tight text-onboarding-text-primary mb-2">
              {getStepTitle()}
            </h1>
            <p className="font-serif text-base text-onboarding-text-muted leading-snug">
              {getStepDescription()}
            </p>
          </header>

          <div className="px-8 py-8 space-y-6">
            {currentStep === 1 && <ProfileStep profile={profile} updateProfile={updateProfile} />}
            {currentStep === 2 && <GoalsStep profile={profile} updateProfile={updateProfile} />}
            {currentStep === 3 && <FocusStep profile={profile} updateProfile={updateProfile} />}
          </div>

          <div className="px-8 py-6 border-t border-onboarding-border-subtle flex justify-between items-center">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className="inline-flex items-center gap-2 font-mono uppercase tracking-[0.18em] text-[11px] text-onboarding-text-muted hover:text-onboarding-text-primary disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back
            </button>

            <button
              onClick={handleNext}
              disabled={!isStepValid() || isGenerating}
              className="inline-flex items-center gap-2 bg-cinnabar text-onboarding-bg-primary font-mono uppercase tracking-[0.18em] text-[11px] px-6 py-3 hover:opacity-90 disabled:opacity-40 disabled:pointer-events-none transition-opacity"
            >
              {isGenerating ? "Generating…" : currentStep === totalSteps ? "Generate plan" : "Next"}
              {!isGenerating && currentStep !== totalSteps && <ArrowRight className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}