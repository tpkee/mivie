import { getPosterUrl } from '../media/getPosterUrl'

export function parsePersonDetailList(list: Nullable<PersonDetailResponse[]>): PersonDetail[] {
  if (!list) return []

  return list.reduce((acc: PersonDetail[], item) => {
    const person = parsePersonDetail(item)
    if (person) acc.push(person)
    return acc
  }, [])
}

export function parsePersonDetail(raw: PersonDetailResponse): Nullable<PersonDetail> {
  if (!raw.id || !raw.name) {
    console.error(`Skipping person with id ${raw.id} due to missing required fields.`, raw)
    return null
  }

  return {
    id: raw.id,
    name: raw.name,
    biography: raw.biography ?? '',
    profileUrl: getPosterUrl(raw.profile_path),
    birthday: raw.birthday ?? null,
    deathday: raw.deathday ?? null,
    knownForDepartment: raw.known_for_department ?? '',
    placeOfBirth: raw.place_of_birth ?? null,
  }
}
