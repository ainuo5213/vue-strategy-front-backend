<template>
  <svg-icon :icon="icon"></svg-icon>
  <span class="menu-item-title">{{ title }}</span>
</template>

<script lang="ts">
import { PropType } from 'vue'
import SvgIcon from '@/components/base/svg-icon/svg-icon.vue'

export default {
  components: {
    SvgIcon
  },
  props: {
    title: {
      type: String as PropType<string>,
      required: true
    },
    icon: {
      type: String as PropType<string>,
      required: true
    }
  }
}
</script>
