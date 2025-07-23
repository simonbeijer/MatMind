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
    "Mental & Emotional Goals": {
      emoji: "🧠",
      goals: [
        { id: "mental-toughness", title: "Build mental toughness and confidence" },
        { id: "competition-mindset", title: "Develop a strong competition mindset" }
      ]
    },
    "Physical & Conditioning Goals": {
      emoji: "💪",
      goals: [
        { id: "cardio-conditioning", title: "Improve cardio and conditioning" },
        { id: "injury-prevention", title: "Prevent or recover from injuries" }
      ]
    },
    "Technical & Tactical Development": {
      emoji: "🧩",
      goals: [
        { id: "overall-technique", title: "Improve overall technique and positional skills" },
        { id: "offensive-skills", title: "Develop offensive skills (submissions, attacks, pressure)" },
        { id: "defensive-skills", title: "Enhance defensive skills (escapes, sub defense)" },
        { id: "advanced-techniques", title: "Learn advanced or higher-level techniques" },
        { id: "flow-timing", title: "Develop flow, timing, and movement efficiency" }
      ]
    },
    "Competition & Performance Goals": {
      emoji: "⚔️",
      goals: [
        { id: "win-competition", title: "Win more in competition" },
        { id: "training-plateaus", title: "Break through training plateaus" }
      ]
    },
    "Lifestyle & Balance Goals": {
      emoji: "⏳",
      goals: [
        { id: "training-consistency", title: "Train more consistently and stay motivated" },
        { id: "life-balance", title: "Balance BJJ with life, work, or stress" }
      ]
    }
  }

  const handleGoalChange = (goalId, checked) => {
    if (checked && profile.specificGoals.length >= 8) {
      // Prevent selecting more than 8 goals
      return;
    }

    const updatedGoals = checked 
      ? [...profile.specificGoals, goalId] 
      : profile.specificGoals.filter((g) => g !== goalId)

    updateProfile({ specificGoals: updatedGoals })
  }

  const toggleCategory = (categoryName) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }))
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="primaryGoal" className="text-onboarding-text-primary">
          Primary Goal *
        </Label>
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
        <Label htmlFor="timeframe" className="text-onboarding-text-primary">
          Timeframe *
        </Label>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="text-onboarding-text-primary">
            Where do you want the most improvement?
          </Label>
          <Select 
            value={profile.improvementFocus || ""} 
            onValueChange={(value) => updateProfile({ improvementFocus: value })}
            placeholder="Select focus area"
          >
            <SelectItem value="offense">✅ Offense</SelectItem>
            <SelectItem value="defense">✅ Defense</SelectItem>
            <SelectItem value="both-focus">✅ Both</SelectItem>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-onboarding-text-primary">
            Which area needs the most attention?
          </Label>
          <Select 
            value={profile.areaFocus || ""} 
            onValueChange={(value) => updateProfile({ areaFocus: value })}
            placeholder="Select area"
          >
            <SelectItem value="standing">✅ Standing / Takedowns</SelectItem>
            <SelectItem value="ground">✅ Ground / Grappling</SelectItem>
            <SelectItem value="both-area">✅ Both</SelectItem>
          </Select>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Label className="text-onboarding-text-primary">
            Specific Goals (select all that apply) *
          </Label>
          <div className="text-xs text-onboarding-text-subtle">
            {profile.specificGoals.length}/8 selected
          </div>
        </div>
        {profile.specificGoals.length >= 8 && (
          <div className="text-xs text-amber-600 bg-amber-50 p-2 rounded">
            You&apos;ve selected the maximum number of goals (8). Unselect one to choose a different goal.
          </div>
        )}
        <div className="space-y-6">
          {Object.entries(goalCategories).map(([categoryName, categoryData]) => (
            <div key={categoryName} className="space-y-3">
              <button
                type="button"
                onClick={() => toggleCategory(categoryName)}
                className="flex items-center gap-2 text-base font-medium text-onboarding-text-primary hover:text-onboarding-text-primary hover:bg-onboarding-hover-bg px-2 py-1 rounded-md transition-all duration-200 w-full justify-start"
              >
                <span className="text-lg">{categoryData.emoji}</span>
                <span>{categoryName}</span>
                <ChevronDown 
                  className={`h-4 w-4 ml-auto transition-transform duration-200 ${
                    expandedCategories[categoryName] ? 'rotate-180' : ''
                  }`} 
                />
              </button>
              
              {expandedCategories[categoryName] && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-8 animate-in slide-in-from-top-1 duration-200">
                  {categoryData.goals.map((goal) => (
                    <div key={goal.id} className="flex items-start space-x-2">
                      <Checkbox
                        id={goal.id}
                        checked={profile.specificGoals.includes(goal.id)}
                        onCheckedChange={(checked) => handleGoalChange(goal.id, checked)}
                        className="mt-0.5"
                      />
                      <Label
                        htmlFor={goal.id}
                        className="text-sm text-onboarding-text-muted cursor-pointer leading-relaxed"
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <Label className="text-onboarding-text-primary">Motivation Level</Label>
          <div className="px-2">
            <Slider
              value={[profile.motivationLevel]}
              onValueChange={(value) => updateProfile({ motivationLevel: value[0] })}
              max={10}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-onboarding-text-subtle mt-1">
              <span>Low</span>
              <span className="text-onboarding-accent-end font-medium">
                {profile.motivationLevel}/10
              </span>
              <span>High</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-onboarding-text-primary">Effort Capacity</Label>
          <div className="px-2">
            <Slider
              value={[profile.effortCapacity]}
              onValueChange={(value) => updateProfile({ effortCapacity: value[0] })}
              max={10}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-onboarding-text-subtle mt-1">
              <span>Limited</span>
              <span className="text-onboarding-accent-end font-medium">
                {profile.effortCapacity}/10
              </span>
              <span>Maximum</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}