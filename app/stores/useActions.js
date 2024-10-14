import { defineStore } from 'pinia'
import {v4 as uuidv4} from 'uuid';



export const useActionsStore = defineStore("actions", () => {

  const PlayerStore = usePlayerStore()
  const { playerIsReady, player } = storeToRefs(PlayerStore)
  const { initPlayer } = PlayerStore

  const RegionsStore = useRegionsStore()
  const { addRegion, removeRegion } = RegionsStore

  const ItemsStore = useItemsStore()
  const { allItems, types, activeItemId } = storeToRefs(ItemsStore)
  const { addToItemsAndMakeActive, removeFromItemsAndDisactivate } = ItemsStore

  const TabsStore = useTabsStore()
  // const { allItems, types } = storeToRefs(TabsStore)
  const { goToTabAndShow } = TabsStore

  const NodesStore = useNodesStore()
  const { addNode, removeNode } = NodesStore

  const checkIfEverythingIsReady = () => {
    if(!playerIsReady) return false;
    return true;
  }

  const addItem = async (type) => {
    if(!checkIfEverythingIsReady()) return;

    try {
      const itemToCreate =  {
        id: uuidv4(),
        start: player.value.getCurrentTime(),
        type: type.id,
        hasNode: false,
        regionId: uuidv4(),
      }
      // TODO: Make the time to add for range a setting or a something dynamic based on visible px or something?
      if(type.regionType === 'range') itemToCreate.end = itemToCreate.start + 1

      addRegion(itemToCreate.regionId, itemToCreate.start, itemToCreate.end, type)

      if(type.id === 'sample') {
        itemToCreate.hasNode = true
        addNode(itemToCreate)
      }

      addToItemsAndMakeActive(itemToCreate)
      goToTabAndShow(types.value.findIndex(x => x.id === type.id))

    } catch (error) {
      console.error('⛔ useActions - addItem:  error', error)
    }
  }

  const removeItem = async (itemId) => {
    console.log('✅ useActions - removeItem: itemId', itemId)
    if(!checkIfEverythingIsReady()) return;

    try {
      const item = allItems.value.filter(x => x.id === itemId)[0]
      if(item.hasNode) removeNode(item.id)
      removeRegion(item.regionId)
      removeFromItemsAndDisactivate(item.id)
    } catch (error) {
      console.error('⛔ useActions - removeItem:error', error)
    }
  }

  const setActiveItem = async (itemId) => {
    activeItemId.value = itemId;
    if(itemId === null) return;
    const item = allItems.value.find(x => x.id === itemId)
    if(item) goToTabAndShow(types.value.findIndex(x => x.id === item.type))
  }

  const mountPlayer = () => {
    initPlayer()
  }

  return { addItem, removeItem, setActiveItem, mountPlayer }
})
