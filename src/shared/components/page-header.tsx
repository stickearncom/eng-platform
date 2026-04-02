import { Badge } from '@/shared/ui/badge'

interface PageHeaderProps {
  eyebrow: string
  title: string
  description: string
  badge?: string
}

export function PageHeader({ eyebrow, title, description, badge }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">{eyebrow}</p>
        <div className="space-y-3">
          <h1 className="page-title">{title}</h1>
          <p className="page-subtitle">{description}</p>
        </div>
      </div>
      {badge ? <Badge variant="accent" className="w-fit shadow-sm">{badge}</Badge> : null}
    </div>
  )
}