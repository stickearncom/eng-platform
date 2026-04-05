import { ArrowRight } from 'lucide-react'

import { MetricDefinitionButton } from '@/shared/components/metric-definition-button'
import type { MetricStatus, SummaryCardReadModel } from '@/shared/lib/summary-card-contract'
import { Badge } from '@/shared/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'

interface StatCardProps extends SummaryCardReadModel {
  onOpenDefinition?: () => void
}

function getStatusVariant(status: MetricStatus) {
  return status === 'On Track' ? 'success' : status === 'At Risk' ? 'alert' : 'outline'
}

export function StatCard({ title, currentValue, changeDisplay, signal, previousValue, comparisonPeriod, note, target, status, onOpenDefinition }: StatCardProps) {
  const statusVariant = getStatusVariant(status)

  return (
    <Card className="relative border-dashed border-foreground/10 bg-card">
      {onOpenDefinition ? (
        <MetricDefinitionButton metricTitle={title} onClick={onOpenDefinition} />
      ) : null}
      <CardHeader className="gap-3 pb-4 pr-12">
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">{title}</CardTitle>
          {changeDisplay ? <Badge variant="outline">{changeDisplay}</Badge> : <span className="h-6" aria-hidden="true" />}
        </div>
        <p className="text-3xl font-bold tracking-tight text-foreground">{currentValue}</p>
      </CardHeader>
      <CardContent>
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {target ? <Badge variant="outline">Target {target}</Badge> : null}
          {signal ? <Badge variant={statusVariant}>{signal}</Badge> : null}
          {status ? <Badge variant={statusVariant}>{status}</Badge> : null}
        </div>
        <p className="text-xs leading-5 text-muted-foreground">{note}</p>
        {previousValue && comparisonPeriod ? (
          <div className="mt-3 rounded-lg border border-border/70 bg-muted/35 px-3 py-2">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Change basis</p>
            <div className="mt-1 flex items-center justify-between gap-3 text-xs">
              <span className="text-muted-foreground">{comparisonPeriod}</span>
              <span className="font-medium text-foreground">{previousValue}</span>
            </div>
          </div>
        ) : null}
        <div className="mt-4 flex items-center gap-3">
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Explore detail
            <ArrowRight className="h-3.5 w-3.5" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}