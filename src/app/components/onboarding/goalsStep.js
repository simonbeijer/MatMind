"use client"

import { useState } from "react"
import { Label } from "../ui/label"
import { Select, SelectItem } from "../ui/select"
import { Checkbox } from "../ui/checkbox"
import { Slider } from "../ui/slider"
import { ChevronDown } from "lucide-react"

export function GoalsStep({ profile, updateProfile }) {
  const [expandedCategories, setExpandedCategories] = useState({})

  const goalCategories = {
    "Mental & Emotional": [
      { id: "mental-toughness", title: "Build mental toughness and confidence" },
      { id: "competition-mindset", title: "Develop a strong competition mindset" },
    ],
    "Physical & Conditioning": [
      { id: "cardio-conditioning", title: "Improve cardio and conditioning" },
      { id: "injury-prevention", title: "Prevent or recover from injuries" },
    ],
    "Technical & Tactical": [
      { id: "overall-technique", title: "Improve overall technique and positional skills" },
      { id: "offensive-skills", title: "Develop offensive skills (submissions, attacks, pressure)" },
      { id: "defensive-skills", title: "Enhance defensive skills (escapes, sub defense)" },
      { id: "advanced-techniques", title: "Learn advanced or higher-level techniques" },
      { id: "flow-timing", title: "Develop flow, timing, and movement efficiency" },
    ],
    "Competition & Performance": [
      { id: "win-competition", title: "Win more in competition" },
      { id: "training-plateaus", title: "Break through training plateaus" },
    ],
    "Lifestyle & Balance": [
      { id: "training-consistency", title: "Train more consistently and stay motivated" },
      { id: "life-balance", title: "Balance BJJ with life, work, or stress" },
    ],
  }

  const handleGoalChange = (goalId, checked) => {
    if (checked && profile.specificGoals.length >= 8) return
    const updatedGoals = checked
      ? [...profile.specificGoals, goalId]
      : profile.specificGoals.filter((g) => g !== goalId)
    updateProfile({ specificGoals: updatedGoals })
  }

  const toggleCategory = (categoryName) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryName]: !prev[categoryName],
    }))
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="primaryGoal">Primary goal <span className="text-cinnabar">*</span></Label>
          <Select
            id="primaryGoal"
            value={profile.primaryGoal}
            onValueChange={(value) => updateProfile({ primaryGoal: value })}
            placeholder="What's your main focus?"
          >
            <SelectItem value="compete-better">Compete Better</SelectItem>
            <SelectItem value="train-smarter">Train Smarter</SelectItem>
            <SelectItem value="develop-skills">Develop Specific Skills</SelectItem>
            <SelectItem value="overcome-challenges">Overcome Physical/Mental Challenges</SelectItem>
            <SelectItem value="general-improvement">General Improvement</SelectItem>
            <SelectItem value="improve-fitness">Get in Shape / Improve Fitness</SelectItem>
            <SelectItem value="build-confidence">Build Confidence & Mental Toughness</SelectItem>
            <SelectItem value="stay-consistent">Stay Consistent & Have Fun</SelectItem>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="timeframe">Timeframe <span className="text-cinnabar">*</span></Label>
          <Select
            id="timeframe"
            value={profile.timeframe}
            onValueChange={(value) => updateProfile({ timeframe: value })}
            placeholder="When do you want to see results?"
          >
            <SelectItem value="1-month">1 Month</SelectItem>
            <SelectItem value="3-months">3 Months</SelectItem>
            <SelectItem value="6-months">6 Months</SelectItem>
            <SelectItem value="1-year">1 Year</SelectItem>
            <SelectItem value="ongoing">Ongoing Development</SelectItem>
          </Select>
        </div>
      </div>

      <div className="border-t border-onboarding-border-subtle pt-6">
        <button
          type="button"
          onClick={() => toggleCategory("additionalFocus")}
          className="flex items-center justify-between gap-2 w-full font-mono uppercase tracking-[0.18em] text-[11px] text-onboarding-text-muted hover:text-onboarding-text-primary transition-colors"
        >
          <span>+ Additional focus (optional)</span>
          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform duration-200 ${
              expandedCategories["additionalFocus"] ? "rotate-180" : ""
            }`}
          />
        </button>

        {expandedCategories["additionalFocus"] && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label>Most improvement</Label>
              <Select
                value={profile.improvementFocus || ""}
                onValueChange={(value) => updateProfile({ improvementFocus: value })}
                placeholder="Select focus area"
              >
                <SelectItem value="offense">Offense</SelectItem>
                <SelectItem value="defense">Defense</SelectItem>
                <SelectItem value="both-focus">Both</SelectItem>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Most attention</Label>
              <Select
                value={profile.areaFocus || ""}
                onValueChange={(value) => updateProfile({ areaFocus: value })}
                placeholder="Select area"
              >
                <SelectItem value="standing">Standing / Takedowns</SelectItem>
                <SelectItem value="ground">Ground / Grappling</SelectItem>
                <SelectItem value="both-area">Both</SelectItem>
              </Select>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4 border-t border-onboarding-border-subtle pt-6">
        <div className="flex justify-between items-baseline">
          <Label>Specific goals <span className="text-cinnabar">*</span></Label>
          <span className="font-mono uppercase tracking-[0.15em] text-[10px] text-onboarding-text-muted">
            {profile.specificGoals.length}/8
          </span>
        </div>
        {profile.specificGoals.length >= 8 && (
          <p className="font-mono uppercase tracking-[0.15em] text-[10px] text-cinnabar">
            Max reached. Unselect one to choose another.
          </p>
        )}
        <div className="border border-onboarding-border-subtle">
          {Object.entries(goalCategories).map(([categoryName, goals], idx) => (
            <div
              key={categoryName}
              className={idx > 0 ? "border-t border-onboarding-border-subtle" : ""}
            >
              <button
                type="button"
                onClick={() => toggleCategory(categoryName)}
                className="flex items-center justify-between w-full px-4 py-3.5 font-mono uppercase tracking-[0.18em] text-[11px] text-onboarding-text-primary hover:bg-onboarding-hover-bg transition-colors"
              >
                <span>
                  <span className="text-onboarding-text-muted mr-3">0{idx + 1}</span>
                  {categoryName}
                </span>
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${
                    expandedCategories[categoryName] ? "rotate-180" : ""
                  }`}
                />
              </button>

              {expandedCategories[categoryName] && (
                <div className="px-4 pb-4 pt-1 grid grid-cols-1 md:grid-cols-2 gap-3 bg-onboarding-bg-secondary">
                  {goals.map((goal) => (
                    <div key={goal.id} className="flex items-start space-x-2">
                      <Checkbox
                        id={goal.id}
                        checked={profile.specificGoals.includes(goal.id)}
                        onCheckedChange={(checked) => handleGoalChange(goal.id, checked)}
                        className="mt-0.5"
                      />
                      <Label
                        htmlFor={goal.id}
                        className="font-serif text-sm text-onboarding-text-muted cursor-pointer leading-snug normal-case tracking-normal"
                      >
                        {goal.title}
                      </Label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-onboarding-border-subtle pt-6">
        <div className="space-y-3">
          <Label>Motivation</Label>
          <Slider
            value={[profile.motivationLevel]}
            onValueChange={(value) => updateProfile({ motivationLevel: value[0] })}
            max={10}
            min={1}
            step={1}
          />
          <div className="flex justify-between font-mono uppercase tracking-[0.15em] text-[10px] text-onboarding-text-muted">
            <span>Low</span>
            <span className="text-cinnabar">{profile.motivationLevel}/10</span>
            <span>High</span>
          </div>
        </div>

        <div className="space-y-3">
          <Label>Effort capacity</Label>
          <Slider
            value={[profile.effortCapacity]}
            onValueChange={(value) => updateProfile({ effortCapacity: value[0] })}
            max={10}
            min={1}
            step={1}
          />
          <div className="flex justify-between font-mono uppercase tracking-[0.15em] text-[10px] text-onboarding-text-muted">
            <span>Limited</span>
            <span className="text-cinnabar">{profile.effortCapacity}/10</span>
            <span>Maximum</span>
          </div>
        </div>
      </div>
    </div>
  )
}
