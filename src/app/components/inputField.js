"use client"
import { useState } from "react";

export default function InputField({
  type,
  name,
  value,
  onChange,
  placeholder,
  error,
  label,
  validate,
  sanitize,
  maxLength,
  minLength,
  required = false,
  ...props
}) {
  const [touched, setTouched] = useState(false);
  const [localError, setLocalError] = useState('');

  const handleChange = (inputValue) => {
    // Sanitize input if sanitizer provided
    const sanitizedValue = sanitize ? sanitize(inputValue) : inputValue;
    
    // Length validation
    if (maxLength && sanitizedValue.length > maxLength) {
      setLocalError(`Maximum ${maxLength} characters allowed`);
      return;
    }

    if (minLength && sanitizedValue.length > 0 && sanitizedValue.length < minLength) {
      setLocalError(`Minimum ${minLength} characters required`);
    } else {
      // Custom validation
      if (validate) {
        const validationResult = validate(sanitizedValue);
        if (!validationResult.isValid) {
          setLocalError(validationResult.error);
        } else {
          setLocalError('');
        }
      } else {
        setLocalError('');
      }
    }

    onChange(sanitizedValue);
  };

  const handleBlur = () => {
    setTouched(true);
    
    // Run final validation on blur
    if (required && (!value || value.trim() === '')) {
      setLocalError('This field is required');
    }
  };

  const displayError = (error || localError) && (touched || error);

  const { validate: _, sanitize: __, ...inputProps } = props;

  return (
    <div className="mb-5">
      <label htmlFor={name} className="block font-mono uppercase tracking-[0.18em] text-[11px] text-onboarding-text-muted mb-2">
        {label} {required && <span className="text-cinnabar">*</span>}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={handleBlur}
        placeholder={placeholder}
        maxLength={maxLength}
        aria-invalid={displayError ? 'true' : 'false'}
        aria-describedby={displayError ? `${name}-error` : undefined}
        className={`w-full px-4 py-3 border bg-onboarding-bg-secondary text-onboarding-text-primary placeholder:text-onboarding-text-subtle transition-colors duration-150 focus:outline-none focus:border-onboarding-text-primary [&:-webkit-autofill]:!bg-onboarding-bg-secondary [&:-webkit-autofill]:!text-onboarding-text-primary [&:-webkit-autofill:focus]:!bg-onboarding-bg-secondary ${
          displayError ? "border-cinnabar" : "border-onboarding-border-input"
        }`}
        {...inputProps}
      />
      {displayError && (
        <div id={`${name}-error`} className="mt-1.5 font-mono uppercase tracking-[0.1em] text-[11px] text-cinnabar" role="alert">
          {error || localError}
        </div>
      )}
    </div>
  );
}