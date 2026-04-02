import { ArrowRight, Info } from 'lucide-react'

import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'

interface StatCardProps {
  title: string
  value: string
  delta: string
  note: string
  target?: string
  status?: 'On Track' | 'Watch' | 'At Risk'
  onOpenDefinition?: () => void
}

export function StatCard({ title, value, delta, note, target, status, onOpenDefinition }: StatCardProps) {
  const statusVariant = status === 'On Track' ? 'success' : status === 'At Risk' ? 'alert' : 'outline'

  return (
    <Card className="border-dashed border-foreground/10 bg-card">
      <CardHeader className="gap-3 pb-4">
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">{title}</CardTitle>
          <Badge variant="outline">{delta}</Badge>
        </div>
        <p className="text-3xl font-bold tracking-tight text-foreground">{value}</p>
      </CardHeader>
      <CardContent>
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {target ? <Badge variant="outline">Target {target}</Badge> : null}
          {status ? <Badge variant={statusVariant}>{status}</Badge> : null}
        </div>
        <p className="text-xs leading-5 text-muted-foreground">{note}</p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Explore detail
            <ArrowRight className="h-3.5 w-3.5" />
          </div>
          {onOpenDefinition ? (
            <Button aria-label={`Open definition for ${title}`} className="h-8 w-8 rounded-full p-0" size="sm" title={`Definition: ${title}`} type="button" variant="ghost" onClick={onOpenDefinition}>
              <Info className="h-4 w-4" />
            </Button>
          ) : null}
        </div>
      </CardContent>
    </Card>
  )
}