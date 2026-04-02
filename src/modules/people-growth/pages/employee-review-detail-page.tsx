import { ChevronLeft } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

import { usePlatformStore } from '@/app/store/use-platform-store'
import { AudienceNotice } from '@/shared/components/audience-notice'
import { MiniTrend } from '@/shared/components/mini-trend'
import { PagePurposeStrip } from '@/shared/components/page-purpose-strip'
import { Badge } from '@/shared/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'
import { audienceContexts } from '@/shared/config/audience'
import { getEmployeeDetail, getPeopleRoster } from '@/shared/mocks/people-growth'

export function EmployeeReviewDetailPage() {
  const { employeeId } = useParams()
  const audience = usePlatformStore((state) => state.audience)
  const context = audienceContexts[audience]
  const employees = getPeopleRoster()
  const employee = employees.find((item) => item.id === employeeId) ?? employees[0]
  const employeeDetail = getEmployeeDetail(employee.id)
  const previousCycleLabels = employeeDetail.previousCycles.map((cycle) => cycle.label)
  const previousCycleValues = employeeDetail.previousCycles.map((cycle) => Math.round(Number(cycle.score) * 25))
  const categoryScores = employeeDetail.categoryRows.map((row) => Number(row.weighted))
  const strongestCategory = employeeDetail.categoryRows.reduce((highest, row) => (Number(row.weighted) > Number(highest.weighted) ? row : highest), employeeDetail.categoryRows[0])

  if (!context.canOpenPeopleDetail) {
    return (
      <div className="space-y-6">
        <section className="space-y-3">
          <Link className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground" to="/people-growth">
            <ChevronLeft className="h-4 w-4" />
            Back to People Growth
          </Link>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground md:text-3xl">Employee Review Detail</h1>
              <p className="mt-2 max-w-4xl text-sm italic leading-6 text-muted-foreground">
                Detailed employee review remains protected unless the active audience is allowed to work with coaching, confidentiality, or calibration workflows.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="rounded-md px-2.5 py-1" variant="outline">Restricted view</Badge>
              <Badge className="rounded-md px-2.5 py-1" variant="outline">{context.label}</Badge>
            </div>
          </div>
        </section>

        <PagePurposeStrip
          audience={audience}
          boundary={{
            executive: 'Executives do not open this drill-down because employee-level coaching and calibration detail is confidential.',
            'engineering-manager': 'Restricted drill-down for coaching continuity, evidence review, and calibration follow-up.',
            'scrum-master': 'Scrum Masters should not open this page because confidential review detail is outside delivery workflow.',
            hr: 'Restricted drill-down for review governance, policy-safe employee follow-up, and confidentiality-aware documentation.',
          }}
          primaryAudience={{
            executive: 'Not available to this audience.',
            'engineering-manager': 'Engineering Managers.',
            'scrum-master': 'Not available to this audience.',
            hr: 'HR.',
          }}
          purpose={{
            executive: 'Employee-level review detail is not part of executive workflow.',
            'engineering-manager': 'Provides a detailed employee review view with category breakdown, evidence, peer input, and development planning.',
            'scrum-master': 'Employee-level review detail is not part of Scrum Master workflow.',
            hr: 'Provides a detailed employee review view with category breakdown, evidence, peer feedback, and development planning for review governance.',
          }}
        />

        <AudienceNotice
          description={{
            executive: 'Executive audience keeps people visibility at approved summary level and does not open confidential employee review detail.',
            'engineering-manager': 'Manager audience can move between people summary and employee drill-down when coaching or calibration follow-up is required.',
            'scrum-master': 'Scrum Master audience is blocked because employee review detail is outside delivery operations and contains confidential context.',
            hr: 'HR audience can open employee detail when review governance, completion follow-up, or policy-safe documentation requires it.',
          }}
          focus={{
            executive: 'Aggregate-only people visibility',
            'engineering-manager': 'Coaching continuity and calibration follow-up',
            'scrum-master': 'Confidentiality boundary',
            hr: 'Review governance and confidentiality safety',
          }}
          moduleLabel="People Growth detail"
          note={{
            executive: 'Employee-level coaching detail stays blocked for executives because people visibility should remain aggregate and decision-oriented.',
            'engineering-manager': 'Managers can open this route because employee review detail is needed for evidence review, calibration discussion, and action planning.',
            'scrum-master': 'This route stays blocked because Scrum Master workflows should focus on delivery patterns, not confidential employee review detail.',
            hr: 'HR can open this route because review governance sometimes requires employee-level evidence, completion follow-up, and confidentiality-safe oversight.',
          }}
        />

        <Card className="border-foreground/20 bg-muted/50">
          <CardHeader>
            <CardTitle>Why this is blocked</CardTitle>
            <CardDescription>
              The mock app uses Audience Context to preview permission-aware behavior before real authentication and authorization are wired in.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
            <p>Scrum Master should not see confidential performance detail.</p>
            <p>Executive should see summarized people signals, not employee-level coaching notes.</p>
            <p>Engineering Manager and HR can open this route because their workflows depend on calibration or review follow-up.</p>
          </CardContent>
        </Card>

        <section className="grid gap-4 md:grid-cols-2">
          <Card className="border-dashed border-foreground/20">
            <CardHeader>
              <CardTitle className="text-sm">Who should use this page</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm leading-6 text-muted-foreground">
              <p>Engineering Manager: coaching continuity, evidence review, and action planning.</p>
              <p>HR: calibration governance, completion follow-up, and confidentiality-safe employee review access.</p>
            </CardContent>
          </Card>

          <Card className="border-dashed border-foreground/20">
            <CardHeader>
              <CardTitle className="text-sm">What remains visible elsewhere</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm leading-6 text-muted-foreground">
              <p>Executives keep access to aggregated people signals only.</p>
              <p>Scrum Masters stay on delivery and planning views without confidential narrative detail.</p>
            </CardContent>
          </Card>
        </section>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <section className="space-y-3">
        <Link className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground" to="/people-growth">
          <ChevronLeft className="h-4 w-4" />
          Back to People Growth
        </Link>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">Employee Review Detail</p>
            <h1 className="text-2xl font-bold text-foreground md:text-3xl">{employee.name}</h1>
            <p className="mt-2 max-w-4xl text-sm italic leading-6 text-muted-foreground">
              Detailed employee review for managers and HR, combining category breakdown, evidence, peer feedback, and development planning with confidentiality-aware follow-up.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="rounded-md px-2.5 py-1" variant="outline">{context.label}</Badge>
            <Badge className="rounded-md px-2.5 py-1" variant={employee.confidence === 'Low confidence' ? 'alert' : 'success'}>
              {employee.confidence}
            </Badge>
            <Badge className="rounded-md px-2.5 py-1" variant="outline">{employee.status}</Badge>
          </div>
        </div>
      </section>

      <PagePurposeStrip
        audience={audience}
        boundary={{
          executive: 'Not part of executive workflow.',
          'engineering-manager': 'Detailed employee view for coaching and calibration follow-through. Manager-only notes and comparative context stay permission-controlled.',
          'scrum-master': 'Not part of Scrum Master workflow.',
          hr: 'Detailed employee view for review governance and follow-up. Manager-only notes remain hidden while formal review context stays visible.',
        }}
        primaryAudience={{
          executive: 'Not available to this audience.',
          'engineering-manager': 'Engineering Managers.',
          'scrum-master': 'Not available to this audience.',
          hr: 'HR.',
        }}
        purpose={{
          executive: 'Employee-level review detail is not available in this audience mode.',
          'engineering-manager': 'Provides a detailed employee review view with category breakdown, evidence, peer feedback, and development planning inside the People Growth workflow.',
          'scrum-master': 'Employee-level review detail is not available in this audience mode.',
          hr: 'Provides a detailed employee review view with category breakdown, evidence, peer feedback, and development planning for calibration and review governance.',
        }}
      />

      <AudienceNotice
        description={{
          'engineering-manager': 'Manager audience can use employee detail to connect score signals with evidence, coaching narrative, and next actions.',
          hr: 'HR audience can use employee detail for calibration governance, review consistency checks, and documented development follow-up.',
        }}
        focus={{
          'engineering-manager': 'Coaching continuity and evidence review',
          hr: 'Calibration governance and review consistency',
        }}
        moduleLabel="Individual review detail"
        note={{
          'engineering-manager': 'Manager-only notes ditampilkan pada audience ini karena dibutuhkan untuk coaching continuity dan direct follow-through.',
          hr: 'Manager-only notes disembunyikan pada audience ini agar batas confidentiality tetap terjaga, sementara formal review context tetap tersedia.',
        }}
      />

      <section className="grid gap-4 xl:grid-cols-4">
        <Card className="border-dashed border-foreground/20">
          <CardHeader className="pb-4">
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Final Score</div>
            <p className="text-3xl font-bold text-foreground">{employee.finalScore}</p>
            <CardDescription>Weighted result from self, peer, and manager evidence.</CardDescription>
          </CardHeader>
        </Card>
        <Card className="border-dashed border-foreground/20">
          <CardHeader className="pb-4">
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Team & Level</div>
            <p className="text-lg font-semibold text-foreground">{employee.team}</p>
            <CardDescription>{employee.level} • {employee.role}</CardDescription>
          </CardHeader>
        </Card>
        <Card className="border-dashed border-foreground/20">
          <CardHeader className="pb-4">
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Review Cycle</div>
            <p className="text-lg font-semibold text-foreground">{employeeDetail.cycle}</p>
            <CardDescription>{employee.needsCalibration ? 'Needs calibration discussion' : 'No immediate calibration escalation'}</CardDescription>
          </CardHeader>
        </Card>
        <Card className="border-dashed border-foreground/20">
          <CardHeader className="pb-4">
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Strongest Signal</div>
            <p className="text-lg font-semibold text-foreground">{strongestCategory.category}</p>
            <CardDescription>Weighted score {strongestCategory.weighted}</CardDescription>
          </CardHeader>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <Card className="border-dashed border-foreground/20">
          <CardHeader>
            <CardTitle>Review trajectory</CardTitle>
            <CardDescription>
              Cycle-over-cycle score movement to show whether development actions are translating into measurable growth.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <MiniTrend labels={previousCycleLabels} tone="default" values={previousCycleValues} variant="area" />
            <div className="grid gap-3 md:grid-cols-3">
              {employeeDetail.previousCycles.map((cycle) => (
                <div className="rounded-xl border border-border/70 bg-background/80 p-4" key={cycle.label}>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">{cycle.label}</p>
                  <p className="mt-2 text-lg font-semibold text-foreground">{cycle.score}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-dashed border-foreground/20">
          <CardHeader>
            <CardTitle>Coaching posture</CardTitle>
            <CardDescription>
              Practical interpretation for follow-up, not just a score readout.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-xl border border-border/70 bg-background/80 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Primary focus</p>
              <p className="mt-2 text-sm leading-6 text-foreground">{employee.focus}</p>
            </div>
            <div className="rounded-xl border border-border/70 bg-background/80 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Confidentiality mode</p>
              <p className="mt-2 text-sm leading-6 text-foreground">
                {context.canSeeManagerNotes
                  ? 'Manager coaching notes are visible in this audience because direct follow-through is part of the workflow.'
                  : 'Restricted manager narrative stays hidden, while formal action items remain visible.'}
              </p>
            </div>
            <div className="rounded-xl border border-border/70 bg-background/80 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Calibration status</p>
              <p className="mt-2 text-sm leading-6 text-foreground">
                {employee.needsCalibration
                  ? 'This employee should be reviewed in calibration because current evidence confidence is not yet strong enough.'
                  : 'Current evidence is sufficient for normal review closure without extra calibration escalation.'}
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <Card className="border-dashed border-foreground/20">
          <CardHeader>
          <CardTitle>Category score breakdown</CardTitle>
          <CardDescription>
            Numeric outputs remain interpretable because component scores are shown beside the weighted result.
          </CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="data-table min-w-full text-left text-sm">
              <thead>
                <tr className="text-muted-foreground">
                  <th className="pb-3 pr-4 font-medium">Category</th>
                  <th className="pb-3 pr-4 font-medium">Self</th>
                  <th className="pb-3 pr-4 font-medium">Peer</th>
                  <th className="pb-3 pr-4 font-medium">Manager</th>
                  <th className="pb-3 font-medium">Weighted</th>
                </tr>
              </thead>
              <tbody>
                {employeeDetail.categoryRows.map((row) => (
                  <tr key={row.category}>
                    <td className="py-4 pr-4 font-medium text-foreground">{row.category}</td>
                    <td className="py-4 pr-4">{row.self}</td>
                    <td className="py-4 pr-4">{row.peer}</td>
                    <td className="py-4 pr-4">{row.manager}</td>
                    <td className="py-4 font-semibold text-foreground">{row.weighted}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <Card className="border-dashed border-foreground/20">
          <CardHeader>
            <CardTitle>Weighted category profile</CardTitle>
            <CardDescription>
              Quick visual read of which capability areas are ahead and which ones need targeted development support.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <MiniTrend
              labels={employeeDetail.categoryRows.map((row) => row.category.split(' ')[0])}
              tone="success"
              values={categoryScores.map((score) => Math.round(score * 25))}
              variant="bars"
            />
            <div className="space-y-3">
              {employeeDetail.categoryRows.map((row) => {
                const percentage = Math.round(Number(row.weighted) * 25)

                return (
                  <div key={row.category}>
                    <div className="mb-1 flex items-center justify-between gap-3 text-sm">
                      <span className="text-foreground">{row.category}</span>
                      <span className="font-medium text-muted-foreground">{row.weighted}</span>
                    </div>
                    <div className="h-2.5 overflow-hidden rounded-full bg-muted">
                      <div className="h-full rounded-full bg-emerald-500/75" style={{ width: `${percentage}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <Card className="border-dashed border-foreground/20">
          <CardHeader>
            <CardTitle>Strengths summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {employeeDetail.strengths.map((item) => (
              <div className="rounded-lg border border-border/70 bg-background/75 p-4 text-sm leading-6 text-foreground" key={item}>
                {item}
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="border-dashed border-foreground/20">
          <CardHeader>
            <CardTitle>Blockers summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {employeeDetail.blockers.map((item) => (
              <div className="rounded-lg border border-border/70 bg-background/75 p-4 text-sm leading-6 text-foreground" key={item}>
                {item}
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.25fr_0.95fr]">
        <Card className="border-dashed border-foreground/20">
          <CardHeader>
            <CardTitle>Development action plan</CardTitle>
            <CardDescription>
              Actions should translate review outputs into concrete follow-up and coaching continuity.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {employeeDetail.actions.map((action) => (
              <div className="rounded-lg border border-border/70 bg-background/75 p-4 text-sm leading-6 text-foreground" key={action}>
                {action}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-dashed border-foreground/20">
          <CardHeader>
            <CardTitle>Restricted manager-only notes</CardTitle>
            <CardDescription>
              This section should remain hidden from unauthorized viewers and never leak into summary views.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {context.canSeeManagerNotes ? (
              employeeDetail.managerOnly.map((note) => (
                <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-4 text-sm leading-6 text-foreground" key={note}>
                  {note}
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-border/70 bg-background/75 p-4 text-sm leading-6 text-muted-foreground">
                Manager-only narrative is hidden for this audience. HR can still review the category breakdown and formal development actions.
              </div>
            )}
            <div className="rounded-lg border border-border/70 bg-background/75 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Previous cycle trend
              </p>
              <div className="mt-4 space-y-3">
                {employeeDetail.previousCycles.map((cycle) => (
                  <div className="flex items-center justify-between gap-3 text-sm" key={cycle.label}>
                    <span className="text-muted-foreground">{cycle.label}</span>
                    <span className="font-semibold text-foreground">{cycle.score}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="border-t border-border/70 pt-4 text-xs italic leading-6 text-muted-foreground">
        Employee detail should support coaching continuity and calibration decisions, while keeping manager-only notes, calibration flags, and comparative context separated from summary-level reporting.
      </section>
    </div>
  )
}