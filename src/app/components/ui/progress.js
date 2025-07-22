"use client"

// Utility function for className merging
const cn = (...classes) => {
  return classes.filter(Boolean).join(' ')
}

const Progress = ({ 
  value = 0, 
  className,
  ...props 
}) => {
  // Ensure value is between 0 and 100
  const normalizedValue = Math.min(100, Math.max(0, value))

  return (
    <div
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full",
        "bg-onboarding-progress-bg",
        className
      )}
      {...props}
    >
      <div
        className="h-full w-full flex-1 bg-gradient-to-r from-onboarding-accent-start to-onboarding-accent-end transition-all duration-300 ease-out"
        style={{ 
          transform: `translateX(-${100 - normalizedValue}%)` 
        }}
      />
    </div>
  )
}

export { Progress }