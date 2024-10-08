export const useRegions = () => {
  const regionTypes = {
    comment: {
      color: 'rgba(255, 199, 0, 0.8)',
      options: {
        resize: false,
        drag: true
      }
    },
    song: {
      color: 'rgba(51, 255, 224, 0.5)',
      options: {
        resize: true,
        drag: true
      }
    },
    node: {
      color: 'rgba(230, 0, 0, 0.5)',
      options: {
        resize: false,
        drag: false
      }
    }
  }

  const regions = useState('regions', () => [])

  const savedRegions = useState('savedRegions', () => [])


  const setRegion = (region: Object) => {
    console.log('setRegion', region)
    if(region.type === 'node' && regions.value.regions.length > 0) {
      // Save the regions
      savedRegions.value = regions.value.regions.map(r => ({
        start: r.start,
        end: r.end,
        color: r.color,
        id: r.id,
      }))
      console.log('savedRegions', savedRegions.value)
      // Clear all regions
      regions.value.clearRegions()
    }

    const theRegion = {
      start:region.start,
      end: region.end,
      color: regionTypes[region.type].color,
      content: 'test',
      ...regionTypes[region.type].options
    }

    return regions.value.addRegion(theRegion)
  }


  const loadRegions = () => {
    regions.value.clearRegions()
    for(const region of savedRegions.value) {
      console.log('region', region)
      regions.value.addRegion(region)
    }
  }


  const { items } = useItems()
  const addRegion = (type) => {
    const start = player.value.getCurrentTime()
    let end;
    if(type === 'song') end = start + 10
    console.log('adding region', type, start, end)
    const newRegion = setRegion({
      start,
      end,
      type: type,
      content: `New ${type}`
    })
    items.value.push({ id: newRegion.id, start, type, end });

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
      if (regionToRemove) {
        regionToRemove.remove();
      }
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

