<template>
  <div class="flex flex-row gap-2 items-center justify-between">
    <UButton :ui="{ rounded: 'rounded-full' }" v-if="!playerIsPlaying" @click="player.play()" :disabled="!playerIsReady" class="flex flex-row justify-center" icon="i-heroicons-play" />
    <UButton :ui="{ rounded: 'rounded-full' }" v-else @click="player.playPause()" :disabled="!playerIsReady" class=" flex flex-row justify-center" icon="i-heroicons-pause" />

  </div>
</template>
<script setup>
const PlayerStore = usePlayerStore()
const { player, playerIsReady, playerIsPlaying } = storeToRefs(PlayerStore)
</script>

