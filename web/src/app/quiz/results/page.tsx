'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { formatMaturityTier, generateShareMessage } from '@/lib/api-client';

export default function ResultsPage() {
  const searchParams = useSearchParams();
  
  // Get results from URL parameters
  const score = parseFloat(searchParams.get('score') || '0');
  const tier = searchParams.get('tier') || 'Emerging';
  const strongestArea = searchParams.get('strongestArea') || '';
  const priorityFocus = searchParams.get('priorityFocus') || '';
  const email = searchParams.get('email') || '';
  const assessmentId = searchParams.get('assessmentId') || '';

  const tierInfo = formatMaturityTier(tier);
  const shareMessage = generateShareMessage({
    assessmentId,
    governScore: score,
    maturityTier: tier as any,
    insights: { strongestArea, priorityFocus },
    reportStatus: 'processing'
  });

  // Calculate score percentage for visual display
  const scorePercentage = (score / 5) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
              <span className="text-sm font-medium text-white/90">NIST AI RMF Assessment Results</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent mb-4">
              Your AI Governance Maturity
            </h1>
          </div>

          {/* Main Results Card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 mb-8 border border-white/20">
            
            {/* Score Display */}
            <div className="text-center mb-12">
              <div className="relative inline-block">
                <div className="w-48 h-48 mx-auto relative">
                  {/* Background circle */}
                  <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                      fill="none"
                    />
                    {/* Progress circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke={tierInfo.color}
                      strokeWidth="8"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={`${scorePercentage * 2.51} ${251 - scorePercentage * 2.51}`}
                      className="transition-all duration-1000 ease-out"
                      style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' }}
                    />
                  </svg>
                  {/* Score text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold text-gray-900">{score.toFixed(1)}</span>
                    <span className="text-lg text-gray-600">/ 5.0</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <span 
                    className="inline-block px-6 py-2 rounded-full text-lg font-bold text-white shadow-lg"
                    style={{ backgroundColor: tierInfo.color }}
                  >
                    {tierInfo.name} Level
                  </span>
                  <p className="text-gray-600 mt-2 max-w-md mx-auto">
                    {tierInfo.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Insights Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Strongest Area</h3>
                </div>
                <p className="text-gray-700 font-medium">{strongestArea}</p>
                <p className="text-gray-600 text-sm mt-2">Your organization excels in this area of AI governance.</p>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L5.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Priority Focus</h3>
                </div>
                <p className="text-gray-700 font-medium">{priorityFocus}</p>
                <p className="text-gray-600 text-sm mt-2">Consider prioritizing improvements in this area.</p>
              </div>
            </div>

            {/* Email Confirmation */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-blue-800 mb-2">Detailed Report Coming Soon</h3>
              <p className="text-blue-700">
                A comprehensive PDF report with personalized recommendations has been sent to <strong>{email}</strong>
              </p>
              <p className="text-blue-600 text-sm mt-2">
                Check your inbox (and spam folder) for your detailed AI governance assessment report.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(shareMessage);
                  alert('Results copied to clipboard!');
                }}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Share Results
              </button>
              
              <Link 
                href="/quiz"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg text-center"
              >
                Take Another Assessment
              </Link>
              
              <Link 
                href="/"
                className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg text-center"
              >
                Back to Home
              </Link>
            </div>
          </div>

          {/* Assessment Details */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
            <p className="text-sm text-gray-600">
              Assessment ID: <span className="font-mono text-gray-800">{assessmentId}</span>
            </p>
            <p className="text-xs text-gray-500 mt-2">
              This assessment is based on the NIST AI Risk Management Framework (AI RMF 1.0) and is for educational purposes only.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}