<template>
  <div class="screenfull" @click="onToggleFullScreen">
    <svg-icon
      :icon="fullState ? 'exit-fullscreen' : 'fullscreen'"
      id="guide-full"
    ></svg-icon>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import screenFule from 'screenfull'
export default {
  name: 'screenfull',
  setup() {
    const fullState = ref(false)
    async function onToggleFullScreen() {
      await screenFule.toggle()
      fullState.value = !fullState.value
    }
    return {
      onToggleFullScreen,
      fullState
    }
  }
}
</script>

<style></style>
