import type { FilterKey } from '@/app/store/use-platform-store'
import type { Audience } from '@/shared/config/audience'

type Filters = Record<FilterKey, string>

export interface SummaryCardData {
  title: string
  value: string
  delta: string
  note: string
  target: string
  status: 'On Track' | 'Watch' | 'At Risk'
}

interface SummaryNarrative {
  headline: string
  summary: string
  implication: string
}

interface RecommendedAction {
  title: string
  owner: string
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
    { title: 'Delivery Confidence', value: '81%', delta: '+6 pts', note: 'Planning accuracy improved after scope-change review became mandatory.', target: '>= 80%', status: 'On Track' },
    { title: 'Quality & Reliability', value: '9 escaped bugs', delta: '-18%', note: 'Production defects are down, but one platform incident remains open.', target: '<= 8 bugs', status: 'Watch' },
    { title: 'Engineering Flow', value: '14h PR turnaround', delta: '-3h', note: 'Review latency is healthiest in Growth Squad and weakest in Core Platform.', target: '<= 16h', status: 'On Track' },
    { title: 'People Growth', value: '3.22 / 4', delta: '+0.08', note: 'Ownership & Initiative is the strongest category this cycle.', target: '>= 3.2 / 4', status: 'On Track' },
    { title: 'Org Risk', value: '2 hotspots', delta: 'Needs attention', note: 'Cross-team allocation and QA support load are the main pressure points.', target: '<= 1 hotspot', status: 'At Risk' },
  ],
  growth: [
    { title: 'Delivery Confidence', value: '86%', delta: '+4 pts', note: 'Growth Squad execution stabilized after stricter intake on mid-sprint work.', target: '>= 82%', status: 'On Track' },
    { title: 'Quality & Reliability', value: '3 escaped bugs', delta: '-25%', note: 'Release quality is healthy, with only minor post-release fixes.', target: '<= 4 bugs', status: 'On Track' },
    { title: 'Engineering Flow', value: '11h PR turnaround', delta: '-2h', note: 'Review loops are fast because ownership and reviewer rotation are clearer.', target: '<= 12h', status: 'On Track' },
    { title: 'People Growth', value: '3.31 / 4', delta: '+0.11', note: 'Ownership and communication are both trending upward.', target: '>= 3.2 / 4', status: 'On Track' },
    { title: 'Org Risk', value: '1 hotspot', delta: 'Contained', note: 'Risk mainly comes from shared QA support close to release cut-off.', target: '<= 1 hotspot', status: 'Watch' },
  ],
  platform: [
    { title: 'Delivery Confidence', value: '72%', delta: '-2 pts', note: 'Dependency-heavy work is still reducing forecast reliability.', target: '>= 80%', status: 'At Risk' },
    { title: 'Quality & Reliability', value: '1 open incident', delta: 'Critical follow-up', note: 'Defect count is stable, but unresolved platform work weighs more here.', target: '0 open incidents', status: 'At Risk' },
    { title: 'Engineering Flow', value: '18h PR turnaround', delta: '+1h', note: 'Architecture reviews are healthy, but too many shared requests slow completion.', target: '<= 16h', status: 'Watch' },
    { title: 'People Growth', value: '3.14 / 4', delta: '+0.04', note: 'Calibration confidence is weaker for cross-board contributors.', target: '>= 3.2 / 4', status: 'Watch' },
    { title: 'Org Risk', value: '3 hotspots', delta: 'Escalate', note: 'Carry-over, dependency delay, and stretched senior bandwidth overlap.', target: '<= 1 hotspot', status: 'At Risk' },
  ],
  cx: [
    { title: 'Delivery Confidence', value: '79%', delta: '+3 pts', note: 'Delivery confidence improved after release-readiness checks became more explicit.', target: '>= 80%', status: 'Watch' },
    { title: 'Quality & Reliability', value: '5 escaped bugs', delta: '-12%', note: 'Bug volume is down, though retest load is still uneven.', target: '<= 4 bugs', status: 'Watch' },
    { title: 'Engineering Flow', value: '13h PR turnaround', delta: '-1h', note: 'Work moves well when QA focus is protected before release windows.', target: '<= 14h', status: 'On Track' },
    { title: 'People Growth', value: '3.27 / 4', delta: '+0.09', note: 'Collaboration is strong, with growth focus now shifting to automation depth.', target: '>= 3.2 / 4', status: 'On Track' },
    { title: 'Org Risk', value: '2 hotspots', delta: 'Watch', note: 'Risk concentrates around QA bandwidth and last-minute release support.', target: '<= 1 hotspot', status: 'Watch' },
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

const summaryNarrativeByAudience: Record<Audience, Record<string, SummaryNarrative>> = {
  executive: {
    all: {
      headline: 'Delivery confidence is improving, but organizational risk remains concentrated in Core Platform.',
      summary: 'Engineering is trending better on forecast reliability, review flow, and people signals, while cross-team load and unresolved dependency pressure still weaken portfolio predictability.',
      implication: 'Leadership attention is mainly needed on capacity concentration, dependency governance, and resolving the remaining reliability hotspot.',
    },
    growth: {
      headline: 'Growth Squad is on track across delivery, quality, and people goals.',
      summary: 'Execution remains predictable and people signals are strong, with the main watch item staying around shared QA load near release windows.',
      implication: 'This team can take broader ownership if shared QA dependence is kept controlled.',
    },
    platform: {
      headline: 'Core Platform is the main source of portfolio delivery and org-risk pressure.',
      summary: 'Carry-over, dependency churn, and cross-board support are collectively weakening delivery confidence more than raw throughput metrics suggest.',
      implication: 'This is the clearest candidate for leadership intervention on scope protection and staffing allocation.',
    },
    cx: {
      headline: 'Customer Experience is stabilizing, but release confidence is still sensitive to QA bottlenecks.',
      summary: 'Quality and flow are improving, though late quality loops still create planning noise close to sprint close.',
      implication: 'Stakeholder confidence remains positive if QA bandwidth is protected at release time.',
    },
  },
  'engineering-manager': {
    all: {
      headline: 'Overall engineering health is positive, but team-level execution quality is uneven.',
      summary: 'Growth and Customer Experience are trending well, while Core Platform still shows the highest operational drag across dependencies, flow, and calibration confidence.',
      implication: 'Manager focus should stay on dependency intake, reviewer coverage, and protecting capacity where support load distorts outcomes.',
    },
    growth: {
      headline: 'Growth Squad is operating from a strong base this cycle.',
      summary: 'Planning, quality, and people signals all point upward, with only a narrow risk around release-week QA compression.',
      implication: 'This is a good team for stretching ownership if support interruptions stay low.',
    },
    platform: {
      headline: 'Platform needs tighter operating discipline to recover predictability.',
      summary: 'Flow and people evidence both degrade when dependency work and shared support enter too late in the cycle.',
      implication: 'The immediate management lever is better intake challenge and clearer protected capacity.',
    },
    cx: {
      headline: 'Customer Experience is improving with healthier release-readiness patterns.',
      summary: 'Team health is generally stable, with growth and collaboration signals remaining positive despite QA-sensitive release cycles.',
      implication: 'Keep reinforcing release hygiene and protect automation work from support churn.',
    },
  },
  'scrum-master': {
    all: {
      headline: 'Sprint health is broadly improving, but scope and blocker patterns are still uneven by team.',
      summary: 'Planning accuracy is moving in the right direction, though added-after-start work and dependency timing still distort platform and shared-support outcomes.',
      implication: 'The main delivery goal is to tighten sprint boundaries and remove blocker drag earlier.',
    },
    growth: {
      headline: 'Growth Squad has the cleanest sprint discipline in the portfolio.',
      summary: 'Added-after-start work is lower than the org average and blocker pressure remains manageable.',
      implication: 'The best next step is preserving that planning discipline as scope expands.',
    },
    platform: {
      headline: 'Platform sprint health remains the most unstable in the org.',
      summary: 'Late dependency work and shared support requests keep undermining initial sprint assumptions.',
      implication: 'Delivery management should focus on intake timing and blocker escalation speed.',
    },
    cx: {
      headline: 'Customer Experience is improving, with most risk tied to release timing.',
      summary: 'Planning is healthier, but retest churn and QA load still generate late sprint noise.',
      implication: 'Release coordination remains the key delivery-management lever.',
    },
  },
  hr: {
    all: {
      headline: 'People Growth is healthy overall, but evidence quality is not evenly distributed.',
      summary: 'The organization is trending upward on growth scores, while backend and cross-team contributors still show thinner peer coverage and lower confidence narratives.',
      implication: 'HR attention should stay on calibration quality, reviewer coverage, and role-scope clarity in higher-load teams.',
    },
    growth: {
      headline: 'Growth Squad has the strongest review confidence and the healthiest narrative coverage.',
      summary: 'Scores and qualitative signals both indicate stable growth momentum in this team.',
      implication: 'The people goal here is sustaining momentum as ownership expectations increase.',
    },
    platform: {
      headline: 'Core Platform remains the main people-risk area this cycle.',
      summary: 'Low-confidence evidence and cross-team load are making review interpretation harder than it should be.',
      implication: 'Calibration quality should improve through better reviewer coverage and clearer role boundaries.',
    },
    cx: {
      headline: 'Customer Experience people signals are improving and becoming more consistent.',
      summary: 'Collaboration and readiness narratives are healthier than prior cycle, though support load still competes with deliberate skill growth.',
      implication: 'Maintain explicit role expectations so people data stays interpretable over time.',
    },
  },
}

const recommendedActionsByAudience: Record<Audience, Record<string, RecommendedAction[]>> = {
  executive: {
    all: [
      { title: 'Protect Platform capacity', owner: 'Head of Engineering', note: 'Reduce cross-board dilution for senior platform contributors this cycle.' },
      { title: 'Tighten dependency governance', owner: 'EM + Product', note: 'Escalate late dependency intake that keeps distorting sprint confidence.' },
      { title: 'Stabilize QA support load', owner: 'Engineering Leadership', note: 'Rebalance shared QA coverage before release pressure rises again.' },
    ],
    growth: [
      { title: 'Preserve QA coverage', owner: 'Delivery Lead', note: 'Keep shared QA bottlenecks from eroding an otherwise strong team.' },
      { title: 'Stretch ownership safely', owner: 'Engineering Manager', note: 'Expand scope for high-confidence contributors while keeping review quality intact.' },
    ],
    platform: [
      { title: 'Escalate dependency intake', owner: 'Head of Engineering', note: 'Challenge late dependencies before they enter committed sprint scope.' },
      { title: 'Reallocate senior bandwidth', owner: 'Engineering Leadership', note: 'Protect senior backend focus from support fragmentation.' },
    ],
    cx: [
      { title: 'Protect release QA windows', owner: 'Delivery Lead', note: 'Keep release confidence from regressing under retest load.' },
      { title: 'Sustain release-readiness checks', owner: 'Engineering Manager', note: 'Maintain the planning improvements that recently raised confidence.' },
    ],
  },
  'engineering-manager': {
    all: [
      { title: 'Tighten reviewer coverage', owner: 'Engineering Manager', note: 'Low-confidence evidence still clusters in cross-team contributors.' },
      { title: 'Guard deep work time', owner: 'Team Leads', note: 'Support load is still weakening flow and coaching continuity in some teams.' },
      { title: 'Review escalation candidates', owner: 'Head of Engineering', note: 'Platform risk should be explicitly reviewed in the next planning cycle.' },
    ],
    growth: [
      { title: 'Expand ownership carefully', owner: 'Engineering Manager', note: 'Use current momentum to grow scope for stronger contributors.' },
      { title: 'Reduce release compression', owner: 'Scrum Master', note: 'QA pressure is the main friction point left in this team.' },
    ],
    platform: [
      { title: 'Protect platform focus', owner: 'Engineering Manager', note: 'Shared support is degrading both delivery and review signal quality.' },
      { title: 'Improve peer evidence quality', owner: 'Team Leads', note: 'Assign steadier reviewer coverage for cross-board contributors.' },
    ],
    cx: [
      { title: 'Protect automation time', owner: 'Engineering Manager', note: 'Support interruptions still compete with deliberate improvement work.' },
      { title: 'Keep release hygiene explicit', owner: 'Delivery Lead', note: 'Current gains depend on maintaining readiness discipline.' },
    ],
  },
  'scrum-master': {
    all: [
      { title: 'Reduce added-after-start work', owner: 'Scrum Master', note: 'Late intake remains a recurring source of plan distortion.' },
      { title: 'Escalate blockers sooner', owner: 'Delivery Lead', note: 'Blocker age is still too uneven across teams.' },
    ],
    growth: [
      { title: 'Preserve sprint boundaries', owner: 'Scrum Master', note: 'This team is strongest when intake stays disciplined.' },
      { title: 'Smooth QA handoff', owner: 'QA Lead', note: 'Release-week pressure remains the main operational risk.' },
    ],
    platform: [
      { title: 'Challenge late dependencies', owner: 'Scrum Master', note: 'Platform scope is still most vulnerable to external timing shocks.' },
      { title: 'Review blocker escalation path', owner: 'Delivery Lead', note: 'Blocker removal speed is lagging the rest of the org.' },
    ],
    cx: [
      { title: 'Reduce retest churn', owner: 'QA Lead', note: 'Late quality loops still create avoidable sprint noise.' },
      { title: 'Protect release sequencing', owner: 'Scrum Master', note: 'Coordination remains the key operational lever here.' },
    ],
  },
  hr: {
    all: [
      { title: 'Improve reviewer coverage', owner: 'HRBP + Eng Manager', note: 'Backend and cross-team contributors still show thinner evidence quality.' },
      { title: 'Watch calibration quality', owner: 'HRBP', note: 'High-load teams need extra attention so people data remains interpretable.' },
    ],
    growth: [
      { title: 'Sustain strong narrative quality', owner: 'HRBP', note: 'This team is currently the best baseline for healthy review practice.' },
      { title: 'Monitor growth expectations', owner: 'Engineering Manager', note: 'Higher ownership should stay aligned with role clarity.' },
    ],
    platform: [
      { title: 'Strengthen evidence confidence', owner: 'HRBP + Eng Manager', note: 'Platform remains the weakest area for review interpretability.' },
      { title: 'Clarify role scope', owner: 'Engineering Leadership', note: 'Cross-team ownership is broader than current review structure reflects.' },
    ],
    cx: [
      { title: 'Protect development continuity', owner: 'HRBP + Manager', note: 'Support load can still weaken long-term growth signals.' },
      { title: 'Maintain explicit QA expectations', owner: 'Manager', note: 'Role clarity is helping keep data quality healthier here.' },
    ],
  },
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
    summaryNarrative: summaryNarrativeByAudience[audience][teamKey],
    summaryCards,
    trendSeries,
    trendPanels,
    riskHighlights,
    leadershipInsights: leadershipInsightsByTeam[teamKey],
    quickActions: quickActionsByTeam[teamKey],
    recommendedActions: recommendedActionsByAudience[audience][teamKey],
    teamHealthRows: teamHealthRowsByTeam[teamKey],
  }
}