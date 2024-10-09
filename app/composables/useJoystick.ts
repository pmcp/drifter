export const useJoystick = () => {
  const { player, playerCurrentTime, playerTotalDuration } = usePlayer()

  const joystickValue = useState('joystickValue', () => 0)

  const moveJoystick = () => {
    console.log('moveJoystick', joystickValue.value)
    const valueToAdd = 1 * joystickValue.value/222
    if(playerCurrentTime.value >= playerTotalDuration - valueToAdd) return;
    if(!(playerCurrentTime.value >= 0)) return;
    player.value.setTime(playerCurrentTime.value + valueToAdd)
  }

  return { joystickValue, moveJoystick }
}

