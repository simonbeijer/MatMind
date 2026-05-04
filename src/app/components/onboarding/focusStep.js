"use client"

import { useState } from "react"
import { Label } from "../ui/label"
import { Select, SelectItem } from "../ui/select"
import { Checkbox } from "../ui/checkbox"
import { ChevronDown } from "lucide-react"

export function FocusStep({ profile, updateProfile }) {
  const [showAdvanced, setShowAdvanced] = useState(false)

  const focusAreas = [
    "Technical Drills",
    "Mental/Mindset Work",
    "Physical Conditioning",
    "Recovery & Mobility",
    "Competition Strategy",
    "Nutrition Guidance",
    "Training Schedule",
    "Injury Prevention",
  ]

  const handleFocusChange = (area, checked) => {
    if (checked && profile.focusAreas.length >= 8) return
    const updatedAreas = checked
      ? [...profile.focusAreas, area]
      : profile.focusAreas.filter((a) => a !== area)
    updateProfile({ focusAreas: updatedAreas })
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex justify-between items-baseline">
          <Label>Focus areas <span className="text-cinnabar">*</span></Label>
          <span className="font-mono uppercase tracking-[0.15em] text-[10px] text-onboarding-text-muted">
            {profile.focusAreas.length}/8
          </span>
        </div>
        <p className="font-serif text-sm text-onboarding-text-muted leading-snug">
          Choose what your plan should emphasize.
        </p>
        {profile.focusAreas.length >= 8 && (
          <p className="font-mono uppercase tracking-[0.15em] text-[10px] text-cinnabar">
            Max reached. Unselect one to choose another.
          </p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-onboarding-border-subtle border border-onboarding-border-subtle">
          {focusAreas.map((area) => (
            <label
              key={area}
              htmlFor={area}
              className="bg-onboarding-bg-primary px-4 py-3.5 flex items-center gap-3 cursor-pointer hover:bg-onboarding-hover-bg transition-colors"
            >
              <Checkbox
                id={area}
                checked={profile.focusAreas.includes(area)}
                onCheckedChange={(checked) => handleFocusChange(area, checked)}
              />
              <span className="font-mono uppercase tracking-[0.12em] text-[11px] text-onboarding-text-primary">
                {area}
              </span>
            </label>
          ))}
        </div>
      </div>

      {profile.focusAreas.length > 0 && (
        <div className="border border-onboarding-border-subtle bg-onboarding-bg-secondary p-5">
          <div className="font-mono uppercase tracking-[0.2em] text-[10px] text-onboarding-text-muted mb-3">
            <span className="text-cinnabar">●</span> Selected · {profile.focusAreas.length}
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
            {profile.focusAreas.map((area) => (
              <li key={area} className="font-mono text-[11px] uppercase tracking-[0.12em] text-onboarding-text-primary flex items-baseline gap-2">
                <span className="text-cinnabar">→</span>
                <span>{area}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="border-t border-onboarding-border-subtle pt-6">
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center justify-between gap-2 w-full font-mono uppercase tracking-[0.18em] text-[11px] text-onboarding-text-muted hover:text-onboarding-text-primary transition-colors"
        >
          <span>+ Advanced options (optional)</span>
          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform duration-200 ${showAdvanced ? "rotate-180" : ""}`}
          />
        </button>

        {showAdvanced && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="outputStyle">Output style</Label>
              <Select
                id="outputStyle"
                value={profile.outputStyle}
                onValueChange={(value) => updateProfile({ outputStyle: value })}
                placeholder="Choose your preferred style"
              >
                <SelectItem value="practical">Practical & Direct</SelectItem>
                <SelectItem value="balanced">Balanced Approach</SelectItem>
                <SelectItem value="detailed">Detailed & Theoretical</SelectItem>
                <SelectItem value="motivational">Motivational & Encouraging</SelectItem>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="planLength">Plan detail</Label>
              <Select
                id="planLength"
                value={profile.planLength}
                onValueChange={(value) => updateProfile({ planLength: value })}
                placeholder="How detailed should your plan be?"
              >
                <SelectItem value="concise">Concise & Quick</SelectItem>
                <SelectItem value="detailed">Detailed & Comprehensive</SelectItem>
                <SelectItem value="extensive">Extensive & In-depth</SelectItem>
              </Select>
            </div>
          </div>
        )}
      </div>

      <div className="border border-onboarding-border-subtle bg-onboarding-bg-secondary p-6">
        <div className="font-mono uppercase tracking-[0.2em] text-[10px] text-onboarding-text-muted mb-4">
          §C / Your plan includes
        </div>
        <ul className="font-serif text-base text-onboarding-text-primary leading-snug space-y-2">
          <li className="flex gap-3">
            <span className="font-mono text-[10px] text-cinnabar pt-1.5">01</span>
            <span>Personalized recommendations from six AI coaching personas.</span>
          </li>
          <li className="flex gap-3">
            <span className="font-mono text-[10px] text-cinnabar pt-1.5">02</span>
            <span>Specific drills and techniques for your body type and goals.</span>
          </li>
          <li className="flex gap-3">
            <span className="font-mono text-[10px] text-cinnabar pt-1.5">03</span>
            <span>Mental strategies and mindset work for peak performance.</span>
          </li>
          <li className="flex gap-3">
            <span className="font-mono text-[10px] text-cinnabar pt-1.5">04</span>
            <span>Recovery protocols and injury prevention guidance.</span>
          </li>
          <li className="flex gap-3">
            <span className="font-mono text-[10px] text-cinnabar pt-1.5">05</span>
            <span>Competition preparation and strategic advice.</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
