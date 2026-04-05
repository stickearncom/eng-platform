import type { FilterKey } from '@/app/store/use-platform-store'

type Filters = Record<FilterKey, string>

interface DeliveryMetricCard {
  title: string
  value: string
  trend: string
  trendTone: 'positive' | 'neutral' | 'negative'
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
  predictability: string
  scopeChange: string
  carryOver: string
  blockedRatio: string
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
      { title: 'Sprint Predictability', value: '82%', trend: 'Up', trendTone: 'positive', note: 'Completed initial scope versus initial committed sprint scope.' },
      { title: 'Scope Change Ratio', value: '+12%', trend: 'Watch', trendTone: 'neutral', note: 'Work added after sprint start remains above target but is improving.' },
      { title: 'Carry-over Rate', value: '15%', trend: 'Stable', trendTone: 'neutral', note: 'Carry-over pressure is present but no longer worsening.' },
      { title: 'Blocked Ticket Ratio', value: '18%', trend: 'Watch', trendTone: 'neutral', note: 'Blocked work still clusters around dependency-heavy tickets.' },
      { title: 'Sprint Health Score', value: '78 / 100', trend: 'Up', trendTone: 'positive', note: 'Composite signal from predictability, scope stability, carry-over, and blocker pressure.' },
    ],
    firstWave: [
      { title: 'Scope Change Ratio', badge: 'Trend', values: [18, 16, 15, 13, 12], note: 'Shows how much work moved after sprint start and whether planning stability is improving.' },
      { title: 'Sprint Predictability', badge: 'Trend', values: [68, 72, 76, 79, 82], note: 'Trend of completed initial scope versus initial committed scope.' },
      { title: 'Carry-over Rate', badge: 'Trend', values: [24, 21, 19, 17, 15], note: 'Highlights unfinished committed work carried into the next sprint.' },
      { title: 'Average Blocked Duration', badge: 'Trend', values: [31, 28, 24, 22, 19], note: 'Average blocked time per blocked item, used as a flow-friction signal.' },
    ],
    panels: [
      {
        title: 'Blocked Ticket Ratio',
        entries: [
          { label: 'External dependency', value: '7 tickets' },
          { label: 'Product clarification', value: '4 tickets' },
          { label: 'QA / retest loop', value: '3 tickets' },
        ],
      },
      {
        title: 'Carry-over With Documented Reason Rate',
        entries: [
          { label: 'Documented before sprint close', value: '76%' },
          { label: 'Missing explicit reason', value: '24%' },
          { label: 'Main missing pattern', value: 'Late dependency clarification' },
        ],
      },
    ],
  },
  'sprint-41': {
    cards: [
      { title: 'Sprint Predictability', value: '79%', trend: 'Up', trendTone: 'positive', note: 'Predictability improved, but still below desired range.' },
      { title: 'Scope Change Ratio', value: '+16%', trend: 'Watch', trendTone: 'neutral', note: 'Late work still changes the sprint more than intended.' },
      { title: 'Carry-over Rate', value: '18%', trend: 'Stable', trendTone: 'neutral', note: 'Carry-over remained elevated due to added-after-start work.' },
      { title: 'Blocked Ticket Ratio', value: '21%', trend: 'Watch', trendTone: 'neutral', note: 'Blocked work remained above the preferred operating range.' },
      { title: 'Sprint Health Score', value: '72 / 100', trend: 'Stable', trendTone: 'neutral', note: 'Execution quality weakened due to scope churn and blocker pressure.' },
    ],
    firstWave: [
      { title: 'Scope Change Ratio', badge: 'Trend', values: [21, 20, 18, 17, 16], note: 'Shows whether teams are improving scope stability after sprint start.' },
      { title: 'Sprint Predictability', badge: 'Trend', values: [61, 66, 71, 75, 79], note: 'Historical comparison of committed scope versus completed initial scope.' },
      { title: 'Carry-over Rate', badge: 'Trend', values: [29, 25, 22, 20, 18], note: 'Highlights spillover trend across recent sprints.' },
      { title: 'Average Blocked Duration', badge: 'Trend', values: [36, 32, 29, 27, 24], note: 'Blocked duration trends show whether execution friction is shrinking.' },
    ],
    panels: [
      {
        title: 'Blocked Ticket Ratio',
        entries: [
          { label: 'External dependency', value: '6 tickets' },
          { label: 'Product clarification', value: '5 tickets' },
          { label: 'QA / retest loop', value: '4 tickets' },
        ],
      },
      {
        title: 'Carry-over With Documented Reason Rate',
        entries: [
          { label: 'Documented before sprint close', value: '69%' },
          { label: 'Missing explicit reason', value: '31%' },
          { label: 'Main missing pattern', value: 'Support-driven work added late' },
        ],
      },
    ],
  },
  'sprint-40': {
    cards: [
      { title: 'Sprint Predictability', value: '76%', trend: 'Up', trendTone: 'positive', note: 'Baseline predictability before intake discipline improved.' },
      { title: 'Scope Change Ratio', value: '+19%', trend: 'Watch', trendTone: 'neutral', note: 'Added-after-start work remained materially high.' },
      { title: 'Carry-over Rate', value: '22%', trend: 'Stable', trendTone: 'neutral', note: 'Carry-over remained above the preferred threshold.' },
      { title: 'Blocked Ticket Ratio', value: '24%', trend: 'Watch', trendTone: 'neutral', note: 'Blocker concentration was highest in dependency-heavy work.' },
      { title: 'Sprint Health Score', value: '68 / 100', trend: 'Stable', trendTone: 'neutral', note: 'Baseline sprint health before planning and blocker discipline improved.' },
    ],
    firstWave: [
      { title: 'Scope Change Ratio', badge: 'Trend', values: [24, 22, 21, 20, 19], note: 'Shows how much sprint scope changed after start.' },
      { title: 'Sprint Predictability', badge: 'Trend', values: [56, 61, 66, 71, 76], note: 'Historical comparison of committed initial scope versus completed initial scope.' },
      { title: 'Carry-over Rate', badge: 'Trend', values: [34, 30, 27, 24, 22], note: 'Highlights the downward trend of unfinished committed work.' },
      { title: 'Average Blocked Duration', badge: 'Trend', values: [42, 38, 34, 31, 28], note: 'Blocked duration improved but still remained materially high.' },
    ],
    panels: [
      {
        title: 'Blocked Ticket Ratio',
        entries: [
          { label: 'External dependency', value: '5 tickets' },
          { label: 'Product clarification', value: '6 tickets' },
          { label: 'QA / retest loop', value: '5 tickets' },
        ],
      },
      {
        title: 'Carry-over With Documented Reason Rate',
        entries: [
          { label: 'Documented before sprint close', value: '61%' },
          { label: 'Missing explicit reason', value: '39%' },
          { label: 'Main missing pattern', value: 'Unlogged dependency and estimation issues' },
        ],
      },
    ],
  },
} as const

