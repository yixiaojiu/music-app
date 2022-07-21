<script setup lang="ts">
import { useMusicStore } from '@/stores/music'
import { useMode } from '@/components/music-player/use-mode'
import { useFavorite } from '@/components/music-player/use-favorite'
import { ref } from 'vue'

import loveIcon from '@/assets/icons/love-icon.vue'
import loveActiveIcon from '@/assets/icons/love-active-icon.vue'
import LoveIcon from '../../assets/icons/love-icon.vue'
import LoveActiveIcon from '../../assets/icons/love-active-icon.vue'
import RepeatIcon from '@/assets/icons/repeat-icon.vue'
import RepeatOneIcon from '@/assets/icons/repeat-one-icon.vue'
import RandomIcon from '@/assets/icons/random-play-icon.vue'
import Confirm from '@/components/base/confirm/index.vue'

const useMusic = useMusicStore()
const { modeText, changeMode } = useMode()
const { isFavorite, toggleFavorite } = useFavorite()

const visible = ref(false)

const getConfirmResult = (result: boolean) => {
  if (result) {
    useMusic.clearSongList()
    visible.value = false
  }
}
</script>

<template>
  <teleport to="body">
    <transition name="playlist">
      <div v-show="useMusic.playListVisalbe" @click.stop="useMusic.playListVisalbe = false" z-20 fixed bottom-0 left-0 h-screen w-screen bg-black bg-opacity-30>
        <div class="wrapper" @click.stop="" absolute w-screen h-screen-65 flex flex-col bottom-0 left-0 bg-gray-900>
          <header h-12 flex items-center gap-2 pl-4 pr-8>
            <div w-6 h-6 @click.stop="changeMode" text-yellow-400>
              <RepeatIcon w-6 h-6 v-if="useMusic.playMode === 'sequence'" />
              <RandomIcon w-6 h-6 v-else-if="useMusic.playMode === 'random'" />
              <RepeatOneIcon w-6 h-6 v-else />
            </div>
            <span flex-1 text-gray-400>
              {{ modeText }}
            </span>
            <button btn-primary @click.stop="visible = true">
              <div i-fa6-solid-trash-can w-4 h-4 text-gray-500></div>
            </button>
          </header>

          <ul scroll-box flex-1>
            <transition-group leave-active-class="animate__animated animate__bounceOutLeft">
              <li v-for="song in useMusic.playList" :key="song.id" flex relative items-center px-8 h-10>
                <div absolute text-yellow-400 opacity-40 i-fa6-solid-circle-play w-3 h-3 left-3 top="1/2" class="-translate-y-1/2" v-if="song.id === useMusic.currentSong.id"></div>
                <span text-gray-400 text-ell flex-1>{{ song.songName }}</span>
                <div flex>
                  <button @click.stop="toggleFavorite(song)" btn-primary text-yellow-400>
                    <LoveActiveIcon v-if="isFavorite(song)" w-4 h-4 />
                    <LoveIcon v-else w-4 h-4 />
                  </button>
                  <button @click.stop="useMusic.removeSong(song)" btn-primary text-yellow-400>
                    <div i-fa6-solid-xmark w-4 h-4></div>
                  </button>
                </div>
              </li>
            </transition-group>
          </ul>
          <div flex items-center justify-center h-12></div>
          <button @click.stop="useMusic.playListVisalbe = false" h-12 w-full text-base flex items-center justify-center text-gray-400 bg-black>关闭</button>
        </div>
        <Confirm @result="getConfirmResult" text="是否清空播放列表？" confirm-text="清空" cancel-text="取消" v-model:visible="visible" />
      </div>
    </transition>
  </teleport>
</template>

<style lang="less" scoped>
.playlist-enter-from,
.playlist-leave-to {
  transform: translateY(0);
  .wrapper {
    transform: translateY(65vh);
  }
}
.playlist-enter-active,
.playlist-leave-active {
  transition: transform 0.3s ease;
  .wrapper {
    transition: transform 0.3s ease;
  }
}
</style>
