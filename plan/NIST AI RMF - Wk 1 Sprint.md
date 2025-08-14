# Sprint 1: Two-Week Development Plan

## Overview
Sprint 1 covers the first two weeks of development, delivering a fully functional NIST AI RMF assessment quiz covering all four functions (GOVERN, MAP, MEASURE, MANAGE) with email capture and basic reporting.

## Week 1: Foundation & GOVERN Quiz
**Goal:** Ship a working GOVERN function quiz with email capture and basic PDF report

### 📅 Day 1-2: Foundation & Planning

#### Project Setup & Review
- [ ] **Deep dive into quiz-spec-markdown:** Fully understand question scope, scoring logic, and desired output
- [ ] **Review ai-rmf-mvp-plan.md:** Re-familiarize yourself with Phase 0-1 goals
- [ ] **Prepare ai-risk-tools monorepo:** Create web/ and functions/ directories in existing repo
- [ ] **Update main README.md:** Add high-level project overview and link to docs/
- [ ] **Set up Next.js with React:** 
  ```bash
  npx create-next-app@latest web --typescript --tailwind --app
  cd web && npm install @radix-ui/themes chart.js react-chartjs-2
  ```

#### Content Generation (AI-Assisted)
- [ ] **Draft GOVERN Quiz Questions:** Use Claude/GPT-4 to generate 25-30 questions for GOVERN function
- [ ] **Define scoring weights:** Mark questions as Critical (3x), Important (2x), or Good-to-have (1x)
- [ ] **Outline Basic Recommendations:** Draft actionable recommendations for common low scores
- [ ] **Create legal disclaimer text:** "Educational purposes only, not legal advice"

### 📅 Day 3-4: Landing Page & Quiz Frontend

#### Landing Page Development
- [ ] **Create /app/page.tsx:** Homepage with value proposition and CTA to quiz
- [ ] **Create /app/quiz/page.tsx:** Quiz landing with introduction and "Start Assessment" button
- [ ] **Add legal disclaimer:** Include disclaimer component before quiz start
- [ ] **Implement email capture form:** Simple form component for report delivery
- [ ] **Set up Tailwind + shadcn/ui:** Install and configure for consistent UI components

#### Quiz Structure Development
- [ ] **Build quiz components:**
  - `QuizContainer.tsx` - Main quiz logic and state management
  - `Question.tsx` - Individual question display
  - `ProgressBar.tsx` - Visual progress indicator
  - `Results.tsx` - Maturity score display with Chart.js
- [ ] **Implement quiz flow:**
  - Question navigation (next/previous)
  - Answer state management (useState)
  - Progress tracking
  - Score calculation with weights

### 📅 Day 5: Backend & PDF Generation

#### Backend Setup
- [ ] **Create API routes:**
  - `/api/submit-quiz` - Process quiz results
  - `/api/generate-report` - Create PDF report
  - `/api/send-email` - Email delivery via Resend
- [ ] **Set up Resend:** Get API key and configure email service
- [ ] **Implement basic PDF generation:** 
  - Use react-pdf or puppeteer for dynamic PDFs
  - Include score visualization and recommendations
  - Add company branding and disclaimer

### 📅 Day 6-7: Deployment & Initial Validation

#### Deployment
- [ ] **Deploy to Vercel:**
  ```bash
  npm install -g vercel
  vercel --prod
  ```
- [ ] **Configure environment variables:**
  - RESEND_API_KEY
  - NEXT_PUBLIC_ANALYTICS_ID
- [ ] **Set up domain:** Configure airrisk.tools or subdomain
- [ ] **Test mobile responsiveness:** Ensure quiz works on all devices
- [ ] **Set up error tracking:** Configure Sentry free tier
- [ ] **Implement analytics:** Add Plausible/SimpleAnalytics tracking

#### User Interview Preparation
- [ ] **Schedule 5 interviews:** Reach out to SMB/startup contacts
- [ ] **Prepare interview script:** (See User Interview Questions below)
- [ ] **Create feedback form:** Simple Google Form for async feedback

### Week 1 Revenue Targets
- **Revenue:** $0 (Pure validation phase)
- **Email Conversion:** >50% of quiz completers
- **Quiz Completion:** >70% of starters
- **User Interviews:** 5 completed

---

## Week 2: Expand to All Functions & Account System
**Goal:** Add MAP, MEASURE, MANAGE functions and basic user accounts with dashboard

### 📅 Day 8-9: Expand Quiz Content

#### Content Development
- [ ] **Generate MAP questions:** 20-25 questions using AI assistance
- [ ] **Generate MEASURE questions:** 20-25 questions using AI assistance  
- [ ] **Generate MANAGE questions:** 20-25 questions using AI assistance
- [ ] **Define weights for all questions:** Apply Critical/Important/Good-to-have classifications
- [ ] **Create comprehensive recommendations:** Expand recommendation logic for all functions
- [ ] **Update PDF template:** Include all four function scores and tailored recommendations

#### Quiz Enhancement
- [ ] **Refactor quiz for sections:** Allow users to complete functions separately
- [ ] **Add section navigation:** Jump between GOVERN, MAP, MEASURE, MANAGE
- [ ] **Implement comprehensive scoring:** Calculate individual function scores + overall maturity
- [ ] **Create detailed results page:** Show radar chart or multiple progress bars

### 📅 Day 10-11: User Accounts & Dashboard

#### Authentication Setup
- [ ] **Configure Supabase:**
  ```bash
  npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
  ```
