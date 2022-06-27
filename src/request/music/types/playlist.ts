interface AvatarDetail {
  userType: number
  identityLevel: number
  identityIconUrl: string
}

interface Creator {
  defaultAvatar: boolean
  province: number
  authStatus: number
  followed: boolean
  avatarUrl: string
  accountStatus: number
  gender: number
  city: number
  birthday: any
  userId: number
  userType: number
  nickname: string
  signature: string
  description: string
  detailDescription: string
  avatarImgId: any
  backgroundImgId: any
  backgroundUrl: string
  authority: number
  mutual: boolean
  expertTags: string[]
  experts?: any
  djStatus: number
  vipType: number
  remarkName?: any
  authenticationTypes: number
  avatarDetail: AvatarDetail
  avatarImgIdStr: string
  backgroundImgIdStr: string
  anchor: boolean
  avatarImgId_str: string
}

interface Subscriber {
  defaultAvatar: boolean
  province: number
  authStatus: number
  followed: boolean
  avatarUrl: string
  accountStatus: number
  gender: number
  city: number
  birthday: any
  userId: any
  userType: number
  nickname: string
  signature: string
  description: string
  detailDescription: string
  avatarImgId: any
  backgroundImgId: any
  backgroundUrl: string
  authority: number
  mutual: boolean
  expertTags?: any
  experts?: any
  djStatus: number
  vipType: number
  remarkName?: any
  authenticationTypes: number
  avatarDetail?: any
  avatarImgIdStr: string
  backgroundImgIdStr: string
  anchor: boolean
  avatarImgId_str: string
}

export interface Playlist {
  name: string
  id: number
  trackNumberUpdateTime: any
  status: number
  userId: number
  createTime: any
  updateTime: any
  subscribedCount: number
  trackCount: number
  cloudTrackCount: number
  coverImgUrl: string
  coverImgId: any
  description: string
  tags: string[]
  playCount: number
  trackUpdateTime: any
  specialType: number
  totalDuration: number
  creator: Creator
  tracks?: any
  subscribers: Subscriber[]
  subscribed: boolean
  commentThreadId: string
  newImported: boolean
  adType: number
  highQuality: boolean
  privacy: number
  ordered: boolean
  anonimous: boolean
  coverStatus: number
  recommendInfo?: any
  shareCount: number
  coverImgId_str: string
  commentCount: number
  copywriter: string
  tag: string
}

export interface PlaylistRes {
  playlists: Playlist[]
  code: number
  more: boolean
  lasttime: number
  total: number
}

export interface PlaylistReq {
  realIP: string
  cat?: string
  limit?: number
  offset?: number
}
