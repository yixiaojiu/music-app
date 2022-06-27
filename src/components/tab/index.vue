<script setup lang="ts">
import { reactive } from 'vue'
import { RouterLink } from 'vue-router'

type Tab = {
  name: string
  path: string
}

const tabs = reactive<Tab[]>([
  {
    name: '推荐',
    path: '/recommend'
  },
  {
    name: '歌手',
    path: '/singer'
  },
  {
    name: '排行',
    path: '/top-list'
  },
  {
    name: '搜索',
    path: 'search'
  }
])
</script>

<template>
  <div class="flex h-10 text-sm leading-10">
    <RouterLink v-for="tab in tabs" :key="tab.path" :to="tab.path" class="tab-item flex-1 text-center">
      <span class="tab-link pb-1 text-gray-4">{{ tab.name }}</span>
    </RouterLink>
  </div>
</template>
<style lang="less" scoped>
.tab-item.router-link-active {
  .tab-link {
    @text-yellow-400: rgb(250, 204, 21);
    color: @text-yellow-400;
    border-bottom: 2px solid @text-yellow-400;
  }
}
</style>
