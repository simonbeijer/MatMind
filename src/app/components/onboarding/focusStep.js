"use client"

import { useState } from "react"
import { Label } from "../ui/label"
import { Select, SelectItem } from "../ui/select"
import { Checkbox } from "../ui/checkbox"
import { ChevronDown } from "lucide-react"

export function FocusStep({ profile, updateProfile }) {
  const [expandedCategories, setExpandedCategories] = useState({})
  
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
    if (checked && profile.focusAreas.length >= 8) {
      // Prevent selecting more than 8 focus areas (all available)
      return;
    }

    const updatedAreas = checked 
      ? [...profile.focusAreas, area] 
      : profile.focusAreas.filter((a) => a !== area)

    updateProfile({ focusAreas: updatedAreas })
  }

  const toggleCategory = (categoryName) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }))
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Label className="text-onboarding-text-primary">
            Focus Areas (select all that apply) *
          </Label>
          <div className="text-xs text-onboarding-text-subtle">
            {profile.focusAreas.length}/8 selected
          </div>
        </div>
        <p className="text-sm text-onboarding-text-subtle">
          Choose the areas you want your plan to emphasize
        </p>
        {profile.focusAreas.length >= 8 && (
          <div className="text-xs text-amber-600 bg-amber-50 p-2 rounded">
            You&apos;ve selected the maximum number of focus areas (8). Unselect one to choose a different area.
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {focusAreas.map((area) => (
            <div key={area} className="flex items-center space-x-2">
              <Checkbox
                id={area}
                checked={profile.focusAreas.includes(area)}
                onCheckedChange={(checked) => handleFocusChange(area, checked)}
              />
              <Label
                htmlFor={area}
                className="text-sm text-onboarding-text-muted cursor-pointer"
              >
                {area}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {profile.focusAreas.length > 0 && (
        <div className="bg-onboarding-accent-end/10 border border-onboarding-accent-end/20 rounded-lg p-4">
          <h3 className="text-onboarding-text-primary font-medium mb-3 flex items-center">
            <span className="text-lg mr-2">✅</span>
            Your Selected Focus Areas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {profile.focusAreas.map((area) => (
              <div key={area} className="flex items-center space-x-2">
                <span className="text-onboarding-accent-end">•</span>
                <span className="text-sm text-onboarding-text-muted">{area}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-3">
        <button
          type="button"
          onClick={() => toggleCategory('advancedOptions')}
          className="flex items-center gap-2 text-base font-medium text-onboarding-text-primary hover:text-onboarding-text-primary hover:bg-onboarding-hover-bg px-2 py-1 rounded-md transition-all duration-200 w-full justify-start"
        >
          <span className="text-lg">⚙️</span>
          <span>Advanced Options</span>
          <ChevronDown 
            className={`h-4 w-4 ml-auto transition-transform duration-200 ${
              expandedCategories['advancedOptions'] ? 'rotate-180' : ''
            }`} 
          />
        </button>
        
        {expandedCategories['advancedOptions'] && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-8 animate-in slide-in-from-top-1 duration-200">
            <div className="space-y-2">
              <Label htmlFor="outputStyle" className="text-onboarding-text-primary">
                Output Style
              </Label>
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
              <Label htmlFor="planLength" className="text-onboarding-text-primary">
                Plan Detail Level
              </Label>
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

      <div className="bg-onboarding-accent-end/10 border border-onboarding-accent-end/20 rounded-lg p-4">
        <h3 className="text-onboarding-text-primary font-medium mb-2">
          🎯 Your Plan Will Include:
        </h3>
        <ul className="text-sm text-onboarding-text-muted space-y-1">
          <li>• Personalized training recommendations from multiple AI coaching personas</li>
          <li>• Specific drills and techniques tailored to your body type and goals</li>
          <li>• Mental strategies and mindset work for peak performance</li>
          <li>• Recovery protocols and injury prevention guidance</li>
          <li>• Competition preparation and strategic advice</li>
        </ul>
      </div>
    </div>
  )
}