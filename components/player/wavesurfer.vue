<template>
  <div class="relative">
    <div ref="waveformRef" class="h-full" :class="{'opacity-0': playerLoadingValue === 0}"></div>
    <div v-if="!playerIsReady" class="px-2 absolute w-full h-full top-0 left-0 flex justify-center items-center" >

      <UProgress v-if="playerLoadingValue === 0" animation="carousel" :value="playerLoadingValue"/>
      <UProgress v-else animation="carousel"/>
    </div>
  </div>
</template>
<script setup>

const playerStore = usePlayerStore()
const {
  waveformRef,
  playerSrc,
  player,
  playerLoadingValue,
  playerIsReady
} = storeToRefs(playerStore)
const { destroyPlayer, togglePlayPause } = playerStore

const { mountPlayer } = useActionsStore()

const keysStore = useKeysStore()
const { setShortcutKeys } = keysStore

onMounted(() => {
  playerSrc.value = 'testsong.m4a'
  mountPlayer()
  setShortcutKeys()

});

onUnmounted(() => {
  destroyPlayer()
});


</script>

<style>
div::part(region) {
  top: 90%;
  background: #22C55E;
  /*background: linear-gradient(0deg, rgba(2,0,36,0) 0%, rgba(34,197,94,1) 50%);*/
  /*background: linear-gradient(180deg, rgba(2, 0, 36, 0) 0%, rgba(9, 9, 121, 1) 67%, rgba(0, 212, 255, 1) 100%);*/
  height: 11px;
  z-index: 1;
}


div::part(region):hover {
  background: red;
}


#waveform ::part(cursor):after {
  content: '🏄';
  font-size: 1.5em;
  position: absolute;
  left: 0;
  top: -28px;
  transform: translateX(-50%);
}


/*div::part(region-handle-left) {*/
/*  background: red;*/
/*}*/

div::part(marker) {
  /*background-color: rgba(0, 0, 100, 0.25) !important;*/
  /*border: 1px solid #fff;*/

  /*padding: 1px;*/


}

div::part(marker):before {
  /*background-color: rgba(0, 0, 100, 0.25) !important;*/
  /*border: 1px solid #fff;*/
  /*content: '🏄';*/
  /*position: absolute;*/
  /*top: -10px;*/
  /*z-index: 100;*/
  /*padding: 1px;*/


}
</style>
