<script setup>
defineProps({
  variation: {
    type: Number,
    default: 1
  },
  align: {
    type: String,
    default: 'center'
  },
})
</script>

<template>
  <div class="button-rect__wrapper">
    <button class="button-rect__btn" :class="`button-rect__variation--${variation} button-rect__align--${align}`">
      <span class="button-rect__text">
        <slot />
      </span>
    </button>
  </div>
</template>

<style>
@import '/assets/styles/tokens.css';

.button-rect__wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--buttonSize);
  height: 2em;
  background-color: var(--color7);
  border-radius: 5px;
}

.button-rect__text {
  font-family: 'tech', sans-serif;
  letter-spacing: 0.075em;
  font-size: 0.7em;
  transition: 0.1s ease-in-out;
  text-transform: uppercase;
}

.button-rect__btn {
  width: 94%;
  height: 94%;
  border-radius: 10px;
  border: none;
  outline: none;
  cursor: pointer;
  transition: 0.1s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1em;
}

.button-rect__variation--1 {
  color: var(--color9);
  background-color: #c7c3c0;
  box-shadow: rgba(0, 0, 0, 0.377) 10px 10px 8px,
  #ffffff 1.5px 1.5px 2px 0px inset, #c7c3c0 -3.2px -3.2px 8px 0px inset;
}

.button-rect__variation--2 {
  background-color: #d42a02;
  box-shadow: rgba(0, 0, 0, 0.377) 10px 10px 8px, #fb702c 2px 2px 10px 0px inset,
  #d42a02 -4px -4px 1px 0px inset;
  cursor: pointer;
  transition: 0.1s ease-in-out;
  color: var(--color2);
}
.button-rect__variation--3 {
  background-color: #545251;
  box-shadow: rgba(0, 0, 0, 0.377) 10px 10px 8px,
  #a8a6a4 1.5px 1.5px 1px 0px inset, #545251 -3.2px -3.2px 8px 0px inset;
  cursor: pointer;
  transition: 0.1s ease-in-out;
  color: white;
}

.button-rect__variation--1:active {
  box-shadow: rgba(0, 0, 0, 0.377) 0px 0px 0px, inset 0.5px 0.5px 4px #000000,
  #c7c3c0 -3.2px -3.2px 8px 0px inset;
}

.button-rect__variation--2:active {
  box-shadow: rgba(0, 0, 0, 0.377) 0px 0px 0px, inset 0.5px 0.5px 4px #000000,
  #d42a02 -3.2px -3.2px 8px 0px inset;
}

.button-rect__variation--3:active {
  box-shadow: rgba(0, 0, 0, 0.377) 0px 0px 0px, inset 0.5px 0.5px 4px #000000,
  #545251 -3.2px -3.2px 8px 0px inset;
}
.button-rect__btn:active .button-rect__text {
  transform: translateY(0.5px);
}

.button-rect__align--top {
  padding-top: .4em;
  align-items: flex-start;
}

.button-rect__align--center {
  align-items: center;
}

</style>