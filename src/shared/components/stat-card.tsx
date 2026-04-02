import { ArrowRight } from 'lucide-react'

import { Badge } from '@/shared/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'

interface StatCardProps {
  title: string
  value: string
  delta: string
  note: string
}

export function StatCard({ title, value, delta, note }: StatCardProps) {
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
        <p className="text-xs leading-5 text-muted-foreground">{note}</p>
        <div className="mt-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Explore detail
          <ArrowRight className="h-3.5 w-3.5" />
        </div>
      </CardContent>
    </Card>
  )
}