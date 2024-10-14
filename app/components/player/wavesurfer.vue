<template>
  <div class="w-full flex flex-col gap-2 relative h-10">
    <div ref="waveformRef" class="w-full absolute top-0 left-0" :class="{'opacity-0': playerLoadingValue === 0}"></div>
    <div v-if="!playerIsReady">
      <USkeleton class="h-8 m-2 w-full" v-if="playerLoadingValue === 0" />
      <UProgress v-else animation="carousel" :value="playerLoadingValue"/>
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

