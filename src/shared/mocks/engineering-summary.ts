import type { FilterKey } from '@/app/store/use-platform-store'
import type { Audience } from '@/shared/config/audience'

type Filters = Record<FilterKey, string>

export interface SummaryCardData {
  title: string
  value: string
  delta: string
  note: string
}

interface TrendSeries {
  label: string
  values: number[]
}

interface TrendPanel {
  title: string
  values: number[]
  note: string
}

interface QuickActionCard {
  title: string
  items: string[]
  cta: string
  href?: string
  note: string
}

interface TeamHealthRow {
  team: string
  deliveryScore: string
  qualityScore: string
  peopleScore: string
}

const summaryByTeam: Record<string, SummaryCardData[]> = {
  all: [
    { title: 'Delivery Confidence', value: '81%', delta: '+6 pts', note: 'Planning accuracy improved after scope-change review became mandatory.' },
    { title: 'Quality & Reliability', value: '9 escaped bugs', delta: '-18%', note: 'Production defects are down, but one platform incident remains open.' },
    { title: 'Engineering Flow', value: '14h PR turnaround', delta: '-3h', note: 'Review latency is healthiest in Growth Squad and weakest in Core Platform.' },
    { title: 'People Growth', value: '3.22 / 4', delta: '+0.08', note: 'Ownership & Initiative is the strongest category this cycle.' },
    { title: 'Org Risk', value: '2 hotspots', delta: 'Needs attention', note: 'Cross-team allocation and QA support load are the main pressure points.' },
  ],
  growth: [
    { title: 'Delivery Confidence', value: '86%', delta: '+4 pts', note: 'Growth Squad execution stabilized after stricter intake on mid-sprint work.' },
    { title: 'Quality & Reliability', value: '3 escaped bugs', delta: '-25%', note: 'Release quality is healthy, with only minor post-release fixes.' },
    { title: 'Engineering Flow', value: '11h PR turnaround', delta: '-2h', note: 'Review loops are fast because ownership and reviewer rotation are clearer.' },
    { title: 'People Growth', value: '3.31 / 4', delta: '+0.11', note: 'Ownership and communication are both trending upward.' },
    { title: 'Org Risk', value: '1 hotspot', delta: 'Contained', note: 'Risk mainly comes from shared QA support close to release cut-off.' },
  ],
  platform: [
    { title: 'Delivery Confidence', value: '72%', delta: '-2 pts', note: 'Dependency-heavy work is still reducing forecast reliability.' },
    { title: 'Quality & Reliability', value: '1 open incident', delta: 'Critical follow-up', note: 'Defect count is stable, but unresolved platform work weighs more here.' },
    { title: 'Engineering Flow', value: '18h PR turnaround', delta: '+1h', note: 'Architecture reviews are healthy, but too many shared requests slow completion.' },
    { title: 'People Growth', value: '3.14 / 4', delta: '+0.04', note: 'Calibration confidence is weaker for cross-board contributors.' },
    { title: 'Org Risk', value: '3 hotspots', delta: 'Escalate', note: 'Carry-over, dependency delay, and stretched senior bandwidth overlap.' },
  ],
  cx: [
    { title: 'Delivery Confidence', value: '79%', delta: '+3 pts', note: 'Delivery confidence improved after release-readiness checks became more explicit.' },
    { title: 'Quality & Reliability', value: '5 escaped bugs', delta: '-12%', note: 'Bug volume is down, though retest load is still uneven.' },
    { title: 'Engineering Flow', value: '13h PR turnaround', delta: '-1h', note: 'Work moves well when QA focus is protected before release windows.' },
    { title: 'People Growth', value: '3.27 / 4', delta: '+0.09', note: 'Collaboration is strong, with growth focus now shifting to automation depth.' },
    { title: 'Org Risk', value: '2 hotspots', delta: 'Watch', note: 'Risk concentrates around QA bandwidth and last-minute release support.' },
  ],
}

