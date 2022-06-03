<template>
  <div class="article-detail-container" v-if="detail">
    <h2 class="title">{{ detail.title }}</h2>
    <div class="header">
      <span class="author"
        >{{ $t('article.author') }}：{{ detail.author }}</span
      >
      <span class="time"
        >{{ $t('article.publicDate') }}：{{
          dayjs().fromCurrent(detail.publicDate)
        }}</span
      >
      <el-button text class="edit" @click="onEditClick">{{
        $t('article.edit')
      }}</el-button>
    </div>
    <div class="content" v-html="detail.content"></div>
  </div>
</template>

<script lang="ts">
import { getArticleDetail, IArticleRankingResultDTO } from '@/api/article'
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import { watchLangChange } from '@/utils/i18n'
export default {
  name: 'article-detail',
  setup() {
    const detail = ref<IArticleRankingResultDTO>()
    const loading = ref(false)
    const route = useRoute()
    const router = useRouter()
    const articleId = route.params.id as string
    async function getDetail() {
      loading.value = true
      try {
        detail.value = await getArticleDetail(articleId)
      } finally {
        loading.value = false
      }
    }

    getDetail()

    watchLangChange(getDetail)

    function onEditClick() {
      router.push({
        name: 'articleEditor',
        params: {
          id: detail.value?._id
        }
      })
    }

    return {
      detail,
      onEditClick
    }
  }
}
</script>

<style lang="scss" scoped>
.article-detail-container {
  .title {
    font-size: 22px;
    text-align: center;
    padding: 12px 0;
  }
  .header {
    padding: 26px 0;
    .author {
      font-size: 14px;
      color: #555666;
      margin-right: 20px;
    }
    .time {
      font-size: 14px;
      color: #999aaa;
      margin-right: 20px;
    }
    .edit {
      float: right;
    }
  }
  .content {
    font-size: 14px;
    padding: 20px 0;
    border-top: 1px solid #d4d4d4;
  }
}
</style>
