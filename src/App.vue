<template>
  <el-config-provider :locale="language">
    <router-view />
  </el-config-provider>
</template>

<script lang="ts">
import { ElConfigProvider } from 'element-plus'
import { useStore } from 'vuex'
import { computed, onMounted } from 'vue'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
import { setElThemeColor } from '@/utils/theme'
export default {
  name: 'App',
  components: {
    ElConfigProvider
  },
  setup() {
    const store = useStore()
    const language = computed(() => {
      const language = store.getters.language
      return language === 'en' ? en : zhCn
    })
    const mainColor = store.getters.mainColor

    onMounted(() => {
      if (mainColor) {
        setElThemeColor(mainColor)
      }
    })

    return {
      language
    }
  }
}
</script>

<style lang="scss"></style>
