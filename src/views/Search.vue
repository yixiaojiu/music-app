<script setup lang="ts">
import type { Hot } from '@/request/music/types/search-hot'
import { onMounted, ref } from 'vue'
import { getSearchHot } from '@/request/music/index'

const inputValue = ref('')
const hotKeys = ref<Hot[]>([])

const handleAddQueryClick = (hotKey: Hot) => {
  inputValue.value = hotKey.first
}

onMounted(async () => {
  const { data: res } = await getSearchHot()
  hotKeys.value = res.result.hots
})
</script>

<template>
  <div py-4 px-8>
    <div w-full flex-center bg-gray-700 h-8 rounded-2>
      <button btn-primary text-gray-400>
        <div i-bi-search w-4 h-4></div>
      </button>
      <input text-gray-400 flex-1 bg-transparent type="text" placeholder="搜索歌曲、歌手" v-model="inputValue" />
      <button v-if="inputValue.length" @click="inputValue = ''" btn-primary text-gray-400>
        <div w-4 h-4 i-bi-x-circle></div>
      </button>
    </div>
    <div my-4>
      <h3 text-gray-500 text-base leading-10>热门搜索</h3>
      <ul flex flex-wrap gap-3>
        <li v-for="hotKey in hotKeys" @click="handleAddQueryClick(hotKey)" text-gray-500 text-xs rounded-1 py-1 px-2 bg-gray-800>{{ hotKey.first }}</li>
      </ul>
    </div>
  </div>
</template>
