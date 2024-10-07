export const usePlayer = () => {
  const player = useState('player', () => null)
  const playerIsPlaying = useState('playerIsPlaying', () => false)
  const playerIsReady = useState('playerIsReady', () => false)
  const playerCurrentTime = useState('playerCurrentTime', () => '00:00')
  const playerTotalDuration = useState('playerTotalDuration', () => '00:00')
  const playerLoadingValue = useState('playerTotalDuration', () => 0)

  return {
    player,
    playerIsPlaying,
    playerIsReady,
    playerCurrentTime,
    playerTotalDuration,
    playerLoadingValue
  }
}

