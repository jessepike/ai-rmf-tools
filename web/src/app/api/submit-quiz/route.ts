// app/api/submit-quiz/route.ts - Process quiz submission and calculate score
// Copy this entire file content to your app/api/submit-quiz/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { calculateGOVERNScore, QuizResponse } from '@/lib/scoring';

// Initialize Supabase client lazily
function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase environment variables are not configured');
  }
  
  return createClient(supabaseUrl, supabaseKey);
}

interface SubmitQuizRequest {
  email: string;
  organizationName?: string;
  responses: QuizResponse[];
  completedAt: string;
}

interface ScoreResult {
  governScore: number;
  maturityTier: "Emerging" | "Developing" | "Maturing" | "Optimized";
  insights: {
    strongestArea: string;
    priorityFocus: string;
  };
  subcategoryScores: Record<string, number>;
}

interface SubmitQuizResponse {
  assessmentId: string;
  governScore: number;
  maturityTier: "Emerging" | "Developing" | "Maturing" | "Optimized";
  insights: {
    strongestArea: string;
    priorityFocus: string;
  };
  reportStatus: "processing" | "sent";
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: SubmitQuizRequest = await request.json();
    
    // Validate required fields
    if (!body.email || !body.responses || body.responses.length === 0) {
      return NextResponse.json(
        { error: 'Email and quiz responses are required' },
        { status: 400 }
      );
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }
    
    // Calculate score using scoring engine
    const scoreResult = calculateGOVERNScore(body.responses);
    
    // Save assessment to database
    const supabase = getSupabaseClient();
    const { data: assessment, error: dbError } = await supabase
      .from('govern_assessments')
      .insert({
        email: body.email,
        organization_name: body.organizationName || null,
        responses: body.responses,
        govern_score: scoreResult.governScore,
        maturity_tier: scoreResult.maturityTier,
        completed_at: body.completedAt,
        quiz_duration_seconds: null, // Could be calculated from frontend
        user_agent: request.headers.get('user-agent'),
        ip_address: getClientIP(request)
      })
      .select()
      .single();
    
    if (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { error: 'Failed to save assessment' },
        { status: 500 }
      );
    }
    
    // Trigger PDF generation and email sending (async)
    // Note: In production, you might want to use a queue system for this
    triggerReportGeneration(assessment.id, body.email, scoreResult);
    
    // Return immediate response
    const response: SubmitQuizResponse = {
      assessmentId: assessment.id,
      governScore: scoreResult.governScore,
      maturityTier: scoreResult.maturityTier,
      insights: scoreResult.insights,
      reportStatus: "processing"
    };
    
    return NextResponse.json(response);
    
  } catch (error) {
    console.error('Error processing quiz submission:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Extract client IP address from request
 */
function getClientIP(request: NextRequest): string {
  // Check for forwarded IP in various headers (Vercel, Cloudflare, etc.)
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const cfConnectingIP = request.headers.get('cf-connecting-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  if (realIP) {
    return realIP;
  }
  if (cfConnectingIP) {
    return cfConnectingIP;
  }
  
  return 'unknown';
}

/**
 * Trigger PDF generation and email sending (async)
 * In production, this should use a queue system like Vercel Functions or Redis Queue
 */
async function triggerReportGeneration(
  assessmentId: string, 
  email: string, 
  scoreResult: ScoreResult
) {
  try {
    // Make internal API call to generate and send report
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : 'http://localhost:3000';
    
    await fetch(`${baseUrl}/api/generate-report`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        assessmentId,
        email,
        scoreResult
      })
    });
  } catch (error) {
    console.error('Error triggering report generation:', error);
    // Don't throw error - report generation failure shouldn't block quiz submission
  }
}

// Export for other HTTP methods if needed
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
