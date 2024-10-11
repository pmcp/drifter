<template>

  <div v-if="items?.length">
    <items-single :item="item" v-for="(item) in items" :key="`lists-${item.id}`"/>
  </div>
  <div v-else class="h-full w-full flex flex-col items-center justify-center">
    <span class="italic font-extralight">No {{ typeObject.title }} yet</span>
  </div>

</template>
<script setup>
const props = defineProps({
  type: {
    type: String
  }
})

const ItemsStore = useItemsStore()
const { allItems, types } = storeToRefs(ItemsStore)
// get the computed list
const items = computed(() => {
  const filteredItems = allItems.value.filter(x => x.type === props.type)
  const sortedItems = filteredItems.sort((a, b) => a.start - b.start)
  return sortedItems
})

// get the type from useItems > types, based on the type id passed by the prop
const typeObject = computed(() => types.value.find(x => {
  console.log('x', x, props.type)
  return x.id === props.type
}))
</script>
