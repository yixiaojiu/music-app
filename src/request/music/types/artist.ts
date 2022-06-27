export interface Artist {
  albumSize: number
  alias: string[]
  briefDesc: string
  followed: boolean
  id: number
  img1v1Id: any
  img1v1Id_str: string
  img1v1Url: string
  musicSize: number
  name: string
  picId: any
  picId_str: string
  picUrl: string
  topicPerson: number
  trans: string
  accountId?: number
  transNames: string[]
}

export interface ArtistRes {
  artists: Artist[]
  more: boolean
  code: number
}

export interface ArtistReq {
  realIP: string
  type?: number
  area?: number
  limit?: number
  offset?: number
  initial?: string
}
