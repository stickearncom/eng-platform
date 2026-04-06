import { getEmployeeDirectoryRoster } from '@/shared/mocks/employee-directory'

export type ReviewFormMode = 'peer' | 'self' | 'manager'
export type ReviewResponseType = 'score_1_4' | 'long_text' | 'private_note'
export type ReviewScoringMode = 'direct' | 'supporting-evidence' | 'excluded'

export interface ReviewQuestion {
  id: string
  prompt: string
  goalCategory: string
  hint?: string
  evidencePrompt?: string
  scoringAnchor?: string
  responseType: ReviewResponseType
  scoringMode: ReviewScoringMode
  visibilityLevel?: string
}

export interface ReviewSection {
  id: string
  title: string
  description: string
  questions: ReviewQuestion[]
}

export interface PeerReviewTemplate {
  id: string
  label: string
  reviewerRole: string
  targetRole: string
  focus: string
  sections: ReviewSection[]
}

export interface ReviewFormDefinition {
  id: ReviewFormMode
  label: string
  audience: string
  purpose: string
  boundary: string
  visibilityNote: string
  sections: ReviewSection[]
}

export function getPeerReviewTemplates(): PeerReviewTemplate[] {
  return [
    {
      id: 'pm-to-engineering',
      label: 'PM / PO / Scrum Master to Engineer or QA',
      reviewerRole: 'PM / PO / Scrum Master',
      targetRole: 'Engineer or QA',
      focus: 'Product delivery, collaboration, and ownership',
      sections: [
        {
          id: 'pm-core',
          title: 'Delivery Partnership',
          description: 'Use this template when product partners review engineering delivery and collaboration quality.',
          questions: [
            {
              id: 'pm-eng-quality',
              prompt: 'How well does this person understand the product or business goal behind the task?',
              goalCategory: 'Product understanding',
              hint: 'Think about whether they ask the right questions and make decisions that support customer outcomes.',
              evidencePrompt: 'What example best supports this rating?',
              responseType: 'score_1_4',
              scoringMode: 'direct',
            },
            {
              id: 'pm-eng-communication',
              prompt: 'How clearly does this person communicate progress, blockers, or scope tradeoffs?',
              goalCategory: 'Communication',
              hint: 'Consider status updates, issue escalation, and whether tradeoffs were surfaced early.',
              evidencePrompt: 'What recent delivery situation shows this most clearly?',
              responseType: 'score_1_4',
              scoringMode: 'direct',
            },
            {
              id: 'pm-eng-reliability',
              prompt: 'How reliably does this person follow through on agreed commitments?',
              goalCategory: 'Ownership',
              hint: 'Look at delivery predictability, follow-up discipline, and how they handle slipped plans.',
              evidencePrompt: 'Where did they strengthen or weaken delivery confidence?',
              responseType: 'score_1_4',
              scoringMode: 'direct',
            },
            {
              id: 'pm-eng-problem-solving',
              prompt: 'How effective is this person at helping the team solve ambiguity or execution problems?',
              goalCategory: 'Problem solving',
              hint: 'Rate how they contribute when plans shift, requirements are unclear, or issues span multiple stakeholders.',
              evidencePrompt: 'What situation shows how they worked through ambiguity?',
              responseType: 'score_1_4',
              scoringMode: 'direct',
            },
            {
              id: 'pm-eng-agility',
              prompt: 'How well does this person adapt when priorities, scope, or constraints change?',
              goalCategory: 'Adaptability',
              hint: 'Think about whether they stay constructive and help the team reframe plans instead of stalling.',
              evidencePrompt: 'What changed recently, and how did they respond?',
              responseType: 'score_1_4',
              scoringMode: 'direct',
            },
          ],
        },
      ],
    },
    {
      id: 'engineer-to-engineer',
      label: 'Engineer to Engineer',
      reviewerRole: 'Engineer',
      targetRole: 'Engineer',
      focus: 'Technical quality and peer collaboration',
      sections: [
        {
          id: 'eng-core',
          title: 'Execution Quality',
          description: 'Use this template for direct technical peer feedback among engineers.',
          questions: [
            {
              id: 'eng-docs',
              prompt: 'How effectively does this person document important technical decisions, context, or follow-up work?',
              goalCategory: 'Documentation',
              hint: 'Consider tickets, pull requests, ADRs, and handoff clarity.',
              evidencePrompt: 'Which artifact or workstream supports your rating?',
              responseType: 'score_1_4',
              scoringMode: 'direct',
            },
            {
              id: 'eng-code-review',
              prompt: 'How constructive and useful is this person during code review or technical discussion?',
              goalCategory: 'Technical collaboration',
              hint: 'Rate the usefulness of their feedback, responsiveness, and ability to improve shared code quality.',
              evidencePrompt: 'What example best reflects their review quality?',
              responseType: 'score_1_4',
              scoringMode: 'direct',
            },
          ],
        },
      ],
    },
    {
      id: 'engineer-to-qa',
      label: 'Engineer to QA',
      reviewerRole: 'Engineer',
      targetRole: 'QA',
      focus: 'Quality partnership and clarity of testing support',
      sections: [
        {
          id: 'qa-core',
          title: 'Testing Partnership',
          description: 'Use this template for engineering feedback on QA collaboration, clarity, and system understanding.',
          questions: [
            {
              id: 'qa-bug-report',
              prompt: 'How clearly does this person report bugs, edge cases, or reproduction steps?',
              goalCategory: 'Communication',
              hint: 'Think about whether issues are precise enough to unblock engineering quickly.',
              evidencePrompt: 'What example bug report or ticket illustrates this?',
              responseType: 'score_1_4',
              scoringMode: 'direct',
            },
            {
              id: 'qa-priority',
              prompt: 'How effectively does this person help distinguish urgency, impact, or release risk?',
              goalCategory: 'Prioritization',
              hint: 'Consider how useful their input is when triaging defects and release concerns.',
              evidencePrompt: 'Where did their prioritization help or create confusion?',
              responseType: 'score_1_4',
              scoringMode: 'direct',
            },
            {
              id: 'qa-scope',
              prompt: 'How well does this person think through testing scope across happy paths, edge cases, and regressions?',
              goalCategory: 'Testing quality',
              hint: 'Rate the completeness and relevance of their coverage thinking.',
              evidencePrompt: 'Which release or feature best demonstrates their test coverage?',
              responseType: 'score_1_4',
              scoringMode: 'direct',
            },
            {
              id: 'qa-product',
              prompt: 'How strongly does this person understand the product workflow and user impact behind what is being tested?',
              goalCategory: 'Product understanding',
              hint: 'Look at whether they surface important customer-facing risks, not only mechanical defects.',
              evidencePrompt: 'What product insight or test case stands out?',
              responseType: 'score_1_4',
              scoringMode: 'direct',
            },
            {
              id: 'qa-curiosity',
              prompt: 'How often does this person ask strong follow-up questions that improve release confidence?',
              goalCategory: 'Technical curiosity',
              hint: 'Consider whether they challenge assumptions and inspect unclear behavior early.',
              evidencePrompt: 'What question or investigation improved the outcome?',
              responseType: 'score_1_4',
              scoringMode: 'direct',
            },
          ],
        },
      ],
    },
    {
      id: 'general-peer',
      label: 'General Peer Review',
      reviewerRole: 'Any peer',
      targetRole: 'Any peer',
      focus: 'Collaboration patterns, strengths, and development areas',
      sections: [
        {
          id: 'general-scored',
          title: 'Core Signals',
          description: 'Use this template when no role-specific variant is a better fit.',
          questions: [
            {
              id: 'general-communication',
              prompt: 'How clearly and respectfully does this person communicate with teammates?',
              goalCategory: 'Communication',
              hint: 'Think about clarity, tone, and whether collaboration stays productive under pressure.',
              evidencePrompt: 'What interaction best reflects this rating?',
              responseType: 'score_1_4',
              scoringMode: 'direct',
            },
            {
              id: 'general-collaboration',
              prompt: 'How effectively does this person collaborate to move work forward?',
              goalCategory: 'Collaboration',
              hint: 'Rate how well they unblock others, stay responsive, and share context when needed.',
              evidencePrompt: 'Which project or task shows their collaboration style most clearly?',
              responseType: 'score_1_4',
              scoringMode: 'direct',
            },
            {
              id: 'general-strengths',
              prompt: 'What is this person consistently strong at in day-to-day work?',
              goalCategory: 'Strengths',
              hint: 'Call out the repeated behavior or capability the team can rely on.',
              responseType: 'long_text',
              scoringMode: 'excluded',
            },
            {
              id: 'general-improve',
              prompt: 'What is one area where this person would benefit from improving?',
              goalCategory: 'Growth area',
              hint: 'Keep the feedback actionable and tied to observable work behavior.',
              responseType: 'long_text',
              scoringMode: 'excluded',
            },
          ],
        },
        {
          id: 'general-essay',
          title: 'Narrative Feedback',
          description: 'Add specific narrative examples that can help calibration and coaching.',
          questions: [
            {
              id: 'general-essay-strength',
              prompt: 'Describe a recent situation where this person had a strong positive impact.',
              goalCategory: 'Narrative evidence',
              hint: 'Prefer a specific example over a generic compliment.',
              responseType: 'long_text',
              scoringMode: 'excluded',
            },
            {
              id: 'general-essay-support',
              prompt: 'What support, context, or coaching would help this person perform even better?',
              goalCategory: 'Support needs',
              hint: 'Focus on conditions or behaviors that would create a better outcome.',
              responseType: 'long_text',
              scoringMode: 'excluded',
            },
          ],
        },
      ],
    },
    {
      id: 'stakeholder-to-data',
      label: 'Stakeholder to Data Team',
      reviewerRole: 'Stakeholder / Product / Business partner',
      targetRole: 'Data team member',
      focus: 'Data reliability, responsiveness, and business usefulness',
      sections: [
        {
          id: 'data-stakeholder-core',
          title: 'Business Impact',
          description: 'Use this template when stakeholders review how data partners support decisions and delivery.',
          questions: [
            {
              id: 'data-stakeholder-clarity',
              prompt: 'How clearly does this person explain data logic, assumptions, or output limitations?',
              goalCategory: 'Communication',
              hint: 'Think about whether non-technical stakeholders can act on the explanation.',
              evidencePrompt: 'What delivery or analysis best shows their clarity?',
              responseType: 'score_1_4',
              scoringMode: 'direct',
            },
            {
              id: 'data-stakeholder-reliability',
              prompt: 'How reliable is this person when turning requests into usable analysis or data support?',
              goalCategory: 'Reliability',
              hint: 'Rate timeliness, follow-through, and whether the output is decision-ready.',
              evidencePrompt: 'Which request or analysis illustrates this most clearly?',
              responseType: 'score_1_4',
              scoringMode: 'direct',
            },
            {
              id: 'data-stakeholder-business',
              prompt: 'How well does this person connect data work back to the business question or decision context?',
              goalCategory: 'Business understanding',
              hint: 'Consider whether they answer the right question, not only the requested query.',
              evidencePrompt: 'What example shows strong or weak business framing?',
              responseType: 'score_1_4',
              scoringMode: 'direct',
            },
          ],
        },
      ],
    },
    {
      id: 'engineer-to-data',
      label: 'Engineer to Data Team',
      reviewerRole: 'Engineer',
      targetRole: 'Data team member',
      focus: 'Technical collaboration with shared systems and dependencies',
      sections: [
        {
          id: 'data-engineering-core',
          title: 'Cross-functional Delivery',
          description: 'Use this template when engineering reviews the quality of collaboration with data partners.',
          questions: [
            {
              id: 'data-eng-collab',
              prompt: 'How effective is this person at coordinating across dependencies, handoffs, or technical constraints?',
              goalCategory: 'Collaboration',
              hint: 'Look at responsiveness, context-sharing, and how well they reduce ambiguity for other teams.',
              evidencePrompt: 'What dependency handoff best illustrates this?',
              responseType: 'score_1_4',
              scoringMode: 'direct',
            },
            {
              id: 'data-eng-quality',
              prompt: 'How much confidence do you have in the technical quality and maintainability of this person\'s output?',
              goalCategory: 'Technical quality',
              hint: 'Consider repeatability, clarity, and whether the output can be trusted in downstream delivery.',
              evidencePrompt: 'What work product or integration supports your rating?',
              responseType: 'score_1_4',
              scoringMode: 'direct',
            },
          ],
        },
      ],
    },
  ]
}

