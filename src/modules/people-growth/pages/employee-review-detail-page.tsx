import { ChevronLeft } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

import { AccessNote } from '@/shared/components/access-note'
import { MiniTrend } from '@/shared/components/mini-trend'
import { PagePurposeStrip } from '@/shared/components/page-purpose-strip'
import { Badge } from '@/shared/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'
import { getEmployeeDetail, getPeopleRoster } from '@/shared/mocks/people-growth'

export function EmployeeReviewDetailPage() {
  const { employeeId } = useParams()
  const employees = getPeopleRoster()
  const employee = employees.find((item) => item.id === employeeId) ?? employees[0]
  const employeeDetail = getEmployeeDetail(employee.id)
  const previousCycleLabels = employeeDetail.previousCycles.map((cycle) => cycle.label)
  const previousCycleValues = employeeDetail.previousCycles.map((cycle) => Math.round(Number(cycle.score) * 25))
  const categoryScores = employeeDetail.categoryRows.map((row) => Number(row.weighted))
  const strongestCategory = employeeDetail.categoryRows.reduce((highest, row) => (Number(row.weighted) > Number(highest.weighted) ? row : highest), employeeDetail.categoryRows[0])

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
            <Badge className="rounded-md px-2.5 py-1" variant="outline">Manager / HR Workflow</Badge>
            <Badge className="rounded-md px-2.5 py-1" variant={employee.confidence === 'Low confidence' ? 'alert' : 'success'}>
              {employee.confidence}
            </Badge>
            <Badge className="rounded-md px-2.5 py-1" variant="outline">{employee.status}</Badge>
          </div>
        </div>
      </section>

      <PagePurposeStrip
        boundary="Use this page for employee-level coaching and review follow-through. Manager-only notes, calibration flags, and comparative context stay permission-controlled."
        primaryAudience="Engineering Managers and HR."
        purpose="Provides a detailed employee review view with category breakdown, evidence, peer feedback, and development planning inside the People Growth workflow."
      />

      <AccessNote
        description="This page represents the detailed manager and HR workflow for employee review follow-up, coaching continuity, and calibration preparation."
        focus="Confidential detail and follow-up"
        moduleLabel="Individual review detail"
        note="In production, access to manager-only notes and comparative context remains permission-controlled even when this workflow is available."
      />

      <section className="grid gap-4 xl:grid-cols-4">
        <Card className="border-dashed border-foreground/20">
          <CardHeader className="pb-4">
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Cycle Summary</div>
            <p className="text-3xl font-bold text-foreground">{employee.finalScore}</p>
            <CardDescription>Private review synthesis from self, peer, and manager evidence. This is not exposed as a leadership KPI.</CardDescription>
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
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Strongest Category Signal</div>
            <p className="text-lg font-semibold text-foreground">{strongestCategory.category}</p>
            <CardDescription>Review synthesis score {strongestCategory.weighted}</CardDescription>
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
                This detailed workflow can include coaching narrative and protected follow-up context. Production access remains limited to approved reviewers.
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
          <CardTitle>Category review breakdown</CardTitle>
          <CardDescription>
            Detailed review inputs remain interpretable because self, peer, manager, and synthesis values are shown together.
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
                  <th className="pb-3 font-medium">Review Synthesis</th>
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
            <CardTitle>Category profile</CardTitle>
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
            {employeeDetail.managerOnly.map((note) => (
              <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-4 text-sm leading-6 text-foreground" key={note}>
                {note}
              </div>
            ))}
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
        Employee detail should support coaching continuity and calibration decisions, while keeping private review synthesis, manager-only notes, and comparative context separated from summary-level reporting.
      </section>
    </div>
  )
}