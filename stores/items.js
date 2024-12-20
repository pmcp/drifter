import { defineStore } from 'pinia'

export const useItemsStore = defineStore("items", () => {
  const allItems = ref([])
  const types = ref([])
  const activeItemId = ref(null)

  types.value = [
    {
      id: 'sample',
      title: 'samples',
      singular: 'sample',
      regionType: 'range',
      icon: 'i-heroicons-puzzle-piece',
      description: 'Moments you selected from your sets.',
      hasRegions: true,
      color: 'rgba(34, 197, 94, 0.6)',
      resize: true,
      drag: false,
    },
    {
      id: 'note',
      title: 'notes',
      singular: 'note',
      regionType: 'marker',
      icon: 'i-heroicons-chat-bubble-bottom-center-text',
      description: 'Notes and comments you added to your sets.',
      hasRegions: true,
      color: 'rgba(255, 199, 0, 1)',
      resize: true,
      drag: true,
    }, {
      id: 'track',
      title: 'tracks',
      singular: 'track',
      regionType: 'marker',
      icon: 'i-heroicons-musical-note',
      description: 'Tracks that appear in your sets.',
      hasRegions: true,
      color: 'rgba(51, 255, 224, 1)',
      resize: false,
      drag: true,
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


  const addToItemsAndMakeActive = (item) => {
    allItems.value.push({
      id: item.id,
      start: item.start,
      type: item.type,
      end: item.end,
      regionId: item.regionId,
      hasNode: item.hasNode,
      inChain: item.inChain,
      playing: item.playing,
    });
    activeItemId.value = item.id;

  }


  const removeFromItemsAndDisactivate = (itemId) => {
    allItems.value = allItems.value.filter(item => item.id !== itemId);
    activeItemId.value = null;
  }

  const activeItem = computed(() => allItems.value.filter(item => item.id === activeItemId.value)[0])


  return { types, allItems, addToItemsAndMakeActive, removeFromItemsAndDisactivate, activeItemId, activeItem}
}
  , {
  persist: {
    storage: piniaPluginPersistedstate.localStorage(),
    pick: ['allItems'],
  }}
)

