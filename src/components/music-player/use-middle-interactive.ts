import { ref } from 'vue'

export function useMiddleInteractive() {
  const WIDTH = window.innerWidth
  const boundaryPercentage = 0.25

  const translateX = ref(WIDTH)
  const opacity = ref(1)
  const firstActive = ref(true)

  let startPositonX = 0
  let movePositionX = 0
  let changedPositionX = 0
  let differencePositonX = 0
  let percentage = 0
  let cacheTranslateX = 0
  let boundaryCase = false
  const handleMiddleTouchStart = (e: TouchEvent) => {
    startPositonX = e.touches[0].pageX
    cacheTranslateX = translateX.value
    differencePositonX = 0
    boundaryCase = false
  }
  const handleMiddleTouchMove = (e: TouchEvent) => {
    if (boundaryCase) {
      return
    }
    movePositionX = e.touches[0].pageX
    changedPositionX = movePositionX - startPositonX
    if ((translateX.value === WIDTH && changedPositionX > 0) || (translateX.value === 0 && changedPositionX < 0)) {
      boundaryCase = true
      return
    }
    startPositonX = movePositionX
    differencePositonX += changedPositionX
    translateX.value += changedPositionX
    percentage = translateX.value / WIDTH
    opacity.value = percentage
  }
  const handleMiddleTouchEnd = () => {
    if (boundaryCase) {
      return
    }
    if (Math.abs(differencePositonX) / WIDTH < boundaryPercentage) {
      console.log('aaa')
      if (cacheTranslateX === WIDTH) {
        translateX.value = WIDTH
        opacity.value = 1
      } else {
        translateX.value = 0
        opacity.value = 0
      }
    } else {
      console.log('bbb')
      if (cacheTranslateX === WIDTH) {
        translateX.value = 0
        opacity.value = 0
      } else {
        translateX.value = WIDTH
        opacity.value = 1
      }
    }
  }

  return {
    handleMiddleTouchStart,
    handleMiddleTouchMove,
    handleMiddleTouchEnd,
    translateX,
    opacity,
    firstActive
  }
}
