interface Genre {
  id: number
  name: string
}

type GenreResponse = RecursivePartial<{
  genres: Genre[]
}>