const trendByTeam: Record<string, TrendSeries[]> = {
  all: [
    { label: 'Delivery Confidence', values: [62, 68, 70, 75, 81] },
    { label: 'Quality & Reliability', values: [54, 59, 65, 72, 77] },
    { label: 'People Growth', values: [58, 61, 66, 70, 74] },
  ],
  growth: [
    { label: 'Delivery Confidence', values: [70, 74, 78, 82, 86] },
    { label: 'Quality & Reliability', values: [61, 67, 72, 78, 84] },
    { label: 'People Growth', values: [60, 65, 71, 75, 79] },
  ],
  platform: [
    { label: 'Delivery Confidence', values: [69, 71, 70, 74, 72] },
    { label: 'Quality & Reliability', values: [58, 62, 64, 63, 66] },
    { label: 'People Growth', values: [55, 57, 60, 62, 64] },
  ],
  cx: [
    { label: 'Delivery Confidence', values: [60, 66, 71, 76, 79] },
    { label: 'Quality & Reliability', values: [49, 56, 62, 68, 73] },
    { label: 'People Growth', values: [57, 60, 64, 69, 72] },
  ],
}

const trendPanelsByTeam: Record<string, TrendPanel[]> = {
  all: [
    { title: 'Delivery Confidence Trend', values: [62, 68, 70, 75, 81], note: 'Weekly trend showing sprint completion and predictability over time.' },
    { title: 'Quality & Reliability Trend', values: [54, 59, 65, 72, 77], note: 'Bug rate and incident frequency across recent sprints.' },
    { title: 'Engineering Flow Metrics', values: [48, 56, 60, 69, 74], note: 'PR cycle time and review turnaround by team.' },
    { title: 'People Growth Distribution', values: [50, 55, 60, 68, 74], note: 'Review score distribution and confidence quality across the organization.' },
  ],
  growth: [
    { title: 'Delivery Confidence Trend', values: [70, 74, 78, 82, 86], note: 'Growth Squad execution remains the cleanest in the portfolio.' },
    { title: 'Quality & Reliability Trend', values: [61, 67, 72, 78, 84], note: 'Release quality improves when QA focus is protected earlier.' },
    { title: 'Engineering Flow Metrics', values: [57, 63, 71, 77, 82], note: 'Reviewer rotation and clear ownership reduce handoff friction.' },
    { title: 'People Growth Distribution', values: [58, 64, 68, 75, 79], note: 'Ownership and communication remain the strongest categories here.' },
  ],
  platform: [
    { title: 'Delivery Confidence Trend', values: [69, 71, 70, 74, 72], note: 'Dependency-heavy work keeps forecast reliability unstable.' },
    { title: 'Quality & Reliability Trend', values: [58, 62, 64, 63, 66], note: 'Stability is acceptable, but unresolved reliability work weighs more in this team.' },
    { title: 'Engineering Flow Metrics', values: [44, 47, 53, 52, 55], note: 'Shared support and cross-board work still distort planned flow.' },
    { title: 'People Growth Distribution', values: [49, 52, 55, 61, 64], note: 'Low-confidence calibration remains more common here than elsewhere.' },
  ],
  cx: [
    { title: 'Delivery Confidence Trend', values: [60, 66, 71, 76, 79], note: 'Delivery improves when release-readiness checks happen earlier.' },
    { title: 'Quality & Reliability Trend', values: [49, 56, 62, 68, 73], note: 'Bug trend is healthier, but retest loops still add noise.' },
    { title: 'Engineering Flow Metrics', values: [51, 56, 61, 67, 70], note: 'Flow is improving, with remaining risk concentrated around QA capacity.' },
    { title: 'People Growth Distribution', values: [57, 60, 64, 69, 72], note: 'Collaboration is strong, with growth shifting toward automation depth.' },
  ],
}

