<template>
  <!-- NOTE: START-->
  <div v-if="item.type === 'note'" class="flex flex-row gap-2 items-center justify-between">
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
  <UCard v-else-if="item.type === 'sample'" :ui="ui">
    <div class="flex flex-row gap-2 items-center">
      <UInput v-model="item.title" placeholder="Title" class="flex-grow"/>
      <UButton
        icon="i-heroicons-trash"
        size="sm"
        color="primary"
        variant="outline"
        :trailing="false"
        @click="removeRegion(item)"
      />
      <UButton
        icon="i-heroicons-arrow-trending-down"
        size="sm"
        color="primary"
        variant="outline"
        :trailing="false"
        @click="addToNodes(item)"
      />
    </div>
  </UCard>
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
const { addToNodes } = useNodesStore()

const ui = computed(() => {
  return {
    base: '',
    background: 'bg-white dark:bg-gray-900',
    divide: 'divide-y divide-gray-200 dark:divide-gray-800',
    ring: `ring-1 ring-gray-200 dark:ring-gray-800 ${props.active ? 'ring-primary-500' : ''}`,
    rounded: 'rounded-lg',
    shadow: 'shadow',
    body: {
      base: '',
      background: '',
      padding: 'px-4 py-5 sm:p-6',
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
  }
})
</script>