const teamRows: TeamDrilldownRow[] = [
  { team: 'Growth Squad', sprint: 'Sprint 42', predictability: '88%', scopeChange: '+8%', carryOver: '9%', blockedRatio: '14%', healthScore: '82 / 100', actions: 'Review blocker hotspots' },
  { team: 'Core Platform', sprint: 'Sprint 42', predictability: '73%', scopeChange: '+18%', carryOver: '21%', blockedRatio: '26%', healthScore: '69 / 100', actions: 'Review dependency intake' },
  { team: 'Customer Experience', sprint: 'Sprint 42', predictability: '81%', scopeChange: '+11%', carryOver: '13%', blockedRatio: '17%', healthScore: '78 / 100', actions: 'Check release load' },
]

const teamIndexMap: Record<'growth' | 'platform' | 'cx', number> = {
  growth: 0,
  platform: 1,
  cx: 2,
}

const teamCardOverrides: Record<string, readonly DeliveryMetricCard[]> = {
  growth: [
    { title: 'Sprint Predictability', value: '88%', trend: 'Up', trendTone: 'positive', note: 'Growth Squad has the healthiest committed-scope completion.' },
    { title: 'Scope Change Ratio', value: '+8%', trend: 'Up', trendTone: 'positive', note: 'Mid-sprint scope movement is comparatively low.' },
    { title: 'Carry-over Rate', value: '9%', trend: 'Stable', trendTone: 'neutral', note: 'Spillover pressure remains contained.' },
    { title: 'Blocked Ticket Ratio', value: '14%', trend: 'Stable', trendTone: 'neutral', note: 'Main friction point remains QA support concentration.' },
    { title: 'Sprint Health Score', value: '84 / 100', trend: 'Up', trendTone: 'positive', note: 'Best overall execution health among current squads.' },
  ],
  platform: [
    { title: 'Sprint Predictability', value: '73%', trend: 'Watch', trendTone: 'neutral', note: 'Dependency-heavy work reduces completed initial scope.' },
    { title: 'Scope Change Ratio', value: '+18%', trend: 'Watch', trendTone: 'neutral', note: 'Shared support and dependency spillovers raise scope churn.' },
    { title: 'Carry-over Rate', value: '21%', trend: 'Watch', trendTone: 'neutral', note: 'Spillover remains the core execution concern.' },
    { title: 'Blocked Ticket Ratio', value: '26%', trend: 'Watch', trendTone: 'neutral', note: 'Blocked work remains materially above target.' },
    { title: 'Sprint Health Score', value: '69 / 100', trend: 'Stable', trendTone: 'neutral', note: 'Planning and blocker pressure are both below desired levels.' },
  ],
  cx: [
    { title: 'Sprint Predictability', value: '81%', trend: 'Up', trendTone: 'positive', note: 'Committed scope completion is improving.' },
    { title: 'Scope Change Ratio', value: '+11%', trend: 'Stable', trendTone: 'neutral', note: 'Bug and retest work still move final sprint scope.' },
    { title: 'Carry-over Rate', value: '13%', trend: 'Stable', trendTone: 'neutral', note: 'Most spillover comes from release-week quality churn.' },
    { title: 'Blocked Ticket Ratio', value: '17%', trend: 'Stable', trendTone: 'neutral', note: 'Blocked work is improving but still sensitive to QA bandwidth.' },
    { title: 'Sprint Health Score', value: '78 / 100', trend: 'Up', trendTone: 'positive', note: 'Healthy overall with a few release-week friction points.' },
  ],
}

