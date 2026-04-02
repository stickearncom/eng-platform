import { MetricDefinitionButton } from '@/shared/components/metric-definition-button'
import { MiniTrend } from '@/shared/components/mini-trend'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'

interface BaseChartCardProps {
  title: string
  note: string
  values: readonly number[]
  labels?: readonly string[]
  tone?: 'default' | 'success' | 'alert'
  className?: string
  onOpenDefinition?: () => void
}

interface TrendChartProps extends BaseChartCardProps {
  variant?: 'area' | 'line'
}

interface DistributionChartProps extends BaseChartCardProps {
  benchmarkLabel?: string
}

interface CapacityChartProps {
  title: string
  note: string
  totalCapacity: string
  committed: string
  buffer: string
  committedPercent: number
  values: readonly number[]
  labels?: readonly string[]
  onOpenDefinition?: () => void
}

export function TrendChart({
  title,
  note,
  values,
  labels,
  tone = 'default',
  variant = 'area',
  className,
  onOpenDefinition,
}: TrendChartProps) {
  return (
    <Card className={`relative ${className ?? 'border-dashed border-foreground/20'}`}>
      {onOpenDefinition ? (
        <MetricDefinitionButton metricTitle={title} onClick={onOpenDefinition} />
      ) : null}
      <CardHeader className="pb-4 pr-12">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-sm">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <MiniTrend labels={labels} tone={tone} values={values} variant={variant} />
        <div className="border-t border-border/70 pt-3 text-xs italic leading-5 text-muted-foreground">{note}</div>
      </CardContent>
    </Card>
  )
}

export function DistributionChart({
  title,
  note,
  values,
  labels,
  tone = 'success',
  benchmarkLabel = 'Distribution overview',
  className,
  onOpenDefinition,
}: DistributionChartProps) {
  return (
    <Card className={`relative ${className ?? 'border-dashed border-foreground/20'}`}>
      {onOpenDefinition ? (
        <MetricDefinitionButton metricTitle={title} onClick={onOpenDefinition} />
      ) : null}
      <CardHeader className="pb-4 pr-12">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="text-sm">{title}</CardTitle>
            <CardDescription>{benchmarkLabel}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <MiniTrend labels={labels} tone={tone} values={values} variant="bars" />
        <div className="border-t border-border/70 pt-3 text-xs italic leading-5 text-muted-foreground">{note}</div>
      </CardContent>
    </Card>
  )
}

export function CapacityChart({
  title,
  note,
  totalCapacity,
  committed,
  buffer,
  committedPercent,
  values,
  labels,
  onOpenDefinition,
}: CapacityChartProps) {
  return (
    <Card className="relative border-dashed border-foreground/20">
      {onOpenDefinition ? (
        <MetricDefinitionButton metricTitle={title} onClick={onOpenDefinition} />
      ) : null}
      <CardHeader className="pr-12">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-sm">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 p-4 pt-0">
        <MiniTrend labels={labels} tone="default" values={values} variant="area" />
        <div className="grid gap-3 text-sm">
          <div className="flex justify-between"><span>Total Capacity</span><span className="font-medium">{totalCapacity}</span></div>
          <div className="flex justify-between"><span>Committed</span><span className="font-medium">{committed}</span></div>
          <div className="flex justify-between"><span>Buffer</span><span className="font-medium">{buffer}</span></div>
        </div>
        <div className="h-4 overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-foreground/30" style={{ width: `${committedPercent}%` }} />
        </div>
        <div className="border-t border-border/70 pt-3 text-xs italic text-muted-foreground">{note}</div>
      </CardContent>
    </Card>
  )
}