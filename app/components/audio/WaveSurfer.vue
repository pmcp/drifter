<template>

  <div class="w-full flex flex-col gap-2">
    <div ref="waveformRef" class="w-full"></div>
    <div v-if="!ready">
      <UProgress v-if="loadingValue === 0" animation="carousel" />
      <UProgress v-else animation="carousel" :value="loadingValue"/>
    </div>
    <div class="flex flex-row gap-2 items-center justify-between">
      <div class="">
        <UButton @click="togglePlayPause()" :disabled="!ready" class="w-20 flex flex-row justify-center">
          <span v-if="isPlaying">Pause</span>
          <span v-else>Play</span>
        </UButton>

      </div>
      <div class="flex flex-row gap-2 items-center justify-between">
        <UButton @click="addRegion('comment')" :disabled="!ready" class="flex flex-row justify-center">
          Add comment {{ currentTime}}
        </UButton>
        <UButton @click="addRegion('song')" :disabled="!ready" class="flex flex-row justify-center">
          Add song at {{ currentTime}}
        </UButton>
      </div>
      <div>
        <span v-if="ready"> {{ currentTime }} / {{ totalDuration }}</span>
      </div>
    </div>

    <div class="flex flex-row gap-2">


      <div class="flex flex-col gap-2 flex-grow">
        <UCard v-for="(region, index) in commentsList" :key="region.id">
          {{ region.type }} {{ index +1 }} - {{ formatTime(region.start) }}
          <UInput v-model="region.content" placeholder="Comment" />
        </UCard>
      </div>

      <div class="flex flex-col gap-2 flex-grow">
        <UCard v-for="(region, index) in songsList" :key="region.id">
          <template #header>
            <div class="flex flex-row gap-2 items-center mb-2">
              <span>{{ region.type }} {{ index +1 }}:</span>
              <UInput v-model="region.title" placeholder="Title" class="flex-grow"/>
            </div>
          </template>
          <div class="flex flex-row gap-2 items-center justify-between mb-2">

            <UButton @click="setRegionBound(region, 'start')" :disabled="!ready" class="flex flex-row justify-center">
              Set start at {{ currentTime}}
            </UButton>

            <span>{{ formatTime(region.start) }} <span v-if="region.end">- {{ formatTime(region.end) }}</span></span>
            <UButton @click="setRegionBound(region, 'end')" :disabled="!ready" class="flex flex-row justify-center">
              Set end at {{ currentTime }}
            </UButton>
          </div>
          <UInput v-model="region.content" placeholder="Comment" />

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
        </UCard>
      </div>
    </div>
  </div>




</template>
<script setup>
import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions.js';

const waveformRef = ref(null);
const waveSurfer = ref(null);
const isPlaying = ref(false);
const regions = ref(null);
const regionsList = ref([]);

const ready = ref(false)
const loadingValue = ref(0)

const currentTime = ref('00:00')
const totalDuration = ref('00:00')


const regionTypes = {
  comment: {
    color: 'rgba(255, 0, 0, 0.8)',
  },
  song: {
    color: 'rgba(200, 0, 0, 0.8)',
  }
}

const songsList = computed(() => {
  const filteredRegions = regionsList.value.filter(x => x.type === 'song')
  const sortedRegions = filteredRegions.sort((a, b) => a.start - b.start)
  return sortedRegions
})

const commentsList = computed(() => {
  const filteredRegions = regionsList.value.filter(x => x.type === 'comment')
  const sortedRegions = filteredRegions.sort((a, b) => a.start - b.start)
  return sortedRegions
})






// Pure function to create a region
const createRegion = (start, end) => ({ start, end });

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
  console.log('findMixes', regions)
  const sortedRegions = [...regions].sort((a, b) => a.start - b.start);
  console.log('sortedRegions', sortedRegions)
  return sortedRegions.reduce((mixes, region, index) => {
    console.log('index', index)
    const newMixes = sortedRegions.slice(index + 1)
      .filter(nextRegion => isOverlapping(region, nextRegion))
      .map(nextRegion => createMix(region, nextRegion));
    return [...mixes, ...newMixes];
  }, []);
};



const mixList = computed(() => {
  const filteredRegions = regionsList.value.filter(x => x.type === 'song')

  const mixes = findMixes(filteredRegions)

  console.log('mixes', mixes)
  // const orderdMixes = mixes.sort((a, b) => a.start - b.start)

  return mixes
})


const props = defineProps({
  src: String,
  options: Object,
});

