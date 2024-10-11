<template>
  <div class="flex flex-col gap-4 h-full">
  <div v-if="commentsList?.length" v-for="(region, index) in commentsList" :key="region.id">

      <div class="flex flex-row gap-2 items-center justify-between mb-2">
        <UInput v-model="region.content" placeholder="Comment" class="flex-grow" />
        <UButton
          icon="i-heroicons-trash"
          size="sm"
          color="primary"
          variant="outline"
          :trailing="false"
          @click="removeRegion(region)"
        />
      </div>




  </div>
    <div v-else class="h-full w-full flex flex-col items-center justify-center">
      <span class="italic font-extralight">No comments yet</span>
    </div>
  </div>
</template>

<script setup>
const regionsStore = useRegionsStore()
const { allItems } = storeToRefs(regionsStore)
const { removeRegion } = useRegionsStore()

const commentsList = computed(() => {
  const filteredRegions = allItems.value.filter(x => x.type === 'comment')
  const sortedRegions = filteredRegions.sort((a, b) => a.start - b.start)
  return sortedRegions
})
</script>
