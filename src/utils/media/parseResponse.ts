export function parseResponse(list: Nullable<MediaResponse[]>): Media[] {
  if (!list) return []

  return list.reduce((acc: Media[], item) => {
    const media = parseMedia(item)
    if (media) acc.push(media)
    return acc
  }, [])
}

export function parseMedia(item: MediaResponse, type?: Nullable<MediaType>): Nullable<Media> {
  const mediaType = item.media_type || type
  const title = item.title || item.original_title

  if (!item.id || !mediaType || !title){
      // these are the only required fields whose absence would make the data unusable
      console.error(`Skipping item with id ${item.id} due to missing required fields.`, item)
      return null
  }

  if (!['movie', 'tv'].includes(mediaType)) {
    console.warn(`Skipping item with id ${item.id} due to unsupported media type: ${mediaType}.`, item)
    return null
  }

  return {
    id: item.id,
    title: title,
    overview: item.overview ?? '',
    posterUrl: getPosterUrl(item.poster_path),
    mediaType: mediaType,
    releaseDate: item.release_date ?? '',
    voteAverage: item.vote_average ?? 0,
    fetchedAt: Date.now(),
  }
}

function getPosterUrl(path: Nullable<string>): string {
  if (!path) return ''

  const parsedPath = path.startsWith('/') ? path.slice(1) : path

  return new URL(parsedPath, new URL(import.meta.env.VITE_IMAGE_BASE_URL)).toString()
}
