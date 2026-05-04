"use client"

// Utility function for className merging  
const cn = (...classes) => {
  return classes.filter(Boolean).join(' ')
}

const Badge = ({ className, children, ...props }) => (
  <span
    className={cn(
      "inline-flex items-center px-2 py-0.5 font-mono uppercase tracking-[0.15em] text-[10px]",
      "border",
      className
    )}
    {...props}
  >
    {children}
  </span>
)

export { Badge }