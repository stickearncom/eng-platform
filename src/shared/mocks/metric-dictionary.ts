export interface MetricDictionaryEntry {
  name: string
  module: 'Engineering Summary' | 'Delivery Insights' | 'People Growth' | 'Data Governance'
  aliases?: string[]
  definition: string
  whyItMatters: string
  formula: string
  source: string
  owner: string
  refreshCadence: string
  audience: string
  caveat: string
}

export interface MetricDictionarySpotlight {
  title: string
  value: string
  note: string
}

export const metricDictionaryEntries: MetricDictionaryEntry[] = [
  {
    name: 'Delivery Confidence Index',
    module: 'Engineering Summary',
    definition: 'Leadership-level composite signal summarizing whether current delivery behavior supports confidence in near-term engineering commitments.',
    whyItMatters: 'Gives leadership a compact view of planning discipline, carry-over pressure, and blocker friction without overfocusing on one operational metric.',
    formula: 'Aggregated from Sprint Predictability, Scope Change Ratio, Carry-over Rate, and Blocked Ticket Ratio.',
    source: 'Jira sprint data and delivery aggregation layer',
    owner: 'Head of Engineering / VP Engineering',
    refreshCadence: 'Weekly',
    audience: 'Founder / C-Level, Head of Engineering / VP Engineering, Engineering Manager',
    caveat: 'Leadership summary only. It should not be treated as an individual or squad score without checking delivery drill-down context.',
  },
  {
    name: 'Quality and Reliability Index',
    module: 'Engineering Summary',
    definition: 'Summary signal for quality pressure and reliability risk across engineering teams.',
    whyItMatters: 'Helps leadership spot when delivery looks healthy on paper but quality risk is accumulating underneath.',
    formula: 'Aggregated from defect and incident signals plus internal quality review indicators when available.',
    source: 'Incident tracking, bug summaries, and engineering quality rollups',
    owner: 'Engineering Manager and QA lead',
    refreshCadence: 'Weekly',
    audience: 'Founder / C-Level, Head of Engineering / VP Engineering, Engineering Manager, Scrum Master',
    caveat: 'Low incident count alone does not guarantee healthy quality if unresolved systemic issues remain open.',
  },
  {
    name: 'Engineering Flow Efficiency Index',
    module: 'Engineering Summary',
    definition: 'High-level signal for how smoothly engineering work moves from commitment through completion.',
    whyItMatters: 'Makes workflow friction visible before it shows up as missed delivery or unstable sprint outcomes.',
    formula: 'Aggregated from flow-friction signals such as Blocked Ticket Ratio, Average Blocked Duration, and carry-over behavior.',
    source: 'Jira workflow data and team operations rollups',
    owner: 'Engineering Manager',
    refreshCadence: 'Weekly',
    audience: 'Head of Engineering / VP Engineering, Engineering Manager',
    caveat: 'Interpret together with scope mix and dependency load. Infrastructure or migration work can depress flow signals temporarily.',
  },
  {
    name: 'Collaboration Health Index',
    module: 'Engineering Summary',
    definition: 'Leadership summary of collaboration and coordination signals across engineering teams.',
    whyItMatters: 'Highlights whether cross-functional collaboration is strengthening or becoming a drag on execution and review quality.',
    formula: 'Aggregated from Peer Communication and Collaboration Score and Manager Coordination Effectiveness Score.',
    source: 'Engineering review workflow and collaboration signal rollups',
    owner: 'Engineering Manager and HR',
    refreshCadence: 'Per review cycle',
    audience: 'Head of Engineering / VP Engineering, Engineering Manager, HR',
    caveat: 'Summary only. Use detailed people-growth metrics before acting on coaching or team intervention decisions.',
  },
  {
    name: 'People Growth Summary Index',
    module: 'Engineering Summary',
    definition: 'Leadership summary of the engineering review signals that are safe to expose at organizational level.',
    whyItMatters: 'Lets leadership track whether growth, ownership, and collaboration are moving in the right direction without overexposing confidential detail.',
    formula: 'Aggregated from manager and peer people-growth scores approved for dashboard exposure.',
    source: 'Engineering review scoring workflow',
    owner: 'Head of Engineering / VP Engineering and HR',
    refreshCadence: 'Per review cycle',
    audience: 'Founder / C-Level, Head of Engineering / VP Engineering, HR',
    caveat: 'Do not treat this as a substitute for calibration review, evidence quality review, or manager judgement.',
  },
  {
    name: 'Org Capacity and Risk Index',
    module: 'Engineering Summary',
    definition: 'Leadership signal summarizing concentrated delivery and staffing risk areas such as shared support load, blocker concentration, and thin review evidence.',
    whyItMatters: 'Allows leadership to focus on the most material organizational risks affecting delivery confidence and people stability.',
    formula: 'Qualitative and quantitative risk synthesis from capacity planning, blocker trends, carry-over, and review-confidence signals.',
    source: 'Engineering summary model',
    owner: 'Head of Engineering / VP Engineering',
    refreshCadence: 'Weekly',
    audience: 'Founder / C-Level, Head of Engineering / VP Engineering, HR',
    caveat: 'Hotspots are grouped themes, not a raw count of incidents, blockers, or people issues.',
  },
  {
    name: 'Sprint Predictability',
    module: 'Delivery Insights',
    definition: 'Measures how much initially committed sprint scope was completed by sprint close.',
    whyItMatters: 'Shows whether the team can reliably complete the work it planned at sprint start.',
    formula: 'Completed initial committed scope divided by initial committed scope.',
    source: 'Jira sprint commitment and completion history',
    owner: 'Scrum Master and Engineering Manager',
    refreshCadence: 'Per sprint',
    audience: 'Engineering Manager, Scrum Master',
    caveat: 'Read together with Scope Change Ratio. A lower score can be legitimate when major incidents or escalations interrupt the sprint.',
  },
  {
    name: 'Scope Change Ratio',
    module: 'Delivery Insights',
    definition: 'Measures how much work was added, removed, or materially changed after sprint start.',
    whyItMatters: 'Highlights planning instability and late intake that can distort sprint outcomes.',
    formula: 'Changed scope after sprint start divided by initial committed scope.',
    source: 'Jira sprint scope history',
    owner: 'Scrum Master and Engineering Manager',
    refreshCadence: 'Per sprint',
    audience: 'Engineering Manager, Scrum Master',
    caveat: 'High scope change is not automatically a planning failure if production support or priority incidents were intentionally absorbed mid-sprint.',
  },
  {
    name: 'Carry-over Rate',
    module: 'Delivery Insights',
    definition: 'Measures the share of committed work that carried into the next sprint unfinished.',
    whyItMatters: 'Shows whether teams are overcommitting or being disrupted during execution.',
    formula: 'Unfinished committed scope divided by total committed scope.',
    source: 'Jira sprint completion data',
    owner: 'Scrum Master and Engineering Manager',
    refreshCadence: 'Per sprint',
    audience: 'Engineering Manager, Scrum Master',
    caveat: 'Carry-over alone does not explain why work spilled. It must be read with blocker and scope-change context.',
  },
  {
    name: 'Carry-over With Documented Reason Rate',
    module: 'Delivery Insights',
    definition: 'Measures what share of carry-over items have an explicit documented reason before sprint close.',
    whyItMatters: 'Improves follow-up quality and reduces retrospective ambiguity around spillover.',
    formula: 'Carry-over items with documented reason divided by total carry-over items.',
    source: 'Jira carry-over items plus sprint close notes',
    owner: 'Scrum Master',
    refreshCadence: 'Per sprint',
    audience: 'Engineering Manager, Scrum Master',
    caveat: 'A documented reason improves traceability but does not make the carry-over itself healthy.',
  },
  {
    name: 'Blocked Ticket Ratio',
    module: 'Delivery Insights',
    definition: 'Measures the share of in-sprint work that became blocked during execution.',
    whyItMatters: 'Makes dependency and clarification pressure visible before it cascades into lower predictability.',
    formula: 'Blocked tickets divided by total tickets worked during the sprint.',
    source: 'Jira blocked status history',
    owner: 'Scrum Master and Engineering Manager',
    refreshCadence: 'Per sprint',
    audience: 'Engineering Manager, Scrum Master',
    caveat: 'Interpret blocker ratio together with blocker duration. A brief block is materially different from a long-lived one.',
  },
  {
    name: 'Average Blocked Duration',
    module: 'Delivery Insights',
    definition: 'Average time blocked tickets remained in blocked state during the sprint.',
    whyItMatters: 'Shows how quickly teams clear execution friction once blockers appear.',
    formula: 'Total blocked time divided by blocked ticket count.',
    source: 'Jira blocked status duration history',
    owner: 'Scrum Master and Engineering Manager',
    refreshCadence: 'Per sprint',
    audience: 'Engineering Manager, Scrum Master',
    caveat: 'Should not be interpreted as a blame signal. Some blockers depend on other teams or external systems.',
  },
  {
    name: 'Sprint Health Score',
    module: 'Delivery Insights',
    aliases: ['Sprint Health Composition'],
    definition: 'Composite sprint execution signal combining predictability, scope stability, carry-over, and blocker behavior.',
    whyItMatters: 'Provides a compact operational summary of sprint quality without relying on velocity.',
    formula: 'Weighted combination of completion rate score, scope stability score, carry-over score, and blocker score.',
    source: 'Jira sprint data and delivery aggregation layer',
    owner: 'Scrum Master and Engineering Manager',
    refreshCadence: 'Per sprint',
    audience: 'Engineering Manager, Scrum Master',
    caveat: 'Team-level signal only. It must not be repurposed into employee performance scoring.',
  },
  {
    name: 'Capacity Load vs Available Capacity',
    module: 'Delivery Insights',
    aliases: ['Capacity Planning', 'Capacity vs Commitment'],
    definition: 'Compares planned team load against realistic available capacity for the sprint.',
    whyItMatters: 'Supports healthier sprint commitment and helps explain recurring carry-over or predictability issues.',
    formula: 'Committed load compared to estimated available team capacity and explicit sprint buffer.',
    source: 'Sprint planning inputs and team capacity assumptions',
    owner: 'Scrum Master and Engineering Manager',
    refreshCadence: 'Per sprint',
    audience: 'Engineering Manager, Scrum Master',
    caveat: 'Capacity assumptions can be noisy if support load, leave, or cross-team work is not modeled explicitly.',
  },
  {
    name: 'Manager Delivery Reliability Score',
    module: 'People Growth',
    definition: 'Manager-scored delivery and reliability signal from the engineering review cycle.',
    whyItMatters: 'Makes delivery follow-through visible in the people-growth process without turning sprint delivery metrics into individual KPIs.',
    formula: 'Average manager review score for the Delivery and Reliability category.',
    source: 'Engineering review manager form',
    owner: 'Engineering Manager',
    refreshCadence: 'Per review cycle',
    audience: 'Engineering Manager, HR',
    caveat: 'Interpret with review evidence quality and narrative context. This is a review signal, not a delivery output measure.',
  },
  {
    name: 'Manager Technical Quality Score',
    module: 'People Growth',
    definition: 'Manager-scored technical quality signal from the engineering review cycle.',
    whyItMatters: 'Keeps technical quality visible in growth discussions without conflating it with operational delivery speed.',
    formula: 'Average manager review score for the Technical Quality category.',
    source: 'Engineering review manager form',
    owner: 'Engineering Manager',
    refreshCadence: 'Per review cycle',
    audience: 'Engineering Manager, HR',
    caveat: 'Read alongside evidence quality, role scope, and work complexity. It is not a substitute for code review metrics.',
  },
  {
    name: 'Peer Communication and Collaboration Score',
    module: 'People Growth',
    definition: 'Peer-scored communication and collaboration signal from the engineering review cycle.',
    whyItMatters: 'Provides direct peer input on how effectively engineers work with others, which is often invisible in delivery-only metrics.',
    formula: 'Average peer review score for the Collaboration and Communication category.',
    source: 'Engineering review peer form',
    owner: 'Engineering Manager',
    refreshCadence: 'Per review cycle',
    audience: 'Engineering Manager, HR',
    caveat: 'Requires sufficient peer coverage and reviewer quality. Low confidence should trigger caution in interpretation.',
  },
  {
    name: 'Manager Coordination Effectiveness Score',
    module: 'People Growth',
    definition: 'Manager-scored coordination and operating effectiveness signal from the engineering review cycle.',
    whyItMatters: 'Makes planning, communication, and cross-functional operating quality visible in the growth process.',
    formula: 'Average manager review score for the Collaboration and Communication category where coordination aspects are emphasized.',
    source: 'Engineering review manager form',
    owner: 'Engineering Manager',
    refreshCadence: 'Per review cycle',
    audience: 'Engineering Manager, HR',
    caveat: 'Interpret within role scope. Some roles coordinate more broadly than others, which affects the ceiling and expectation.',
  },
  {
    name: 'Manager Ownership Score',
    module: 'People Growth',
    definition: 'Manager-scored ownership and initiative signal from the engineering review cycle.',
    whyItMatters: 'Shows whether engineers are taking responsibility appropriate to their current role and expected next-step scope.',
    formula: 'Average manager review score for the Ownership and Initiative category.',
    source: 'Engineering review manager form',
    owner: 'Engineering Manager',
    refreshCadence: 'Per review cycle',
    audience: 'Engineering Manager, HR',
    caveat: 'High ownership should be supported by narrative evidence. Do not infer promotion readiness from this score alone.',
  },
  {
    name: 'Manager Growth Score',
    module: 'People Growth',
    definition: 'Manager-scored learning and growth signal from the engineering review cycle.',
    whyItMatters: 'Keeps development trajectory explicit in the review process rather than focusing only on present-day delivery quality.',
    formula: 'Average manager review score for the Learning and Growth category.',
    source: 'Engineering review manager form',
    owner: 'Engineering Manager',
    refreshCadence: 'Per review cycle',
    audience: 'Engineering Manager, HR',
    caveat: 'This is a coaching signal. It should be interpreted with development plans, not as a ranking shortcut.',
  },
  {
    name: 'Self Growth Reflection Score',
    module: 'People Growth',
    definition: 'Self-scored reflection on learning and growth in the review cycle.',
    whyItMatters: 'Provides a structured self-view that can be compared with manager coaching perspective without becoming a direct calibration score.',
    formula: 'Average self-review score for the Learning and Growth category.',
    source: 'Engineering review self-reflection form',
    owner: 'Engineering Manager and HR',
    refreshCadence: 'Per review cycle',
    audience: 'Engineering Manager, HR',
    caveat: 'Use as supporting context only. Self-reflection is valuable but should not outweigh manager and peer evidence on its own.',
  },
  {
    name: 'Definition Status',
    module: 'Data Governance',
    definition: 'Readiness label showing whether a metric definition is implementation-ready, needs data mapping, or needs process change.',
    whyItMatters: 'Prevents teams from building dashboards on metrics that are not operationally ready yet.',
    formula: 'Metadata field maintained per metric definition.',
    source: 'Metric governance model',
    owner: 'Product and analytics owner',
    refreshCadence: 'When definitions change',
    audience: 'All audiences',
    caveat: 'A Defined label still depends on data quality in the source system.',
  },
  {
    name: 'Source of Truth',
    module: 'Data Governance',
    definition: 'Declared system or workflow considered authoritative for each metric.',
    whyItMatters: 'Avoids cross-team disputes caused by different spreadsheet, dashboard, or operational definitions.',
    formula: 'Metadata field maintained per metric.',
    source: 'Metric governance model',
    owner: 'Platform and analytics owner',
    refreshCadence: 'When definitions change',
    audience: 'All audiences',
    caveat: 'Source systems can still contain operational noise; source of truth does not guarantee perfect raw data.',
  },
  {
    name: 'Interpretation Guardrail',
    module: 'Data Governance',
    definition: 'Explicit caveat describing how a metric should and should not be used.',
    whyItMatters: 'Prevents misuse, especially when stakeholders are tempted to convert operational metrics into individual KPIs.',
    formula: 'Policy note maintained per metric.',
    source: 'Metric governance model',
    owner: 'Product + Engineering Leadership + HR',
    refreshCadence: 'When governance policy changes',
    audience: 'All audiences',
    caveat: 'Must be visible near metrics or governance is quickly forgotten in day-to-day use.',
  },
]

