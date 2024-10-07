// Pure function to check if two regions overlap
const isOverlapping = (region1, region2) =>
  region1.end > region2.start && region1.start < region2.end;

// Pure function to create a mix from two overlapping regions
const createMix = (region1, region2) => {
  return {
    trackIn: region1,
    trackOut: region2,
    start: Math.max(region1.start, region2.start),
    end: Math.min(region1.end, region2.end),
  }
};

// Pure function to find mixes
const findMixes = (regions: any) => {
  const sortedRegions = [...regions].sort((a, b) => a.start - b.start);
  return sortedRegions.reduce((mixes, region, index) => {
    const newMixes = sortedRegions.slice(index + 1)
      .filter(nextRegion => isOverlapping(region, nextRegion))
      .map(nextRegion => createMix(region, nextRegion));
    return [...mixes, ...newMixes];
  }, []);
};


export const useMixes = () => {
  const { items } = useItems()
  const mixes = computed(() => {
    const filteredRegions = items.value.filter(x => x.type === 'song')
    const mixes = findMixes(filteredRegions)
    return mixes
  })

  return { mixes }
}



