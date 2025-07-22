"use client"

// Utility function for className merging
const cn = (...classes) => {
  return classes.filter(Boolean).join(' ')
}

const Slider = ({ 
  value = [5],
  onValueChange,
  onChange,
  min = 1,
  max = 10,
  step = 1,
  className,
  disabled,
  ...props 
}) => {
  const currentValue = Array.isArray(value) ? value[0] : value

  const handleChange = (e) => {
    const newValue = parseInt(e.target.value)
    if (onChange) onChange(e)
    if (onValueChange) onValueChange([newValue])
  }

  return (
    <div className={cn("relative w-full", className)}>
      <input
        type="range"
        value={currentValue}
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        className={cn(
          "w-full h-2 rounded-lg appearance-none cursor-pointer slider-track",
          "bg-onboarding-bg-secondary",
          "focus:outline-none focus:ring-2 focus:ring-onboarding-accent-end focus:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50"
        )}
        style={{
          background: `linear-gradient(to right, var(--onboarding-accent-start) 0%, var(--onboarding-accent-end) ${((currentValue - min) / (max - min)) * 100}%, var(--onboarding-bg-secondary) ${((currentValue - min) / (max - min)) * 100}%, var(--onboarding-bg-secondary) 100%)`
        }}
        {...props}
      />
      <style jsx>{`
        .slider-track::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: linear-gradient(to right, var(--onboarding-accent-start), var(--onboarding-accent-end));
          cursor: pointer;
          border: none;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        
        .slider-track::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: linear-gradient(to right, var(--onboarding-accent-start), var(--onboarding-accent-end));
          cursor: pointer;
          border: none;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        
        .slider-track::-webkit-slider-track {
          background: transparent;
        }
        
        .slider-track::-moz-range-track {
          background: transparent;
        }
      `}</style>
    </div>
  )
}

export { Slider }