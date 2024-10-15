<template>

  <!-- Layer 1: Flow -->
  <div class="absolute top-0 left-0 w-full h-full">
    <client-only>
      <FlowMain class="h-screen w-screen"/>
    </client-only>
  </div>

  <!-- Layer 2: UI -->
  <div class="absolute z-10 top-0 left-0 p-2 w-full h-full flex flex-col justify-end items-center pointer-events-none">
    <UCard :ui="mainPanelUi" class=" w-full max-w-[60rem] pointer-events-auto bg-gray-100 flex flex-col rounded-lg">
      <div  class="px-2 pb-2 ">
        <items-tabs />
      </div>
        <div class="relative bg-black h-20 overflow-hidden py-2"  >
<!--          <div class="absolute z-20 w-full flex flex-col justify-end items-center">-->
<!--            <button @click="togglePlayerSize"  class="flex flex-row justify-center items-center bg-gray-500 h-[1px] w-8 m-1 " />-->
<!--          </div>-->
          <div class="relative z-10">
            <player-wavesurfer/>
          </div>

        </div>

      <div class="flex w-full justify-around items-center py-2">
        <items-add :key="types[0].id" :type="types[0]"/>
        <div class="flex flex-row gap-2 items-center justify-center col-span-3">
          <player-controls-in-out>
            <player-controls-play-pause />
          </player-controls-in-out>
        </div>
        <items-add :key="types[1].id" :type="types[1]"/>
      </div>
    </UCard>
  </div>



  <!-- Layer 3: Settings -->
  <div class="absolute top-2 left-2 pointer-events-none z-20">
    <div class="pointer-events-auto">
      <ui-darkmode />
    </div>
  </div>


<!--  <div class=" absolute top-0 left-0 w-full p-4 md:p-8 flex flex-col items-center pointer-events-none">-->
<!--    <UCard class="w-full max-w-[60rem] pointer-events-auto">-->
<!--      <items-tabs />-->
<!--    </UCard>-->
<!--  </div>-->

  <div class="pointer-events-none absolute bottom-4 left-0 w-full p-4 flex flex-col items-center ">

  </div>


</template>
<script setup>
const ItemsStore = useItemsStore()
const { types, allItems } = storeToRefs(ItemsStore)



const mainPanelUi = ref({
  base: '',
  background: 'bg-white dark:bg-gray-900',
  divide: 'divide-y divide-gray-200 dark:divide-gray-800',
  ring: 'ring-1 ring-gray-200 dark:ring-gray-800',
  rounded: 'rounded-lg',
  shadow: 'shadow',
  body: {
    base: '',
    background: '',
    padding: '',
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
})
</script>
