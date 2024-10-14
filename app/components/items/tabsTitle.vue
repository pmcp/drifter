<template>
  <UChip :text="numberOfItems" size="lg" :show="numberOfItems > 0">
    <span @click="onTabClick(index)" class="capitalize text-xs">{{ item.type }}</span>
  </UChip>
</template>
<script setup>

const props = defineProps({
  item: {
    type: Object
  },
  index: {
    type: Number
  },
  selected: {
    type: Boolean
  }
})

const ItemsStore = useItemsStore()
const { allItems } = storeToRefs(ItemsStore)

const numberOfItems = computed(() => {
  return allItems.value.filter(x => x.type === props.item.type).length

})

const TabsStore = useTabsStore()
const { onTabClick } = TabsStore

</script>
