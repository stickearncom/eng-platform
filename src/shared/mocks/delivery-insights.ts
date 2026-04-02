import type { FilterKey } from '@/app/store/use-platform-store'

type Filters = Record<FilterKey, string>

interface DeliveryMetricCard {
  title: string
  value: string
  delta: string
  note: string
}

interface DeliveryPanelEntry {
  label: string
  value: string
}

interface DeliveryPanel {
  title: string
  entries: readonly DeliveryPanelEntry[]
}

interface FirstWaveMetric {
  title: string
  badge: string
  values: readonly number[]
  note: string
}

interface DeliveryBreakdownRow {
  factor: string
  weight: string
  score: string
  impact: string
}

interface TeamDrilldownRow {
  team: string
  sprint: string
  velocity: string
  scopeChange: string
  carryOver: string
  healthScore: string
  actions: string
}

interface SimpleContextRow {
  label: string
  value: string
}

const sprintSnapshots = {
  'sprint-42': {
    cards: [
      { title: 'Sprint Progress', value: '68%', delta: 'Stable', note: 'Story points completed versus planned.' },
      { title: 'Scope Change', value: '+12%', delta: 'Down', note: 'Stories added or removed after sprint start.' },
      { title: 'Planning Accuracy', value: '82%', delta: 'Up', note: 'Estimated versus actual sprint completion.' },
      { title: 'Carry-over Rate', value: '15%', delta: 'Stable', note: 'Percentage of tickets carried to next sprint.' },
      { title: 'Sprint Health', value: 'Good', delta: 'Up', note: 'Composite health signal across planning and execution.' },
    ],
    firstWave: [
      { title: 'Scope Change Tracking', badge: 'Area chart', values: [28, 24, 21, 20, 19], note: 'Shows stories added or removed during sprint and highlights scope creep timing.' },
      { title: 'Planning Accuracy Trend', badge: 'Line chart', values: [57, 63, 69, 77, 84], note: 'Historical comparison of estimated versus actual sprint completion.' },
      { title: 'Carry-over Root Cause Analysis', badge: 'Bar chart', values: [40, 36, 31, 26, 24], note: 'Breakdown of why tickets spill over: blockers, scope, dependencies, estimation.' },
      { title: 'Blocker Classification', badge: 'Pie chart', values: [22, 18, 19, 17, 14], note: 'Distribution of blocker types across the sprint.' },
    ],
    panels: [
      {
        title: 'Blocker Classification',
        entries: [
          { label: 'External dependency', value: '7 tickets' },
          { label: 'Product clarification', value: '4 tickets' },
          { label: 'QA / retest loop', value: '3 tickets' },
        ],
      },
      {
        title: 'Carry-over Root Causes',
        entries: [
          { label: 'Dependency delay', value: '11 SP' },
          { label: 'Scope change', value: '8 SP' },
          { label: 'Underestimation', value: '5 SP' },
        ],
      },
    ],
  },
  'sprint-41': {
    cards: [
      { title: 'Sprint Progress', value: '63%', delta: 'Stable', note: 'Scope completion was lower due to heavier support load.' },
      { title: 'Scope Change', value: '+16%', delta: 'Down', note: 'Late work changed sprint focus more than desired.' },
      { title: 'Planning Accuracy', value: '79%', delta: 'Up', note: 'Estimated versus actual sprint completion.' },
      { title: 'Carry-over Rate', value: '18%', delta: 'Stable', note: 'Carry-over pressure remained elevated.' },
      { title: 'Sprint Health', value: 'Watch', delta: 'Stable', note: 'Execution weakened due to added-after-start work.' },
    ],
    firstWave: [
      { title: 'Scope Change Tracking', badge: 'Area chart', values: [31, 28, 27, 24, 23], note: 'Shows stories added or removed during sprint and highlights scope creep timing.' },
      { title: 'Planning Accuracy Trend', badge: 'Line chart', values: [52, 59, 66, 72, 79], note: 'Historical comparison of estimated versus actual sprint completion.' },
      { title: 'Carry-over Root Cause Analysis', badge: 'Bar chart', values: [43, 39, 35, 32, 29], note: 'Breakdown of why tickets spill over: blockers, scope, dependencies, estimation.' },
      { title: 'Blocker Classification', badge: 'Pie chart', values: [24, 22, 20, 18, 17], note: 'Distribution of blocker types across the sprint.' },
    ],
    panels: [
      {
        title: 'Blocker Classification',
        entries: [
          { label: 'External dependency', value: '6 tickets' },
          { label: 'Product clarification', value: '5 tickets' },
          { label: 'QA / retest loop', value: '4 tickets' },
        ],
      },
      {
        title: 'Carry-over Root Causes',
        entries: [
          { label: 'Scope change', value: '12 SP' },
          { label: 'Dependency delay', value: '10 SP' },
          { label: 'Underestimation', value: '7 SP' },
        ],
      },
    ],
  },
  'sprint-40': {
    cards: [
      { title: 'Sprint Progress', value: '59%', delta: 'Stable', note: 'Initial scope completion was lower before planning adjustments improved.' },
      { title: 'Scope Change', value: '+19%', delta: 'Down', note: 'Added-after-start work remained materially high.' },
      { title: 'Planning Accuracy', value: '76%', delta: 'Up', note: 'Estimated versus actual sprint completion.' },
      { title: 'Carry-over Rate', value: '22%', delta: 'Stable', note: 'Carry-over remained above preferred range.' },
      { title: 'Sprint Health', value: 'Needs attention', delta: 'Stable', note: 'Baseline sprint health before intake discipline improved.' },
    ],
    firstWave: [
      { title: 'Scope Change Tracking', badge: 'Area chart', values: [34, 31, 29, 27, 26], note: 'Shows stories added or removed during sprint and highlights scope creep timing.' },
      { title: 'Planning Accuracy Trend', badge: 'Line chart', values: [49, 55, 60, 68, 76], note: 'Historical comparison of estimated versus actual sprint completion.' },
      { title: 'Carry-over Root Cause Analysis', badge: 'Bar chart', values: [47, 44, 40, 36, 33], note: 'Breakdown of why tickets spill over: blockers, scope, dependencies, estimation.' },
      { title: 'Blocker Classification', badge: 'Pie chart', values: [27, 24, 22, 20, 19], note: 'Distribution of blocker types across the sprint.' },
    ],
    panels: [
      {
        title: 'Blocker Classification',
        entries: [
          { label: 'External dependency', value: '5 tickets' },
          { label: 'Product clarification', value: '6 tickets' },
          { label: 'QA / retest loop', value: '5 tickets' },
        ],
      },
      {
        title: 'Carry-over Root Causes',
        entries: [
          { label: 'Underestimation', value: '13 SP' },
          { label: 'Dependency delay', value: '11 SP' },
          { label: 'Scope change', value: '9 SP' },
        ],
      },
    ],
  },
} as const

