import type { Banner } from '@/request/music/types/banner'
import type { Playlist } from '@/request/music/types/playlist'
import type { ArtistItem } from '@/utils/types/artist-list'
import { defineStore } from 'pinia'

export const useStateStore = defineStore({
  id: 'state',
  state: () => ({
    realIP: '',
    banners: <Banner[]>[],
    playlists: <Playlist[]>[],
    loading: false,
    artistList: <ArtistItem[]>[]
  })
})
