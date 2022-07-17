<script setup lang="ts">
import type { HotSong, Ar } from '@/request/music/types/artist-info'
import type { MusicItme } from '@/utils/types/music-store'
import { getArtistInfo } from '@/request/music/index'
import MusicList from '@/components/music-list/index.vue'
import { useStateStore } from '@/stores/state'
import { useMusicStore } from '@/stores/music'
import { ref, onMounted } from 'vue'

const useState = useStateStore()
const useMusic = useMusicStore()

const artistPicUrl = ref<string>('')
const artistName = ref<string>('')
const hotSongs = ref<HotSong[]>([])

const props = defineProps<{
  id: string
}>()

const formatSongArtistInfo = (ar: Ar[]) => {
  let str = ''
  ar.forEach((item) => {
    str += `${item.name}\\`
  })
  return str.slice(0, -1)
}

const selectItem = (index: number) => {
  useMusic.playing = false
  const songsList = hotSongs.value
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
  // 获取歌手数据逻辑
  useState.loading = true
  const { data: res1 } = await getArtistInfo({ id: props.id })
  hotSongs.value = res1.hotSongs
  artistPicUrl.value = res1.artist.picUrl
  artistName.value = res1.artist.name
  useState.loading = false
})
</script>

<template>
  <div fixed z-10 top-0 left-0 h-screen w-screen bg-gray-900>
    <MusicList :pic-url="artistPicUrl" :title="artistName">
      <template #default>
        <li v-for="(song, index) in hotSongs" :key="song.id" @click="selectItem(index)" py-2 px-6 text-ell>
          <h3 text-gray-300 text-base>{{ song.name }}</h3>
          <p text-gray-500 text-sm text-ell>{{ `${formatSongArtistInfo(song.ar)}·${song.al.name}` }}</p>
        </li>
      </template>
    </MusicList>
  </div>
</template>
