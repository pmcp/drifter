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

  return { edges, addEdge }
}
