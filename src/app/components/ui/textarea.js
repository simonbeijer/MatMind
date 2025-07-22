"use client"

// Utility function for className merging
const cn = (...classes) => {
  return classes.filter(Boolean).join(' ')
}

const Textarea = ({ 
  className,
  rows = 3,
  ...props 
}) => {
  return (
    <textarea
      rows={rows}
      className={cn(
        "flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm",
        "bg-onboarding-card-bg border-onboarding-border-input",
        "text-onboarding-text-primary",
        "placeholder:text-onboarding-text-subtle",
        "ring-offset-background",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-onboarding-accent-end focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "resize-none", // Prevent manual resizing for consistent design
        className
      )}
      {...props}
    />
  )
}

export { Textarea }