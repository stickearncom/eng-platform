import { BarChart3, FileStack, LayoutDashboard, type LucideIcon, Users2 } from 'lucide-react'

export type Audience = 'executive' | 'engineering-manager' | 'scrum-master' | 'hr'

export interface AudienceContext {
  label: string
  description: string
  focus: string
  supportingNote: string
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
    description: 'Audience context is used to preview how permission-sensitive data and actions behave across roles without changing the overall information architecture.',
    focus: 'Permission boundaries and visibility rules',
    supportingNote: 'Navigation stays consistent across audiences. What changes is access to confidential detail, restricted actions, and sensitive narrative context.',
    canOpenPeopleDetail: false,
    canSeeManagerNotes: false,
  },
  'engineering-manager': {
    label: 'Engineering Manager',
    description: 'Audience context is used to preview how permission-sensitive data and actions behave across roles without changing the overall information architecture.',
    focus: 'Permission boundaries and visibility rules',
    supportingNote: 'Navigation stays consistent across audiences. What changes is access to confidential detail, restricted actions, and sensitive narrative context.',
    canOpenPeopleDetail: true,
    canSeeManagerNotes: true,
  },
  'scrum-master': {
    label: 'Scrum Master',
    description: 'Audience context is used to preview how permission-sensitive data and actions behave across roles without changing the overall information architecture.',
    focus: 'Permission boundaries and visibility rules',
    supportingNote: 'Navigation stays consistent across audiences. What changes is access to confidential detail, restricted actions, and sensitive narrative context.',
    canOpenPeopleDetail: false,
    canSeeManagerNotes: false,
  },
  hr: {
    label: 'HR',
    description: 'Audience context is used to preview how permission-sensitive data and actions behave across roles without changing the overall information architecture.',
    focus: 'Permission boundaries and visibility rules',
    supportingNote: 'Navigation stays consistent across audiences. What changes is access to confidential detail, restricted actions, and sensitive narrative context.',
    canOpenPeopleDetail: true,
    canSeeManagerNotes: false,
  },
}