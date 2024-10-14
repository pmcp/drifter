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
    console.log('addRegion', id, start, end, type)

    const regionToAdd = {
      start: start,
      end: end,
      type: type.id,
      id: id,
      // content: `New ${type.singular}`,
      color: type.color,
      resize: type.resize,
      drag: type.drag,
    }
    console.log('REGIONTOADD', regionToAdd)

    const newRegion = setRegion(regionToAdd)
    console.log('newRegion', newRegion)

    return

  };



  const removeRegion = (id) => {
    const regionToRemove = regionsPlugin.value.getRegions().find(r => r.id === id);
    if (!regionToRemove) throw new Error(`Region with id ${id} not found`);
    regionToRemove.remove();
  };

  // Dont know if needed




  const loadRegions = () => {
    console.log('loadRegions')
    regionsPlugin.value.clearRegions()
    for(const region of savedRegions.value) {
      regionsPlugin.value.addRegion(region)
    }
  }

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




  const setRegionBound = (region, startOrEnd) => {
    if (player.value && regionsPlugin.value) {
      const playerCurrentTime = player.value.getCurrentTime();
      const wavesurferRegion = regionsPlugin.value.getRegions().find(r => r.id === region.id);
      if (wavesurferRegion) {
        if(startOrEnd === 'start') wavesurferRegion.setOptions({ start: playerCurrentTime });
        if(startOrEnd === 'end') wavesurferRegion.setOptions({ end: playerCurrentTime });
      }
    }
  };









  const updateRegionsList = (region) => {
    allItems.value.find(r => r.id === region.id).start = region.start;
    allItems.value.find(r => r.id === region.id).end = region.end;
  }

  const parseTime = (timeString) => {
    const [minutesSeconds, milliseconds] = timeString.split('.');
    const [minutes, seconds] = minutesSeconds.split(':');
    return parseInt(minutes) * 60 + parseInt(seconds) + parseInt(milliseconds) / 1000;
  };

  const updateRegionStartOrEnd = (regionId, newTime, startOrEnd) => {
    if (regionsPlugin.value) {
      const wavesurferRegion = regionsPlugin.value.getRegions().find(r => r.id === regionId);
      if(!wavesurferRegion) return;
      wavesurferRegion.setOptions({ [startOrEnd]: newTime })
    }
  };


  return { regionsPlugin, addRegion, setRegion, loadRegions, setRegionBound, removeRegion, updateRegionsList, updateRegionStartOrEnd }

})
