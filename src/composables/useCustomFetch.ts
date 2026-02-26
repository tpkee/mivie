const BASE_URL = import.meta.env.VITE_BASE_URL
const TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN

export async function useCustomFetch<T>(path: string): Promise<T> {
  const response = await fetch(formatUrl(path), {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
    mode: 'cors',
  })

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`)
  }

  return response.json() as Promise<T>
}

function formatUrl(path: string) {
  const rel = path.startsWith('/') ? path.slice(1) : path
  return new URL(rel, BASE_URL)
}
