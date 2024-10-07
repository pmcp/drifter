export const useEdges = () => {
  const edges = useState('edges', () => [])
  const addEdge = (edge: Object) => {
    edges.value.push(edge)
  }

  return { edges, addEdge }
}

