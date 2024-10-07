export const useItems = () => {
  const items = useState('items', () => [])

  return { items }
}

