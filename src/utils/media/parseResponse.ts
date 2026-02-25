export function parseResponse(list: Nullable<MediaResponse[]>): Media[] {
  if (!list) return []

  return list.reduce((acc: Media[], item) => {
    if (!item.id || !item.media_type || !(item.title || item.original_title)){
       // these are the only required fields whose absence would make the data unusable
       console.error(`Skipping item with id ${item.id} due to missing required fields.`, item)
       return acc
    }

    if (!['movie', 'tv'].includes(item.media_type)) {
      console.warn(`Skipping item with id ${item.id} due to unsupported media type: ${item.media_type}.`, item)
      return acc
    }

    const media: Media = {
      adult: item.adult ?? false,
      backdrop_path: item.backdrop_path ?? '',
      id: item.id,
      title: item.title,
      original_language: item.original_language ?? '',
      original_title: item.original_title,
      overview: item.overview ?? '',
      poster_path: item.poster_path ?? '',
      media_type: item.media_type,
      genre_ids: item.genre_ids?.filter((id): id is number => id != null) ?? [],
      popularity: item.popularity ?? 0,
      release_date: item.release_date ?? '',
      video: item.video ?? false,
      vote_average: item.vote_average ?? 0,
      vote_count: item.vote_count ?? 0,
    }

    acc.push(media)
    return acc
  }, [])
}
