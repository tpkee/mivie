type PersonDetailResponse = RecursivePartial<{
  id: number
  name: string
  biography: string
  profile_path: string
  birthday: string
  deathday: string
  known_for_department: string
  place_of_birth: string
  popularity: number
}>

interface PersonDetail {
  id: number
  name: string
  biography: string
  profileUrl: string
  birthday: Nullable<string>
  deathday: Nullable<string>
  knownForDepartment: string
  placeOfBirth: Nullable<string>
}