const riskByAudience: Record<Audience, Record<string, string[]>> = {
  executive: {
    all: [
      'Core Platform has the highest carry-over rate for two consecutive sprints.',
      'Two senior engineers contribute across multiple boards with no explicit allocation snapshot.',
      'QA support is spread across three squads, weakening release predictability.',
    ],
    growth: ['Growth Squad is healthy overall, but still depends on shared QA coverage near release cut-off.', 'Forecast remains strong because mid-sprint scope change is lower than org average.', 'Leadership intervention is not needed unless support work rises again next sprint.'],
    platform: ['Platform carry-over remains the main source of leadership forecast risk.', 'Cross-board dependency work is obscuring true capacity for senior backend contributors.', 'One unresolved reliability concern still affects confidence more than raw ticket volume suggests.'],
    cx: ['Customer Experience is improving, but release stability is still sensitive to QA bottlenecks.', 'Retest loops create avoidable late-sprint pressure.', 'Cross-functional delivery confidence is healthy if shared support load stays contained.'],
  },
  'engineering-manager': {
    all: ['Core Platform blockers are increasingly dependency-driven, not capacity-driven.', 'Low-confidence review cases cluster in cross-team engineers with thin peer coverage.', 'Growth Squad review turnaround is healthy, but QA coverage still creates end-of-sprint pressure.'],
    growth: ['Alya and the Growth Squad bench show strong ownership momentum this cycle.', 'Main operational risk is QA support concentration during release week.', 'People signals are healthy enough to support larger ownership bets next cycle.'],
    platform: ['Cross-board support is distorting both delivery flow and people evidence quality.', 'Planning accuracy improves when dependency intake is challenged early in sprint planning.', 'Backend peer coverage is still thinner than needed for confident calibration.'],
    cx: ['QA focus protection remains the biggest lever for delivery and growth quality.', 'Release-readiness communication improved, but retest churn still hurts predictability.', 'Automation depth is trending up but still vulnerable to support interruptions.'],
  },
  'scrum-master': {
    all: ['Carry-over in Core Platform is still dominated by unresolved upstream dependencies.', 'Added-after-start work remains high in shared-support tickets.', 'Two squads rely on the same QA support window before release cut-off.'],
    growth: ['Growth Squad has the cleanest sprint boundaries, with fewer added-after-start tickets.', 'The main flow risk is late QA compression before release.', 'Planning accuracy remains above org average for three consecutive sprints.'],
    platform: ['Platform sprint health remains unstable because dependency work enters late.', 'Shared support requests keep distorting initial sprint scope.', 'Blocker removal speed remains slower than the rest of the organization.'],
    cx: ['Customer Experience is improving but still sensitive to retest loops.', 'Release coordination is better than last quarter, but blocker aging remains uneven.', 'Added-after-start bug work still lands too late in the sprint.'],
  },
  hr: {
    all: ['Calibration-required cases are concentrated in engineers working across multiple squads.', 'Peer reviewer coverage remains thin for backend contributors in Core Platform.', 'Learning & Growth scores lag in teams with heavy incident or support load.'],
    growth: ['Growth Squad shows the healthiest review confidence and narrative coverage.', 'The main people risk is ensuring growth momentum continues as ownership expands.', 'No urgent calibration exception is visible for this team right now.'],
    platform: ['Platform contributors have the highest concentration of low-confidence evidence.', 'Cross-team load is affecting both calibration quality and development continuity.', 'HR follow-up should focus on reviewer coverage and role-scope clarity.'],
    cx: ['Customer Experience contributors show healthier narrative consistency than prior cycle.', 'Growth risk remains tied to support load cutting into development-focused work.', 'QA role expectations should stay explicit to prevent review interpretation drift.'],
  },
}

