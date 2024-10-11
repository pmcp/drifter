<template>
  <!-- NOTE: START-->
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
  <!--  NOTE: END -->



  <!-- SAMPLE: START -->
  <div v-else-if="item.type === 'sample'" class="flex flex-col gap-2">
    <div class="flex flex-row gap-2 items-center mb-2">
      <UInput v-model="item.title" placeholder="Title" class="flex-grow"/>
      <UButton
        icon="i-heroicons-trash"
        size="sm"
        color="primary"
        variant="outline"
        :trailing="false"
        @click="removeRegion(item)"
      />
    </div>
    <div v-if="active">

    </div>
  </div>
  <!-- SAMPLE: END -->



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
  },
  active: {
    type: Boolean,
    default: false
  }
})

const { removeRegion } = useRegionsStore()
</script>
