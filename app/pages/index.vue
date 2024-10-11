<template>
  <div class="absolute top-0 left-0 w-full h-full">
    <client-only>
      <FlowMain class="h-screen w-screen"/>
    </client-only>
  </div>

  <div class="absolute bottom-0 left-4 pointer-events-auto">
    <ui-darkmode />
  </div>

  <div class="absolute h-screen top-0 left-0 w-full p-4 md:p-8 pointer-events-none">
    <UCard class="pointer-events-auto relative">
      <items-tabs />
    </UCard>
  </div>

  <div class="absolute bottom-4 left-0 w-full p-4 pointer-events-auto">
    <UCard>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div class="col-span-3 sm:col-span-3">
          <player-wavesurfer />
        </div>

        <div class="col-span-1 flex flex-row gap-2 grid-cols-1">
          <items-add v-for="type in types" :key="type.id" :type="type">
            {{ type.title}}
          </items-add>
        </div>

        <div class="col-span-1 hidden md:block justify-self-center self-center">
          <player-duration />
        </div>

        <div class="col-span-1 justify-self-end flex flex-row gap-2 items-center justify-center">
          <player-controls-play-pause />
        </div>

        <div class="flex flex-row gap-2 items-center justify-center col-span-3">
          <player-controls-zoom direction="-"/>
          <player-joystick  class="flex-grow"/>
          <player-controls-zoom direction="+"/>
        </div>
      </div>

    </UCard>
  </div>


</template>
<script setup>
const ItemsStore = useItemsStore()
const { types, allItems } = storeToRefs(ItemsStore)
</script>
