<script setup lang="ts">
import { computed } from 'vue'

type Props = {
  radius: number
  progress: number
}

const props = defineProps<Props>()

const dashArray = Math.PI * 100
const dashOffset = computed(() => (1 - props.progress) * dashArray)
</script>

<template>
  <div relative :style="{ height: `${radius}px` }">
    <svg :width="radius" :height="radius" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <circle class="progress-background" r="50" cx="50" cy="50" fill="transparent"></circle>
      <circle class="progress-bar" r="50" cx="50" cy="50" fill="transparent" :stroke-dasharray="dashArray" :stroke-dashoffset="dashOffset"></circle>
    </svg>
    <slot></slot>
  </div>
</template>

<style scoped>
.progress-background {
  transform: scale(0.9);
  stroke: rgba(255, 205, 49, 0.5);
}
circle {
  stroke-width: 8px;
  transform-origin: center;
}
.progress-bar {
  transform: scale(0.9) rotate(-90deg);
  stroke: #ffcd32;
}
</style>
