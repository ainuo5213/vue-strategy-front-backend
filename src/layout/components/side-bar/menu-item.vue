<template>
  <i v-if="icon.includes('el-icon')" class="sub-el-icon" :class="icon"></i>
  <svg-icon v-else :icon="icon"></svg-icon>
  <span>{{ title }}</span>
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

<style></style>
