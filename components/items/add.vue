<template>
  <UTooltip :text="type.title" :shortcuts="['⌘', 'O']" :popper="{ placement: 'top', arrow: true, offsetDistance: 8 }">
    <UButton variant="ghost"  @click="addItem(type)" :disabled="!playerIsReady" class="flex flex-row justify-center" :icon="type.icon" >
      <span class="hidden lg:block">
        <slot></slot>
      </span>

    </UButton>
  </UTooltip>

</template>
<script setup>
const PlayerStore = usePlayerStore()
const { playerIsReady } = storeToRefs(PlayerStore)

const ActionsStore = useActionsStore()
// const { add } = storeToRefs(ActionsStore)
const { addItem } = ActionsStore







// Add region to wavesurfer
const { addRegion } = useRegionsStore()

const props = defineProps({
  type: {
    type: Object
  }
})
</script>
