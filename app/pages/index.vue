<template>
  <div class="absolute top-0 left-0 w-full h-full">
    <client-only>
      <FlowMain class="h-screen w-screen"/>
    </client-only>
  </div>

  <div class="absolute bottom-0 left-4 pointer-events-auto">
    <ui-darkmode />
  </div>

  <div class="absolute h-screen top-0 left-0 w-full p-4 md:p-8 pointer-events-none">
    <UCard class="pointer-events-auto relative">
      <lists-container />
    </UCard>
  </div>

    <div class="absolute bottom-4 left-0 w-full p-4">
      <UCard class=" pointer-events-auto">
        <div class="flex flex-col gap-2">
          <player-wavesurfer/>
          <div class="grid grid-cols-3 gap-2 w-full">
            <div class="justify-self-start flex flex-row gap-2 items-center justify-center">
              <player-controls-play-pause />
              <player-duration class="hidden md:block"/>
            </div>
            <action-buttons/>
            <div class="flex flex-row gap-2 items-center justify-center col-span-3">
              <player-controls-zoom direction="-"/>
              <player-joystick  class="flex-grow"/>
              <player-controls-zoom direction="+"/>
            </div>
          </div>
        </div>
      </UCard>
    </div>
</template>
<script setup lang="ts">
import Zoom from "#build/app/components/player/controls/zoom.vue";
</script>
