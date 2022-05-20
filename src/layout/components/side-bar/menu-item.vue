<template>
  <svg-icon :icon="icon"></svg-icon>
  <span class="menu-item-title">{{ generateTitle(title) }}</span>
</template>

<script lang="ts">
import { PropType } from 'vue'
import { generateTitle } from '@/utils/i18n'

export default {
  props: {
    title: {
      type: String as PropType<string>,
      required: true
    },
    icon: {
      type: String as PropType<string>,
      required: true
    }
  },
  setup() {
    return {
      generateTitle
    }
  }
}
</script>
