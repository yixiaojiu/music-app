<script setup lang="ts">
import type { ArtistItem } from '@/utils/types/artist-list'
import { useFixed } from './use-fixed'
import { ref } from 'vue'

const pos = ref(0)
const groupRef = ref<HTMLUListElement | null>(null)

const props = defineProps<{
  artistList: ArtistItem[]
}>()

const handleScroll = () => {
  if (!groupRef.value) {
    return
  }
  pos.value = groupRef.value.scrollTop
}

const { fixedTitle, fixedStyle } = useFixed(props, pos, groupRef)
</script>

<template>
  <h2 class="absolute left-0 top-0 w-full text-xs bg-gray-800 pl-4 text-gray-500" style="height: 30px; line-height: 30px" :style="fixedStyle">{{ fixedTitle }}</h2>
  <ul ref="groupRef" @scroll="handleScroll" scroll-box h-full>
    <li v-for="group in artistList" :key="group.title" class="text-gray-500">
      <h2 class="text-xs bg-gray-800 pl-4" style="height: 30px; line-height: 30px">{{ group.title }}</h2>
      <ul>
        <li v-for="item in group.list" class="px-8 py-4">
          <img v-img-lazy="item.picUrl" class="bg-cover w-12 h-12 rounded-full align-middle mr-4" />
          <span class="text-base">{{ item.name }}</span>
        </li>
      </ul>
    </li>
  </ul>
</template>
