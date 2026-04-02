import { BarChart3, FileStack, LayoutDashboard, type LucideIcon, Users2 } from 'lucide-react'

export type Audience = 'executive' | 'engineering-manager' | 'scrum-master' | 'hr'

export interface AudienceContext {
  label: string
  description: string
  focus: string
  supportingNote: string
  visibleRoutes: string[]
  canOpenPeopleDetail: boolean
  canSeeManagerNotes: boolean
}

export interface NavigationItem {
  to: string
  label: string
  shortLabel?: string
  icon: LucideIcon
}

export const audienceOptions: { label: string; value: Audience }[] = [
  { label: 'Executive', value: 'executive' },
  { label: 'Engineering Manager', value: 'engineering-manager' },
  { label: 'Scrum Master', value: 'scrum-master' },
  { label: 'HR', value: 'hr' },
]

export const navigationItems: NavigationItem[] = [
  { to: '/summary', label: 'Engineering Summary', shortLabel: 'Summary', icon: LayoutDashboard },
  { to: '/delivery-insights', label: 'Delivery Insights', shortLabel: 'Delivery', icon: BarChart3 },
  { to: '/people-growth', label: 'People Growth', shortLabel: 'People', icon: Users2 },
  { to: '/metric-dictionary', label: 'Metric Dictionary', shortLabel: 'Dictionary', icon: FileStack },
]

export const audienceContexts: Record<Audience, AudienceContext> = {
  executive: {
    label: 'Executive',
    description: 'High-level decision view focused on delivery confidence, organizational risk, and trend direction rather than operational detail.',
    focus: 'Portfolio health and escalation readiness',
    supportingNote: 'This view keeps people data summarized and avoids exposing manager-only coaching context.',
    visibleRoutes: ['/summary', '/delivery-insights', '/people-growth', '/metric-dictionary'],
    canOpenPeopleDetail: false,
    canSeeManagerNotes: false,
  },
  'engineering-manager': {
    label: 'Engineering Manager',
    description: 'Full working view across delivery execution and people growth for coaching, calibration, and execution follow-up.',
    focus: 'Execution quality plus coaching continuity',
    supportingNote: 'This is the most complete context because managers need both team-health and employee-level follow-through.',
    visibleRoutes: ['/summary', '/delivery-insights', '/people-growth', '/metric-dictionary', '/people-growth/employees'],
    canOpenPeopleDetail: true,
    canSeeManagerNotes: true,
  },
  'scrum-master': {
    label: 'Scrum Master',
    description: 'Operational view for sprint health, blockers, and planning behavior, without access to confidential people-review detail.',
    focus: 'Flow efficiency and planning risk',
    supportingNote: 'People Growth is hidden here because Scrum Master workflows should not rely on confidential performance detail.',
    visibleRoutes: ['/summary', '/delivery-insights', '/metric-dictionary'],
    canOpenPeopleDetail: false,
    canSeeManagerNotes: false,
  },
  hr: {
    label: 'HR',
    description: 'Talent and review-cycle context for calibration cadence, policy compliance, and development risk, with limited delivery detail.',
    focus: 'Calibration quality and review governance',
    supportingNote: 'Delivery execution detail is de-emphasized here because HR usually needs outcome patterns, not sprint operations.',
    visibleRoutes: ['/summary', '/people-growth', '/metric-dictionary', '/people-growth/employees'],
    canOpenPeopleDetail: true,
    canSeeManagerNotes: false,
  },
}

export function canAccessPath(audience: Audience, path: string) {
  return audienceContexts[audience].visibleRoutes.some((route) => path === route || path.startsWith(`${route}/`))
}

export function getVisibleNavigation(audience: Audience) {
  return navigationItems.filter((item) => canAccessPath(audience, item.to))
}