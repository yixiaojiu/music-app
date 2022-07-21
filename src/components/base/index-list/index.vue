<script setup lang="ts">
import type { ArtistItem } from '@/utils/types/artist-list'
import { useFixed } from './use-fixed'
import { useMusicStore } from '@/stores/music'
import { ref } from 'vue'

const LI_HIGHT = 20
const pos = ref(0)
const groupRef = ref<HTMLUListElement | null>(null)

const props = defineProps<{
  artistList: ArtistItem[]
}>()

const emits = defineEmits<{
  (e: 'selected', id: number): void
}>()

const { fixedTitle, fixedStyle, listHeights } = useFixed(props, pos, groupRef)
const useMusic = useMusicStore()

const handleScroll = () => {
  if (!groupRef.value) {
    return
  }
  pos.value = groupRef.value.scrollTop
}

// 侧边栏滑动逻辑
let startPointY = 0
let movePointY = 0
let anchorIndex = 0
const onShortcutTouchStart = (e: TouchEvent) => {
  const target = e.target as HTMLLIElement
  if (!target.dataset.index) {
    return
  }
  anchorIndex = +target.dataset.index
  if (!anchorIndex && anchorIndex !== 0) {
    return
  }
  if (!groupRef.value) {
    return
  }
  scrollTo(anchorIndex, 'smooth')
  startPointY = e.touches[0].pageY
}

const onShortcutTouchMove = (e: TouchEvent) => {
  movePointY = e.touches[0].pageY
  let scrollIndex = anchorIndex + Math.floor((movePointY - startPointY) / LI_HIGHT)
  if (scrollIndex < 0) {
    scrollIndex = 0
  }
  if (scrollIndex > listHeights.value.length - 1) {
    scrollIndex = listHeights.value.length - 1
  }
  scrollTo(scrollIndex, 'auto')
}

function scrollTo(anchorIndex: number, scrollBevior: 'auto' | 'smooth') {
  if (anchorIndex === NaN) {
    return
  }
  if (!groupRef.value) {
    return
  }
  groupRef.value.scrollTo({
    top: listHeights.value[anchorIndex],
    behavior: scrollBevior
  })
}

const handleClick = (id: number) => {
  emits('selected', id)
}
</script>

<template>
  <h2 class="absolute left-0 top-0 w-full text-xs bg-gray-800 pl-4 text-gray-500" style="height: 30px; line-height: 30px" :style="fixedStyle">{{ fixedTitle }}</h2>
  <ul @touchstart.stop.prevent="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove" absolute right-1 text-gray-500 text-xs class="top-1/2 -translate-y-1/2" py-4 bg-gray-800 px-1 rounded-full>
    <li v-for="(item, index) in artistList" :data-index="index" :key="item.title" text-center pb-1 :class="{ 'text-yellow-400': fixedTitle === item.title }">{{ item.title }}</li>
  </ul>
  <ul ref="groupRef" @scroll="handleScroll" scroll-box h-full>
    <li v-for="group in artistList" :key="group.title" class="text-gray-500">
      <h2 class="text-xs bg-gray-800 pl-4" style="height: 30px; line-height: 30px">{{ group.title }}</h2>
      <ul>
        <li v-for="item in group.list" :key="item.id" @click="handleClick(item.id)" class="px-8 py-4">
          <img v-img-lazy="item.picUrl" class="bg-cover w-12 h-12 rounded-full align-middle mr-4" />
          <span class="text-base">{{ item.name }}</span>
        </li>
      </ul>
    </li>
    <div h-15 v-if="!useMusic.fullScreen && useMusic.playList.length"></div>
  </ul>
</template>
