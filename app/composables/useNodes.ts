export const useNodes = () => {
  const nodes = useState('nodes', () => [])
  const addNode = (node: Object) => {
    console.log('adding node', node, nodes.value)
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

  const updateNode = (node: Object) => {
    console.log('updating node', node, nodes.value)
    const index = nodes.value.findIndex(n => n.id === node.id)
    if (index > -1) {
      nodes.value[index] = node
    }
  }


  return { nodes, addNode, updateNode }
}

