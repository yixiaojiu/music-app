import type { Banner } from '@/request/music/types/banner'
import type { Playlist } from '@/request/music/types/playlist'
import type { ArtistItem } from '@/utils/types/artist-list'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStateStore = defineStore('state', () => {
  const realIP = ref('')
  const banners = ref<Banner[]>([])
  const playlists = ref<Playlist[]>([])
  const loading = ref(false)
  const artistList = ref<ArtistItem[]>([])

  return {
    realIP,
    banners,
    playlists,
    loading,
    artistList
  }
})
