import { Badge } from '@/shared/ui/badge'
import { Card, CardContent } from '@/shared/ui/card'

interface AccessNoteProps {
  moduleLabel: string
  note?: string
  description?: string
  focus?: string
}

export function AccessNote({ moduleLabel, note, description, focus }: AccessNoteProps) {
  return (
    <Card className="border-primary/10 bg-gradient-to-r from-card via-card to-secondary/35">
      <CardContent className="flex flex-col gap-4 p-5 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Access Note</p>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-base font-semibold text-foreground">Workflow guidance</h2>
            <Badge variant="outline">{moduleLabel}</Badge>
          </div>
          <p className="max-w-3xl text-sm leading-6 text-muted-foreground">{description ?? 'This note explains how access-sensitive content is intended to behave in production without changing the main product structure in the prototype.'}</p>
        </div>
        <div className="space-y-2 md:max-w-sm">
          <Badge className="w-fit" variant="accent">{focus ?? 'Access and governance'}</Badge>
          <p className="text-sm leading-6 text-muted-foreground">{note ?? 'Permission-sensitive fields remain controlled in production even when the prototype shows a simplified workflow.'}</p>
        </div>
      </CardContent>
    </Card>
  )
}