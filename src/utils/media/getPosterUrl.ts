export function getPosterUrl(path: Nullable<string>): string {
  if (!path) return ''

  const parsedPath = path.startsWith('/') ? path.slice(1) : path

  return new URL(parsedPath, new URL(import.meta.env.VITE_IMAGE_BASE_URL)).toString()
}
