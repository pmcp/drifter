<template>
  <span v-if="playerIsReady"> {{ playerCurrentTimeReadable || '00:00' }} / {{ playerTotalDurationReadable || '00:00' }}</span>
</template>
<script setup>
const {
  playerIsReady,
  playerCurrentTimeReadable,
  playerTotalDurationReadable,
} = usePlayer()
</script>
