"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Download, Share2, RefreshCw, ArrowLeft } from "lucide-react"
import { generateTrainingPlan } from "@/app/lib/ai-service"
import BetaNoticeModal from "@/app/components/betaNoticeModal"

export default function PlanPage() {
  const [profile, setProfile] = useState(null)
  const [plan, setPlan] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showBetaNotice, setShowBetaNotice] = useState(false)

  const isOnboardingComplete = (profile) => {
    if (!profile) return false
    const hasProfileData = profile.beltRank && profile.age && profile.trainingFrequency && profile.weight
    const hasGoalsData = profile.primaryGoal && profile.specificGoals?.length > 0 && profile.timeframe
    const hasFocusData = profile.focusAreas?.length > 0
    return hasProfileData && hasGoalsData && hasFocusData
  }

  useEffect(() => {
    const loadProfileAndGeneratePlan = async () => {
      try {
        const storedProfile = localStorage.getItem("userProfile")
        if (!storedProfile) {
          setError("No profile data found. Please complete the onboarding process.")
          setIsLoading(false)
          return
        }

        const userProfile = JSON.parse(storedProfile)

        if (!isOnboardingComplete(userProfile)) {
          setError("Your profile is incomplete. Please complete the onboarding process to get your personalized plan.")
          setIsLoading(false)
          return
        }

        setProfile(userProfile)
        const generatedPlan = await generateTrainingPlan(userProfile)
        setPlan(generatedPlan)
        setShowBetaNotice(true)
      } catch (err) {
        console.error("Error generating plan:", err)
        setError("Failed to generate your training plan. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    loadProfileAndGeneratePlan()
  }, [])

  const handleRegeneratePlan = async () => {
    if (!profile || !isOnboardingComplete(profile)) {
      setError("Your profile is incomplete. Please complete the onboarding process first.")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const newPlan = await generateTrainingPlan(profile)
      setPlan(newPlan)
      setShowBetaNotice(true)
    } catch (err) {
      console.error("Error regenerating plan:", err)
      setError("Failed to regenerate your training plan. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const closeBetaNotice = () => setShowBetaNotice(false)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-onboarding-bg-primary flex items-center justify-center px-6">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-cinnabar border-t-transparent animate-spin mx-auto mb-6"></div>
          <div className="font-mono uppercase tracking-[0.2em] text-[11px] text-onboarding-text-muted mb-2">
            Generating
          </div>
          <h2 className="font-display uppercase tracking-[0.02em] text-2xl text-onboarding-text-primary mb-2">
            Drafting your plan
          </h2>
          <p className="font-serif text-onboarding-text-muted text-base max-w-md">
            Six coaches are at the chalkboard.
          </p>
        </div>
      </div>
    )
  }

  if (error || !profile || !plan) {
    return (
      <div className="min-h-screen bg-onboarding-bg-primary flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <div className="font-mono uppercase tracking-[0.2em] text-[11px] text-cinnabar mb-3">
            ● Error
          </div>
          <h2 className="font-display uppercase tracking-[0.02em] text-3xl text-onboarding-text-primary mb-4">
            Something stalled.
          </h2>
          <p className="font-serif text-onboarding-text-muted mb-8 leading-snug">
            {error || "Unable to load your training plan."}
          </p>
          <Link href="/onboarding">
            <button className="bg-cinnabar text-onboarding-bg-primary font-mono uppercase tracking-[0.18em] text-xs px-6 py-3.5 hover:opacity-90 transition-opacity">
              Start over
            </button>
          </Link>
        </div>
      </div>
    )
  }

  const meta = [
    { label: "Belt", value: profile.beltRank },
    { label: "Body", value: profile.bodyType || "—" },
    { label: "Cadence", value: `${profile.trainingFrequency}×/wk` },
    { label: "Goal", value: profile.primaryGoal?.replace("-", " ") || "—" },
    { label: "Window", value: profile.timeframe || "—" },
  ]

  return (
    <div className="min-h-screen bg-onboarding-bg-primary">
      <BetaNoticeModal isOpen={showBetaNotice} onClose={closeBetaNotice} />

      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-10">
          <div className="font-mono uppercase tracking-[0.2em] text-[11px] text-onboarding-text-muted mb-4">
            <span className="text-cinnabar">●</span> Plan / Generated
          </div>
          <h1 className="font-display uppercase tracking-[0.02em] text-4xl md:text-5xl leading-tight text-onboarding-text-primary mb-2">
            Your blueprint.
          </h1>
          <p className="font-serif text-lg text-onboarding-text-muted leading-snug max-w-xl">
            Drills, mindset, and recovery written for you.
          </p>
        </div>

        <dl className="grid grid-cols-2 md:grid-cols-5 gap-px bg-onboarding-border-subtle border border-onboarding-border-subtle mb-10">
          {meta.map(({ label, value }) => (
            <div key={label} className="bg-onboarding-bg-primary p-4">
              <dt className="font-mono uppercase tracking-[0.15em] text-[10px] text-onboarding-text-muted mb-1.5">
                {label}
              </dt>
              <dd className="font-mono text-sm text-onboarding-text-primary capitalize">
                {value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="flex flex-wrap items-center gap-3 mb-10">
          <button
            onClick={handleRegeneratePlan}
            className="inline-flex items-center gap-2 border border-onboarding-border-input text-onboarding-text-primary font-mono uppercase tracking-[0.18em] text-[11px] px-4 py-2.5 hover:bg-onboarding-hover-bg transition-colors"
          >
            <RefreshCw className="h-3 w-3" />
            Regenerate
          </button>
          <button className="inline-flex items-center gap-2 border border-onboarding-border-input text-onboarding-text-primary font-mono uppercase tracking-[0.18em] text-[11px] px-4 py-2.5 hover:bg-onboarding-hover-bg transition-colors">
            <Share2 className="h-3 w-3" />
            Share
          </button>
          <button className="inline-flex items-center gap-2 bg-cinnabar text-onboarding-bg-primary font-mono uppercase tracking-[0.18em] text-[11px] px-4 py-2.5 hover:opacity-90 transition-opacity">
            <Download className="h-3 w-3" />
            Download
          </button>
        </div>

        <section className="border border-onboarding-border-subtle bg-onboarding-bg-secondary p-8 mb-10">
          <div className="font-mono uppercase tracking-[0.2em] text-[11px] text-onboarding-text-muted mb-3">
            §A / Summary
          </div>
          <p className="font-serif text-lg text-onboarding-text-primary leading-snug">
            {plan.summary}
          </p>
        </section>

        <section className="border-t border-onboarding-border-subtle pt-10">
          <div className="font-mono uppercase tracking-[0.2em] text-[11px] text-onboarding-text-muted mb-3">
            §B / Voices · Technical · Mental · Recovery · Strength · Competition · Support
          </div>
          <h2 className="font-display uppercase tracking-[0.03em] text-2xl text-onboarding-text-primary mb-6">
            Your six coaches.
          </h2>
          <pre className="whitespace-pre-wrap font-serif text-base text-onboarding-text-primary leading-relaxed">
            {plan.response}
          </pre>
        </section>

        <div className="flex flex-col sm:flex-row gap-3 mt-14 pt-10 border-t border-onboarding-border-subtle">
          <Link href="/onboarding">
            <button className="inline-flex items-center gap-2 border border-onboarding-border-input text-onboarding-text-primary font-mono uppercase tracking-[0.18em] text-[11px] px-6 py-3.5 hover:bg-onboarding-hover-bg transition-colors">
              <ArrowLeft className="h-3 w-3" />
              Create new plan
            </button>
          </Link>
          <button className="inline-flex items-center gap-2 bg-cinnabar text-onboarding-bg-primary font-mono uppercase tracking-[0.18em] text-[11px] px-6 py-3.5 hover:opacity-90 transition-opacity">
            Save to my plans
          </button>
        </div>
      </div>
    </div>
  )
}
