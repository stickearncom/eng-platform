import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Download, PlayCircle } from 'lucide-react'

import { usePlatformStore } from '@/app/store/use-platform-store'
import { DistributionChart, TrendChart } from '@/shared/components/chart-cards'
import { FilterToolbar } from '@/shared/components/filter-toolbar'
import { MetricDefinitionDrawer } from '@/shared/components/metric-definition-drawer'
import { PagePurposeStrip } from '@/shared/components/page-purpose-strip'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { audienceContexts } from '@/shared/config/audience'
import { findMetricDictionaryEntry, type MetricDictionaryEntry } from '@/shared/mocks/metric-dictionary'
import { getPeopleGrowthData } from '@/shared/mocks/people-growth'

export function PeopleGrowthSummaryPage() {
  const [selectedMetric, setSelectedMetric] = useState<MetricDictionaryEntry | null>(null)
  const audience = usePlatformStore((state) => state.audience)
  const context = audienceContexts[audience]
  const filters = usePlatformStore((state) => state.filters)
  const { analyticsTabs, commonGrowthAreas, employees, gapTrend, confidenceTrend, peopleGrowthStats, restrictedCards, teamSummaryRows, topStrengths } = getPeopleGrowthData(audience, filters)
  const audienceTags = ['HR', 'Eng Manager', 'Head of Eng']
  const trendLabels = ['H2', 'Q1', 'Q2', 'Q3', 'Q4']
  const [activeTab, setActiveTab] = useState(analyticsTabs[0] ?? 'Category Trends')
  const selectedTab = analyticsTabs.includes(activeTab) ? activeTab : (analyticsTabs[0] ?? 'Category Trends')

  const analyticsContentByTab = {
    'Category Trends': (
      <div className="grid gap-6 md:grid-cols-2">
        <TrendChart
          labels={trendLabels}
          note="Track how category scores change over review cycles and identify improving or declining areas."
          onOpenDefinition={() => setSelectedMetric(findMetricDictionaryEntry('Category Score Trends', 'People Growth') ?? null)}
          title="Category Score Trends"
          tone="default"
          values={gapTrend}
          variant="area"
        />

        <TrendChart
          labels={trendLabels}
          note="Read overall improvement momentum and spot where category movement starts to flatten."
          onOpenDefinition={() => setSelectedMetric(findMetricDictionaryEntry('Review Momentum', 'People Growth') ?? null)}
          title="Review Momentum"
          tone="success"
          values={gapTrend.map((value, index) => Math.min(100, value + 8 + index * 3))}
          variant="line"
        />
      </div>
    ),
    'Score Distribution': (
      <div className="grid gap-6 md:grid-cols-2">
        <DistributionChart
          benchmarkLabel="Review spread by cycle"
          labels={trendLabels}
          note="Distribution of final scores across the organization."
          onOpenDefinition={() => setSelectedMetric(findMetricDictionaryEntry('Review Score Distribution', 'People Growth') ?? null)}
          title="Review Score Distribution"
          tone="success"
          values={gapTrend.map((value, index) => value + index * 4)}
        />

        <DistributionChart
          benchmarkLabel="Readiness concentration"
          labels={trendLabels}
          note="Shows how many employees are clustering in stronger readiness bands over time."
          onOpenDefinition={() => setSelectedMetric(findMetricDictionaryEntry('Growth Readiness Distribution', 'People Growth') ?? null)}
          title="Growth Readiness Distribution"
          tone="default"
          values={gapTrend.map((value, index) => Math.min(100, value + 12 + index * 5))}
        />
      </div>
    ),
    'Gap Analysis': (
      <div className="grid gap-6 md:grid-cols-2">
        <TrendChart
          labels={trendLabels}
          note="Compare self-assessment with peer and manager scores to highlight perception gaps."
          onOpenDefinition={() => setSelectedMetric(findMetricDictionaryEntry('Self vs Peer vs Manager Gap', 'People Growth') ?? null)}
          title="Self vs Peer vs Manager Gap"
          tone="alert"
          values={confidenceTrend}
          variant="line"
        />

        <TrendChart
          labels={trendLabels}
          note="Low-confidence patterns often point to evidence gaps, not just scoring disagreement."
          onOpenDefinition={() => setSelectedMetric(findMetricDictionaryEntry('Confidence Gap Trend', 'People Growth') ?? null)}
          title="Confidence Gap Trend"
          tone="alert"
          values={confidenceTrend.map((value, index) => Math.max(6, value - index * 2 + 4))}
          variant="area"
        />
      </div>
    ),
    'Strengths & Areas': (
      <div className="grid gap-6 md:grid-cols-2">
        <TrendChart
          labels={trendLabels}
          note="Top strengths and most common growth areas identified across reviews."
          onOpenDefinition={() => setSelectedMetric(findMetricDictionaryEntry('Strengths & Areas', 'People Growth') ?? null)}
          title="Strengths & Areas"
          tone="default"
          values={confidenceTrend.map((value, index) => Math.max(20, value - index * 2))}
          variant="line"
        />

        <Card className="border-dashed border-foreground/20">
          <CardHeader>
            <CardTitle className="text-sm">Strengths vs Growth Areas</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Top Strengths</p>
              {topStrengths.map((item) => (
                <div className="flex justify-between rounded bg-muted/50 p-2 text-sm" key={item.label}>
                  <span>{item.label}</span>
                  <span className="text-muted-foreground">{item.value}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Common Growth Areas</p>
              {commonGrowthAreas.map((item) => (
                <div className="flex justify-between rounded bg-muted/50 p-2 text-sm" key={item.label}>
                  <span>{item.label}</span>
                  <span className="text-muted-foreground">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    ),
  } as const

  return (
    <div className="space-y-6">
      <MetricDefinitionDrawer entry={selectedMetric} open={selectedMetric !== null} onClose={() => setSelectedMetric(null)} />
      <section className="space-y-3">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground md:text-3xl">People Growth Summary</h1>
            <p className="mt-2 max-w-4xl text-sm italic leading-6 text-muted-foreground">
              Provides HR and engineering managers with a view of growth progression and review-cycle health. Supports calibration decisions, coaching plans, and confidentiality-aware follow-up.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-muted-foreground">Audience:</span>
            {audienceTags.map((tag) => (
              <Badge className="rounded-md px-2.5 py-1" key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <PagePurposeStrip
        audience={audience}
        boundary={{
          executive: 'Leadership access should stay at approved summary level only. Comparative, calibration, and manager-only detail must remain hidden.',
          'engineering-manager': 'Use this page for coaching continuity, calibration input, and development follow-up. Do not merge delivery activity into review scoring.',
          'scrum-master': 'This page is not part of Scrum Master workflow because confidential review data should stay outside delivery operations.',
          hr: 'Primary governance workspace for calibration cadence, review completion, and confidentiality-aware people decisions.',
        }}
        primaryAudience={{
          executive: 'Approved leadership viewers of aggregate people signals.',
          'engineering-manager': 'Engineering Managers and Head of Engineering.',
          'scrum-master': 'Not a primary audience for this module.',
          hr: 'HR and selected people-review stakeholders.',
        }}
        purpose={{
          executive: 'Provides an approved summary of people growth signals so leadership can understand trend direction without opening confidential employee detail.',
          'engineering-manager': 'Provides growth tracking and review-cycle health to support calibration decisions, coaching plans, and follow-up actions.',
          'scrum-master': 'Provides restricted people-growth context only when governance allows summary-level visibility.',
          hr: 'Provides HR with growth tracking and review-cycle health to support calibration, policy governance, and development planning.',
        }}
      />

      <FilterToolbar keys={['reviewCycle', 'team', 'role', 'level']} />

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Review Cycle Overview</h2>
          <p className="mt-1 text-xs italic text-muted-foreground">Key metrics for current review cycle.</p>
        </div>

        <div className="grid gap-4 xl:grid-cols-5">
        {peopleGrowthStats.map((metric) => (
          <Card className="border-dashed border-foreground/20" key={metric.title}>
            <CardHeader className="pb-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">{metric.title}</div>
              <div className="flex items-center gap-2">
                <p className="text-3xl font-bold text-foreground">{metric.value}</p>
                <Badge variant={metric.delta === 'Up' ? 'success' : 'outline'}>{metric.delta}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs italic leading-5 text-muted-foreground">{metric.note}</p>
              {findMetricDictionaryEntry(metric.title, 'People Growth') ? (
                <button aria-label={`Open definition for ${metric.title}`} className="mt-4 inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground" title={`Definition: ${metric.title}`} type="button" onClick={() => setSelectedMetric(findMetricDictionaryEntry(metric.title, 'People Growth') ?? null)}>
                  <span className="sr-only">Open definition</span>
                  <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M12 10v6" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
                    <circle cx="12" cy="7.25" fill="currentColor" r="1.1" />
                  </svg>
                </button>
              ) : null}
            </CardContent>
          </Card>
        ))}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Growth Analytics</h2>
          <p className="mt-1 text-xs italic text-muted-foreground">Visual analysis of review scores and growth trends.</p>
        </div>

        <div aria-label="Growth analytics tabs" className="flex flex-wrap items-center gap-1 border-b border-border/70" role="tablist">
          {analyticsTabs.map((tab) => (
            <button
              aria-selected={selectedTab === tab}
              className={selectedTab === tab ? 'border-b-2 border-foreground px-4 py-2 text-sm font-medium text-foreground' : 'border-b-2 border-transparent px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground'}
              key={tab}
              role="tab"
              type="button"
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {analyticsContentByTab[selectedTab as keyof typeof analyticsContentByTab]}
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <Card className="border-dashed border-foreground/20">
          <CardHeader>
            <CardTitle className="text-sm">Top Organizational Strengths</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {topStrengths.map((item) => (
              <div className="flex justify-between rounded bg-muted/50 p-2 text-sm" key={item.label}>
                <span>{item.label}</span>
                <span className="text-muted-foreground">{item.value}</span>
              </div>
            ))}
            <div className="border-t border-border/70 pt-3 text-xs italic text-muted-foreground">Most frequently identified strengths.</div>
          </CardContent>
        </Card>

        <Card className="border-dashed border-foreground/20">
          <CardHeader>
            <CardTitle className="text-sm">Common Growth Areas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {commonGrowthAreas.map((item) => (
              <div className="flex justify-between rounded bg-muted/50 p-2 text-sm" key={item.label}>
                <span>{item.label}</span>
                <span className="text-muted-foreground">{item.value}</span>
              </div>
            ))}
            <div className="border-t border-border/70 pt-3 text-xs italic text-muted-foreground">Most frequently identified improvement areas.</div>
          </CardContent>
        </Card>
      </section>

      <Card className="border-foreground/30 bg-foreground/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <span className="rounded bg-foreground/10 px-2 py-0.5 text-xs">RESTRICTED</span>
            Confidential Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            This section contains sensitive performance data. Access remains restricted based on role permissions. {context.canSeeManagerNotes ? 'Current audience can view deeper restricted narratives.' : 'Current audience sees only placeholders and visibility rules.'}
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {restrictedCards.map((card) => (
              <Card className="border-dashed border-foreground/20" key={card.title}>
                <CardHeader>
                  <CardTitle className="text-sm">{card.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex h-20 items-center justify-center rounded border border-dashed border-border bg-foreground/5 text-xs text-muted-foreground">
                    [Restricted Content]
                  </div>
                  <div className="mt-3 border-t border-border/70 pt-3 text-xs italic text-muted-foreground">{card.visibility}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Team Review Summary</h2>
          <p className="mt-1 text-xs italic text-muted-foreground">Aggregated review data per team. Click to drill down.</p>
        </div>

        <Card className="border-dashed border-foreground/20">
          <CardContent className="overflow-x-auto p-4">
            <table className="data-table min-w-full text-left text-sm">
              <thead>
                <tr className="text-muted-foreground">
                  <th className="pb-3 pr-4 font-medium">Team</th>
                  <th className="pb-3 pr-4 font-medium">Employees</th>
                  <th className="pb-3 pr-4 font-medium">Avg Score</th>
                  <th className="pb-3 pr-4 font-medium">Completed %</th>
                  <th className="pb-3 pr-4 font-medium">Low Confidence</th>
                  <th className="pb-3 font-medium">Calibration Needed</th>
                </tr>
              </thead>
              <tbody>
                {teamSummaryRows.map((row) => (
                  <tr key={row.team}>
                    <td className="py-3 pr-4">{row.team}</td>
                    <td className="py-3 pr-4">{row.employees}</td>
                    <td className="py-3 pr-4">{row.avgScore}</td>
                    <td className="py-3 pr-4">{row.completed}</td>
                    <td className="py-3 pr-4">{row.lowConfidence}</td>
                    <td className="py-3">{row.calibrationNeeded}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-3 border-t border-border/70 pt-3 text-xs italic text-muted-foreground">Click team row to see individual employee summaries.</div>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Employee Directory</h2>
            <p className="mt-1 text-xs italic text-muted-foreground">Click employee to view detailed review.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
            <Button variant="outline">
              <PlayCircle className="mr-2 h-4 w-4" />
              Start Calibration
            </Button>
          </div>
        </div>

        <Card className="border-dashed border-foreground/20">
          <CardContent className="overflow-x-auto p-4">
            <table className="data-table min-w-full text-left text-sm">
              <thead>
                <tr className="text-muted-foreground">
                  <th className="pb-3 pr-4 font-medium">Employee</th>
                  <th className="pb-3 pr-4 font-medium">Role</th>
                  <th className="pb-3 pr-4 font-medium">Level</th>
                  <th className="pb-3 pr-4 font-medium">Team</th>
                  <th className="pb-3 pr-4 font-medium">Final Score</th>
                  <th className="pb-3 pr-4 font-medium">Status</th>
                  <th className="pb-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.id}>
                    <td className="py-3 pr-4">{employee.name}</td>
                    <td className="py-3 pr-4">{employee.role}</td>
                    <td className="py-3 pr-4">{employee.level}</td>
                    <td className="py-3 pr-4">{employee.team}</td>
                    <td className="py-3 pr-4">{employee.finalScore}</td>
                    <td className="py-3 pr-4">
                      <Badge variant={employee.status === 'Complete' ? 'success' : 'outline'}>{employee.status}</Badge>
                    </td>
                    <td className="py-3">
                      {context.canOpenPeopleDetail ? (
                        <Link className="underline" to={`/people-growth/employees/${employee.id}`}>View Detail</Link>
                      ) : (
                        <span className="text-muted-foreground">Restricted</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </section>

      <section className="border-t border-border/70 pt-4 text-xs italic leading-6 text-muted-foreground">
        People Growth is separate from Delivery Insights for data sensitivity. It supports coaching and calibration workflows, with confidential data clearly labeled and access-controlled.
      </section>
    </div>
  )
}