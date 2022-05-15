<template>
  <el-sub-menu v-if="route.children.length" :index="route.path">
    <template #title>
      <menu-item :title="route.meta.title" :icon="route.meta.icon"></menu-item>
    </template>
    <side-bar-item
      v-for="item in route.children"
      :key="item.path"
      :route="item"
    ></side-bar-item>
  </el-sub-menu>
  <el-menu-item v-else :index="route.path">
    <menu-item :title="route.meta.title" :icon="route.meta.icon"></menu-item>
  </el-menu-item>
</template>

<script lang="ts">
import { PropType } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import MenuItem from './menu-item.vue'
export default {
  components: {
    MenuItem
  },
  props: {
    route: {
      type: Object as PropType<RouteRecordRaw>,
      required: true
    }
  },
  name: 'side-bar-item'
}
</script>

<style lang="scss" scoped></style>
