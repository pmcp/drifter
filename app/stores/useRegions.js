import { defineStore } from 'pinia'

export const useRegionsStore = defineStore("regions", () => {

  const PlayerStore = usePlayerStore()
  const { player } = storeToRefs(PlayerStore)

  const regions = ref([])
  const savedRegions = ref([])

  const ItemsStore = useItemsStore()
  const { allItems } = storeToRefs(ItemsStore)



  const loadRegions = () => {
    regions.value.clearRegions()
    for(const region of savedRegions.value) {
      regions.value.addRegion(region)
    }
  }



  const setRegion = (region) => {
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

// TODO: Make addRegion async so it can return
  const addRegion = (type) => {
    const start = player.value.getCurrentTime()
    let end;
    if(type.regionType === 'range') end = start + 10
    const newRegion = setRegion({
      start,
      end,
      type: type.key,
      // content: `New ${type.singular}`,
      color: type.color,
      resize: type.resize,
      drag: type.drag,
    })
    allItems.value.push({ id: newRegion.id, start, type: type.id, end });
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

  const removeRegion = (region) => {
    if (regions.value) {
      // Remove region from wavesurfer
      const regionToRemove = regions.value.getRegions().find(r => r.id === region.id);
      if (regionToRemove) regionToRemove.remove();
      // Remove region from list
      allItems.value = allItems.value.filter(r => r.id !== region.id);
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
