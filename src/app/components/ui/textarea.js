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
        "flex min-h-[88px] w-full border px-3 py-2.5 text-sm",
        "bg-onboarding-bg-secondary border-onboarding-border-input",
        "text-onboarding-text-primary",
        "placeholder:text-onboarding-text-subtle",
        "focus-visible:outline-none focus-visible:border-onboarding-text-primary",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "resize-none",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }