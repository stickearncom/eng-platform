import employeeDirectoryJson from '@/shared/mocks/employees.json'
import {
  getEmployeeDisplayName,
  hasPeopleGrowthSeedMapping,
  toEmployeeDirectoryPeopleGrowthSeed,
  toEmployeeDirectoryRosterItem,
  type EmployeeDirectoryResponse,
} from '@/shared/lib/employee-directory-contract'

interface DirectorySeedFilter {
  team?: string
  role?: string
  level?: string
}

const employeeDirectoryResponse: EmployeeDirectoryResponse = employeeDirectoryJson

export function getEmployeeDirectoryResponse() {
  return employeeDirectoryResponse
}

export function getEmployeeDirectoryItems() {
  return employeeDirectoryResponse.data
}

export function getEmployeeDirectoryRoster() {
  return employeeDirectoryResponse.data.map(toEmployeeDirectoryRosterItem)
}

export function getEmployeeDirectoryPeopleGrowthSeeds() {
  return employeeDirectoryResponse.data.map(toEmployeeDirectoryPeopleGrowthSeed)
}

export function getEngineeringDirectoryPeopleGrowthSeeds() {
  return employeeDirectoryResponse.data
    .filter((employee) => employee.organization === 'IT')
    .map(toEmployeeDirectoryPeopleGrowthSeed)
}

export function filterEngineeringDirectoryPeopleGrowthSeeds(filters: DirectorySeedFilter = {}) {
  return getEngineeringDirectoryPeopleGrowthSeeds().filter((seed) => {
    const roleMatch = !filters.role || filters.role === 'all' || seed.roleKey === filters.role
    const levelMatch = !filters.level || filters.level === 'all' || seed.levelKey === filters.level
    const teamMatch = !filters.team || filters.team === 'all' || seed.teamKey === filters.team

    return teamMatch && roleMatch && levelMatch
  })
}

export function getEngineeringDirectoryPeopleGrowthSeedCoverage() {
  const seeds = getEngineeringDirectoryPeopleGrowthSeeds()
  const mappedSeeds = seeds.filter(hasPeopleGrowthSeedMapping)
  const unmappedSeeds = seeds.filter((seed) => !hasPeopleGrowthSeedMapping(seed))

  return {
    total: seeds.length,
    mapped: mappedSeeds.length,
    unmapped: unmappedSeeds.length,
    roleMapped: seeds.filter((seed) => seed.roleKey !== 'unknown').length,
    levelMapped: seeds.filter((seed) => seed.levelKey !== null).length,
    teamMapped: seeds.filter((seed) => seed.teamKey !== null).length,
  }
}

export function getEngineeringDirectoryUnmappedPeopleGrowthSeeds() {
  return getEngineeringDirectoryPeopleGrowthSeeds().filter((seed) => !hasPeopleGrowthSeedMapping(seed))
}

export function findEmployeeDirectoryItemById(id: string) {
  return employeeDirectoryResponse.data.find((employee) => employee.id === id) ?? null
}

export function searchEmployeeDirectoryByName(query: string | RegExp) {
  const matcher = typeof query === 'string' ? new RegExp(query, 'i') : query

  return employeeDirectoryResponse.data.filter((employee) => matcher.test(getEmployeeDisplayName(employee)))
}