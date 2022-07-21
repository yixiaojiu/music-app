<script setup lang="ts">
import type { Hot } from '@/request/music/types/search-hot'
import { onMounted, ref } from 'vue'
import { getSearchHot } from '@/request/music/index'
import { useRouter, RouterView } from 'vue-router'
import { useKeywords } from '@/utils/use-keywords'

import SearchInput from '@/components/search/SearchInput.vue'
import Confirm from '@/components/base/confirm/index.vue'

const router = useRouter()
const { keywordsList, clearKeywords, addKeyword, removeKeyword } = useKeywords()

const inputValue = ref('')
const hotKeys = ref<Hot[]>([])
const confirmVisible = ref(false)

const handleAddQueryClick = (hotKey: Hot) => {
  inputValue.value = hotKey.first
  handleSearchClick()
}

const handleSearchClick = () => {
  if (!inputValue.value) {
    return
  }
  addKeyword(inputValue.value)
  router.push({
    path: '/search/result',
    query: {
      keywords: inputValue.value
    }
  })
}

const getConfirmResult = (result: boolean) => {
  confirmVisible.value = false
  result && clearKeywords()
}

const handlekeywordClick = (keyword: string) => {
  inputValue.value = keyword
  handleSearchClick()
}

onMounted(async () => {
  const { data: res } = await getSearchHot()
  hotKeys.value = res.result.hots
})
</script>

<template>
  <div py-4 px-8 flex flex-col>
    <SearchInput v-model:value="inputValue" @search-click="handleSearchClick" />

    <div my-4>
      <h3 text-gray-500 text-base leading-10>热门搜索</h3>
      <ul flex flex-wrap gap-3>
        <li v-for="hotKey in hotKeys" @click="handleAddQueryClick(hotKey)" text-gray-500 text-xs rounded-1 py-1 px-2 bg-gray-800>{{ hotKey.first }}</li>
      </ul>
    </div>

    <h3 text-gray-500 text-base leading-10 flex items-center>
      <span text-base leading-10 flex-1>搜索历史</span>
      <div @click.stop="confirmVisible = true" i-bi-trash text-gray-500></div>
    </h3>
    <div v-if="keywordsList.length" overflow-hidden flex-1 w-full>
      <ul w-full h-screen-40 scroll-box>
        <li v-for="keyword in keywordsList" @click.stop="handlekeywordClick(keyword)" :key="keyword" flex items-center leading-8 text-gray-500>
          <span flex-1>{{ keyword }}</span>
          <div @click="removeKeyword(keyword)" i-bi-x-lg></div>
        </li>
      </ul>
    </div>

    <Confirm :visible="confirmVisible" text="是否清空搜索历史" confirm-text="清空" cancel-text="取消" @result="getConfirmResult" />
    <router-view v-slot="{ Component }">
      <transition enter-active-class="animate__animated animate__fadeInRight" leave-active-class="animate__animated animate__fadeOutRight">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>
