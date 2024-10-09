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
  initPlayer,
  playerLoadingValue,
  playerIsReady,
  destroyPlayer
} = usePlayer()

onMounted(() => {
  playerSrc.value = 'testsong.m4a'
  initPlayer()
});

onUnmounted(() => {
  destroyPlayer()
});


</script>

