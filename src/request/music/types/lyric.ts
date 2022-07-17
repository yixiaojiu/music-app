interface TransUser {
  id: number
  status: number
  demand: number
  userid: number
  nickname: string
  uptime: number
}

interface LyricUser {
  id: number
  status: number
  demand: number
  userid: number
  nickname: string
  uptime: number
}

interface Lrc {
  version: number
  lyric: string
}

interface Klyric {
  version: number
  lyric: string
}

interface Tlyric {
  version: number
  lyric: string
}

interface Romalrc {
  version: number
  lyric: string
}

export interface LyricRes {
  sgc: boolean
  sfy: boolean
  qfy: boolean
  transUser: TransUser
  lyricUser: LyricUser
  lrc: Lrc
  klyric: Klyric
  tlyric: Tlyric
  romalrc: Romalrc
  code: number
}

export interface LyricReq {
  id: number
}
