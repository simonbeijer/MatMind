"use client"

import { useState } from "react"
import { Label } from "../ui/label"
import { Select, SelectItem } from "../ui/select"
import { Textarea } from "../ui/textarea"
import { Checkbox } from "../ui/checkbox"
import { Slider } from "../ui/slider"
import { ChevronDown } from "lucide-react"

export function ProfileStep({ profile, updateProfile, validateSession }) {
  const [showBodyType, setShowBodyType] = useState(false)
  const [expandedCategories, setExpandedCategories] = useState({})

  // Helper function to validate session before updating profile
  const updateProfileWithSessionCheck = async (updates) => {
    if (validateSession) {
      const isValid = await validateSession()
      if (!isValid) return // Session expired, user will be redirected
    }
    updateProfile(updates)
  }
  
  const challengeCategories = {
    "Mental & Emotional Challenges": {
      emoji: "🧠",
      challenges: [
        "Mental blocks during rolling or competition",
        "Lack of confidence or self-belief",
        "Struggling with focus or motivation"
      ]
    },
    "Physical & Conditioning Issues": {
      emoji: "💪",
      challenges: [
        "Poor cardio or gas tank",
        "Limited flexibility or mobility",
        "Strength or athleticism gaps",
        "Recovering from injury or chronic pain"
      ]
    },
    "Technical & Tactical Plateaus": {
      emoji: "🧩",
      challenges: [
        "Plateau in skill development",
        "Difficulty with specific positions or transitions",
        "Trouble finishing submissions or escaping bad spots"
      ]
    },
    "Training & Opponent-Specific Struggles": {
      emoji: "⚔️",
      challenges: [
        "Struggling against larger, stronger opponents",
        "Trouble dealing with faster, more technical training partners",
        "Feeling lost during sparring or competition"
      ]
    },
    "Lifestyle & Time Constraints": {
      emoji: "⏳",
      challenges: [
        "Not enough time to train consistently",
        "Balancing BJJ with work/family/school",
        "Poor sleep, stress, or burnout off the mats"
      ]
    }
  }

  const handleChallengeChange = async (challenge, checked) => {
    if (checked && profile.currentChallenges.length >= 8) {
      // Prevent selecting more than 8 challenges
      return;
    }

    const updatedChallenges = checked
      ? [...profile.currentChallenges, challenge]
      : profile.currentChallenges.filter((c) => c !== challenge)

    await updateProfileWithSessionCheck({ currentChallenges: updatedChallenges })
  }

  const toggleCategory = (categoryName) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }))
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="age" className="text-onboarding-text-primary">
            Age *
          </Label>
          <div className="relative">
            <input
              id="age"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={profile.age}
              onChange={async (e) => {
                const value = e.target.value.replace(/[^0-9]/g, '');
                const numValue = parseInt(value);
                if (value === '' || (numValue >= 1 && numValue <= 99)) {
                  await updateProfileWithSessionCheck({ age: value });
                }
              }}
              placeholder="Enter your age"
              className="w-full h-10 bg-onboarding-card-bg border border-onboarding-border-input text-onboarding-text-primary placeholder:text-onboarding-text-subtle px-3 py-2 rounded-md focus:ring-2 focus:ring-onboarding-accent-end [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&:-webkit-autofill]:bg-onboarding-card-bg [&:-webkit-autofill]:text-onboarding-text-primary [&:-webkit-autofill]:[-webkit-text-fill-color:var(--onboarding-text-primary)] [&:-webkit-autofill]:shadow-[inset_0_0_0_1000px_var(--onboarding-card-bg)]"
              autoComplete="off"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <span className="text-onboarding-text-subtle text-xs">years</span>
            </div>
          </div>
          {profile.age && (
            <div className="text-xs text-onboarding-accent-end font-medium">
              {profile.age < 18 ? '🌟 Young warrior!' : 
               profile.age < 30 ? '💪 Prime time!' : 
               profile.age < 40 ? '🎯 Experienced!' : 
               profile.age < 50 ? '🔥 Seasoned athlete!' : 
               '🏆 Master level!'}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="weight" className="text-onboarding-text-primary">
            Weight *
          </Label>
          <div className="relative">
            <input
              id="weight"
              type="text"
              inputMode="decimal"
              value={profile.weight}
              onChange={async (e) => {
                const value = e.target.value.replace(/[^0-9.]/g, '');
                const numValue = parseFloat(value);
                if (value === '' || value === '.' || (!isNaN(numValue) && numValue <= 300)) {
                  await updateProfileWithSessionCheck({ weight: value });
                }
              }}
              placeholder="Enter your weight"
              className="w-full h-10 bg-onboarding-card-bg border border-onboarding-border-input text-onboarding-text-primary placeholder:text-onboarding-text-subtle px-3 py-2 rounded-md focus:ring-2 focus:ring-onboarding-accent-end [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&:-webkit-autofill]:bg-onboarding-card-bg [&:-webkit-autofill]:text-onboarding-text-primary [&:-webkit-autofill]:[-webkit-text-fill-color:var(--onboarding-text-primary)] [&:-webkit-autofill]:shadow-[inset_0_0_0_1000px_var(--onboarding-card-bg)]"
              autoComplete="off"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <span className="text-onboarding-text-subtle text-xs">kg</span>
            </div>
          </div>
          {profile.weight && (
            <div className="text-xs text-onboarding-accent-end font-medium">
              {profile.weight < 60 ? '🪶 Lightweight division!' : 
               profile.weight < 77 ? '⚖️ Middleweight division!' : 
               profile.weight < 93 ? '💪 Light heavyweight!' : 
               profile.weight < 120 ? '🏋️ Heavyweight division!' : 
               '🦣 Super heavyweight!'}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="beltRank" className="text-onboarding-text-primary">
            Belt Rank *
          </Label>
          <Select 
            id="beltRank"
            value={profile.beltRank} 
            onValueChange={async (value) => await updateProfileWithSessionCheck({ beltRank: value })}
            placeholder="Select your belt rank"
          >
            <SelectItem value="white">White Belt</SelectItem>
            <SelectItem value="blue">Blue Belt</SelectItem>
            <SelectItem value="purple">Purple Belt</SelectItem>
            <SelectItem value="brown">Brown Belt</SelectItem>
            <SelectItem value="black">Black Belt</SelectItem>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="trainingFrequency" className="text-onboarding-text-primary">
            Training Frequency *
          </Label>
          <div className="relative">
            <input
              id="trainingFrequency"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={profile.trainingFrequency}
              onChange={async (e) => {
                const value = e.target.value.replace(/[^0-9]/g, '');
                const numValue = parseInt(value);
                if (value === '' || (numValue >= 1 && numValue <= 14)) {
                  await updateProfileWithSessionCheck({ trainingFrequency: value });
                }
              }}
              placeholder="How many times per week?"
              className="w-full h-10 bg-onboarding-card-bg border border-onboarding-border-input text-onboarding-text-primary placeholder:text-onboarding-text-subtle px-3 py-2 rounded-md focus:ring-2 focus:ring-onboarding-accent-end [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <span className="text-onboarding-text-subtle text-xs">times/week</span>
            </div>
          </div>
          {profile.trainingFrequency && (
            <div className="text-xs text-onboarding-accent-end font-medium">
              {profile.trainingFrequency <= 2 ? '🏃 Getting started!' : 
               profile.trainingFrequency <= 4 ? '💪 Regular training!' : 
               profile.trainingFrequency <= 7 ? '🔥 Dedicated athlete!' : 
               '🏆 Elite level training!'}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <button
          type="button"
          onClick={() => setShowBodyType(!showBodyType)}
          className="flex items-center gap-2 text-sm text-onboarding-text-muted hover:text-onboarding-text-primary hover:bg-onboarding-hover-bg px-6 py-2 rounded-md transition-all duration-200 w-full justify-start"
        >
          <span>Additional Details (Optional)</span>
          <ChevronDown 
            className={`h-4 w-4 transition-transform duration-200 ${
              showBodyType ? 'rotate-180' : ''
            }`} 
          />
        </button>
        
        {showBodyType && (
          <div className="space-y-4 animate-in slide-in-from-top-1 duration-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bodyType" className="text-onboarding-text-primary">
                  Body Type
                </Label>
                <Select 
                  id="bodyType"
                  value={profile.bodyType} 
                  onValueChange={async (value) => await updateProfileWithSessionCheck({ bodyType: value })}
                  placeholder="Select your body type"
                >
                  <SelectItem value="long-limbs">Long Limbs</SelectItem>
                  <SelectItem value="average-limbs">Average Limbs</SelectItem>
                  <SelectItem value="short-limbs">Short Limbs</SelectItem>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="gender" className="text-onboarding-text-primary">
                  Gender
                </Label>
                <Select 
                  id="gender"
                  value={profile.gender} 
                  onValueChange={async (value) => await updateProfileWithSessionCheck({ gender: value })}
                  placeholder="Select your gender"
                >
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="non-binary">Non-binary</SelectItem>
                  <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-onboarding-text-primary">
                  Training Style
                </Label>
                <Slider
                  value={[profile.giPreference || 50]}
                  onValueChange={async (value) => await updateProfileWithSessionCheck({ giPreference: value[0] })}
                  min={0}
                  max={100}
                  step={5}
                />
                <div className="flex justify-between text-xs text-onboarding-text-muted">
                  <span>No-Gi</span>
                  <span>{100 - (profile.giPreference || 50)}% No-Gi / {profile.giPreference || 50}% Gi</span>
                  <span>Gi</span>
                </div>
              </div>
              <div></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-onboarding-text-primary">
                  Flexibility Level
                </Label>
                <Slider
                  value={[profile.flexibility || 5]}
                  onValueChange={async (value) => await updateProfileWithSessionCheck({ flexibility: value[0] })}
                  min={1}
                  max={10}
                  step={1}
                />
                <div className="flex justify-between text-xs text-onboarding-text-muted">
                  <span>Not flexible</span>
                  <span>{profile.flexibility || 5}/10</span>
                  <span>Very flexible</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-onboarding-text-primary">
                  Strength Level
                </Label>
                <Slider
                  value={[profile.strength || 5]}
                  onValueChange={async (value) => await updateProfileWithSessionCheck({ strength: value[0] })}
                  min={1}
                  max={10}
                  step={1}
                />
                <div className="flex justify-between text-xs text-onboarding-text-muted">
                  <span>Low strength</span>
                  <span>{profile.strength || 5}/10</span>
                  <span>High strength</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-onboarding-text-primary">
                  Cardio Level
                </Label>
                <Slider
                  value={[profile.cardio || 5]}
                  onValueChange={async (value) => await updateProfileWithSessionCheck({ cardio: value[0] })}
                  min={1}
                  max={10}
                  step={1}
                />
                <div className="flex justify-between text-xs text-onboarding-text-muted">
                  <span>Poor cardio</span>
                  <span>{profile.cardio || 5}/10</span>
                  <span>Excellent cardio</span>
                </div>
              </div>
              <div></div>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="experience" className="text-onboarding-text-primary">
          Training Experience
        </Label>
        <Textarea
          id="experience"
          placeholder="Tell us about your BJJ journey, other training, or sports background..."
          value={profile.experience}
          onChange={async (e) => await updateProfileWithSessionCheck({ experience: e.target.value })}
          rows={3}
        />
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Label className="text-onboarding-text-primary">
            Current Challenges (select all that apply)
          </Label>
          <div className="text-xs text-onboarding-text-subtle">
            {profile.currentChallenges.length}/8 selected
          </div>
        </div>
        {profile.currentChallenges.length >= 8 && (
          <div className="text-xs text-amber-600 bg-amber-50 p-2 rounded">
            You&apos;ve selected the maximum number of challenges (8). Unselect one to choose a different challenge.
          </div>
        )}
        <div className="space-y-6">
          {Object.entries(challengeCategories).map(([categoryName, categoryData]) => (
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
                  {categoryData.challenges.map((challenge) => (
                    <div key={challenge} className="flex items-start space-x-2">
                      <Checkbox
                        id={challenge}
                        checked={profile.currentChallenges.includes(challenge)}
                        onCheckedChange={(checked) => handleChallengeChange(challenge, checked)}
                        className="mt-0.5"
                      />
                      <Label
                        htmlFor={challenge}
                        className="text-sm text-onboarding-text-muted cursor-pointer leading-relaxed"
                      >
                        {challenge}
                      </Label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          
          <div className="space-y-3 pt-2">
            <h3 className="flex items-center gap-2 text-base font-medium text-onboarding-text-primary">
              <span className="text-lg">✍️</span>
              Optional: Other Challenges
            </h3>
            <Textarea
              id="otherChallenges"
              placeholder="Other struggles you're facing (optional)..."
              value={profile.otherChallenges || ""}
              onChange={async (e) => await updateProfileWithSessionCheck({ otherChallenges: e.target.value })}
              rows={3}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  )
}