onMounted(() => {
  if (waveformRef.value) {
    regions.value = RegionsPlugin.create();

    waveSurfer.value = WaveSurfer.create({
      container: waveformRef.value,
      ...props.options,
      plugins: [regions.value],
    });

    waveSurfer.value.load(props.src);


    waveSurfer.value.on('ready', (duration) => {
      console.log('ready')
      totalDuration.value = formatTime(waveSurfer.value.getDuration())
      ready.value = true;
    })


    waveSurfer.value.on('play', () => {
      isPlaying.value = true;
    });

    waveSurfer.value.on('pause', () => {
      isPlaying.value = false;
    });

    /** When the user clicks on the waveform */
    waveSurfer.value.on('seeking', (relativeX) => {
      currentTime.value = formatTime(waveSurfer.value.getCurrentTime())
    })

    waveSurfer.value.on('audioprocess', function() {
        currentTime.value = formatTime(waveSurfer.value.getCurrentTime())
    });
    // Add event listener for region updates
    regions.value.on('region-updated', updateRegionsList);
  }
});

onUnmounted(() => {
  if (waveSurfer.value) {
    waveSurfer.value.destroy();
  }
});



const togglePlayPause = () => {
  if (waveSurfer.value) {
    waveSurfer.value.playPause();
  }
};

const addRegion = (type) => {
  console.log('addRegion', type)
  const start = waveSurfer.value.getCurrentTime()
  let end;
  if(type === 'song') end = start + 300
  if (regions.value) {
    const newRegion = regions.value.addRegion({
      start,
      end,
      color: regionTypes[type].color,
      content: `New ${type}`
    });

    console.log('newRegion', newRegion)
    regionsList.value.push({ id: newRegion.id, start, type, end });
  }
};

const addMarker = () => {
  if (waveSurfer.value) {
    const currentTime = waveSurfer.value.getCurrentTime();
    addRegion(currentTime, currentTime + 0.1);
  }
};

const updateRegionsList = (region) => {
  console.log('updateRegionsList', region)
  regionsList.value.find(r => r.id === region.id).start = region.start;
  regionsList.value.find(r => r.id === region.id).end = region.end;
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
  if (waveSurfer.value && regions.value) {
    const currentTime = waveSurfer.value.getCurrentTime();
    const wavesurferRegion = regions.value.getRegions().find(r => r.id === region.id);
    if (wavesurferRegion) {
      if(startOrEnd === 'start') wavesurferRegion.setOptions({ start: currentTime });
      if(startOrEnd === 'end') wavesurferRegion.setOptions({ end: currentTime });
    }
  }
};
</script>












<!--<template>-->

<!--  <div class="w-full flex flex-col gap-2">-->
<!--    <div ref="waveformRef" class="w-full"></div>-->
<!--    <div v-if="!ready">-->
<!--      <UProgress v-if="loadingValue === 0" animation="carousel" />-->
<!--      <UProgress v-else animation="carousel" :value="loadingValue"/>-->
<!--    </div>-->
<!--    <div class="flex flex-row gap-2 items-center justify-between">-->
<!--      <div class="">-->
<!--        <UButton @click="togglePlay()" :disabled="!ready" class="w-20 flex flex-row justify-center">-->
<!--          <span v-if="isPlaying">Pause</span>-->
<!--          <span v-else>Play</span>-->
<!--        </UButton>-->

<!--      </div>-->
<!--      <div class="flex flex-row gap-2 items-center justify-between">-->
<!--        <UButton @click="addRegion('comment')" :disabled="!ready" class="flex flex-row justify-center">-->
<!--          Create comment {{ currentTime}}-->
<!--        </UButton>-->
<!--        <UButton @click="addRegion('song')" :disabled="!ready" class="flex flex-row justify-center">-->
<!--          Start song at {{ currentTime}}-->
<!--        </UButton>-->
<!--      </div>-->
<!--      <div>-->
<!--        <p> {{ currentTime }} / {{ totalDuration }}</p>-->
<!--      </div>-->
<!--    </div>-->


<!--    <div class="flex flex-col gap-2 ">-->
<!--      <UCard v-for="(region, index) in commentsList" :key="region.id">-->
<!--        {{ region.type }} {{ index +1 }} - {{ formatTime(region.start) }}-->
<!--        <UInput v-model="region.content" placeholder="Comment" />-->
<!--      </UCard>-->
<!--    </div>-->

<!--    <div class="flex flex-col gap-2 ">-->
<!--      <UCard v-for="(region, index) in songsList" :key="region.id">-->
<!--        <div class="flex flex-row gap-2 items-center mb-2">-->
<!--          {{ region.type }} {{ index +1 }}: {{ formatTime(region.start) }} <span v-if="region.end">- {{ formatTime(region.end) }}</span>-->
<!--          <UButton @click="setRegionEnd(region)" :disabled="!ready" class="flex flex-row justify-center">-->
<!--            Set end at {{ currentTime}}-->
<!--          </UButton>-->
<!--        </div>-->
<!--        <UInput v-model="region.content" placeholder="Comment" />-->

