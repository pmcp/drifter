import { defineStore } from 'pinia'


export const useEdgesStore = defineStore("edges", () => {
  const { nodes, addNode } = useNodesStore()

  const edges = ref(null)

  const handleEdgesChange = (changedEdges) => {
    console.log('handleEdgesChange', changedEdges)
    if(changedEdges.length < 1) return;

    for (const changedEdge of changedEdges) {
      const changeType = changedEdge.type
      const edge = changedEdge.item

      if(changeType === 'add') {
        edge.data.inChain = false
        if(edges.value === null) edges.value = [edge]
        edges.value = [...edges.value, edge]
      }

      if(changeType === 'remove') {
        edges.value = edges.value.filter(x => x.id !== changedEdge.id)
      }
    }
  }

  return { edges, handleEdgesChange }
}
  , {
    persist: {
      storage: piniaPluginPersistedstate.localStorage(),
      pick: ['edges'],
    }}
)
