import { defineStore } from 'pinia'

export const useItemsStore = defineStore("items", () => {
  const items = ref([])
  const types = ref([])

  types.value = [
    {
      key: 'sample',
      title: 'samples',
      singular: 'sample',
      regionType: 'range',
      icon: 'i-heroicons-puzzle-piece',
      description: 'Moments you selected from your sets.',
      color: 'rgba(230, 0, 0, 0.5)',
      resize: true,
      drag: true
    },
    {
      key: 'note',
      title: 'notes',
      singular: 'note',
      regionType: 'marker',
      icon: 'i-heroicons-chat-bubble-bottom-center-text',
      description: 'Notes and comments you added to your sets.',
      color: 'rgba(255, 199, 0, 0.8)',
      resize: true,
      drag: true
    }, {
      key: 'track',
      title: 'tracks',
      singular: 'track',
      regionType: 'marker',
      icon: 'i-heroicons-musical-note',
      description: 'Tracks that appear in your sets.',
      color: 'rgba(51, 255, 224, 0.5)',
      resize: false,
      drag: true
    },
    {
      type: 'set',
      title: 'sets',
      singular: 'set',
      regionType: 'marker',
      icon: 'i-heroicons-radio',
      description: 'Your sets.'
    }
  ]

  const addItem = (type) => {
    console.log('addItem', type)
  }
  return { types, items, addItem }

})