const leadershipInsightsByTeam: Record<string, string[]> = {
  all: ['Sprint velocity improved 12% this quarter.', '3 engineers are flagged for focused growth follow-up.', 'Cross-team dependency pressure dropped 25% compared with the prior quarter.'],
  growth: ['Growth Squad landed 4 of the last 5 sprints close to plan.', 'Ownership signals improved across senior and middle contributors.', 'Main watch item remains shared QA coverage near release cut-off.'],
  platform: ['Platform carry-over remains above organizational average.', 'Low-confidence review evidence still clusters in cross-board contributors.', 'Dependency intake quality is the main near-term operational lever.'],
  cx: ['Release-readiness signaling improved this quarter.', 'Automation momentum is visible but still exposed to support interruptions.', 'Team health remains stable if QA bandwidth is protected.'],
}

const quickActionsByTeam: Record<string, QuickActionCard[]> = {
  all: [
    {
      title: 'Delivery Highlights',
      items: ['4 of the last 5 sprints completed close to target.', 'Scope creep reduced by 15% quarter over quarter.', '2 teams still need capacity review.'],
      cta: 'View Delivery Insights',
      href: '/delivery-insights',
      note: 'Quick summary from Delivery Insights.',
    },
    {
      title: 'People Growth Highlights',
      items: ['85% reviews completed this cycle.', '12 employees are marked promotion-ready.', '3 calibration sessions are still pending closure.'],
      cta: 'View People Growth',
      href: '/people-growth',
      note: 'Quick summary from People Growth.',
    },
    {
      title: 'Team Health Overview',
      items: ['Core Platform: Needs attention', 'Growth Squad: Strong', 'Customer Experience: Stable'],
      cta: 'See team comparison',
      note: 'Cross-team health comparison for leadership review.',
    },
  ],
  growth: [
    {
      title: 'Delivery Highlights',
      items: ['Completion remains above org average.', 'Scope creep is lower than last quarter.', 'QA handoff remains the only recurring pressure point.'],
      cta: 'View Delivery Insights',
      href: '/delivery-insights',
      note: 'Delivery summary for Growth Squad.',
    },
    {
      title: 'People Growth Highlights',
      items: ['Review confidence is highest in this team.', 'Ownership and communication both improved this cycle.', 'Promotion-readiness signals are clearer than last half.'],
      cta: 'View People Growth',
      href: '/people-growth',
      note: 'People summary for Growth Squad.',
    },
    {
      title: 'Team Health Overview',
      items: ['Planning discipline is strong.', 'Release stress concentrates near QA handoff.', 'No escalation needed at current support load.'],
      cta: 'See team comparison',
      note: 'Leadership pulse for Growth Squad.',
    },
  ],
  platform: [
    {
      title: 'Delivery Highlights',
      items: ['Carry-over remains materially above target.', 'Dependency work still enters after sprint start too often.', 'Architecture review quality is strong but slows completion.'],
      cta: 'View Delivery Insights',
      href: '/delivery-insights',
      note: 'Delivery summary for Core Platform.',
    },
    {
      title: 'People Growth Highlights',
      items: ['Low-confidence evidence is still the main people-data problem.', 'Role scope is broader than current review coverage reflects.', 'Manager follow-through matters more than raw score change.'],
      cta: 'View People Growth',
      href: '/people-growth',
      note: 'People summary for Core Platform.',
    },
    {
      title: 'Team Health Overview',
      items: ['Dependency friction remains the core issue.', 'Senior bandwidth is stretched across boards.', 'Escalation is justified if next sprint intake does not improve.'],
      cta: 'See team comparison',
      note: 'Leadership pulse for Core Platform.',
    },
  ],
  cx: [
    {
      title: 'Delivery Highlights',
      items: ['Release predictability is improving.', 'Retest loop pressure is lower than last quarter.', 'Late bug work still lands too close to sprint close.'],
      cta: 'View Delivery Insights',
      href: '/delivery-insights',
      note: 'Delivery summary for Customer Experience.',
    },
    {
      title: 'People Growth Highlights',
      items: ['Collaboration scores remain healthy.', 'Automation growth is now more visible in narrative evidence.', 'Follow-up should focus on development time protection.'],
      cta: 'View People Growth',
      href: '/people-growth',
      note: 'People summary for Customer Experience.',
    },
    {
      title: 'Team Health Overview',
      items: ['Release readiness is more explicit.', 'QA bandwidth still shapes confidence more than coding throughput.', 'No structural alert beyond support load right now.'],
      cta: 'See team comparison',
      note: 'Leadership pulse for Customer Experience.',
    },
  ],
}

