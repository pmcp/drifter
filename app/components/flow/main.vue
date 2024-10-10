<template>
  <div class="w-full h-full">
  <VueFlow aclass="flow w-full h-full"  :nodes="nodes"  :edges="edges" :connection-radius="30" auto-connect fit-view-on-init>
    <Background :patternColor="'black'"/>
<!--    <MiniMap pannable zoomable />-->
<!--    <Controls />-->
<!--    <NodeToolbar :is-visible="true" position="left">-->
<!--      <button>delete</button>-->
<!--      <button>copy</button>-->
<!--      <button>expand</button>-->
<!--    </NodeToolbar>-->

    <template #node-song="nodeProps">
      <div class="bg-red-100">
        <UCard >
<!--          <template #header>-->
<!--            <UButton v-if="!playerIsPlaying" @click="playRegion(nodeProps)" icon="i-heroicons-play"></UButton>-->
<!--            <UButton v-else @click="stopRegion(nodeProps)" icon="i-heroicons-stop"></UButton>-->
<!--          </template>-->
          {{ nodeProps.data.start.toFixed(2) }} - {{ nodeProps.data.end.toFixed(2) }}
        </UCard>
      </div>
    </template>
<!--    <template :key="id" #node-song-default="{id, data }">-->
<!--      <Handle type="target" :position="Position.Left" :on-connect="onConnect" />-->
<!--      <AudioPlayer v-if="data.src" :data="data" class="w-96" :src="data.src" :options="props.options" :nodeId="id">-->
<!--        <template v-slot:actionButtons>-->
<!--          <div class="p-4 flex gap-2">-->
<!--            <UiButtonRect @click="cloneNode(id)">-->
<!--              Clone-->
<!--            </UiButtonRect>-->
<!--            <UiButtonRect @click="removeNode(id)">-->
<!--              Remove-->
<!--            </UiButtonRect>-->
<!--          </div>-->
<!--        </template>-->

<!--        <template v-slot:sectionButtons>-->
<!--          <div class="p-4 flex gap-2" >-->
<!--            <UiButtonSquare @click="toggleSection(0, id)" :variation="2" align="left">-->
<!--              <template v-slot:label>-->
<!--                1-->
<!--              </template>-->
<!--            </UiButtonSquare>-->
<!--            <UiButtonSquare @click="toggleSection(1, id)" :variation="6" align="left">-->
<!--              <template v-slot:label>-->
<!--                2-->
<!--              </template>-->
<!--            </UiButtonSquare>-->
<!--            <UiButtonSquare @click="toggleSection(2, id)" :variation="4" align="left">-->
<!--              <template v-slot:label>-->
<!--                3-->
<!--              </template>-->
<!--            </UiButtonSquare>-->
<!--            <UiButtonSquare @click="toggleSection(3, id)" :variation="5" align="left">-->
<!--              <template v-slot:label>-->
<!--                4-->
<!--              </template>-->
<!--            </UiButtonSquare>-->
<!--          </div>-->
<!--        </template>-->


<!--      </AudioPlayer>-->
<!--      <Handle type="source" :position="Position.Right"  />-->
<!--    </template>-->
<!--    <Background />-->
<!--    &lt;!&ndash;    <MiniMap />&ndash;&gt;-->
<!--    <Controls />-->
<!--    &lt;!&ndash;    <PocControls />&ndash;&gt;-->
<!--    <template #connection-line="{ sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition }">-->
<!--      <FlowLineSnappable-->
<!--        :source-x="sourceX"-->
<!--        :source-y="sourceY"-->
<!--        :target-x="targetX"-->
<!--        :target-y="targetY"-->
<!--        :source-position="sourcePosition"-->
<!--        :target-position="targetPosition"-->
<!--      />-->
<!--    </template>-->

    <!--    <template #connection-line="{ sourceX, sourceY, targetX, targetY }">-->
    <!--      <FlowLine :source-x="sourceX" :source-y="sourceY" :target-x="targetX" :target-y="targetY" />-->
    <!--    </template>-->

    <!--    <FlowDropzoneBackground-->
    <!--        :style="{-->
    <!--          backgroundColor: isDragOver ? '#e7f3ff' : 'transparent',-->
    <!--          transition: 'background-color 0.2s ease',-->
    <!--        }"-->
    <!--    />-->
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

</script>


<style>
/* TODO: Move to css */
/* import the necessary styles for Vue Flow to work */
@import '@vue-flow/core/dist/style.css';

/* import the default theme, this is optional but generally recommended */
@import '@vue-flow/core/dist/theme-default.css';

@import '@vue-flow/controls/dist/style.css';

</style>
