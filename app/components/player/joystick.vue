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
const { joystickValue, moveJoystick, canContinue, isActive, pause, resume } = useJoystick()

const stopRunning= () => {
  canContinue.value = false;
  joystickValue.value = 0;
}

onMounted(() => {
  joystickValue.value = 0;
  canContinue.value = true;
  watch(joystickValue, async (newValue, oldValue) => {
    if(!canContinue.value) return;
    if(isActive.value) return;
    resume()
  })
});



</script>
