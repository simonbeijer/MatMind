"use client"

import { useState } from "react"
import { Label } from "../ui/label"
import { Select, SelectItem } from "../ui/select"
import { Checkbox } from "../ui/checkbox"
import { Slider } from "../ui/slider"

export function GoalsStep({ profile, updateProfile }) {
  const specificGoals = [
    {
      id: "win-competition",
      title: "Win more in competition",
      tags: ["✅ Standing + Ground", "✅ Offense + Defense"],
      category: "Competition",
      emoji: "🏆"
    },
    {
      id: "mental-toughness",
      title: "Build mental toughness and confidence",
      tags: ["🧠 Mental"],
      category: "Mental",
      emoji: "🧠"
    },
    {
      id: "cardio-conditioning",
      title: "Improve cardio and conditioning",
      tags: ["🏃‍♂️ Physical"],
      category: "Physical",
      emoji: "🏃‍♂️"
    },
    {
      id: "overall-technique",
      title: "Improve overall technique and positional skills",
      tags: ["✅ Offense + Defense", "✅ Standing + Ground"],
      category: "Technical",
      emoji: "⚙️"
    },
    {
      id: "defensive-skills",
      title: "Enhance defensive skills (escapes, sub defense)",
      tags: ["✅ Defense", "✅ Ground"],
      category: "Technical",
      emoji: "🛡️"
    },
    {
      id: "flow-timing",
      title: "Develop flow, timing, and movement efficiency",
      tags: ["⚙️ Movement", "⚙️ Neutral"],
      category: "Movement",
      emoji: "⚡"
    },
    {
      id: "advanced-techniques",
      title: "Learn advanced or higher-level techniques",
      tags: ["🧠 Offense + Defense"],
      category: "Technical",
      emoji: "🎓"
    },
    {
      id: "training-plateaus",
      title: "Break through training plateaus",
      tags: ["🎯 General"],
      category: "General",
      emoji: "🎯"
    },
    {
      id: "injury-prevention",
      title: "Prevent or recover from injuries",
      tags: ["🛡️ Physical"],
      category: "Physical",
      emoji: "🩹"
    },
    {
      id: "training-consistency",
      title: "Train more consistently and stay motivated",
      tags: ["🔁 Lifestyle"],
      category: "Lifestyle",
      emoji: "🔁"
    },
    {
      id: "life-balance",
      title: "Balance BJJ with life, work, or stress",
      tags: ["⚖️ Lifestyle"],
      category: "Lifestyle",
      emoji: "⚖️"
    },
    {
      id: "competition-mindset",
      title: "Develop a strong competition mindset",
      tags: ["🧠 Mental"],
      category: "Mental",
      emoji: "🎯"
    }
  ]

  const [selectedCategory, setSelectedCategory] = useState("all")
  
  const categories = ["all", ...new Set(specificGoals.map(goal => goal.category))]
  
  const filteredGoals = selectedCategory === "all" 
    ? specificGoals 
    : specificGoals.filter(goal => goal.category === selectedCategory)

  const handleGoalChange = (goal, checked) => {
    if (checked && profile.specificGoals.length >= 8) {
      // Prevent selecting more than 8 goals
      return;
    }

    const updatedGoals = checked 
      ? [...profile.specificGoals, goal.id] 
      : profile.specificGoals.filter((g) => g !== goal.id)

    updateProfile({ specificGoals: updatedGoals })
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
        
        <div className="space-y-2">
          <Label className="text-sm text-onboarding-text-muted">Filter by Category</Label>
          <Select 
            value={selectedCategory} 
            onValueChange={setSelectedCategory}
          >
            {categories.map(category => (
              <SelectItem key={category} value={category}>
                {category === "all" ? "All Categories" : category}
              </SelectItem>
            ))}
          </Select>
        </div>
        {profile.specificGoals.length >= 8 && (
          <div className="text-xs text-amber-600 bg-amber-50 p-2 rounded">
            You&apos;ve selected the maximum number of goals (8). Unselect one to choose a different goal.
          </div>
        )}
        <div className="grid grid-cols-1 gap-3 max-h-80 overflow-y-auto">
          {filteredGoals.map((goal) => (
            <div key={goal.id} className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Checkbox
                id={goal.id}
                checked={profile.specificGoals.includes(goal.id)}
                onCheckedChange={(checked) => handleGoalChange(goal, checked)}
                className="mt-1"
              />
              <div className="flex-1 space-y-2">
                <Label
                  htmlFor={goal.id}
                  className="text-sm font-medium text-onboarding-text-primary cursor-pointer flex items-center gap-2"
                >
                  <span>{goal.emoji}</span>
                  {goal.title}
                </Label>
                <div className="flex flex-wrap gap-1">
                  {goal.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {goal.category}
                </div>
              </div>
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