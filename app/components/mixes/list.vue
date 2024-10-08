<template>
  <div class="flex flex-col gap-4">
  <div v-if="mixes?.length > 1" v-for="(region, index) in mixes" :key="region.id" class="border-b pb-4">
    <div class="flex flex-col gap-2">
      <UInput v-model="region.title" placeholder="Title" class="flex-grow"/>
      <div class="flex flex-row gap-2 items-center justify-between">
        <span class="text-xs">{{ formatTime(region.start) }} <span v-if="region.end">- {{ formatTime(region.end) }}</span></span>
        <UButton variant="soft" @click="createEdge(region)" :disabled="!playerIsReady" class="flex flex-row justify-center">
          Add to Flow
        </UButton>
      </div>

    </div>
  </div>
  <div v-else>
    <UContainer>
    No mixes yet
    </UContainer>
  </div>

</div>
</template>
<script setup>
const { mixes } = useMixes()
const { playerIsReady } = usePlayer()
const { createEdge } = useEdges()
const formatTime= (seconds) => [seconds / 60, seconds % 60].map((v) => `0${Math.floor(v)}`.slice(-2)).join(':')
</script>
