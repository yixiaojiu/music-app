import type { ArtistItem } from '@/utils/types/artist-list'
import { ref, watch, nextTick } from 'vue'

export function useFixed(props: Readonly<{ artistList: ArtistItem[]; pos: number }>) {
  const groupRef = ref<HTMLUListElement | null>(null)
  const listHeights = ref<number[]>([])

  watch(
    () => props.artistList,
    async () => {
      await nextTick()
      calculate()
    }
  )

  watch(
    () => props.pos,
    () => {
      console.log(props.pos)
    }
  )

  function calculate() {
    const list = groupRef.value?.children
    let height = 0

    listHeights.value.length = 0
    listHeights.value.push(height)
    if (!list) {
      return
    }
    for (let i = 0; i < list.length; i++) {
      height += list[i].clientHeight
      listHeights.value.push(height)
    }
  }

  return {
    groupRef
  }
}
