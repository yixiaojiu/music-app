import { ref, watch } from 'vue'
import { useMusicStore } from '@/stores/music'

export function useCd() {
  const useMusic = useMusicStore()
  const cdContainerRef = ref<HTMLDivElement | null>(null)
  const cdImgRef = ref<HTMLImageElement | null>(null)

  function asyncTransform() {
    if (!cdContainerRef.value) {
      return
    }
    if (!cdImgRef.value) {
      return
    }
    if (useMusic.playing) {
      cdImgRef.value.classList.add('animate-spin')
    } else {
      const imgTransform = getComputedStyle(cdImgRef.value).transform
      const containerTransform = getComputedStyle(cdContainerRef.value).transform
      cdContainerRef.value.style.transform = containerTransform === 'none' ? imgTransform : imgTransform.concat(' ', containerTransform)
      cdImgRef.value.classList.remove('animate-spin')
    }
  }

  watch(
    () => useMusic.playing,
    () => {
      asyncTransform()
    }
  )

  return {
    cdContainerRef,
    cdImgRef,
    asyncTransform
  }
}
