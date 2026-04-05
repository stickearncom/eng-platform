import type { FilterKey } from '@/app/store/use-platform-store'
import {
  filterEngineeringDirectoryPeopleGrowthSeeds,
  getEngineeringDirectoryPeopleGrowthSeedCoverage,
} from '@/shared/mocks/employee-directory'

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
  trend: string
  trendTone: 'positive' | 'neutral' | 'negative'
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
  '2026-q2': {
    managerDelivery: '3.24',
    managerTechnical: '3.22',
    peerCollaboration: '3.41',
    managerCoordination: '3.18',
    managerOwnership: '3.35',
    managerGrowth: '3.08',
    selfReflection: '3.12',
    reviewCompletion: '92%',
    lowConfidence: '4',
    calibration: '7',
    categoryTrend: [61, 66, 71, 75, 79],
    collaborationTrend: [68, 72, 76, 79, 82],
    ownershipTrend: [57, 62, 67, 72, 76],
    reviewHealthTrend: [38, 31, 25, 18, 14],
  },
  '2026-q1': {
    managerDelivery: '3.16',
    managerTechnical: '3.14',
    peerCollaboration: '3.29',
    managerCoordination: '3.11',
    managerOwnership: '3.24',
    managerGrowth: '3.01',
    selfReflection: '3.05',
    reviewCompletion: '87%',
    lowConfidence: '5',
    calibration: '9',
    categoryTrend: [58, 63, 67, 71, 75],
    collaborationTrend: [65, 69, 72, 76, 79],
    ownershipTrend: [54, 59, 63, 68, 72],
    reviewHealthTrend: [44, 36, 30, 23, 18],
  },
  '2025-h2': {
    managerDelivery: '3.05',
    managerTechnical: '3.02',
    peerCollaboration: '3.17',
    managerCoordination: '3.02',
    managerOwnership: '3.12',
    managerGrowth: '2.94',
    selfReflection: '2.98',
    reviewCompletion: '81%',
    lowConfidence: '7',
    calibration: '11',
    categoryTrend: [52, 57, 61, 66, 70],
    collaborationTrend: [59, 63, 67, 70, 74],
    ownershipTrend: [48, 53, 58, 62, 67],
    reviewHealthTrend: [51, 44, 38, 31, 24],
  },
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
  { label: 'Ownership & Initiative', value: '71% of reviews' },
  { label: 'Collaboration & Communication', value: '68% of reviews' },
  { label: 'Technical Quality', value: '62% of reviews' },
  { label: 'Delivery & Reliability', value: '57% of reviews' },
]

const commonGrowthAreas: StrengthRow[] = [
  { label: 'Learning & Growth', value: '46% of reviews' },
  { label: 'Cross-team coordination', value: '39% of reviews' },
  { label: 'Evidence quality in peer review', value: '31% of reviews' },
  { label: 'Release-readiness communication', value: '27% of reviews' },
]

const restrictedCards: RestrictedCard[] = [
  { title: 'Manager Private Notes', visibility: 'Visible to Engineering Manager only' },
  { title: 'Calibration Notes', visibility: 'Visible to HR and Head of Engineering / VP Engineering only' },
  { title: 'HR Follow-up Actions', visibility: 'Visible to HR only' },
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
  const stats: PeopleMetricCard[] = [
    { title: 'Manager Delivery Reliability Score', value: `${cycle.managerDelivery}/5`, trend: 'Up', trendTone: 'positive', note: 'Manager-scored delivery consistency and follow-through for the active review cycle.' },
    { title: 'Manager Technical Quality Score', value: `${cycle.managerTechnical}/5`, trend: 'Up', trendTone: 'positive', note: 'Manager-scored technical quality signal for reviewed engineers in scope.' },
    { title: 'Peer Communication and Collaboration Score', value: `${cycle.peerCollaboration}/5`, trend: 'Up', trendTone: 'positive', note: 'Peer-based communication and collaboration signal across reviewed engineers.' },
    { title: 'Manager Coordination Effectiveness Score', value: `${cycle.managerCoordination}/5`, trend: 'Stable', trendTone: 'neutral', note: 'Manager view of planning, coordination, and cross-functional operating effectiveness.' },
    { title: 'Manager Ownership Score', value: `${cycle.managerOwnership}/5`, trend: 'Up', trendTone: 'positive', note: 'Manager-scored ownership and initiative signal for the active cycle.' },
    { title: 'Manager Growth Score', value: `${cycle.managerGrowth}/5`, trend: 'Stable', trendTone: 'neutral', note: 'Manager-scored learning and growth signal used for coaching and development follow-up.' },
  ]

  return {
    analyticsTabs: ['Category Trends', 'Collaboration Signals', 'Ownership & Growth', 'Review Cycle Health'],
    peopleGrowthStats: stats,
    categoryRows: getCategoryRows(filters),
    peopleHighlights: highlights,
    employees: safeEmployees,
    categoryTrend: cycle.categoryTrend,
    collaborationTrend: cycle.collaborationTrend,
    ownershipTrend: cycle.ownershipTrend,
    reviewHealthTrend: cycle.reviewHealthTrend,
    reviewCompletion: cycle.reviewCompletion,
    selfReflection: cycle.selfReflection,
    lowConfidenceCount: String(safeEmployees.filter((employee) => employee.confidence === 'Low confidence').length || Number(cycle.lowConfidence)),
    calibrationCount: String(safeEmployees.filter((employee) => employee.needsCalibration).length || Number(cycle.calibration)),
    topStrengths,
    commonGrowthAreas,
    restrictedCards,
    teamSummaryRows,
    directorySeedCoverage: getEngineeringDirectoryPeopleGrowthSeedCoverage(),
    directorySeeds: filterEngineeringDirectoryPeopleGrowthSeeds({
      team: filters.team,
      role: filters.role,
      level: filters.level,
    }),
  }
}

export function getPeopleRoster() {
  return employees
}

export function getEmployeeDetail(employeeId: string) {
  return employeeDetails[employeeId as keyof typeof employeeDetails] ?? employeeDetails['alya-pratama']
}