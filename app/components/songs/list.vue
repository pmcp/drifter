<template>
  <div class="flex flex-col gap-4 h-full">
    <div v-if="songsList?.length" v-for="(region, index) in songsList" :key="region.id" class="border-b pb-4">
        <div class="flex flex-col gap-2">
          <div class="flex flex-row gap-2 items-center mb-2">
  <!--          <span>{{ region.type }} {{ index +1 }}:</span>-->
            <UInput v-model="region.title" placeholder="Title" class="flex-grow"/>
            <UButton
              icon="i-heroicons-trash"
              size="sm"
              color="primary"
              variant="outline"
              :trailing="false"
              @click="removeRegion(region)"
            />


          </div>
          <div class="flex flex-row gap-2 items-center justify-between mb-2">

            <UButton variant="outline" @click="setRegionBound(region, 'start')" :disabled="!playerIsReady" class="flex flex-row justify-center w-8">
              <span class="text-xs">In</span>
            </UButton>

            <span class="text-xs">{{ formatTime(region.start) }} <span v-if="region.end">- {{ formatTime(region.end) }}</span></span>
            <UButton variant="outline" @click="setRegionBound(region, 'end')" :disabled="!playerIsReady" class="flex flex-row justify-center w-8">
              <span class="text-xs">Out</span>
            </UButton>
          </div>

          <UButton variant="soft" @click="addNode(region)" :disabled="!playerIsReady" class="flex flex-row justify-center">
            <span v-if="nodes.filter(x => x.id === region.id).length">Update Item in Flow</span>
            <span v-else>Add to Flow</span>
          </UButton>
        </div>





    </div>
    <div v-else class="h-full w-full flex flex-col items-center justify-center">
      <span class="italic font-extralight">No songs yet</span>
    </div>
  </div>
</template>
<script setup>

const PlayerStore = usePlayerStore()
const { playerCurrentTime, playerIsReady } = storeToRefs(PlayerStore)

const ItemsStore = useItemsStore()
const { items } = storeToRefs(ItemsStore)

const NodesStore = useNodesStore()
const { nodes } = storeToRefs(NodesStore)
const { addNode } = NodesStore

const { removeRegion, setRegionBound } = useRegionsStore()

const songsList = computed(() => {
  const filteredRegions = items.value.filter(x => x.type === 'song')
  const sortedRegions = filteredRegions.sort((a, b) => a.start - b.start)
  return sortedRegions
})

const formatTime= (seconds) => [seconds / 60, seconds % 60].map((v) => `0${Math.floor(v)}`.slice(-2)).join(':')
</script>
