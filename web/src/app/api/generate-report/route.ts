// app/api/generate-report/route.ts - Generate PDF report and send via email
// Copy this entire file content to your app/api/generate-report/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getTierRecommendations } from '@/lib/scoring';

// Initialize Supabase client lazily
function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase environment variables are not configured');
  }
  
  return createClient(supabaseUrl, supabaseKey);
}

interface ScoreResult {
  governScore: number;
  maturityTier: string;
  insights: {
    strongestArea: string;
    priorityFocus: string;
  };
  subcategoryScores: Record<string, number>;
}

interface GenerateReportRequest {
  assessmentId: string;
  email: string;
  scoreResult: ScoreResult;
}

export async function POST(request: NextRequest) {
  try {
    const body: GenerateReportRequest = await request.json();
    
    // Validate required fields
    if (!body.assessmentId || !body.email || !body.scoreResult) {
      return NextResponse.json(
        { error: 'Assessment ID, email, and score result are required' },
        { status: 400 }
      );
    }
    
    // Generate PDF buffer
    const pdfBuffer = await generatePDFReport(body.scoreResult);
    
    // Send email with PDF attachment
    await sendEmailWithReport(body.email, body.scoreResult, pdfBuffer);
    
    // Update database to mark report as generated and sent
    const supabase = getSupabaseClient();
    const { error: updateError } = await supabase
      .from('govern_assessments')
      .update({
        report_generated: true,
        report_sent: true
      })
      .eq('id', body.assessmentId);
    
    if (updateError) {
      console.error('Error updating assessment status:', updateError);
      // Don't fail the request - email was sent successfully
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Report generated and sent successfully' 
    });
    
  } catch (error) {
    console.error('Error generating report:', error);
    return NextResponse.json(
      { error: 'Failed to generate report' },
      { status: 500 }
    );
  }
}

/**
 * Generate PDF report using react-pdf
 * For now, we'll create a simple HTML-to-PDF approach
 * Later you can switch to react-pdf for more complex layouts
 */
async function generatePDFReport(scoreResult: ScoreResult): Promise<Buffer> {
  // For MVP, we'll use a simple approach with Puppeteer
  // Install: npm install puppeteer
  
  try {
    // Dynamic import to avoid bundling issues
    const puppeteer = await import('puppeteer');
    
    const browser = await puppeteer.default.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'] // Required for Vercel
    });
    
    const page = await browser.newPage();
    
    // Generate HTML content
    const htmlContent = generateReportHTML(scoreResult);
    
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    
    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '1in',
        right: '1in',
        bottom: '1in',
        left: '1in'
      }
    });
    
    await browser.close();
    
    return Buffer.from(pdfBuffer);
    
  } catch (error) {
    console.error('Error generating PDF with Puppeteer:', error);
    
    // Fallback: Generate a simple text-based PDF
    return generateFallbackPDF(scoreResult);
  }
}

/**
 * Generate HTML content for the PDF report
 */
