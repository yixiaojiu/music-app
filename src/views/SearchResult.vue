<script setup lang="ts">
import type { Song, Artist } from '@/request/music/types/search'
import type { MusicItme } from '@/utils/types/music-store'
import SearchInput from '@/components/search/SearchInput.vue'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getSearch } from '@/request/music/index'
import { useMusicStore } from '@/stores/music'
import { useKeywords } from '@/utils/use-keywords'

const route = useRoute()
const router = useRouter()
const useMusic = useMusicStore()
const { addKeyword } = useKeywords()

const inputValue = ref(route.query.keywords + '')
const songs = ref<Song[]>([])
const loading = ref(false)

const getSearchResult = async () => {
  loading.value = true
  const { data: res } = await getSearch({ keywords: inputValue.value })
  songs.value = res.result.songs
  loading.value = false
}

const formatSongArtistInfo = (artist: Artist[]) => {
  let str = ''
  artist.forEach((item) => {
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
    item.artists.forEach((singer) => {
      artistList += `${singer.name}/`
    })
    sequenceList.push({
      songName: item.name,
      id: item.id,
      artistList: artistList.slice(0, -1),
      picUrl: item.album.artist.img1v1Url
    })
  })
  useMusic.selectPlay(sequenceList, index)
}

const handleSearchClick = () => {
  if (!inputValue.value) {
    return
  }
  addKeyword(inputValue.value.trim())
  getSearchResult()
}

onMounted(async () => {
  await getSearchResult()
})
</script>

<template>
  <div fixed-full z-20 p-4 flex flex-col bg-gray-900>
    <div flex gap-3>
      <button @click="router.back()" btn-primary>
        <div i-bi-arrow-left w-6 h-6 text-yellow-400></div>
      </button>
      <SearchInput @search-click="handleSearchClick" v-model:value="inputValue" />
    </div>
    <ul v-loading="loading" mt-4 flex-1 w-full scroll-box>
      <li v-for="(song, index) in songs" :key="song.id" @click="selectItem(index)" py-2 px-6 text-ell>
        <h3 text-gray-300 text-base>{{ song.name }}</h3>
        <p text-gray-500 text-sm text-ell>{{ `${formatSongArtistInfo(song.artists)}·${song.album.name}` }}</p>
      </li>
    </ul>
  </div>
</template>
