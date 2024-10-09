<template>
  <div class="absolute top-0 left-0 w-full h-full">
    <client-only>
      <FlowMain class="h-screen w-screen"/>
    </client-only>
  </div>

  <div class="absolute bottom-4 left-4 pointer-events-auto">
    <ui-darkmode />
  </div>

  <div class="absolute h-screen top-0 left-0 w-full p-4 md:p-8 pointer-events-none">

    <UCard class="pointer-events-auto relative">

      <UTabs @change="onTabClick" :ui="tabsUi" :items="items" class="w-full h-10 overflow-hidden" :class="showLists ? 'h-96' : ''" v-model="selectedTab" >
        <template #item="{ item }">
          <div class="h-96 overflow-scroll flex flex-col gap-2 pointer-events-auto">
              <comments-list v-if="item.key === 'comments'"/>
              <songs-list v-if="item.key === 'songs'" />
              <mixes-list v-if="item.key === 'mixes'" />
          </div>

        </template>
      </UTabs>

      <div class="absolute bottom-0 left-0 w-full flex flex-col justify-end items-center">
        <UButton @click="showLists = !showLists"  variant="ghost" color="black" class="flex flex-row justify-center items-center gap-2 text-gray-300">
          ___
        </UButton>
      </div>
    </UCard>

      <!--          <mixes-upload />-->


  </div>




  <div class="absolute bottom-0 left-0 w-full p-4 md:p-8  flex flex-col gap-4 mb-10">




      <player-wavesurfer/>

    <div class="grid grid-cols-3 gap-2 w-full">
      <div class="justify-self-start flex flex-row gap-2 items-center justify-center">
        <player-controls />
        <player-duration class="hidden md:block"/>
      </div>
      <action-buttons/>
      <div class="justify-self-end self-center">
        <UButton v-if="!showLists" icon="i-heroicons-chevron-up" @click="showLists = !showLists"/>
        <UButton v-else icon="i-heroicons-chevron-down" @click="showLists = !showLists"/>
      </div>

      <player-joystick class="col-span-3" />

    </div>



  </div>





</template>

<script setup>


const showLists= ref(false)


const tabsUi = {
  wrapper: 'relative space-y-2',
  container: 'relative w-full ',
  base: 'focus:outline-none',
  list: {
    base: 'relative',
    background: 'bg-gray-100 dark:bg-gray-800',
    rounded: 'rounded-lg',
    shadow: '',
    padding: 'p-1',
    height: 'h-10',
    width: 'w-full',
    marker: {
      wrapper: 'absolute top-[4px] left-[4px] duration-200 ease-out focus:outline-none',
      base: 'w-full h-full',
      background: 'bg-white dark:bg-gray-900',
      rounded: 'rounded-md',
      shadow: 'shadow-sm',
    },
    tab: {
      base: 'relative inline-flex items-center justify-center flex-shrink-0 w-full ui-focus-visible:outline-0 ui-focus-visible:ring-2 ui-focus-visible:ring-primary-500 dark:ui-focus-visible:ring-primary-400 ui-not-focus-visible:outline-none focus:outline-none disabled:cursor-not-allowed disabled:opacity-75 transition-colors duration-200 ease-out',
      background: '',
      active: 'text-gray-900 dark:text-white',
      inactive: 'text-gray-500 dark:text-gray-400',
      height: 'h-8',
      padding: 'px-3',
      size: 'text-sm',
      font: 'font-medium',
      rounded: 'rounded-md',
      shadow: '',
      icon: 'w-4 h-4 flex-shrink-0 me-2',
    },
  },
}


const items = [{
  key: 'comments',
  // label: 'Comments',
  icon: 'i-heroicons-chat-bubble-bottom-center-text',
  // description: 'Your comments'
}, {
  key: 'songs',
  // label: 'Songs',
  icon: 'i-heroicons-musical-note',
  // description: 'Your songs'
},
  {
    key: 'mixes',
    // label: 'Mixes',
    icon: 'i-heroicons-arrow-path-rounded-square',
    // description: 'Your songs'
  }
  ]


const route = useRoute()
const router = useRouter()
const selectedTab = computed({
  get () {
    const index = items.findIndex((item) => item.label === route.query.tab)
    if (index === -1) {
      return 0
    }

    return index
  },
  set (value) {
    // Hash is specified here to prevent the page from scrolling to the top
    router.replace({ query: { tab: items[value].label }, hash: '#control-tabs' })
  }
})


const onTabClick = (index) => {
  selectedTab.value = index
  console.log('onTabClick', index, selectedTab.value)
  console.log(index === selectedTab.value)
  // if(index === selectedTab.value) showLists.value = !showLists.value; return;
  showLists.value = true;
}


</script>
