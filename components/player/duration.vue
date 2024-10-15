<template>
  <span v-if="playerIsReady"> {{ playerCurrentTimeReadable || '00:00' }} / {{ playerTotalDurationReadable || '00:00' }}</span>
</template>
<script setup>
const PlayerStore = usePlayerStore()
const { playerCurrentTimeReadable, playerIsReady, playerTotalDurationReadable } = storeToRefs(PlayerStore)
</script>
