<template>
  <UButton variant="soft"  @click="addRegion(type.id)" :disabled="!playerIsReady" class="flex flex-row justify-center" :icon="type.icon" >
    {{ slot }}
  </UButton>
</template>
<script setup>

const props = defineProps({
  type: {
    type: Object
  }
})

const { playerIsReady } = usePlayer()
const { addRegion } = useRegions()
</script>
