type MediaType = 'movie' | 'tv'

interface Media {
  id: number
  title: string
  overview: string
  posterUrl: string
  mediaType: MediaType // non exaustive
  releaseDate: string
  voteAverage: number
  fetchedAt: number
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
