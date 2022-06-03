<template>
  <div class="article-create">
    <el-card v-loading="loading">
      <div class="title">
        <el-input
          class="title-input"
          :placeholder="$t('article.titlePlaceholder')"
          v-model="detail.title"
          maxlength="20"
          clearable
        ></el-input>
      </div>
      <div class="markdown-container">
        <div id="markdown-box">
          <markdown-editor
            ref="markdown"
            v-model="detail.content"
          ></markdown-editor>
        </div>
        <div class="bottom">
          <el-button :loading="saving" type="primary" @click="onSubmitClick">{{
            $t('article.commit')
          }}</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import MarkdownEditor from '@/components/base/markdown-editor/markdown-editor.vue'
import { createArticle, editArticle, getArticleDetail } from '@/api/article'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue-demi'
import { ElMessage } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default {
  name: 'CreateArticle',
  components: {
    MarkdownEditor
  },
  setup() {
    const i18n = useI18n()
    const saving = ref(false)
    const detail = ref<{
      id: string
      title: string
      content: string
    }>({
      id: '',
      title: '',
      content: ''
    })
    const markdown = ref()
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const loading = ref(false)
    async function getDetail() {
      try {
        loading.value = true
        const res = await getArticleDetail(route.params.id as string)
        detail.value = {
          title: res.title,
          content: res.content,
          id: res._id
        }
      } finally {
        loading.value = false
      }
    }
    async function onSubmitClick() {
      try {
        loading.value = true
        if (!route.params.id) {
          await createArticle(detail.value)
          ElMessage.success(i18n.t('article.createSuccess'))
          store.commit('app/removeTagView', {
            type: 'current',
            tagView: store.getters.currentTagView
          })
          router.push({
            name: 'articleRanking'
          })
        } else {
          await editArticle(detail.value)
          ElMessage.success(i18n.t('article.editorSuccess'))
        }
      } finally {
        loading.value = false
      }
    }

    if (route.params.id) {
      getDetail()
    }

    return {
      onSubmitClick,
      detail,
      markdown,
      loading,
      saving
    }
  }
}
</script>

<style lang="scss" scoped>
.markdown-container {
  margin-top: 20px;
  .bottom {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
