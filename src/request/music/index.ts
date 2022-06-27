import type { BannerReq, BannerRes } from './types/banner'
import type { PlaylistReq, PlaylistRes } from './types/playlist'
import type { ArtistReq, ArtistRes } from './types/artist'

import { music } from '../request'

export function getBanner(data: BannerReq) {
  return music.post<BannerRes>('/banner', data)
}

export function getPlayList(data: PlaylistReq) {
  return music.post<PlaylistRes>('/top/playlist', data)
}

export function getArtist(data: ArtistReq) {
  return music.post<ArtistRes>('/artist/list', data)
}
