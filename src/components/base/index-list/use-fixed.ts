import type { ArtistItem } from '@/utils/types/artist-list'
import type { Ref } from 'vue'
import { ref, watch, computed, onMounted } from 'vue'

export function useFixed(props: Readonly<{ artistList: ArtistItem[] }>, pos: Ref<number>, groupRef: Ref<HTMLUListElement | null>) {
  const listHeights = ref<number[]>([])
  const fixedTitle = ref('热')
  const distance = ref()
  const TITLE_HEIGHT = 30

  const fixedStyle = computed(() => {
    const diff = distance.value > 0 && distance.value < TITLE_HEIGHT ? distance.value - TITLE_HEIGHT : 0
    return `transform: translateY(${diff}px);`
  })

  onMounted(() => {
    calculate()
  })

  watch(pos, (newVal) => {
    for (let i = 0; i < listHeights.value.length - 1; i++) {
      const heightTop = listHeights.value[i]
      const heightBottom = listHeights.value[i + 1]
      if (newVal >= heightTop && newVal <= heightBottom) {
        fixedTitle.value = props.artistList[i].title
        distance.value = heightBottom - newVal
      }
    }
  })

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
    fixedTitle,
    fixedStyle,
    listHeights
  }
}
