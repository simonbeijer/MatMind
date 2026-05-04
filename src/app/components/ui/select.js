"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

// Utility function for className merging
const cn = (...classes) => {
  return classes.filter(Boolean).join(' ')
}

// Simple native select component
const Select = ({ 
  value, 
  onChange, 
  onValueChange, 
  placeholder, 
  children, 
  className,
  disabled,
  ...props 
}) => {
  const handleChange = (e) => {
    const newValue = e.target.value
    if (onChange) onChange(e)
    if (onValueChange) onValueChange(newValue)
  }

  return (
    <div className="relative">
      <select
        value={value || ""}
        onChange={handleChange}
        disabled={disabled}
        className={cn(
          "w-full h-11 appearance-none border px-3 py-2 text-sm",
          "bg-onboarding-bg-secondary border-onboarding-border-input",
          "text-onboarding-text-primary",
          "focus:outline-none focus:border-onboarding-text-primary",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "pr-8",
          className
        )}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {children}
      </select>
      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-onboarding-text-muted pointer-events-none" />
    </div>
  )
}

// For compatibility with existing patterns
const SelectTrigger = ({ children, className, ...props }) => children

const SelectValue = ({ placeholder }) => null // This is handled by the select placeholder

const SelectContent = ({ children }) => children

const SelectItem = ({ value, children, ...props }) => (
  <option value={value} {...props}>
    {children}
  </option>
)

// Custom hook-style API for more complex scenarios
const useSelect = (initialValue = "") => {
  const [value, setValue] = useState(initialValue)
  
  const onValueChange = (newValue) => {
    setValue(newValue)
  }
  
  return {
    value,
    onValueChange,
    setValue
  }
}

export {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  useSelect
}