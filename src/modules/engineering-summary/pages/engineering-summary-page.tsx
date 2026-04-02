import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import { usePlatformStore } from '@/app/store/use-platform-store'
import { TrendChart } from '@/shared/components/chart-cards'
import { FilterToolbar } from '@/shared/components/filter-toolbar'
import { MetricDefinitionDrawer } from '@/shared/components/metric-definition-drawer'
import { PagePurposeStrip } from '@/shared/components/page-purpose-strip'
import { StatCard } from '@/shared/components/stat-card'
import { findMetricDictionaryEntry, type MetricDictionaryEntry } from '@/shared/mocks/metric-dictionary'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { getEngineeringSummaryData } from '@/shared/mocks/engineering-summary'

export function EngineeringSummaryPage() {
  const [selectedMetric, setSelectedMetric] = useState<MetricDictionaryEntry | null>(null)
  const filters = usePlatformStore((state) => state.filters)
  const { stakeholderTags, recommendedActions, summaryCards, summaryNarrative, trendPanels, riskHighlights, leadershipInsights, quickActions, teamHealthRows } = getEngineeringSummaryData(filters)
  const trendLabels = ['W1', 'W2', 'W3', 'W4', 'W5']
  const panelVariants: Array<'area' | 'line' | 'bars'> = ['area', 'area', 'line', 'bars']
  const panelTones: Array<'default' | 'success' | 'alert'> = ['default', 'success', 'default', 'alert']

  return (
    <div className="space-y-6">
      <MetricDefinitionDrawer entry={selectedMetric} open={selectedMetric !== null} onClose={() => setSelectedMetric(null)} />
      <section className="space-y-3">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground md:text-3xl">Engineering Summary</h1>
            <p className="mt-2 max-w-4xl text-sm italic leading-6 text-muted-foreground">
              Provides leadership and cross-functional stakeholders with a high-level view of engineering health. Emphasizes trends, risks, and actionable insights rather than raw operational detail.
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
        boundary="Use this page as the narrative entry point for engineering health. It highlights trends, risks, and actions without replacing operational module detail."
        primaryAudience="Leadership, Engineering Managers, HR, and cross-functional stakeholders who need a high-level engineering narrative before drilling deeper."
        purpose="Provides a high-level view of engineering health across delivery, quality, flow, collaboration, and approved people signals."
      />

      <FilterToolbar keys={['dateRange', 'team', 'role', 'level', 'reviewCycle']} />

      <Card className="border-foreground/20 bg-muted/50">
        <CardContent className="p-4">
          <div className="grid gap-4 xl:grid-cols-[1.4fr_0.9fr_0.9fr]">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Executive summary</p>
              <p className="mt-2 text-base font-semibold leading-7 text-foreground">{summaryNarrative.headline}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{summaryNarrative.summary}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Leadership context</p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">Use this page to understand engineering direction, decision risk, and the few issues that need leadership attention before moving into delivery or people drill-downs.</p>
            </div>
            <div className="rounded-xl border border-border/70 bg-background/80 px-4 py-3 text-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Focus</p>
              <p className="mt-1 font-medium text-foreground">Engineering health, decision risk, and next actions</p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{summaryNarrative.implication}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Goal Status Overview</h2>
          <p className="mt-1 text-xs italic text-muted-foreground">Explicit engineering goals with current value, target, and stakeholder-ready status framing.</p>
        </div>

        <div className="grid gap-4 xl:grid-cols-5">
          {summaryCards.map((card) => (
            <StatCard
              key={card.title}
              {...card}
              onOpenDefinition={findMetricDictionaryEntry(card.title, 'Engineering Summary') ? () => setSelectedMetric(findMetricDictionaryEntry(card.title, 'Engineering Summary') ?? null) : undefined}
            />
          ))}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Trend Analysis</h2>
            <p className="mt-1 text-xs italic text-muted-foreground">Historical trends across key metrics.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {trendPanels.map((panel, index) => (
              <TrendChart
                className="border-dashed border-foreground/10"
                key={panel.title}
                labels={trendLabels}
                note={panel.note}
                onOpenDefinition={findMetricDictionaryEntry(panel.title, 'Engineering Summary') ? () => setSelectedMetric(findMetricDictionaryEntry(panel.title, 'Engineering Summary') ?? null) : undefined}
                title={panel.title}
                tone={panelTones[index] ?? 'default'}
                values={panel.values}
                variant={panelVariants[index] === 'bars' ? 'line' : (panelVariants[index] ?? 'area')}
              />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Risk, Insights & Decisions</h2>
            <p className="mt-1 text-xs italic text-muted-foreground">The most important narrative signals for stakeholder review and action.</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Active Risk Flags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2.5">
              {riskHighlights.map((item) => (
                <div className="flex items-start gap-3 rounded-lg border border-border/70 bg-background px-3 py-3" key={item}>
                  <div className="mt-1.5 h-2 w-2 rounded-full bg-foreground/45" />
                  <p className="text-sm leading-6 text-foreground">{item}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-dashed border-foreground/10">
            <CardHeader>
              <CardTitle className="text-sm">Key Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              {leadershipInsights.map((insight) => (
                <p key={insight}>• {insight}</p>
              ))}
            </CardContent>
          </Card>

          <Card className="border-dashed border-foreground/10">
            <CardHeader>
              <CardTitle className="text-sm">Recommended Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recommendedActions.map((action) => (
                <div className="rounded-lg border border-border/70 bg-background px-3 py-3" key={action.title}>
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-medium text-foreground">{action.title}</p>
                    <Badge variant="outline">{action.owner}</Badge>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{action.note}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Highlights & Quick Actions</h2>
          <p className="mt-1 text-xs italic text-muted-foreground">Summary insights and navigation to detailed modules.</p>
        </div>

        <div className="grid gap-4 xl:grid-cols-3">
          {quickActions.map((action) => (
            <Card className="border-dashed border-foreground/10" key={action.title}>
              <CardHeader>
                <CardTitle className="text-sm">{action.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground">
                  {action.items.map((item) => (
                    <p key={item}>• {item}</p>
                  ))}
                </div>
                {action.href ? (
                  <Button asChild className="mt-4 w-full justify-center" variant="outline">
                    <Link to={action.href}>
                      {action.cta}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                ) : (
                  <div className="mt-4 inline-flex w-full items-center justify-center rounded-lg border border-border/70 px-4 py-2 text-sm text-foreground">
                    {action.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                )}
                <div className="mt-3 border-t border-border/70 pt-3 text-xs italic text-muted-foreground">{action.note}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Team Drill-down</h2>
          <p className="mt-1 text-xs italic text-muted-foreground">Click to expand team-level details.</p>
        </div>

        <Card className="border-dashed border-foreground/10">
          <CardContent className="overflow-x-auto p-4">
            <table className="data-table min-w-full text-left text-sm">
              <thead>
                <tr className="text-muted-foreground">
                  <th className="pb-3 pr-4 font-medium">Team</th>
                  <th className="pb-3 pr-4 font-medium">Delivery Score</th>
                  <th className="pb-3 pr-4 font-medium">Quality Score</th>
                  <th className="pb-3 font-medium">People Score</th>
                </tr>
              </thead>
              <tbody>
                {teamHealthRows.map((row) => (
                  <tr key={row.team}>
                    <td className="py-4 pr-4 font-medium text-foreground">{row.team}</td>
                    <td className="py-4 pr-4 text-muted-foreground">{row.deliveryScore}</td>
                    <td className="py-4 pr-4 text-muted-foreground">{row.qualityScore}</td>
                    <td className="py-4 text-muted-foreground">{row.peopleScore}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </section>

      <section className="border-t border-border/70 pt-4 text-xs italic leading-6 text-muted-foreground">
        This is the main entry point for leadership. Users can scan key metrics, identify risks, and drill down into Delivery Insights or People Growth for detailed analysis.
      </section>
    </div>
  )
}