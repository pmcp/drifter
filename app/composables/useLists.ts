export const useLists = () => {

  const tabs = [{
    key: 'comments',
    // label: 'Comments',
    icon: 'i-heroicons-chat-bubble-bottom-center-text',
    // description: 'Your comments'
  }, {
    key: 'songs',
    // label: 'Songs',
    icon: 'i-heroicons-musical-note',
    // description: 'Your songs'
  },
    {
      key: 'mixes',
      // label: 'Mixes',
      icon: 'i-heroicons-arrow-path-rounded-square',
      // description: 'Your songs'
    }
  ]

  const onTabClick = (index) => {
    selectedTab.value = index
    console.log('onTabClick', index, selectedTab.value)
    console.log(index === selectedTab.value)
    // if(index === selectedTab.value) showLists.value = !showLists.value; return;
    showLists.value = true;
  }



  const showLists= ref(false)


  const tabsUi = {
    wrapper: 'relative space-y-2',
    container: 'relative w-full ',
    base: 'focus:outline-none',
    list: {
      base: 'relative',
      background: 'bg-gray-100 dark:bg-gray-800',
      rounded: 'rounded-lg',
      shadow: '',
      padding: 'p-1',
      height: 'h-10',
      width: 'w-full',
      marker: {
        wrapper: 'absolute top-[4px] left-[4px] duration-200 ease-out focus:outline-none',
        base: 'w-full h-full',
        background: 'bg-white dark:bg-gray-900',
        rounded: 'rounded-md',
        shadow: 'shadow-sm',
      },
      tab: {
        base: 'relative inline-flex items-center justify-center flex-shrink-0 w-full ui-focus-visible:outline-0 ui-focus-visible:ring-2 ui-focus-visible:ring-primary-500 dark:ui-focus-visible:ring-primary-400 ui-not-focus-visible:outline-none focus:outline-none disabled:cursor-not-allowed disabled:opacity-75 transition-colors duration-200 ease-out',
        background: '',
        active: 'text-gray-900 dark:text-white',
        inactive: 'text-gray-500 dark:text-gray-400',
        height: 'h-8',
        padding: 'px-3',
        size: 'text-sm',
        font: 'font-medium',
        rounded: 'rounded-md',
        shadow: '',
        icon: 'w-4 h-4 flex-shrink-0 me-2',
      },
    },
  }




  const route = useRoute()
  const router = useRouter()
  const selectedTab = computed({
    get () {
      const index = tabs.findIndex((item) => item.label === route.query.tab)
      if (index === -1) {
        return 0
      }

      return index
    },
    set (value) {
      // Hash is specified here to prevent the page from scrolling to the top
      router.replace({ query: { tab: tabs[value].label }, hash: '#control-tabs' })
    }
  })




  return { tabs, tabsUi, showLists, onTabClick }
}

