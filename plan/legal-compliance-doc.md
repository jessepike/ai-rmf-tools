# Legal Disclaimers & Compliance Documentation

## Core Disclaimer Text

### Pre-Quiz Disclaimer
```
This AI Risk Assessment Tool is provided for educational and informational purposes only. The assessment, scores, and recommendations:

• Do NOT constitute legal, regulatory, or professional advice
• Should NOT be used as the sole basis for compliance decisions  
• Are based on the NIST AI Risk Management Framework guidelines
• May not address all applicable laws or regulations in your jurisdiction
• Should be reviewed with qualified legal and compliance professionals

By proceeding, you acknowledge that [Your Company Name] is not liable for any decisions made based on this assessment.

[✓] I understand and agree to these terms
```

### Email Collection Compliance
```
By providing your email address, you agree to:
• Receive your assessment report via email
• Receive occasional updates about AI risk management (optional)
• Our Privacy Policy and Terms of Service

We respect your privacy:
• Your data is encrypted and secure
• We never sell or share your information
• You can unsubscribe at any time
• GDPR/CCPA compliant

[✓] Send me the assessment report
[✓] Keep me updated on AI risk management news (optional)
```

### Report Footer Disclaimer
```
IMPORTANT NOTICE: This report is provided for informational purposes only and does not constitute legal, compliance, or professional advice. The recommendations are based on your self-reported responses and the NIST AI Risk Management Framework. Your organization should consult with qualified professionals before implementing any risk management strategies. [Your Company Name] assumes no liability for actions taken based on this report.
```

## Privacy Policy Key Points

### Data Collection
- Quiz responses (anonymous unless account created)
- Email address (for report delivery)
- Basic analytics (page views, completion rates)
- No sensitive personal information collected

### Data Usage
- Generate personalized assessment reports
- Improve our services and recommendations
- Send requested communications
- Aggregate anonymous insights

### Data Protection
- Encrypted in transit (HTTPS)
- Encrypted at rest (Supabase)
- Access limited to authorized personnel
- Retained for 12 months (anonymous) or until account deletion

### User Rights (GDPR/CCPA)
- Access your data
- Correct inaccuracies
- Delete your account and data
- Export your data
- Opt-out of communications

## Terms of Service Key Points

### Service Description
- Educational AI risk assessment tool
- Based on NIST AI RMF framework
- Not a substitute for professional advice

### User Responsibilities
- Provide accurate information
- Use for lawful purposes only
- Maintain confidentiality of account credentials
- Not reverse engineer or misuse the service

### Limitations of Liability
- Service provided "as is"
- No warranties of accuracy or completeness
- Not liable for indirect or consequential damages
- Maximum liability limited to fees paid (if any)

### Intellectual Property
- Quiz content and reports are proprietary
- Users retain rights to their input data
- NIST AI RMF is public domain

## Implementation Checklist

### Week 1 Requirements
- [ ] Add disclaimer modal before quiz start
- [ ] Include disclaimer in email footer
- [ ] Add disclaimer to PDF report footer
- [ ] Create /privacy and /terms pages
- [ ] Add cookie consent banner (if using analytics)

### Week 2 Requirements
- [ ] Update disclaimers for paid features
- [ ] Add payment terms to Terms of Service
- [ ] Include refund policy
- [ ] Add data deletion in user settings

## Regulatory Considerations

### GDPR Compliance (EU)
- Explicit consent for data processing
- Clear purpose limitation
- Data minimization principle
- Right to erasure implementation
- Data portability option

### CCPA Compliance (California)
- Notice at collection
- Opt-out of sale (we don't sell)
- Access and deletion rights
- Non-discrimination

### Industry-Specific Notes
- **Healthcare:** Not HIPAA-covered unless processing PHI
- **Financial:** Not providing investment advice
- **Government:** May need additional security controls

## Risk Mitigation Strategies

### Reduce Liability Exposure
1. Clear, prominent disclaimers at every decision point
2. Regular review by legal counsel (quarterly)
3. Insurance: Professional liability/E&O coverage
4. Document all disclaimer acceptances with timestamps

### Data Security Measures
1. Use established providers (Supabase, Vercel)
2. Implement rate limiting on APIs
3. Regular security updates
4. No storage of sensitive data (SSN, financial info)

### Content Accuracy
1. Cite NIST sources explicitly
2. Date-stamp all recommendations
3. Version control for quiz questions
4. Regular review cycle (monthly)

## Email Templates

### Welcome Email
```
Subject: Your AI Risk Assessment Report is Ready

Hi [Name],

Thank you for completing the AI Risk Assessment. Your personalized report is attached.

Your GOVERN Function Maturity: [Score]%

This report provides:
• Detailed analysis of your responses
• Prioritized recommendations
• Resources for improvement

Remember: This assessment is for educational purposes only and should not replace professional advice.

Questions? Reply to this email.

Best regards,
[Your Company]

P.S. This email was sent to [email]. Unsubscribe at any time.
```

### Upgrade Prompt Email
```
Subject: Unlock Your Complete AI Risk Analysis

You've taken the first step in understanding your AI risks. Ready for deeper insights?

Our Pro Report includes:
✓ Analysis of all 4 NIST functions
✓ Industry-specific recommendations  
✓ Implementation roadmap
✓ Compliance mapping

Upgrade for $49 (one-time)
[Upgrade Now Button]

This offer expires in 48 hours.

Note: This is an educational tool. Consult professionals for specific compliance needs.
```

## Quick Reference Card

### Every Page Needs
- Link to Privacy Policy
- Link to Terms of Service
- Copyright notice

### Every Data Collection Needs
- Purpose explanation
- Consent checkbox
- Link to privacy policy

### Every Report/Output Needs
- Disclaimer footer
- Date generated
- Version number

### Every Payment Needs
- Clear description
- Refund policy
- Terms acceptance

---

*Last Updated: [Current Date]*
*Review Schedule: Monthly*
*Legal Review Due: Before public launch*