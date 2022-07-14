interface Artist {
  img1v1Id: number
  topicPerson: number
  alias: string[]
  picId: number
  briefDesc: string
  musicSize: number
  albumSize: number
  picUrl: string
  img1v1Url: string
  followed: boolean
  trans: string
  name: string
  id: number
  publishTime: number
  picId_str: string
  img1v1Id_str: string
  mvSize: number
}

export interface Ar {
  id: number
  name: string
  alia: string[]
}

interface Al {
  id: number
  name: string
  picUrl: string
  pic_str: string
  pic: any
  tns: string[]
  alia: string[]
}

interface H {
  br: number
  fid: any
  size: number
  vd: number
  sr: number
}

interface L {
  br: number
  fid: any
  size: number
  vd: number
  sr: number
}

interface Sq {
  br: number
  fid: number
  size: number
  vd: number
  sr: number
}

interface M {
  br: number
  fid: any
  size: number
  vd: number
  sr: number
}

interface FreeTrialPrivilege {
  resConsumable: boolean
  userConsumable: boolean
  listenType?: any
}

interface ChargeInfoList {
  rate: number
  chargeUrl?: any
  chargeMessage?: any
  chargeType: number
}

interface Privilege {
  id: number
  fee: number
  payed: number
  st: number
  pl: number
  dl: number
  sp: number
  cp: number
  subp: number
  cs: boolean
  maxbr: number
  fl: number
  toast: boolean
  flag: number
  preSell: boolean
  playMaxbr: number
  downloadMaxbr: number
  maxBrLevel: string
  playMaxBrLevel: string
  downloadMaxBrLevel: string
  plLevel: string
  dlLevel: string
  flLevel: string
  rscl?: any
  freeTrialPrivilege: FreeTrialPrivilege
  chargeInfoList: ChargeInfoList[]
}

export interface HotSong {
  rtUrls: any[]
  ar: Ar[]
  al: Al
  st: number
  noCopyrightRcmd?: any
  songJumpInfo?: any
  mst: number
  cp: number
  crbt?: any
  cf: string
  dt: number
  rtUrl?: any
  ftype: number
  cd: string
  djId: number
  no: number
  fee: number
  mv: number
  t: number
  v: number
  h: H
  l: L
  sq: Sq
  hr?: any
  rtype: number
  rurl?: any
  pst: number
  alia: string[]
  pop: number
  rt: string
  a?: any
  m: M
  name: string
  id: number
  privilege: Privilege
  eq: string
}

export interface ArtistInfoRes {
  artist: Artist
  hotSongs: HotSong[]
  more: boolean
  code: number
}

export interface ArtistInfoReq {
  id: string
}
