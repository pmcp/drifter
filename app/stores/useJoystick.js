import { defineStore } from 'pinia'

export const useJoystickStore = defineStore("joystick", () => {

  const PlayerStore = usePlayerStore()
  const { player, playerCurrentTime, playerTotalDuration } = storeToRefs(PlayerStore)

  const joystickValue = ref(0)
  const canContinue = ref(true)
  const changeSpeed = ref(5000)

  const { isActive, pause, resume } = useIntervalFn(() => moveJoystick(), 10, {immediate: false})

  const setPlayerTime = (joystick) => {
    const valueToAdd = 1 * joystick/changeSpeed.value
    if(playerCurrentTime.value >= playerTotalDuration - valueToAdd) return;
    if(!(playerCurrentTime.value >= 0)) return;
    player.value.setTime(playerCurrentTime.value + valueToAdd)
  }
  const moveJoystick = () => {
    if(joystickValue.value === 0) return;
    setPlayerTime(joystickValue.value)
  }

  return { joystickValue, moveJoystick, canContinue, isActive, pause, resume, changeSpeed }

})
