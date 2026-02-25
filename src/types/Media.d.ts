type MediaType = 'movie' | 'tv'

interface Media {
  adult: boolean
  backdrop_path: string
  id: number
  title: Nullable<string> // at least one between original_title and title should be present, but we can't be sure which one, so we make both nullable
  original_title: Nullable<string>
  original_language: string
  overview: string
  poster_path: string
  media_type: MediaType // non exaustive
  genre_ids: number[]
  popularity: number
  release_date: string
  video: boolean
  vote_average: number
  vote_count: number
}

type MediaResponse = RecursivePartial<Media>