const teamRows: TeamDrilldownRow[] = [
  { team: 'Growth Squad', sprint: 'Sprint 42', velocity: '84 SP', scopeChange: '+8%', carryOver: '6 SP', healthScore: '82 / 100', actions: 'Review blockers' },
  { team: 'Core Platform', sprint: 'Sprint 42', velocity: '67 SP', scopeChange: '+18%', carryOver: '14 SP', healthScore: '69 / 100', actions: 'Review dependencies' },
  { team: 'Customer Experience', sprint: 'Sprint 42', velocity: '74 SP', scopeChange: '+11%', carryOver: '8 SP', healthScore: '78 / 100', actions: 'Check release load' },
]

const teamIndexMap: Record<'growth' | 'platform' | 'cx', number> = {
  growth: 0,
  platform: 1,
  cx: 2,
}

const teamCardOverrides: Record<string, readonly DeliveryMetricCard[]> = {
  growth: [
    { title: 'Sprint Progress', value: '74%', delta: 'Stable', note: 'Scope discipline is strongest in Growth Squad.' },
    { title: 'Scope Change', value: '+8%', delta: 'Down', note: 'Mid-sprint scope change is comparatively low.' },
    { title: 'Planning Accuracy', value: '88%', delta: 'Up', note: 'Estimated versus actual completion is healthiest here.' },
    { title: 'Carry-over Rate', value: '9%', delta: 'Stable', note: 'Spillover pressure remains contained.' },
    { title: 'Sprint Health', value: 'Strong', delta: 'Up', note: 'Best overall sprint health among current squads.' },
  ],
  platform: [
    { title: 'Sprint Progress', value: '61%', delta: 'Stable', note: 'Dependency-heavy work reduces completed initial scope.' },
    { title: 'Scope Change', value: '+18%', delta: 'Down', note: 'Shared support and dependency spillovers raise scope churn.' },
    { title: 'Planning Accuracy', value: '73%', delta: 'Up', note: 'Forecast remains less stable than organizational average.' },
    { title: 'Carry-over Rate', value: '21%', delta: 'Stable', note: 'Spillover remains the core execution concern.' },
    { title: 'Sprint Health', value: 'Watch', delta: 'Stable', note: 'Planning and blocker pressure are both below desired levels.' },
  ],
  cx: [
    { title: 'Sprint Progress', value: '66%', delta: 'Stable', note: 'Delivery is stable when release-readiness gates are explicit.' },
    { title: 'Scope Change', value: '+11%', delta: 'Down', note: 'Bug and retest work still shift final sprint scope.' },
    { title: 'Planning Accuracy', value: '81%', delta: 'Up', note: 'Estimated versus actual completion is improving.' },
    { title: 'Carry-over Rate', value: '13%', delta: 'Stable', note: 'Most spillover comes from release-week quality churn.' },
    { title: 'Sprint Health', value: 'Good', delta: 'Up', note: 'Healthy overall with a few release-week friction points.' },
  ],
}

