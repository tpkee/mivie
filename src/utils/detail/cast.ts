import { getPosterUrl } from '../media/getPosterUrl'

export function parseCastList(cast: Nullable<CastMemberResponse[]>): CastMember[] {
  if (!cast) return []

  return cast.reduce((acc: CastMember[], item) => {
    const member = parseCastMember(item)
    if (member) acc.push(member)
    return acc
  }, [])
}

export function parseCastMember(raw: CastMemberResponse): Nullable<CastMember> {
  if (!raw.id || !raw.name) {
    console.error(`Skipping cast member with id ${raw.id} due to missing required fields.`, raw)
    return null
  }

  return {
    id: raw.id,
    name: raw.name,
    character: raw.character ?? '',
    profileUrl: getPosterUrl(raw.profile_path),
  }
}
