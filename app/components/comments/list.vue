<template>
  <div v-for="(region, index) in commentsList" :key="region.id">

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
</template>

<script setup>
const { items } = useItems()
const { removeRegion } = useRegions()
const commentsList = computed(() => {
  const filteredRegions = items.value.filter(x => x.type === 'comment')
  const sortedRegions = filteredRegions.sort((a, b) => a.start - b.start)
  return sortedRegions
})
</script>
