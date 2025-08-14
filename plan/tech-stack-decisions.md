# Technical Stack Decisions & Migration Paths

## Core Stack Decisions

### Frontend: Next.js 14+ with App Router
**Decision:** Use Next.js with React from Day 1
**Rationale:**
- One-time 1-day setup cost vs. ongoing benefits
- AI coding tools have excellent Next.js support
- Built-in optimizations (image, font, script loading)
- Server components reduce client bundle size
- App Router provides better layouts and data fetching

**Migration Path:**
```
Week 1-4: Basic Next.js app
Month 2-3: Add incremental static regeneration
Month 4-6: Implement edge functions for personalization
Month 7+: Consider adding tRPC for type-safe APIs
```

### Styling: Tailwind CSS + shadcn/ui
**Decision:** Tailwind for utility-first CSS, shadcn for components
**Rationale:**
- Rapid prototyping with utility classes
- shadcn provides production-ready components
- No runtime overhead (compiled CSS)
- Excellent AI tool support for generating Tailwind classes

**Cost:** Free (open source)

### Backend: Supabase
**Decision:** All-in-one backend platform
**Rationale:**
- Authentication, database, storage in one
- Generous free tier (up to 500MB database, 10K auth users)
- Row-level security for multi-tenant data
- Real-time subscriptions for future features

**Cost Progression:**
```
0-500 users: Free tier ($0/month)
500-5000 users: Pro tier ($25/month)
5000+ users: Team tier ($599/month) or self-host
```

**Migration Path:**
- Month 6+: Evaluate self-hosting if >$200/month
- Alternative: Migrate to separate services (Auth0 + PostgreSQL)

### Hosting: Vercel
**Decision:** Vercel for Next.js hosting
**Rationale:**
- Zero-config Next.js deployment
- Excellent free tier (100GB bandwidth)
- Automatic preview deployments
- Built-in analytics and speed insights

**Cost Progression:**
```
0-1000 users: Free tier
1000-10K users: Pro tier ($20/month)
10K+ users: Enterprise (custom pricing)
```

### Email: Resend
**Decision:** Modern email API
**Rationale:**
- Simple API, great DX
- 100 emails/day free
- React email templates
- Excellent deliverability

**Cost Progression:**
```
0-100 emails/day: Free
100-5000 emails/month: $20/month
5000+ emails: $0.00034 per email
```

**Migration Path:**
- If deliverability issues: SendGrid or Postmark
- If cost issues at scale: Amazon SES

## AI Development Tools

### IDE: Cursor
**Decision:** Cursor as primary IDE
**Cost:** $20/month
**Rationale:**
- Purpose-built for AI-assisted coding
- Better context awareness than Copilot
- Integrated chat and code generation

**Backup:** Windsurf if Cursor has issues

### UI Generation: v0.dev
**Decision:** Use for component scaffolding
**Cost:** $20/month
**Usage Strategy:**
```javascript
// Generate initial component with v0
// Refine with Cursor
// Test and iterate
```

### Content Generation: Claude 3 Opus
**Decision:** Primary LLM for content
**Cost:** $20/month Claude Pro
**Use Cases:**
- Quiz question generation
- Report content creation
- Documentation writing
- Email templates

## Data Architecture

### Database Schema Evolution

#### Week 1: Minimal Schema
```sql
-- Just email collection
emails (
  id, email, quiz_results_json, created_at
)
```

#### Week 2: User Accounts
```sql
users (
  id, email, created_at, subscription_tier
)
assessments (
  id, user_id, results_json, created_at
)
```

#### Month 2: Full Schema
```sql
users, assessments, questions, responses,
templates, organizations, team_members
```

### API Architecture

#### Week 1-2: Simple API Routes
```typescript
/api/submit-quiz
/api/generate-report
/api/send-email
```

#### Month 2-3: Add tRPC
```typescript
// Type-safe API layer
trpc.assessment.create()
trpc.report.generate()
trpc.user.updateProfile()
```

#### Month 4+: GraphQL (if needed)
- Only if complex data requirements
- Consider Hasura on top of Supabase

## Monitoring & Analytics

