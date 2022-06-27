<script setup lang="ts">
import type { ArtistItem } from '@/utils/types/artist-list'
import { getArtist } from '@/request/music/index'
import { pinyin } from 'pinyin-pro'
import { ref } from 'vue'
import { useStateStore } from '@/stores/state'
import indexList from '@/components/base/index-list/index.vue'

const state = useStateStore()
const artistList = ref<ArtistItem[]>([])

// 获取并处理歌手数据逻辑
state.loading = true
if (state.artistList.length) {
  artistList.value = state.artistList
} else {
  const { data: res } = await getArtist({
    realIP: state.realIP,
    type: -1,
    area: 7,
    limit: 50
  })
  const singerMap = new Map<string, ArtistItem>()

  res.artists.forEach((item) => {
    const firstLetterArr = pinyin(item.name, {
      pattern: 'first',
      type: 'array'
    })
    if (!firstLetterArr || !firstLetterArr.length) {
      return
    }
    const key = firstLetterArr[0].toUpperCase()
    if (singerMap.has(key)) {
      singerMap.get(key)?.list.push(item)
    } else {
      singerMap.set(key, {
        title: key,
        list: [item]
      })
    }
  })
  const artists: ArtistItem[] = []
  for (const value of singerMap.values()) {
    artists.push(value)
  }
  artists.sort((a, b) => {
    return a.title.charCodeAt(0) - b.title.charCodeAt(0)
  })

  artists.unshift({
    title: '热',
    list: res.artists.slice(0, 5)
  })
  artistList.value = artists
  state.artistList = artists
}
// 关闭全局loading
state.loading = false
</script>

<template>
  <div relative singer-container overflow-hidden>
    <indexList :artistList="artistList" />
  </div>
</template>
