<template>
  <UTooltip :text="type.title" :shortcuts="['⌘', 'O']" :popper="{ placement: 'top', arrow: true, offsetDistance: 8 }">
    <UButton variant="soft"  @click="addItem(type)" :disabled="!playerIsReady" class="flex flex-row justify-center" :icon="type.icon" >
      <span class="hidden lg:block">
        <slot></slot>
      </span>

    </UButton>
  </UTooltip>

</template>
<script setup>

const props = defineProps({
  type: {
    type: Object
  }
})

const { playerIsReady } = usePlayer()
const { addItem } = useItems()
</script>
