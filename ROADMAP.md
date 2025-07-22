# MatMind - Jiu-Jitsu Development Platform

## ✅ Project Vision

I want to build a simple Jiu-Jitsu development platform that uses AI to generate highly personalized training, mindset, and recovery plans based on a user's background, goals, and constraints — similar to how AI tools generate tailored cover letters from resumes and job ads.

**Example Flow:** UI → Input → Implied Context → Chain of Thought → Result

---

## 🔧 Implementation Plan (Detailed Roadmap)

### 1. 🧠 Product Vision (PM)

**Goal:** Help grapplers — especially super heavyweights or lanky body types — improve through personalized, holistic plans (technical, mental, physical), or competition-specific guidance (e.g. how to win more matches).

**Core Features:**
* Role-based AI personas: Coach, Mental Coach, Physio, etc.
* Two-part input system:
    1. **Profile inputs** (belt rank, age, training frequency, body type) — ranked by relevance
    2. **Goal-based inputs** (e.g. increase win rate, improve off-mat habits, develop mindfulness in rolls)
        * Includes sliders for motivation level, effort capacity, focus areas, length on answer
* **LLM-generated plans:** Drills, rolling focus, mental tools, strength/recovery routines

### 2. 🎨 UX/UI Design

**User Flow:**
1. Multi-role by default (IMPORTANT)
2. Inputs profile info (stage 1). Training goals and expected outcome (stage 2)
3. Selects focus output (e.g. "Train smarter", "Compete better")
4. Gets a simple, clear, personalized plan with:
    * Mindset shifts
    * Technical drills
    * Off-mat conditioning
    * Strategic flows

### 3. 🧱 Architecture (Tech Lead)

**Tech Stack:**
* **Frontend:** Next.js + Tailwind
* **Backend:** Node.js + Prisma (PostgreSQL)
* **LLM API:** Gemini or OpenAI (with prompt chaining)
* **Auth:** NextAuth.js
* **Dev Tools:** Docker, Jest, Cypress

### 4. 🧑‍💻 Frontend Tasks

* Quick usage guide / onboarding
* Dynamic multi-step form (split by profile/goals)
* Clean plan viewer with toggleable sections (e.g. drills, mindset, recovery)

### 5. 🔩 Backend Tasks

* Minimal database needs for MVP
* (Optional later): Save user history, plan versions, training logs

### 6. 🤖 Prompt / ML Engineer

**Prompt Logic:**
* Inject ranked user context (e.g. belt > frequency > age)
* Tune prompt length/output style via sliders (short/long, practical/theoretical)
* Return structured JSON or readable rich text

**Output Goals:**
1. Short summary of user's intent
2. Clear sections with bullet points
3. Smart behavioral tips (on/off-mat)
4. Use formatting & emojis to improve attention & retention

**Simulated Expert Roles:**
* **Coach:** Technical planning
* **Mental Coach:** Triggers, competition prep
* **Physio:** Injury prevention, mobility
* **Sport Scientist:** Gym, recovery, energy systems
* **Friend:** Positive and fair

### 7. 🧪 QA Tasks (Optional MVP)

* Test form flows, plan generation
* Check output relevance and tone
* Validate prompt output structure

---

## 🛠️ Next.js Template Fit

Use your fullstack Next.js template to:
* Scaffold form pages (Next.js + Tailwind)

---

## 🧭 Next Steps (MVP Focused)

1. **Build basic multi-step input form**
2. **Connect LLM API (example: Gemini) with role-based prompt chains**
3. **Format and display structured training plan (simple, readable)**

---

## 📋 Development Phases

### Phase 1: MVP Foundation
- [ ] Set up Next.js project structure
- [ ] Create multi-step onboarding form
- [ ] Implement basic LLM integration
- [ ] Design simple plan display interface

### Phase 2: Enhanced Features
- [ ] Add user authentication
- [ ] Implement plan saving/history
- [ ] Add more AI personas
- [ ] Enhance UI/UX based on feedback

### Phase 3: Advanced Features
- [ ] Training logs integration
- [ ] Progress tracking
- [ ] Community features
- [ ] Mobile app consideration

---

## 🎯 Success Metrics

* User completes onboarding flow successfully
* Generated plans are relevant and actionable
* Users return to generate multiple plans
* Positive feedback on plan quality and personalization