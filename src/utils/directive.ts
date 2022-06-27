import type { App } from 'vue'
import { createApp } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import { addClass, removeClass } from '@/utils/dom'

import Loading from '@/components/base/loading/index.vue'

export function setDirective(app: App) {
  app.directive('img-lazy', {
    mounted(el: HTMLImageElement, binding) {
      const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
        if (isIntersecting) {
          el.src = binding.value
        }
      })
    }
  })

  app.directive('loading', {
    mounted(el, binding) {
      const app = createApp(Loading)
      const instance = app.mount(document.createElement('div'))
      // 将instance存到el上，方便其他地方使用
      el.instance = instance
      if (binding.value) {
        append(el)
      }
    },
    updated(el, binding) {
      if (binding.value !== binding.oldValue) {
        binding.value ? append(el) : remove(el)
      }
    }
  })
}

function append(el: any) {
  const style = getComputedStyle(el)
  if (['absolute', 'fixed', 'relative'].indexOf(style.position) === -1) {
    addClass(el, 'relative')
  }
  el.appendChild(el.instance.$el)
}
function remove(el: any) {
  removeClass(el, 'relative')
  el.removeChild(el.instance.$el)
}
