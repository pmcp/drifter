<template>
  <div class="hole">
    <slot />
  </div>
</template>
<style>
.hole {
  width: 20px;
  height: 20px;
  display: inline-block;
  border-radius: 50%;
  border:1px solid currentColor;
  box-shadow: inset 2px 2px 4px currentColor, inset -1px -1px 2px currentColor;
}
</style>