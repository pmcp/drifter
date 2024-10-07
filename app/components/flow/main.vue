<template>
  <VueFlow class="flow w-full min-h-screen" :nodes="nodes" :connection-radius="30" auto-connect fit-view-on-init>
    <template #node-song="nodeProps">
      <div class="bg-red-100">
        {{ nodeProps.id}}
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

</template>

<script setup>
import { Handle, useHandleConnections, VueFlow, useVueFlow, Position, useNodesData,  } from '@vue-flow/core'

const { nodes, updateNode } = useNodes()
const { edges } = useEdges()


// All flow events
const {
  onNodeDragStart,
  onNodeDrag,
  onNodeDragStop,
  onNodeClick,
  onNodeDoubleClick,
  onNodeContextMenu,
  onNodeMouseEnter,
  onNodeMouseLeave,
  onNodeMouseMove,
  onConnect,
  addEdges,
  onEdgeDoubleClick,
  getConnectedEdges
} = useVueFlow()


onNodeDrag((value) => {
  updateNode(value.node)
})



</script>


<style>
/* TODO: Move to css */
/* import the necessary styles for Vue Flow to work */
@import '@vue-flow/core/dist/style.css';

/* import the default theme, this is optional but generally recommended */
@import '@vue-flow/core/dist/theme-default.css';
</style>
