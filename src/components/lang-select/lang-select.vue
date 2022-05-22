<template>
  <el-dropdown
    class="international"
    trigger="click"
    @command="handleSelectLanguage"
  >
    <div class="el-dropdown-link">
      <el-tooltip :content="$t('navBar.international')" :effect="effect">
        <svg-icon icon="language" id="guide-lang"></svg-icon>
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in languages"
          :key="item.value"
          :command="item.value"
          :disabled="item.value === language"
          >{{ item.label }}</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts">
import { computed, PropType } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
type Effect = 'dark' | 'light'
export default {
  name: 'lang-select',
  props: {
    effect: {
      type: String as PropType<Effect>,
      default: 'dark'
    }
  },
  setup() {
    const store = useStore()
    const i18n = useI18n()
    const languages = [
      { label: '中文', value: 'zh' },
      { label: 'English', value: 'en' }
    ]
    const language = computed(() => store.getters.language)
    function handleSelectLanguage(command: string) {
      i18n.locale.value = command
      store.commit('app/setLanguage', command)
      ElMessage.success(i18n.t('toast.switchLangSuccess'))
    }
    return {
      handleSelectLanguage,
      language,
      languages
    }
  }
}
</script>

<style></style>
