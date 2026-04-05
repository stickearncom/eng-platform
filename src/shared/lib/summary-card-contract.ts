export type MetricStatus = 'On Track' | 'Watch' | 'At Risk'

export interface SummaryCardReadModel {
  title: string
  currentValue: string
  changeDisplay?: string
  signal?: string
  previousValue?: string
  comparisonPeriod?: string
  note: string
  target: string
  status: MetricStatus
}