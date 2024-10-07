<template>
  <div class="flex flex-row gap-2 items-center justify-between">
    <UButton @click="player.playPause()" :disabled="!playerIsReady" class="w-20 flex flex-row justify-center">
      <span v-if="playerIsPlaying">Pause</span>
      <span v-else>Play</span>
    </UButton>
  </div>
</template>
<script setup>
const {
  player,
  playerIsPlaying,
  playerIsReady
} = usePlayer()
</script>
