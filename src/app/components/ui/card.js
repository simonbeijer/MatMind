"use client"

// Utility function for className merging
const cn = (...classes) => {
  return classes.filter(Boolean).join(' ')
}

const Card = ({ className, children, ...props }) => (
  <div
    className={cn(
      "rounded-lg border backdrop-blur-sm shadow-lg",
      "bg-onboarding-card-bg border-onboarding-border-subtle",
      className
    )}
    {...props}
  >
    {children}
  </div>
)

const CardHeader = ({ className, children, ...props }) => (
  <div
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  >
    {children}
  </div>
)

const CardTitle = ({ className, children, ...props }) => (
  <h3
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      "text-onboarding-text-primary",
      className
    )}
    {...props}
  >
    {children}
  </h3>
)

const CardDescription = ({ className, children, ...props }) => (
  <p
    className={cn(
      "text-sm text-onboarding-text-muted",
      className
    )}
    {...props}
  >
    {children}
  </p>
)

const CardContent = ({ className, children, ...props }) => (
  <div 
    className={cn("p-6 pt-0", className)} 
    {...props}
  >
    {children}
  </div>
)

const CardFooter = ({ className, children, ...props }) => (
  <div
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  >
    {children}
  </div>
)

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }