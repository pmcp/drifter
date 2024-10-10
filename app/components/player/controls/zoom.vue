<template>
  <UButton :disabled="disabled" variant="ghost" @click="setZoom(direction)" class="flex flex-row justify-center items-center gap-2">
    {{ direction }}
  </UButton>
</template>
<script setup>

const PlayerStore = usePlayerStore()
const { currentZoom, playerIsReady, playerIsPlaying, maxZoom, minZoom } = storeToRefs(PlayerStore)
const { setZoom } = PlayerStore

const props = defineProps({
  direction: {
    type: String,
    default: '+'
  }
})

const disabled = computed(() => {
  if(playerIsReady.value === false) return true;
  if(props.direction === '+' && currentZoom.value >= maxZoom.value) return true;
  if(props.direction === '-' && currentZoom.value <= minZoom.value) return true;
  return false
})

</script>
