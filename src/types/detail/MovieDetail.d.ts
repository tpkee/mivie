type MovieDetailResponse = RecursivePartial<{
  id: number
  title: string
  original_title: string
  overview: string
  poster_path: string
  backdrop_path: string
  genres: Genre[]
  release_date: string
  runtime: number
  vote_average: number
  vote_count: number
  tagline: string
  status: string
  credits: {
    cast: CastMemberResponse[]
  }
}>

interface MovieDetail {
  id: number
  title: string
  overview: string
  posterUrl: string
  genres: Genre[]
  releaseDate: string
  voteAverage: number
  voteCount: number
  tagline: string
  status: string
  cast: CastMember[]
}
