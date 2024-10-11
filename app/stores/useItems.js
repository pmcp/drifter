import { defineStore } from 'pinia'

export const useItemsStore = defineStore("items", () => {
  const allItems = ref([])
  const types = ref([])

  types.value = [
    {
      id: 'sample',
      title: 'samples',
      singular: 'sample',
      regionType: 'range',
      icon: 'i-heroicons-puzzle-piece',
      description: 'Moments you selected from your sets.',
      hasRegions: true,
      color: 'rgba(230, 0, 0, 0.5)',
      resize: true,
      drag: true
    },
    {
      id: 'note',
      title: 'notes',
      singular: 'note',
      regionType: 'marker',
      icon: 'i-heroicons-chat-bubble-bottom-center-text',
      description: 'Notes and comments you added to your sets.',
      hasRegions: true,
      color: 'rgba(255, 199, 0, 0.8)',
      resize: true,
      drag: true
    }, {
      id: 'track',
      title: 'tracks',
      singular: 'track',
      regionType: 'marker',
      icon: 'i-heroicons-musical-note',
      description: 'Tracks that appear in your sets.',
      hasRegions: true,
      color: 'rgba(51, 255, 224, 0.5)',
      resize: false,
      drag: true
    },
    {
      id: 'set',
      type: 'set',
      title: 'sets',
      singular: 'set',
      regionType: 'marker',
      icon: 'i-heroicons-radio',
      description: 'Your sets.',
      hasRegions: false,
    }
  ]

  return { types, allItems }
})

