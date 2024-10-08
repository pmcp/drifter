<template>
  <UCard v-for="(region, index) in commentsList" :key="region.id">
    <template #header>
      <div class="flex flex-row gap-2 items-center justify-between mb-2">
        <span>{{ region.type }} {{ index +1 }}</span>
        <UButton
          icon="i-heroicons-trash"
          size="sm"
          color="primary"
          variant="outline"
          :trailing="false"
          @click="removeRegion(region)"
        />
      </div>
    </template>

    <UInput v-model="region.content" placeholder="Comment" />

  </UCard>
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
