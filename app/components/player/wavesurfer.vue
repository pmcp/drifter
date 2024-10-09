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

const {
  waveformRef,
  playerSrc,
  player,
  initPlayer,
  playerLoadingValue,
  playerIsReady,
  destroyPlayer,
  togglePlayPause
} = usePlayer()

const { setShortcutKeys } = useKeys()

onMounted(() => {
  playerSrc.value = 'testsong.m4a'
  initPlayer()
  setShortcutKeys()
});

onUnmounted(() => {
  destroyPlayer()
});


</script>

