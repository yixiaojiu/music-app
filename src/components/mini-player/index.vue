<script setup lang="ts">
import { useMusicStore } from '@/stores/music'
import { useCd } from '@/components/music-player/use-cd'

import ProgressCircle from '@/components/progress-circle/index.vue'
import PlayListIcon from '@/assets/icons/play-list-icon.vue'
import PlayList from '@/components/play-list/index.vue'

type Props = {
  progress: number
}
defineProps<Props>()

const { cdContainerRef, cdImgRef } = useCd()
const useMusic = useMusicStore()

const showNormalPlayer = () => {
  useMusic.fullScreen = true
}
</script>

<template>
  <transition enter-active-class="animate__animated animate__fadeInUp" leave-active-class="animate__animated animate__fadeOutDown">
    <div v-show="!useMusic.fullScreen" @click="showNormalPlayer" fixed flex items-center bottom-0 px-6 z-10 left-0 w-screen h-15 bg-gray-800 gap-4>
      <div h="4/5">
        <div ref="cdContainerRef" h-full rounded-full overflow-hidden>
          <img ref="cdImgRef" max-h-full :src="useMusic.currentSong.picUrl" alt="songPic" class="animate-spin" animate-duration-30000 />
        </div>
      </div>

      <div flex-1 h="4/5">
        <h3 text-gray-300 text-base>{{ useMusic.currentSong.songName }}</h3>
        <p text-gray-500 text-sm text-ell w-full>{{ useMusic.currentSong.artistList }}</p>
      </div>

      <div flex>
        <ProgressCircle :radius="32" :progress="progress" @click.stop="useMusic.playing = !useMusic.playing">
          <div i-fa6-solid-pause v-if="useMusic.playing" absolute w-3 h-3 text-yellow-400 class="top-1/2 left-1/2 -translate-1/2"></div>
          <div i-fa6-solid-play v-else absolute w-3 h-3 text-yellow-400 class="top-1/2 left-1/2 -translate-1/2"></div>
        </ProgressCircle>
        <PlayListIcon @click.stop="useMusic.playListVisalbe = true" ml-4 text-yellow-400 />
      </div>
      <PlayList />
    </div>
  </transition>
</template>
