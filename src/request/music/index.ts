import type { BannerReq, BannerRes } from './types/banner'
import type { PlaylistReq, PlaylistRes } from './types/playlist'
import type { ArtistReq, ArtistRes } from './types/artist'
import type { ArtistInfoReq, ArtistInfoRes } from './types/artist-info'
import type { SongUrlReq, SongUrlRes } from './types/song-url'

import { useStateStore } from '@/stores/state'
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

export function getArtistInfo(data: ArtistInfoReq) {
  const state = useStateStore()
  // 17014 1049179 1047282
  return music.post<ArtistInfoRes>('/artists', { ...data, realIP: state.realIP })
}

export function getSongUrls(data: SongUrlReq) {
  const state = useStateStore()
  return music.post<SongUrlRes>(`/song/url`, { id: data.id.join(','), realIP: state.realIP })
}
