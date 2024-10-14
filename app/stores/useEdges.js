import { defineStore } from 'pinia'


export const useEdgesStore = defineStore("edges", () => {
  const { nodes, addNode } = useNodesStore()

  const edges = ref(null)

  const handleEdgesChange = (changedEdges) => {
    if(changedEdges.length < 1) return;

    for (const changedEdge of changedEdges) {
      const changeType = changedEdge.type
      const edge = changedEdge.item
      if(changeType === 'add') {
        if(edges.value === null) edges.value = [edge]
        edges.value = [...edges.value, edge]
      }

    }
  }

  // DONT KNOW IF STILL NEEDED


  // const addEdge = (edge) => {
  //   edges.value.push({
  //     id: `mix--${edge.trackIn.id}->${edge.trackOut.id}`,
  //     source: edge.trackIn.id,
  //     target: edge.trackOut.id,
  //     type: 'step',
  //     data: {
  //       start: edge.start,
  //       end: edge.end,
  //       trackIn: edge.trackIn.id,
  //       trackOut: edge.trackOut.id,
  //     }
  //   })
  // }
  //
  // const createEdge = (region) => {
  //   // Check nodes for trackIn and trackOut
  //   // If not found, add it
  //   const trackInInNode = nodes.value.filter(x => x.id === region.trackIn.id).length === 0 && addNode(region.trackIn)
  //   const trackOutInNode = nodes.value.filter(x => x.id === region.trackOut.id).length === 0 && addNode(region.trackOut)
  //   addEdge(region)
  // }

  return { edges, handleEdgesChange }
}
  , {
    persist: {
      storage: piniaPluginPersistedstate.localStorage(),
      pick: ['edges'],
    }}
)
