<template>
  <div>
    <div class="joystick-container">
      <URange
        type="range"
        id="joystick"
        :min="-100"
        :max="100"
        v-model="joystickValue"

        @change="start"
       />
    </div>
  </div>
</template>
<script setup>
const {
  player,
  playerIsPlaying,
  playerIsReady,
  playerCurrentTime,
  playerTotalDuration,

} = usePlayer()

const { joystickValue, moveJoystick } = useJoystick()
const { isActive, pause, resume } = useIntervalFn(() => moveJoystick(), 10, {immediate: false})

const stopRunning= () => {
  start
}

const { isPending, start, stop } = useTimeoutFn(() => {
  joystickValue.value = 0;
}, 10, {immediate: false})


onMounted(() => {
  joystickValue.value = 0;
  watch(joystickValue, async (newValue, oldValue) => {
    if(isActive.value) return;
    // resume()
  })
});

</script>
