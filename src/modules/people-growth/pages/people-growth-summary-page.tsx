import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Download, PlayCircle } from 'lucide-react'

import { usePlatformStore } from '@/app/store/use-platform-store'
import { DistributionChart, TrendChart } from '@/shared/components/chart-cards'
import { FilterToolbar } from '@/shared/components/filter-toolbar'
import { MetricDefinitionButton } from '@/shared/components/metric-definition-button'
import { MetricDefinitionDrawer } from '@/shared/components/metric-definition-drawer'
import { PagePurposeStrip } from '@/shared/components/page-purpose-strip'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { findMetricDictionaryEntry, type MetricDictionaryEntry } from '@/shared/mocks/metric-dictionary'
import { getPeopleGrowthData } from '@/shared/mocks/people-growth'

export function PeopleGrowthSummaryPage() {
  const [selectedMetric, setSelectedMetric] = useState<MetricDictionaryEntry | null>(null)
  const filters = usePlatformStore((state) => state.filters)
  const { analyticsTabs, calibrationCount, categoryTrend, collaborationTrend, commonGrowthAreas, employees, lowConfidenceCount, ownershipTrend, peopleGrowthStats, restrictedCards, reviewCompletion, reviewHealthTrend, selfReflection, teamSummaryRows, topStrengths } = getPeopleGrowthData(filters)
  const stakeholderTags = ['HR', 'Engineering Manager', 'Head of Engineering / VP Engineering']
  const trendLabels = ['H2', 'Q1', 'Q2', 'Q3', 'Q4']
  const [activeTab, setActiveTab] = useState(analyticsTabs[0] ?? 'Category Trends')
  const selectedTab = analyticsTabs.includes(activeTab) ? activeTab : (analyticsTabs[0] ?? 'Category Trends')

  const analyticsContentByTab = {
    'Category Trends': (
      <div className="grid gap-6 md:grid-cols-2">
        <TrendChart
          labels={trendLabels}
          note="Shows how delivery and technical category signals move across review cycles." 
          onOpenDefinition={() => setSelectedMetric(findMetricDictionaryEntry('Manager Delivery Reliability Score', 'People Growth') ?? null)}
          title="Manager Delivery Reliability Score"
          tone="default"
          values={categoryTrend}
          variant="area"
        />

        <TrendChart
          labels={trendLabels}
          note="Tracks manager-scored technical quality to see whether quality expectations are rising consistently." 
          onOpenDefinition={() => setSelectedMetric(findMetricDictionaryEntry('Manager Technical Quality Score', 'People Growth') ?? null)}
          title="Manager Technical Quality Score"
          tone="success"
          values={categoryTrend.map((value, index) => Math.min(100, value + 6 + index * 2))}
          variant="line"
        />
      </div>
    ),
    'Collaboration Signals': (
      <div className="grid gap-6 md:grid-cols-2">
        <DistributionChart
          benchmarkLabel="Peer collaboration trend"
          labels={trendLabels}
          note="Shows whether peer-observed collaboration and communication quality is strengthening over time."
          onOpenDefinition={() => setSelectedMetric(findMetricDictionaryEntry('Peer Communication and Collaboration Score', 'People Growth') ?? null)}
          title="Peer Communication and Collaboration Score"
          tone="success"
          values={collaborationTrend}
        />

        <DistributionChart
          benchmarkLabel="Manager coordination trend"
          labels={trendLabels}
          note="Tracks manager-observed coordination effectiveness across teams and review cycles."
          onOpenDefinition={() => setSelectedMetric(findMetricDictionaryEntry('Manager Coordination Effectiveness Score', 'People Growth') ?? null)}
          title="Manager Coordination Effectiveness Score"
          tone="default"
          values={collaborationTrend.map((value, index) => Math.max(20, value - 6 + index))}
        />
      </div>
    ),
    'Ownership & Growth': (
      <div className="grid gap-6 md:grid-cols-2">
        <TrendChart
          labels={trendLabels}
          note="Tracks ownership and initiative signal to see whether engineers are taking broader responsibility over time."
          onOpenDefinition={() => setSelectedMetric(findMetricDictionaryEntry('Manager Ownership Score', 'People Growth') ?? null)}
          title="Manager Ownership Score"
          tone="success"
          values={ownershipTrend}
          variant="line"
        />

        <TrendChart
          labels={trendLabels}
          note={`Manager growth score and self-reflection should be read together. Current self reflection average is ${selfReflection}/5.`}
          onOpenDefinition={() => setSelectedMetric(findMetricDictionaryEntry('Manager Growth Score', 'People Growth') ?? null)}
          title="Manager Growth Score"
          tone="default"
          values={ownershipTrend.map((value, index) => Math.max(18, value - 8 + index * 2))}
          variant="area"
        />
      </div>
    ),
    'Review Cycle Health': (
      <div className="grid gap-6 md:grid-cols-2">
        <DistributionChart
          benchmarkLabel={`Review completion ${reviewCompletion}`}
          labels={trendLabels}
          note={`Low-confidence flags are currently ${lowConfidenceCount} and calibration queue is ${calibrationCount}.`}
          onOpenDefinition={() => setSelectedMetric(findMetricDictionaryEntry('Self Growth Reflection Score', 'People Growth') ?? null)}
          title="Self Growth Reflection Score"
          tone="default"
          values={reviewHealthTrend.map((value) => Math.max(12, 100 - value))}
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
            <span className="text-xs text-muted-foreground">Primary stakeholders:</span>
            {stakeholderTags.map((tag) => (
              <Badge className="rounded-md px-2.5 py-1" key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <PagePurposeStrip
        boundary="Use this page for growth tracking, review-cycle health, calibration preparation, and coaching follow-up. Confidential detail stays clearly marked and permission-controlled."
        primaryAudience="HR, Engineering Managers, Head of Engineering / VP Engineering, and approved viewers of aggregate people signals."
        purpose="Provides a structured view of people growth, review-cycle health, and development follow-up without mixing delivery activity into performance interpretation."
      />

      <FilterToolbar keys={['reviewCycle', 'team', 'role', 'level']} />

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Review Cycle Overview</h2>
          <p className="mt-1 text-xs italic text-muted-foreground">Primary People Growth metrics exposed in the MVP dashboard.</p>
        </div>

        <div className="grid gap-4 xl:grid-cols-3">
        {peopleGrowthStats.map((metric) => (
          <Card className="relative border-dashed border-foreground/20" key={metric.title}>
            {findMetricDictionaryEntry(metric.title, 'People Growth') ? (
              <MetricDefinitionButton metricTitle={metric.title} onClick={() => setSelectedMetric(findMetricDictionaryEntry(metric.title, 'People Growth') ?? null)} />
            ) : null}
            <CardHeader className="pb-4 pr-12">
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">{metric.title}</div>
              <div className="flex items-center gap-2">
                <p className="text-3xl font-bold text-foreground">{metric.value}</p>
                <Badge variant={metric.trendTone === 'positive' ? 'success' : metric.trendTone === 'negative' ? 'alert' : 'outline'}>{metric.trend}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs italic leading-5 text-muted-foreground">{metric.note}</p>
            </CardContent>
          </Card>
        ))}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Growth Analytics</h2>
          <p className="mt-1 text-xs italic text-muted-foreground">Visual analysis of category-aligned review metrics and review-cycle health.</p>
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
            This section contains sensitive performance data. The prototype keeps the most sensitive outputs as placeholders, while production access remains permission-controlled.
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
                  <th className="pb-3 pr-4 font-medium">Avg Growth Summary</th>
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
                  <th className="pb-3 pr-4 font-medium">Cycle Summary</th>
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
                      <Link className="underline" to={`/people-growth/employees/${employee.id}`}>View Detail</Link>
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