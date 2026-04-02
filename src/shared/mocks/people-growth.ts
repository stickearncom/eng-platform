import type { FilterKey } from '@/app/store/use-platform-store'

type Filters = Record<FilterKey, string>

interface EmployeeRecord {
  id: string
  name: string
  role: string
  roleKey: string
  level: string
  levelKey: string
  team: string
  teamKey: string
  finalScore: string
  confidence: 'Normal' | 'Low confidence'
  focus: string
  needsCalibration: boolean
  status: 'Complete' | 'Needs Calibration'
}

interface PeopleMetricCard {
  title: string
  value: string
  delta: string
  note: string
}

interface StrengthRow {
  label: string
  value: string
}

interface RestrictedCard {
  title: string
  visibility: string
}

interface TeamSummaryRow {
  team: string
  employees: string
  avgScore: string
  completed: string
  lowConfidence: string
  calibrationNeeded: string
}

const baseCategoryRows = [
  { category: 'Delivery & Reliability', self: '3.1', peer: '3.0', manager: '3.2', weighted: '3.11' },
  { category: 'Technical Quality', self: '3.4', peer: '3.1', manager: '3.2', weighted: '3.22' },
  { category: 'Collaboration & Communication', self: '3.3', peer: '3.5', manager: '3.4', weighted: '3.41' },
  { category: 'Ownership & Initiative', self: '3.5', peer: '3.2', manager: '3.6', weighted: '3.47' },
  { category: 'Learning & Growth', self: '3.0', peer: '2.9', manager: '3.1', weighted: '3.01' },
]

const cycleStats = {
  '2026-q2': { finalScore: '3.22', lowConfidence: '4', calibration: '7', momentum: '+0.12', gapTrend: [15, 20, 18, 14, 10], confidenceTrend: [32, 26, 19, 11, 8] },
  '2026-q1': { finalScore: '3.15', lowConfidence: '5', calibration: '9', momentum: '+0.07', gapTrend: [18, 22, 21, 18, 14], confidenceTrend: [35, 31, 27, 18, 12] },
  '2025-h2': { finalScore: '3.03', lowConfidence: '7', calibration: '11', momentum: 'Baseline', gapTrend: [24, 26, 23, 20, 17], confidenceTrend: [41, 39, 33, 26, 21] },
} as const

const teamHighlights = {
  all: {
    strengths: ['Ownership is strongest in frontend and backend senior contributors.', 'PM and QA feedback consistently praise proactive communication on risk.'],
    growthAreas: ['Learning & Growth lags in teams with heavy support or incident demand.', 'Peer reviewer coverage remains thin for cross-team contributors.'],
  },
  growth: {
    strengths: ['Growth Squad shows the clearest ownership progression in this cycle.', 'Cross-functional communication quality remains a standout strength.'],
    growthAreas: ['QA dependency close to release still interrupts deeper learning work.', 'Mid-level contributors need more explicit rollout ownership opportunities.'],
  },
  platform: {
    strengths: ['Platform engineers show strong technical judgment in high-risk work.', 'Incident ownership is consistently visible in both peer and manager narratives.'],
    growthAreas: ['Peer evidence quality is weaker for cross-board contributors.', 'Dependency-heavy work reduces development continuity and learning depth.'],
  },
  cx: {
    strengths: ['Customer Experience contributors score well on collaboration and release readiness.', 'QA communication quality is materially better than prior cycle.'],
    growthAreas: ['Automation depth still competes with support load.', 'Retest churn reduces time available for deliberate skill growth.'],
  },
}

