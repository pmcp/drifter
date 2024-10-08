<template>
<div class="flex flex-row gap-2 items-center justify-between">
  <UButton @click="addRegion('comment')" :disabled="!playerIsReady" class="flex flex-row justify-center">
    Add comment {{ playerCurrentTime}}
  </UButton>
  <audio-controls />
  <UButton @click="addRegion('song')" :disabled="!playerIsReady" class="flex flex-row justify-center">
    Add song at {{ playerCurrentTime}}
  </UButton>
</div>
</template>

<script setup>
const {
  playerIsReady,
  playerCurrentTime
} = usePlayer()
const { addRegion } = useRegions()
</script>
