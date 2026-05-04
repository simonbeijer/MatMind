"use client"

const cn = (...classes) => classes.filter(Boolean).join(' ')

const Progress = ({ value = 0, className, ...props }) => {
  const normalizedValue = Math.min(100, Math.max(0, value))

  return (
    <div
      className={cn(
        "relative h-[2px] w-full overflow-hidden bg-onboarding-progress-bg",
        className
      )}
      {...props}
    >
      <div
        className="h-full bg-cinnabar transition-all duration-300 ease-out"
        style={{ width: `${normalizedValue}%` }}
      />
    </div>
  )
}

export { Progress }
