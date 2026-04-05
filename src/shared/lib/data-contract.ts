export interface PaginationMeta {
  current_page: number
  from: number
  last_page: number
  per_page: number
  to: number
  total: number
}

export type ContractObject = object

export type ContractData = ContractObject | Array<unknown> | null

export type NonPaginatedContractData = ContractObject | null

type ResponseMeta<TData> = TData extends Array<unknown> | ReadonlyArray<unknown> ? PaginationMeta : null

export interface DataContract<TData extends ContractData = ContractData> {
  message: string
  statusCode: number
  data: TData
  meta: ResponseMeta<TData>
}

export type PaginatedDataContract<TItem> = DataContract<TItem[]>

export interface NonPaginatedDataContract<TData extends NonPaginatedContractData> {
  message: string
  statusCode: number
  data: TData
  meta: null
}

export type ObjectDataContract<TObject extends ContractObject> = NonPaginatedDataContract<TObject>

export type NullableDataContract = NonPaginatedDataContract<null>

export type MaybeObjectDataContract<TObject extends ContractObject> = ObjectDataContract<TObject> | NullableDataContract