import type { PaginatedDataContract } from '@/shared/lib/data-contract'

export interface EmployeeDirectoryItem {
  email: string
  id: string
  id_employee: string
  role: string
  organization: string
  first_name: string
  last_name: string
}

export type EmployeeDirectoryResponse = PaginatedDataContract<EmployeeDirectoryItem>

export interface EmployeeDirectoryRosterItem {
  id: string
  employeeId: string
  displayName: string
  email: string
  role: string
  organization: string
}

export type EmployeeDirectoryRoleKey = 'fe' | 'be' | 'qa' | 'android' | 'data' | 'product' | 'design' | 'scrum' | 'devops' | 'manager' | 'unknown'

export type EmployeeDirectoryLevelKey = 'junior' | 'middle' | 'senior' | 'lead' | 'unknown'

export interface EmployeeDirectoryPeopleGrowthSeed {
  id: string
  employeeId: string
  name: string
  email: string
  role: string
  roleKey: EmployeeDirectoryRoleKey
  team: string | null
  teamKey: string | null
  level: string | null
  levelKey: EmployeeDirectoryLevelKey | null
  organization: string
}

export function getEmployeeDisplayName(employee: EmployeeDirectoryItem) {
  return [employee.first_name, employee.last_name].filter(Boolean).join(' ').trim()
}

export function inferEmployeeDirectoryRoleKey(role: string): EmployeeDirectoryRoleKey {
  const normalizedRole = role.toLowerCase()

  if (normalizedRole.includes('frontend')) {
    return 'fe'
  }

  if (normalizedRole.includes('backend') || normalizedRole.includes('back end')) {
    return 'be'
  }

  if (normalizedRole.includes('qa')) {
    return 'qa'
  }

  if (normalizedRole.includes('android')) {
    return 'android'
  }

  if (normalizedRole.includes('devops')) {
    return 'devops'
  }

  if (normalizedRole.includes('data')) {
    return 'data'
  }

  if (normalizedRole.includes('product')) {
    return 'product'
  }

  if (normalizedRole.includes('designer') || normalizedRole.includes('ui/ux')) {
    return 'design'
  }

  if (normalizedRole.includes('scrum')) {
    return 'scrum'
  }

  if (normalizedRole.includes('manager') || normalizedRole.includes('lead')) {
    return 'manager'
  }

  return 'unknown'
}

export function inferEmployeeDirectoryLevelKey(role: string): EmployeeDirectoryLevelKey {
  const normalizedRole = role.toLowerCase()

  if (normalizedRole.includes('manager') || normalizedRole.includes('lead')) {
    return 'lead'
  }

  if (normalizedRole.includes('senior')) {
    return 'senior'
  }

  return 'unknown'
}

export function inferEmployeeDirectoryLevelLabel(levelKey: EmployeeDirectoryLevelKey): string | null {
  if (levelKey === 'lead') {
    return 'Lead'
  }

  if (levelKey === 'senior') {
    return 'Senior'
  }

  return null
}

export function toEmployeeDirectoryRosterItem(employee: EmployeeDirectoryItem): EmployeeDirectoryRosterItem {
  return {
    id: employee.id,
    employeeId: employee.id_employee,
    displayName: getEmployeeDisplayName(employee),
    email: employee.email,
    role: employee.role,
    organization: employee.organization,
  }
}

export function toEmployeeDirectoryPeopleGrowthSeed(employee: EmployeeDirectoryItem): EmployeeDirectoryPeopleGrowthSeed {
  const inferredLevelKey = inferEmployeeDirectoryLevelKey(employee.role)

  return {
    id: employee.id,
    employeeId: employee.id_employee,
    name: getEmployeeDisplayName(employee),
    email: employee.email,
    role: employee.role,
    roleKey: inferEmployeeDirectoryRoleKey(employee.role),
    team: null,
    teamKey: null,
    level: inferEmployeeDirectoryLevelLabel(inferredLevelKey),
    levelKey: inferredLevelKey === 'unknown' ? null : inferredLevelKey,
    organization: employee.organization,
  }
}

export function hasPeopleGrowthSeedMapping(seed: EmployeeDirectoryPeopleGrowthSeed) {
  return seed.teamKey !== null && seed.levelKey !== null && seed.roleKey !== 'unknown'
}