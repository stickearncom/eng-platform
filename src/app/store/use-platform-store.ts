import { create } from 'zustand'

import { type Audience } from '@/shared/config/audience'

export type FilterKey =
  | 'dateRange'
  | 'team'
  | 'role'
  | 'level'
  | 'reviewCycle'
  | 'board'
  | 'sprint'
  | 'engineer'
  | 'ticketType'
  | 'issueType'
  | 'addedAt'

export interface FilterOption {
  label: string
  value: string
}

interface PlatformState {
  audience: Audience
  filters: Record<FilterKey, string>
  setAudience: (audience: Audience) => void
  setFilter: (key: FilterKey, value: string) => void
}

export const filterOptions: Record<FilterKey, FilterOption[]> = {
  dateRange: [
    { label: 'Last 30 days', value: '30d' },
    { label: 'This quarter', value: 'quarter' },
    { label: 'Last 2 quarters', value: '2q' },
  ],
  team: [
    { label: 'All teams', value: 'all' },
    { label: 'Growth Squad', value: 'growth' },
    { label: 'Core Platform', value: 'platform' },
    { label: 'Customer Experience', value: 'cx' },
  ],
  role: [
    { label: 'All roles', value: 'all' },
    { label: 'Frontend', value: 'fe' },
    { label: 'Backend', value: 'be' },
    { label: 'QA', value: 'qa' },
  ],
  level: [
    { label: 'All levels', value: 'all' },
    { label: 'Junior', value: 'junior' },
    { label: 'Middle', value: 'middle' },
    { label: 'Senior', value: 'senior' },
    { label: 'Lead', value: 'lead' },
  ],
  reviewCycle: [
    { label: '2026-Q2', value: '2026-q2' },
    { label: '2026-Q1', value: '2026-q1' },
    { label: '2025-H2', value: '2025-h2' },
  ],
  board: [
    { label: 'All boards', value: 'all' },
    { label: 'Growth Board', value: 'growth-board' },
    { label: 'Core Platform Board', value: 'platform-board' },
  ],
  sprint: [
    { label: 'Sprint 42', value: 'sprint-42' },
    { label: 'Sprint 41', value: 'sprint-41' },
    { label: 'Sprint 40', value: 'sprint-40' },
  ],
  engineer: [
    { label: 'All engineers', value: 'all' },
    { label: 'Alya', value: 'alya' },
    { label: 'Bima', value: 'bima' },
    { label: 'Dion', value: 'dion' },
  ],
  ticketType: [
    { label: 'All ticket types', value: 'all' },
    { label: 'Story', value: 'story' },
    { label: 'Bug', value: 'bug' },
    { label: 'Task', value: 'task' },
  ],
  issueType: [
    { label: 'All issue types', value: 'all' },
    { label: 'Feature', value: 'feature' },
    { label: 'Incident', value: 'incident' },
    { label: 'Refactor', value: 'refactor' },
  ],
  addedAt: [
    { label: 'Any time', value: 'all' },
    { label: 'Added after sprint start', value: 'after-start' },
    { label: 'Initial sprint scope', value: 'initial' },
  ],
}

const initialFilters: Record<FilterKey, string> = {
  dateRange: 'quarter',
  team: 'all',
  role: 'all',
  level: 'all',
  reviewCycle: '2026-q2',
  board: 'all',
  sprint: 'sprint-42',
  engineer: 'all',
  ticketType: 'all',
  issueType: 'all',
  addedAt: 'all',
}

export const usePlatformStore = create<PlatformState>((set) => ({
  audience: 'engineering-manager',
  filters: initialFilters,
  setAudience: (audience) => set({ audience }),
  setFilter: (key, value) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value,
      },
    })),
}))