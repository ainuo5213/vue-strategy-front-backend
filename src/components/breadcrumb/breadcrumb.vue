<template>
  <el-breadcrumb separator="/" class="breadcrumb">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item :key="item.path" v-for="(item, index) in breadcrumbs">
        <span class="no-redirect" v-if="index === breadcrumbs.length - 1">{{
          generateTitle(item.title)
        }}</span>
        <span class="redirect" v-else @click="onLinkClick(item)">{{
          generateTitle(item.title)
        }}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { generateTitle } from '@/utils/i18n'

export default {
  name: 'breadcrumb',
  setup() {
    const store = useStore()
    const router = useRouter()
    const menubg = store.getters.cssVar.menuBg
    const route = useRoute()
    const breadcrumbs = computed(() => {
      return route.matched
        .filter((r) => r.meta && r.meta.title)
        .map((r) => {
          return {
            title: r.meta.title,
            path: r.path
          }
        })
    })
    function onLinkClick(item: { title: string; path: string }) {
      router.push({
        path: item.path
      })
    }
    return {
      breadcrumbs,
      menubg,
      onLinkClick,
      generateTitle
    }
  }
}
</script>

<style lang="scss" scoped>
.breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
  .redirect {
    color: #666;
    font-weight: bold;
    cursor: pointer;
    &:hover {
      color: v-bind(menubg);
    }
  }
}
</style>
