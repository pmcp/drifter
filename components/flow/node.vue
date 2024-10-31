<template>

  <UCard :ui="ui">
    <div class="flex flex-row gap-2 items-center justify-between">
      {{ item.data.inChain ? '✅' : '❌' }}
      {{ item.id }}
      <UButton @click="item.data.inChain = !item.data.inChain" class="flex flex-row justify-center" :icon="item.data.inChain ? 'i-heroicons-minus' : 'i-heroicons-plus'" />
      <UButton :ui="{ rounded: 'rounded-full' }" @click="goToItemStartAndPlay(item.id)" class="flex flex-row justify-center" icon="i-heroicons-play" />
    </div>

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
    ring: `ring-1 ring-gray-200 dark:ring-gray-800 ${props.item.data.inChain ? 'ring-primary-500' : ''}`,
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
