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

  const updateProfileWithSessionCheck = async (updates) => {
    if (validateSession) {
      const isValid = await validateSession()
      if (!isValid) return
    }
    updateProfile(updates)
  }

  const challengeCategories = {
    "Mental & Emotional": [
      "Mental blocks during rolling or competition",
      "Lack of confidence or self-belief",
      "Struggling with focus or motivation",
    ],
    "Physical & Conditioning": [
      "Poor cardio or gas tank",
      "Limited flexibility or mobility",
      "Strength or athleticism gaps",
      "Recovering from injury or chronic pain",
    ],
    "Technical & Tactical": [
      "Plateau in skill development",
      "Difficulty with specific positions or transitions",
      "Trouble finishing submissions or escaping bad spots",
    ],
    "Training & Opponents": [
      "Struggling against larger, stronger opponents",
      "Trouble dealing with faster, more technical training partners",
      "Feeling lost during sparring or competition",
    ],
    "Lifestyle & Time": [
      "Not enough time to train consistently",
      "Balancing BJJ with work/family/school",
      "Poor sleep, stress, or burnout off the mats",
    ],
  }

  const handleChallengeChange = async (challenge, checked) => {
    if (checked && profile.currentChallenges.length >= 8) return
    const updatedChallenges = checked
      ? [...profile.currentChallenges, challenge]
      : profile.currentChallenges.filter((c) => c !== challenge)
    await updateProfileWithSessionCheck({ currentChallenges: updatedChallenges })
  }

  const toggleCategory = (categoryName) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryName]: !prev[categoryName],
    }))
  }

  const inputClass =
    "w-full h-11 bg-onboarding-bg-primary border border-onboarding-border-input text-onboarding-text-primary placeholder:text-onboarding-text-subtle px-4 py-2 focus:outline-none focus:border-onboarding-text-primary transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="age">Age <span className="text-cinnabar">*</span></Label>
          <div className="relative">
            <input
              id="age"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={profile.age}
              onChange={async (e) => {
                const value = e.target.value.replace(/[^0-9]/g, "")
                const numValue = parseInt(value)
                if (value === "" || (numValue >= 1 && numValue <= 99)) {
                  await updateProfileWithSessionCheck({ age: value })
                }
              }}
              placeholder="Enter your age"
              className={inputClass}
              autoComplete="off"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <span className="font-mono uppercase tracking-[0.15em] text-[10px] text-onboarding-text-subtle">years</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="weight">Weight <span className="text-cinnabar">*</span></Label>
          <div className="relative">
            <input
              id="weight"
              type="text"
              inputMode="decimal"
              value={profile.weight}
              onChange={async (e) => {
                const value = e.target.value.replace(/[^0-9.]/g, "")
                const numValue = parseFloat(value)
                if (value === "" || value === "." || (!isNaN(numValue) && numValue <= 300)) {
                  await updateProfileWithSessionCheck({ weight: value })
                }
              }}
              placeholder="Enter your weight"
              className={inputClass}
              autoComplete="off"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <span className="font-mono uppercase tracking-[0.15em] text-[10px] text-onboarding-text-subtle">kg</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="beltRank">Belt rank <span className="text-cinnabar">*</span></Label>
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
          <Label htmlFor="trainingFrequency">Training frequency <span className="text-cinnabar">*</span></Label>
          <div className="relative">
            <input
              id="trainingFrequency"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={profile.trainingFrequency}
              onChange={async (e) => {
                const value = e.target.value.replace(/[^0-9]/g, "")
                const numValue = parseInt(value)
                if (value === "" || (numValue >= 1 && numValue <= 14)) {
                  await updateProfileWithSessionCheck({ trainingFrequency: value })
                }
              }}
              placeholder="How many times per week?"
              className={inputClass}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <span className="font-mono uppercase tracking-[0.15em] text-[10px] text-onboarding-text-subtle">×/week</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-onboarding-border-subtle pt-6">
        <button
          type="button"
          onClick={() => setShowBodyType(!showBodyType)}
          className="flex items-center justify-between gap-2 w-full font-mono uppercase tracking-[0.18em] text-[11px] text-onboarding-text-muted hover:text-onboarding-text-primary transition-colors"
        >
          <span>+ Additional Details (optional)</span>
          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform duration-200 ${showBodyType ? "rotate-180" : ""}`}
          />
        </button>

        {showBodyType && (
          <div className="mt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="bodyType">Body type</Label>
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
                <Label htmlFor="gender">Gender</Label>
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

            <div className="space-y-3">
              <Label>Training style</Label>
              <Slider
                value={[profile.giPreference || 50]}
                onValueChange={async (value) => await updateProfileWithSessionCheck({ giPreference: value[0] })}
                min={0}
                max={100}
                step={5}
              />
              <div className="flex justify-between font-mono uppercase tracking-[0.15em] text-[10px] text-onboarding-text-muted">
                <span>No-Gi</span>
                <span className="text-cinnabar">{100 - (profile.giPreference || 50)}% No-Gi · {profile.giPreference || 50}% Gi</span>
                <span>Gi</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-3">
                <Label>Flexibility</Label>
                <Slider
                  value={[profile.flexibility || 5]}
                  onValueChange={async (value) => await updateProfileWithSessionCheck({ flexibility: value[0] })}
                  min={1}
                  max={10}
                  step={1}
                />
                <div className="flex justify-between font-mono uppercase tracking-[0.15em] text-[10px] text-onboarding-text-muted">
                  <span>Low</span>
                  <span className="text-cinnabar">{profile.flexibility || 5}/10</span>
                  <span>High</span>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Strength</Label>
                <Slider
                  value={[profile.strength || 5]}
                  onValueChange={async (value) => await updateProfileWithSessionCheck({ strength: value[0] })}
                  min={1}
                  max={10}
                  step={1}
                />
                <div className="flex justify-between font-mono uppercase tracking-[0.15em] text-[10px] text-onboarding-text-muted">
                  <span>Low</span>
                  <span className="text-cinnabar">{profile.strength || 5}/10</span>
                  <span>High</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 max-w-[calc(50%-0.625rem)]">
              <Label>Cardio</Label>
              <Slider
                value={[profile.cardio || 5]}
                onValueChange={async (value) => await updateProfileWithSessionCheck({ cardio: value[0] })}
                min={1}
                max={10}
                step={1}
              />
              <div className="flex justify-between font-mono uppercase tracking-[0.15em] text-[10px] text-onboarding-text-muted">
                <span>Poor</span>
                <span className="text-cinnabar">{profile.cardio || 5}/10</span>
                <span>Excellent</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="experience">Training experience</Label>
        <Textarea
          id="experience"
          placeholder="Tell us about your BJJ journey, other training, or sports background…"
          value={profile.experience}
          onChange={async (e) => await updateProfileWithSessionCheck({ experience: e.target.value })}
          rows={3}
        />
      </div>

      <div className="space-y-4 border-t border-onboarding-border-subtle pt-6">
        <div className="flex justify-between items-baseline">
          <Label>Current challenges</Label>
          <span className="font-mono uppercase tracking-[0.15em] text-[10px] text-onboarding-text-muted">
            {profile.currentChallenges.length}/8
          </span>
        </div>
        {profile.currentChallenges.length >= 8 && (
          <p className="font-mono uppercase tracking-[0.15em] text-[10px] text-cinnabar">
            Max reached. Unselect one to choose another.
          </p>
        )}
        <div className="border border-onboarding-border-subtle">
          {Object.entries(challengeCategories).map(([categoryName, challenges], idx) => (
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
                  {challenges.map((challenge) => (
                    <div key={challenge} className="flex items-start space-x-2">
                      <Checkbox
                        id={challenge}
                        checked={profile.currentChallenges.includes(challenge)}
                        onCheckedChange={(checked) => handleChallengeChange(challenge, checked)}
                        className="mt-0.5"
                      />
                      <Label
                        htmlFor={challenge}
                        className="font-serif text-sm text-onboarding-text-muted cursor-pointer leading-snug normal-case tracking-normal"
                      >
                        {challenge}
                      </Label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="space-y-2 pt-2">
          <Label htmlFor="otherChallenges">Other</Label>
          <Textarea
            id="otherChallenges"
            placeholder="Other struggles you're facing (optional)…"
            value={profile.otherChallenges || ""}
            onChange={async (e) => await updateProfileWithSessionCheck({ otherChallenges: e.target.value })}
            rows={3}
          />
        </div>
      </div>
    </div>
  )
}
