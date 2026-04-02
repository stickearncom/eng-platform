import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, X } from 'lucide-react'

import type { MetricDictionaryEntry } from '@/shared/mocks/metric-dictionary'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'

interface MetricDefinitionDrawerProps {
  entry: MetricDictionaryEntry | null
  open: boolean
  onClose: () => void
}

export function MetricDefinitionDrawer({ entry, open, onClose }: MetricDefinitionDrawerProps) {
  useEffect(() => {
    if (!open) {
      return
    }

    const previousOverflow = document.body.style.overflow
    const previousPaddingRight = document.body.style.paddingRight
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    const computedBodyPaddingRight = Number.parseFloat(window.getComputedStyle(document.body).paddingRight) || 0

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.body.style.overflow = 'hidden'

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${computedBodyPaddingRight + scrollbarWidth}px`
    }

    window.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      document.body.style.paddingRight = previousPaddingRight
      window.removeEventListener('keydown', handleEscape)
    }
  }, [onClose, open])

  if (!open || !entry) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button aria-label="Close metric definition" className="absolute inset-0 bg-foreground/20 backdrop-blur-[1px]" type="button" onClick={onClose} />
      <aside className="relative z-[1] h-full w-full max-w-[540px] overflow-y-auto border-l border-border/80 bg-background px-5 py-5 shadow-[0_18px_60px_-20px_rgba(15,23,42,0.28)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">{entry.module}</Badge>
              <Badge variant="outline">{entry.refreshCadence}</Badge>
            </div>
            <h2 className="mt-3 text-xl font-semibold text-foreground">{entry.name}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Opened from the dashboard so stakeholders can verify meaning, source, and guardrails without leaving the current workflow.
            </p>
          </div>
          <Button size="sm" type="button" variant="ghost" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-6 space-y-4">
          <Card className="border-dashed border-foreground/20">
            <CardHeader>
              <CardTitle className="text-sm">Definition</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
              <p>{entry.definition}</p>
              <p><span className="font-medium text-foreground">Why it matters:</span> {entry.whyItMatters}</p>
            </CardContent>
          </Card>

          <Card className="border-dashed border-foreground/20">
            <CardHeader>
              <CardTitle className="text-sm">Governance</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 text-sm md:grid-cols-2">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Formula</p>
                <p className="mt-2 leading-6 text-foreground">{entry.formula}</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Source</p>
                <p className="mt-2 leading-6 text-foreground">{entry.source}</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Owner</p>
                <p className="mt-2 leading-6 text-foreground">{entry.owner}</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Audience</p>
                <p className="mt-2 leading-6 text-foreground">{entry.audience}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-dashed border-foreground/20">
            <CardHeader>
              <CardTitle className="text-sm">Interpretation Guardrail</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-6 text-muted-foreground">
              {entry.caveat}
            </CardContent>
          </Card>

          <Button asChild className="w-full justify-center" variant="outline">
            <Link to="/metric-dictionary">
              <BookOpen className="mr-2 h-4 w-4" />
              Open Full Dictionary
            </Link>
          </Button>
        </div>
      </aside>
    </div>
  )
}