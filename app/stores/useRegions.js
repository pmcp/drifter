import { defineStore } from 'pinia'

export const useRegionsStore = defineStore("regions", () => {

  const PlayerStore = usePlayerStore()
  const { player } = storeToRefs(PlayerStore)

  const ItemsStore = useItemsStore()
  const { allItems } = storeToRefs(ItemsStore)

  const TabsStore = useTabsStore()
  const { showTabs, selectedTab } = storeToRefs(TabsStore)
  const { goToTabAndShow } = TabsStore


  const regions = ref([])
  const savedRegions = ref([])

  const loadRegions = () => {
    regions.value.clearRegions()
    for(const region of savedRegions.value) {
      regions.value.addRegion(region)
    }
  }



  const setRegion = (region) => {
    console.log('setRegion', region)
    if(region.key === 'sample' && regions.value.regions.length > 0) {
      savedRegions.value = regions.value.regions.map(r => ({
        start: r.start,
        end: r.end,
        color: r.color,
        id: r.id,
      }))
      // Clear all regions
      regions.value.clearRegions()
    }
    return regions.value.addRegion(region)
  }

  const addRegion = (type) => {
    const start = player.value.getCurrentTime()
    let end;
    if(type.regionType === 'range') end = start + 10
    console.log(end)
    return setRegion({
      start,
      end,
      type: type.id,
      // content: `New ${type.singular}`,
      color: type.color,
      resize: type.resize,
      drag: type.drag,
    })
  };


  const setRegionBound = (region, startOrEnd) => {
    if (player.value && regions.value) {
      const playerCurrentTime = player.value.getCurrentTime();
      const wavesurferRegion = regions.value.getRegions().find(r => r.id === region.id);
      if (wavesurferRegion) {
        if(startOrEnd === 'start') wavesurferRegion.setOptions({ start: playerCurrentTime });
        if(startOrEnd === 'end') wavesurferRegion.setOptions({ end: playerCurrentTime });
      }
    }
  };

  const removeRegion = (id) => {
    console.log('removeRegion', id)
    const regionToRemove = regions.value.getRegions().find(r => r.id === id);
    if (!regionToRemove) throw new Error(`Region with id ${id} not found`);
    console.log('regionToRemove', regionToRemove)
    regionToRemove.remove();
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

  const updateRegionStart = (region, newStartTime) => {

    const newStart = parseTime(newStartTime);
    if (regions.value) {
      const wavesurferRegion = regions.value.getRegions().find(r => r.id === region.id);
      if (wavesurferRegion) {
        wavesurferRegion.setOptions({ start: newStart });
        region.start = newStart;
      }
    }
  };

  return { regions, addRegion, setRegion, loadRegions, setRegionBound, removeRegion, updateRegionsList, updateRegionStart }

})
