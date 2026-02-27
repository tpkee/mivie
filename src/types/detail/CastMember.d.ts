interface CastMember {
  id: number
  name: string
  character: string
  profileUrl: string
}

type CastMemberResponse = RecursivePartial<{
  id: number
  name: string
  character: string
  profile_path: Nullable<string>
}>
