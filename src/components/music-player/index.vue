<script setup lang="ts">
import type { lyric } from '@/utils/types/lyric'
import { ref, watch, computed } from 'vue'
import { useMusicStore } from '@/stores/music'
import { getLyric } from '@/request/music/index'
import LyricParser from 'lyric-parser'
import { useMiddleInteractive } from './use-middle-interactive'
import { useCd } from './use-cd'
import { useMode } from './use-mode'
import { useFavorite } from './use-favorite'

import RepeatIcon from '@/assets/icons/repeat-icon.vue'
import RepeatOneIcon from '@/assets/icons/repeat-one-icon.vue'
import RandomIcon from '@/assets/icons/random-play-icon.vue'
import PrevPlayIcon from '@/assets/icons/prev-play-icon.vue'
import PlayingIcon from '@/assets/icons/playing-icon.vue'
import PauseIcon from '@/assets/icons/pause-icon.vue'
import NextPlayIcon from '@/assets/icons/next-play-icon.vue'
import LoveIcon from '@/assets/icons/love-icon.vue'
import LoveActiveIcon from '@/assets/icons/love-active-icon.vue'
import ProgressBar from '@/components/progress-bar/index.vue'
import MiniPlayer from '@/components/mini-player/index.vue'

const audioRef = ref<HTMLAudioElement | null>(null)
const lyricBox = ref<HTMLDivElement | null>(null)
const songReady = ref(false)
const currentTime = ref(0)
const duration = ref(0)

const currentLyric = ref<lyric>({} as lyric)
const currentLineNum = ref(0)
const pureMusicLyric = ref('')
const playingLyric = ref('')

const useMusic = useMusicStore()
const { handleMiddleTouchStart, handleMiddleTouchMove, handleMiddleTouchEnd, translateX, opacity, firstActive, transitonDuration } = useMiddleInteractive()
const { cdContainerRef, cdImgRef } = useCd()
const { changeMode } = useMode()
const { isFavorite, toggleFavorite } = useFavorite()

watch(
  () => useMusic.currentSong,
  async (newSong) => {
    if (!audioRef.value) {
      return
    }
    useMusic.playing = false
    songReady.value = false
    audioRef.value.src = `https://music.163.com/song/media/outer/url?id=${newSong.id}`
    // 歌词逻辑
    stopLyric()
    currentLyric.value = {} as lyric
    currentLineNum.value = 0
    pureMusicLyric.value = ''
    playingLyric.value = ''
    let lyric = ''
    if (newSong.lyric) {
      lyric = newSong.lyric
    } else {
      const { data: res } = await getLyric({ id: newSong.id })
      newSong.lyric = res.lrc.lyric
      lyric = res.lrc.lyric
    }
    currentLyric.value = new LyricParser(lyric, ({ lineNum, txt }) => {
      if (!lyricBox.value) {
        return
      }
      currentLineNum.value = lineNum
      playingLyric.value = txt
      if (lineNum > 5) {
        const lineEl = lyricBox.value.children[lineNum - 5] as HTMLParagraphElement
        lyricBox.value.scrollTo({
          top: lineEl.offsetTop,
          behavior: 'smooth'
        })
      }
    })

    if (lyric.length > 100) {
      if (songReady.value) {
        playLyric()
      }
    } else {
      playingLyric.value = pureMusicLyric.value = '纯音乐，请欣赏'
    }
  }
)
watch(
  () => useMusic.playing,
  (newPlaying) => {
    if (!audioRef.value) {
      return
    }
    if (!songReady.value) {
      return
    }
    if (newPlaying) {
      audioRef.value.play()
      playLyric()
    } else {
      audioRef.value.pause()
      stopLyric()
    }
  }
)

const progress = computed(() => currentTime.value / duration.value)

// 歌词逻辑
function playLyric() {
  if (currentLyric.value.lrc) {
    currentLyric.value.seek(currentTime.value * 1000)
  }
}

function stopLyric() {
  if (currentLyric.value.lrc) {
    currentLyric.value.stop()
  }
}

const playPrev = () => {
  currentTime.value = 0
  useMusic.prev() && loop()
}
const playNext = () => {
  currentTime.value = 0
  useMusic.next() && loop()
}
// 当只有一首歌时，循环逻辑
const loop = () => {
  if (!audioRef.value) {
    return
  }
  currentTime.value = 0
  audioRef.value.currentTime = 0
  useMusic.playing = true
}

// 当歌曲可播放逻辑
const readyed = () => {
  if (songReady.value) {
    return
  }
  if (!audioRef.value) {
    return
  }
  duration.value = audioRef.value.duration
  songReady.value = true
  useMusic.playing = true
  playLyric()
}

const musicError = () => {
  songReady.value = true
}

let isProgressActive = false
const updateTime = (e: Event) => {
  if (isProgressActive) {
    return
  }
  currentTime.value = (e.target as HTMLAudioElement).currentTime
}
const musicEnd = () => {
  if (useMusic.playMode === 'loop') {
    loop()
  } else {
    playNext()
  }
}

