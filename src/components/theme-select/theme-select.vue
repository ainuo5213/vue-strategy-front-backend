<template>
  <el-dropdown
    trigger="click"
    v-bind="$attrs"
    class="theme"
    @command="handleThemeChange"
  >
    <div class="theme-info">
      <el-tooltip :content="$t('navBar.themeChange')" :effect="effect">
        <svg-icon icon="change-theme" id="guide-theme"></svg-icon>
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="color">
          {{ $t('theme.themeColorChange') }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <color-select-dialog v-model="visible"></color-select-dialog>
</template>

<script lang="ts">
import { ref } from 'vue'
import ColorSelectDialog from './color-select-dialog.vue'
export default {
  name: 'theme-select',
  components: {
    ColorSelectDialog
  },
  setup() {
    const visible = ref(false)
    function handleThemeChange(command: string) {
      if (command === 'color') {
        visible.value = true
      }
    }
    return {
      handleThemeChange,
      visible
    }
  }
}
</script>

<style></style>
