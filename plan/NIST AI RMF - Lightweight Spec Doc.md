# **AI Risk Assessment Quiz: Lightweight Specification**

This document outlines the core requirements for the initial AI Risk Assessment Quiz MVP, designed for rapid development and user feedback.

## **1\. Goal 🎯**

The primary goal of this quiz is to help **Small to Medium Businesses (SMBs), startups, and small/medium government agencies** quickly understand their initial maturity level against the **NIST AI RMF's "GOVERN" function** and identify immediate areas for improvement and action. It serves as a lead magnet and initial value proposition for the platform.

## **2\. Target Audience 👥**

* Mid-market organizations (SMBs, typically 50-1,000 employees)  
* Startups with emerging AI initiatives  
* Small to medium government agencies

These organizations often lack dedicated AI risk management expertise or budget for expensive enterprise solutions.

## **3\. Core User Flow 🚶‍♀️**

1. **Landing Page Access:** User lands on the specified `/quiz` URL (or clicks a prominent CTA on the homepage).  
2. **Quiz Introduction:** A brief, compelling introduction explains the quiz's purpose, its focus on the NIST AI RMF, and the value of completing it.  
3. **Question Progression:** Users answer questions one at a time (or in small batches), progressing through the quiz.  
4. **Instant Maturity Score:** Upon completion, the user immediately sees a basic, visualized "maturity score" (e.g., "Beginner," "Developing," "Advanced" or a numerical score) for their "GOVERN" function.  
5. **Report Opt-in:** A clear call to action prompts the user to enter their email address to receive a detailed PDF report with personalized recommendations.  
6. **Report Delivery:** The PDF report is emailed to the user.

## **4\. Content Scope & Logic 📝**

### **A. Focus Area**

* **NIST AI RMF "GOVERN" Function Only:** This MVP will exclusively cover the "GOVERN" function of the NIST AI RMF. This includes establishing policies, procedures, and accountability for AI systems.

### **B. Questions (25-30 total)**

* **Source:** Questions will be derived directly from the subcategories and desired outcomes within the NIST AI RMF "GOVERN" function.  
* **Format:** Primarily **Yes/No** or **Multiple Choice (single select)** to ensure quick, clear answers.  
* **Clarity:** Questions must be phrased in plain language, avoiding overly technical jargon, and relatable to SMB contexts.  
* **Example (based on NIST AI RMF Core: GOVERN.1 Accountability and Responsibility):**  
  * **Question:** "Has your organization clearly defined who is responsible for the oversight and performance of your AI systems?"  
    * **Options:** Yes / No / Partially  
  * **Question:** "Do you have formal policies or guidelines in place that address ethical considerations for AI development and deployment?"  
    * **Options:** Yes / No / In Progress

### **C. Scoring Logic**

* Each question will contribute to an overall "GOVERN" maturity score.  
* **Simple Scoring:** A basic point system (e.g., "Yes" \= 2 points, "Partially" \= 1 point, "No" \= 0 points) summed up.  
* **Tiered Results:** The total score will map to a maturity tier (e.g., 0-30% \= Emerging, 31-60% \= Developing, 61-80% \= Maturing, 81-100% \= Optimized).

### **D. Recommendations (for PDF Report)**

* **Conditional Logic:** Recommendations will be simple if-then statements based on specific "No" or low-score answers.  
* **Actionable:** Each recommendation should provide a clear, next-step action (e.g., "Develop an internal policy on AI data governance," "Assign a dedicated AI risk owner").  
* **NIST Alignment:** Recommendations should loosely align with suggested activities or outcomes within the NIST AI RMF "GOVERN" function.

## **5\. Technical Structure (High-Level) 💻**

* **Frontend:** HTML, Tailwind CSS, Vanilla JavaScript (or React if preferred for rapid component development).  
* **Quiz Data:** Questions, options, and scoring weights stored in a JavaScript array of objects within the frontend code.  
* **State Management:** Simple JavaScript objects/variables to manage the current question, user answers, and score.  
* **Progress Indicator:** A visual progress bar or "X of Y questions" display.  
* **Results Display:** A simple chart (Chart.js) for the instant maturity score visualization.  
* **Email Capture:** A basic HTML form with JavaScript to capture the email address.  
* **PDF Generation (Backend/Function):** A serverless function (or simple backend script) to generate the PDF report dynamically based on quiz results and email it. (Initial MVP might just send a generic PDF with basic recommendations, later becoming personalized.)

## **6\. Success Metrics (from MVP Plan) ✅**

* **Completion Rate:** Aim for \>70% quiz completion rate.  
* **Email Opt-in Rate:** Aim for \>50% email opt-in rate for the PDF report.  
* **User Feedback:** Gather qualitative feedback from initial user interviews (e.g., "Was the quiz easy to understand?", "Were the recommendations helpful?").

## **7\. AI Tools for Development 🤖**

* **LLMs (Claude/GPT-4):** For drafting quiz questions, defining recommendation logic, and generating initial text content for the landing page and report.  
* **AI Code Generators (v0.dev):** For quickly scaffolding UI components like multi-step forms, radio button groups, and result charts (e.g., Chart.js integration).  
* **AI-assisted IDEs (Cursor/Windsurf):** For accelerated coding of quiz logic, state management, and backend integration for email/PDF.

This specification provides a concise roadmap for your initial quiz development. Remember to stay lean and iterate based on real user feedback\!