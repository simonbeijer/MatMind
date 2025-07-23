"use client"

import { Label } from "../ui/label"
import { Select, SelectItem } from "../ui/select"
import { Checkbox } from "../ui/checkbox"
import { Slider } from "../ui/slider"

export function GoalsStep({ profile, updateProfile }) {
  const specificGoals = [
    "Increase competition win rate",
    "Improve guard game",
    "Develop better takedowns",
    "Enhance submission defense",
    "Build mental toughness",
    "Improve cardio/conditioning",
    "Develop flow and timing",
    "Learn advanced techniques",
    "Overcome training plateaus",
    "Injury prevention/recovery",
    "Better training consistency",
    "Develop competition mindset",
  ]

  const handleGoalChange = (goal, checked) => {
    if (checked && profile.specificGoals.length >= 8) {
      // Prevent selecting more than 8 goals
      return;
    }

    const updatedGoals = checked 
      ? [...profile.specificGoals, goal] 
      : profile.specificGoals.filter((g) => g !== goal)

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto">
          {specificGoals.map((goal) => (
            <div key={goal} className="flex items-center space-x-2">
              <Checkbox
                id={goal}
                checked={profile.specificGoals.includes(goal)}
                onCheckedChange={(checked) => handleGoalChange(goal, checked)}
              />
              <Label
                htmlFor={goal}
                className="text-sm text-onboarding-text-muted cursor-pointer"
              >
                {goal}
              </Label>
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