const employees: EmployeeRecord[] = [
  { id: 'alya-pratama', name: 'Alya Pratama', role: 'Frontend Engineer', roleKey: 'fe', level: 'Senior', levelKey: 'senior', team: 'Growth Squad', teamKey: 'growth', finalScore: '3.31', confidence: 'Normal', focus: 'Scale ownership while preserving quality discipline', needsCalibration: false, status: 'Complete' },
  { id: 'bima-ramadhan', name: 'Bima Ramadhan', role: 'Backend Engineer', roleKey: 'be', level: 'Senior', levelKey: 'senior', team: 'Core Platform', teamKey: 'platform', finalScore: '3.14', confidence: 'Low confidence', focus: 'Improve peer coverage and reduce spillover from platform dependencies', needsCalibration: true, status: 'Needs Calibration' },
  { id: 'dion-mahardika', name: 'Dion Mahardika', role: 'QA Engineer', roleKey: 'qa', level: 'Middle', levelKey: 'middle', team: 'Customer Experience', teamKey: 'cx', finalScore: '3.27', confidence: 'Normal', focus: 'Strengthen automation depth and release-readiness visibility', needsCalibration: false, status: 'Complete' },
]

const topStrengths: StrengthRow[] = [
  { label: 'Technical Excellence', value: '78% of reviews' },
  { label: 'Collaboration', value: '65% of reviews' },
  { label: 'Problem Solving', value: '58% of reviews' },
  { label: 'Code Quality', value: '52% of reviews' },
]

const commonGrowthAreas: StrengthRow[] = [
  { label: 'Communication', value: '45% of reviews' },
  { label: 'Documentation', value: '38% of reviews' },
  { label: 'Time Management', value: '32% of reviews' },
  { label: 'Mentoring', value: '28% of reviews' },
]

const restrictedCards: RestrictedCard[] = [
  { title: 'Compensation Recommendations', visibility: 'Visible to HR and Head of Eng only' },
  { title: 'Exit Risk Analysis', visibility: 'Visible to HR only' },
  { title: 'Calibration Notes', visibility: 'Visible to HR and Head of Eng only' },
]

const teamSummaryRows: TeamSummaryRow[] = [
  { team: 'Growth Squad', employees: '8', avgScore: '3.31', completed: '92%', lowConfidence: '1', calibrationNeeded: '2' },
  { team: 'Core Platform', employees: '6', avgScore: '3.14', completed: '81%', lowConfidence: '3', calibrationNeeded: '4' },
  { team: 'Customer Experience', employees: '7', avgScore: '3.27', completed: '87%', lowConfidence: '1', calibrationNeeded: '1' },
]

export const employeeDetails = {
  'alya-pratama': {
    id: 'alya-pratama',
    name: 'Alya Pratama',
    role: 'Frontend Engineer',
    level: 'Senior',
    team: 'Growth Squad',
    cycle: '2026-Q2',
    categoryRows: baseCategoryRows,
    strengths: ['Consistently closes loop from implementation to production monitoring.', 'Cross-functional feedback highlights clear and proactive status communication.'],
    blockers: ['Design dependency and ad hoc support reduce focus time in late sprint.', 'PR review volume increases during release week and slows cycle time.'],
    actions: ['Pilot lighter review rotations to protect deep work windows.', 'Mentor one middle engineer on component ownership and rollout planning.'],
    managerOnly: ['Consider expanding Alya into broader squad-level ownership next cycle.'],
    previousCycles: [
      { label: '2025-H2', score: '3.06' },
      { label: '2026-Q1', score: '3.18' },
      { label: '2026-Q2', score: '3.31' },
    ],
  },
  'bima-ramadhan': {
    id: 'bima-ramadhan',
    name: 'Bima Ramadhan',
    role: 'Backend Engineer',
    level: 'Senior',
    team: 'Core Platform',
    cycle: '2026-Q2',
    categoryRows: baseCategoryRows,
    strengths: ['Handles high-risk platform work with solid incident ownership.', 'Peer feedback consistently mentions architectural judgment and calm decision-making.'],
    blockers: ['Cross-board support reduces review-cycle evidence density.', 'Manager and self scoring diverge on collaboration due to bandwidth pressure.'],
    actions: ['Reduce shared-support allocation during peak platform delivery windows.', 'Assign two stable peer reviewers for next cycle to improve evidence confidence.'],
    managerOnly: ['Role scope may need to formalize cross-team platform ownership next half.'],
    previousCycles: [
      { label: '2025-H2', score: '2.98' },
      { label: '2026-Q1', score: '3.08' },
      { label: '2026-Q2', score: '3.14' },
    ],
  },
  'dion-mahardika': {
    id: 'dion-mahardika',
    name: 'Dion Mahardika',
    role: 'QA Engineer',
    level: 'Middle',
    team: 'Customer Experience',
    cycle: '2026-Q2',
    categoryRows: baseCategoryRows,
    strengths: ['Improved release-readiness visibility with clearer defect triage updates.', 'Automation work is now more visible in peer and manager narratives.'],
    blockers: ['Frequent retest loops reduce available time for deeper automation coverage.', 'Cross-squad QA requests create fragmented focus and slower follow-through.'],
    actions: ['Define explicit regression ownership before sprint close.', 'Set one quarterly automation target tied to release confidence.'],
    managerOnly: ['Potential candidate for broader release-quality coordination after one more stable cycle.'],
    previousCycles: [
      { label: '2025-H2', score: '3.01' },
      { label: '2026-Q1', score: '3.17' },
      { label: '2026-Q2', score: '3.27' },
    ],
  },
} as const

