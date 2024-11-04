<template>
  <div>
    <div v-if="type === 'set'">
      <files-upload />
    </div>
    <div v-if="items?.length">
      <div class="w-full flex flex-col gap-2 p-1">
        <items-single
          class="w-full"
          v-for="(item) in items"
          :key="`lists-${item.id}`"
          :item="item"
          :active="activeItemId === item.id"
        />
      </div>
    </div>
    <div v-else class="h-full w-full flex flex-col items-center justify-center">
      <span class="italic font-extralight">No title yet</span>
    </div>
  </div>

</template>
<script setup>
const props = defineProps({
  type: {
    type: String
  }
})

const ItemsStore = useItemsStore()
const { allItems, types, activeItemId } = storeToRefs(ItemsStore)

const items = computed(() => {
  const filteredItems = allItems.value.filter(x => x.type === props.type)
  return filteredItems.sort((a, b) => a.start - b.start)
})

// get the type from useItems > types, based on the type id passed by the prop
// const typeObject = computed(() => types.value.find(x => {
//   return x.id === props.type
// }))

</script>
