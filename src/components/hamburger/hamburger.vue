<template>
  <div class="hamburger" @click="onHamburgerBtnClick">
    <svg-icon id="guide-hamburger" class="hamburger" :icon="icon"></svg-icon>
  </div>
</template>

<script lang="ts">
import { computed } from '@vue/runtime-core'
import { useStore } from 'vuex'
export default {
  name: 'hamburger',
  setup() {
    const store = useStore()
    const icon = computed(() => {
      return store.getters.sideBarOpened
        ? 'hamburger-opened'
        : 'hamburger-closed'
    })
    function onHamburgerBtnClick() {
      store.commit('app/toggleSideBar')
    }
    return {
      icon,
      onHamburgerBtnClick
    }
  }
}
</script>

<style lang="scss" scoped>
.hamburger {
  padding: 0 16px;
  .hamburger {
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
  }
}
</style>
