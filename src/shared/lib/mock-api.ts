import type { ContractObject, NullableDataContract, ObjectDataContract, PaginatedDataContract, PaginationMeta } from '@/shared/lib/data-contract'

export interface MockApiOptions {
  delayMs?: number
}

export const DEFAULT_MOCK_API_DELAY_MS = 120

export function waitForMockApi(delayMs: number = DEFAULT_MOCK_API_DELAY_MS) {
  return new Promise((resolve) => {
    setTimeout(resolve, delayMs)
  })
}

export function paginateMockItems<TItem>(items: TItem[], page: number, perPage: number) {
  const normalizedPage = Math.max(1, page)
  const normalizedPerPage = Math.max(1, perPage)
  const total = items.length
  const lastPage = Math.max(1, Math.ceil(total / normalizedPerPage))
  const currentPage = Math.min(normalizedPage, lastPage)
  const startIndex = (currentPage - 1) * normalizedPerPage
  const pagedItems = items.slice(startIndex, startIndex + normalizedPerPage)

  const meta: PaginationMeta = {
    current_page: currentPage,
    from: pagedItems.length > 0 ? startIndex + 1 : 0,
    last_page: lastPage,
    per_page: normalizedPerPage,
    to: pagedItems.length > 0 ? startIndex + pagedItems.length : 0,
    total,
  }

  return {
    items: pagedItems,
    meta,
  }
}

export function createMockSuccessListResponse<TItem>(items: TItem[], page: number, perPage: number, message = 'success'): PaginatedDataContract<TItem> {
  const paginated = paginateMockItems(items, page, perPage)

  return {
    message,
    statusCode: 200,
    data: paginated.items,
    meta: paginated.meta,
  }
}

export function createMockSuccessObjectResponse<TObject extends ContractObject>(data: TObject, message = 'success'): ObjectDataContract<TObject> {
  return {
    message,
    statusCode: 200,
    data,
    meta: null,
  }
}

export function createMockNotFoundResponse(message = 'not found'): NullableDataContract {
  return {
    message,
    statusCode: 404,
    data: null,
    meta: null,
  }
}