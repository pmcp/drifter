<template>
  <div class="w-full flex flex-col gap-2">
    <div ref="waveformRef" class="w-full"></div>
    <div v-if="!playerIsReady">
      <UProgress v-if="playerLoadingValue === 0" animation="carousel" />
      <UProgress v-else animation="carousel" :value="playerLoadingValue"/>
    </div>
  </div>
</template>
<script setup>


const formatTime= (seconds) => [seconds / 60, seconds % 60].map((v) => `0${Math.floor(v)}`.slice(-2)).join(':')

import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions.js';


const waveformRef = ref(null);
const {
  player,
  playerIsPlaying,
  playerIsReady,
  playerCurrentTime,
  playerTotalDuration,
  playerLoadingValue
} = usePlayer()

const { regions, updateRegionsList } = useRegions()
const { items } = useItems()
const { addEdge } = useEdges()

const props = defineProps({
  src: String,
  options: Object,
});

// TODO: SHORTCUTS
// Only use shortcuts if not using inputs
const activeElement = useActiveElement()
const notUsingInput = computed(() =>
  activeElement.value?.tagName !== 'INPUT'
  && activeElement.value?.tagName !== 'TEXTAREA',)
const { space, c, s } = useMagicKeys()

onMounted(() => {
  if (waveformRef.value) {
    regions.value = RegionsPlugin.create();
    player.value = WaveSurfer.create({
      container: waveformRef.value,
      ...props.options,
      plugins: [regions.value],
    });

    player.value.load(props.src);
    player.value.on('ready', (duration) => {
      playerTotalDuration.value = formatTime(player.value.getDuration())
      playerIsReady.value = true;
    });

    player.value.on('play', () => {
      playerIsPlaying.value = true;
    });

    player.value.on('pause', () => {
      playerIsPlaying.value = false;
    });

    /** When the user clicks on the waveform */
    player.value.on('seeking', (relativeX) => {
      playerCurrentTime.value = formatTime(player.value.getCurrentTime())
    })

    player.value.on('audioprocess', function() {
        playerCurrentTime.value = formatTime(player.value.getCurrentTime())
    });
    // Add event listener for region updates
    regions.value.on('region-updated', updateRegionsList);
  }

  // TODO: SHORTCUTS
  // Only use space if not using inputs
  whenever(logicAnd(space, notUsingInput), () => {
    togglePlayPause()
    console.log('Tab has been pressed outside of inputs!')
  })

  whenever(logicAnd(c, notUsingInput), () => {
    addRegion('comment')
  })

  whenever(logicAnd(s, notUsingInput), () => {
    addRegion('song')
  })

});

onUnmounted(() => {
  if (player.value) {
    player.value.destroy();
  }
});


</script>

