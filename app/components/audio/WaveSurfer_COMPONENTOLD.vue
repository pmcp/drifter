<script setup lang="ts">
// import type WaveSurfer from 'wavesurfer.js'
import { WaveSurferPlayer } from '@meersagor/wavesurfer-vue'

import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions.esm.js'
// Initialize the Regions plugin
const regions = RegionsPlugin.create()

const props = defineProps({
  src:{
    type:String,
    required:true
  },
  // options:{
  //   type:Object,
  // }
})

const options = ref({
  height: 48,
  waveColor: 'gray',
  progressColor: 'red',
  barGap: 1,
  barWidth: 5,
  barRadius: 8,
  duration: 80,
  url: props.src,
})

const currentTime = ref<string>('00:00')
const totalDuration = ref<string>('00:00')
const waveSurfer = ref<WaveSurfer | null>(null)

const formatTime = (seconds: number): string => [seconds / 60, seconds % 60].map((v) => `0${Math.floor(v)}`.slice(-2)).join(':')

const isPlaying = ref<boolean>(false)

const timeUpdateHandler = (time: number) => {
  currentTime.value = formatTime(time)
  isPlaying.value = waveSurfer.value?.isPlaying()
}
const readyHandler = (duration: any) => {
  totalDuration.value = formatTime(duration)
}
const readyWaveSurferHandler = (ws: WaveSurfer) => {
  waveSurfer.value = ws
}

const isPlayingHandler = (isPlaying: boolean) => {
  console.log('isPlaying', isPlaying)
}
</script>

<template>
  <main class="flex flex-col gap-2">

    <WaveSurferPlayer
      :options="options"
      @isPlaying="(isPlaying: boolean) => isPlayingHandler(isPlaying)"
      @timeupdate="(time: number) => timeUpdateHandler(time)"
      @ready="(duration: number) => readyHandler(duration)"
      @waveSurfer="(ws: WaveSurfer_COMPONENTOLD) => readyWaveSurferHandler(ws)" />
    <div class="flex flex-row gap-2 items-center">
      <UButton @click="waveSurfer?.playPause()" >
        <span v-if="isPlaying">Pause</span>
        <span v-else>Play</span>
      </UButton>
      <p> {{ currentTime }} / {{ totalDuration }}</p>
    </div>


  </main>
</template>
