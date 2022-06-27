<script setup lang="ts">
import type { Banner } from '@/request/music/types/banner'
import { ref, computed } from 'vue'
const props = defineProps<{
  banners: Banner[]
}>()
const activeIndex = ref(0)

const bannerTranslate = () => {
  if (activeIndex.value === props.banners.length - 1) {
    activeIndex.value = 0
  } else {
    activeIndex.value++
  }
}

const bannerTranslateX = computed<string>(() => {
  return `-${activeIndex.value * 100}vw`
})

const bannerTimerId = setInterval(bannerTranslate, 5000)
</script>

<template>
  <div class="overflow-x-hidden mt-1 relative">
    <ul class="text-white list-none flex banner-container">
      <li v-for="banner in banners" :key="banner.bannerId">
        <a :href="banner.url">
          <img :src="banner.pic" class="w-screen" alt="" />
        </a>
      </li>
    </ul>
    <ul class="absolute flex left-1/2 -translate-x-1/2 bottom-2.5">
      <li v-for="num in banners.length" :key="num" class="mx-1">
        <div class="dot" :class="{ active: num - 1 === activeIndex }"></div>
      </li>
    </ul>
  </div>
</template>

<style lang="less" scoped>
.banner-container {
  transform: translateX(v-bind(bannerTranslateX));
  transition: transform 0.3s ease-out;
}
.dot {
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: white;
  opacity: 0.4;
  transition: all 0.3s ease;
  &.active {
    opacity: 0.7;
    width: 16px;
  }
}
</style>
