type TvDetailResponse = RecursivePartial<{
  id: number
  name: string
  original_name: string
  overview: string
  poster_path: string
  backdrop_path: string
  genres: Genre[]
  first_air_date: string
  last_air_date: string
  number_of_seasons: number
  number_of_episodes: number
  vote_average: number
  vote_count: number
  tagline: string
  status: string
  credits: {
    cast: CastMemberResponse[]
  }
}>

interface TvDetail {
  id: number
  title: string
  overview: string
  posterUrl: string
  genres: Genre[]
  firstAirDate: string
  lastAirDate: string
  seasons: number
  episodes: number
  voteAverage: number
  voteCount: number
  tagline: string
  status: string
  cast: CastMember[]
}
