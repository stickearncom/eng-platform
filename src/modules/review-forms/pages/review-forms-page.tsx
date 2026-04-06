import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { PageHeader } from '@/shared/components/page-header'
import {
  getReviewParticipants,
  type ReviewFormDefinition,
  type ReviewFormMode,
  type ReviewQuestion,
  type ReviewSection,
} from '@/shared/mocks/review-forms'
import { getReviewQuestionBankResponse, getReviewQuestionsResponse } from '@/shared/mocks/review-questions-api'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'

interface QuestionResponse {
  score?: string
  text?: string
}

const scoreOptions = ['1', '2', '3', '4'] as const

function fieldClassName() {
  return 'h-11 rounded-xl border border-border/80 bg-background/80 px-3 text-sm text-foreground outline-none transition focus:border-primary'
}

function textAreaClassName() {
  return 'min-h-[120px] rounded-2xl border border-border/80 bg-background/80 px-4 py-3 text-sm leading-6 text-foreground outline-none transition focus:border-primary'
}

function flattenSections(sections: ReviewSection[]) {
  return sections.flatMap((section) => section.questions)
}

function getVisibleVisibilityLabel(visibilityLevel?: string) {
  if (!visibilityLevel) {
    return 'Terlihat di alur review'
  }

  return visibilityLevel.replace(/_/g, ' ')
}

function getInitialParticipantId() {
  return getReviewParticipants()[0]?.id ?? ''
}

function isReviewFormMode(value: string | undefined): value is ReviewFormMode {
  return value === 'peer' || value === 'self' || value === 'manager'
}

