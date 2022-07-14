<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from '@/components/header/index.vue'
import Tab from '@/components/tab/index.vue'
import FullLoading from '@/components/base/full-loading/index.vue'

import { onBeforeMount } from 'vue'
import { getRealIP } from '@/request/get-ip/index'
import { useStateStore } from '@/stores/state'
const stores = useStateStore()

onBeforeMount(async () => {
  // 获取ip,并存到store中
  const { data: res } = await getRealIP()
  stores.realIP = res.ip
})
</script>

<template>
  <Suspense>
    <div class="bg-gray-900 h-screen overflow-hidden flex flex-col">
      <FullLoading />
      <Header />
      <Tab />
      <RouterView />
    </div>
  </Suspense>
</template>

<style>
a {
  text-decoration: none;
  display: block;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
ul {
  list-style: none;
}
button {
  outline: none;
  background-color: transparent;
  border: none;
}
</style>