export const metricDictionarySpotlights: MetricDictionarySpotlight[] = [
  { title: 'Governed Metrics', value: '24', note: 'Metrics in this prototype have explicit definition, source, audience, and guardrail metadata.' },
  { title: 'Source Systems', value: '4', note: 'Jira, engineering review workflow, summary model, and governance metadata.' },
  { title: 'Primary Audiences', value: '5', note: 'Founder / C-Level, Head of Engineering / VP Engineering, Engineering Manager, Scrum Master, and HR read this layer differently.' },
  { title: 'Critical Guardrails', value: '3', note: 'Delivery metrics are not employee KPIs, review evidence quality matters, and each metric needs an explicit source of truth.' },
]

export function getMetricDictionaryModules() {
  return ['Engineering Summary', 'Delivery Insights', 'People Growth', 'Data Governance'] as const
}

function normalizeMetricLabel(value: string) {
  return value.trim().toLowerCase()
}

export function findMetricDictionaryEntry(metricName: string, preferredModule?: MetricDictionaryEntry['module']) {
  const normalizedMetricName = normalizeMetricLabel(metricName)

  return metricDictionaryEntries.find((entry) => {
    if (preferredModule && entry.module !== preferredModule) {
      return false
    }

    if (normalizeMetricLabel(entry.name) === normalizedMetricName) {
      return true
    }

    return entry.aliases?.some((alias) => normalizeMetricLabel(alias) === normalizedMetricName) ?? false
  })
}