<template>
  <span>{{ $route.params.id }}</span>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
onMounted(() => {
  console.log(route.params.id)
})
</script>

<style lang="scss"></style>
