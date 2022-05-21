<template>
  <div class="header-search" :class="{ show: isShow }">
    <svg-icon
      class="search-icon"
      icon="search"
      @click.stop="onShowSearchBtnClick"
    ></svg-icon>
    <el-select
      ref="headerSearchSelectRef"
      class="header-search-select"
      v-model="searchValue"
      filterable
      default-first-option
      remote
      :remote-method="querySearch"
      placeholder="search"
      @change="onSelectChange"
    >
      <el-option
        v-for="item in searchOptions"
        :key="item.path"
        :label="item.title.join(' > ')"
        :value="item.path"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script lang="ts">
import { computed, ref, watch } from 'vue'
import { filterRoutes, generateMenus } from '@/utils/route'
import { useRouter } from 'vue-router'
import Fuse from 'fuse.js'
import { generateRoutes, SearchRoute } from './fuse'
import { watchLangChange } from '@/utils/i18n'

export default {
  name: 'header-search',
  setup() {
    const router = useRouter()
    const isShow = ref(false)
    const searchValue = ref('')
    const searchOptions = ref<SearchRoute[]>([])
    // 查询的路由数据，这里和左侧菜单一样
    const genSearchRoutes = () => {
      const filteredRouters = filterRoutes(router.getRoutes())
      const menus = generateMenus(filteredRouters)
      const normalizedRoutes = generateRoutes(menus)
      return normalizedRoutes
    }
    let searchPool = computed(genSearchRoutes)
    let fuse = initFuse(searchPool.value)

    watch(isShow, (val) => {
      if (val) {
        document.body.addEventListener('click', onSearchClose)
      } else {
        document.body.removeEventListener('click', onSearchClose)
      }
    })
    // 语言变化时，重新初始化fuse模糊查询器
    watchLangChange(() => {
      searchPool = computed(genSearchRoutes)
      fuse = initFuse(searchPool.value)
    })
    function initFuse(searchPool: SearchRoute[]) {
      const fuse = new Fuse(searchPool, {
        shouldSort: true,
        minMatchCharLength: 1,
        keys: [
          {
            name: 'title',
            weight: 0.7
          },
          {
            name: 'path',
            weight: 0.3
          }
        ]
      })
      return fuse
    }
    function onSearchClose() {
      searchOptions.value.length = 0
      searchValue.value = ''
      isShow.value = false
    }
    function onShowSearchBtnClick() {
      isShow.value = true
    }
    function querySearch(searchValue: string) {
      if (searchValue) {
        searchOptions.value = fuse.search(searchValue).map((r) => r.item)
      } else {
        searchOptions.value.length = 0
      }
    }
    function onSelectChange(path) {
      router.push(path)
    }
    return {
      isShow,
      onShowSearchBtnClick,
      searchValue,
      querySearch,
      onSelectChange,
      searchOptions
    }
  }
}
</script>

<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;
  .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }
  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    ::v-deep(.el-input__wrapper) {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 2px solid #d9d9d9;
      vertical-align: middle;
    }
  }
  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
