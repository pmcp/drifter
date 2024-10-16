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
  <div class="button-square__wrapper">
    <button class="button-square__btn" :class="`button-square__variation--${variation} button-square__align--${align}`">
      <span class="button-square__text">
        <slot name="label"/>
      </span>
      <div class="button-square__led">
        <slot name="led"/>
      </div>
    </button>
  </div>
</template>

<style>
@import '/assets/styles/tokens.css';

.button-square__wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--buttonSize);
  height: var(--buttonSize);
  background-color: var(--color7);
  border-radius: 5px;
}

.button-square__text {
  font-family: 'tech', sans-serif;
  letter-spacing: 0.075em;
  font-size: 0.7em;
  transition: 0.1s ease-in-out;
  text-transform: uppercase;
}

.button-square__btn {
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
}

.button-square__variation--1 {
  color: var(--color9);
  background-color: #c7c3c0;
  box-shadow: rgba(0, 0, 0, 0.377) 10px 10px 8px,
  #ffffff 1.5px 1.5px 2px 0px inset, #c7c3c0 -3.2px -3.2px 8px 0px inset;
}

.button-square__variation--2 {
  background-color: var(--color5);
  box-shadow: rgba(0, 0, 0, 0.377) 10px 10px 8px,
  #FDC7B4 1.5px 1.5px 1px 0px inset, var(--color5) -3.2px -3.2px 8px 0px inset;
  cursor: pointer;
  transition: 0.1s ease-in-out;
  color: white;
}
.button-square__variation--3 {
  background-color: #545251;
  box-shadow: rgba(0, 0, 0, 0.377) 10px 10px 8px,
  #a8a6a4 1.5px 1.5px 1px 0px inset, #545251 -3.2px -3.2px 8px 0px inset;
  cursor: pointer;
  transition: 0.1s ease-in-out;
  color: white;
}

.button-square__variation--4 {
  background-color: var(--color11);
  box-shadow: rgba(0, 0, 0, 0.377) 10px 10px 8px,
  #FFC2D2 1.5px 1.5px 1px 0px inset, var(--color11) -3.2px -3.2px 8px 0px inset;
  cursor: pointer;
  transition: 0.1s ease-in-out;
  color: white;
}

.button-square__variation--5 {
  background-color: var(--color12);
  box-shadow: rgba(0, 0, 0, 0.377) 10px 10px 8px,
  #B4E0F9 1.5px 1.5px 1px 0px inset, var(--color12) -3.2px -3.2px 8px 0px inset;
  cursor: pointer;
  transition: 0.1s ease-in-out;
  color: white;
}


.button-square__variation--6 {
  background-color: var(--color13);
  box-shadow: rgba(0, 0, 0, 0.377) 10px 10px 8px,
  #FBCFCC 1.5px 1.5px 1px 0px inset, var(--color11) -3.2px -3.2px 8px 0px inset;
  cursor: pointer;
  transition: 0.1s ease-in-out;
  color: white;
}


.button-square__variation--1:active {
  box-shadow: rgba(0, 0, 0, 0.377) 0px 0px 0px, inset 0.5px 0.5px 4px #000000,
  #c7c3c0 -3.2px -3.2px 8px 0px inset;
}

.button-square__variation--2:active {
  box-shadow: rgba(0, 0, 0, 0.377) 0px 0px 0px, inset 0.5px 0.5px 4px #000000,
  #d42a02 -3.2px -3.2px 8px 0px inset;
}

.button-square__variation--3:active {
  box-shadow: rgba(0, 0, 0, 0.377) 0px 0px 0px, inset 0.5px 0.5px 4px #000000,
  #545251 -3.2px -3.2px 8px 0px inset;
}

.button-square__variation--4:active {
  box-shadow: rgba(0, 0, 0, 0.377) 0px 0px 0px, inset 0.5px 0.5px 4px #000000,
  var(--color11) -3.2px -3.2px 8px 0px inset;
}

.button-square__variation--5:active {
  box-shadow: rgba(0, 0, 0, 0.377) 0px 0px 0px, inset 0.5px 0.5px 4px #000000,
  var(--color12) -3.2px -3.2px 8px 0px inset;
}

.button-square__variation--6:active {
  box-shadow: rgba(0, 0, 0, 0.377) 0px 0px 0px, inset 0.5px 0.5px 4px #000000,
  var(--color13) -3.2px -3.2px 8px 0px inset;
}



.button-square__btn:active .button-square__text {
  transform: translateY(0.5px);
}

.button-square__align--top {
  padding-top: .6em;
  align-items: flex-start;
}

.button-square__align--center {
  align-items: center;
}

.button-square__align--left {
  align-items: flex-start;
  justify-content: start;
  padding-top: 6px;
  padding-left: 10px;
  font-size: 1.4em;

}

.button-square__led {
  position: absolute;
  bottom: 10px;
  right: 11px;
}

</style>
