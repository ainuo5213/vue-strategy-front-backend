<template>
  <div class="app-main">
    <router-view v-slot="{ Component, route }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <component :is="Component" :key="route.path" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts">
import { computed, watch } from '@vue/runtime-core'
import { useRoute, RouteLocationNormalizedLoaded, RouteMeta } from 'vue-router'
import { isTags } from '@/utils/is'
import { useStore } from 'vuex'
import { generateTitle as i18nGenTitle, watchLangChange } from '@/utils/i18n'
import { TagView } from '@/store/app'

function generateTitle(route: { meta?: RouteMeta; path: string }) {
  let title = ''
  if (!route.meta) {
    const pathArray = route.path.split('/')
    title = pathArray[pathArray.length - 1]
  } else {
    title = i18nGenTitle(route.meta.title as string)
  }
  return title
}

export default {
  name: 'app',
  setup() {
    const route = useRoute()
    const store = useStore()
    watch(
      route,
      (newRoute: RouteLocationNormalizedLoaded) => {
        const inWhiteList = isTags(newRoute.path)
        if (inWhiteList) {
          return
        }
        const { params, path, name, fullPath, query, meta } = newRoute
        store.commit('app/addTagsViewList', {
          params,
          path,
          name,
          fullPath,
          query,
          meta,
          title: generateTitle(newRoute)
        })
        store.commit('app/setCurrentTagView', path)
      },
      {
        immediate: true
      }
    )
    watchLangChange(
      () => {
        const tagsViewList = store.getters.tagsViewList
        tagsViewList.forEach((r: TagView) => {
          r.title = generateTitle(r)
        })
        store.commit('app/reloadTagsViewList', tagsViewList)
      },
      {
        immediate: false
      }
    )
    watchLangChange(
      () => {
        store.dispatch('user/getUserInfo')
      },
      {
        immediate: false
      }
    )
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  min-height: calc(100vh - 85px);
  width: 100%;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  top: 85px;
  padding: 20px;
}
</style>
