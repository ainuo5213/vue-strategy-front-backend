<template>
  <div class="hamburger-container" @click="onHamburgerBtnClick">
    <svg-icon class="hamburger" :icon="icon"></svg-icon>
  </div>
</template>

<script lang="ts">
import svgIcon from '@/components/base/svg-icon/svg-icon.vue'
import { computed } from '@vue/runtime-core'
import { useStore } from 'vuex'
export default {
  components: { svgIcon },
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
.hamburger-container {
  padding: 0 16px;
  .hamburger {
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
  }
}
</style>
