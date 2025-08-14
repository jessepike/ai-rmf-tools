'use client';

import { useState } from 'react';
import Link from 'next/link';

// Temporary sample questions for testing
const sampleQuestions = [
  {
    id: 'gov_1_1',
    function: 'GOVERN' as const,
    subcategory: 'GOVERN.1.1',
    weight: 'critical' as const,
    text: 'Does your organization have documented AI governance policies?',
    options: [
      { value: 2, text: 'Yes, comprehensive and current policies' },
      { value: 1, text: 'Yes, but policies need updating' },
      { value: 0, text: 'No formal policies exist' }
    ]
  },
  {
    id: 'gov_2_1',
    function: 'GOVERN' as const,
    subcategory: 'GOVERN.2.1',
    weight: 'critical' as const,
    text: 'Are AI risk management roles and responsibilities clearly defined?',
    options: [
      { value: 2, text: 'Yes, with documented responsibilities' },
      { value: 1, text: 'Yes, but informally defined' },
      { value: 0, text: 'No defined roles exist' }
    ]
  },
  {
    id: 'gov_2_3',
    function: 'GOVERN' as const,
    subcategory: 'GOVERN.2.3',
    weight: 'critical' as const,
    text: 'Does executive leadership take responsibility for AI system risks?',
    options: [
      { value: 2, text: 'Yes, with formal accountability' },
      { value: 1, text: 'Yes, but informal oversight' },
      { value: 0, text: 'No executive involvement' }
    ]
  }
];

export default function AssessPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<Record<string, number>>({});
  const [isComplete, setIsComplete] = useState(false);

  const handleAnswer = (questionId: string, value: number) => {
    setResponses(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const currentQ = sampleQuestions[currentQuestion];
  const selectedValue = responses[currentQ?.id];
  const canProceed = selectedValue !== undefined;

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="max-w-2xl mx-auto p-8 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl text-center border border-white/20">
          <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mx-auto mb-6 flex items-center justify-center">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4">
            Assessment Complete!
          </h1>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Thank you for completing the sample questions. The full assessment will calculate your GOVERN maturity score and provide detailed recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => {
                setCurrentQuestion(0);
                setResponses({});
                setIsComplete(false);
              }}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Retake Assessment
            </button>
            <Link 
              href="/quiz"
              className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg inline-block"
            >
              Back to Quiz Info
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Progress Section */}
          <div className="mb-8 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-white/80">
                Question {currentQuestion + 1} of {sampleQuestions.length}
              </span>
              <span className="text-sm font-medium bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                GOVERN Function
              </span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 h-3 rounded-full transition-all duration-500 ease-out shadow-lg"
                style={{ width: `${((currentQuestion + 1) / sampleQuestions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-8 border border-white/20">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border border-blue-200">
                  {currentQ.subcategory}
                </span>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                  currentQ.weight === 'critical' 
                    ? 'bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border border-red-200'
                    : 'bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 border border-amber-200'
                }`}>
                  {currentQ.weight.toUpperCase()}
                </span>
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent leading-tight">
                {currentQ.text}
              </h2>
            </div>

            <div className="space-y-4">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(currentQ.id, option.value)}
                  className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-200 transform hover:scale-[1.02] ${
                    selectedValue === option.value
                      ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-lg'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50 bg-white'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center transition-all duration-200 ${
                      selectedValue === option.value
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedValue === option.value && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <span className="text-gray-800 font-medium">{option.text}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 ${
                currentQuestion === 0
                  ? 'bg-white/20 text-white/40 cursor-not-allowed'
                  : 'bg-white/90 hover:bg-white text-gray-800 shadow-lg'
              }`}
            >
              ← Previous
            </button>

            <button
              onClick={handleNext}
              disabled={!canProceed}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 ${
                !canProceed
                  ? 'bg-white/20 text-white/40 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg'
              }`}
            >
              {currentQuestion === sampleQuestions.length - 1 ? 'Complete Assessment →' : 'Next →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
