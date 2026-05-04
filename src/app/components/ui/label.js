"use client"

// Utility function for className merging
const cn = (...classes) => {
  return classes.filter(Boolean).join(' ')
}

const Label = ({ 
  className,
  children,
  htmlFor,
  ...props 
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "block font-mono uppercase tracking-[0.18em] text-[11px] leading-none",
        "text-onboarding-text-muted",
        "peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
      {...props}
    >
      {children}
    </label>
  )
}

export { Label }