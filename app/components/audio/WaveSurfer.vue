<template>

  <div class="w-full flex flex-col gap-2">
    <div ref="waveformRef" class="w-full"></div>
    <div v-if="!playerIsReady">
      <UProgress v-if="playerLoadingValue === 0" animation="carousel" />
      <UProgress v-else animation="carousel" :value="playerLoadingValue"/>
    </div>
    <div class="flex flex-row gap-2 items-center justify-between">
      <div class="">
        <UButton @click="togglePlayPause()" :disabled="!playerIsReady" class="w-20 flex flex-row justify-center">
          <span v-if="playerIsPlaying">Pause</span>
          <span v-else>Play</span>
        </UButton>

      </div>
      <div class="flex flex-row gap-2 items-center justify-between">
        <UButton @click="addRegion('comment')" :disabled="!playerIsReady" class="flex flex-row justify-center">
          Add comment {{ playerCurrentTime}}
        </UButton>
        <UButton @click="addRegion('song')" :disabled="!playerIsReady" class="flex flex-row justify-center">
          Add song at {{ playerCurrentTime}}
        </UButton>
      </div>
      <div>
        <span v-if="playerIsReady"> {{ playerCurrentTime }} / {{ playerTotalDuration }}</span>
      </div>
    </div>

    <div class="flex flex-row gap-2">


      <div class="flex flex-col gap-2 flex-grow">
        <UCard v-for="(region, index) in commentsList" :key="region.id">
          <template #header>
            <div class="flex flex-row gap-2 items-center justify-between mb-2">
              <span>{{ region.type }} {{ index +1 }}</span>
              <UButton
                icon="i-heroicons-trash"
                size="sm"
                color="primary"
                variant="outline"
                :trailing="false"
                @click="removeRegion(region)"
              />
            </div>
          </template>
          <UInput v-model="region.content" placeholder="Comment" />

        </UCard>
      </div>

      <div class="flex flex-col gap-2 flex-grow">
        <UCard v-for="(region, index) in songsList" :key="region.id">
          <template #header>
            <div class="flex flex-row gap-2 items-center mb-2">
              <span>{{ region.type }} {{ index +1 }}:</span>
              <UInput v-model="region.title" placeholder="Title" class="flex-grow"/>
              <UButton
                icon="i-heroicons-trash"
                size="sm"
                color="primary"
                variant="outline"
                :trailing="false"
                @click="removeRegion(region)"
              />
            </div>
          </template>
          <div class="flex flex-row gap-2 items-center justify-between mb-2">

            <UButton @click="setRegionBound(region, 'start')" :disabled="!playerIsReady" class="flex flex-row justify-center">
              Set start at {{ playerCurrentTime}}
            </UButton>

            <span>{{ formatTime(region.start) }} <span v-if="region.end">- {{ formatTime(region.end) }}</span></span>
            <UButton @click="setRegionBound(region, 'end')" :disabled="!playerIsReady" class="flex flex-row justify-center">
              Set end at {{ playerCurrentTime }}
            </UButton>
          </div>
          <UInput v-model="region.content" placeholder="Comment" />
          <template #footer>
            <UButton @click="createNode(region)" :disabled="!playerIsReady" class="flex flex-row justify-center">
              <span v-if="nodes.filter(x => x.id === region.id).length">Update Item in Flow</span>
              <span v-else>Add to Flow</span>
            </UButton>
          </template>
        </UCard>
</div>
      <div class="flex flex-col gap-2 flex-grow">
        <UCard v-for="(region, index) in mixList" :key="region.id">
          <template #header>
            <div class="flex flex-row gap-2 items-center mb-2">
              <span>Mix {{ index +1 }}:</span>
              <UInput v-model="region.title" placeholder="Title" class="flex-grow"/>
            </div>
          </template>
          <span>{{ formatTime(region.start) }} <span v-if="region.end">- {{ formatTime(region.end) }}</span></span>
          <div>
            From {{ region.trackIn.title }} to {{ region.trackOut.title }}
          </div>
          <template #footer>
            <UButton @click="createEdge(region)" :disabled="!playerIsReady" class="flex flex-row justify-center">
              Add to Flow
            </UButton>
          </template>
        </UCard>
      </div>
    </div>
  </div>




</template>
<script setup>
import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions.js';

