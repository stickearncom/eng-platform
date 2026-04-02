import { usePlatformStore } from '@/app/store/use-platform-store'
import { audienceContexts } from '@/shared/config/audience'
import { Badge } from '@/shared/ui/badge'
import { Card, CardContent } from '@/shared/ui/card'

interface AudienceNoticeProps {
  moduleLabel: string
  note?: string
}

export function AudienceNotice({ moduleLabel, note }: AudienceNoticeProps) {
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
          <p className="max-w-3xl text-sm leading-6 text-muted-foreground">{context.description}</p>
        </div>
        <div className="space-y-2 md:max-w-sm">
          <Badge variant="accent" className="w-fit">{context.focus}</Badge>
          <p className="text-sm leading-6 text-muted-foreground">{note ?? context.supportingNote}</p>
        </div>
      </CardContent>
    </Card>
  )
}