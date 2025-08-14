import Link from 'next/link';

export default function QuizPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
              <span className="text-sm font-medium text-white/90">Based on NIST AI RMF 1.0</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent mb-6 leading-tight">
              AI Risk Management Assessment
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              Evaluate your organization&apos;s AI governance maturity and receive personalized recommendations based on the official NIST AI RMF standards.
            </p>
          </div>

          {/* Main Content Card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 mb-8 border border-white/20">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-8 text-center">
              Assessment Overview
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">What You&apos;ll Get</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    AI governance maturity score (0-5 scale)
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    NIST-aligned tier assessment
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Personalized recommendations
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Detailed PDF report via email
                  </li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Assessment Details</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                    Focus: GOVERN function (25-30 questions)
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                    Time required: 10-15 minutes
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                    Target: SMBs and emerging AI organizations
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                    Framework: NIST AI RMF 1.0
                  </li>
                </ul>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <div className="text-2xl font-bold text-gray-900">NIST</div>
                <div className="text-sm text-gray-600">Aligned</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <div className="text-2xl font-bold text-gray-900">FREE</div>
                <div className="text-sm text-gray-600">Assessment</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <div className="text-2xl font-bold text-gray-900">10min</div>
                <div className="text-sm text-gray-600">Quick</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <div className="text-2xl font-bold text-gray-900">SMB</div>
                <div className="text-sm text-gray-600">Focused</div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center">
              <Link 
                href="/quiz/assess"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-lg rounded-2xl transition-all duration-200 transform hover:scale-105 shadow-xl"
              >
                Start Assessment
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-amber-50/90 backdrop-blur-sm border border-amber-200 rounded-2xl p-6 text-center">
            <p className="text-sm text-amber-800">
              <strong>Disclaimer:</strong> This assessment is for educational purposes only and does not constitute legal, compliance, or professional advice. Results are based on self-reported information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}