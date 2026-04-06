import { BarChart3, FileStack, FileText, LayoutDashboard, type LucideIcon, Users2 } from 'lucide-react'

export interface NavigationItem {
  to: string
  label: string
  shortLabel?: string
  icon: LucideIcon
}

export const navigationItems: NavigationItem[] = [
  { to: '/summary', label: 'Engineering Summary', shortLabel: 'Engineering Summary', icon: LayoutDashboard },
  { to: '/delivery-insights', label: 'Delivery Insights', shortLabel: 'Delivery Insights', icon: BarChart3 },
  { to: '/people-growth', label: 'People Growth', shortLabel: 'People Growth', icon: Users2 },
  { to: '/review-forms', label: 'Review Forms', shortLabel: 'Review Forms', icon: FileText },
  { to: '/metric-dictionary', label: 'Metric Dictionary', shortLabel: 'Metric Dictionary', icon: FileStack },
]