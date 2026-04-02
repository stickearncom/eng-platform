import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/shared/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold tracking-[0.02em] transition-colors whitespace-nowrap',
  {
    variants: {
      variant: {
        default: 'bg-secondary text-secondary-foreground',
        accent: 'bg-accent text-accent-foreground',
        outline: 'border border-border bg-background/80 text-foreground',
        alert: 'bg-destructive/10 text-destructive',
        success: 'bg-emerald-100 text-emerald-700',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

type BadgeProps = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge }