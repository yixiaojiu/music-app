<script setup lang="ts">
import type { HotSong, Ar } from '@/request/music/types/artist-info'
import type { Datum } from '@/request/music/types/song-url'
import { getArtistInfo, getSongUrls } from '@/request/music/index'
import { useStateStore } from '@/stores/state'
import { ref } from 'vue'
import MusicList from '@/components/music-list/index.vue'

const useState = useStateStore()

const artistPicUrl = ref<string>('')
const artistName = ref<string>('')
const hotSongs = ref<HotSong[]>([])
const songUrls = ref<Datum[]>([])

const props = defineProps<{
  id: string
}>()

// 获取歌手数据逻辑
useState.loading = true
const { data: res1 } = await getArtistInfo({ id: props.id })
hotSongs.value = res1.hotSongs
artistPicUrl.value = res1.artist.picUrl
artistName.value = res1.artist.name

const { data: res2 } = await getSongUrls({ id: res1.hotSongs.map((item) => item.id) })
songUrls.value = res2.data
useState.loading = false

const formatSongArtistInfo = (ar: Ar[]) => {
  let str = ''
  ar.forEach((item) => {
    str += `${item.name}\\`
  })
  return str.slice(0, -1)
}
</script>

<template>
  <div fixed z-10 top-0 left-0 h-screen w-screen bg-gray-900>
    <MusicList :pic-url="artistPicUrl" :title="artistName" :hot-songs="hotSongs" :song-urls="songUrls">
      <template #default>
        <li v-for="song in hotSongs" :key="song.id" py-2 px-6>
          <h3 text-gray-300 text-base>{{ song.name }}</h3>
          <p text-gray-500 text-sm text-ell>{{ `${formatSongArtistInfo(song.ar)}·${song.al.name}` }}</p>
        </li>
      </template>
    </MusicList>
  </div>
</template>
