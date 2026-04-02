import { Card, CardContent } from '@/shared/ui/card'

interface PagePurposeStripProps {
  purpose: string
  primaryAudience: string
  boundary: string
}

export function PagePurposeStrip({ purpose, primaryAudience, boundary }: PagePurposeStripProps) {
  return (
    <Card className="border-foreground/20 bg-muted/50">
      <CardContent className="p-4">
        <div className="grid gap-4 xl:grid-cols-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Purpose</p>
            <p className="mt-2 text-sm leading-6 text-foreground">{purpose}</p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Primary Audience</p>
            <p className="mt-2 text-sm leading-6 text-foreground">{primaryAudience}</p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Usage Boundary</p>
            <p className="mt-2 text-sm leading-6 text-foreground">{boundary}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}