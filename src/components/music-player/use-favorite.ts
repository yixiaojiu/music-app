import type { MusicItme } from '@/utils/types/music-store'
import _ from 'lodash'
import { useMusicStore } from '@/stores/music'
import { useLocalStorage } from '@vueuse/core'

export function useFavorite() {
  const useMusic = useMusicStore()
  const favoriteList = useLocalStorage('favoriteList', <MusicItme[]>[])

  const isFavorite = (song: MusicItme) => {
    return favoriteList.value.findIndex((item) => item.id === song.id) > -1
  }

  const toggleFavorite = (song: MusicItme) => {
    if (isFavorite(song)) {
      _.remove(favoriteList.value, (item) => item.id === song.id)
    } else {
      favoriteList.value.push(useMusic.currentSong)
    }
  }
  return {
    isFavorite,
    toggleFavorite
  }
}
