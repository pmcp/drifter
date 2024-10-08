<template>
  <div class="absolute top-0 left-0 w-full h-full">
    <client-only>
      <FlowMain class="h-screen w-screen"/>
    </client-only>
  </div>
  <div class="absolute h-screen top-0 left-0 w-full p-8 pointer-events-none">
<!--      <UCard class="pointer-events-auto">-->
<!--        <Audio-WaveSurfer-->
<!--          src="testfiles/01 1986 (Obsimo Remix).m4a"-->
<!--          :options="{-->
<!--          height: 48,-->
<!--          waveColor: 'gray',-->
<!--          progressColor: 'black',-->
<!--          barGap: 1,-->
<!--          barWidth: 5,-->
<!--          barRadius: 8,-->
<!--          duration: 80-->
<!--        }"-->
<!--        />-->
<!--        <template #header>-->
<!--          <mixes-upload />-->
<!--        </template>-->
<!--      </UCard>-->

  </div>


<!--  <div class="absolute bottom-0 left-0 w-full p-8 pointer-events-auto">-->
<!--    <div class="flex flex-row gap-4 w-full mb-8">-->
<!--      <comments-list />-->
<!--      <songs-list class="flex-grow"/>-->
<!--      <mixes-list class="flex-grow"/>-->
<!--    </div>-->
<!--    <action-buttons class="w-full"/>-->
<!--  </div>-->



</template>

<script setup>
const { mixes } = useMixes()
</script>
