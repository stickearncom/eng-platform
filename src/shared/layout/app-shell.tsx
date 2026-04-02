import { useEffect } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'

import { prefetchRouteModule } from '@/app/route-prefetch'
import { navigationItems } from '@/shared/config/navigation'
import { cn } from '@/shared/lib/utils'

export function AppShell() {
  const navigation = navigationItems
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.pathname])

  useEffect(() => {
    const candidates = navigation.filter((item) => item.to !== location.pathname).slice(0, 2)

    const requestIdleCallbackRef = window.requestIdleCallback
    const cancelIdleCallbackRef = window.cancelIdleCallback

    if (requestIdleCallbackRef && cancelIdleCallbackRef) {
      const requestId = requestIdleCallbackRef(() => {
        candidates.forEach((item) => prefetchRouteModule(item.to))
      })

      return () => cancelIdleCallbackRef(requestId)
    }

    const timeoutId = globalThis.setTimeout(() => {
      candidates.forEach((item) => prefetchRouteModule(item.to))
    }, 350)

    return () => globalThis.clearTimeout(timeoutId)
  }, [location.pathname, navigation])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b border-border/80 bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-[1440px] items-center gap-4 px-5 py-4 lg:px-8">
          <div className="flex shrink-0 items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/70 bg-card text-xs font-bold tracking-[0.18em] text-foreground/70">
              EPP
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold leading-none text-foreground">Engineering Platform</p>
              <p className="hidden pt-1 text-xs text-muted-foreground xl:block">Leadership, delivery, and people signals</p>
            </div>
          </div>

          <nav className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto whitespace-nowrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:ml-2">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <NavLink
                  className={({ isActive }) =>
                    cn(
                      'inline-flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors',
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                    )
                  }
                  key={item.to}
                  onFocus={() => prefetchRouteModule(item.to)}
                  onMouseEnter={() => prefetchRouteModule(item.to)}
                  to={item.to}
                >
                  <Icon className="h-4 w-4" />
                  {item.shortLabel ?? item.label}
                </NavLink>
              )
            })}
          </nav>

        </div>
      </header>

      <main className="panel-grid min-h-[calc(100vh-73px)] px-5 py-6 lg:px-8 lg:py-8">
        <div className="mx-auto w-full max-w-[1440px]">
          <Outlet />
        </div>
      </main>
    </div>
  )
}