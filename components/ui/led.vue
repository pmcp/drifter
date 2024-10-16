<script setup>
defineProps({
  type: {
    type: Number,
    default: 0,
  }
})
</script>

<template>
  <div class="led" :class="`led__type${type}` "></div>
</template>

<style>
.led {
  border-radius: 50%;
  width: 6px;
  height: 6px;
}

.led__type0 {
  background-color: var(--color7);
  box-shadow: inset #863C22 0 -1px 9px;
}

.led__type1 {
  background-color: #FA5F28;
  box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #F40 0 -1px 9px, #FA3C00 0 2px 12px;
  animation: alive 8s infinite;
}

.led__type2 {
  animation: blink 1s infinite;
}

.led__type3 {
  animation: blink 150ms infinite;
}

.led__type4 {
  animation: blink 80ms infinite;
}


@keyframes blink {
  from { background-color: var(--color7);
    box-shadow: inset #863C22 0 -1px 9px; }
  25% { background-color: #FA5F28; box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #F40 0 -1px 9px, #FA3C00 0 2px 12px }
  70% { background-color: #FA5F28; box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #F40 0 -1px 9px, #FA3C00 0 2px 12px }
  to { background-color: var(--color7);
    box-shadow: inset #863C22 0 -1px 9px; }
}

@keyframes alive {
  from { background-color: var(--color7);
    box-shadow: inset #863C22 0 -1px 9px; }
  2% { background-color: #FA5F28; box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #F40 0 -1px 9px, #FA3C00 0 2px 12px }
  3% { background-color: var(--color7);
    box-shadow: inset #863C22 0 -1px 9px; }
  4% { background-color: #FA5F28; box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #F40 0 -1px 9px, #FA3C00 0 2px 12px }
  98% { background-color: #FA5F28; box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #F40 0 -1px 9px, #FA3C00 0 2px 12px }
  to { background-color: var(--color7);
    box-shadow: inset #863C22 0 -1px 9px; }
}


</style>