<!--      </UCard>-->

<!--    </div>-->

<!--  </div>-->




<!--</template>-->

<!--<script setup>-->

<!--const WaveSurfer = (await import('wavesurfer.js')).default;-->
<!--import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions.esm.js'-->

<!--// TODO: Save peak data on first load-->
<!--// https://github.com/katspaugh/wavesurfer.js/discussions/2932-->

<!--const props = defineProps({-->
<!--  src:{-->
<!--    type:String,-->
<!--    required:true-->
<!--  },-->
<!--  options:{-->
<!--    type:Object,-->
<!--  },-->
<!--  regions:{-->
<!--    type:Array,-->
<!--  },-->
<!--  nodeId: {-->
<!--    type:String,-->
<!--  },-->
<!--  itemId: {-->
<!--    type:String,-->
<!--  },-->
<!--  peaks: {-->
<!--    type:Array,-->
<!--  }-->
<!--})-->


<!--const ready = ref(false)-->
<!--const loadingValue = ref(0)-->

<!--const waveSurfer = ref(null);-->
<!--const waveformRef = ref(null);-->

<!--const isPlaying = ref(false)-->

<!--const currentTime = ref('00:00')-->
<!--const totalDuration = ref('00:00')-->

<!--const activeRegion = ref(null)-->

<!--const togglePlay = function(){-->
<!--  if(waveSurfer.value.isPlaying()) {-->
<!--    waveSurfer.value.pause()-->
<!--    isPlaying.value = false-->

<!--  } else {-->
<!--    waveSurfer.value.play()-->
<!--    isPlaying.value = true-->
<!--  }-->

<!--}-->

<!--const audioBuffer = ref(null)-->


<!--const regionsList = ref([]);-->

<!--const regionTypes = {-->
<!--  comment: {-->
<!--    color: 'red',-->
<!--  },-->
<!--  song: {-->
<!--    color: 'blue',-->
<!--  }-->
<!--}-->

<!--const songsList = computed(() => {-->
<!--  return regionsList.value.filter(x => x.type === 'song')-->
<!--})-->

<!--const commentsList = computed(() => {-->
<!--  return regionsList.value.filter(x => x.type === 'comment')-->
<!--})-->

<!--const addRegion = (type) => {-->
<!--  const createdRegion = regions.value.addRegion({-->
<!--    start: waveSurfer.value.getCurrentTime(),-->
<!--    color: regionTypes[type].color,-->
<!--    content: `New ${type}`,-->
<!--    end: waveSurfer.value.getCurrentTime()-->
<!--  });-->
<!--  console.log('createdRegion', createdRegion)-->
<!--  regionsList.value.push({-->
<!--    id: createdRegion.id,-->
<!--    start: createdRegion.start,-->
<!--    end: createdRegion.start + 300,-->
<!--    type: type-->
<!--  });-->
<!--}-->


<!--const setRegionEnd = (region) => {-->
<!--  if (waveSurfer.value && regions.value) {-->
<!--    const currentTime = waveSurfer.value.getCurrentTime();-->
<!--    const wavesurferRegion = regions.value.getRegions().find(r => r.id === region.id);-->
<!--    if (wavesurferRegion) {-->
<!--      wavesurferRegion.setOptions({ end: currentTime });-->
<!--      region.end = currentTime;-->
<!--    }-->
<!--  }-->
<!--};-->

<!--const regions = ref(null);-->

<!--const formatTime = (seconds) => {-->
<!--  return [seconds / 60, seconds % 60].map((v) => `0${Math.floor(v)}`.slice(-2)).join(':')-->
<!--}-->


