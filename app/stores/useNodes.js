import { defineStore } from 'pinia'
export const useNodesStore = defineStore("nodes", () => {

  const nodes = ref([])
  const addNode = (node) => {
    console.log('adding node', node, nodes.value)
    // If node already exists, update it
    const index = nodes.value.findIndex(n => n.id === node.id)
    if (index > -1) {
      console.log('updating node', node, nodes.value[index])
      nodes.value[index].data = {
        start: node.start,
        end: node.end,
      }
    } else {
      nodes.value.push({
        id: node.id,
        type: node.type,
        position: node.position || { x: 0, y: 0 },
        data: {
          start: node.start,
          end: node.end,
        },
      })
    }
  }

  const updateNode = (node) => {
    const index = nodes.value.findIndex(n => n.id === node.id)
    if (index > -1) {
      nodes.value[index] = node
    }
  }


  return { nodes, addNode, updateNode }

})
