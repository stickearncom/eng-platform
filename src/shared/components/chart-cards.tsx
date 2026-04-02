import { MiniTrend } from '@/shared/components/mini-trend'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'

interface BaseChartCardProps {
  title: string
  note: string
  values: readonly number[]
  labels?: readonly string[]
  tone?: 'default' | 'success' | 'alert'
  className?: string
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
}

export function TrendChart({
  title,
  note,
  values,
  labels,
  tone = 'default',
  variant = 'area',
  className,
}: TrendChartProps) {
  return (
    <Card className={className ?? 'border-dashed border-foreground/20'}>
      <CardHeader className="pb-4">
        <CardTitle className="text-sm">{title}</CardTitle>
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
}: DistributionChartProps) {
  return (
    <Card className={className ?? 'border-dashed border-foreground/20'}>
      <CardHeader className="pb-4">
        <CardTitle className="text-sm">{title}</CardTitle>
        <CardDescription>{benchmarkLabel}</CardDescription>
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
}: CapacityChartProps) {
  return (
    <Card className="border-dashed border-foreground/20">
      <CardHeader>
        <CardTitle className="text-sm">{title}</CardTitle>
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