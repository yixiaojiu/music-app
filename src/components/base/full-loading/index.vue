<script setup lang="ts">
import { useStateStore } from '@/stores/state'
const state = useStateStore()
</script>

<template>
  <div class="absolute w-screen h-screen top-0 left-0 z-30 bg-opacity-60 bg-black" v-show="state.loading">
    <img src="/loading.gif" width="70" alt="loading" class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
  </div>
</template>
