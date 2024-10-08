<template>
<div class="flex flex-row gap-2 items-center justify-center ">
  <UButton variant="soft"  @click="addRegion('comment')" :disabled="!playerIsReady" class="flex flex-row justify-center" icon="i-heroicons-chat-bubble-left-ellipsis" >
  Add
  </UButton>
  <UButton variant="soft" @click="addRegion('song')" :disabled="!playerIsReady" class="flex flex-row justify-center" icon="i-heroicons-musical-note">
    Add
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
