<script setup lang="ts">
import { TimeToMinute } from '@/utils/methods'
import { watch, onMounted, ref } from 'vue'

type Props = {
  currentTime: number
  totalTime: number
}
const props = defineProps<Props>()
const controlerRef = ref<HTMLDivElement | null>(null)
const currentWidth = ref<number>(0)

const emits = defineEmits<{
  (e: 'time-change', newTime: number): void
  (e: 'move-end'): void
}>()

const calcWidth = () => {
  if (!controlerRef.value) {
    return
  }
  currentWidth.value = (props.currentTime / props.totalTime) * controlerRef.value.clientWidth
}

watch(
  () => props.currentTime,
  (newTime) => {
    calcWidth()
  }
)

// 控制按钮滑动逻辑
let startPositionX = 0
let movingPositonX = 0
let changedPositonX = 0
let changedWidth = 0
let progressRect: DOMRect = {} as DOMRect
let progressWidth = 1
const handleTouchStart = (e: TouchEvent) => {
  if (!controlerRef.value) {
    return
  }
  startPositionX = e.touches[0].pageX
  progressRect = controlerRef.value.getBoundingClientRect()
}

const handleTouchMove = (e: TouchEvent) => {
  if (!controlerRef.value) {
    return
  }
  progressWidth = controlerRef.value.clientWidth
  movingPositonX = e.touches[0].pageX

  if (movingPositonX < progressRect.left - 3 || movingPositonX > progressRect.right + 3) {
    return
  }

  changedPositonX = movingPositonX - startPositionX
  startPositionX = movingPositonX
  changedWidth = currentWidth.value + changedPositonX
  if (changedWidth < 0) {
    changedWidth = 0
  }
  if (changedWidth > progressWidth) {
    changedWidth = progressWidth
  }
  currentWidth.value = changedWidth
  emits('time-change', (changedWidth / progressWidth) * props.totalTime)
}

const handleTouchEnd = (e: TouchEvent) => {
  emits('move-end')
}

const handleControlerClick = (e: MouseEvent) => {
  if (!controlerRef.value) {
    return
  }
  emits('time-change', ((e.pageX - controlerRef.value.getBoundingClientRect().left) / controlerRef.value.clientWidth) * props.totalTime)
  emits('move-end')
}

onMounted(() => {
  calcWidth()
})
</script>

<template>
  <div flex font-normal text-sm w="4/5" items-center mx-auto>
    <span text-gray-300>{{ TimeToMinute(currentTime) }}</span>
    <div relative bg-gray-900 flex-auto rounded-1 h-1 mx-3 ref="controlerRef" @click="handleControlerClick">
      <div bg-yellow-400 h-full rounded-1 :style="{ width: currentWidth + 'px' }"></div>
      <div absolute w-3 h-3 rounded-full bg-yellow-400 class="-translate-x-1/2 -translate-y-1/2 top-1/2" :style="{ left: currentWidth + 'px' }" @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd"></div>
    </div>
    <span text-gray-200>{{ TimeToMinute(totalTime) }}</span>
  </div>
</template>
