export const useRegions = () => {
  const { items } = useItems();

  const regions = useState('regions', () => [])

  const savedRegions = useState('savedRegions', () => [])

  const loadRegions = () => {
    regions.value.clearRegions()
    for(const region of savedRegions.value) {
      console.log('region', region)
      regions.value.addRegion(region)
    }
  }

  const setRegion = (region: Object) => {
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
    console.log('22222', region)
    return regions.value.addRegion(region)
  }

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
    items.value.push({ id: newRegion.id, start, type: type.id, end });
  };

  const { player } = usePlayer()
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
      items.value = items.value.filter(r => r.id !== region.id);
    }
  };


  const updateRegionsList = (region) => {
    items.value.find(r => r.id === region.id).start = region.start;
    items.value.find(r => r.id === region.id).end = region.end;
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
}

