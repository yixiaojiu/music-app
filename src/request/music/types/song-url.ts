interface FreeTrialInfo {
  start: number
  end: number
}

interface FreeTrialPrivilege {
  resConsumable: boolean
  userConsumable: boolean
  listenType?: any
}

interface FreeTimeTrialPrivilege {
  resConsumable: boolean
  userConsumable: boolean
  type: number
  remainTime: number
}

export interface Datum {
  id: number
  url: string
  br: number
  size: number
  md5: string
  code: number
  expi: number
  type: string
  gain: number
  fee: number
  uf?: any
  payed: number
  flag: number
  canExtend: boolean
  freeTrialInfo: FreeTrialInfo
  level: string
  encodeType: string
  freeTrialPrivilege: FreeTrialPrivilege
  freeTimeTrialPrivilege: FreeTimeTrialPrivilege
  urlSource: number
  rightSource: number
}

export interface SongUrlRes {
  data: Datum[]
  code: number
}

export interface SongUrlReq {
  id: number[]
}
