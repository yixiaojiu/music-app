<script setup lang="ts">
import type { MusicItme } from '@/utils/types/music-store'
import type { lyric } from '@/utils/types/lyric'
import { ref, watch } from 'vue'
import { useMusicStore } from '@/stores/music'
import { useLocalStorage } from '@vueuse/core'
import { getLyric } from '@/request/music/index'
import _ from 'lodash'
import LyricParser from 'lyric-parser'

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

const useMusic = useMusicStore()
const audioRef = ref<HTMLAudioElement | null>(null)
const cdContainerRef = ref<HTMLDivElement | null>(null)
const cdImgRef = ref<HTMLImageElement | null>(null)
const lyricBox = ref<HTMLDivElement | null>(null)
const songReady = ref(false)
const favoriteList = useLocalStorage('favoriteList', <MusicItme[]>[])
const currentTime = ref(0)
const duration = ref(0)
const currentLyric = ref<lyric>({} as lyric)
const currentLineNum = ref(0)

watch(
  () => useMusic.currentSong,
  async (newSong) => {
    if (!audioRef.value) {
      return
    }
    useMusic.playing = false
    songReady.value = false
    audioRef.value.src = `https://music.163.com/song/media/outer/url?id=${newSong.id}`
    let lyric = ''
    if (newSong.lyric) {
      lyric = newSong.lyric
    } else {
      const { data: res } = await getLyric({ id: newSong.id })
      newSong.lyric = res.lrc.lyric
      lyric = res.lrc.lyric
    }
    currentLyric.value = new LyricParser(lyric, ({ lineNum }) => {
      if (!lyricBox.value) {
        return
      }
      currentLineNum.value = lineNum
      if (lineNum > 5) {
        const lineEl = lyricBox.value.children[lineNum - 5] as HTMLParagraphElement
        lyricBox.value.scrollTo({
          top: lineEl.offsetTop,
          behavior: 'smooth'
        })
      }
    })
    if (songReady.value) {
      playLyric()
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
    } else {
      audioRef.value.pause()
    }
    asyncTransform()
  }
)

// 歌词逻辑
function playLyric() {
  if (currentLyric.value.lrc) {
    currentLyric.value.seek(currentTime.value * 1000)
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

const changeMode = () => {
  const playMode = useMusic.playMode
  if (playMode === 'sequence') {
    useMusic.changeMode('loop')
  }
  if (playMode === 'loop') {
    useMusic.changeMode('random')
  }
  if (playMode === 'random') {
    useMusic.changeMode('sequence')
  }
}

const isFavorite = (song: MusicItme) => {
  return favoriteList.value.findIndex((item) => item.id === song.id) > -1
}

const toggleFavorite = () => {
  const currentSong = useMusic.currentSong
  if (isFavorite(useMusic.currentSong)) {
    _.remove(favoriteList.value, (item) => item.id === currentSong.id)
  } else {
    favoriteList.value.push(useMusic.currentSong)
  }
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
}
const handleMoveEnd = () => {
  if (!audioRef.value) {
    return
  }
  audioRef.value.currentTime = currentTime.value
  isProgressActive = false
  useMusic.playing = true
}

function asyncTransform() {
  if (!cdContainerRef.value) {
    return
  }
  if (!cdImgRef.value) {
    return
  }
  if (useMusic.playing) {
    cdImgRef.value.classList.add('animate-spin')
  } else {
    const imgTransform = getComputedStyle(cdImgRef.value).transform
    const containerTransform = getComputedStyle(cdContainerRef.value).transform
    cdContainerRef.value.style.transform = containerTransform === 'none' ? imgTransform : imgTransform.concat(' ', containerTransform)
    cdImgRef.value.classList.remove('animate-spin')
  }
}
</script>

<template>
  <div v-show="useMusic.fullScreen" fixed top-0 left-0 w-screen h-screen z-10 overflow-hidden bg-gray-800>
    <div absolute top-0 left-0 w-full h-full opacity-60 z--1 blur-20>
      <img h-full :src="useMusic.currentSong.picUrl" alt="songPic" />
    </div>

    <div mb-4>
      <div relative>
        <button @click="useMusic.fullScreen = false" absolute left-4 top="1/2" class="-translate-y-1/2">
          <div i-fa6-solid-angle-down text-2xl text-yellow-400></div>
        </button>
        <h2 w-screen leading-10 text-xl text-white font-medium h-10 text-center>{{ useMusic.currentSong.songName }}</h2>
      </div>
      <p text-white text-center h-8 leading-8>{{ useMusic.currentSong.artistList }}</p>
    </div>

    <div h-screen-60 custom-container relative overflow-hidden>
      <div opacity-0>
        <div ref="cdContainerRef" w-screen-80 h-w-screen-80 mx-auto rounded-full overflow-hidden border-8 border-gray-300 border-opacity-30>
          <img ref="cdImgRef" max-w-full :src="useMusic.currentSong.picUrl" alt="songPic" class="animate-spin" animate-duration-30000 />
        </div>
        <p></p>
      </div>
      <div ref="lyricBox" absolute top-0 left-0 w-full h-full scroll-box>
        <p v-for="(item, index) in currentLyric.lines" text-gray-400 py-1 text-center :class="{ 'text-white': currentLineNum === index }">{{ item.txt }}</p>
      </div>
    </div>

    <ProgressBar my-10 :current-time="currentTime" :total-time="duration" @time-change="handleTimeChange" @move-end="handleMoveEnd" />

    <div flex justify-between items-center my-4 custom-container>
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
      <button text-yellow-400 @click="toggleFavorite">
        <LoveActiveIcon v-if="isFavorite(useMusic.currentSong)" />
        <LoveIcon v-else />
      </button>
    </div>

    <audio ref="audioRef" autoplay @pause="useMusic.playing = false" @canplay="readyed" @error="musicError" @timeupdate="updateTime" @ended="musicEnd"></audio>
  </div>
</template>

<style>
div {
  box-sizing: content-box;
}
</style>
