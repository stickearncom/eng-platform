import { useState } from 'react'
import { ChevronRight } from 'lucide-react'

import { usePlatformStore } from '@/app/store/use-platform-store'
import { CapacityChart, DistributionChart, TrendChart } from '@/shared/components/chart-cards'
import { FilterToolbar } from '@/shared/components/filter-toolbar'
import { MetricDefinitionButton } from '@/shared/components/metric-definition-button'
import { MetricDefinitionDrawer } from '@/shared/components/metric-definition-drawer'
import { PagePurposeStrip } from '@/shared/components/page-purpose-strip'
import { Badge } from '@/shared/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { findMetricDictionaryEntry, type MetricDictionaryEntry } from '@/shared/mocks/metric-dictionary'
import { getDeliveryInsightsData } from '@/shared/mocks/delivery-insights'

export function DeliveryInsightsPage() {
  const [selectedMetric, setSelectedMetric] = useState<MetricDictionaryEntry | null>(null)
  const filters = usePlatformStore((state) => state.filters)
  const { analyticsTabs, capacityPlanning, crossTeamDependencies, deliveryMetricCards, deliveryPanels, firstWaveMetrics, healthBreakdownRows, sharedResourceAllocation, teamDrilldown } = getDeliveryInsightsData(filters)
  const stakeholderTags = ['Engineering Manager', 'Scrum Master', 'Head of Engineering / VP Engineering']
  const trendLabels = ['S-4', 'S-3', 'S-2', 'S-1', 'Now']
  const [activeTab, setActiveTab] = useState(analyticsTabs[0] ?? 'Planning Stability')
  const selectedTab = analyticsTabs.includes(activeTab) ? activeTab : (analyticsTabs[0] ?? 'Planning Stability')

  const analyticsContentByTab = {
    'Planning Stability': (
      <div className="grid gap-6 md:grid-cols-2">
        <TrendChart
          labels={trendLabels}
          note={firstWaveMetrics[0]?.note ?? 'Scope movement over the sprint.'}
          onOpenDefinition={() => setSelectedMetric(findMetricDictionaryEntry(firstWaveMetrics[0]?.title ?? 'Scope Change Ratio', 'Delivery Insights') ?? null)}
          title={firstWaveMetrics[0]?.title ?? 'Scope Change Ratio'}
          tone="default"
          values={firstWaveMetrics[0]?.values ?? [28, 24, 21, 20, 19]}
          variant="area"
        />
        <DistributionChart
          benchmarkLabel="Carry-over pressure"
          labels={trendLabels}
          note={firstWaveMetrics[2]?.note ?? 'Root causes behind spillover and unfinished work.'}
          onOpenDefinition={() => setSelectedMetric(findMetricDictionaryEntry(firstWaveMetrics[2]?.title ?? 'Carry-over Rate', 'Delivery Insights') ?? null)}
          title={firstWaveMetrics[2]?.title ?? 'Carry-over Rate'}
          tone="alert"
          values={firstWaveMetrics[2]?.values ?? [40, 36, 31, 26, 24]}
        />
      </div>
    ),
    'Delivery Predictability': (
      <div className="grid gap-6 md:grid-cols-2">
        <TrendChart
          labels={trendLabels}
          note={firstWaveMetrics[1]?.note ?? 'Historical comparison of committed scope versus completed initial scope.'}
          onOpenDefinition={() => setSelectedMetric(findMetricDictionaryEntry(firstWaveMetrics[1]?.title ?? 'Sprint Predictability', 'Delivery Insights') ?? null)}
          title={firstWaveMetrics[1]?.title ?? 'Sprint Predictability'}
          tone="success"
          values={firstWaveMetrics[1]?.values ?? [57, 63, 69, 77, 84]}
          variant="line"
        />
        <CapacityChart
          buffer={capacityPlanning.buffer}
          committed={capacityPlanning.committed}
          committedPercent={capacityPlanning.committedPercent}
          labels={trendLabels}
          note="Use this view to judge whether next sprint commitments are aligned with actual team capacity."
          onOpenDefinition={() => setSelectedMetric(findMetricDictionaryEntry('Capacity Load vs Available Capacity', 'Delivery Insights') ?? null)}
          title="Capacity Load vs Available Capacity"
          totalCapacity={capacityPlanning.totalCapacity}
          values={firstWaveMetrics[1]?.values ?? [55, 60, 66, 72, 78]}
        />
      </div>
    ),
    'Carry-over Analysis': (
      <div className="grid gap-6 md:grid-cols-2">
        <DistributionChart
          benchmarkLabel="Carry-over documentation coverage"
          labels={trendLabels}
          note="Use this view to judge whether spillover is being documented clearly enough to support sprint follow-up."
          onOpenDefinition={() => setSelectedMetric(findMetricDictionaryEntry('Carry-over With Documented Reason Rate', 'Delivery Insights') ?? null)}
          title="Carry-over With Documented Reason Rate"
          tone="success"
          values={[61, 66, 69, 73, 76]}
        />
        <Card className="border-dashed border-foreground/20">
          <CardHeader>
            <CardTitle className="text-sm">Carry-over Context Panels</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            {deliveryPanels.map((panel) => (
              <div className="rounded-xl border border-border/70 bg-background/80 p-4" key={panel.title}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">{panel.title}</p>
                <div className="mt-3 space-y-2">
                  {panel.entries.map((entry) => (
                    <div className="flex justify-between gap-4 text-sm" key={entry.label}>
                      <span className="text-foreground">{entry.label}</span>
                      <span className="text-muted-foreground">{entry.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    ),
    Blockers: (
      <div className="grid gap-6 md:grid-cols-2">
        <DistributionChart
          benchmarkLabel="Blocker pressure over time"
          labels={trendLabels}
          note={firstWaveMetrics[3]?.note ?? 'Average blocked duration and blocker pressure over time.'}
          onOpenDefinition={() => setSelectedMetric(findMetricDictionaryEntry(firstWaveMetrics[3]?.title ?? 'Average Blocked Duration', 'Delivery Insights') ?? null)}
          title={firstWaveMetrics[3]?.title ?? 'Average Blocked Duration'}
          tone="alert"
          values={firstWaveMetrics[3]?.values ?? [22, 18, 19, 17, 14]}
        />
        <CapacityChart
          buffer={capacityPlanning.buffer}
          committed={capacityPlanning.committed}
          committedPercent={capacityPlanning.committedPercent}
          labels={trendLabels}
          note="Use capacity alongside blocker metrics to judge whether planned work still matches realistic execution conditions."
          onOpenDefinition={() => setSelectedMetric(findMetricDictionaryEntry('Capacity Load vs Available Capacity', 'Delivery Insights') ?? null)}
          title="Capacity Load vs Available Capacity"
          totalCapacity={capacityPlanning.totalCapacity}
          values={firstWaveMetrics[0]?.values ?? [55, 60, 66, 72, 78]}
        />
      </div>
    ),
  } as const

  return (
    <div className="space-y-6">
      <MetricDefinitionDrawer entry={selectedMetric} open={selectedMetric !== null} onClose={() => setSelectedMetric(null)} />
      <section className="space-y-3">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground md:text-3xl">Delivery Insights</h1>
            <p className="mt-2 max-w-4xl text-sm italic leading-6 text-muted-foreground">
              Helps engineering managers and scrum masters analyze sprint execution and team delivery patterns. Focuses on team-level metrics rather than individual performance scoring.
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
        boundary="Use this page for team execution diagnosis, blocker removal, and sprint follow-up. Delivery metrics are operational signals and should not be used as employee performance scores."
        primaryAudience="Engineering Managers, Scrum Masters, Head of Engineering / VP Engineering, and any stakeholder reviewing delivery health at team level."
        purpose="Helps teams analyze sprint execution, delivery flow, planning quality, and emerging execution risks through team-level metrics and drill-downs."
      />

      <FilterToolbar keys={['board', 'sprint', 'team', 'engineer', 'ticketType', 'issueType', 'addedAt']} />

      <Card className="border-foreground/20 bg-muted/50">
        <CardContent className="p-4">
          <div className="flex items-start gap-2 text-sm">
            <span className="font-medium text-foreground">Note:</span>
            <span className="text-muted-foreground">
              Engineer-level data is shown only for investigation, blocker removal, and operational follow-up, not for performance scoring. Use People Growth for evaluation and review governance.
            </span>
          </div>
        </CardContent>
      </Card>

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Sprint Overview</h2>
          <p className="mt-1 text-xs italic text-muted-foreground">Current sprint health and key delivery metrics.</p>
        </div>

        <div className="grid gap-4 xl:grid-cols-5">
        {deliveryMetricCards.map((metric) => (
          <Card className="relative border-dashed border-foreground/20" key={metric.title}>
            {findMetricDictionaryEntry(metric.title, 'Delivery Insights') ? (
              <MetricDefinitionButton metricTitle={metric.title} onClick={() => setSelectedMetric(findMetricDictionaryEntry(metric.title, 'Delivery Insights') ?? null)} />
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
          <h2 className="text-lg font-semibold text-foreground">Delivery Analytics</h2>
          <p className="mt-1 text-xs italic text-muted-foreground">Visual analysis of sprint execution and delivery patterns.</p>
        </div>

        <div aria-label="Delivery analytics tabs" className="flex flex-wrap items-center gap-1 border-b border-border/70" role="tablist">
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

      <section className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Sprint Health Score Breakdown</h2>
            <p className="mt-1 text-xs italic text-muted-foreground">Components that make up the sprint health score.</p>
          </div>

          <Card className="border-dashed border-foreground/20">
            <CardContent className="overflow-x-auto p-4">
              <table className="data-table min-w-full text-left text-sm">
                <thead>
                  <tr className="text-muted-foreground">
                    <th className="pb-3 pr-4 font-medium">Factor</th>
                    <th className="pb-3 pr-4 font-medium">Weight</th>
                    <th className="pb-3 pr-4 font-medium">Score</th>
                    <th className="pb-3 font-medium">Impact</th>
                  </tr>
                </thead>
                <tbody>
                  {healthBreakdownRows.map((row) => (
                    <tr key={row.factor}>
                      <td className="py-3 pr-4">{row.factor}</td>
                      <td className="py-3 pr-4">{row.weight}</td>
                      <td className="py-3 pr-4">{row.score}</td>
                      <td className="py-3">{row.impact}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Capacity Planning</h2>
            <p className="mt-1 text-xs italic text-muted-foreground">Optional capacity view.</p>
          </div>

          <CapacityChart
            buffer={capacityPlanning.buffer}
            committed={capacityPlanning.committed}
            committedPercent={capacityPlanning.committedPercent}
            labels={trendLabels}
            note="Shows team capacity versus load for planning next sprints."
            title="Capacity Planning"
            totalCapacity={capacityPlanning.totalCapacity}
            values={firstWaveMetrics[0]?.values ?? [55, 60, 66, 72, 78]}
          />
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Team Drill-down</h2>
          <p className="mt-1 text-xs italic text-muted-foreground">Detailed view per team. Click row to expand sprint details.</p>
        </div>

        <Card className="border-dashed border-foreground/20">
          <CardContent className="overflow-x-auto p-4">
            <table className="data-table min-w-full text-left text-sm">
            <thead>
              <tr className="text-muted-foreground">
                <th className="pb-3 pr-4 font-medium">Team</th>
                <th className="pb-3 pr-4 font-medium">Sprint</th>
                <th className="pb-3 pr-4 font-medium">Predictability</th>
                <th className="pb-3 pr-4 font-medium">Scope Change Ratio</th>
                <th className="pb-3 pr-4 font-medium">Carry-over Rate</th>
                <th className="pb-3 pr-4 font-medium">Blocked Ticket Ratio</th>
                <th className="pb-3 pr-4 font-medium">Health Score</th>
                <th className="pb-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teamDrilldown.map((row) => (
                <tr key={row.team}>
                  <td className="py-4 pr-4 font-medium text-foreground">{row.team}</td>
                  <td className="py-4 pr-4">{row.sprint}</td>
                  <td className="py-4 pr-4">{row.predictability}</td>
                  <td className="py-4 pr-4">{row.scopeChange}</td>
                  <td className="py-4 pr-4">{row.carryOver}</td>
                  <td className="py-4 pr-4">{row.blockedRatio}</td>
                  <td className="py-4 pr-4">{row.healthScore}</td>
                  <td className="py-4 text-foreground">
                    <span className="inline-flex items-center gap-1 text-sm">
                      {row.actions}
                      <ChevronRight className="h-4 w-4" />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
            <div className="mt-3 border-t border-border/70 pt-3 text-xs italic text-muted-foreground">
              Each row represents a team&apos;s sprint performance. Expandable for ticket-level detail.
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Cross-team Context</h2>
          <p className="mt-1 text-xs italic text-muted-foreground">Dependencies and shared resources across teams.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-dashed border-foreground/20">
            <CardHeader>
              <CardTitle className="text-sm">Cross-team Dependencies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {crossTeamDependencies.map((item) => (
                <div className="flex justify-between rounded bg-muted/50 p-2 text-sm" key={item.label}>
                  <span>{item.label}</span>
                  <span className="text-muted-foreground">{item.value}</span>
                </div>
              ))}
              <div className="border-t border-border/70 pt-3 text-xs italic text-muted-foreground">Tickets blocked by other teams.</div>
            </CardContent>
          </Card>

          <Card className="border-dashed border-foreground/20">
            <CardHeader>
              <CardTitle className="text-sm">Shared Resource Allocation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {sharedResourceAllocation.map((item) => (
                <div className="flex justify-between rounded bg-muted/50 p-2 text-sm" key={item.label}>
                  <span>{item.label}</span>
                  <span className="text-muted-foreground">{item.value}</span>
                </div>
              ))}
              <div className="border-t border-border/70 pt-3 text-xs italic text-muted-foreground">Engineers working across multiple teams.</div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="border-t border-border/70 pt-4 text-xs italic leading-6 text-muted-foreground">
        Delivery Insights focuses on sprint execution and team-level analysis. Engineer-level data, when shown, is for investigation only and not for performance evaluation.
      </section>
    </div>
  )
}