<template>
  <div class="pane pane__wrapper">
    <div class="pane__content">
      <slot />
    </div>
    <div class="pane__overlay" />
  </div>
</template>
<style>
@import '/assets/styles/tokens.css';
.pane__wrapper {
  width: 100%;
  height: auto;
  background-color: var(--color7);
  color: var(--color1);
  position: relative;
  overflow: hidden;
  font-family: 'tech', sans-serif;
}
.pane__content {
  width: 100%;
  min-height: 4em;
  border-color: #323232;
  padding: var(--spacing);
  border-style: solid;
  border-width: 0 var(--spacing) 0 var(--spacing);
  display: flex;
  align-items: center;
  font-size: 1em;
  padding-left: 1em;

}

.pane__overlay {
  position: absolute;
  z-index: 1;
  top: 0;
  left: -1em;
  width: calc(61%);
  height: 400%;
  opacity: .4;
  background: linear-gradient(
      to bottom,
      rgba(255,255,255,.4) 0%,
      rgba(0,0,0,0) 13%
  );
  clip-path: polygon(100% 0, 0 0, 0 100%);
}
</style>
