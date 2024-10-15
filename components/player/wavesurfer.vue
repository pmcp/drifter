<template>
  <div class="relative">
    <div ref="waveformRef" :class="{'opacity-0': playerLoadingValue === 0}"></div>
    <div v-if="!playerIsReady" class="px-2 absolute w-full h-full top-0 left-0 flex justify-center items-center" >

      <UProgress v-if="playerLoadingValue === 0" animation="carousel" :value="playerLoadingValue"/>
      <UProgress v-else animation="carousel"/>
    </div>
  </div>
</template>
<script setup>

const playerStore = usePlayerStore()
const {
  waveformRef,
  playerSrc,
  player,
  playerLoadingValue,
  playerIsReady
} = storeToRefs(playerStore)
const { destroyPlayer, togglePlayPause } = playerStore

const { mountPlayer } = useActionsStore()

const keysStore = useKeysStore()
const { setShortcutKeys } = keysStore

onMounted(() => {
  playerSrc.value = 'testsong.m4a'
  mountPlayer()
  setShortcutKeys()

});

onUnmounted(() => {
  destroyPlayer()
});


</script>
