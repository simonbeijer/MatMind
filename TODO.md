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

## Phase 1: Simple GEMINI Integration (1-2 hours)

**Project Approach: Simple Test Implementation**
- This is a simple test project, not production-ready
- No complex error handling, testing, or deployment needed
- Focus: Basic functionality to test GEMINI API integration

### Simple AI Flow Example:
**Input:** User profile (age: 28, blue belt, super heavyweight, tall/lanky, goal: "Improve guard game")
**Prompt:** "You're a BJJ expert. Give advice with role headers and safety disclaimer."
**Output:** Simple formatted response with 🥋 Coach, 🧠 Mental Coach, 🏥 Physio sections

### Tasks:
- [x] Install package: `npm install @google/generative-ai`
- [x] Verify GEMINI_API_KEY in .env file  
- [ ] Replace `/src/app/lib/ai-service.js` with simple GEMINI function
- [ ] Test with existing UI (should work exactly the same)

### Implementation Notes:
- Use basic prompt template with user profile injection
- Keep existing UI structure (6 coach format)
- Add simple fallback to mock data if API fails
- No complex prompt engineering needed

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

## Project Clarifications

**Simplified Requirements (No complex features needed):**
- ❌ No comprehensive testing strategy needed
- ❌ No production deployment planning required  
- ❌ No complex error handling or monitoring
- ❌ No user analytics or feedback collection
- ❌ No extensive customization features in Phase 2
- ❌ No BJJ expert content validation needed

**What We Actually Need:**
- ✅ Basic GEMINI API integration that works
- ✅ Simple prompt → AI response → display flow
- ✅ Fallback to mock data if API fails
- ✅ Keep existing UI working exactly as is

**Timeline Reality:**
- Week 1: Get basic GEMINI working (this is the only priority)
- Phases 2+ are "later" with no timeline pressure

## Notes
- Keep it ultra-simple
- Single function, one prompt, basic response
- No overengineering
- This is a test project, not production software