<script setup lang="ts">
import type { HotSong, Ar } from '@/request/music/types/artist-info'

const props = defineProps<{
  hotSongs: HotSong[]
}>()

const formatSongArtistInfo = (ar: Ar[]) => {
  let str = ''
  ar.forEach((item) => {
    str += `${item.name}\\`
  })
  return str.slice(0, -1)
}
</script>

<template>
  <ul py-2>
    <li v-for="song in hotSongs" :key="song.id" py-2 px-6>
      <h3 text-gray-300 text-base>{{ song.name }}</h3>
      <p text-gray-500 text-sm text-ell>{{ `${formatSongArtistInfo(song.ar)}·${song.al.name}` }}</p>
    </li>
  </ul>
</template>
