# MatMind Style Guide

## 🚨 CRITICAL RULES

- ✅ **ALWAYS use CSS variables**: `bg-onboarding-bg-primary`, `text-onboarding-text-primary`, etc.
- ❌ **NEVER use hardcoded colors**: No `bg-[#0B0C10]`, `text-[#C5C6C7]`, etc.
- ✅ **Use .js file extensions** (not .jsx)
- ✅ **Follow existing component patterns**
- ❌ **NO theme toggle buttons** - automatic switching only

---

## 🎨 CSS Variable System

MatMind uses **onboarding CSS variables** that automatically switch between light and dark themes based on the user's browser preference (`prefers-color-scheme`).

### Available CSS Variables

```css
/* Backgrounds */
bg-onboarding-bg-primary          /* Auto switches: #FFFFFF → #0B0C10 */
bg-onboarding-bg-secondary        /* Auto switches: #F8F9FA → #1F2833 */
bg-onboarding-card-bg            /* Auto switches: rgba(248, 249, 250, 0.6) → rgba(31, 40, 51, 0.6) */

/* Text Colors */
text-onboarding-text-primary     /* Auto switches: #1F2937 → #C5C6C7 */
text-onboarding-text-muted       /* Auto switches: rgba(31, 41, 55, 0.7) → rgba(197, 198, 199, 0.7) */
text-onboarding-text-subtle      /* Auto switches: rgba(31, 41, 55, 0.5) → rgba(197, 198, 199, 0.5) */

/* Borders */
border-onboarding-border-subtle  /* Auto switches: rgba(31, 41, 55, 0.1) → rgba(197, 198, 199, 0.1) */
border-onboarding-border-input   /* Auto switches: rgba(31, 41, 55, 0.2) → rgba(197, 198, 199, 0.2) */

/* Accents (same in both themes) */
from-onboarding-accent-start to-onboarding-accent-end  /* Gradient: #45A29E to #66FCF1 */
text-onboarding-accent-end       /* Accent text: #66FCF1 */
focus:ring-onboarding-accent-end /* Focus rings: #66FCF1 */

/* Interactive */
hover:bg-onboarding-hover-bg     /* Auto switches: rgba(31, 41, 55, 0.1) → rgba(197, 198, 199, 0.1) */
bg-onboarding-progress-bg        /* Auto switches: rgba(31, 41, 55, 0.2) → rgba(197, 198, 199, 0.2) */
```

---

## 🧱 Component Patterns

### Layout Components
```js
// Main page wrapper
className="min-h-screen bg-gradient-to-br from-onboarding-bg-primary via-onboarding-bg-secondary to-onboarding-bg-primary"

// Card containers
className="bg-onboarding-card-bg border border-onboarding-border-subtle rounded-lg backdrop-blur-sm p-6"

// Headers/footers
className="border-b border-onboarding-border-subtle bg-onboarding-bg-primary/80 backdrop-blur-sm"
```

### Text Components
```js
// Primary headings
className="text-4xl font-bold text-onboarding-text-primary mb-4"

// Body text
className="text-lg text-onboarding-text-muted"

// Labels
className="text-sm font-medium text-onboarding-text-primary"

// Descriptions
className="text-sm text-onboarding-text-muted"
```

### Button Components
```js
// Primary button
className="bg-gradient-to-r from-onboarding-accent-start to-onboarding-accent-end hover:from-onboarding-accent-start/80 hover:to-onboarding-accent-end/80 text-onboarding-bg-primary px-4 py-2 rounded-md font-medium"

// Secondary button  
className="border border-onboarding-border-input text-onboarding-text-primary hover:bg-onboarding-hover-bg bg-transparent px-4 py-2 rounded-md font-medium"
```

### Form Components
```js
// Input fields
className="bg-onboarding-card-bg border border-onboarding-border-input text-onboarding-text-primary placeholder:text-onboarding-text-subtle px-3 py-2 rounded-md focus:ring-2 focus:ring-onboarding-accent-end"

// Textareas
className="bg-onboarding-card-bg border border-onboarding-border-input text-onboarding-text-primary placeholder:text-onboarding-text-subtle px-3 py-2 rounded-md min-h-[80px] focus:ring-2 focus:ring-onboarding-accent-end"

// Checkboxes
className="border border-onboarding-border-input data-[state=checked]:bg-onboarding-accent-end data-[state=checked]:border-onboarding-accent-end"
```

---

## 📝 Complete Page Example

```js
export default function MyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-onboarding-bg-primary via-onboarding-bg-secondary to-onboarding-bg-primary">
      {/* Header */}
      <header className="border-b border-onboarding-border-subtle bg-onboarding-bg-primary/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-onboarding-text-primary">MatMind</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="bg-onboarding-card-bg border border-onboarding-border-subtle rounded-lg backdrop-blur-sm p-6">
          <h2 className="text-2xl font-bold text-onboarding-text-primary mb-4">Page Title</h2>
          <p className="text-onboarding-text-muted mb-6">Page description text</p>
          
          <button className="bg-gradient-to-r from-onboarding-accent-start to-onboarding-accent-end hover:from-onboarding-accent-start/80 hover:to-onboarding-accent-end/80 text-onboarding-bg-primary px-4 py-2 rounded-md font-medium">
            Action Button
          </button>
        </div>
      </main>
    </div>
  )
}
```

---

## ✅ Quick Reference

### Always Use:
- `bg-onboarding-bg-primary` for main backgrounds
- `text-onboarding-text-primary` for primary text
- `text-onboarding-text-muted` for secondary text  
- `border-onboarding-border-subtle` for subtle borders
- `bg-onboarding-card-bg` for card backgrounds
- Gradient buttons: `from-onboarding-accent-start to-onboarding-accent-end`

### Never Use:
- Hardcoded colors like `bg-[#0B0C10]` or `text-[#C5C6C7]`
- Theme toggle components
- Manual dark: classes (automatic switching handles this)

### The Goal:
Every page should look identical to your onboarding flow and automatically adapt to light/dark browser preferences without any manual theme switching.

---

## 🔧 Common Issues & Troubleshooting

### White Input Background Issue

**Problem:** Form inputs appear white when typing.

**Cause:** Using `bg-onboarding-card-bg` (transparent background) can cause visibility issues with input text.

**Solution:** Use solid backgrounds for input fields:

```js
// ❌ Problematic - transparent background
className="bg-onboarding-card-bg text-onboarding-text-primary"

// ✅ Fixed - solid background  
className="bg-onboarding-bg-secondary text-onboarding-text-primary"
```

**Complete Fixed Input Styling:**
```js
className="w-full px-4 py-3 border rounded-lg bg-onboarding-bg-secondary text-onboarding-text-primary placeholder:text-onboarding-text-subtle transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-onboarding-accent-end border-onboarding-border-input"
```

### Other Form Issues
- Always test inputs in both light and dark modes
- Ensure sufficient contrast between background and text colors
- Use solid backgrounds for interactive elements like inputs and buttons