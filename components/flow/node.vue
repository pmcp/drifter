<template>
  <UCard :ui="ui">
    <UButton :ui="{ rounded: 'rounded-full' }" @click="goToItemStartAndPlay(item.id)" class="flex flex-row justify-center" icon="i-heroicons-play" />
<!--    <span class="text-md font-bold">{{ item.type }}</span>-->
  </UCard>
</template>
<script setup>
const props = defineProps({
  item: {
    type: Object
  },
  active: {
    type: Boolean,
    default: false
  }
})

const ActionsStore = useActionsStore()
const { goToItemStartAndPlay } = ActionsStore


const ui = computed(() => {
  return {
    base: '',
    background: 'bg-white dark:bg-gray-900',
    divide: 'divide-y divide-gray-200 dark:divide-gray-800',
    ring: `ring-1 ring-gray-200 dark:ring-gray-800 ${props.active ? 'ring-primary-500' : ''}`,
    rounded: 'rounded-lg',
    shadow: 'shadow',
    body: {
      base: '',
      background: '',
      padding: 'px-4 py-5 sm:p-6',
    },
    header: {
      base: '',
      background: '',
      padding: 'px-4 py-5 sm:px-6',
    },
    footer: {
      base: '',
      background: '',
      padding: 'px-4 py-4 sm:px-6',
    },
  }
})





</script>
