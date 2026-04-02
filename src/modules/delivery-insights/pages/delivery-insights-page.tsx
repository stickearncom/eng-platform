import { ChevronRight } from 'lucide-react'

import { usePlatformStore } from '@/app/store/use-platform-store'
import { CapacityChart, DistributionChart, TrendChart } from '@/shared/components/chart-cards'
import { FilterToolbar } from '@/shared/components/filter-toolbar'
import { Badge } from '@/shared/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { audienceContexts } from '@/shared/config/audience'
import { getDeliveryInsightsData } from '@/shared/mocks/delivery-insights'

export function DeliveryInsightsPage() {
  const audience = usePlatformStore((state) => state.audience)
  const context = audienceContexts[audience]
  const filters = usePlatformStore((state) => state.filters)
  const { analyticsTabs, capacityPlanning, crossTeamDependencies, deliveryMetricCards, firstWaveMetrics, healthBreakdownRows, sharedResourceAllocation, teamDrilldown } = getDeliveryInsightsData(filters)
  const audienceTags = ['Eng Manager', 'Scrum Master', 'Head of Eng']
  const trendLabels = ['S-4', 'S-3', 'S-2', 'S-1', 'Now']

  return (
    <div className="space-y-6">
      <section className="space-y-3">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground md:text-3xl">Delivery Insights</h1>
            <p className="mt-2 max-w-4xl text-sm italic leading-6 text-muted-foreground">
              Sprint and delivery analysis for engineering managers. Focus on team-level visibility, not individual scoring.
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

      <FilterToolbar keys={['board', 'sprint', 'team', 'engineer', 'ticketType', 'issueType', 'addedAt']} />

      <Card className="border-foreground/20 bg-muted/50">
        <CardContent className="p-4">
          <div className="flex items-start gap-2 text-sm">
            <span className="font-medium text-foreground">Note:</span>
            <span className="text-muted-foreground">
              Engineer-level data is shown only for investigation purposes, not for performance scoring. Use People Growth for evaluation. {context.supportingNote}
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

        <div className="flex flex-wrap items-center gap-1 border-b border-border/70">
          {analyticsTabs.map((tab, index) => (
            <div
              className={index === 0 ? 'border-b-2 border-foreground px-4 py-2 text-sm font-medium text-foreground' : 'border-b-2 border-transparent px-4 py-2 text-sm text-muted-foreground'}
              key={tab}
            >
              {tab}
            </div>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
            {firstWaveMetrics.map((metric, index) => (
              index % 3 === 2 ? (
                <DistributionChart
                  benchmarkLabel="Execution distribution"
                  key={metric.title}
                  labels={trendLabels}
                  note={metric.note}
                  title={metric.title}
                  tone="alert"
                  values={metric.values}
                />
              ) : (
                <TrendChart
                  key={metric.title}
                  labels={trendLabels}
                  note={metric.note}
                  title={metric.title}
                  tone={index % 3 === 1 ? 'success' : 'default'}
                  values={metric.values}
                  variant={index % 3 === 0 ? 'area' : 'line'}
                />
              )
            ))}
        </div>
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
                <th className="pb-3 pr-4 font-medium">Velocity</th>
                <th className="pb-3 pr-4 font-medium">Scope Change</th>
                <th className="pb-3 pr-4 font-medium">Carry-over</th>
                <th className="pb-3 pr-4 font-medium">Health Score</th>
                <th className="pb-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teamDrilldown.map((row) => (
                <tr key={row.team}>
                  <td className="py-4 pr-4 font-medium text-foreground">{row.team}</td>
                  <td className="py-4 pr-4">{row.sprint}</td>
                  <td className="py-4 pr-4">{row.velocity}</td>
                  <td className="py-4 pr-4">{row.scopeChange}</td>
                  <td className="py-4 pr-4">{row.carryOver}</td>
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