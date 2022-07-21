import _ from 'lodash'
import { useLocalStorage } from '@vueuse/core'

export function useKeywords() {
  const keywordsList = useLocalStorage('keywords', <string[]>[])

  const clearKeywords = () => {
    keywordsList.value = []
  }

  const removeKeyword = (keyword: string) => {
    if (keywordsList.value.includes(keyword)) {
      _.remove(keywordsList.value, (item) => item === keyword)
    }
  }

  const addKeyword = (keyword: string) => {
    if (keywordsList.value.includes(keyword)) {
      return
    }
    keywordsList.value.unshift(keyword)
  }

  return {
    keywordsList,
    clearKeywords,
    removeKeyword,
    addKeyword
  }
}
