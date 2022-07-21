import { useMusicStore } from '@/stores/music'
import { computed } from 'vue'

export function useMode() {
  const useMusic = useMusicStore()
  
  const changeMode = () => {
    const playMode = useMusic.playMode
    if (playMode === 'sequence') {
      useMusic.changeMode('loop')
    }
    if (playMode === 'loop') {
      useMusic.changeMode('random')
    }
    if (playMode === 'random') {
      useMusic.changeMode('sequence')
    }
  }

  const modeText = computed(() => {
    return useMusic.playMode === 'sequence' ? '顺序播放' : useMusic.playMode === 'random' ? '随机播放' : '单曲循环'
  })
  return {
    changeMode,
    modeText
  }
}