const healthBreakdownRows: DeliveryBreakdownRow[] = [
  { factor: 'Completion Rate Score', weight: '35%', score: '82 / 100', impact: 'Positive' },
  { factor: 'Scope Stability Score', weight: '25%', score: '72 / 100', impact: 'Needs attention' },
  { factor: 'Carry-over Score', weight: '20%', score: '78 / 100', impact: 'Stable' },
  { factor: 'Blocker Score', weight: '20%', score: '74 / 100', impact: 'Needs attention' },
]

const capacityPlanning = {
  totalCapacity: '120 pts',
  committed: '95 pts',
  buffer: '25 pts (21%)',
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
      card.title === 'Blocked Ticket Ratio'
        ? { ...card, note: 'Incident-driven work increased blocked work and reduced flow consistency in this cut of the data.' }
        : card,
    )
  }

  if (issueType === 'refactor') {
    return cards.map((card) =>
      card.title === 'Carry-over Rate'
        ? { ...card, note: 'Refactor work spills more often when dependency mapping is incomplete at sprint start.' }
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
    badge: filters.addedAt === 'after-start' && metric.title === 'Scope Change Ratio' ? `${metric.badge} • after start` : metric.badge,
  }))
  const panels: DeliveryPanel[] = sprintSnapshot.panels.map((panel) => ({
    ...panel,
    entries:
      filters.ticketType === 'bug' && panel.title === 'Blocked Ticket Ratio'
        ? panel.entries.map((entry) =>
            entry.label === 'QA / retest loop' ? { ...entry, value: `${Number.parseInt(entry.value, 10) + 2} tickets` } : entry,
          )
        : panel.entries,
  }))

  return {
    analyticsTabs: ['Planning Stability', 'Delivery Predictability', 'Carry-over Analysis', 'Blockers'],
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