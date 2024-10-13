import { defineStore } from 'pinia'
export const useActionsStore = defineStore("actions", () => {


  const PlayerStore = usePlayerStore()
  const { playerIsReady } = storeToRefs(PlayerStore)

  const RegionsStore = useRegionsStore()
  // const { allItems, types } = storeToRefs(ItemsStore)
  const { addRegion, removeRegion } = RegionsStore

  const ItemsStore = useItemsStore()
  const { types, activeItemId } = storeToRefs(ItemsStore)
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
      const newRegion = addRegion(type)
      const newItem =  {
        ...newRegion,
        type: type.id,
        hasNode: false
      }
      if(type.id === 'sample') {
        newItem.hasNode = true
        addNode(newItem)
      }
      addToItemsAndMakeActive(newItem)
      goToTabAndShow(types.value.findIndex(x => x.id === type.id))

    } catch (error) {
      console.error('⛔ useActions - addItem:  error', error)
    }
  }

  const removeItem = async (itemId, hasNode) => {
    console.log('✅ useActions - removeItem: itemId', itemId, hasNode)
    if(!checkIfEverythingIsReady()) return;

    try {
      if(hasNode) removeNode(itemId)
      removeRegion(itemId)
      removeFromItemsAndDisactivate(itemId)
    } catch (error) {
      console.error('⛔ useActions - removeItem:error', error)
    }
  }

  const setActiveItem = async (itemId) => {
    activeItemId.value = itemId;
    if(itemId === null) return;
    goToTabAndShow(0)
  }



  return { addItem, removeItem, setActiveItem }
})
