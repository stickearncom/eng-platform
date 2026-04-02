import { Suspense, type ReactNode } from 'react'

export function RouteLoading() {
  return (
    <div className="flex min-h-[320px] items-center justify-center rounded-[1.1rem] border border-dashed border-border/70 bg-card/70 px-6 py-12">
      <div className="max-w-md text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">Loading view</p>
        <p className="mt-3 text-lg font-semibold text-foreground">Preparing analytics module</p>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          This route is loaded on demand to keep the initial dashboard bundle smaller and faster.
        </p>
      </div>
    </div>
  )
}

interface LazyRouteProps {
  children: ReactNode
}

export function LazyRoute({ children }: LazyRouteProps) {
  return <Suspense fallback={<RouteLoading />}>{children}</Suspense>
}