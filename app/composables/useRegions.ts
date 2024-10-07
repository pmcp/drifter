export const useRegions = () => {
  const regionTypes = {
    comment: {
      color: 'rgba(255, 0, 0, 0.8)',
      options: {
        resize: false,
        drag: true
      }
    },
    song: {
      color: 'rgba(200, 0, 0, 0.8)',
      options: {
        resize: true,
        drag: true
      }
    },
    node: {
      color: 'green',
      options: {
        resize: false,
        drag: false
      }
    }
  }

  const regions = useState('regions', () => [])

  const savedRegions = useState('savedRegions', () => [])


  const setRegion = (region: Object) => {
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

    return regions.value.addRegion({
      start:region.start,
      end: region.end,
      color: regionTypes[region.type].color,
      content: 'test',
      ...regionTypes[region.type].options
    })
  }

  const loadRegions = () => {
    console.log('loadRegions', savedRegions.value)
    console.log('regions', regions.value)
    regions.value.clearRegions()
    for(const region of savedRegions.value) {
      console.log('region', region)
      regions.value.addRegion(region)
    }
  }




  return { regions, setRegion, loadRegions }
}

