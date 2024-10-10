export const useItems = () => {
  const types = useState('types', () => [])

  types.value = [
    {
      id: 'samples',
      title: 'samples',
      icon: 'i-heroicons-puzzle-piece',
      description: 'Moments you selected from your sets.'
    },
    {
      id: 'notes',
      title: 'comments',
      icon: 'i-heroicons-chat-bubble-bottom-center-text',
      description: 'Notes and comments you added to your sets.'
    }, {
      id: 'tracks',
      title: 'tracks',
      icon: 'i-heroicons-musical-note',
      description: 'Tracks that appear in your sets.'
    },
    {
      id: 'sets',
      title: 'mixes',
      icon: 'i-heroicons-radio',
      description: 'Your sets.'
    }
  ]

  return { types }
}

