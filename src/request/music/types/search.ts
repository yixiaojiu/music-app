export interface Artist {
  id: number
  name: string
  picUrl?: any
  alias: any[]
  albumSize: number
  picId: number
  img1v1Url: string
  img1v1: number
  trans?: any
}

interface Artist2 {
  id: number
  name: string
  picUrl?: any
  alias: any[]
  albumSize: number
  picId: number
  img1v1Url: string
  img1v1: number
  trans?: any
}

interface Album {
  id: number
  name: string
  artist: Artist2
  publishTime: any
  size: number
  copyrightId: number
  status: number
  picId: any
  mark: number
  alia: string[]
}

export interface Song {
  id: number
  name: string
  artists: Artist[]
  album: Album
  duration: number
  copyrightId: number
  status: number
  alias: string[]
  rtype: number
  ftype: number
  mvid: number
  fee: number
  rUrl?: any
  mark: any
  transNames: string[]
}

interface Result {
  songs: Song[]
  hasMore: boolean
  songCount: number
}

export interface SearchRes {
  result: Result
  code: number
}

export interface SearchReq {
  keywords: string
}