export function getSelfReviewDefinition(): ReviewFormDefinition {
  return {
    id: 'self',
    label: 'Self Review',
    audience: 'Each individual contributor or manager completing their own reflection',
    purpose: 'Capture self-assessed performance signals, supporting evidence, and reflection that can inform manager review and calibration.',
    boundary: 'This page is a prototype workflow. Production behavior should connect answers to cycle state, participant identity, and submission permissions.',
    visibilityNote: 'Self reflections are visible to the employee and the manager workflow. They are not intended as company-wide scoreboards.',
    sections: [
      {
        id: 'self-scored',
        title: 'Scored Reflection',
        description: 'Rate the most important delivery and collaboration signals using the 1-4 scale.',
        questions: [
          {
            id: 'self-ownership',
            prompt: 'I took ownership of my work and followed through on commitments.',
            goalCategory: 'Ownership',
            hint: 'Reflect on follow-through, reliability, and how you handled tradeoffs or changing scope.',
            evidencePrompt: 'What work best demonstrates this?',
            scoringAnchor: '1 = inconsistent follow-through, 4 = consistently proactive and dependable',
            responseType: 'score_1_4',
            scoringMode: 'direct',
          },
          {
            id: 'self-collaboration',
            prompt: 'I collaborated effectively with teammates and stakeholders.',
            goalCategory: 'Collaboration',
            hint: 'Think about alignment, responsiveness, and whether others could move faster because of your work.',
            evidencePrompt: 'Which collaboration example best supports this rating?',
            scoringAnchor: '1 = collaboration often created friction, 4 = collaboration consistently improved team outcomes',
            responseType: 'score_1_4',
            scoringMode: 'direct',
          },
          {
            id: 'self-quality',
            prompt: 'I maintained a high standard of technical or functional quality in my work.',
            goalCategory: 'Quality',
            hint: 'Consider correctness, maintainability, and whether your output reduced rework.',
            evidencePrompt: 'What deliverable best demonstrates quality?',
            scoringAnchor: '1 = output often required substantial correction, 4 = output consistently created confidence',
            responseType: 'score_1_4',
            scoringMode: 'direct',
          },
          {
            id: 'self-problem-solving',
            prompt: 'I handled ambiguity and solved problems effectively.',
            goalCategory: 'Problem solving',
            hint: 'Focus on how you broke down unclear work, asked for context, and moved issues forward.',
            evidencePrompt: 'What problem or ambiguous situation is the strongest example?',
            scoringAnchor: '1 = often stalled in ambiguity, 4 = consistently created clarity and momentum',
            responseType: 'score_1_4',
            scoringMode: 'direct',
          },
          {
            id: 'self-growth',
            prompt: 'I improved how I work based on feedback, learning, or reflection.',
            goalCategory: 'Growth mindset',
            hint: 'Describe where feedback changed your behavior, process, or technical approach.',
            evidencePrompt: 'What changed in your behavior or output during the cycle?',
            scoringAnchor: '1 = limited adaptation, 4 = clear and sustained improvement',
            responseType: 'score_1_4',
            scoringMode: 'direct',
          },
        ],
      },
      {
        id: 'self-supporting',
        title: 'Supporting Evidence',
        description: 'Add supporting examples that help a reviewer understand the context behind your scores.',
        questions: [
          {
            id: 'self-support-impact',
            prompt: 'What work had the strongest positive impact this cycle?',
            goalCategory: 'Impact evidence',
            hint: 'Describe the outcome, not only the task list.',
            responseType: 'long_text',
            scoringMode: 'supporting-evidence',
          },
          {
            id: 'self-support-learning',
            prompt: 'What did you learn this cycle that changed how you approach work?',
            goalCategory: 'Learning evidence',
            hint: 'This can include technical, product, communication, or delivery learning.',
            responseType: 'long_text',
            scoringMode: 'supporting-evidence',
          },
          {
            id: 'self-support-challenge',
            prompt: 'What was the hardest challenge you worked through, and how did you handle it?',
            goalCategory: 'Challenge evidence',
            hint: 'Use a real example and note what you would repeat or change.',
            responseType: 'long_text',
            scoringMode: 'supporting-evidence',
          },
        ],
      },
      {
        id: 'self-narrative',
        title: 'Narrative Reflection',
        description: 'Close the review with forward-looking reflection that helps the next cycle planning.',
        questions: [
          {
            id: 'self-proud',
            prompt: 'What are you most proud of from this cycle?',
            goalCategory: 'Narrative summary',
            hint: 'Choose the work you want a manager or calibrator to remember.',
            responseType: 'long_text',
            scoringMode: 'excluded',
          },
          {
            id: 'self-improve-next',
            prompt: 'What would you most like to improve in the next cycle?',
            goalCategory: 'Growth focus',
            hint: 'Make the answer concrete enough to turn into a growth plan.',
            responseType: 'long_text',
            scoringMode: 'excluded',
          },
          {
            id: 'self-support-needed',
            prompt: 'What support from your manager or team would help you most?',
            goalCategory: 'Support request',
            hint: 'Call out coaching, context, staffing, tooling, or process support if relevant.',
            responseType: 'long_text',
            scoringMode: 'excluded',
          },
        ],
      },
    ],
  }
}

