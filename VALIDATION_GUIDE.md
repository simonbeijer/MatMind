# Input Validation Guide

This guide establishes validation standards for all input components to prevent security vulnerabilities and ensure data integrity.

## Table of Contents
- [Core Principles](#core-principles)
- [Input Type Standards](#input-type-standards)
- [Component Requirements](#component-requirements)
- [Security Checklist](#security-checklist)
- [Common Pitfalls](#common-pitfalls)
- [Testing Scenarios](#testing-scenarios)
- [Code Examples](#code-examples)

## Core Principles

### 1. Never Trust User Input
- Always validate on both client and server side
- Client-side validation is for UX, server-side for security
- Sanitize all input before processing or storage

### 2. Fail Securely
- Default to restrictive validation
- Provide clear error messages without exposing system details
- Log validation failures for security monitoring

### 3. Defense in Depth
- Multiple layers of validation (HTML attributes + JS validation + sanitization)
- Input length limits and boundary checks
- Type coercion protection

## Input Type Standards

### Numeric Inputs

#### Age Fields
```jsx
// ✅ GOOD: Proper numeric validation
<input
  type="text"
  inputMode="numeric"
  pattern="[0-9]*"
  value={age}
  onChange={(e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    const numValue = parseInt(value);
    if (value === '' || (numValue >= 13 && numValue <= 120)) {
      setAge(value);
    }
  }}
/>

// ❌ BAD: No validation
<input
  type="number"
  value={age}
  onChange={(e) => setAge(e.target.value)}
/>
```

**Age Validation Rules:**
- Range: 13-120 years
- No decimals, negative numbers, or non-numeric characters
- Empty values allowed during input

#### Training Frequency
```jsx
// ✅ GOOD: Range-limited numeric input
const value = e.target.value.replace(/[^0-9]/g, '');
const numValue = parseInt(value);
if (value === '' || (numValue >= 1 && numValue <= 14)) {
  setTrainingFrequency(value);
}
```

**Training Frequency Rules:**
- Range: 1-14 times per week
- Integer values only
- Reasonable upper bound to prevent abuse

### Text Inputs

#### Email Validation
```jsx
// ✅ GOOD: Comprehensive email validation
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const validateEmail = (email) => {
  return email.length <= 254 && emailRegex.test(email);
};
```

**Email Rules:**
- Maximum length: 254 characters (RFC 5321)
- Comprehensive regex pattern
- Trim whitespace before validation

#### Password Validation
```jsx
// ✅ GOOD: Password requirements
const validatePassword = (password) => {
  return {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    maxLength: password.length <= 128
  };
};
```

**Password Rules:**
- Minimum 8 characters, maximum 128
- At least one uppercase, lowercase, number, and special character
- No common patterns or dictionary words (implement server-side)

#### Text Areas
```jsx
// ✅ GOOD: Limited and sanitized text input
<textarea
  value={experience}
  onChange={(e) => {
    const value = e.target.value;
    if (value.length <= 2000) {
      // Basic HTML tag stripping for XSS prevention
      const sanitized = value.replace(/<[^>]*>/g, '');
      setExperience(sanitized);
    }
  }}
  maxLength={2000}
/>
```

**Text Area Rules:**
- Maximum length: 2000 characters
- Strip HTML tags to prevent XSS
- Preserve line breaks and basic formatting

### Array Inputs (Checkboxes, Multi-select)

#### Selection Limits
```jsx
// ✅ GOOD: Limited selections
const handleChallengeChange = (challenge, checked) => {
  if (checked && currentChallenges.length >= 10) {
    setError('Maximum 10 challenges can be selected');
    return;
  }
  
  const updatedChallenges = checked
    ? [...currentChallenges, challenge]
    : currentChallenges.filter((c) => c !== challenge);

  setCurrentChallenges(updatedChallenges);
};
```

**Array Selection Rules:**
- Maximum selections: 10 items
- Minimum selections: 1 item (for required fields)
- Validate array length before updates

## Component Requirements

### Base Input Component Standards

All input components must support:

1. **Validation Props**
   - `validate`: Function to validate input
   - `sanitize`: Function to sanitize input
   - `maxLength`: Maximum character limit
   - `minLength`: Minimum character limit

2. **Error Handling**
   - `error`: Error message to display
   - `touched`: Whether field has been interacted with
   - `showError`: Boolean to control error display

3. **Accessibility**
   - Proper ARIA labels
   - Error announcements for screen readers
   - Focus management for error states

### Enhanced InputField Component
```jsx
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

    // Custom validation
    if (validate) {
      const validationResult = validate(sanitizedValue);
      if (!validationResult.isValid) {
        setLocalError(validationResult.error);
      } else {
        setLocalError('');
      }
    }

    onChange(sanitizedValue);
  };

  const handleBlur = () => {
    setTouched(true);
  };

  const displayError = (error || localError) && (touched || error);

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-onboarding-text-primary mb-2">
        {label} {required && '*'}
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
        className={`w-full px-4 py-3 border rounded-lg bg-onboarding-card-bg text-onboarding-text-primary placeholder:text-onboarding-text-subtle transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-onboarding-accent-end ${
          displayError ? "border-red-500" : "border-onboarding-border-input"
        }`}
        {...props}
      />
      {displayError && (
        <div id={`${name}-error`} className="mt-1 text-sm text-red-500" role="alert">
          {error || localError}
        </div>
      )}
    </div>
  );
}
```

## Security Checklist

### ✅ Input Security Requirements

- [ ] **XSS Prevention**: Strip/escape HTML tags in text inputs
- [ ] **SQL Injection Prevention**: Use parameterized queries (server-side)
- [ ] **Length Limits**: All inputs have reasonable maximum lengths
- [ ] **Type Validation**: Ensure inputs match expected data types
- [ ] **Range Validation**: Numeric inputs have min/max bounds
- [ ] **Pattern Validation**: Use regex patterns for structured data
- [ ] **Sanitization**: Clean input before processing
- [ ] **Error Messages**: Don't expose system internals
- [ ] **Rate Limiting**: Prevent form spam/abuse
- [ ] **CSRF Protection**: Use CSRF tokens for forms

### ✅ Component Security Checklist

- [ ] **Input Sanitization**: Remove/escape dangerous characters
- [ ] **Output Encoding**: Properly encode when displaying user data
- [ ] **Boundary Checks**: Validate array lengths and object sizes
- [ ] **Memory Limits**: Prevent excessive memory usage from large inputs
- [ ] **File Uploads**: Validate file types, sizes, and scan for malware
- [ ] **Error Handling**: Log security events, don't expose stack traces

## Common Pitfalls

### 1. ❌ Relying Only on HTML Validation
```jsx
// BAD: Can be bypassed by disabling JavaScript
<input type="number" min="1" max="100" />
```

### 2. ❌ No Input Sanitization
```jsx
// BAD: Vulnerable to XSS
<div dangerouslySetInnerHTML={{__html: userInput}} />
```

### 3. ❌ Weak Email Validation
```jsx
// BAD: Overly simple, misses edge cases
const isEmail = email.includes('@');
```

### 4. ❌ No Length Limits
```jsx
// BAD: Could cause memory issues or DoS
<textarea onChange={(e) => setValue(e.target.value)} />
```

### 5. ❌ Client-Side Only Validation
```jsx
// BAD: Must also validate on server
if (isValidOnClient(data)) {
  submitToServer(data); // Server trusts client validation
}
```

## Testing Scenarios

### Edge Case Test Matrix

| Input Type | Test Cases |
|------------|-----------|
| **Age** | -1, 0, 200, 25.5, 'abc', '', null |
| **Email** | 'test@', '@test.com', 'a'.repeat(300), '<script>' |
| **Password** | '', 'a', 'password123', 'P@ssw0rd!'.repeat(20) |
| **Text Area** | '', 'a'.repeat(5000), '<script>alert(1)</script>' |
| **Arrays** | [], [1,2,3...100], ['<script>'] |

### Automated Testing Example
```javascript
describe('Age Input Validation', () => {
  test('rejects negative numbers', () => {
    const result = validateAge('-5');
    expect(result.isValid).toBe(false);
  });

  test('rejects numbers over 120', () => {
    const result = validateAge('150');
    expect(result.isValid).toBe(false);
  });

  test('accepts valid age range', () => {
    const result = validateAge('25');
    expect(result.isValid).toBe(true);
  });

  test('rejects non-numeric input', () => {
    const result = validateAge('abc');
    expect(result.isValid).toBe(false);
  });
});
```

## Implementation Priority

1. **High Priority** (Security Critical)
   - Input sanitization for XSS prevention
   - Numeric input validation
   - Email/password validation

2. **Medium Priority** (Data Integrity)
   - Text length limits
   - Array boundary checks
   - Form validation feedback

3. **Low Priority** (UX Improvements)
   - Real-time validation
   - Progressive validation messages
   - Accessibility enhancements

## Monitoring & Maintenance

### Validation Metrics to Track
- Invalid input attempt frequency
- Common validation failures
- Error message effectiveness
- User drop-off at validation points

### Regular Security Reviews
- Quarterly validation rule audits
- Penetration testing for input fields
- Security library updates
- Error logging analysis

---

**Last Updated:** January 2025  
**Version:** 1.0  
**Next Review:** April 2025

Remember: This guide should evolve with new threats and requirements. Always validate on both client and server side, and never trust user input.