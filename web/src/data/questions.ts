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

// GOVERN Questions (18 total: 9 critical, 8 important, 1 good-to-have)
export const governQuestions: QuizQuestion[] = [
  {
    id: 'GOV-1.1',
    function: 'GOVERN',
    subcategory: 'GOVERN.1.1',
    weight: 'critical',
    text: 'Does your organization have a documented policy or procedure specifically for managing risks associated with AI systems?',
    options: [
      { value: 2, text: 'Yes, we have a formal policy.' },
      { value: 1, text: 'No, we do not.' },
      { value: 0, text: 'We are in the process of developing one.' }
    ]
  },
  {
    id: 'GOV-1.2',
    function: 'GOVERN',
    subcategory: 'GOVERN.1.1',
    weight: 'important',
    text: 'Are these AI risk management policies communicated to all relevant employees and stakeholders?',
    options: [
      { value: 2, text: 'Yes, widely communicated.' },
      { value: 1, text: 'No, not yet.' },
      { value: 0, text: 'Only to a small group.' }
    ]
  },
  {
    id: 'GOV-2.1',
    function: 'GOVERN',
    subcategory: 'GOVERN.2.1',
    weight: 'critical',
    text: 'Are specific roles and responsibilities for AI risk management formally defined and assigned?',
    options: [
      { value: 2, text: 'Yes, all roles are defined.' },
      { value: 1, text: 'No, they are not.' },
      { value: 0, text: 'Only for a few select roles.' }
    ]
  },
  {
    id: 'GOV-2.2',
    function: 'GOVERN',
    subcategory: 'GOVERN.2.1',
    weight: 'important',
    text: 'Does your organization have a cross-functional committee (e.g., AI ethics committee) to oversee AI risks?',
    options: [
      { value: 2, text: 'Yes, we have a dedicated committee.' },
      { value: 1, text: 'No, we do not.' },
      { value: 0, text: 'It is managed by a single department.' }
    ]
  },
  {
    id: 'GOV-3.1',
    function: 'GOVERN',
    subcategory: 'GOVERN.3.1',
    weight: 'critical',
    text: 'Is AI risk management integrated into your company\'s broader enterprise risk management (ERM) framework?',
    options: [
      { value: 2, text: 'Yes, it is fully integrated.' },
      { value: 1, text: 'No, it is a standalone process.' },
      { value: 0, text: 'We don\'t have an ERM framework.' }
    ]
  },
  {
    id: 'GOV-3.2',
    function: 'GOVERN',
    subcategory: 'GOVERN.3.1',
    weight: 'important',
    text: 'Are AI risks considered in strategic business decisions, project approvals, and resource allocation?',
    options: [
      { value: 2, text: 'Yes, with equal priority to other risks.' },
      { value: 1, text: 'No, they are considered separately.' },
      { value: 0, text: 'They are a low priority.' }
    ]
  },
  {
    id: 'MAP-1.1',
    function: 'GOVERN',
    subcategory: 'MAP.1.1',
    weight: 'critical',
    text: 'Does your organization maintain an inventory or catalog of AI systems currently in use?',
    options: [
      { value: 2, text: 'Yes, we have a comprehensive inventory.' },
      { value: 1, text: 'No, we don\'t.' },
      { value: 0, text: 'Only for a few key systems.' }
    ]
  },
  {
    id: 'MAP-1.2',
    function: 'GOVERN',
    subcategory: 'MAP.1.1',
    weight: 'important',
    text: 'Does your inventory include relevant details about each AI system (e.g., purpose, data sources, stakeholders)?',
    options: [
      { value: 2, text: 'Yes, all details are documented.' },
      { value: 1, text: 'No, the inventory is high-level only.' },
      { value: 0, text: 'We are working to add more details.' }
    ]
  },
  {
    id: 'MAP-2.1',
    function: 'GOVERN',
    subcategory: 'MAP.2.1',
    weight: 'critical',
    text: 'Has your organization categorized AI systems based on their risk level or potential impact?',
    options: [
      { value: 2, text: 'Yes, we have a formal risk categorization.' },
      { value: 1, text: 'No, we have not done this.' },
      { value: 0, text: 'We are working on one.' }
    ]
  },
  {
    id: 'MAP-2.2',
    function: 'GOVERN',
    subcategory: 'MAP.2.1',
    weight: 'important',
    text: 'Do you consider factors like automation level, decision-making authority, and human oversight when categorizing AI systems?',
    options: [
      { value: 2, text: 'Yes, it is a key part of our approach.' },
      { value: 1, text: 'No, we do not.' },
      { value: 0, text: 'Only when required by regulation.' }
    ]
  },
  {
    id: 'MEA-1.1',
    function: 'GOVERN',
    subcategory: 'MEASURE.1.1',
    weight: 'critical',
    text: 'Do you have a process for defining and measuring AI system performance and fairness metrics?',
    options: [
      { value: 2, text: 'Yes, we have comprehensive metrics.' },
      { value: 1, text: 'No, we do not.' },
      { value: 0, text: 'Only when there is a specific need.' }
    ]
  },
  {
    id: 'MEA-1.2',
    function: 'GOVERN',
    subcategory: 'MEASURE.1.1',
    weight: 'critical',
    text: 'Do you have defined thresholds or benchmarks that trigger action when AI system performance degrades?',
    options: [
      { value: 2, text: 'Yes, we track thresholds regularly.' },
      { value: 1, text: 'No, we do not.' },
      { value: 0, text: 'Only for some systems.' }
    ]
  },
  {
    id: 'MEA-2.1',
    function: 'GOVERN',
    subcategory: 'MEASURE.2.1',
    weight: 'critical',
    text: 'Are AI systems subject to regular testing and validation (e.g., for bias, accuracy, robustness)?',
    options: [
      { value: 2, text: 'Yes, with regular testing schedules.' },
      { value: 1, text: 'No, this is not a formal process.' },
      { value: 0, text: 'Only during initial deployment.' }
    ]
  },
  {
    id: 'MEA-2.2',
    function: 'GOVERN',
    subcategory: 'MEASURE.2.1',
    weight: 'important',
    text: 'Do you conduct ongoing monitoring of AI systems in production to detect performance drift or unexpected behavior?',
    options: [
      { value: 2, text: 'Yes, we have a formal monitoring process.' },
      { value: 1, text: 'No, we do not.' },
      { value: 0, text: 'If there is a new regulation, we do.' }
    ]
  },
  {
    id: 'MAN-1.1',
    function: 'GOVERN',
    subcategory: 'MANAGE.1.1',
    weight: 'critical',
    text: 'Are risk mitigation strategies defined and implemented for identified AI risks?',
    options: [
      { value: 2, text: 'Yes, we use risk mitigation strategies.' },
      { value: 1, text: 'No, we do not.' },
      { value: 0, text: 'Only on an ad-hoc basis.' }
    ]
  },
  {
    id: 'MAN-1.2',
    function: 'GOVERN',
    subcategory: 'MANAGE.1.1',
    weight: 'important',
    text: 'Do you have a clear process for responding to AI-related incidents or failures?',
    options: [
      { value: 2, text: 'Yes, we have a formal incident response process.' },
      { value: 1, text: 'No, we do not.' },
      { value: 0, text: 'We handle it on a case-by-case basis.' }
    ]
  },
  {
    id: 'MAN-2.1',
    function: 'GOVERN',
    subcategory: 'MANAGE.2.1',
    weight: 'important',
    text: 'Do you have a process for documenting and communicating AI system changes to relevant stakeholders?',
    options: [
      { value: 2, text: 'Yes, we review every change formally.' },
      { value: 1, text: 'No, they are static systems.' },
      { value: 0, text: 'Only when a major update occurs.' }
    ]
  },
  {
    id: 'MAN-2.2',
    function: 'GOVERN',
    subcategory: 'MANAGE.2.1',
    weight: 'good-to-have',
    text: 'Do you have a process for decommissioning or retiring AI systems that are no longer needed or effective?',
    options: [
      { value: 2, text: 'Yes, we have a formal decommissioning process.' },
      { value: 1, text: 'No, we do not.' },
      { value: 0, text: 'We only collect this information as needed.' }
    ]
  }
];

// Filter questions based on feature flags
export const getAvailableQuestions = (): QuizQuestion[] => {
  const enableFullRMF = process.env.NEXT_PUBLIC_ENABLE_FULL_RMF === 'true';
  
  if (enableFullRMF) {
    return governQuestions; // Eventually include MAP, MEASURE, MANAGE
  } else {
    return governQuestions; // GOVERN only for Sprint 1
  }
};
