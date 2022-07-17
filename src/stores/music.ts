import type { PlayMode, MusicItme } from '@/utils/types/music-store'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import _ from 'lodash'

export const useMusicStore = defineStore('music', () => {
  // 顺序播放列表
  const sequenceList = ref<MusicItme[]>([])
  // 播放的列表
  const playList = ref<MusicItme[]>([])
  // 是否正在播放
  const playing = ref(false)
  // 播放模式
  const playMode = ref<PlayMode>('sequence')
  // 当前播放索引
  const currentIndex = ref(0)
  // 播放组件是否全屏
  const fullScreen = ref(false)

  const currentSong = computed(() => {
    return playList.value[currentIndex.value] || { songName: 'glow', id: 537854742, artistList: '鹿乃', picUrl: 'https://p1.music.126.net/iLcmytETSkZgd8xcGVEO5A==/109951163200361748.jpg' }
  })

  const selectPlay = (list: MusicItme[], index: number) => {
    sequenceList.value = list
    playMode.value = 'sequence'
    fullScreen.value = true
    playList.value = list
    currentIndex.value = index
  }
  const randomPlay = (list: MusicItme[]) => {
    sequenceList.value = list
    playMode.value = 'random'
    fullScreen.value = true
    playList.value = _.shuffle(list)
    currentIndex.value = 0
  }

  const prev = (): boolean => {
    if (playList.value.length === 1) {
      return true
    } else if (playList.value.length === 0) {
      return false
    } else {
      playing.value = false
      currentIndex.value = currentIndex.value === 0 ? playList.value.length - 1 : currentIndex.value - 1
      return false
    }
  }

  const next = (): boolean => {
    if (playList.value.length === 1) {
      return true
    } else if (playList.value.length === 0) {
      return false
    } else {
      playing.value = false
      currentIndex.value = currentIndex.value === playList.value.length - 1 ? 0 : currentIndex.value + 1
      return false
    }
  }

  const changeMode = (mode: PlayMode) => {
    const currentId = currentSong.value.id
    if (mode === 'random') {
      playList.value = _.shuffle(sequenceList.value)
    } else {
      playList.value = sequenceList.value
    }
    const index = playList.value.findIndex((song) => song.id === currentId)
    currentIndex.value = index
    playMode.value = mode
  }

  return {
    sequenceList,
    playList,
    playing,
    playMode,
    currentIndex,
    fullScreen,
    currentSong,
    selectPlay,
    randomPlay,
    prev,
    next,
    changeMode
  }
})
