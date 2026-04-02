import { ChevronDown, LockKeyhole } from 'lucide-react'
import { useEffect } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'

import { prefetchRouteModule } from '@/app/route-prefetch'
import { usePlatformStore } from '@/app/store/use-platform-store'
import { audienceContexts, audienceOptions, canAccessPath, getVisibleNavigation } from '@/shared/config/audience'
import { cn } from '@/shared/lib/utils'

export function AppShell() {
  const audience = usePlatformStore((state) => state.audience)
  const setAudience = usePlatformStore((state) => state.setAudience)
  const context = audienceContexts[audience]
  const navigation = getVisibleNavigation(audience)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!canAccessPath(audience, location.pathname)) {
      navigate('/summary', { replace: true })
    }
  }, [audience, location.pathname, navigate])

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
        <div className="mx-auto flex w-full max-w-[1440px] flex-wrap items-center gap-5 px-5 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/70 bg-card text-xs font-bold tracking-[0.18em] text-foreground/70">
              EPP
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Engineering Performance Platform</p>
              <p className="text-xs text-muted-foreground">Leadership visibility, delivery insight, and people growth</p>
            </div>
          </div>

          <nav className="flex flex-1 flex-wrap items-center gap-2 lg:ml-6">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <NavLink
                  className={({ isActive }) =>
                    cn(
                      'inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm transition-colors',
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
                  {item.label}
                </NavLink>
              )
            })}
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <div className="hidden rounded-lg border border-border/70 bg-card px-3 py-2 text-xs text-muted-foreground md:block">
              <div className="flex items-center gap-2">
                <LockKeyhole className="h-3.5 w-3.5" />
                Permission-aware mocked access
              </div>
            </div>
            <div className="relative">
              <select
                aria-label="Audience context"
                className="h-10 appearance-none rounded-lg border border-border/70 bg-card pl-3 pr-9 text-sm text-foreground outline-none transition focus:border-primary"
                value={audience}
                onChange={(event) => setAudience(event.target.value as typeof audience)}
              >
                {audienceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-dashed border-border bg-card text-xs font-semibold text-muted-foreground">
              {context.label.slice(0, 1)}
            </div>
          </div>
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