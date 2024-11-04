<template>

  <UCard :ui="ui">
    <div class="flex flex-row gap-2 items-center justify-between flex-col">
      {{ theItem.start }} - {{ theItem.end }}
      InChain: {{ theItem.inChain ? '✅' : '❌' }}
      Active: {{ theItem.playing ? '✅' : '❌' }}
      <div>
        <UButton @click="theItem.inChain = !theItem.inChain" class="flex flex-row justify-center" :icon="theItem.inChain ? 'i-heroicons-minus' : 'i-heroicons-plus'" />
        <UButton :ui="{ rounded: 'rounded-full' }" @click="goToItemInPlayer(theItem.id)" class="flex flex-row justify-center" icon="i-heroicons-play" />
      </div>

      <div class="flex flex-col gap-2 w-full" v-if="theItemsInsideThisItem.length > 0">

        <div class="flex items-center gap-2" v-for="el in theItemsInsideThisItem" :key="el.id" >

            <UButton :ui="{ rounded: 'rounded-full' }" @click="goToItemInPlayer(el.id, false)" class="flex flex-row justify-center" icon="i-heroicons-play" /> {{ el.type }} - {{ el.start }} - {{ el.content }}



        </div>
      </div>

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
const { goToItemInPlayer, getNodesForRegionsInsideThisRegion } = ActionsStore

const ItemsStore = useItemsStore()
const { allItems } = storeToRefs(ItemsStore)



const theItem = computed(() => {
  // find the item in allItems
  const item = allItems.value.find(x => x.id === props.item.id)
  if(!item) return null
  return item
})


const theItemsInsideThisItem = computed(() => allItems.value.filter(x => (x.start >= theItem.value.start && x.start <= theItem.value.end) && x.type !== 'sample'))


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
