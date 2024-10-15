<template>
  <UTabs :ui="tabsUi" :items="tabs" class="w-full h-10 overflow-hidden" :class="showTabs ? 'h-96' : ''" v-model="selectedTab" >
    <template #default="{ item, index, selected }">
      <items-tabs-title :item="item" :index="index" :selected="selected"/>
    </template>
    <template #item="{ item }">
      <div class="h-96 overflow-scroll flex flex-col gap-2 pointer-events-auto">
        <items-list :type="item.type"/>
      </div>
    </template>
  </UTabs>

  <div class="absolute bottom-8 left-0 w-full flex flex-col justify-end items-center">
    <UButton @click="showTabs = !showTabs"  variant="ghost" color="black" class="flex flex-row justify-center items-center gap-2 text-gray-300">
      _____
    </UButton>
  </div>
</template>

<script setup>
const TabsStore = useTabsStore()
const { tabs, tabsUi, selectedTab, showTabs } = storeToRefs(TabsStore)
const { onTabClick } = TabsStore

</script>

