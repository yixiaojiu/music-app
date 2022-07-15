<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
type Props = {
  title: string
  picUrl: string
}
defineProps<Props>()
const router = useRouter()

const blurNum = ref(0)
const listRef = ref<HTMLUListElement | null>(null)
const HEADER_HEIGHT = 40
const PIC_HEIGHT = 300
const PAGE_HEIGHT = document.body.clientHeight

const blur = computed(() => {
  return `${blurNum.value}px`
})

// 处理列表滑动逻辑
let startPositonY = 0
let movePositionY = 0
let top = PIC_HEIGHT
let positionChange = 0
let listHeight = 0
const handleTouchStart = (e: TouchEvent) => {
  startPositonY = e.touches[0].pageY
  movePositionY = 0
  if (!listRef.value) {
    return
  }
  listHeight = listRef.value.clientHeight
}
const handleTouchMove = (e: TouchEvent) => {
  if (!listRef.value) {
    return
  }
  if (listRef.value.scrollTop !== 0) {
    return
  }
  movePositionY = e.touches[0].pageY
  positionChange = movePositionY - startPositonY
  startPositonY = movePositionY
  top += positionChange
  if (positionChange < 0) {
    if (top < HEADER_HEIGHT) {
      top = HEADER_HEIGHT
      listRef.value.style.top = `${top}px`
      listRef.value.style.height = `${PAGE_HEIGHT - HEADER_HEIGHT}px`
      return
    }
  } else {
    if (top > HEADER_HEIGHT && top < PIC_HEIGHT) {
      listRef.value.style.overflow = 'hidden'
    }
    if (top > PIC_HEIGHT) {
      top = PIC_HEIGHT
      listRef.value.style.top = `${top}px`
      listRef.value.style.height = `${PAGE_HEIGHT - PIC_HEIGHT}px`
      return
    }
  }
  listHeight -= positionChange
  blurNum.value = ((PIC_HEIGHT - top) / PIC_HEIGHT) * 10
  listRef.value.style.top = `${top}px`
  listRef.value.style.height = `${listHeight}px`
}
const handleTouchEnd = (e: TouchEvent) => {
  if (!listRef.value) {
    return
  }
  if (top <= HEADER_HEIGHT) {
    listRef.value.style.overflow = 'scroll'
  }
}

const handleBackClick = () => {
  router.back()
}
</script>

<template>
  <header h-10 text-yellow-400 absolute w-full z-2>
    <button @click="handleBackClick" absolute left-3 top="1/2" class="-translate-y-1/2">
      <div i-fa6-solid-angle-left text-yellow-400 text-xl></div>
    </button>
    <h2 text-center text-xl leading-10>{{ title }}</h2>
  </header>
  <div class="bg-image" :style="`background-image: url(${picUrl});`">
    <div class="filter" w-full h-full absolute></div>
    <button absolute flex items-center justify-center text-yellow-400 left="1/2" class="-translate-x-1/2" bottom-8 h-8 px-4 border-1 border-yellow-400 rounded-full>
      <div i-fa6-solid-circle-play></div>
      <p ml-2>随机播放全部</p>
    </button>
  </div>
  <ul @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd" ref="listRef" class="list-container" scroll-box bg-gray-900>
    <slot></slot>
  </ul>
</template>

<style scoped>
.filter {
  backdrop-filter: blur(v-bind(blur));
  background: rgba(7, 17, 27, 0.4);
}
.bg-image {
  position: relative;
  height: 300px;
  width: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}
.list-container {
  width: 100%;
  box-sizing: content-box;
  position: absolute;
  top: 300px;
  height: calc(100vh - 300px);
  overflow: hidden;
  z-index: 1;
}
</style>
