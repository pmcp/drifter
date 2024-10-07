<template>
  <UCard v-for="(region, index) in mixes" :key="region.id">
    <template #header>
      <div class="flex flex-row gap-2 items-center mb-2">
        <span>Mix {{ index +1 }}:</span>
        <UInput v-model="region.title" placeholder="Title" class="flex-grow"/>
      </div>
    </template>
    <span>{{ formatTime(region.start) }} <span v-if="region.end">- {{ formatTime(region.end) }}</span></span>
    <div>
      From {{ region.trackIn.title }} to {{ region.trackOut.title }}
    </div>
    <template #footer>
      <UButton @click="createEdge(region)" :disabled="!playerIsReady" class="flex flex-row justify-center">
        Add to Flow
      </UButton>
    </template>
  </UCard>
</template>
<script setup>
const { mixes } = useMixes()
const { playerIsReady } = usePlayer()
const { createEdge } = useEdges()
const formatTime= (seconds) => [seconds / 60, seconds % 60].map((v) => `0${Math.floor(v)}`.slice(-2)).join(':')
</script>
