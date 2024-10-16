import { defineStore } from 'pinia'

export const useRegionsStore = defineStore("regions", () => {

  const regionsPlugin = ref(null)
  const savedRegions = ref([])

  const PlayerStore = usePlayerStore()
  const { player } = storeToRefs(PlayerStore)

  const ItemsStore = useItemsStore()
  const { allItems } = storeToRefs(ItemsStore)

  const TabsStore = useTabsStore()
  const { showTabs, selectedTab } = storeToRefs(TabsStore)
  const { goToTabAndShow } = TabsStore

  const addRegion = (id, start, end, type) => {
    const regionToAdd = {
      start: start,
      end: end,
      type: type.id,
      id: id,
      color: type.color,
      resize: type.resize,
      drag: type.drag,
      // content: `New ${type.singular}`,
    }
    const newRegion = setRegion(regionToAdd)

  };

  const removeRegion = (id) => {
    const regionToRemove = regionsPlugin.value.getRegions().find(r => r.id === id);
    if (!regionToRemove) throw new Error(`Region with id ${id} not found`);
    regionToRemove.remove();
  };

  const updateRegionStartOrEnd = (regionId, newTime, startOrEnd) => {
    if (regionsPlugin.value) {
      const wavesurferRegion = regionsPlugin.value.getRegions().find(r => r.id === regionId);
      if(!wavesurferRegion) return;
      wavesurferRegion.setOptions({ [startOrEnd]: newTime })
    }
  };


  const setRegion = (region) => {
    if(region.key === 'sample' && regionsPlugin.value.regions.length > 0) {
      savedRegions.value = regionsPlugin.value.regions.map(r => ({
        start: r.start,
        end: r.end,
        color: r.color,
        id: r.id,
      }))
      // Clear all regions
      regionsPlugin.value.clearRegions()
    }

    return regionsPlugin.value.addRegion(region)
  }






  return {
    regionsPlugin,
    addRegion,
    setRegion,
    removeRegion,
    updateRegionStartOrEnd
  }

})
