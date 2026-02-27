export function parsePaginatedRequest<T>(data: PaginatedRequestResponse<T>): PaginatedRequest<T> {
  return {
    page: data.page ?? 1,
    totalPages: data.total_pages ?? 1,
    totalResults: data.total_results ?? 0,
    results: data.results ?? [],
  }
}
