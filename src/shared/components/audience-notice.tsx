import type { Audience } from '@/shared/config/audience'
import { usePlatformStore } from '@/app/store/use-platform-store'
import { audienceContexts } from '@/shared/config/audience'
import { Badge } from '@/shared/ui/badge'
import { Card, CardContent } from '@/shared/ui/card'

type AudienceAwareCopy = string | Partial<Record<Audience, string>>

interface AudienceNoticeProps {
  moduleLabel: string
  note?: AudienceAwareCopy
  description?: AudienceAwareCopy
  focus?: AudienceAwareCopy
}

function resolveCopy(copy: AudienceAwareCopy | undefined, audience: Audience, fallback: string) {
  if (!copy) {
    return fallback
  }

  if (typeof copy === 'string') {
    return copy
  }

  return copy[audience] ?? Object.values(copy)[0] ?? fallback
}

export function AudienceNotice({ moduleLabel, note, description, focus }: AudienceNoticeProps) {
  const audience = usePlatformStore((state) => state.audience)
  const context = audienceContexts[audience]

  return (
    <Card className="border-primary/10 bg-gradient-to-r from-card via-card to-secondary/35">
      <CardContent className="flex flex-col gap-4 p-5 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Audience context</p>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-base font-semibold text-foreground">{context.label} view</h2>
            <Badge variant="outline">{moduleLabel}</Badge>
          </div>
          <p className="max-w-3xl text-sm leading-6 text-muted-foreground">{resolveCopy(description, audience, context.description)}</p>
        </div>
        <div className="space-y-2 md:max-w-sm">
          <Badge variant="accent" className="w-fit">{resolveCopy(focus, audience, context.focus)}</Badge>
          <p className="text-sm leading-6 text-muted-foreground">{resolveCopy(note, audience, context.supportingNote)}</p>
        </div>
      </CardContent>
    </Card>
  )
}