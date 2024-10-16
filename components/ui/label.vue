<script setup>
defineProps({
  type: {
    type: Number,
    default: 0,
  }
})
</script>

<template>
  <div class="label" :class="`label__type${type}`">
    <slot />
  </div>
</template>

<style>
.label {
  padding: .4em 2em 2em 2em;
  border-radius: 2px;
  color: var(--color1);
  font-family: 'tech', sans-serif;
  font-size: .8em;
}

.label__type0 {
  background-color: var(--color4)
}


.label__type1 {
  background-color: var(--color9)
}

.label__type2 {
  background-color: var(--color5)
}
</style>