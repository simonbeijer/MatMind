"use client"

// Utility function for className merging  
const cn = (...classes) => {
  return classes.filter(Boolean).join(' ')
}

const Badge = ({ className, children, ...props }) => (
  <span
    className={cn(
      "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
      "border",
      className
    )}
    {...props}
  >
    {children}
  </span>
)

export { Badge }