import { defineStore } from 'pinia'

import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions.js';
// import ZoomPlugin from 'wavesurfer.js/dist/plugins/zoom.esm.js'
// import Minimap from 'wavesurfer.js/dist/plugins/minimap.js'
import {computed} from "@vue/reactivity";

const formatTime= (seconds) => [seconds / 60, seconds % 60].map((v) => `0${Math.floor(v)}`.slice(-2)).join(':')


export const usePlayerStore = defineStore("player", () => {

  const playerSrc = ref(null)
  const waveformRef = ref(null)
  const player = ref(null)
  const playerIsPlaying = ref(false)
  const playerIsReady = ref(false)
  const playerCurrentTime = ref(0)
  const playerTotalDuration = ref(0)
  const playerLoadingValue = ref(0)
  const currentZoom = ref(0)
  const zoomStep = ref(20)
  const maxZoom = ref(300)
  const minZoom = ref(0)
  const playerSettings = ref(null)

  const initPlayer = () => {
    if (player.value) return;
    console.info('✅ usePlayer - initPlayerinitPlayer')

    if (!waveformRef) {
      console.error('⛔ usePlayer - initPlayerinitPlayer: waveformRef is not valid');
      return
    }
    if (!playerSrc) {
      console.error('⛔ usePlayer - initPlayerinitPlayer: playerSrc is not set');
      return
    }

    // Set the options
    playerSettings.value = {
      height: 48,
      waveColor: 'gray',
      progressColor: 'red',
      barGap: 0.3,
      barWidth: 1,
      barRadius: 2,
      minPxPerSec: 100,
      fillParent: true,
      autoScroll: true,
      autoCenter: true,
      hideScrollbar: true,
    }

    // create regionsPlugin
    const {regions, updateRegionsList} = useRegionsStore()

    regions.value = RegionsPlugin.create();

    player.value = WaveSurfer.create({
      container: waveformRef.value,
      url: playerSrc.value,
      plugins: [
        regions.value,
        // ZoomPlugin.create({
        //   // the amount of zoom per wheel step, e.g. 0.5 means a 50% magnification per scroll
        //   scale: 0.5,
        //   // Optionally, specify the maximum pixels-per-second factor while zooming
        //   maxZoom: 100,
        // }),
        // Minimap.create({
        //   // the Minimap can take all the same options as the WaveSurfer itself
        //   height: 20,
        //   waveColor: '#ddd',
        //   progressColor: '#999',
        //   dragToSeek: true,
        // })
      ],
      ...playerSettings.value,
    });

    // Set watchers
    player.value.on('ready', () => {
      console.info('✅ usePlayer - initPlayerinitPlayer: Watcher -- player ready')
      playerTotalDuration.value = player.value.getDuration()
      playerIsReady.value = true;
    });

    player.value.on('play', () => {
      console.info('✅ usePlayer - initPlayerinitPlayer: Watcher "play"')
      playerIsPlaying.value = true;
    });

    player.value.on('pause', () => {
      console.info('✅ usePlayer - initPlayerinitPlayer: Watcher "pause"')
      ;playerIsPlaying.value = false;
    });

    /** When the user clicks on the waveform */
    player.value.on('seeking', () => playerCurrentTime.value = player.value.getCurrentTime())

    player.value.on('audioprocess', (event) => {
      playerCurrentTime.value = player.value.getCurrentTime()
    });

    player.value.on('loading', (percent) => playerLoadingValue.value = percent)


    // TODO: move to useRegions
    regions.value.on('region-updated', updateRegionsList);
  }

  const destroyPlayer = () => {
    if (!player || !player.value) {
      console.error('⛔ usePlayer - destroyPlayer: no player set');
      return
    }

    player.value.destroy();
  }

  const togglePlayPause = () => {
    if (!player) {
      console.error('⛔ usePlayer - togglePlayPause: no player set');
      return
    }
    if (playerIsPlaying.value) player.value.pause()
    else player.value.play()
  }

  const setZoom = (zoomDirection) => {
    console.log(`✅ zoomDirection - direction: ${zoomDirection} and currentZoom: ${currentZoom.value}`)
    if (!playerIsReady) {
      console.error('⛔ usePlayer - setZoom: no player set');
      return
    }
    if (zoomDirection === '+') {
      currentZoom.value = currentZoom.value + zoomStep.value
    }
    if (zoomDirection === '-') {
      if(currentZoom.value <=0) return;
      currentZoom.value = currentZoom.value - zoomStep.value
    }
    player.value.zoom(currentZoom.value)
  }


  const playerCurrentTimeReadable = computed(() =>  formatTime(playerCurrentTime.value))
  const playerTotalDurationReadable = computed(() =>  formatTime(playerTotalDuration.value))

  return {
    waveformRef,
    playerSrc,
    initPlayer,
    player,
    togglePlayPause,
    setZoom,
    currentZoom,
    maxZoom,
    minZoom,
    playerSettings,
    playerIsPlaying,
    playerIsReady,
    playerCurrentTime,
    playerCurrentTimeReadable,
    playerTotalDuration,
    playerTotalDurationReadable,
    playerLoadingValue,
    destroyPlayer
  }

})
