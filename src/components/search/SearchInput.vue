<script setup lang="ts">
import { ref, watch } from 'vue'

type Props = {
  value: string
}

const props = defineProps<Props>()

const emits = defineEmits<{
  (e: 'searchClick'): void
  (e: 'update:value', newValue: string): void
}>()

const inputValue = ref(props.value)

watch(inputValue, (newValue) => {
  emits('update:value', newValue)
})

watch(
  () => props.value,
  (newValue) => {
    inputValue.value = newValue
  }
)
</script>

<template>
  <div w-full flex-center bg-gray-700 h-8 rounded-2>
    <button btn-primary @click.stop="emits('searchClick')" text-gray-400>
      <div i-bi-search w-4 h-4></div>
    </button>
    <input text-gray-400 flex-1 bg-transparent type="text" placeholder="搜索歌曲" v-model="inputValue" />
    <button v-if="inputValue.length" @click="inputValue = ''" btn-primary text-gray-400>
      <div w-4 h-4 i-bi-x-circle></div>
    </button>
  </div>
</template>

<style lang="less" scoped></style>
