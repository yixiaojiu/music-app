<script setup lang="ts">
type Props = {
  visible: boolean
  text: string
  confirmText: string
  cancelText: string
}
defineProps<Props>()
const emits = defineEmits<{
  (e: 'result', result: boolean): void
  (e: 'update:visible', value: boolean): void
}>()

const handleConfirmClick = () => {
  emits('result', true)
  emits('update:visible', false)
}

const handleCancelClick = () => {
  emits('result', false)
  emits('update:visible', false)
}
</script>

<template>
  <teleport to="body">
    <transition name="fade">
      <div v-if="visible" fixed-full z-30 flex-center bg-black bg-opacity-30>
        <div class="box" rounded-4 bg-gray-800>
          <p py-3 px-10 text-center text-gray-400 text-lg border-b border-black>{{ text }}</p>
          <div flex>
            <button @click="handleConfirmClick" text-gray-200 w="1/2" h-10 flex-center>
              {{ confirmText }}
            </button>
            <button @click="handleCancelClick" text-gray-400 w="1/2" h-10 flex-center>
              {{ cancelText }}
            </button>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<style lang="less" scoped>
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  .box {
    transform: scale(0);
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
  .box {
    transition: transform 0.3s ease;
  }
}
</style>
