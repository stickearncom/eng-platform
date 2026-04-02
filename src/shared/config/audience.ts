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
  { to: '/summary', label: 'Engineering Summary', shortLabel: 'Engineering Summary', icon: LayoutDashboard },
  { to: '/delivery-insights', label: 'Delivery Insights', shortLabel: 'Delivery Insights', icon: BarChart3 },
  { to: '/people-growth', label: 'People Growth', shortLabel: 'People Growth', icon: Users2 },
  { to: '/metric-dictionary', label: 'Metric Dictionary', shortLabel: 'Metric Dictionary', icon: FileStack },
]

export const audienceContexts: Record<Audience, AudienceContext> = {
  executive: {
    label: 'Executive',
    description: 'High-level decision view focused on engineering health, delivery confidence, organizational risk, and trend direction rather than operational detail.',
    focus: 'Portfolio health, risk posture, and escalation readiness',
    supportingNote: 'This audience sees approved aggregate people signals only and does not access manager-only coaching or calibration detail.',
    visibleRoutes: ['/summary', '/delivery-insights', '/people-growth', '/metric-dictionary'],
    canOpenPeopleDetail: false,
    canSeeManagerNotes: false,
  },
  'engineering-manager': {
    label: 'Engineering Manager',
    description: 'Full working view across delivery execution and people growth for coaching, calibration, blocker removal, and follow-through.',
    focus: 'Execution quality plus coaching continuity',
    supportingNote: 'This is the most complete context because managers need both team-level delivery signals and employee-level development follow-through.',
    visibleRoutes: ['/summary', '/delivery-insights', '/people-growth', '/metric-dictionary', '/people-growth/employees'],
    canOpenPeopleDetail: true,
    canSeeManagerNotes: true,
  },
  'scrum-master': {
    label: 'Scrum Master',
    description: 'Operational view for sprint health, blockers, planning behavior, and delivery flow, without access to confidential people-review detail.',
    focus: 'Flow efficiency and planning risk',
    supportingNote: 'People Growth is hidden here because Scrum Master workflows should focus on team execution rather than confidential performance detail.',
    visibleRoutes: ['/summary', '/delivery-insights', '/metric-dictionary'],
    canOpenPeopleDetail: false,
    canSeeManagerNotes: false,
  },
  hr: {
    label: 'HR',
    description: 'Talent and review-cycle context for calibration cadence, policy compliance, development risk, and confidentiality-aware follow-up, with limited delivery detail.',
    focus: 'Calibration quality and review governance',
    supportingNote: 'Delivery execution detail is de-emphasized here because HR typically needs outcome patterns and review governance, not sprint operations.',
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