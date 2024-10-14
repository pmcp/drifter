<template>
  <UButton :ui="{ rounded: 'rounded-full' }" variant="ghost"  @click="setStartOrEnd('start', playerCurrentTime, activeItemId)" :disabled="!playerIsReady || !activeItemId" class="flex flex-row justify-center" icon="i-heroicons-chevron-left" />
  <slot></slot>
  <UButton :ui="{ rounded: 'rounded-full' }" variant="ghost" @click="setStartOrEnd('end', playerCurrentTime, activeItemId)" :disabled="!playerIsReady || !activeItemId" class="flex flex-row justify-center" icon="i-heroicons-chevron-right" />

</template>
<script setup>
const { setStartOrEnd } = useActionsStore()
const PlayerStore = usePlayerStore()
const { playerIsReady, playerCurrentTime } = storeToRefs(PlayerStore)

const ItemStore = useItemsStore()
const { activeItemId } = storeToRefs(ItemStore)
</script>

