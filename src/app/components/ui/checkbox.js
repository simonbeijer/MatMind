"use client"

import { Check } from "lucide-react"

// Utility function for className merging
const cn = (...classes) => {
  return classes.filter(Boolean).join(' ')
}

const Checkbox = ({ 
  checked = false,
  onChange,
  onCheckedChange,
  className,
  id,
  disabled,
  ...props 
}) => {
  const handleChange = (e) => {
    const isChecked = e.target.checked
    if (onChange) onChange(e)
    if (onCheckedChange) onCheckedChange(isChecked)
  }

  return (
    <div className="relative inline-flex items-center">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        className="sr-only peer"
        {...props}
      />
      <label
        htmlFor={id}
        className={cn(
          "flex items-center justify-center h-4 w-4 shrink-0 rounded-sm border cursor-pointer",
          "border-onboarding-border-input bg-transparent",
          "ring-offset-background transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-onboarding-accent-end focus-visible:ring-offset-2",
          "peer-checked:bg-onboarding-accent-end peer-checked:border-onboarding-accent-end peer-checked:text-onboarding-bg-primary",
          "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
          "hover:border-onboarding-accent-end/50",
          className
        )}
      >
        {checked && (
          <Check className="h-3 w-3 text-current" />
        )}
      </label>
    </div>
  )
}

export { Checkbox }