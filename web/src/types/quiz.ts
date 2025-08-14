export interface QuizQuestion {
  id: string;
  function: 'GOVERN' | 'MAP' | 'MEASURE' | 'MANAGE';
  subcategory: string;
  weight: 'critical' | 'important' | 'good-to-have';
  text: string;
  options: {
    value: number;
    text: string;
  }[];
  helpText?: string;
}

export interface QuizResponse {
  questionId: string;
  subcategory: string;
  function: string;
  weight: string;
  selectedValue: number;
  selectedText: string;
}

export interface AssessmentResult {
  scores: {
    govern: number;
    map?: number;
    measure?: number;
    manage?: number;
    overall?: number;
  };
  maturityTiers: {
    govern: 'Emerging' | 'Developing' | 'Maturing' | 'Optimized';
    overall?: 'Emerging' | 'Developing' | 'Maturing' | 'Optimized';
  };
  insights: {
    strongestArea: string;
    priorityFocus: string;
    functionsAssessed: string[];
  };
}
