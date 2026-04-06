import reviewQuestionBankJson from '@/shared/mocks/review-question-bank.json'
import reviewManagerQuestionsJson from '@/shared/mocks/review-manager-questions.json'
import reviewPeerQuestionsJson from '@/shared/mocks/review-peer-questions.json'
import reviewSelfQuestionsJson from '@/shared/mocks/review-self-questions.json'
import type { DataContract } from '@/shared/lib/data-contract'
import type { PeerReviewTemplate, ReviewFormDefinition, ReviewFormMode } from '@/shared/mocks/review-forms'

interface ReviewQuestionBankSectionOne {
  participantPrompt: string
  reviewTypePrompt: string
  peerRolePrompt: string
  revieweePrompt: string
}

interface ReviewQuestionBankModeOption {
  id: ReviewFormMode
  label: string
}

interface ReviewQuestionBankPeerTemplate {
  id: string
  label: string
  reviewerRole: string
  targetRole: string
  focus: string
}

interface ReviewQuestionBankData {
  section1: ReviewQuestionBankSectionOne
  modes: ReviewQuestionBankModeOption[]
  peerTemplates: ReviewQuestionBankPeerTemplate[]
}

interface ReviewQuestionBankResponse {
  message: string
  statusCode: number
  data: ReviewQuestionBankData
  meta: null
}

interface PeerReviewDefinition extends Omit<ReviewFormDefinition, 'sections'> {
  templates: PeerReviewTemplate[]
}

interface ResolvedPeerReviewDefinition extends Omit<PeerReviewDefinition, 'templates'> {
  template: {
    id: string
    label: string
    reviewerRole: string
    targetRole: string
    focus: string
  } | null
  sections: PeerReviewTemplate['sections']
}

type ReviewModeResponse = DataContract<ReviewFormDefinition | ResolvedPeerReviewDefinition>

export function getReviewQuestionBankResponse(): ReviewQuestionBankResponse {
  return reviewQuestionBankJson as ReviewQuestionBankResponse
}

export function getReviewQuestionsResponse(mode: ReviewFormMode, peerTemplateId?: string): ReviewModeResponse {
  if (mode === 'peer') {
    const peerDefinition = reviewPeerQuestionsJson as unknown as ReviewModeResponse
    const peerData = peerDefinition.data as unknown as PeerReviewDefinition
    const peerTemplate = peerData.templates.find((template) => template.id === peerTemplateId) ?? peerData.templates[0]
    const generalTemplate = peerData.templates.find((template) => template.id === 'general-peer') ?? null
    const resolvedSections = !peerTemplate
      ? []
      : peerTemplate.id === 'general-peer'
        ? peerTemplate.sections
        : [
            ...peerTemplate.sections,
            ...(generalTemplate?.sections ?? []),
          ]

    return {
      message: peerDefinition.message,
      statusCode: peerDefinition.statusCode,
      data: {
        ...peerData,
        template: peerTemplate
          ? {
              id: peerTemplate.id,
              label: peerTemplate.label,
              reviewerRole: peerTemplate.reviewerRole,
              targetRole: peerTemplate.targetRole,
              focus: peerTemplate.focus,
            }
          : null,
        sections: resolvedSections,
      },
      meta: null,
    }
  }

  const formDefinition = mode === 'manager'
    ? (reviewManagerQuestionsJson as unknown as ReviewModeResponse)
    : (reviewSelfQuestionsJson as unknown as ReviewModeResponse)

  return {
    message: formDefinition.message,
    statusCode: formDefinition.statusCode,
    data: formDefinition.data as ReviewFormDefinition,
    meta: null,
  }
}