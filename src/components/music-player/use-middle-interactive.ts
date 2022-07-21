import { ref } from 'vue'

export function useMiddleInteractive() {
  const WIDTH = window.innerWidth
  const boundaryPercentage = 0.25

  const translateX = ref(WIDTH)
  const opacity = ref(1)
  const firstActive = ref(true)
  const transitonDuration = ref(0)

  let startPositionX = 0
  let startPositionY = 0
  let movePositionX = 0
  let changedPositionX = 0
  let changedPositionY = 0
  let differencePositonX = 0
  let percentage = 0
  let cacheTranslateX = 0
  let boundaryCase = false
  let directionLocked: 'v' | 'h' | '' = ''
  const handleMiddleTouchStart = (e: TouchEvent) => {
    transitonDuration.value = 0
    startPositionX = e.touches[0].pageX
    startPositionY = e.touches[0].pageY
    cacheTranslateX = translateX.value
    differencePositonX = 0
    boundaryCase = false
    directionLocked = ''
  }
  const handleMiddleTouchMove = (e: TouchEvent) => {
    if (boundaryCase) {
      return
    }
    movePositionX = e.touches[0].pageX
    changedPositionX = movePositionX - startPositionX
    changedPositionY = e.touches[0].pageY - startPositionY
    if (!directionLocked) {
      directionLocked = Math.abs(changedPositionX) > Math.abs(changedPositionY) ? 'h' : 'v'
    }
    if (directionLocked === 'v') {
      return
    }
    if ((translateX.value === WIDTH && changedPositionX > 0) || (translateX.value === 0 && changedPositionX < 0)) {
      boundaryCase = true
      return
    }
    startPositionX = movePositionX
    differencePositonX += changedPositionX
    translateX.value += changedPositionX
    percentage = translateX.value / WIDTH
    opacity.value = percentage
  }
  const handleMiddleTouchEnd = () => {
    if (boundaryCase) {
      return
    }
    transitonDuration.value = 0.3
    if (Math.abs(differencePositonX) / WIDTH < boundaryPercentage) {
      if (cacheTranslateX === WIDTH) {
        translateX.value = WIDTH
        opacity.value = 1
      } else {
        translateX.value = 0
        opacity.value = 0
      }
    } else {
      firstActive.value = !firstActive.value
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
    firstActive,
    transitonDuration
  }
}
