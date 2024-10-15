<template>
  <div class="w-full flex flex-col justify-end items-center">
    <button @click="showTabs = !showTabs"  class="flex flex-row justify-center items-center bg-gray-300 h-[1px] w-8 m-1" />
  </div>
  <UTabs :ui="tabsUi" :items="tabs" class="w-full h-10 overflow-hidden" :class="showTabs ? 'h-full' : 'h-unset'" v-model="selectedTab" >
    <template #default="{ item, index, selected }">
      <items-tabs-title :item="item" :index="index" :selected="selected"/>
    </template>
    <template #item="{ item }">
      <div class="h-96 overflow-scroll flex flex-col gap-2 pointer-events-auto">
        <items-list :type="item.type"/>
      </div>
    </template>
  </UTabs>


</template>

<script setup>
const TabsStore = useTabsStore()
const { tabs, tabsUi, selectedTab, showTabs } = storeToRefs(TabsStore)
const { onTabClick } = TabsStore

</script>

