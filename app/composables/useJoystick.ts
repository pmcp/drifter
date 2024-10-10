export const useJoystick = () => {
  const { player, playerCurrentTime, playerTotalDuration, currentZoom } = usePlayer()

  const joystickValue = useState('joystickValue', () => 0)
  const canContinue = useState('canContinue', () => true)
  const changeSpeed = useState('changeSpeed', () => 5000)
  const { isActive, pause, resume } = useIntervalFn(() => moveJoystick(), 10, {immediate: false})

  const setPlayerTime = (joystick: number) => {
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
}

