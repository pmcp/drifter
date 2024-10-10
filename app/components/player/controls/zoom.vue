<template>
  <UButton :disabled="disabled" variant="ghost" @click="setZoom(direction)" class="flex flex-row justify-center items-center gap-2">
    <span class="text-xs">{{ direction }}</span>
  </UButton>
</template>
<script setup>
const { playerIsReady, currentZoom, maxZoom, minZoom, setZoom } = usePlayer()

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
