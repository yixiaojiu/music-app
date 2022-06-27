<script setup lang="ts">
import type { Banner } from '@/request/music/types/banner'
import type { Playlist } from '@/request/music/types/playlist'

import { ref } from 'vue'
import { getBanner, getPlayList } from '@/request/music/index'
import { useStateStore } from '@/stores/state'
import Slide from '@/components/base/slide/index.vue'

const state = useStateStore()

const banners = ref<Banner[]>([])
const playlists = ref<Playlist[]>([])
const loading = ref(false)

// 开启全局loading效果
state.loading = true

if (state.banners.length) {
  banners.value = state.banners
} else {
  const { data: res } = await getBanner({
    realIP: state.realIP,
    type: 1
  })
  banners.value = res.banners
  state.banners = res.banners
}

if (state.playlists.length) {
  playlists.value = state.playlists
} else {
  const { data: res } = await getPlayList({
    realIP: state.realIP,
    cat: 'ACG',
    limit: 10
  })
  playlists.value = res.playlists
  state.playlists = res.playlists
}

// 关闭全局loading 效果
state.loading = false
</script>

<template>
  <div class="scroll-box">
    <Slide :banners="banners" />
    <div class="recommend-list">
      <h1 class="text-center text-yellow-400 text-sm h-10 leading-10 my-2 font-normal">热门歌单推荐</h1>
      <ul class="text-white px-4">
        <li v-for="playlist in playlists" :key="playlist.id" class="flex my-2">
          <div class="icon">
            <img width="60" height="60" v-img-lazy="playlist.coverImgUrl" />
          </div>
          <div class="text flex-1 ml-3 h-full w-full pr-2">
            <h2 class="text-ell text-sm text-opacity-90 text-gray-200 my-2">{{ playlist.name }}</h2>
            <p class="title text-ell text-opacity-50 text-gray-300">{{ playlist.description }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="less" scoped>
.title {
  width: 250px;
  font-size: 12px;
}
</style>
