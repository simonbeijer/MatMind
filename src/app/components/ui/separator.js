"use client"

// Utility function for className merging
const cn = (...classes) => {
  return classes.filter(Boolean).join(' ')
}

const Separator = ({ className, orientation = "horizontal", ...props }) => (
  <div
    className={cn(
      orientation === "horizontal" ? "h-px w-full" : "w-px h-full",
      "bg-onboarding-border-subtle",
      className
    )}
    {...props}
  />
)

export { Separator }