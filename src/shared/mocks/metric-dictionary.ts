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
    name: 'Delivery Confidence',
    module: 'Engineering Summary',
    aliases: ['Delivery Confidence Trend'],
    definition: 'Leadership-level signal for whether engineering is likely to deliver committed work predictably.',
    whyItMatters: 'Helps stakeholders quickly judge if roadmap confidence is improving or deteriorating.',
    formula: 'Composite of planning accuracy, carry-over trend, scope stability, and blocker pressure.',
    source: 'Jira sprint data + delivery aggregation layer',
    owner: 'Head of Engineering',
    refreshCadence: 'Weekly',
    audience: 'Executive, Engineering Manager',
    caveat: 'Not a direct proxy for team performance when dependency-heavy work dominates the period.',
  },
  {
    name: 'Quality & Reliability',
    module: 'Engineering Summary',
    aliases: ['Quality & Reliability Trend'],
    definition: 'Summary signal for production quality and reliability pressure across engineering teams.',
    whyItMatters: 'Gives stakeholders a concise read on whether customer-facing quality is improving or worsening.',
    formula: 'Combination of escaped defects, incident load, and recent quality trend.',
    source: 'Incident tracking + bug summaries',
    owner: 'Engineering Manager / QA Lead',
    refreshCadence: 'Weekly',
    audience: 'Executive, Engineering Manager, Scrum Master',
    caveat: 'Low bug count alone does not imply low risk if unresolved incidents remain open.',
  },
  {
    name: 'Engineering Flow',
    module: 'Engineering Summary',
    aliases: ['Engineering Flow Metrics'],
    definition: 'High-level signal for how smoothly engineering work moves through review and completion loops.',
    whyItMatters: 'Makes review latency and handoff friction visible before delivery predictability starts dropping.',
    formula: 'Aggregated view of PR turnaround, handoff friction, and review-cycle timing.',
    source: 'Pull request workflow and team operations signal',
    owner: 'Engineering Manager',
    refreshCadence: 'Weekly',
    audience: 'Executive, Engineering Manager',
    caveat: 'Should be interpreted alongside work complexity and cross-team dependency load.',
  },
  {
    name: 'People Growth',
    module: 'Engineering Summary',
    aliases: ['People Growth Distribution'],
    definition: 'Summary view of growth and review quality across the engineering organization.',
    whyItMatters: 'Keeps leadership aware of whether people development is stable, improving, or at risk.',
    formula: 'Aggregated people-growth score and review confidence signals from the review cycle.',
    source: 'Review form workflow and scoring engine',
    owner: 'Engineering Manager + HR',
    refreshCadence: 'Per review cycle',
    audience: 'Executive, Engineering Manager, HR',
    caveat: 'A healthy score does not remove the need to inspect evidence quality and calibration consistency.',
  },
  {
    name: 'Org Risk',
    module: 'Engineering Summary',
    definition: 'Summarizes concentrated risk areas such as dependency pressure, shared support load, and unresolved reliability concerns.',
    whyItMatters: 'Allows leadership to focus attention on the few risks most likely to affect delivery and org health.',
    formula: 'Qualitative and quantitative risk synthesis from delivery, quality, and people signals.',
    source: 'Engineering summary model',
    owner: 'Head of Engineering',
    refreshCadence: 'Weekly',
    audience: 'Executive, Engineering Manager, HR',
    caveat: 'Hotspot count reflects grouped risk themes, not the number of raw incidents or blockers.',
  },
  {
    name: 'Sprint Health Score',
    module: 'Delivery Insights',
    aliases: ['Sprint Health', 'Sprint Health Composition', 'Capacity Planning', 'Capacity vs Commitment'],
    definition: 'Composite score for sprint execution health based on planning discipline and delivery behavior.',
    whyItMatters: 'Lets delivery stakeholders compare sprint quality without overfocusing on one metric like velocity.',
    formula: 'Weighted combination of velocity consistency, scope stability, blocker resolution, estimation accuracy, and carry-over.',
    source: 'Jira sprint data',
    owner: 'Scrum Master / Delivery Lead',
    refreshCadence: 'Per sprint',
    audience: 'Engineering Manager, Scrum Master',
    caveat: 'Should be read at team level and not used to score individual engineers.',
  },
  {
    name: 'Scope Change',
    module: 'Delivery Insights',
    aliases: ['Scope Change Tracking'],
    definition: 'Measures how much committed sprint scope changes after sprint start.',
    whyItMatters: 'Highlights planning instability and the degree of work entering too late.',
    formula: '(Added or removed scope after sprint start) / initial committed scope',
    source: 'Jira sprint scope history',
    owner: 'Scrum Master / Delivery Lead',
    refreshCadence: 'Per sprint',
    audience: 'Engineering Manager, Scrum Master',
    caveat: 'High scope change is not always bad if incident response or critical escalation work was necessary.',
  },
  {
    name: 'Planning Accuracy',
    module: 'Delivery Insights',
    aliases: ['Planning Accuracy Trend'],
    definition: 'Compares planned sprint completion against actual completed scope.',
    whyItMatters: 'Shows whether teams are forecasting realistically or repeatedly missing their own plan.',
    formula: 'Completed committed work / planned committed work',
    source: 'Jira sprint commitments and completions',
    owner: 'Scrum Master / Delivery Lead',
    refreshCadence: 'Per sprint',
    audience: 'Engineering Manager, Scrum Master',
    caveat: 'Accuracy should be interpreted with scope-change and blocker context, not as a standalone judgement.',
  },
  {
    name: 'Carry-over Rate',
    module: 'Delivery Insights',
    aliases: ['Carry-over Root Cause Analysis'],
    definition: 'Measures how much planned work spills into the next sprint.',
    whyItMatters: 'Highlights delivery friction, unmet planning assumptions, and capacity imbalance.',
    formula: 'Unfinished committed work / total committed work',
    source: 'Jira sprint completion data',
    owner: 'Scrum Master / Delivery Lead',
    refreshCadence: 'Per sprint',
    audience: 'Engineering Manager, Scrum Master',
    caveat: 'Carry-over does not always mean poor execution; incidents and late dependencies can legitimately distort it.',
  },
  {
    name: 'Weighted Category Score',
    module: 'People Growth',
    aliases: ['Final Score (Avg)', 'Category Score Trends', 'Self vs Peer vs Manager Gap'],
    definition: 'Normalized score for a growth category after combining self, peer, and manager input.',
    whyItMatters: 'Creates a structured view of employee growth without relying on a single reviewer perspective.',
    formula: 'Weighted sum of self, peer, and manager review scores by category.',
    source: 'Review form data and scoring engine',
    owner: 'Engineering Manager + HR',
    refreshCadence: 'Per review cycle',
    audience: 'Engineering Manager, HR',
    caveat: 'This score is interpretable only when evidence quality is healthy and reviewer coverage is sufficient.',
  },
  {
    name: 'Low-confidence Flag',
    module: 'People Growth',
    aliases: ['Low Confidence Flags', 'Confidence Gap Trend'],
    definition: 'Signals that review evidence is too thin or inconsistent for a confident interpretation.',
    whyItMatters: 'Prevents over-reading incomplete review data as if it were a true performance issue.',
    formula: 'Triggered when peer coverage, narrative quality, or review completeness falls below guardrail thresholds.',
    source: 'Review workflow completeness + scoring checks',
    owner: 'HRBP + Engineering Manager',
    refreshCadence: 'Per review cycle',
    audience: 'Engineering Manager, HR',
    caveat: 'Low confidence means evidence quality is weak, not that the employee is underperforming.',
  },
  {
    name: 'Reviews Completed',
    module: 'People Growth',
    aliases: ['Review Completion Rate'],
    definition: 'Share of expected self, peer, and manager submissions that have been completed in the active review cycle.',
    whyItMatters: 'Provides governance visibility into whether the review workflow is complete enough to trust the resulting data.',
    formula: 'Completed expected review submissions / total expected submissions',
    source: 'Review workflow tracking',
    owner: 'HRBP + Engineering Manager',
    refreshCadence: 'Per review cycle',
    audience: 'Engineering Manager, HR',
    caveat: 'High completion does not guarantee good narrative quality; evidence quality still needs separate review.',
  },
  {
    name: 'Growth Ready',
    module: 'People Growth',
    aliases: ['Growth Readiness Distribution', 'Review Momentum', 'Strengths & Areas'],
    definition: 'Signals that an employee or cohort has strong enough evidence to take broader scope, deeper ownership, or more advanced expectations.',
    whyItMatters: 'Helps managers and HR distinguish stable growth readiness from raw score movement alone.',
    formula: 'Derived from weighted review scores, confidence quality, and narrative evidence readiness rules.',
    source: 'Review scoring engine + calibration interpretation',
    owner: 'Engineering Manager + HR',
    refreshCadence: 'Per review cycle',
    audience: 'Engineering Manager, HR',
    caveat: 'Readiness should not be treated as automatic promotion recommendation without calibration discussion.',
  },
  {
    name: 'Source of Truth',
    module: 'Data Governance',
    definition: 'Declared system or workflow considered authoritative for each metric.',
    whyItMatters: 'Avoids cross-team disputes caused by different spreadsheet, dashboard, or operational definitions.',
    formula: 'Metadata field maintained per metric.',
    source: 'Metric governance model',
    owner: 'Platform / Analytics owner',
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
  { title: 'Governed Metrics', value: '8', note: 'Metrics with shared definitions, sources, and caveats in this prototype.' },
  { title: 'Source Systems', value: '4', note: 'Jira, review workflow, summary model, and governance metadata.' },
  { title: 'Primary Audiences', value: '4', note: 'Executive, Engineering Manager, Scrum Master, and HR all read this layer differently.' },
  { title: 'Critical Guardrails', value: '3', note: 'Operational metrics are not individual KPIs, low confidence is not low performance, and source of truth must be explicit.' },
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