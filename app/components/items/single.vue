<template>
  <div v-if="item.type === 'note'" class="flex flex-row gap-2 items-center justify-between mb-2 p-2">
    <UInput v-model="item.content" placeholder="Comment" class="flex-grow" />
    <UButton
      icon="i-heroicons-trash"
      size="sm"
      color="primary"
      variant="outline"
      :trailing="false"
      @click="removeRegion(item)"
    />
  </div>
  <div v-else class="flex flex-row gap-2 items-center justify-between mb-2 p-2">

    <div class="flex flex-row gap-2 items-center">
      <div>{{ item.id }}</div>
      <div>({{ item.start }}<span v-if="item.end"> - {{ item.end }}</span>)</div>
    </div>
      <UButton
        icon="i-heroicons-trash"
        size="sm"
        color="primary"
        variant="outline"
        :trailing="false"
        @click="removeRegion(item)"
      />
  </div>
</template>

<script setup>
const props = defineProps({
  item: {
    type: Object
  }
})

const { removeRegion } = useRegionsStore()
</script>
