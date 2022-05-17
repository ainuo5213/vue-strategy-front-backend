<template>
  <div
    v-if="isExternal"
    :style="styleExternalStyle"
    class="svg-external-icon"
    :class="className"
  ></div>
  <svg v-else class="svg-icon" :class="className" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script lang="ts">
import { isExternal as external } from '@/utils/validate'
import { computed, defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    icon: {
      type: String as PropType<string>,
      required: true
    },
    className: {
      type: String as PropType<string>
    }
  },
  name: 'svg-icon',
  setup(props) {
    const isExternal = computed(() => external(props.icon))
    const styleExternalStyle = computed(() => {
      return {
        mask: `url(${props.icon}) no-repeat 50% 50%`
      }
    })
    const iconName = computed(() => `#icon-${props.icon}`)
    return {
      styleExternalStyle,
      isExternal,
      iconName
    }
  }
})
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  &:focus {
    outline: 0;
  }
}
.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
