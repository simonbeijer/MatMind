"use client"

import { createContext, useContext, useState } from "react"

// Utility function for className merging
const cn = (...classes) => {
  return classes.filter(Boolean).join(' ')
}

const TabsContext = createContext()

const Tabs = ({ defaultValue, value, onValueChange, children, className, ...props }) => {
  const [internalValue, setInternalValue] = useState(defaultValue || "")
  
  const currentValue = value !== undefined ? value : internalValue
  const handleValueChange = (newValue) => {
    if (value === undefined) {
      setInternalValue(newValue)
    }
    if (onValueChange) {
      onValueChange(newValue)
    }
  }

  return (
    <TabsContext.Provider value={{ value: currentValue, onValueChange: handleValueChange }}>
      <div className={cn("w-full", className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

const TabsList = ({ className, children, ...props }) => (
  <div
    className={cn(
      "inline-flex items-center justify-center",
      "border-b border-onboarding-border-subtle",
      className
    )}
    {...props}
  >
    {children}
  </div>
)

const TabsTrigger = ({ value, className, children, ...props }) => {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error("TabsTrigger must be used within Tabs")
  }
  
  const isActive = context.value === value
  
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap px-4 py-3 font-mono uppercase tracking-[0.15em] text-[11px]",
        "border-b-2 -mb-px transition-colors",
        "disabled:pointer-events-none disabled:opacity-50",
        isActive
          ? "border-cinnabar text-onboarding-text-primary"
          : "border-transparent text-onboarding-text-muted hover:text-onboarding-text-primary",
        className
      )}
      onClick={() => context.onValueChange(value)}
      {...props}
    >
      {children}
    </button>
  )
}

const TabsContent = ({ value, className, children, ...props }) => {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error("TabsContent must be used within Tabs")
  }
  
  if (context.value !== value) {
    return null
  }
  
  return (
    <div
      className={cn(
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }