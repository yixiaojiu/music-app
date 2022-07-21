import type { BannerReq, BannerRes } from './types/banner'
import type { PlaylistReq, PlaylistRes } from './types/playlist'
import type { ArtistReq, ArtistRes } from './types/artist'
import type { ArtistInfoReq, ArtistInfoRes } from './types/artist-info'
import type { SongUrlReq, SongUrlRes } from './types/song-url'
import type { LyricReq, LyricRes } from './types/lyric'
import type { PlayListTrackAllReq, PlayListTrackAllRes } from './types/play-list-track-all'
import type { SearchHotRes } from './types/search-hot'
import type { SearchReq, SearchRes } from './types/search'

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

export function getLyric(data: LyricReq) {
  const state = useStateStore()
  return music.post<LyricRes>(`/lyric`, { id: data.id, realIP: state.realIP })
}

export function getPlayListTrackAll(data: PlayListTrackAllReq) {
  const state = useStateStore()
  return music.post<PlayListTrackAllRes>('/playlist/track/all', { realIP: state.realIP, ...data })
}

export function getSearchHot() {
  const state = useStateStore()
  return music.get<SearchHotRes>('/search/hot', { params: { realIP: state.realIP } })
}

export function getSearch(data: SearchReq) {
  const state = useStateStore()
  return music.post<SearchRes>('/search', { realIP: state.realIP, ...data })
}
