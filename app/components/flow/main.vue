<template>
  <div class="w-full h-full">
  <VueFlow aclass="flow w-full h-full"  :nodes="nodes"  :edges="edges" :connection-radius="30" auto-connect fit-view-on-init>
    <Background :patternColor="'black'"/>
    <MiniMap pannable zoomable />
    <Controls />
    <NodeToolbar :is-visible="true" position="left">
      <button>delete</button>
      <button>copy</button>
      <button>expand</button>
    </NodeToolbar>

    <template #node-sample="nodeProps">
      <Handle type="source" position="right" />
      <flow-node :item="nodeProps" :active="activeItemId === nodeProps.id" @click="setActiveItemId(nodeProps.id)"></flow-node>
      <Handle type="target" position="left" />

    </template>
  </VueFlow>
  </div>
</template>

<script setup>

import { Background } from '@vue-flow/background'
import { MiniMap } from '@vue-flow/minimap'
import { Controls } from '@vue-flow/controls'
import { NodeToolbar } from '@vue-flow/node-toolbar'


import { Handle, useHandleConnections, VueFlow, useVueFlow, Position, useNodesData,  } from '@vue-flow/core'

const NodesStore = useNodesStore()
const { nodes } = storeToRefs(NodesStore)
const { updateNode } = NodesStore

const EdgesStore = useEdgesStore()
const { edges } = storeToRefs(EdgesStore)

const { setRegion, loadRegions } = useRegionsStore()

const PlayerStore = usePlayerStore()
const { player, playerIsReady, playerIsPlaying } = storeToRefs(PlayerStore)

const playRegion = (region) => {
  if(!playerIsReady.value) return;
  setRegion({
    start: region.data.start,
    end: region.data.end,
    type: 'node',
    id: region.id,
  })
  player.value.setTime(region.data.start)
  player.value.play()
}


const stopRegion = (region) => {
  if(!playerIsReady.value) return;
  loadRegions()
  player.value.pause()
}

// All flow events
const {
  onNodeDrag,
  onEdgeDoubleClick,
} = useVueFlow()


onNodeDrag((value) => {
  updateNode(value.node)
})

onEdgeDoubleClick((value) => {
  playRegion(value.edge)
})

const ItemStore = useItemsStore()
const { activeItemId } = storeToRefs(ItemStore)
const { setActiveItemId } = ItemStore

</script>


<style>
/* TODO: Move to css */
/* import the necessary styles for Vue Flow to work */
@import '@vue-flow/core/dist/style.css';

/* import the default theme, this is optional but generally recommended */
@import '@vue-flow/core/dist/theme-default.css';

@import '@vue-flow/controls/dist/style.css';

</style>
