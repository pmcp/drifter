import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions.js';
import ZoomPlugin from 'wavesurfer.js/dist/plugins/zoom.esm.js'
import Minimap from 'wavesurfer.js/dist/plugins/minimap.js'

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

  const playerSettings = useState('playerSettings', () => {})



  const initPlayer = () => {
    console.info('✅ usePlayer - initPlayerinitPlayer')
    // Create a new WaveSurfer instance

    if (!waveformRef.value) { console.error('⛔ usePlayer - initPlayerinitPlayer: waveformRef is not valid'); return }
    if (!playerSrc.value) { console.error('⛔ usePlayer - initPlayerinitPlayer: playerSrc is not set'); return };

    // Set the options
    playerSettings.value = {
      height: 48,
      waveColor: 'gray',
      progressColor: 'red',
      barGap: 0.3,
      barWidth: 3,
      barRadius: 2,
      minPxPerSec: 10,
      autoScroll: true,
      autoCenter: true,
    }

    // create regionsPlugin
    const { regions, updateRegionsList } = useRegions()

    regions.value = RegionsPlugin.create();

    player.value = WaveSurfer.create({
      container: waveformRef.value,
      url: playerSrc.value,
      ...playerSettings.value,
      plugins: [
        regions.value,
        ZoomPlugin.create({
          // the amount of zoom per wheel step, e.g. 0.5 means a 50% magnification per scroll
          scale: 0.5,
          // Optionally, specify the maximum pixels-per-second factor while zooming
          maxZoom: 100,
        }),
        // Minimap.create({
        //   // the Minimap can take all the same options as the WaveSurfer itself
        //   height: 20,
        //   waveColor: '#ddd',
        //   progressColor: '#999',
        //   dragToSeek: true,
        // })
      ],
    });

    // Set watchers
    player.value.on('ready', (duration) => {
      console.info('✅ usePlayer - initPlayerinitPlayer: Watcher -- player ready')
      playerTotalDuration.value = player.value.getDuration()
      playerIsReady.value = true;
    });

    // TODO: add computed for playerTotalDuration and playerCurrentTime

    player.value.on('play', () => {
      console.info('✅ usePlayer - initPlayerinitPlayer: Watcher "play"')
      playerIsPlaying.value = true;
    });

    player.value.on('pause', () => {
      console.info('✅ usePlayer - initPlayerinitPlayer: Watcher "pause"')
      playerIsPlaying.value = false;
    });

    /** When the user clicks on the waveform */
    player.value.on('seeking', (relativeX) => {
      // console.info('✅ usePlayer - initPlayerinitPlayer: Watcher "seeking"')
      playerCurrentTime.value = player.value.getCurrentTime()
    })

    player.value.on('audioprocess', function() {
      // TODO: SHOULD FIX format time only where needed, not here
      playerCurrentTime.value = player.value.getCurrentTime()
    });

    // TODO: move to useRegions
    regions.value.on('region-updated', updateRegionsList);
  }


  const destroyPlayer = () => {
    if (!player.value) { console.error('⛔ usePlayer - destroyPlayer: no player set'); return }
    player.value.destroy();
  }

  return {
    waveformRef,
    playerSrc,
    initPlayer,
    player,
    playerSettings,
    playerIsPlaying,
    playerIsReady,
    playerCurrentTime,
    playerTotalDuration,
    playerLoadingValue,
    destroyPlayer
  }
}