<!--onMounted(async()=>{-->
<!--  regions.value = RegionsPlugin.create();-->

<!--  waveSurfer.value = WaveSurfer.create({-->
<!--    container: waveformRef.value,-->
<!--    ...props.options,-->
<!--    plugins: [regions.value],-->
<!--  });-->


<!--  waveSurfer.value.load(props.src);-->









<!--  waveSurfer.value.on('audioprocess', function() {-->
<!--    currentTime.value = formatTime(waveSurfer.value.getCurrentTime())-->
<!--  });-->




<!--  // waveSurfer.value.on('decode', () => {-->
<!--  //   // Get AudioBuffer data-->
<!--  //   console.log('peaks?', props.peaks)-->
<!--  //   if(props.peaks) return;-->
<!--  //   // TODO: if buffer is already set, skip this-->
<!--  //   audioBuffer.value = waveSurfer.value.getDecodedData()-->
<!--  //   const peaks = waveSurfer.value.exportPeaks()-->
<!--  //   flowStore.setPeaks(props.itemId, peaks)-->
<!--  //-->
<!--  // })-->


<!--  const play = waveSurfer.value.getDecodedData()-->

<!--  /** During audio loading */-->
<!--  waveSurfer.value.on('loading', (percent) => {-->
<!--    loadingValue.value = percent-->
<!--  })-->

<!--  /** When the audio has been decoded */-->
<!--  waveSurfer.value.on('decode', (duration) => {-->

<!--    // REGION-->
<!--    // Loop over regions and add to Wavesurfer-->
<!--    // for (let i = 0; i < props.regions.length; i++) {-->
<!--    //   console.log('adding region', i, props.regions[i])-->
<!--    //   wsRegions.addRegion({-->
<!--    //     start: props.regions[i].start,-->
<!--    //     end: props.regions[i].end,-->
<!--    //     // Get the colors from regions store-->
<!--    //     color: props.regions[i].color,-->
<!--    //     id: `node-${props.nodeId}_region-${i}`,-->
<!--    //     drag: true,-->
<!--    //     resize: true,-->
<!--    //     minLength: 4,-->
<!--    //   })-->
<!--    // }-->



<!--  })-->

<!--  /** When the audio is both decoded and can play */-->
<!--  waveSurfer.value.on('ready', (duration) => {-->
<!--    console.log('ready')-->
<!--    totalDuration.value = formatTime(waveSurfer.value.getDuration())-->
<!--    ready.value = true;-->
<!--  })-->

<!--  waveSurfer.value.on('interaction', (newTime) => {-->
<!--    console.log('Interaction', newTime + 's')-->
<!--  })-->

<!--  /** When the user seeks to a new position */-->
<!--  waveSurfer.value.on('seeking', (currentTime) => {-->
<!--    console.log('Seeking', currentTime + 's')-->
<!--  })-->

<!--  /** When the user drags the cursor */-->
<!--  waveSurfer.value.on('drag', (relativeX) => {-->
<!--    console.log('Drag', relativeX)-->
<!--  })-->


<!--  // Region reactivity-->
<!--  // wsRegions.on('region-clicked', (region, e) => {-->
<!--  //   console.log(region, e)-->
<!--  //   // e.stopPropagation() // prevent triggering a click on the waveform-->
<!--  //   // activeRegion = region-->
<!--  //   // // region.play()-->
<!--  //   // // region.setOptions({ color: randomColor() })-->
<!--  // })-->





<!--  // wsRegions.on('region-in', (region) => {-->
<!--  //   // console.log(wsRegions.regions)-->
<!--  //   console.log('region-in', region.id)-->
<!--  //   // if region is activeRegion, return-->
<!--  //   if(region.id === activeRegion.value) return;-->
<!--  //   // Set region as activeRegion-->
<!--  //   // activeRegion.value = wsRegions.regions.findIndex(r => r.id === region.id)-->
<!--  // })-->
<!--  //-->
<!--  // const RegionsStore = useRegionsStore()-->
<!--  // wsRegions.on('region-out', (region) => {-->
<!--  //   console.log('region out', region.id)-->
<!--  //   //-->
<!--  //   const newRegionNumber = region.id.slice(-1)*1+1;-->
<!--  //   if(newRegionNumber === wsRegions.regions.length) {-->
<!--  //     console.log('last region', newRegionNumber === wsRegions.regions.length)-->
<!--  //     // Is Last region-->
<!--  //   } else {-->
<!--  //     const nextRegionId = `node-${props.nodeId}_region-${newRegionNumber}`-->
<!--  //     console.log('OUT', 'region id:', region.id, 'new region number:', newRegionNumber, 'new region id', nextRegionId, 'regions length:', wsRegions.regions.length, 'last region:', newRegionNumber === wsRegions.regions.length)-->
<!--  //     // console.log(wsRegions.regions[newRegionNumber])-->
<!--  //     wsRegions.regions[newRegionNumber].play()-->
<!--  //-->
<!--  //-->
<!--  //   }-->
<!--  //-->
<!--  // })-->


<!--  regions.value.on('region-created', (region) => {-->
<!--    console.log('region-created', region)-->
<!--  });-->

<!--  regions.value.on('region-updated', (region) => {-->
<!--    console.log('region-updated', region)-->
<!--    regionsList.value.find(r => r.id === region.id).start = region.start;-->
<!--  })-->





<!--})-->
<!--onUnmounted(()=>{-->
<!--  waveSurfer.value.destroy();-->
<!--})-->
<!--defineExpose({-->
<!--  waveSurfer,-->
<!--  audioBuffer-->
<!--})-->
<!--</script>-->

<!--<style lang="css" scoped>-->
<!--div {-->
<!--  position: relative;-->
<!--}-->
<!--</style>-->
