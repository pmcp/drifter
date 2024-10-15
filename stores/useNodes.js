import { defineStore } from 'pinia'


export const useNodesStore = defineStore("nodes", () => {


    // someHelper()
  const nodes = ref([])

  const thePositionToOffsetIfOverlapping = { x: 10, y: 10 }

  const findFreePosition = (position) => {
    const nodeAtPosition = nodes.value.find(n => n.position.x === position.x && n.position.y === position.y)
    if(nodeAtPosition) {
      // if there is a node at the same position, offset the position
      const newPosition = { x: position.x + thePositionToOffsetIfOverlapping.x, y: position.y + thePositionToOffsetIfOverlapping.y }
      return findFreePosition(newPosition)
    }
    return position
  }


  const addNode = (node) => {
    // check if there is a node at the same position.
    // If so, change the position to avoid overlapping
    // loop all nodes and check if there is a node at the same position
    if(!node.position) {
      node.position = findFreePosition({ x: 0, y: 0 })
      console.log('node.position', node.position)
    }

    nodes.value.push({
      id: node.id,
      type: node.type,
      position: node.position,
      data: {
        start: node.start,
        end: node.end,
      },
    })
  }

  const updateNode = (node) => {
    const index = nodes.value.findIndex(n => n.id === node.id)
    if (index > -1) {
      nodes.value[index] = node
    }
  }

  const removeNode = (id) => {
    const index = nodes.value.findIndex(n => n.id === id)
    if (index > -1) {
      nodes.value.splice(index, 1)
    }
  }

  return { nodes, addNode, updateNode, removeNode }

}
, {
    persist: {
      storage: piniaPluginPersistedstate.localStorage(),
      pick: ['nodes'],
    }
  }
)

// useNodesStore.useCRDT()