// 进度条事件
const handleTimeChange = (newTime: number) => {
  isProgressActive = true
  currentTime.value = newTime
  // 将歌词同步到拖动位置
  playLyric()
  // 当仍在拖动时，不让歌词播放
  stopLyric()
}
const handleMoveEnd = () => {
  if (!audioRef.value) {
    return
  }
  audioRef.value.currentTime = currentTime.value
  isProgressActive = false
  useMusic.playing = true
  // 拖动完成，同步歌词
  playLyric()
}
</script>

<template>
  <div v-show="useMusic.playList.length">
    <transition name="normal">
      <div v-show="useMusic.fullScreen" fixed top-0 left-0 w-screen h-screen z-10 overflow-hidden bg-gray-800>
        <div absolute top-0 left-0 w-full h-full opacity-40 z--1 blur-20>
          <img h-full :src="useMusic.currentSong.picUrl" alt="songPic" />
        </div>

        <div mb-4 class="player-top">
          <div relative>
            <button @click="useMusic.fullScreen = false" absolute left-4 top="1/2" class="-translate-y-1/2">
              <div i-fa6-solid-angle-down text-2xl text-yellow-400></div>
            </button>
            <h2 w-screen leading-10 text-xl text-white font-medium h-10 text-center>{{ useMusic.currentSong.songName }}</h2>
          </div>
          <p text-white text-center h-8 leading-8>{{ useMusic.currentSong.artistList }}</p>
        </div>

        <div h-screen-60 mb-6 w-screen @touchstart="handleMiddleTouchStart" @touchmove="handleMiddleTouchMove" @touchend="handleMiddleTouchEnd">
          <div h-full custom-container relative>
            <div w-full h-full :style="{ opacity: opacity }">
              <div ref="cdContainerRef" w-screen-80 h-w-screen-80 mx-auto rounded-full overflow-hidden border-8 border-gray-300 border-opacity-30>
                <img ref="cdImgRef" max-w-full :src="useMusic.currentSong.picUrl" alt="songPic" class="animate-spin" animate-duration-30000 />
              </div>
              <p text-center text-gray-400 mt-4>{{ playingLyric }}</p>
            </div>
            <div transition-transform absolute top-0 left-0 w-full h-full overflow-hidden :style="{ transform: `translateX(${translateX}px)`, transitionDuration: `${transitonDuration}s` }">
              <div v-if="pureMusicLyric" w-full h-full flex items-center justify-center>
                <p text-gray-400>{{ pureMusicLyric }}</p>
              </div>
              <div v-else ref="lyricBox" w-full h-full scroll-box>
                <p v-for="(item, index) in currentLyric.lines" text-gray-400 py-1 text-center :class="{ 'text-white': currentLineNum === index }">{{ item.txt }}</p>
              </div>
            </div>
          </div>
        </div>
        <div flex w-10 h-4 items-center justify-center custom-container mx-auto gap-2>
          <div w-2 h-2 bg-gray-400 rounded-full transition-all :class="{ 'w-4': firstActive, 'dot-active': firstActive }"></div>
          <div w-2 h-2 bg-gray-400 rounded-full transition-all :class="{ 'w-4': !firstActive, 'dot-active': !firstActive }"></div>
        </div>
        <ProgressBar class="player-bottom" mt-6 mb-4 :current-time="currentTime" :total-time="duration" @time-change="handleTimeChange" @move-end="handleMoveEnd" />

        <div class="player-bottom" flex justify-between items-center my-4 custom-container>
          <button text-yellow-400 @click="changeMode">
            <RepeatIcon v-if="useMusic.playMode === 'sequence'" />
            <RepeatOneIcon v-else-if="useMusic.playMode === 'loop'" />
            <RandomIcon v-else />
          </button>
          <button @click="playPrev" text-yellow-400>
            <PrevPlayIcon />
          </button>
          <button relative text-yellow-400 @click="useMusic.playing = !useMusic.playing" h-10 w-10>
            <transition enter-active-class="animate__animated animate__fadeIn" leave-active-class="animate__animated animate__fadeOut">
              <PlayingIcon v-if="useMusic.playing" absolute h-10 w-10 top-0 left-0 />
              <PauseIcon v-else absolute h-10 w-10 top-0 left-0 />
            </transition>
          </button>
          <button @click="playNext" text-yellow-400>
            <NextPlayIcon />
          </button>
          <button text-yellow-400 @click="toggleFavorite(useMusic.currentSong)">
            <LoveActiveIcon v-if="isFavorite(useMusic.currentSong)" />
            <LoveIcon v-else />
          </button>
        </div>
      </div>
    </transition>
    <MiniPlayer :progress="progress" />
    <audio ref="audioRef" autoplay @pause="useMusic.playing = false" @canplay="readyed" @error="musicError" @timeupdate="updateTime" @ended="musicEnd"></audio>
  </div>
</template>

<style lang="less" scoped>
.normal-enter-active,
.normal-leave-active {
  transition: all 0.6s;
  .player-top,
  .player-bottom {
    transition: all 0.6s ease;
  }
}
.normal-enter-from,
.normal-leave-to {
  opacity: 0;
  .player-top {
    transform: translateY(-100px);
  }
  .player-bottom {
    transform: translateY(100px);
  }
}
</style>
