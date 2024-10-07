export const useEdges = () => {
  const edges = useState('edges', () => [])
  const addEdge = (edge: Object) => {
    console.log('addEdge', edge)
    edges.value.push({
      id: `mix--${edge.trackIn.id}->${edge.trackOut.id}`,
      source: edge.trackIn.id,
      target: edge.trackOut.id,
      type: 'mix',
      data: {
        start: edge.start,
        end: edge.end,
        trackIn: edge.trackIn.id,
        trackOut: edge.trackOut.id,
      }
    })
  }

  const { nodes, addNode } = useNodes()
  const createEdge = (region) => {

    // Check nodes for trackIn and trackOut
    // If not found, add it
    const trackInInNode = nodes.value.filter(x => x.id === region.trackIn.id).length === 0 && addNode(region.trackIn)
    const trackOutInNode = nodes.value.filter(x => x.id === region.trackOut.id).length === 0 && addNode(region.trackOut)
    addEdge(region)
  }


  return { edges, addEdge, createEdge }
}
