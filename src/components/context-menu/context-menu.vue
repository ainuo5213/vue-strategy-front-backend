<template>
  <teleport to="body">
    <ul
      v-if="modelValue"
      class="context-menu-container"
      :style="{
        left: pos.x + 'px',
        top: pos.y + 'px'
      }"
    >
      <template v-for="(item, index) in data" :key="index">
        <li
          class="context-menu-item"
          v-if="!item.template"
          @click.stop="onItemClick(item)"
        >
          {{ item.title }}
        </li>
        <slot v-else :name="item.template"></slot>
      </template>
    </ul>
  </teleport>
</template>

<script lang="ts">
import { ContextMenuData } from './contextMenu'
import { onMounted, onUnmounted, PropType } from 'vue'
export default {
  props: {
    modelValue: {
      type: Boolean as PropType<boolean>,
      required: true
    },
    data: {
      type: Array as PropType<Array<ContextMenuData>>,
      required: true
    },
    pos: {
      type: Object as PropType<{ x: number; y: number }>,
      required: true
    }
  },
  setup(props, { emit }) {
    function onItemClick(item: ContextMenuData) {
      typeof item.click === 'function' && item.click()
    }
    function hideContextMenu() {
      emit('update:modelValue', false)
    }
    onMounted(() => {
      document.body.addEventListener('click', hideContextMenu)
      document.body.addEventListener('contextmenu', hideContextMenu)
    })
    onUnmounted(() => {
      document.body.removeEventListener('click', hideContextMenu)
      document.body.removeEventListener('contextmenu', hideContextMenu)
    })
    return {
      onItemClick
    }
  }
}
</script>

<style lang="scss" scoped>
.context-menu-container {
  position: fixed;
  background: #fff;
  z-index: 3000;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: var(--el-box-shadow-light);
  li {
    font-size: var(--el-font-size-base);
    padding: 0 32px 0 20px;
    position: relative;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--el-text-color-regular);
    height: 34px;
    line-height: 34px;
    box-sizing: border-box;
    cursor: pointer;
    &:hover {
      background: var(--el-fill-color-light);
    }
  }
}
</style>
