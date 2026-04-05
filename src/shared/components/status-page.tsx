import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'

interface StatusPageDetailItem {
  label: string
  value: string
}

interface StatusPageProps {
  code: string
  title: string
  description: string
  icon: LucideIcon
  details: StatusPageDetailItem[]
  actions: ReactNode
  fullScreen?: boolean
}

export function StatusPage({ code, title, description, icon: Icon, details, actions, fullScreen = false }: StatusPageProps) {
  const containerClassName = fullScreen
    ? 'min-h-screen bg-background px-5 py-8 text-foreground lg:px-8'
    : 'py-8'

  const innerClassName = fullScreen
    ? 'mx-auto flex min-h-[calc(100vh-64px)] w-full max-w-[1440px] items-center justify-center'
    : 'flex min-h-[calc(100vh-220px)] items-center justify-center'

  return (
    <div className={containerClassName}>
      <div className={innerClassName}>
        <Card className="w-full max-w-3xl border-dashed border-foreground/20 bg-card/95">
          <CardHeader className="space-y-4 pb-4 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-border/70 bg-muted/60">
              <Icon className="h-6 w-6 text-foreground/80" />
            </div>
            <div className="space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">{code}</p>
              <CardTitle className="text-3xl">{title}</CardTitle>
              <CardDescription className="mx-auto max-w-xl text-sm leading-6">{description}</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 rounded-2xl border border-border/70 bg-muted/35 p-5 md:grid-cols-3">
              {details.map((detail) => (
                <div key={detail.label}>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{detail.label}</p>
                  <p className="mt-2 text-sm leading-6 text-foreground">{detail.value}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col justify-center gap-3 sm:flex-row">{actions}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}