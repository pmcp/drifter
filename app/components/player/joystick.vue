<template>
  <div>
    <div class="joystick-container">
      <URange
        type="range"
        id="joystick"
        :min="-100"
        :max="100"
        v-model="joystickValue"
        @input="handleInput"
        @change="handleChange"
       />
      <div id="output">VALUE: {{ joystickValue }}</div>
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





const joystickValue = ref(0);
let timeoutId = null;

const handleInput = () => {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
};


let interval;

const handleChange = () => {
  console.log('handleChange', joystickValue.value)
  timeoutId = setTimeout(() => {
    joystickValue.value = 0;
    console.log('stopping')
    clearInterval(interval)
    interval = null
  }, 100);
};



onMounted(() => {
  joystickValue.value = 0;
});


watch(joystickValue, async (newValue, oldValue) => {

  if(interval) return;
  interval = setInterval(function() {
    // code to be executed repeatedly
    console.log('going into interval', joystickValue.value)
    // if(joystickValue.value === 0) clearInterval(interval.value);
    console.log('this will be printed every 2 seconds', joystickValue.value)
    const valueToAdd = 1 * joystickValue.value/500
    console.log('valueToAdd', valueToAdd, playerCurrentTime.value == playerTotalDuration - valueToAdd)

    // TODO: havent tested this stop yet
    if(playerCurrentTime.value >= playerTotalDuration - valueToAdd) return;

    if(!(playerCurrentTime.value >= 0)) return;
    player.value.setTime(playerCurrentTime.value + valueToAdd)
  }, 10);

})










//
// watch(position, (newSliderValue, oldSliderValue) => {
//   // if the value doesnt equal 0, we should keep repeating the seeking
//   let refreshIntervalId = null;
//   const multiplier = newSliderValue - oldSliderValue
//


// startSeeking(multiplier, newSliderValue)
// if(
//   newSliderValue !== oldSliderValue
// ) {
//   console.log('change')
//   clearInterval(interval);
// }
// let interval = setInterval(function() {
//   // code to be executed repeatedly
//   console.log("This will be printed every 2 seconds");
// }, 2000);






//
// if(newSliderValue < .1 && newSliderValue > -.1) return;
// if(playerCurrentTime.value === 0 && newSliderValue < 0) return;
// // todo: add if reach the end
// let newDirection = newSliderValue > oldSliderValue ? 1 : -1;
//
//
// let sliderValue = newSliderValue
// // console.log('direction', newDirection, direction, newDirection === direction)
// if(newDirection === direction)
// {
//
//   direction = newDirection
// }


// if(newDirection === -1) console.log('Seeking backward')
// else console.log('Seeking forward')
// console.log('sliderValue', sliderValue, direction, sliderValue)
//
// const seekTo = computeResult(sliderValue)
//
//
// let newTime = playerCurrentTime.value
// if(newSliderValue > 0) newTime = newTime + seekTo*newDirection/10
// else newTime = newTime - seekTo*newDirection/10
// console.log(newSliderValue, newTime)
// player.value.setTime(newTime)

// });




// const position = computed({
//   get () {
//     return playerCurrentTime.value
//   },
//   set (value) {
//     player.value.setTime(value)
//   }
// })
//

// watch(position, async (newValue, oldValue) => {
//   if (newValue !== oldValue) {
//     if (timer) {
//       clearTimeout(timer);
//       // timer = 0;
//     }
//
//     timer = setTimeout(() => {
//       // position.value = 50;
//     }, 500)
//   }
// })



</script>
