<template>
  <div
    class="app-wrapper"
    :class="[$store.getters.sideBarOpened ? 'open-side-bar' : 'hide-side-bar']"
  >
    <!-- 左侧 menu -->
    <side-bar
      id="guide-sidebar"
      class="sidebar-container"
      :style="{ backgroundColor: variables.menuBg }"
    />
    <div class="main-container">
      <div class="fixed-header">
        <!-- 顶部的 navbar -->
        <nav-bar />
      </div>
      <!-- 内容区 -->
      <app-main />
    </div>
  </div>
</template>

<script lang="ts">
import NavBar from './components/nav-bar/nav-bar.vue'
import SideBar from './components/side-bar/side-bar.vue'
import AppMain from './components/app/app.vue'
import variable from './theme.module.scss'
import { computed } from '@vue/runtime-core'
export default {
  name: 'app',
  components: {
    NavBar,
    SideBar,
    AppMain
  },
  data() {
    const variables = computed(() => variable)
    return {
      variables
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variable.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width $sideBarDuration;
}

.hide-side-bar .fixed-header {
  width: calc(100% - #{$hideSideBarWidth});
}
</style>
