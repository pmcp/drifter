<template>
  <div>
    <div class="joystick-container">
      <URange
        type="range"
        id="joystick"
        :min="-100"
        :max="100"
        v-model="joystickValue"

        @change="stopRunning"
       />
    </div>
  </div>
</template>
<script setup>

const { player, playerIsPlaying, playerIsReady, playerCurrentTime, playerTotalDuration } = usePlayer()
const { joystickValue, moveJoystick } = useJoystick()
const { isActive, pause, resume } = useIntervalFn(() => moveJoystick(), 10, {immediate: false})

const stopRunning= () => { pause(); joystickValue.value = 0; }

joystickValue.value = 0;

onMounted(() => {
  watch(joystickValue, async (newValue, oldValue) => {
    if(isActive.value) return;
    resume()
  })
});

</script>
