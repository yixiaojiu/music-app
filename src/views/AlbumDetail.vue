<script setup lang="ts">
import type { Song, Ar } from '@/request/music/types/play-list-track-all'
import type { MusicItme } from '@/utils/types/music-store'
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useStateStore } from '@/stores/state'
import { getPlayListTrackAll } from '@/request/music/index'
import { useMusicStore } from '@/stores/music'

import MusicList from '@/components/music-list/index.vue'

const props = defineProps<{
  id: string
}>()
const route = useRoute()
const state = useStateStore()
const useMusic = useMusicStore()

const title = ref(route.query.name + '')
const imgUrl = ref(route.query.imgUrl + '')
const songs = ref<Song[]>([])

const formatSongArtistInfo = (ar: Ar[]) => {
  let str = ''
  ar.forEach((item) => {
    str += `${item.name}\\`
  })
  return str.slice(0, -1)
}

const selectItem = (index: number) => {
  useMusic.playing = false
  const songsList = songs.value
  const sequenceList: MusicItme[] = []
  songsList.forEach((item) => {
    let artistList = ''
    item.ar.forEach((singer) => {
      artistList += `${singer.name}/`
    })
    sequenceList.push({
      songName: item.name,
      id: item.id,
      artistList: artistList.slice(0, -1),
      picUrl: item.al.picUrl
    })
  })
  useMusic.selectPlay(sequenceList, index)
}

onMounted(async () => {
  state.loading = true
  const { data: res } = await getPlayListTrackAll({ id: props.id, limit: 20 })
  songs.value = res.songs
  state.loading = false
})
</script>

<template>
  <div fixed z-10 top-0 left-0 h-screen w-screen bg-gray-900>
    <MusicList :pic-url="imgUrl" :title="title">
      <template #default>
        <li v-for="(song, index) in songs" :key="song.id" @click="selectItem(index)" py-2 px-6 text-ell>
          <h3 text-gray-300 text-base>{{ song.name }}</h3>
          <p text-gray-500 text-sm text-ell>{{ `${formatSongArtistInfo(song.ar)}·${song.al.name}` }}</p>
        </li>
      </template>
    </MusicList>
  </div>
</template>
