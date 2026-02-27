export function parseGenres(genres: Nullable<(RecursivePartial<Genre> | undefined)[]>): Genre[] {
  if (!genres) return []

  return genres.reduce((acc: Genre[], item) => {
    if (!item) return acc
    const genre = parseGenre(item)
    if (genre) acc.push(genre)
    return acc
  }, [])
}

export function parseGenre(item: Nullable<RecursivePartial<Genre>>): Nullable<Genre> {
  if (!item) {
    return null
  }

  if (!item.id || !item.name) {
    return null
  }

  return {
    id: item.id,
    name: item.name,
  }
}
