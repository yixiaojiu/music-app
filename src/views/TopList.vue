<script setup lang="ts">
import { ref, onUpdated } from 'vue'

const counter = ref(0)

setTimeout(() => {
  counter.value++
}, 1000)

onUpdated(() => {
  console.log(counter.value)
})
</script>

<template>
  <div text-white :data-counter="counter">排行页面</div>
</template>
