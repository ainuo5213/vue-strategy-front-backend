<template>
  <div class="tags-view-container" id="guide-tags">
    <draggable
      v-model="tags"
      @end="onDragEnd"
      :animation="400"
      easing="linear"
      item-key="path"
    >
      <template #item="{ element: tag }">
        <router-link
          :key="tag.path"
          class="tags-view-item"
          :class="{
            active: tag.meta.active
          }"
          :to="{ path: tag.path }"
          :style="{
            backgroundColor: tag.meta.active ? cssVar.menuBg : '',
            borderColor: tag.meta.active ? cssVar.menuBg : ''
          }"
          draggable
          @contextmenu.prevent.stop="onContextMenu(tag, $event)"
        >
          <span class="title">{{ tag.title }}</span>
          <el-icon
            v-if="
              tags.length !== 1 || (tags.length === 1 && tag.name !== 'home')
            "
            @click.stop.prevent="onCloseIconClick(tag)"
            ><close
          /></el-icon>
        </router-link>
      </template>
    </draggable>
  </div>
  <context-menu
    v-model="visible"
    :data="menuData"
    :pos="contextMenuPos"
  ></context-menu>
</template>

<script lang="ts">
import ContextMenu from '@/components/base/context-menu/context-menu.vue'
import { TagView } from '@/store/app'
import { computed, ref, nextTick } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { ContextMenuData } from '@/components/base/context-menu/contextMenu'
import { useI18n } from 'vue-i18n'
import { watchLangChange } from '@/utils/i18n'
import Draggable from 'vuedraggable'
import { useRouter } from 'vue-router'
export default {
  components: {
    ContextMenu,
    Draggable
  },
  setup() {
    const store = useStore()
    const i18n = useI18n()
    const router = useRouter()
    const tags = computed(() => store.getters.tagsViewList)
    const currentTag = computed(() => store.getters.currentTagView)
    const cssVar = computed(() => store.getters.cssVar)
    const visible = ref(false)
    const contextMenuPos = ref({
      x: 0,
      y: 0
    })
    const currentOperationTag = ref<TagView | null>()
    function onCloseIconClick(tag: TagView) {
      store.commit('app/removeTagView', {
        type: 'current',
        tagView: tag
      })
      if (tags.value.length === 0) {
        router.push({
          name: 'home'
        })
      }
    }
    function isActive(path: string) {
      return path === currentTag.value.path
    }
    function onContextMenu(tag: TagView, e: MouseEvent) {
      const { pageX, pageY } = e
      contextMenuPos.value.x = pageX
      contextMenuPos.value.y = pageY
      visible.value = true
      currentOperationTag.value = tag
    }
    function clearContextMenuData() {
      contextMenuPos.value.x = 0
      contextMenuPos.value.y = 0
      visible.value = false
      currentOperationTag.value = null
    }
    async function onRefresh() {
      store.commit('app/reloadRouter', true)
      await nextTick()
      store.commit('app/reloadRouter', false)
      clearContextMenuData()
    }
    function onCloseRight() {
      store.commit('app/removeTagView', {
        type: 'right',
        tagView: currentOperationTag.value
      })
      clearContextMenuData()
    }
    function onCloseLeft() {
      store.commit('app/removeTagView', {
        type: 'left',
        tagView: currentOperationTag.value
      })
      clearContextMenuData()
    }
    function onCloseCurrent() {
      store.commit('app/removeTagView', {
        type: 'current',
        tagView: currentOperationTag.value
      })
      clearContextMenuData()

      if (tags.value.length === 0) {
        router.push({
          name: 'home'
        })
      }
    }
    function onCloseOther() {
      store.commit('app/removeTagView', {
        type: 'other',
        tagView: currentOperationTag.value
      })
      clearContextMenuData()
    }
    function onCloseAll() {
      store.commit('app/removeTagView', {
        type: 'all'
      })
      clearContextMenuData()
      router.push({
        name: 'home'
      })
    }
    const menuData = ref<ContextMenuData[]>([])

    watchLangChange(
      () => {
        menuData.value = [
          {
            title: i18n.t('tagsView.refresh'),
            click: onRefresh,
            show: () => {
              return currentOperationTag.value!.meta.active as boolean
            }
          },
          {
            title: i18n.t('tagsView.closeRight'),
            click: onCloseRight
          },
          {
            title: i18n.t('tagsView.closeLeft'),
            click: onCloseLeft
          },
          {
            title: i18n.t('tagsView.closeCurrent'),
            click: onCloseCurrent,
            show: () => {
              return (
                tags.value.length !== 1 ||
                (tags.value.length === 1 && tags.value[0].name !== 'home')
              )
            }
          },
          {
            title: i18n.t('tagsView.closeOther'),
            click: onCloseOther
          },
          {
            title: i18n.t('tagsView.closeAll'),
            click: onCloseAll,
            show: () => {
              return currentOperationTag.value
                ? !((currentOperationTag.value!.name === 'home') as boolean)
                : true
            }
          }
        ]
      },
      {
        immediate: true
      }
    )

    function onDragEnd(data) {
      store.commit('app/exchangeTagView', {
        oldIndex: data.oldIndex,
        newIndex: data.newIndex
      })
    }
    return {
      tags,
      currentTag,
      onCloseIconClick,
      cssVar,
      isActive,
      onContextMenu,
      visible,
      menuData,
      contextMenuPos,
      onDragEnd
    }
  }
}
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  overflow-x: auto;
  .tags-view-item {
    display: inline-block;
    position: relative;
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    border: 1px solid #d8dce5;
    color: #495060;
    background: #fff;
    padding: 0 8px;
    font-size: 12px;
    margin-left: 5px;
    margin-top: 4px;
    &:first-of-type {
      margin-left: 15px;
    }
    &:last-of-type {
      margin-right: 15px;
    }
    &.active {
      color: #fff;
      &::before {
        content: '';
        background: #fff;
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        position: relative;
        margin-right: 4px;
      }
    }
    .title {
      margin-left: 5px;
    }
    // close 按钮
    .el-icon {
      margin-left: 5px;
      width: 16px;
      height: 16px;
      line-height: 10px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
    }
  }
}

.flip-list-move {
  transition: all 0.8s ease;
}
</style>
