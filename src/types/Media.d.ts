type MediaType = 'movie' | 'tv' | 'person'

interface Media {
  id: number
  title: string
  overview: Nullable<string>
  posterUrl: Nullable<string>
  mediaType: MediaType
  releaseDate: Nullable<string>
  voteAverage: Nullable<number>
  fetchedAt: Nullable<number>
}

type MediaResponse = RecursivePartial<{
  adult: boolean
  backdrop_path: string
  id: number
  title: string
  original_title: string
  original_language: string
  overview: string
  poster_path: string
  media_type: MediaType
  genre_ids: number[]
  popularity: number
  release_date: string
  video: boolean
  vote_average: number
  vote_count: number
}>
