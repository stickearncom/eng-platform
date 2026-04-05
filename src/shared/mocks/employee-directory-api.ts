import type { MaybeObjectDataContract, PaginatedDataContract } from '@/shared/lib/data-contract'
import {
  getEmployeeDisplayName,
  type EmployeeDirectoryItem,
} from '@/shared/lib/employee-directory-contract'
import {
  createMockNotFoundResponse,
  createMockSuccessListResponse,
  createMockSuccessObjectResponse,
  DEFAULT_MOCK_API_DELAY_MS,
  waitForMockApi,
  type MockApiOptions,
} from '@/shared/lib/mock-api'
import {
  findEmployeeDirectoryItemById,
  getEmployeeDirectoryItems,
} from '@/shared/mocks/employee-directory'

interface EmployeeDirectoryListParams {
  page?: number
  perPage?: number
  organization?: string
  role?: string
  query?: string
}

function filterEmployeeDirectoryItems(params: EmployeeDirectoryListParams) {
  return getEmployeeDirectoryItems().filter((employee) => {
    const organizationMatch = !params.organization || params.organization === 'all' || employee.organization === params.organization
    const roleMatch = !params.role || params.role === 'all' || employee.role === params.role
    const queryMatch = !params.query
      || new RegExp(params.query, 'i').test(getEmployeeDisplayName(employee))
      || new RegExp(params.query, 'i').test(employee.email)
      || new RegExp(params.query, 'i').test(employee.id_employee)

    return organizationMatch && roleMatch && queryMatch
  })
}

export async function fetchEmployeeDirectory(
  params: EmployeeDirectoryListParams = {},
  options: MockApiOptions = {},
): Promise<PaginatedDataContract<EmployeeDirectoryItem>> {
  await waitForMockApi(options.delayMs ?? DEFAULT_MOCK_API_DELAY_MS)

  const page = params.page ?? 1
  const perPage = params.perPage ?? 10
  const filteredItems = filterEmployeeDirectoryItems(params)

  return createMockSuccessListResponse(filteredItems, page, perPage)
}

export async function fetchEmployeeDirectoryById(
  id: string,
  options: MockApiOptions = {},
): Promise<MaybeObjectDataContract<EmployeeDirectoryItem>> {
  await waitForMockApi(options.delayMs ?? DEFAULT_MOCK_API_DELAY_MS)

  const employee = findEmployeeDirectoryItemById(id)

  if (!employee) {
    return createMockNotFoundResponse('employee not found')
  }

  return createMockSuccessObjectResponse<EmployeeDirectoryItem>(employee)
}

export async function searchEmployeeDirectory(
  query: string,
  params: Omit<EmployeeDirectoryListParams, 'query'> = {},
  options: MockApiOptions = {},
): Promise<PaginatedDataContract<EmployeeDirectoryItem>> {
  return fetchEmployeeDirectory({
    ...params,
    query,
  }, options)
}