### Week 1: Basics
- **Analytics:** Plausible ($9/month)
- **Error Tracking:** Sentry (free tier)
- **Uptime:** Better Uptime (free tier)

### Month 2-3: Enhanced
- **Analytics:** Upgrade to PostHog (product analytics)
- **APM:** Add Datadog or New Relic
- **User Sessions:** LogRocket or FullStory

### Month 6+: Full Observability
- Custom dashboards
- Alerting pipelines
- Performance budgets

## Security Considerations

### Week 1 Security Checklist
- [ ] HTTPS only (Vercel automatic)
- [ ] Environment variables for secrets
- [ ] Input validation on all forms
- [ ] SQL injection prevention (Supabase prepared statements)
- [ ] Rate limiting on API routes

### Week 2 Additions
- [ ] Authentication with JWT
- [ ] Row-level security in Supabase
- [ ] CSRF protection
- [ ] Content Security Policy headers

### Month 2+ Enhancements
- [ ] Web Application Firewall (Cloudflare)
- [ ] DDoS protection
- [ ] Regular security audits
- [ ] Penetration testing

## Cost Projections

### Month 1 (Building)
```
Cursor IDE:        $20
Claude Pro:        $20
v0.dev:           $20
Domain:           $15
Total:            $75
```

### Month 3 (Early Users)
```
Previous:         $75
Supabase Pro:     $25
Resend:           $20
Plausible:        $9
Total:            $129
```

### Month 6 (Growth)
```
Previous:         $129
Vercel Pro:       $20
PostHog:          $0 (open source)
Total:            $149
```

### Month 12 (Scale)
```
All services:     ~$500-800/month
(Should have $15K+ MRR to justify)
```

## Performance Targets

### Week 1 Targets
- Lighthouse Score: >80
- Time to Interactive: <3s
- Quiz Load Time: <2s

### Month 3 Targets
- Lighthouse Score: >95
- Core Web Vitals: All green
- API Response: <200ms p95

### Month 6 Targets
- Global CDN deployment
- <100ms response worldwide
- 99.9% uptime SLA

## Deployment Pipeline

### Week 1: Simple
```yaml
1. Push to main branch
2. Vercel auto-deploys
3. Manual testing
```

### Week 2: Automated
```yaml
1. Push to feature branch
2. Preview deployment
3. Run tests (Jest + Playwright)
4. Merge to main
5. Production deployment
```

### Month 2+: Full CI/CD
```yaml
1. Pre-commit hooks (Husky)
2. Type checking (TypeScript)
3. Linting (ESLint)
4. Unit tests (Jest)
5. E2E tests (Playwright)
6. Security scanning
7. Performance budgets
8. Staged rollout
```

## Scaling Triggers

### When to Migrate Off Free Tiers
- **Supabase:** >500 active users or >500MB data
- **Vercel:** >100GB bandwidth/month
- **Resend:** >100 emails/day
- **Sentry:** >5K errors/month

### When to Add Services
- **CDN:** >1000 daily users
- **Queue System:** >50 PDF generations/hour
- **Cache Layer:** >100 requests/second
- **Search:** >1000 documents/templates

### When to Hire/Outsource
- **DevOps:** >$500/month infrastructure
- **Security:** Handling payment data
- **Support:** >20 tickets/day
- **Development:** >$10K MRR

## Disaster Recovery

### Week 1: Basic
- GitHub for code backup
- Local database exports

### Week 2: Automated
- Daily Supabase backups
- Environment variable backup

### Month 2+: Professional
- Automated backup testing
- Multi-region backups
- Documented recovery procedures
- Regular disaster recovery drills

## Technical Debt Management

### Acceptable Debt (Week 1-4)
- Inline styles occasionally
- Some prop drilling
- Basic error handling
- Simple state management

### Must Fix (Month 2-3)
- Proper error boundaries
- State management (Zustand/Jotai)
- Component testing
- API versioning

### Long-term Refactoring
- Microservices (if needed)
- Event-driven architecture
- Full test coverage
- Performance optimization

---

*Decision Log:*
- [Date]: Chose Next.js over vanilla React for better SEO and performance
- [Date]: Selected Supabase over Firebase for PostgreSQL and better pricing
- [Date]: Picked Resend over SendGrid for simpler API and React email support