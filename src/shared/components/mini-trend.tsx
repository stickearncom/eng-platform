import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import { cn } from '@/shared/lib/utils'

interface MiniTrendProps {
  values: readonly number[]
  labels?: readonly string[]
  variant?: 'area' | 'line' | 'bars'
  tone?: 'default' | 'success' | 'alert'
  className?: string
}

const toneClasses = {
  default: {
    stroke: '#4f46e5',
    fill: 'rgba(79, 70, 229, 0.18)',
    badge: 'text-indigo-700',
    grid: '#dbe1ea',
    tooltipBorder: 'rgba(79, 70, 229, 0.22)',
  },
  success: {
    stroke: '#059669',
    fill: 'rgba(5, 150, 105, 0.16)',
    badge: 'text-emerald-700',
    grid: '#d7ece5',
    tooltipBorder: 'rgba(5, 150, 105, 0.2)',
  },
  alert: {
    stroke: '#d97706',
    fill: 'rgba(217, 119, 6, 0.16)',
    badge: 'text-amber-700',
    grid: '#f4e5d0',
    tooltipBorder: 'rgba(217, 119, 6, 0.2)',
  },
} as const

function clamp(value: number) {
  return Math.max(0, Math.min(100, value))
}

interface TrendPoint {
  label: string
  value: number
}

interface TrendTooltipProps {
  active?: boolean
  payload?: Array<{ value?: number | string }>
  label?: string
  tone: keyof typeof toneClasses
}

function buildChartData(values: readonly number[], labels?: readonly string[]): TrendPoint[] {
  const safeValues = values.length > 0 ? values.map((value) => clamp(value)) : [0]

  return safeValues.map((value, index) => ({
    label: labels?.[index] ?? `P${index + 1}`,
    value,
  }))
}

function TrendTooltip({ active, payload, label, tone }: TrendTooltipProps) {
  if (!active || !payload || payload.length === 0) {
    return null
  }

  return (
    <div
      className="rounded-xl border bg-background/95 px-3 py-2 shadow-lg backdrop-blur"
      style={{ borderColor: toneClasses[tone].tooltipBorder }}
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm font-semibold text-foreground">Value: {payload[0]?.value}</p>
    </div>
  )
}

export function MiniTrend({ values, labels, variant = 'area', tone = 'default', className }: MiniTrendProps) {
  const data = buildChartData(values, labels)
  const current = data[data.length - 1]?.value ?? 0
  const previous = data[data.length - 2]?.value ?? current
  const delta = current - previous
  const palette = toneClasses[tone]
  const gradientId = `trend-gradient-${tone}`

  return (
    <div className={cn('rounded-[1.1rem] border border-border/70 bg-muted/35 p-3', className)}>
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Current</p>
          <p className="mt-1 text-xl font-semibold text-foreground">{current}</p>
        </div>
        <div className="text-right">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Change</p>
          <p className={cn('mt-1 text-sm font-semibold', palette.badge)}>{delta >= 0 ? `+${delta}` : delta}</p>
        </div>
      </div>

      <div className="h-36 overflow-hidden rounded-xl border border-border/70 bg-background/80 px-2 py-2">
        <ResponsiveContainer width="100%" height="100%">
          {variant === 'area' ? (
            <AreaChart data={data} margin={{ top: 10, right: 8, left: -28, bottom: 0 }}>
              <defs>
                <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
                  <stop offset="5%" stopColor={palette.stroke} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={palette.stroke} stopOpacity={0.04} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke={palette.grid} strokeDasharray="4 4" vertical={false} />
              <XAxis axisLine={false} dataKey="label" tick={{ fill: '#6b7280', fontSize: 11 }} tickLine={false} />
              <YAxis axisLine={false} domain={[0, 100]} hide tickLine={false} />
              <Tooltip content={<TrendTooltip tone={tone} />} cursor={{ stroke: palette.stroke, strokeDasharray: '4 4' }} />
              <Area dataKey="value" fill={`url(#${gradientId})`} stroke={palette.stroke} strokeWidth={3} type="monotone" />
            </AreaChart>
          ) : variant === 'line' ? (
            <LineChart data={data} margin={{ top: 10, right: 8, left: -28, bottom: 0 }}>
              <CartesianGrid stroke={palette.grid} strokeDasharray="4 4" vertical={false} />
              <XAxis axisLine={false} dataKey="label" tick={{ fill: '#6b7280', fontSize: 11 }} tickLine={false} />
              <YAxis axisLine={false} domain={[0, 100]} hide tickLine={false} />
              <Tooltip content={<TrendTooltip tone={tone} />} cursor={{ stroke: palette.stroke, strokeDasharray: '4 4' }} />
              <Line activeDot={{ fill: palette.stroke, r: 5, stroke: '#ffffff', strokeWidth: 2 }} dataKey="value" dot={{ fill: palette.stroke, r: 3 }} stroke={palette.stroke} strokeWidth={3} type="monotone" />
            </LineChart>
          ) : (
            <BarChart data={data} margin={{ top: 10, right: 8, left: -28, bottom: 0 }}>
              <CartesianGrid stroke={palette.grid} strokeDasharray="4 4" vertical={false} />
              <XAxis axisLine={false} dataKey="label" tick={{ fill: '#6b7280', fontSize: 11 }} tickLine={false} />
              <YAxis axisLine={false} domain={[0, 100]} hide tickLine={false} />
              <Tooltip content={<TrendTooltip tone={tone} />} cursor={{ fill: palette.fill }} />
              <Bar barSize={24} dataKey="value" fill={palette.stroke} radius={[10, 10, 4, 4]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  )
}