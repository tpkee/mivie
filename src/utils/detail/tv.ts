import { parseGenres } from './genre'
import { getPosterUrl } from '../media/getPosterUrl'
import { parseCastList } from './cast'

export function parseTvDetailList(list: Nullable<TvDetailResponse[]>): TvDetail[] {
  if (!list) return []

  return list.reduce((acc: TvDetail[], item) => {
    const tv = parseTvDetail(item)
    if (tv) acc.push(tv)
    return acc
  }, [])
}

export function parseTvDetail(raw: TvDetailResponse): Nullable<TvDetail> {
  const title = raw.name || raw.original_name

  if (!raw.id || !title) {
    console.error(`Skipping TV show with id ${raw.id} due to missing required fields.`, raw)
    return null
  }

  return {
    id: raw.id,
    title: title,
    overview: raw.overview ?? '',
    posterUrl: getPosterUrl(raw.poster_path),
    genres: parseGenres(raw.genres as (RecursivePartial<Genre> | undefined)[] | undefined),
    firstAirDate: raw.first_air_date ?? '',
    lastAirDate: raw.last_air_date ?? '',
    seasons: raw.number_of_seasons ?? 0,
    episodes: raw.number_of_episodes ?? 0,
    voteAverage: raw.vote_average ?? 0,
    voteCount: raw.vote_count ?? 0,
    tagline: raw.tagline ?? '',
    status: raw.status ?? '',
    cast: parseCastList(raw.credits?.cast as CastMemberResponse[]),
  }
}
