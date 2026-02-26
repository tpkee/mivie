interface PaginatedRequest<T> {
  page: number
  totalPages: number
  totalResults: number
  results: T[]
}

type PaginatedRequestResponse<T> = {
  page?: number
  total_pages?: number
  total_results?: number
  results?: T[]
}
