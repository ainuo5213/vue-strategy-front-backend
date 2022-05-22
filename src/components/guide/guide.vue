<template>
  <div class="guide">
    <el-tooltip :content="$t('navBar.guide')" :effect="effect">
      <svg-icon id="guide-start" icon="guide" @click="onGuideClick"></svg-icon>
    </el-tooltip>
  </div>
</template>

<script lang="ts">
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'
import { onMounted, ref } from '@vue/runtime-core'
import { useI18n } from 'vue-i18n'
import { getSteps } from './steps'
import { watchLangChange } from '@/utils/i18n'
export default {
  name: 'guide',
  setup() {
    const i18n = useI18n()
    const driver = ref<Driver>()
    onMounted(() => {
      driver.value = createDriver()
    })

    watchLangChange(() => {
      driver.value = createDriver()
    })

    function createDriver() {
      return new Driver({
        allowClose: false, // 禁止点击蒙层关闭
        closeBtnText: i18n.t('guide.close'),
        nextBtnText: i18n.t('guide.next'),
        prevBtnText: i18n.t('guide.prev')
      })
    }

    function onGuideClick() {
      driver.value!.defineSteps(getSteps(i18n))
      driver.value!.start()
    }

    return {
      onGuideClick
    }
  }
}
</script>

<style lang="scss">
div#driver-popover-item .driver-popover-footer button {
  background-color: var(--el-color-primary);
  border: var(--el-border);
  border-color: var(--el-color-primary);
  text-shadow: none !important;
  color: var(--el-color-white);
  &:hover {
    color: var(--el-color-white);
    border-color: var(--el-color-primary-light-3);
    background-color: var(--el-color-primary-light-3);
    outline: none;
  }
}
</style>