const healthBreakdownRows: DeliveryBreakdownRow[] = [
  { factor: 'Velocity Consistency', weight: '25%', score: '85 / 100', impact: 'Positive' },
  { factor: 'Scope Stability', weight: '20%', score: '72 / 100', impact: 'Needs attention' },
  { factor: 'Blocker Resolution', weight: '20%', score: '90 / 100', impact: 'Positive' },
  { factor: 'Estimation Accuracy', weight: '20%', score: '78 / 100', impact: 'Stable' },
  { factor: 'Carry-over Rate', weight: '15%', score: '82 / 100', impact: 'Positive' },
]

const capacityPlanning = {
  totalCapacity: '120 SP',
  committed: '95 SP',
  buffer: '25 SP (21%)',
  committedPercent: 79,
}

const crossTeamDependencies: SimpleContextRow[] = [
  { label: 'Platform → Backend', value: '3 blocked tickets' },
  { label: 'Mobile → Platform', value: '2 blocked tickets' },
  { label: 'Frontend → Backend', value: '1 blocked ticket' },
]

const sharedResourceAllocation: SimpleContextRow[] = [
  { label: 'Senior Backend Dev', value: 'Backend (60%), Platform (40%)' },
  { label: 'DevOps Lead', value: 'All teams (shared)' },
]

function filterTeamRows(team: string) {
  if (team === 'all') {
    return teamRows
  }

  if (team in teamIndexMap) {
    return [teamRows[teamIndexMap[team as keyof typeof teamIndexMap]]]
  }

  return teamRows
}

function applyIssueTypeNote(cards: readonly DeliveryMetricCard[], issueType: string) {
  if (issueType === 'incident') {
    return cards.map((card) =>
      card.title === 'Completion Rate'
        ? { ...card, note: 'Incident-driven work reduced planned scope completion in this cut of the data' }
        : card,
    )
  }

  if (issueType === 'refactor') {
    return cards.map((card) =>
      card.title === 'Carry-over Root Cause'
        ? { ...card, note: 'Refactor work tends to spill when dependency mapping is incomplete at sprint start' }
        : card,
    )
  }

  return cards
}

export function getDeliveryInsightsData(filters: Filters) {
  const sprintSnapshot = sprintSnapshots[filters.sprint as keyof typeof sprintSnapshots] ?? sprintSnapshots['sprint-42']
  const teamKey = filters.team
  const scopedCards: readonly DeliveryMetricCard[] = teamKey !== 'all' && teamKey in teamCardOverrides ? teamCardOverrides[teamKey] : sprintSnapshot.cards
  const cards = applyIssueTypeNote(scopedCards, filters.issueType)
  const firstWaveMetrics: FirstWaveMetric[] = sprintSnapshot.firstWave.map((metric) => ({
    ...metric,
    badge: filters.addedAt === 'after-start' && metric.title === 'Scope Change Tracking' ? `${metric.badge} • after start` : metric.badge,
  }))
  const panels: DeliveryPanel[] = sprintSnapshot.panels.map((panel) => ({
    ...panel,
    entries:
      filters.ticketType === 'bug' && panel.title === 'Blocker Classification'
        ? panel.entries.map((entry) =>
            entry.label === 'QA / retest loop' ? { ...entry, value: `${Number.parseInt(entry.value, 10) + 2} tickets` } : entry,
          )
        : panel.entries,
  }))

  return {
    analyticsTabs: ['Scope Analysis', 'Planning Trends', 'Blockers', 'Sprint Health'],
    deliveryMetricCards: cards,
    firstWaveMetrics,
    deliveryPanels: panels,
    healthBreakdownRows,
    capacityPlanning,
    teamDrilldown: filterTeamRows(teamKey),
    crossTeamDependencies,
    sharedResourceAllocation,
  }
}