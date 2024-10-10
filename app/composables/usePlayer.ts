import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions.js';
// import ZoomPlugin from 'wavesurfer.js/dist/plugins/zoom.esm.js'
// import Minimap from 'wavesurfer.js/dist/plugins/minimap.js'
import {computed} from "@vue/reactivity";

const formatTime= (seconds) => [seconds / 60, seconds % 60].map((v) => `0${Math.floor(v)}`.slice(-2)).join(':')

export const usePlayer = () => {

  const playerSrc = ref(null)
  const waveformRef = ref(null)
  const player = useState('player', () => null)
  const playerIsPlaying = useState('playerIsPlaying', () => false)
  const playerIsReady = useState('playerIsReady', () => false)
  const playerCurrentTime = useState('playerCurrentTime', () => 0)
  const playerTotalDuration = useState('playerTotalDuration', () => 0)
  const playerLoadingValue = useState('playerTotalDuration', () => 0)
  const currentZoom = useState('currentZoom', () => 0)
  const zoomStep = useState('zoomStep', () => 20)
  const maxZoom = useState('maxZoom', () => 300)
  const minZoom = useState('minZoom', () => 0)

  const playerSettings = useState('playerSettings', () => {
  })


  const initPlayer = () => {
    if (player.value) return;
    console.info('✅ usePlayer - initPlayerinitPlayer')

    if (!waveformRef.value) {
      console.error('⛔ usePlayer - initPlayerinitPlayer: waveformRef is not valid');
      return
    }
    if (!playerSrc.value) {
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
    const {regions, updateRegionsList} = useRegions()

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

    player.value.on('audioprocess', () => playerCurrentTime.value = player.value.getCurrentTime());

    // TODO: move to useRegions
    regions.value.on('region-updated', updateRegionsList);
  }

  const destroyPlayer = () => {
    if (!player.value) {
      console.error('⛔ usePlayer - destroyPlayer: no player set');
      return
    }
    player.value.destroy();
  }

  const togglePlayPause = () => {
    if (!player.value) {
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
}

