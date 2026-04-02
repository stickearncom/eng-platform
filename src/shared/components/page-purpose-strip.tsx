import type { Audience } from '@/shared/config/audience'
import { Card, CardContent } from '@/shared/ui/card'

type AudienceAwareCopy = string | Partial<Record<Audience, string>>

interface PagePurposeStripProps {
  purpose: AudienceAwareCopy
  primaryAudience: AudienceAwareCopy
  boundary: AudienceAwareCopy
  audience?: Audience
}

function resolveCopy(copy: AudienceAwareCopy, audience?: Audience) {
  if (typeof copy === 'string') {
    return copy
  }

  if (audience && copy[audience]) {
    return copy[audience] ?? ''
  }

  return Object.values(copy)[0] ?? ''
}

export function PagePurposeStrip({ purpose, primaryAudience, boundary, audience }: PagePurposeStripProps) {
  return (
    <Card className="border-foreground/20 bg-muted/50">
      <CardContent className="p-4">
        <div className="grid gap-4 xl:grid-cols-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Purpose</p>
            <p className="mt-2 text-sm leading-6 text-foreground">{resolveCopy(purpose, audience)}</p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Primary Audience</p>
            <p className="mt-2 text-sm leading-6 text-foreground">{resolveCopy(primaryAudience, audience)}</p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Usage Boundary</p>
            <p className="mt-2 text-sm leading-6 text-foreground">{resolveCopy(boundary, audience)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}