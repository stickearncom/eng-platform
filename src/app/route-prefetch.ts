const routePreloaders = {
  '/summary': () => import('@/modules/engineering-summary/pages/engineering-summary-page'),
  '/delivery-insights': () => import('@/modules/delivery-insights/pages/delivery-insights-page'),
  '/people-growth': () => import('@/modules/people-growth/pages/people-growth-summary-page'),
  '/review-forms': () => import('@/modules/review-forms/pages/review-forms-page'),
  '/metric-dictionary': () => import('@/modules/shared/pages/metric-dictionary-page'),
} as const

export function prefetchRouteModule(path: string) {
  const matchedEntry = Object.entries(routePreloaders).find(([route]) => path === route || path.startsWith(`${route}/`))

  if (matchedEntry) {
    void matchedEntry[1]()
  }
}