const waveformRef = ref(null);

const {
  player,
  playerIsPlaying,
  playerIsReady,
  playerCurrentTime,
  playerTotalDuration
} = usePlayer()

const { regions, setRegion } = useRegions()
const { items } = useItems()

const { nodes, addNode } = useNodes()
const createNode = (region) => {
  addNode(region)
}
const { addEdge } = useEdges()

const createEdge = (region) => {

  // Check nodes for trackIn and trackOut
  // If not found, add it
  const trackInInNode = nodes.value.filter(x => x.id === region.trackIn.id).length === 0 && addNode(region.trackIn)
  const trackOutInNode = nodes.value.filter(x => x.id === region.trackOut.id).length === 0 && addNode(region.trackOut)
  addEdge(region)
}




// Only use shortcuts if not using inputs
const activeElement = useActiveElement()
const notUsingInput = computed(() =>
  activeElement.value?.tagName !== 'INPUT'
  && activeElement.value?.tagName !== 'TEXTAREA',)
const { space, c, s } = useMagicKeys()


const songsList = computed(() => {
  const filteredRegions = items.value.filter(x => x.type === 'song')
  const sortedRegions = filteredRegions.sort((a, b) => a.start - b.start)
  return sortedRegions
})

const commentsList = computed(() => {
  const filteredRegions = items.value.filter(x => x.type === 'comment')
  const sortedRegions = filteredRegions.sort((a, b) => a.start - b.start)
  return sortedRegions
})


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
const findMixes = (regions) => {
  const sortedRegions = [...regions].sort((a, b) => a.start - b.start);
  return sortedRegions.reduce((mixes, region, index) => {
    const newMixes = sortedRegions.slice(index + 1)
      .filter(nextRegion => isOverlapping(region, nextRegion))
      .map(nextRegion => createMix(region, nextRegion));
    return [...mixes, ...newMixes];
  }, []);
};



const mixList = computed(() => {
  const filteredRegions = items.value.filter(x => x.type === 'song')
  const mixes = findMixes(filteredRegions)
  return mixes
})

const props = defineProps({
  src: String,
  options: Object,
});

onMounted(() => {
  if (waveformRef.value) {
    regions.value = RegionsPlugin.create();

    player.value = WaveSurfer.create({
      container: waveformRef.value,
      ...props.options,
      plugins: [regions.value],
    });

    player.value.load(props.src);


    player.value.on('ready', (duration) => {
      console.log('ready', player.value, playerTotalDuration)
      playerTotalDuration.value = formatTime(player.value.getDuration())
      playerIsReady.value = true;
    })


    player.value.on('play', () => {
      playerIsPlaying.value = true;
    });

    player.value.on('pause', () => {
      playerIsPlaying.value = false;
    });

    /** When the user clicks on the waveform */
    player.value.on('seeking', (relativeX) => {
      playerCurrentTime.value = formatTime(player.value.getCurrentTime())
    })

    player.value.on('audioprocess', function() {
        playerCurrentTime.value = formatTime(player.value.getCurrentTime())
    });
    // Add event listener for region updates
    regions.value.on('region-updated', updateRegionsList);
  }


  // Only use space if not using inputs
  whenever(logicAnd(space, notUsingInput), () => {
    togglePlayPause()
    console.log('Tab has been pressed outside of inputs!')
  })

  whenever(logicAnd(c, notUsingInput), () => {
    addRegion('comment')
  })

  whenever(logicAnd(s, notUsingInput), () => {
    addRegion('song')
  })

});

onUnmounted(() => {
  if (player.value) {
    player.value.destroy();
  }
});



const togglePlayPause = () => {
  if (player.value) {
    player.value.playPause();
  }
};

const addRegion = (type) => {
  const start = player.value.getCurrentTime()
  let end;
  if(type === 'song') end = start + 100

  const newRegion = setRegion({
    start,
    end,
    type: type,
    content: `New ${type}`
  })
  items.value.push({ id: newRegion.id, start, type, end });

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
  console.log('updateRegionsList', region)
  items.value.find(r => r.id === region.id).start = region.start;
  items.value.find(r => r.id === region.id).end = region.end;
}
const formatTime = (seconds) => {
  return [seconds / 60, seconds % 60].map((v) => `0${Math.floor(v)}`.slice(-2)).join(':')
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
</script>

