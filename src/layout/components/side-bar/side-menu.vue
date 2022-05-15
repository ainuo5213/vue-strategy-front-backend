<template>
  <el-menu
    :collapse="!$store.getters.sideBarOpened"
    :default-active="defaultActive"
    router
    :background-color="$store.getters.cssVar.menuBg"
    :text-color="$store.getters.cssVar.menuText"
    :active-text-color="$store.getters.cssVar.menuActiveText"
    class="menu-container"
  >
    <side-bar-item
      v-for="item in routes"
      :key="item.path"
      :route="item"
    ></side-bar-item>
  </el-menu>
</template>
<script lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { filterRoutes, generateMenus } from '@/utils/route'
import { computed } from '@vue/runtime-core'
import SideBarItem from './side-bar-item.vue'

export default {
  name: 'side-menu',
  components: {
    SideBarItem
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const defaultActive = computed(() => {
      const path = route.path
      return path
    })
    const routes = computed(() => {
      const routes = router.getRoutes()
      return generateMenus(filterRoutes(routes))
    })
    return {
      routes,
      defaultActive
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep(.el-menu-item.is-active) {
  background-color: var(--el-menu-hover-bg-color);
}
</style>
