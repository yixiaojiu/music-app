<script setup lang="ts">
import type { ArtistItem } from '@/utils/types/artist-list'
import { ref } from 'vue'
import { useFixed } from './use-fixed'

const props = defineProps<{
  artistList: ArtistItem[]
  pos: number
}>()

const fixedTitle = ref('')
const { groupRef } = useFixed(props)
</script>

<template>
  <ul ref="groupRef">
    <li v-for="group in artistList" :key="group.title" class="text-gray-500">
      <h2 class="text-xs bg-gray-800 pl-4" style="height: 30px; line-height: 30px">{{ group.title }}</h2>
      <ul>
        <li v-for="item in group.list" class="px-8 my-4">
          <img v-img-lazy="item.picUrl" class="bg-cover w-12 h-12 rounded-full align-middle mr-6" />
          <span class="text-base">{{ item.name }}</span>
        </li>
      </ul>
    </li>
  </ul>
  <h2 class="absolute left-0 top-0 w-full text-xs bg-gray-800 pl-4 text-gray-500" style="height: 30px; line-height: 30px">{{ fixedTitle }}</h2>
</template>