export function ReviewFormsPage() {
  const navigate = useNavigate()
  const { reviewMode } = useParams<{ reviewMode?: string }>()
  const questionBank = getReviewQuestionBankResponse()
  const participants = getReviewParticipants()
  const reviewModeOptions = questionBank.data.modes

  const initialMode = isReviewFormMode(reviewMode) ? reviewMode : 'peer'
  const initialPeerTemplateId = questionBank.data.peerTemplates[0]?.id ?? ''

  const [mode, setMode] = useState<ReviewFormMode>(initialMode)
  const [peerTemplateId, setPeerTemplateId] = useState(initialPeerTemplateId)
  const [reviewerId, setReviewerId] = useState(getInitialParticipantId())
  const [revieweeId, setRevieweeId] = useState(getInitialParticipantId())
  const [responses, setResponses] = useState<Record<string, QuestionResponse>>({})
  const [statusMessage, setStatusMessage] = useState('Form ini masih prototype. Jawaban belum tersimpan ke backend.')

  useEffect(() => {
    if (!reviewMode) {
      navigate('/review-forms/peer', { replace: true })
      return
    }

    if (!isReviewFormMode(reviewMode)) {
      navigate('/review-forms/peer', { replace: true })
      return
    }

    setMode(reviewMode)
  }, [navigate, reviewMode])

  const activeResponse = getReviewQuestionsResponse(mode, peerTemplateId)
  const activeData = activeResponse.data as ReviewFormDefinition & {
    template?: {
      id: string
      label: string
      reviewerRole: string
      targetRole: string
      focus: string
    } | null
  }
  const activeDefinition: ReviewFormDefinition = {
    id: activeData.id,
    label: activeData.label,
    audience: activeData.audience,
    purpose: activeData.purpose,
    boundary: activeData.boundary,
    visibilityNote: activeData.visibilityNote,
    sections: activeData.sections,
  }
  const activePeerTemplate = activeData.template ?? null

  const reviewer = participants.find((person) => person.id === reviewerId) ?? participants[0]
  const effectiveRevieweeId = mode === 'self' ? reviewerId : revieweeId
  const effectiveReviewee = participants.find((person) => person.id === effectiveRevieweeId) ?? participants[0]
  const activeQuestions = flattenSections(activeDefinition.sections)
  const completedQuestions = activeQuestions.filter((question) => {
    const response = responses[question.id]

    if (!response) {
      return false
    }

    if (question.responseType === 'score_1_4') {
      return Boolean(response.score)
    }

    return Boolean(response.text?.trim())
  }).length

  function resetDraft(nextMode: ReviewFormMode, nextTemplateId = peerTemplateId) {
    setMode(nextMode)
    navigate(`/review-forms/${nextMode}`)
    if (nextMode === 'peer') {
      setPeerTemplateId(nextTemplateId)
    }
    setResponses({})
    setStatusMessage('Pertanyaan sudah disesuaikan dengan jenis penilaian yang dipilih.')
  }

  function updateResponse(questionId: string, nextResponse: Partial<QuestionResponse>) {
    setResponses((current) => ({
      ...current,
      [questionId]: {
        ...current[questionId],
        ...nextResponse,
      },
    }))
  }

  function handleSaveDraft() {
    setStatusMessage(`Draft lokal tersimpan untuk ${activeDefinition.label} pada ${new Date().toLocaleTimeString()}.`)
  }

  function handleSubmit() {
    setStatusMessage(`Submit prototype tercatat untuk ${activeDefinition.label} pada ${new Date().toLocaleTimeString()}.`)
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <PageHeader
        eyebrow="Form Review"
        title="Engineering Review Form"
        description="Lengkapi identitas pengisi, pilih jenis penilaian, lalu jawab pertanyaan yang sesuai dengan konteks review untuk periode berjalan."
        badge="Prototype form"
      />

      <Card className="border-border/80 bg-gradient-to-br from-card via-card to-secondary/20">
        <CardHeader className="space-y-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Informasi Review</p>
            <CardTitle className="text-xl">Engineering Performance Review and Self Reflection</CardTitle>
            <CardDescription>
              Dokumen ini digunakan untuk mendukung proses evaluasi kinerja engineering secara terstruktur dan konsisten.
            </CardDescription>
          </div>
          <p className="text-sm leading-7 text-muted-foreground">
            Form ini digunakan pada periode Q1 2026 untuk memfasilitasi Self Reflection, Peer Feedback, dan Manager Review dalam satu alur yang
            seragam. Setiap jawaban diharapkan merefleksikan observasi yang relevan, contoh perilaku yang nyata, dan konteks kerja selama periode
            penilaian.
          </p>
        </CardHeader>
        <CardContent className="space-y-6 pt-0">
          <div className="space-y-3">
            <h2 className="text-base font-semibold text-foreground">Tujuan Utama</h2>
            <div className="space-y-3 rounded-2xl bg-muted/35 p-4 text-sm leading-7 text-muted-foreground">
              <p>
                <span className="font-semibold text-foreground">Penyelarasan:</span> Menyelaraskan perspektif individu, rekan kerja, dan manager terhadap kontribusi serta area pengembangan.
              </p>
              <p>
                <span className="font-semibold text-foreground">Pertumbuhan:</span> Mengidentifikasi kekuatan utama dan peluang peningkatan, baik dari sisi teknis maupun kolaborasi.
              </p>
              <p>
                <span className="font-semibold text-foreground">Objektivitas:</span> Mendorong proses evaluasi yang berbasis observasi, contoh konkret, dan umpan balik yang dapat ditindaklanjuti.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-base font-semibold text-foreground">Panduan Pengisian</h2>
            <div className="space-y-3 rounded-2xl bg-muted/35 p-4 text-sm leading-7 text-muted-foreground">
              <p>
                <span className="font-semibold text-foreground">Pilih Jenis Penilaian yang Sesuai:</span> Tentukan apakah Anda sedang mengisi Self Reflection, Peer Feedback, atau Manager Review.
              </p>
              <p>
                <span className="font-semibold text-foreground">Gunakan Skala Penilaian Secara Konsisten:</span> Nilai 1-4 digunakan untuk menunjukkan tingkat kematangan atau konsistensi perilaku sesuai definisi pada setiap pertanyaan.
              </p>
              <p>
                <span className="font-semibold text-foreground">Sampaikan Konteks yang Relevan:</span> Untuk jawaban naratif, sertakan contoh, dampak, atau situasi spesifik agar masukan dapat dipahami dengan lebih akurat.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-primary/15 bg-primary/5 p-4 text-sm leading-7 text-foreground">
            Mohon isi form secara jujur, profesional, dan konstruktif. Umpan balik yang baik berfokus pada perilaku atau hasil kerja yang dapat diamati, bukan asumsi pribadi.
          </div>

          <p className="text-sm font-medium text-foreground">
            Terima kasih atas partisipasi Anda dalam menjaga kualitas evaluasi dan pengembangan tim engineering.
          </p>
        </CardContent>
      </Card>

      <Card className="border-border/80">
        <CardHeader className="border-b border-border/70 pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">1</div>
            <div>
              <CardTitle className="text-xl">Bagian 1</CardTitle>
              <CardDescription>Pilih identitas dan jenis penilaian yang ingin diisi.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <label className="flex flex-col gap-2 text-sm">
            <span className="font-medium text-foreground">{questionBank.data.section1.participantPrompt}</span>
            <select className={fieldClassName()} value={reviewerId} onChange={(event) => setReviewerId(event.target.value)}>
              {participants.map((person) => (
                <option key={person.id} value={person.id}>
                  {person.name} · {person.role}
                </option>
              ))}
            </select>
          </label>

          <div className="space-y-3">
            <p className="font-medium text-foreground">{questionBank.data.section1.reviewTypePrompt}</p>
            <div className="grid gap-3 md:grid-cols-3">
              {reviewModeOptions.map((option) => (
                <button
                  key={option.id}
                  className={
                    mode === option.id
                      ? 'rounded-2xl border border-primary bg-primary/5 p-4 text-left'
                      : 'rounded-2xl border border-border/80 bg-background p-4 text-left'
                  }
                  type="button"
                  onClick={() => resetDraft(option.id)}
                >
                  <div className="text-sm font-semibold text-foreground">{option.label}</div>
                  <div className="mt-1 text-sm leading-6 text-muted-foreground">
                    {option.id === 'peer'
                      ? 'Isi feedback untuk rekan kerja atau partner lintas fungsi.'
                      : option.id === 'self'
                        ? 'Isi refleksi diri untuk periode review.'
                        : 'Isi penilaian formal sebagai manager.'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {mode === 'peer' ? (
            <label className="flex flex-col gap-2 text-sm">
              <span className="font-medium text-foreground">{questionBank.data.section1.peerRolePrompt}</span>
              <select
                className={fieldClassName()}
                value={peerTemplateId}
                onChange={(event) => resetDraft('peer', event.target.value)}
              >
                {questionBank.data.peerTemplates.map((template) => (
                  <option key={template.id} value={template.id}>
                    {template.label}
                  </option>
                ))}
              </select>
              {activePeerTemplate ? (
                <p className="text-sm leading-6 text-muted-foreground">
                  {activePeerTemplate.reviewerRole} memberi review ke {activePeerTemplate.targetRole}. Fokus pertanyaan: {activePeerTemplate.focus}.
                </p>
              ) : null}
            </label>
          ) : null}

          {mode !== 'self' ? (
            <label className="flex flex-col gap-2 text-sm">
              <span className="font-medium text-foreground">{questionBank.data.section1.revieweePrompt}</span>
              <select className={fieldClassName()} value={revieweeId} onChange={(event) => setRevieweeId(event.target.value)}>
                {participants.map((person) => (
                  <option key={person.id} value={person.id}>
                    {person.name} · {person.role}
                  </option>
                ))}
              </select>
            </label>
          ) : null}

          <div className="rounded-2xl bg-muted/40 p-4 text-sm leading-6 text-muted-foreground">
            {statusMessage}
          </div>

          {mode === 'peer' ? (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
              Peer feedback diperlakukan sebagai masukan rahasia. Jawaban tidak dibagikan dalam bentuk mentah kepada pihak yang dinilai dan akan
              digunakan dalam bentuk rangkuman untuk mendukung evaluasi.
            </div>
          ) : null}
        </CardContent>
      </Card>

      <Card className="border-border/80">
        <CardHeader className="border-b border-border/70 pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">2</div>
            <div>
              <CardTitle className="text-xl">Bagian 2</CardTitle>
              <CardDescription>Pertanyaan akan menyesuaikan dengan jenis penilaian dan konteks role yang dipilih.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="accent">{activeDefinition.label}</Badge>
            <Badge variant="outline">{completedQuestions}/{activeQuestions.length} terisi</Badge>
          </div>

          <div className="rounded-2xl bg-muted/40 p-4 text-sm leading-6 text-muted-foreground">
            <p><span className="font-semibold text-foreground">Pengisi:</span> {reviewer?.name ?? '-'}</p>
            <p><span className="font-semibold text-foreground">Dinilai:</span> {effectiveReviewee?.name ?? '-'}</p>
            <p><span className="font-semibold text-foreground">Catatan:</span> {activeDefinition.purpose}</p>
          </div>

          {activeDefinition.sections.map((section) => (
            <div className="space-y-4" key={section.id}>
              <div>
                <h2 className="text-lg font-semibold text-foreground">{section.title}</h2>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{section.description}</p>
              </div>
              <div className="space-y-4">
                {section.questions.map((question, index) => (
                  <QuestionCard
                    key={question.id}
                    index={index + 1}
                    question={question}
                    response={responses[question.id]}
                    onChange={updateResponse}
                  />
                ))}
              </div>
            </div>
          ))}

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button onClick={handleSaveDraft} variant="outline">
              Save Draft
            </Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

interface QuestionCardProps {
  index: number
  question: ReviewQuestion
  response?: QuestionResponse
  onChange: (questionId: string, nextResponse: Partial<QuestionResponse>) => void
}

function QuestionCard({ index, question, response, onChange }: QuestionCardProps) {
  const isMultipleChoice = question.responseType === 'score_1_4'

  return (
    <div className="rounded-2xl border border-border/80 bg-background p-5">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="accent">Pertanyaan {index}</Badge>
          <Badge variant="outline">{question.goalCategory}</Badge>
          {question.visibilityLevel ? <Badge variant="outline">{getVisibleVisibilityLabel(question.visibilityLevel)}</Badge> : null}
        </div>
        <div className="space-y-2">
          <h3 className="text-base font-semibold leading-7 text-foreground">{question.prompt}</h3>
          {question.hint ? <p className="text-sm leading-6 text-muted-foreground"><span className="font-medium text-foreground">Hint:</span> {question.hint}</p> : null}
          {question.scoringAnchor ? <p className="text-sm leading-6 text-muted-foreground">{question.scoringAnchor}</p> : null}
        </div>

        {isMultipleChoice ? (
          <div className="space-y-3">
            <p className="text-sm leading-6 text-muted-foreground">Pilih satu jawaban yang paling sesuai.</p>
            <div className="flex flex-wrap gap-2">
              {scoreOptions.map((score) => (
                <Button
                  key={score}
                  size="sm"
                  variant={response?.score === score ? 'default' : 'outline'}
                  type="button"
                  onClick={() => onChange(question.id, { score })}
                >
                  {score}
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <label className="flex flex-col gap-2 text-sm">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {question.responseType === 'private_note' ? 'Catatan privat' : 'Jawaban naratif'}
            </span>
            <textarea
              className={textAreaClassName()}
              value={response?.text ?? ''}
              onChange={(event) => onChange(question.id, { text: event.target.value })}
              placeholder={question.hint ?? (question.responseType === 'private_note' ? 'Tambahkan catatan internal di sini.' : 'Tuliskan jawaban naratif di sini.')}
            />
          </label>
        )}
      </div>
    </div>
  )
}