export function getManagerReviewDefinition(): ReviewFormDefinition {
  return {
    id: 'manager',
    label: 'Manager Review',
    audience: 'Line managers preparing the formal evaluation for one direct report',
    purpose: 'Combine scored assessment, written summary, and private calibration notes in a single workflow.',
    boundary: 'This prototype shows the structure and confidentiality intent, but does not enforce production access controls or approvals.',
    visibilityNote: 'Some fields are visible to the employee, while calibration notes remain manager-only or HR-only.',
    sections: [
      {
        id: 'manager-scored',
        title: 'Scored Review',
        description: 'Use the 1-4 scale for the core dimensions that should feed the formal assessment.',
        questions: [
          {
            id: 'manager-ownership',
            prompt: 'This person demonstrates ownership and dependable follow-through.',
            goalCategory: 'Ownership',
            hint: 'Rate follow-through, problem ownership, and how well they close loops without repeated prompting.',
            evidencePrompt: 'What evidence best supports this rating?',
            scoringAnchor: '1 = inconsistent ownership, 4 = trusted to proactively drive outcomes',
            responseType: 'score_1_4',
            scoringMode: 'direct',
            visibilityLevel: 'employee_visible',
          },
          {
            id: 'manager-collaboration',
            prompt: 'This person collaborates effectively across teammates and stakeholders.',
            goalCategory: 'Collaboration',
            hint: 'Think about trust, communication quality, and how others experience working with them.',
            evidencePrompt: 'Which example best reflects this dimension?',
            scoringAnchor: '1 = collaboration often slows work down, 4 = collaboration consistently amplifies team performance',
            responseType: 'score_1_4',
            scoringMode: 'direct',
            visibilityLevel: 'employee_visible',
          },
          {
            id: 'manager-quality',
            prompt: 'This person delivers work with a strong quality bar.',
            goalCategory: 'Quality',
            hint: 'Consider correctness, consistency, maintainability, and level-appropriate judgment.',
            evidencePrompt: 'What deliverable or pattern best supports your view?',
            scoringAnchor: '1 = quality issues repeatedly create rework, 4 = quality consistently creates trust',
            responseType: 'score_1_4',
            scoringMode: 'direct',
            visibilityLevel: 'employee_visible',
          },
          {
            id: 'manager-problem-solving',
            prompt: 'This person solves problems well and handles ambiguity constructively.',
            goalCategory: 'Problem solving',
            hint: 'Rate how they make progress with incomplete information and how much judgment they show.',
            evidencePrompt: 'What example shows their problem-solving range most clearly?',
            scoringAnchor: '1 = frequently stalls or escalates without framing, 4 = consistently creates clarity and solutions',
            responseType: 'score_1_4',
            scoringMode: 'direct',
            visibilityLevel: 'employee_visible',
          },
          {
            id: 'manager-growth',
            prompt: 'This person shows learning velocity and applies feedback effectively.',
            goalCategory: 'Growth mindset',
            hint: 'Look for changed behavior, improved judgment, and openness to coaching.',
            evidencePrompt: 'Where did feedback or learning translate into a better outcome?',
            scoringAnchor: '1 = limited evidence of adaptation, 4 = feedback is regularly turned into better execution',
            responseType: 'score_1_4',
            scoringMode: 'direct',
            visibilityLevel: 'employee_visible',
          },
        ],
      },
      {
        id: 'manager-summary',
        title: 'Summary and Action',
        description: 'Write the narrative the employee should receive, including strengths and next-cycle focus.',
        questions: [
          {
            id: 'manager-summary-strengths',
            prompt: 'What strengths should be explicitly reinforced for this person?',
            goalCategory: 'Strength summary',
            hint: 'Call out the strengths that matter most at their current level and scope.',
            responseType: 'long_text',
            scoringMode: 'excluded',
            visibilityLevel: 'employee_visible',
          },
          {
            id: 'manager-summary-focus',
            prompt: 'What is the clearest growth focus for the next cycle?',
            goalCategory: 'Growth focus',
            hint: 'Keep the growth area narrow enough to act on in the next review period.',
            responseType: 'long_text',
            scoringMode: 'excluded',
            visibilityLevel: 'employee_visible',
          },
        ],
      },
      {
        id: 'manager-private',
        title: 'Calibration and Private Notes',
        description: 'These fields support calibration and internal handling. They are not part of the employee-facing narrative.',
        questions: [
          {
            id: 'manager-private-risk',
            prompt: 'What risk, concern, or context should calibrators understand about this review?',
            goalCategory: 'Calibration context',
            hint: 'Use this field for nuance that affects interpretation of the formal review.',
            responseType: 'private_note',
            scoringMode: 'excluded',
            visibilityLevel: 'manager_only',
          },
          {
            id: 'manager-private-scope',
            prompt: 'Were there any scope changes, staffing issues, or temporary conditions that affected performance interpretation?',
            goalCategory: 'Scope context',
            hint: 'Examples: onboarding, temporary leadership load, unstable product scope, coverage gaps.',
            responseType: 'private_note',
            scoringMode: 'excluded',
            visibilityLevel: 'manager_only',
          },
          {
            id: 'manager-private-comp',
            prompt: 'Is there any compensation or promotion context that HR should review with this case?',
            goalCategory: 'HR note',
            hint: 'Add only the context needed for HR review or follow-up.',
            responseType: 'private_note',
            scoringMode: 'excluded',
            visibilityLevel: 'hr_only',
          },
          {
            id: 'manager-private-followup',
            prompt: 'What follow-up actions are required after calibration or review delivery?',
            goalCategory: 'Follow-up',
            hint: 'List concrete actions, owners, or timing if known.',
            responseType: 'private_note',
            scoringMode: 'excluded',
            visibilityLevel: 'manager_only',
          },
        ],
      },
    ],
  }
}

export function getReviewCycleOptions() {
  return ['2025 H2', '2026 H1', 'Promotion checkpoint', 'Off-cycle review']
}

export function getReviewParticipants() {
  return getEmployeeDirectoryRoster()
    .map((person) => ({
      id: person.id,
      name: person.displayName,
      role: person.role,
      team: person.organization,
    }))
    .sort((left, right) => left.name.localeCompare(right.name))
}