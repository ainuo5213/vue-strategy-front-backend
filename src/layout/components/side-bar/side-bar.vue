<template>
  <div class="">
    <h1>占位</h1>
    <el-scrollbar>
      <side-menu></side-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import SideMenu from './side-menu.vue'
export default {
  name: 'side-bar',
  components: {
    SideMenu
  }
}
</script>

<style lang="scss" scoped></style>
