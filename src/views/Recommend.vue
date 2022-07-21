<script setup lang="ts">
import type { Banner } from '@/request/music/types/banner'
import type { Playlist } from '@/request/music/types/playlist'

import { ref } from 'vue'
import { getBanner, getPlayList } from '@/request/music/index'
import { useStateStore } from '@/stores/state'
import { useMusicStore } from '@/stores/music'
import Slide from '@/components/base/slide/index.vue'
import { RouterView, useRouter } from 'vue-router'

const state = useStateStore()
const useMusic = useMusicStore()
const router = useRouter()

const banners = ref<Banner[]>([])
const playlists = ref<Playlist[]>([])

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
    limit: 20
  })
  playlists.value = res.playlists
  state.playlists = res.playlists
}

// 关闭全局loading 效果
state.loading = false

const handleAlbumClick = (playlist: Playlist) => {
  router.push({
    path: `/recommend/${playlist.id}`,
    query: {
      name: playlist.name,
      imgUrl: playlist.coverImgUrl
    }
  })
}
</script>

<template>
  <div class="scroll-box">
    <Slide :banners="banners" />
    <div class="recommend-list">
      <h1 class="text-center text-yellow-400 text-sm h-10 leading-10 my-2 font-normal">热门歌单推荐</h1>
      <ul class="text-white px-4">
        <li v-for="playlist in playlists" @click="handleAlbumClick(playlist)" :key="playlist.id" class="flex gap-4 my-2">
          <div class="icon">
            <img width="60" height="60" v-img-lazy="playlist.coverImgUrl" />
          </div>
          <div class="text flex-1 h-full w-full pr-2">
            <h2 class="text-ell text-sm text-opacity-90 text-gray-300 my-2">{{ playlist.name }}</h2>
            <p class="title text-ell text-opacity-50 text-gray-300">{{ playlist.description }}</p>
          </div>
        </li>
        <div h-15 v-if="!useMusic.fullScreen && useMusic.playList.length"></div>
      </ul>
    </div>
  </div>
  <router-view v-slot="{ Component }">
    <transition enter-active-class="animate__animated animate__fadeInRight" leave-active-class="animate__animated animate__fadeOutRight">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style lang="less" scoped>
.title {
  width: 250px;
  font-size: 12px;
}
</style>