const teamHealthRowsByTeam: Record<string, TeamHealthRow[]> = {
  all: [
    { team: 'Core Platform', deliveryScore: '72%', qualityScore: '89%', peopleScore: '3.14 / 4' },
    { team: 'Growth Squad', deliveryScore: '86%', qualityScore: '94%', peopleScore: '3.31 / 4' },
    { team: 'Customer Experience', deliveryScore: '79%', qualityScore: '91%', peopleScore: '3.27 / 4' },
    { team: 'Shared QA', deliveryScore: '74%', qualityScore: '92%', peopleScore: '3.18 / 4' },
  ],
  growth: [{ team: 'Growth Squad', deliveryScore: '86%', qualityScore: '94%', peopleScore: '3.31 / 4' }],
  platform: [{ team: 'Core Platform', deliveryScore: '72%', qualityScore: '89%', peopleScore: '3.14 / 4' }],
  cx: [{ team: 'Customer Experience', deliveryScore: '79%', qualityScore: '91%', peopleScore: '3.27 / 4' }],
}

const audienceTagsByAudience: Record<Audience, string[]> = {
  executive: ['Founder / C-Level', 'Head of Engineering'],
  'engineering-manager': ['Head of Engineering', 'Engineering Manager'],
  'scrum-master': ['Scrum Master', 'Delivery Lead'],
  hr: ['HRBP', 'Talent Partner'],
}

const cycleOverrides: Record<string, { peopleValue: string; peopleDelta: string }> = {
  '2026-q2': { peopleValue: '3.22 / 4', peopleDelta: '+0.08' },
  '2026-q1': { peopleValue: '3.15 / 4', peopleDelta: '+0.04' },
  '2025-h2': { peopleValue: '3.03 / 4', peopleDelta: 'Baseline' },
}

const rangeOffsets: Record<string, number> = {
  '30d': -6,
  quarter: 0,
  '2q': 4,
}

function clamp(value: number) {
  return Math.max(24, Math.min(96, value))
}

export function getEngineeringSummaryData(audience: Audience, filters: Filters) {
  const teamKey = filters.team in summaryByTeam ? filters.team : 'all'
  const cycle = cycleOverrides[filters.reviewCycle] ?? cycleOverrides['2026-q2']
  const offset = rangeOffsets[filters.dateRange] ?? 0

  const summaryCards = summaryByTeam[teamKey].map((card) => {
    if (card.title !== 'People Growth') {
      return card
    }

    return {
      ...card,
      value: cycle.peopleValue,
      delta: cycle.peopleDelta,
    }
  })

  const trendSeries = trendByTeam[teamKey].map((series) => ({
    ...series,
    values: series.values.map((value) => clamp(value + offset)),
  }))

  const trendPanels = trendPanelsByTeam[teamKey].map((panel) => ({
    ...panel,
    values: panel.values.map((value) => clamp(value + offset)),
  }))

  const riskHighlights = riskByAudience[audience][teamKey]

  return {
    audienceTags: audienceTagsByAudience[audience],
    summaryCards,
    trendSeries,
    trendPanels,
    riskHighlights,
    leadershipInsights: leadershipInsightsByTeam[teamKey],
    quickActions: quickActionsByTeam[teamKey],
    teamHealthRows: teamHealthRowsByTeam[teamKey],
  }
}