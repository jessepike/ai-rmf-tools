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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-xl text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Assessment Complete!
          </h1>
          <p className="text-gray-600 mb-6">
            Thank you for completing the sample questions. The full assessment will calculate your GOVERN maturity score and provide detailed recommendations.
          </p>
          <div className="space-x-4">
            <button 
              onClick={() => {
                setCurrentQuestion(0);
                setResponses({});
                setIsComplete(false);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Retake Assessment
            </button>
            <Link 
              href="/quiz"
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded inline-block"
            >
              Back to Quiz Info
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">
                Question {currentQuestion + 1} of {sampleQuestions.length}
              </span>
              <span className="text-sm text-gray-600">
                GOVERN Function
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / sampleQuestions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
            <div className="mb-6">
              <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded mb-4">
                {currentQ.subcategory} • {currentQ.weight.toUpperCase()}
              </span>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {currentQ.text}
              </h2>
            </div>

            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(currentQ.id, option.value)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    selectedValue === option.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                      selectedValue === option.value
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedValue === option.value && (
                        <div className="w-2 h-2 bg-white rounded-full m-0.5" />
                      )}
                    </div>
                    <span className="text-gray-800">{option.text}</span>
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
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                currentQuestion === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-600 hover:bg-gray-700 text-white'
              }`}
            >
              Previous
            </button>

            <button
              onClick={handleNext}
              disabled={!canProceed}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                !canProceed
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {currentQuestion === sampleQuestions.length - 1 ? 'Complete Assessment' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
