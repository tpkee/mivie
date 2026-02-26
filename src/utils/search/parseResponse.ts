import { getPosterUrl } from '../media/getPosterUrl'

export function parseResponse(
  list: Nullable<SearchResponse[]>,
  type?: Nullable<MediaType>,
): SearchResult[] {
  if (!list) return []

  return list.reduce((acc: SearchResult[], item) => {
    const result = parseSearchResult(item, type)
    if (result) acc.push(result)
    return acc
  }, [])
}

export function parseSearchResult(
  item: Nullable<SearchResponse>,
  type?: Nullable<MediaType>,
): Nullable<SearchResult> {
  if (!item) return null

  const mediaType = item.media_type || type
  const name = item.title || item.original_title || item.name

  if (!item.id || !mediaType || !name) {
    console.error(`Skipping search result with id ${item.id} due to missing required fields.`, item)
    return null
  }

  return {
    id: item.id,
    mediaType: mediaType,
    posterUrl: getPosterUrl(item.poster_path ?? null),
    name,
  }
}
