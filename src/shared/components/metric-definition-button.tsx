import { Info } from 'lucide-react'

import { Button } from '@/shared/ui/button'

interface MetricDefinitionButtonProps {
  metricTitle: string
  onClick: () => void
  side?: 'left' | 'right'
}

export function MetricDefinitionButton({ metricTitle, onClick, side = 'right' }: MetricDefinitionButtonProps) {
  const positionClass = side === 'left' ? 'left-2' : 'right-2'

  return (
    <Button
      aria-label={`Open definition for ${metricTitle}`}
      className={`absolute top-2 z-10 h-8 w-8 rounded-full bg-background/85 p-0 text-muted-foreground shadow-sm backdrop-blur-sm transition-colors hover:bg-muted hover:text-foreground ${positionClass}`}
      size="sm"
      title={`Definition: ${metricTitle}`}
      type="button"
      variant="ghost"
      onClick={onClick}
    >
      <Info className="h-4 w-4" />
    </Button>
  )
}