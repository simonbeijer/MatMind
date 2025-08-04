# MatMind MVP TODO

## Phase 0: UI & Layout Improvements (Following Project Guides) (3 hours)

**Documentation References:**
- ✅ PRD-SIMPLE.md - Keep 5-minute onboarding flow, support 6 AI coaches
- ✅ STYLE_GUIDE.md - Use CSS variables, no hardcoded colors
- ✅ VALIDATION_GUIDE.md - Maintain security standards

### Small Increment 1: Collapsible "Additional Focus" (30 mins)
- [ ] File: `src/app/components/onboarding/goalsStep.js`
- [ ] Add collapsible section for defense inputs using existing pattern
- [ ] Use CSS variables: `text-onboarding-text-primary`, `bg-onboarding-hover-bg`
- [ ] Maintain existing validation (no changes to form logic)
- [ ] Test: Ensure inputs still validate properly when hidden/shown

### Small Increment 2: Collapsible "Advanced Options" (30 mins)
- [ ] File: `src/app/components/onboarding/focusStep.js`
- [ ] Add collapsible section for output style & detail level
- [ ] Use existing `expandedCategories` state pattern
- [ ] Maintain proper validation for both inputs
- [ ] Test: Verify form submission works with collapsed sections

### Small Increment 3: Focus Areas Conditional Display (45 mins)
- [ ] File: `src/app/components/onboarding/focusStep.js`
- [ ] Add logic to only show selected focus areas
- [ ] Follow array validation rules (max 10 items, min 1)
- [ ] Maintain existing checkbox functionality
- [ ] Test: Ensure proper state management and validation

### Small Increment 4: Full-Width Persona Tabs (30 mins)
- [ ] File: `src/app/(auth)/plan/page.js`
- [ ] Update TabsTrigger layout to full-width grid
- [ ] Use CSS variables for consistent theming
- [ ] Keep existing persona icons and functionality
- [ ] Test: Verify responsive behavior and accessibility

### Small Increment 5: Consistent Width Strategy (45 mins)
- [ ] File: `src/app/(auth)/plan/page.js` - Change to `max-w-3xl`
- [ ] File: `src/app/components/header.js` - Add inner container `max-w-3xl`
- [ ] Keep onboarding `max-w-2xl` (already perfect)
- [ ] Test: Verify alignment across all pages and responsive behavior

## Phase 1: Minimal GEMINI Integration (1-2 hours)
- [ ] Install package: `npm install @google/generative-ai`
- [ ] Verify GEMINI_API_KEY in .env file
- [ ] Replace `/src/app/lib/ai-service.js` with minimal GEMINI function
- [ ] Test with existing UI (should work exactly the same)

## Phase 2: Fix Customize Plan (Later)
- [ ] Connect onboarding data to plan generation
- [ ] Add customization UI elements
- [ ] Make focus areas actually work

## Current Status
- ✅ UI/UX Complete (85% done)
- ✅ Authentication System
- ✅ Database Setup
- 🔴 AI Integration (Missing)
- 🔴 Plan Customization (Missing)

## Implementation Principles
- **Small pieces**: Each increment is 30-45 minutes max
- **Test each step**: Verify functionality before moving to next
- **Follow guides**: Use CSS variables, maintain validation, keep security
- **No breaking changes**: Maintain existing form flow and data handling
- **PRD compliance**: Keep 5-minute onboarding target, support all 6 AI coaches

## Success Criteria
- All existing validation continues to work
- No hardcoded colors introduced
- 3-step onboarding flow remains under 5 minutes
- Header aligns with page content width
- All changes pass accessibility and responsiveness tests

## Notes
- Keep it ultra-simple
- Single function, one prompt, basic response
- No overengineering