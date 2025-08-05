"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { Separator } from "@/app/components/ui/separator"
import {
  User,
  Brain,
  Heart,
  Dumbbell,
  Trophy,
  Users,
  Download,
  Share2,
  RefreshCw,
  Target,
  Clock,
  Zap,
} from "lucide-react"
import Link from "next/link"
import { generateTrainingPlan } from "@/app/lib/ai-service"
import BetaNoticeModal from "@/app/components/betaNoticeModal"

export default function PlanPage() {
  const [profile, setProfile] = useState(null)
  const [plan, setPlan] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showBetaNotice, setShowBetaNotice] = useState(false)

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
        setProfile(userProfile)

        // Generate the training plan using AI
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
    if (!profile) return

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

  const closeBetaNotice = () => {
    setShowBetaNotice(false)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-onboarding-bg-primary via-onboarding-bg-secondary to-onboarding-bg-primary flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-onboarding-accent-end border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-onboarding-text-primary mb-2">
            Generating Your Plan
          </h2>
          <p className="text-onboarding-text-muted">
            Our AI coaching team is creating your personalized training plan...
          </p>
        </div>
      </div>
    )
  }

  if (error || !profile || !plan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-onboarding-bg-primary via-onboarding-bg-secondary to-onboarding-bg-primary flex items-center justify-center">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-onboarding-text-primary mb-4">
            Oops! Something went wrong
          </h2>
          <p className="text-onboarding-text-muted mb-6">
            {error || "Unable to load your training plan."}
          </p>
          <Link href="/onboarding">
            <button className="bg-gradient-to-r from-onboarding-accent-start to-onboarding-accent-end hover:from-onboarding-accent-start/80 hover:to-onboarding-accent-end/80 text-onboarding-bg-primary px-4 py-2 rounded-md font-medium">
              Start Over
            </button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-onboarding-bg-primary via-onboarding-bg-secondary to-onboarding-bg-primary">
      <BetaNoticeModal isOpen={showBetaNotice} onClose={closeBetaNotice} />
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Profile Summary */}
        <Card className="bg-onboarding-card-bg border-onboarding-border-subtle backdrop-blur-sm mb-8 shadow-2xl">
          <CardHeader className="pb-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="space-y-3">
                <CardTitle className="text-3xl lg:text-4xl font-bold text-onboarding-text-primary leading-tight">
                  Your Personalized BJJ Development Plan
                </CardTitle>
                <CardDescription className="text-base text-onboarding-text-muted font-medium">
                  Generated for {profile.beltRank} belt • {profile.bodyType} • {profile.trainingFrequency} training
                </CardDescription>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge className="bg-onboarding-accent-end/20 text-onboarding-accent-end border border-onboarding-accent-end/30 px-4 py-2 rounded-full text-sm font-semibold flex items-center shadow-sm">
                    <Target className="h-4 w-4 mr-2" />
                    {profile.primaryGoal.replace("-", " ")}
                  </Badge>
                  <Badge className="bg-blue-500/20 text-blue-300 border border-blue-500/30 px-4 py-2 rounded-full text-sm font-semibold flex items-center shadow-sm">
                    <Clock className="h-4 w-4 mr-2" />
                    {profile.timeframe}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleRegeneratePlan}
                    className="border border-onboarding-border-input text-onboarding-text-primary hover:bg-onboarding-hover-bg bg-transparent px-3 py-1.5 rounded-md font-medium text-sm flex items-center transition-colors"
                  >
                    <RefreshCw className="h-3 w-3 mr-1.5" />
                    Regenerate
                  </button>
                  <button className="border border-onboarding-border-input text-onboarding-text-primary hover:bg-onboarding-hover-bg bg-transparent px-3 py-1.5 rounded-md font-medium text-sm flex items-center transition-colors">
                    <Share2 className="h-3 w-3 mr-1.5" />
                    Share
                  </button>
                  <button className="bg-gradient-to-r from-onboarding-accent-start to-onboarding-accent-end hover:from-onboarding-accent-start/80 hover:to-onboarding-accent-end/80 text-onboarding-bg-primary px-3 py-1.5 rounded-md font-medium text-sm flex items-center transition-colors">
                    <Download className="h-3 w-3 mr-1.5" />
                    Download
                  </button>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="bg-gradient-to-r from-onboarding-accent-end/10 to-onboarding-accent-start/10 rounded-xl p-6 border border-onboarding-accent-end/20 shadow-sm">
              <h3 className="text-lg font-bold text-onboarding-text-primary mb-4 flex items-center">
                <Zap className="h-5 w-5 mr-3 text-yellow-400" />
                Plan Summary
              </h3>
              <p className="text-onboarding-text-muted leading-relaxed text-base">
                {plan.summary}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Coaching Tabs */}
        <Tabs defaultValue="technical" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 gap-1 p-1 bg-onboarding-card-bg border border-onboarding-border-subtle rounded-lg h-auto">
            <TabsTrigger 
              value="technical" 
              className="flex items-center justify-center gap-2 py-2.5 px-2 rounded-md font-medium transition-all duration-200 data-[state=active]:bg-onboarding-accent-end/20 data-[state=active]:text-onboarding-accent-end hover:bg-onboarding-hover-bg text-xs lg:text-sm text-onboarding-text-primary"
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Technical</span>
            </TabsTrigger>
            <TabsTrigger 
              value="mental" 
              className="flex items-center justify-center gap-2 py-2.5 px-2 rounded-md font-medium transition-all duration-200 data-[state=active]:bg-onboarding-accent-end/20 data-[state=active]:text-onboarding-accent-end hover:bg-onboarding-hover-bg text-xs lg:text-sm text-onboarding-text-primary"
            >
              <Brain className="h-4 w-4" />
              <span className="hidden sm:inline">Mental</span>
            </TabsTrigger>
            <TabsTrigger 
              value="recovery" 
              className="flex items-center justify-center gap-2 py-2.5 px-2 rounded-md font-medium transition-all duration-200 data-[state=active]:bg-onboarding-accent-end/20 data-[state=active]:text-onboarding-accent-end hover:bg-onboarding-hover-bg text-xs lg:text-sm text-onboarding-text-primary"
            >
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">Recovery</span>
            </TabsTrigger>
            <TabsTrigger 
              value="strength" 
              className="flex items-center justify-center gap-2 py-2.5 px-2 rounded-md font-medium transition-all duration-200 data-[state=active]:bg-onboarding-accent-end/20 data-[state=active]:text-onboarding-accent-end hover:bg-onboarding-hover-bg text-xs lg:text-sm text-onboarding-text-primary"
            >
              <Dumbbell className="h-4 w-4" />
              <span className="hidden sm:inline">Strength</span>
            </TabsTrigger>
            <TabsTrigger 
              value="competition" 
              className="flex items-center justify-center gap-2 py-2.5 px-2 rounded-md font-medium transition-all duration-200 data-[state=active]:bg-onboarding-accent-end/20 data-[state=active]:text-onboarding-accent-end hover:bg-onboarding-hover-bg text-xs lg:text-sm text-onboarding-text-primary"
            >
              <Trophy className="h-4 w-4" />
              <span className="hidden sm:inline">Competition</span>
            </TabsTrigger>
            <TabsTrigger 
              value="support" 
              className="flex items-center justify-center gap-2 py-2.5 px-2 rounded-md font-medium transition-all duration-200 data-[state=active]:bg-onboarding-accent-end/20 data-[state=active]:text-onboarding-accent-end hover:bg-onboarding-hover-bg text-xs lg:text-sm text-onboarding-text-primary"
            >
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Support</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="technical">
            <Card className="bg-onboarding-card-bg border-onboarding-border-subtle backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-onboarding-text-primary flex items-center">
                  <User className="h-5 w-5 mr-2 text-blue-400" />
                  Technical Coach
                </CardTitle>
                <CardDescription className="text-sm text-onboarding-text-muted">
                  Personalized drills, techniques, and rolling strategies
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-onboarding-text-primary font-medium mb-3 flex items-center">
                    🎯 Recommended Drills
                  </h3>
                  <ul className="space-y-2">
                    {plan.technicalCoach.drills.map((drill, index) => (
                      <li
                        key={index}
                        className="text-onboarding-text-muted flex items-start"
                      >
                        <span className="text-blue-400 mr-3 flex-shrink-0">•</span>
                        <span className="text-sm">{drill}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-onboarding-text-primary font-medium mb-3 flex items-center">
                    🥋 Technique Focus
                  </h3>
                  <ul className="space-y-2">
                    {plan.technicalCoach.techniques.map((technique, index) => (
                      <li
                        key={index}
                        className="text-onboarding-text-muted flex items-start"
                      >
                        <span className="text-blue-400 mr-3 flex-shrink-0">•</span>
                        <span className="text-sm">{technique}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-onboarding-text-primary font-medium mb-3 flex items-center">
                    🤼 Rolling Focus
                  </h3>
                  <ul className="space-y-2">
                    {plan.technicalCoach.rollingFocus.map((focus, index) => (
                      <li
                        key={index}
                        className="text-onboarding-text-muted flex items-start"
                      >
                        <span className="text-blue-400 mr-3 flex-shrink-0">•</span>
                        <span className="text-sm">{focus}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mental">
            <Card className="bg-onboarding-card-bg border-onboarding-border-subtle backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-onboarding-text-primary flex items-center">
                  <Brain className="h-5 w-5 mr-2 text-onboarding-accent-start" />
                  Mental Coach
                </CardTitle>
                <CardDescription className="text-sm text-onboarding-text-muted">
                  Competition prep, mindfulness techniques, and mental triggers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-onboarding-text-primary font-medium mb-3 flex items-center">
                    🧠 Mindset Shifts
                  </h3>
                  <ul className="space-y-2">
                    {plan.mentalCoach.mindsetShifts.map((shift, index) => (
                      <li
                        key={index}
                        className="text-onboarding-text-muted flex items-start"
                      >
                        <span className="text-onboarding-accent-start mr-3 flex-shrink-0">•</span>
                        <span className="text-sm">{shift}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-onboarding-text-primary font-medium mb-3 flex items-center">
                    🏆 Competition Preparation
                  </h3>
                  <ul className="space-y-2">
                    {plan.mentalCoach.competitionPrep.map((prep, index) => (
                      <li
                        key={index}
                        className="text-onboarding-text-muted flex items-start"
                      >
                        <span className="text-onboarding-accent-start mr-3 flex-shrink-0">•</span>
                        <span className="text-sm">{prep}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-onboarding-text-primary font-medium mb-3 flex items-center">
                    🛠️ Mental Tools
                  </h3>
                  <ul className="space-y-2">
                    {plan.mentalCoach.mentalTools.map((tool, index) => (
                      <li
                        key={index}
                        className="text-onboarding-text-muted flex items-start"
                      >
                        <span className="text-onboarding-accent-start mr-3 flex-shrink-0">•</span>
                        <span className="text-sm">{tool}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recovery">
            <Card className="bg-onboarding-card-bg border-onboarding-border-subtle backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-onboarding-text-primary flex items-center">
                  <Heart className="h-5 w-5 mr-2 text-orange-400" />
                  Recovery Specialist
                </CardTitle>
                <CardDescription className="text-sm text-onboarding-text-muted">
                  Injury prevention, mobility work, and recovery protocols
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-onboarding-text-primary font-medium mb-3 flex items-center">
                    🤸 Mobility & Flexibility
                  </h3>
                  <ul className="space-y-2">
                    {plan.recoverySpecialist.mobility.map((item, index) => (
                      <li
                        key={index}
                        className="text-onboarding-text-muted flex items-start"
                      >
                        <span className="text-orange-400 mr-3 flex-shrink-0">•</span>
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-onboarding-text-primary font-medium mb-3 flex items-center">
                    💤 Recovery Protocols
                  </h3>
                  <ul className="space-y-2">
                    {plan.recoverySpecialist.recovery.map((protocol, index) => (
                      <li
                        key={index}
                        className="text-onboarding-text-muted flex items-start"
                      >
                        <span className="text-orange-400 mr-3 flex-shrink-0">•</span>
                        <span className="text-sm">{protocol}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-onboarding-text-primary font-medium mb-3 flex items-center">
                    🛡️ Injury Prevention
                  </h3>
                  <ul className="space-y-2">
                    {plan.recoverySpecialist.injuryPrevention.map((prevention, index) => (
                      <li
                        key={index}
                        className="text-onboarding-text-muted flex items-start"
                      >
                        <span className="text-orange-400 mr-3 flex-shrink-0">•</span>
                        <span className="text-sm">{prevention}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="strength">
            <Card className="bg-onboarding-card-bg border-onboarding-border-subtle backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-onboarding-text-primary flex items-center">
                  <Dumbbell className="h-5 w-5 mr-2 text-purple-400" />
                  Strength Coach
                </CardTitle>
                <CardDescription className="text-sm text-onboarding-text-muted">
                  Off-mat conditioning, strength training, and energy system development
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-onboarding-text-primary font-medium mb-3 flex items-center">
                    🏃 Conditioning
                  </h3>
                  <ul className="space-y-2">
                    {plan.strengthCoach.conditioning.map((item, index) => (
                      <li
                        key={index}
                        className="text-onboarding-text-muted flex items-start"
                      >
                        <span className="text-purple-400 mr-3 flex-shrink-0">•</span>
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-onboarding-text-primary font-medium mb-3 flex items-center">
                    💪 Strength Training
                  </h3>
                  <ul className="space-y-2">
                    {plan.strengthCoach.strengthTraining.map((training, index) => (
                      <li
                        key={index}
                        className="text-onboarding-text-muted flex items-start"
                      >
                        <span className="text-purple-400 mr-3 flex-shrink-0">•</span>
                        <span className="text-sm">{training}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-onboarding-text-primary font-medium mb-3 flex items-center">
                    ⚡ Energy Systems
                  </h3>
                  <ul className="space-y-2">
                    {plan.strengthCoach.energySystems.map((system, index) => (
                      <li
                        key={index}
                        className="text-onboarding-text-muted flex items-start"
                      >
                        <span className="text-purple-400 mr-3 flex-shrink-0">•</span>
                        <span className="text-sm">{system}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="competition">
            <Card className="bg-onboarding-card-bg border-onboarding-border-subtle backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-onboarding-text-primary flex items-center">
                  <Trophy className="h-5 w-5 mr-2 text-yellow-400" />
                  Competition Strategist
                </CardTitle>
                <CardDescription className="text-sm text-onboarding-text-muted">
                  Game planning, match analysis, and competition-specific preparation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-onboarding-text-primary font-medium mb-3 flex items-center">
                    📋 Game Plan
                  </h3>
                  <ul className="space-y-2">
                    {plan.competitionStrategist.gameplan.map((item, index) => (
                      <li
                        key={index}
                        className="text-onboarding-text-muted flex items-start"
                      >
                        <span className="text-yellow-400 mr-3 flex-shrink-0">•</span>
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-onboarding-text-primary font-medium mb-3 flex items-center">
                    📊 Match Analysis
                  </h3>
                  <ul className="space-y-2">
                    {plan.competitionStrategist.matchAnalysis.map((analysis, index) => (
                      <li
                        key={index}
                        className="text-onboarding-text-muted flex items-start"
                      >
                        <span className="text-yellow-400 mr-3 flex-shrink-0">•</span>
                        <span className="text-sm">{analysis}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-onboarding-text-primary font-medium mb-3 flex items-center">
                    🎯 Preparation
                  </h3>
                  <ul className="space-y-2">
                    {plan.competitionStrategist.preparation.map((prep, index) => (
                      <li
                        key={index}
                        className="text-onboarding-text-muted flex items-start"
                      >
                        <span className="text-yellow-400 mr-3 flex-shrink-0">•</span>
                        <span className="text-sm">{prep}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="support">
            <Card className="bg-onboarding-card-bg border-onboarding-border-subtle backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-onboarding-text-primary flex items-center">
                  <Users className="h-5 w-5 mr-2 text-teal-400" />
                  Supportive Friend
                </CardTitle>
                <CardDescription className="text-sm text-onboarding-text-muted">
                  Positive reinforcement, motivation, and honest feedback
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-onboarding-text-primary font-medium mb-3 flex items-center">
                    🔥 Motivation
                  </h3>
                  <ul className="space-y-2">
                    {plan.supportiveFriend.motivation.map((item, index) => (
                      <li
                        key={index}
                        className="text-onboarding-text-muted flex items-start"
                      >
                        <span className="text-teal-400 mr-3 flex-shrink-0">•</span>
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-onboarding-text-primary font-medium mb-3 flex items-center">
                    📝 Accountability
                  </h3>
                  <ul className="space-y-2">
                    {plan.supportiveFriend.accountability.map((item, index) => (
                      <li
                        key={index}
                        className="text-onboarding-text-muted flex items-start"
                      >
                        <span className="text-teal-400 mr-3 flex-shrink-0">•</span>
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-onboarding-text-primary font-medium mb-3 flex items-center">
                    💪 Encouragement
                  </h3>
                  <ul className="space-y-2">
                    {plan.supportiveFriend.encouragement.map((item, index) => (
                      <li
                        key={index}
                        className="text-onboarding-text-muted flex items-start"
                      >
                        <span className="text-teal-400 mr-3 flex-shrink-0">•</span>
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12">
          <Link href="/onboarding">
            <button className="border-2 border-onboarding-border-input text-onboarding-text-primary hover:bg-onboarding-hover-bg bg-transparent px-8 py-4 rounded-xl font-semibold text-base transition-all duration-200 hover:scale-105 shadow-lg">
              Create New Plan
            </button>
          </Link>
          <button className="bg-gradient-to-r from-onboarding-accent-start to-onboarding-accent-end hover:from-onboarding-accent-start/80 hover:to-onboarding-accent-end/80 text-onboarding-bg-primary px-8 py-4 rounded-xl font-semibold text-base transition-all duration-200 hover:scale-105 shadow-xl">
            Save to My Plans
          </button>
        </div>
      </div>
    </div>
  )
}