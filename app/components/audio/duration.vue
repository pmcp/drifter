<div>
<span v-if="playerIsReady"> {{ playerCurrentTime }} / {{ playerTotalDuration }}</span>
</div>
<script setup>
const {
  playerIsReady,
  playerCurrentTime,
  playerTotalDuration
} = usePlayer()
</script>
