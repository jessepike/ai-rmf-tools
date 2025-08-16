'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getAvailableQuestions } from '@/data/questions';
import { submitQuiz, validateEmail, type QuizResponse } from '@/lib/api-client';

export default function AssessPage() {
  const router = useRouter();
  const questions = getAvailableQuestions();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<Record<string, number>>({});
  const [isComplete, setIsComplete] = useState(false);
  
  // Email capture and submission states
  const [email, setEmail] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleAnswer = (questionId: string, value: number) => {
    setResponses(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
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

  const handleSubmitAssessment = async () => {
    if (!validateEmail(email)) {
      setSubmitError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Convert responses to the format expected by the API
      const quizResponses: QuizResponse[] = questions.map(question => ({
        questionId: question.id,
        subcategory: question.subcategory,
        weight: question.weight,
        selectedValue: responses[question.id] || 0,
        selectedText: question.options.find(opt => opt.value === responses[question.id])?.text || 'No answer'
      }));

      // Submit to API
      const result = await submitQuiz({
        email,
        organizationName: organizationName || undefined,
        responses: quizResponses,
        completedAt: new Date().toISOString()
      });

      // Redirect to results page with the results
      const resultsParams = new URLSearchParams({
        score: result.governScore.toString(),
        tier: result.maturityTier,
        strongestArea: result.insights.strongestArea,
        priorityFocus: result.insights.priorityFocus,
        email: email,
        assessmentId: result.assessmentId
      });

      router.push(`/quiz/results?${resultsParams.toString()}`);

    } catch (error: any) {
      setSubmitError(error.message || 'Failed to submit assessment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentQ = questions[currentQuestion];
  const selectedValue = responses[currentQ?.id];
  const canProceed = selectedValue !== undefined;
  const answeredQuestions = Object.keys(responses).length;

  // Email capture form (shown after completing all questions)
  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="max-w-2xl mx-auto p-8 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mx-auto mb-6 flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4">
              Assessment Complete!
            </h1>
            <p className="text-gray-600 mb-8 leading-relaxed">
              You answered {answeredQuestions} out of {questions.length} questions. 
              Enter your email to receive your personalized AI governance maturity report.
            </p>
          </div>

          {/* Email Capture Form */}
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@company.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                required
              />
            </div>

            <div>
              <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-2">
                Organization Name (Optional)
              </label>
              <input
                type="text"
                id="organization"
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
                placeholder="Your Company Inc."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>

            {submitError && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-red-800 text-sm">{submitError}</p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleSubmitAssessment}
                disabled={isSubmitting || !email}
                className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 ${
                  isSubmitting || !email
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Calculating Results...
                  </span>
                ) : (
                  'Get My Results & Report'
                )}
              </button>
              
              <button 
                onClick={() => {
                  setCurrentQuestion(0);
                  setResponses({});
                  setIsComplete(false);
                  setEmail('');
                  setOrganizationName('');
                  setSubmitError(null);
                }}
                className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Retake Assessment
              </button>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-6">
              <p className="text-blue-800 text-sm">
                <strong>What happens next:</strong> We'll calculate your AI governance maturity score, 
                generate personalized recommendations, and email you a detailed PDF report within minutes.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz questions (unchanged from your original)
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Progress Section */}
          <div className="mb-8 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-white/80">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span className="text-sm font-medium bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                GOVERN Function
              </span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 h-3 rounded-full transition-all duration-500 ease-out shadow-lg"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
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
                    : currentQ.weight === 'important'
                    ? 'bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 border border-amber-200'
                    : 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200'
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
              {currentQuestion === questions.length - 1 ? 'Complete Assessment →' : 'Next →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}