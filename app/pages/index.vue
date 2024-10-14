<template>
  <div class="absolute top-0 left-0 w-full h-full">
    <client-only>
      <FlowMain class="h-screen w-screen"/>
    </client-only>
  </div>

  <div class="absolute bottom-0 left-4 pointer-events-none z-30">
    <div class="pointer-events-auto">
      <ui-darkmode />
    </div>
  </div>

  <div class=" absolute top-0 left-0 w-full p-4 md:p-8 flex flex-col items-center pointer-events-none">
    <UCard class="w-full max-w-[60rem] pointer-events-auto">
      <items-tabs />
    </UCard>
  </div>

  <div class="pointer-events-none absolute bottom-4 left-0 w-full p-4 flex flex-col items-center ">
    <UCard class="max-w-[60rem] pointer-events-auto w-full">
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div class="col-span-3 sm:col-span-3">
          <player-wavesurfer />
        </div>

        <div class="col-span-1 flex flex-row gap-2 grid-cols-1">
          <items-add v-for="type in types.filter(x => (x.id === 'sample' || x.id === 'note'))" :key="type.id" :type="type">
<!--            {{ type.title}}-->
          </items-add>
        </div>



        <div class="col-span-1 justify-self-center flex flex-row gap-2 items-center justify-center">
<!--          <player-controls-zoom direction="-"/>-->
          <player-controls-in-out>
            <player-controls-play-pause />
          </player-controls-in-out>
<!--          <player-controls-zoom direction="+"/>-->
        </div>

        <div class="col-span-1 text-xs md:block justify-self-center self-center">
          <player-duration />
        </div>

<!--        <div class="flex flex-row gap-2 items-center justify-center col-span-3">-->
<!--&lt;!&ndash;          <player-controls-zoom direction="-"/>&ndash;&gt;-->
<!--&lt;!&ndash;          <player-joystick  class="flex-grow"/>&ndash;&gt;-->

<!--        </div>-->
      </div>

    </UCard>
  </div>


</template>
<script setup>
const ItemsStore = useItemsStore()
const { types, allItems } = storeToRefs(ItemsStore)



</script>
