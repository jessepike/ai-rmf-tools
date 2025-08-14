import Link from 'next/link';

export default function QuizPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            NIST AI Risk Management Framework Assessment
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Evaluate your organization&apos;s AI governance maturity and receive personalized recommendations based on the official NIST AI RMF standards.
          </p>

          <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Assessment Overview
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">What You&apos;ll Get:</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• AI governance maturity score (0-5 scale)</li>
                  <li>• NIST-aligned tier assessment</li>
                  <li>• Personalized recommendations</li>
                  <li>• Detailed PDF report via email</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Assessment Details:</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Focus: GOVERN function (25-30 questions)</li>
                  <li>• Time required: 10-15 minutes</li>
                  <li>• Target: SMBs and emerging AI organizations</li>
                  <li>• Framework: NIST AI RMF 1.0</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <p className="text-sm text-yellow-800">
              <strong>Disclaimer:</strong> This assessment is for educational purposes only and does not constitute legal, compliance, or professional advice. Results are based on self-reported information.
            </p>
          </div>

          <Link 
            href="/quiz/assess"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors"
          >
            Start Assessment
          </Link>
        </div>
      </div>
    </div>
  );
}
