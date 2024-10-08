<template>
  <span v-if="playerIsReady"> {{ playerCurrentTime || '00:00' }} / {{ playerTotalDuration || '00:00' }}</span>
</template>
<script setup>
const {
  playerIsReady,
  playerCurrentTime,
  playerTotalDuration
} = usePlayer()
</script>
