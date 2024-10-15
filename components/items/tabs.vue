<template>
  <div >


  <div class="w-full flex flex-col justify-end items-center relative">
    <button @click="showTabs = !showTabs"  class="absolute w-10 h-4 -top-2 z-30 flex flex-row justify-center items-center">
      <span class="pb-2 text-gray-300">____</span>
    </button>
  </div>

  <UTabs :ui="tabsUi" :items="tabs" class="w-full h-10 overflow-hidden transition-all" :class="showTabs ? 'h-full' : 'h-unset'" v-model="selectedTab" >
    <template #default="{ item, index, selected }">
      <items-tabs-title :item="item" :index="index" :selected="selected"/>
    </template>
    <template #item="{ item }">
      <div class="h-96 overflow-scroll flex flex-col gap-2 pointer-events-auto">
        <items-list :type="item.type"/>
      </div>
    </template>
  </UTabs>
</div>

</template>

<script setup>
const TabsStore = useTabsStore()
const { tabs, tabsUi, selectedTab, showTabs } = storeToRefs(TabsStore)
const { onTabClick } = TabsStore


//
// const swipeEl = ref(null)
//
// const { direction, isSwiping, lengthX, lengthY } = useSwipe(
//   swipeEl,
//   {
//     passive: false,
//     onSwipeEnd(e, direction) {
//       console.log('onSwipe', direction)
//       if (direction === 'up') {
//         showTabs.value = true
//         console.log('showTabs', showTabs.value)
//       }
//       else if (direction === 'down') {
//         showTabs.value = false
//       }
//     },
//   },
// )


</script>

