import { defineStore } from 'pinia'


export const useKeysStore = defineStore("keys", () => {
  const { togglePlayPause } = usePlayerStore()
  // Only use shortcuts if not using inputs
  // Vue Use Active Element
  const activeElement = useActiveElement()
  const notUsingInput = computed(() =>
    activeElement.value?.tagName !== 'INPUT'
    && activeElement.value?.tagName !== 'TEXTAREA',)
  const { space, c, s } = useMagicKeys()

  const setShortcutKeys = () => {
    whenever(logicAnd(space, notUsingInput), () => {
      togglePlayPause()
    })
    whenever(logicAnd(c, notUsingInput), () => {
      addRegion('comment')
    })

    whenever(logicAnd(s, notUsingInput), () => {
      addRegion('song')
    })

  }
  return { setShortcutKeys }

})
