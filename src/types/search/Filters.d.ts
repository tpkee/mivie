type SearchType = 'all' | 'movie' | 'tv'

interface SearchFilters {
  query: string
  genre: Nullable<number>
  year: Nullable<number>
}
