interface Artist {
  name: string
  id: number
  picId: number
  img1v1Id: number
  briefDesc: string
  picUrl: string
  img1v1Url: string
  albumSize: number
  alias: any[]
  trans: string
  musicSize: number
  topicPerson: number
}

interface Artist2 {
  name: string
  id: number
  picId: number
  img1v1Id: number
  briefDesc: string
  picUrl: string
  img1v1Url: string
  albumSize: number
  alias: any[]
  trans: string
  musicSize: number
  topicPerson: number
}

interface Artist3 {
  name: string
  id: number
  picId: number
  img1v1Id: number
  briefDesc: string
  picUrl: string
  img1v1Url: string
  albumSize: number
  alias: any[]
  trans: string
  musicSize: number
  topicPerson: number
}

interface Album {
  name: string
  id: number
  type?: any
  size: number
  picId: number
  blurPicUrl: string
  companyId: number
  pic: number
  picUrl: string
  publishTime: number
  description: string
  tags: string
  company?: any
  briefDesc: string
  artist: Artist2
  songs: any[]
  alias: any[]
  status: number
  copyrightId: number
  commentThreadId: string
  artists: Artist3[]
  subType?: any
  transName?: any
  onSale: boolean
  mark: number
  gapless: number
  picId_str: string
}

interface BMusic {
  name?: any
  id: number
  size: number
  extension: string
  sr: number
  dfsId: number
  bitrate: number
  playTime: number
  volumeDelta: number
}

interface LMusic {
  name?: any
  id: number
  size: number
  extension: string
  sr: number
  dfsId: number
  bitrate: number
  playTime: number
  volumeDelta: number
}

interface MainSong {
  name: string
  id: number
  position: number
  alias: any[]
  status: number
  fee: number
  copyrightId: number
  disc: string
  no: number
  artists: Artist[]
  album: Album
  starred: boolean
  popularity: number
  score: number
  starredNum: number
  duration: number
  playedNum: number
  dayPlays: number
  hearTime: number
  sqMusic?: any
  hrMusic?: any
  ringtone: string
  crbt?: any
  audition?: any
  copyFrom: string
  commentThreadId: string
  rtUrl?: any
  ftype: number
  rtUrls: any[]
  copyright: number
  transName?: any
  sign?: any
  mark: number
  originCoverType: number
  originSongSimpleData?: any
  single: number
  noCopyrightRcmd?: any
  rtype: number
  rurl?: any
  mvid: number
  bMusic: BMusic
  mp3Url?: any
  hMusic?: any
  mMusic?: any
  lMusic: LMusic
}

interface Dj {
  defaultAvatar: boolean
  province: number
  authStatus: number
  followed: boolean
  avatarUrl: string
  accountStatus: number
  gender: number
  city: number
  birthday: number
  userId: number
  userType: number
  nickname: string
  signature: string
  description: string
  detailDescription: string
  avatarImgId: number
  backgroundImgId: number
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
  backgroundImgIdStr: string
  avatarImgIdStr: string
  anchor: boolean
  avatarImgId_str: string
  brand: string
}

interface Radio {
  id: number
  dj?: any
  name: string
  picUrl: string
  desc: string
  subCount: number
  programCount: number
  createTime: number
  categoryId: number
  category: string
  radioFeeType: number
  feeScope: number
  buyed: boolean
  videos?: any
  finished: boolean
  underShelf: boolean
  purchaseCount: number
  price: number
  originalPrice: number
  discountPrice?: any
  lastProgramCreateTime: number
  lastProgramName?: any
  lastProgramId: number
  picId: number
  rcmdText: string
  hightQuality: boolean
  whiteList: boolean
  composeVideo: boolean
}

interface Program {
  mainSong: MainSong
  songs?: any
  dj: Dj
  blurCoverUrl: string
  radio: Radio
  subscribedCount: number
  reward: boolean
  mainTrackId: number
  serialNum: number
  listenerCount: number
  name: string
  id: number
  createTime: number
  description: string
  userId: number
  coverUrl: string
  commentThreadId: string
  channels: any[]
  titbits?: any
  titbitImages?: any
  pubStatus: number
  trackCount: number
  bdAuditStatus: number
  programFeeType: number
  buyed: boolean
  programDesc?: any
  h5Links: any[]
  coverId: number
  adjustedPlayCount: number
  canReward: boolean
  auditStatus: number
  publish: boolean
  duration: number
}

interface Ar {
  id: number
  name: string
  tns: any[]
  alias: any[]
}

interface Al {
  id: number
  name: string
  picUrl: string
  tns: any[]
  pic_str: string
  pic: any
}

interface H {
  br: number
  fid: number
  size: number
  vd: number
  sr: number
}

interface M {
  br: number
  fid: number
  size: number
  vd: number
  sr: number
}

interface L {
  br: number
  fid: number
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

interface Hr {
  br: number
  fid: number
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

interface Song {
  name: string
  id: number
  pst: number
  t: number
  ar: Ar[]
  alia: string[]
  pop: number
  st: number
  rt: string
  fee: number
  v: number
  crbt?: any
  cf: string
  al: Al
  dt: number
  h: H
  m: M
  l: L
  sq: Sq
  hr: Hr
  a?: any
  cd: string
  no: number
  rtUrl?: any
  ftype: number
  rtUrls: any[]
  djId: number
  copyright: number
  s_id: number
  mark: number
  originCoverType: number
  originSongSimpleData?: any
  tagPicList?: any
  resourceState: boolean
  version: number
  songJumpInfo?: any
  entertainmentTags?: any
  single: number
  noCopyrightRcmd?: any
  rtype: number
  rurl?: any
  mst: number
  cp: number
  mv: number
  publishTime: any
  privilege: Privilege
  alg: string
}

export interface Banner {
  pic: string
  targetId: number
  adid?: any
  targetType: number
  titleColor: string
  typeTitle: string
  url: string
  adurlV2?: any
  exclusive: boolean
  monitorImpress?: any
  monitorClick?: any
  monitorType?: any
  monitorImpressList: any[]
  monitorClickList: any[]
  monitorBlackList?: any
  extMonitor?: any
  extMonitorInfo?: any
  adSource?: any
  adLocation?: any
  encodeId: string
  program: Program
  event?: any
  video?: any
  dynamicVideoData?: any
  song: Song
  bannerId: string
  alg: string
  scm: string
  requestId: string
  showAdTag: boolean
  pid?: any
  showContext?: any
  adDispatchJson?: any
  s_ctrp: string
  logContext?: any
}

export interface BannerRes {
  banners: Banner[]
  code: number
}

export interface BannerReq {
  realIP: string
  type: number
}
