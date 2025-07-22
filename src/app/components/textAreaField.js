"use client";
import React, { useState } from "react";

export default function TextAreaField({ 
  name, 
  value, 
  onChange, 
  placeholder, 
  error, 
  label,
  validate,
  sanitize,
  maxLength = 2000,
  minLength,
  required = false,
  rows = 4,
  ...props
}) {
  const [touched, setTouched] = useState(false);
  const [localError, setLocalError] = useState('');

  // Basic HTML tag stripping for XSS prevention
  const defaultSanitize = (input) => {
    return input.replace(/<[^>]*>/g, '');
  };

  const handleChange = (inputValue) => {
    // Apply sanitization (default or custom)
    const sanitizedValue = sanitize ? sanitize(inputValue) : defaultSanitize(inputValue);
    
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
  const charCount = value ? value.length : 0;

  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="block text-sm font-medium text-onboarding-text-primary mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={handleBlur}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        aria-invalid={displayError ? 'true' : 'false'}
        aria-describedby={displayError ? `${name}-error` : undefined}
        className={`bg-onboarding-card-bg border text-onboarding-text-primary placeholder:text-onboarding-text-subtle px-3 py-2 rounded-md min-h-[80px] focus:ring-2 focus:ring-onboarding-accent-end w-full resize-none ${
          displayError ? "border-red-500" : "border-onboarding-border-input"
        }`}
        {...props}
      />
      <div className="flex justify-between items-center mt-1">
        <div>
          {displayError && (
            <div id={`${name}-error`} className="text-sm text-red-500" role="alert">
              {error || localError}
            </div>
          )}
        </div>
        <div className="text-xs text-onboarding-text-subtle">
          {charCount}/{maxLength}
        </div>
      </div>
    </div>
  );
}
