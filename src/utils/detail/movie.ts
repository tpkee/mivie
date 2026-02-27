import { parseGenres } from './genre'
import { getPosterUrl } from '../media/getPosterUrl'
import { parseCastList } from './cast'

export function parseMovieDetailList(list: Nullable<MovieDetailResponse[]>): MovieDetail[] {
  if (!list) return []

  return list.reduce((acc: MovieDetail[], item) => {
    const movie = parseMovieDetail(item)
    if (movie) acc.push(movie)
    return acc
  }, [])
}

export function parseMovieDetail(raw: MovieDetailResponse): Nullable<MovieDetail> {
  const title = raw.title || raw.original_title

  if (!raw.id || !title) {
    console.error(`Skipping movie with id ${raw.id} due to missing required fields.`, raw)
    return null
  }

  return {
    id: raw.id,
    title: title,
    overview: raw.overview ?? '',
    posterUrl: getPosterUrl(raw.poster_path),
    genres: parseGenres(raw.genres as (RecursivePartial<Genre> | undefined)[] | undefined),
    releaseDate: raw.release_date ?? '',
    voteAverage: raw.vote_average ?? 0,
    voteCount: raw.vote_count ?? 0,
    tagline: raw.tagline ?? '',
    status: raw.status ?? '',
    cast: parseCastList(raw.credits?.cast as CastMemberResponse[]),
  }
}