- [ ] **Create auth pages:**
  - `/app/auth/login/page.tsx`
  - `/app/auth/signup/page.tsx`
  - `/app/auth/forgot-password/page.tsx`
- [ ] **Implement social auth:** Google and Microsoft for enterprise users
- [ ] **Add protected routes:** Dashboard only accessible when logged in

#### Dashboard Development
- [ ] **Create dashboard layout:** `/app/dashboard/layout.tsx`
- [ ] **Build dashboard components:**
  - `MaturityOverview.tsx` - Overall scores across all functions
  - `AssessmentHistory.tsx` - List of past assessments
  - `ProgressTracker.tsx` - Improvement over time
  - `NextSteps.tsx` - Prioritized recommendations
- [ ] **Set up database schema:** User profiles, assessments, results

### 📅 Day 12: Monetization Test

#### Payment Integration
- [ ] **Add "Pro Report" upsell:** Enhanced PDF for $49 one-time
- [ ] **Create pricing page:** `/app/pricing/page.tsx`
- [ ] **Set up Stripe:** Basic checkout for one-time payments
- [ ] **Implement feature flags:** Control access to pro features
- [ ] **Add upgrade prompts:** Strategic placement in user flow

### 📅 Day 13-14: Testing & Iteration

#### Quality Assurance
- [ ] **Complete full user flow testing:** From landing to PDF delivery
- [ ] **Fix critical bugs:** Based on testing and early user feedback
- [ ] **Performance optimization:** Lighthouse score >90
- [ ] **SEO setup:** Meta tags, sitemap, robots.txt
- [ ] **Documentation updates:** Update README with setup instructions

#### User Validation
- [ ] **Conduct Week 2 interviews:** 5 additional users
- [ ] **Analyze Week 1 metrics:** Review analytics and identify drop-off points
- [ ] **Implement quick fixes:** Based on user feedback
- [ ] **Plan Week 3 priorities:** Based on learnings

### Week 2 Revenue Targets
- **Revenue:** $500-1000 (10-20 Pro Reports at $49)
- **Registered Users:** 50+
- **Paid Conversion:** 5-10% of registered users
- **User Interviews:** 10 total completed

---

## User Interview Questions (15-20 min)

### Opening Context
"Thank you for taking time to test our AI Risk Assessment tool. This is designed to help organizations like yours understand their AI governance maturity based on the NIST AI RMF framework."

### Core Questions
1. **Current State:** "What's your organization's current biggest AI-related concern or challenge?"
2. **Quiz Clarity:** "How clear were the quiz questions? Were there any that confused you?"
3. **Value Perception:** "Is the maturity score meaningful to you? Does it match your self-assessment?"
4. **Report Value:** "What specific information in the report would be most valuable to your organization?"
5. **Pricing Sensitivity:** "What would make you pay for a detailed report or ongoing access?"
6. **Feature Priorities:** "What other features would be immediately valuable to you?"
7. **Competitive Landscape:** "What other tools or methods are you currently using for AI risk management?"
8. **Recommendation Quality:** "How actionable are the recommendations provided?"

### Closing
"Is there anything else about AI risk management that we haven't covered that's important to you?"

---

## Technical Decisions & Rationale

### Stack Choices
- **Next.js 14+ with App Router:** Modern React framework with excellent DX, chosen for long-term scalability despite 1-day setup cost
- **TypeScript:** Type safety reduces bugs when working with AI assistance
- **Tailwind CSS + shadcn/ui:** Rapid UI development with consistent design system
- **Supabase:** All-in-one backend (auth, database, storage) with generous free tier
- **Vercel:** Seamless Next.js deployment with excellent free tier
- **Resend:** Simple email API, free for 100 emails/day

### Development Tools
- **Cursor/Windsurf:** AI-assisted IDE for 80% code generation
- **Claude/GPT-4:** Content generation and complex logic
- **v0.dev:** UI component generation
- **GitHub Copilot:** Inline code suggestions

---

## Risk Mitigation

### Technical Risks
- **Next.js complexity:** Mitigated by using AI assistance and established patterns
- **PDF generation issues:** Fallback to pre-generated template if dynamic generation fails
- **Email deliverability:** Monitor Resend metrics, have backup provider ready

### Business Risks
- **Low engagement:** Daily monitoring and rapid iteration based on metrics
- **Legal concerns:** Clear disclaimers from Day 1, no medical/financial advice
- **Scope creep:** Strict adherence to two-week timeline, defer nice-to-haves

---

## Success Criteria for Sprint 1

### Must Have (Week 1)
- ✅ Working GOVERN quiz deployed to production
- ✅ Email capture with >50% conversion
- ✅ Basic PDF report generation
- ✅ 5 user interviews completed
- ✅ Analytics tracking implemented

### Should Have (Week 2)
- ✅ All four NIST functions in quiz
- ✅ User authentication working
- ✅ Basic dashboard with assessment history
- ✅ Payment integration tested
- ✅ 10 total user interviews
- ✅ $500+ in revenue

### Could Have (If Time Permits)
- ⭕ A/B testing framework
- ⭕ Advanced visualizations
- ⭕ Email drip campaign setup
- ⭕ Blog/content section

---

## Daily Standup Template

### Morning Check-in (5 min)
- Yesterday's completion
- Today's priority
- Any blockers?

### Evening Review (5 min)
- What shipped today?
- Metrics review
- Tomorrow's plan

---

## Next Sprint Preview (Week 3-4)
- Smart roadmap generation based on assessment results
- Task management for implementation
- Document templates library
- Team collaboration features (if traction warrants)