function filterEmployees(filters: Filters) {
  return employees.filter((employee) => {
    const teamMatch = filters.team === 'all' || employee.teamKey === filters.team
    const roleMatch = filters.role === 'all' || employee.roleKey === filters.role
    const levelMatch = filters.level === 'all' || employee.levelKey === filters.level

    return teamMatch && roleMatch && levelMatch
  })
}

function getCategoryRows(filters: Filters) {
  if (filters.role === 'qa') {
    return baseCategoryRows.map((row) =>
      row.category === 'Learning & Growth' ? { ...row, weighted: '3.12', manager: '3.2' } : row,
    )
  }

  if (filters.team === 'platform') {
    return baseCategoryRows.map((row) =>
      row.category === 'Collaboration & Communication' ? { ...row, peer: '3.1', manager: '3.0', weighted: '3.05' } : row,
    )
  }

  return baseCategoryRows
}

export function getPeopleGrowthData(filters: Filters) {
  const cycle = cycleStats[filters.reviewCycle as keyof typeof cycleStats] ?? cycleStats['2026-q2']
  const filteredEmployees = filterEmployees(filters)
  const safeEmployees = filteredEmployees.length > 0 ? filteredEmployees : employees
  const highlights = teamHighlights[filters.team as keyof typeof teamHighlights] ?? teamHighlights.all
  const completedPercent = Math.min(100, 70 + safeEmployees.length * 5)
  const growthReadyCount = Math.max(1, safeEmployees.filter((employee) => Number(employee.finalScore) >= 3.25).length)
  const stats: PeopleMetricCard[] = [
    { title: 'Final Score (Avg)', value: `${cycle.finalScore}/5`, delta: 'Up', note: 'Weighted average across all employees.' },
    { title: 'Reviews Completed', value: `${completedPercent}%`, delta: 'Up', note: 'Self, peer, and manager reviews submitted.' },
    { title: 'Low Confidence Flags', value: String(safeEmployees.filter((employee) => employee.confidence === 'Low confidence').length || Number(cycle.lowConfidence)), delta: 'Down', note: 'Reviews with insufficient peer or evidence data.' },
    { title: 'Calibration Required', value: String(safeEmployees.filter((employee) => employee.needsCalibration).length || Number(cycle.calibration)), delta: 'Stable', note: 'Employees needing calibration review.' },
    { title: 'Growth Ready', value: String(growthReadyCount), delta: 'Up', note: 'Employees with strong readiness signals for broader scope.' },
  ]

  return {
    analyticsTabs: ['Category Trends', 'Score Distribution', 'Gap Analysis', 'Strengths & Areas'],
    peopleGrowthStats: stats,
    categoryRows: getCategoryRows(filters),
    peopleHighlights: highlights,
    employees: safeEmployees,
    gapTrend: cycle.gapTrend,
    confidenceTrend: cycle.confidenceTrend,
    topStrengths,
    commonGrowthAreas,
    restrictedCards,
    teamSummaryRows,
  }
}

export function getPeopleRoster() {
  return employees
}

export function getEmployeeDetail(employeeId: string) {
  return employeeDetails[employeeId as keyof typeof employeeDetails] ?? employeeDetails['alya-pratama']
}