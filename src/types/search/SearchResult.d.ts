interface SearchResult {
  id: number
  mediaType: MediaType
  posterUrl: string
  name: string
}

type SearchResponse = RecursivePartial<{
  id: number
  media_type: Nullable<MediaType>
  poster_path: Nullable<string>
  title: string
  original_title: string
  name: string
  release_date: string
  first_air_date: string
  genre_ids: number[]
}>