function generateReportHTML(scoreResult: ScoreResult): string {
  const recommendations = getTierRecommendations(scoreResult.maturityTier);
  const currentDate = new Date().toLocaleDateString();
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>AI Governance Assessment Report</title>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          text-align: center;
          border-bottom: 2px solid #0066cc;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        .logo {
          font-size: 24px;
          font-weight: bold;
          color: #0066cc;
          margin-bottom: 10px;
        }
        .score-section {
          background: #f8f9fa;
          padding: 25px;
          border-radius: 8px;
          margin: 20px 0;
          text-align: center;
        }
        .score-number {
          font-size: 48px;
          font-weight: bold;
          color: ${getTierColor(scoreResult.maturityTier)};
          margin: 10px 0;
        }
        .tier-name {
          font-size: 24px;
          font-weight: bold;
          color: ${getTierColor(scoreResult.maturityTier)};
          margin-bottom: 15px;
        }
        .insights {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin: 20px 0;
        }
        .insight-card {
          background: white;
          padding: 20px;
          border-left: 4px solid #0066cc;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .recommendations {
          margin-top: 30px;
        }
        .recommendation-item {
          background: #fff;
          padding: 15px;
          margin: 10px 0;
          border-left: 4px solid #28a745;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #ddd;
          font-size: 12px;
          color: #666;
          text-align: center;
        }
        .disclaimer {
          background: #fff3cd;
          padding: 15px;
          border: 1px solid #ffeaa7;
          border-radius: 4px;
          margin: 20px 0;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="logo">AI Risk Tools</div>
        <h1>NIST AI RMF GOVERN Assessment Report</h1>
        <p>Generated on ${currentDate}</p>
      </div>
      
      <div class="score-section">
        <div class="score-number">${scoreResult.governScore}/5.0</div>
        <div class="tier-name">${scoreResult.maturityTier}</div>
        <p>${getTierDescription(scoreResult.maturityTier)}</p>
      </div>
      
      <div class="insights">
        <div class="insight-card">
          <h3>✓ Strongest Area</h3>
          <p>${scoreResult.insights.strongestArea}</p>
        </div>
        <div class="insight-card">
          <h3>⚠ Priority Focus</h3>
          <p>${scoreResult.insights.priorityFocus}</p>
        </div>
      </div>
      
      <div class="recommendations">
        <h2>Recommended Next Steps</h2>
        ${recommendations.map((rec, index) => `
          <div class="recommendation-item">
            <strong>${index + 1}.</strong> ${rec}
          </div>
        `).join('')}
      </div>
      
      <div class="disclaimer">
        <strong>Disclaimer:</strong> This assessment is for educational purposes only and does not constitute 
        legal, compliance, or professional advice. Results are based on self-reported information and should 
        not be considered as certification or validation of your AI governance practices.
      </div>
      
      <div class="footer">
        <p>This report was generated by AI Risk Tools based on the NIST AI Risk Management Framework (AI RMF 1.0)</p>
        <p>For more information, visit https://ai-risk-tools.vercel.app</p>
      </div>
    </body>
    </html>
  `;
}

/**
 * Get color for maturity tier
 */
function getTierColor(tier: string): string {
  switch (tier) {
    case 'Emerging': return '#dc3545';
    case 'Developing': return '#fd7e14';
    case 'Maturing': return '#0066cc';
    case 'Optimized': return '#28a745';
    default: return '#6c757d';
  }
}

/**
 * Get description for maturity tier
 */
function getTierDescription(tier: string): string {
  switch (tier) {
    case 'Emerging':
      return 'Your organization is beginning its AI governance journey. Focus on establishing basic policies and accountability.';
    case 'Developing':
      return 'Basic AI governance practices are established. Next: formalize processes and expand documentation.';
    case 'Maturing':
      return 'Strong AI governance fundamentals are in place. Focus on metrics and continuous monitoring.';
    case 'Optimized':
      return 'Leading AI governance practices. Continue adapting to emerging risks and sharing best practices.';
    default:
      return 'Assessment completed.';
  }
}

/**
 * Fallback PDF generation using simple text format
 */
async function generateFallbackPDF(scoreResult: ScoreResult): Promise<Buffer> {
  // Simple text-based report as fallback
  const content = `
    AI GOVERNANCE ASSESSMENT REPORT
    Generated on ${new Date().toLocaleDateString()}
    
    OVERALL SCORE: ${scoreResult.governScore}/5.0
    MATURITY LEVEL: ${scoreResult.maturityTier}
    
    STRONGEST AREA: ${scoreResult.insights.strongestArea}
    PRIORITY FOCUS: ${scoreResult.insights.priorityFocus}
    
    RECOMMENDATIONS:
    ${getTierRecommendations(scoreResult.maturityTier).map((rec, i) => `${i + 1}. ${rec}`).join('\n')}
    
    This assessment is for educational purposes only.
  `;
  
  return Buffer.from(content, 'utf-8');
}

/**
 * Send email with PDF attachment via Resend
 */
async function sendEmailWithReport(
  email: string, 
  scoreResult: ScoreResult, 
  pdfBuffer: Buffer
) {
  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    throw new Error('RESEND_API_KEY environment variable is not set');
  }
  
  const emailBody = {
    from: 'AI Risk Tools <reports@airrisk.tools>', // Update with your verified domain
    to: [email],
    subject: `Your AI Governance Assessment Results - ${scoreResult.maturityTier} Level`,
    html: generateEmailHTML(scoreResult),
    attachments: [
      {
        filename: 'ai-governance-assessment-report.pdf',
        content: pdfBuffer.toString('base64'),
        contentType: 'application/pdf',
      },
    ],
  };
  
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(emailBody),
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to send email: ${error}`);
  }
  
  return response.json();
}

/**
 * Generate HTML content for email
 */
function generateEmailHTML(scoreResult: ScoreResult): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #0066cc; color: white; padding: 20px; text-align: center;">
        <h1>Your AI Governance Assessment Results</h1>
      </div>
      
      <div style="padding: 30px; background: #f8f9fa;">
        <div style="text-align: center; margin-bottom: 30px;">
          <div style="font-size: 36px; font-weight: bold; color: ${getTierColor(scoreResult.maturityTier)};">
            ${scoreResult.governScore}/5.0
          </div>
          <div style="font-size: 20px; font-weight: bold; color: ${getTierColor(scoreResult.maturityTier)};">
            ${scoreResult.maturityTier} Level
          </div>
        </div>
        
        <p>Thank you for completing the NIST AI RMF GOVERN assessment!</p>
        
        <p><strong>Your Results:</strong></p>
        <ul>
          <li><strong>Strongest Area:</strong> ${scoreResult.insights.strongestArea}</li>
          <li><strong>Priority Focus:</strong> ${scoreResult.insights.priorityFocus}</li>
        </ul>
        
        <p>Your detailed report is attached, including specific recommendations for improving your AI governance practices.</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://ai-risk-tools.vercel.app/quiz" 
             style="background: #0066cc; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">
            Take Another Assessment
          </a>
        </div>
        
        <p style="font-size: 14px; color: #666; margin-top: 30px;">
          This assessment is for educational purposes only and does not constitute professional advice.
        </p>
      </div>
    </div>
  `;
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
