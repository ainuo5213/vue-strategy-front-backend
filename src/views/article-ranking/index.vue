<template>
  <div class="article-ranking-container">
    <el-card>
      <el-table
        ref="tableRef"
        v-loading="loading"
        :data="tableManage.list"
        border
      >
        <el-table-column
          :label="$t('article.ranking')"
          prop="ranking"
        ></el-table-column>
        <el-table-column
          :label="$t('article.title')"
          prop="title"
        ></el-table-column>
        <el-table-column
          :label="$t('article.author')"
          prop="author"
        ></el-table-column>
        <el-table-column :label="$t('article.publicDate')" prop="publicDate">
        </el-table-column>
        <el-table-column
          :label="$t('article.desc')"
          prop="desc"
        ></el-table-column>
        <el-table-column :label="$t('article.action')">
          <el-button type="primary" size="small">{{
            $t('article.show')
          }}</el-button>
          <el-button type="danger" size="small">{{
            $t('article.remove')
          }}</el-button>
        </el-table-column>
      </el-table>

      <div class="pagination-container">
        <el-pagination
          background
          class="pagination"
          @size-change="onSizeChange"
          @current-change="onCurrentPageChange"
          :current-page="requestParameter.page"
          :page-sizes="pageSizes"
          :page-size="requestParameter.size"
          :layout="layout"
          :total="tableManage.total"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { getArticles, IArticleRankingResultDTO } from '@/api/article'
import { onActivated, ref } from 'vue'
import { watchLangChange } from '@/utils/i18n'
import { PaginationWrapper } from '@/types'
import { pageSizes, layout } from '@/config/pagination'

export default {
  name: 'article-ranking',
  setup() {
    const requestParameter = ref({
      page: 1,
      size: 15
    })
    const loading = ref(false)
    const tableManage = ref<PaginationWrapper<IArticleRankingResultDTO>>({
      list: [],
      size: requestParameter.value.size,
      total: 0,
      page: 1
    })
    async function getArticleList() {
      loading.value = true
      try {
        const res = await getArticles(requestParameter.value)
        tableManage.value = res
      } finally {
        loading.value = false
      }
    }

    watchLangChange(getArticleList)

    onActivated(getArticleList)
    function onSizeChange(size: number) {
      requestParameter.value.size = size
      getArticleList()
    }
    function onCurrentPageChange(currentPage: number) {
      requestParameter.value.page = currentPage
      getArticleList()
    }
    console.log(tableManage)

    return {
      onSizeChange,
      onCurrentPageChange,
      pageSizes,
      layout,
      tableManage,
      loading,
      requestParameter
    }
  }
}
</script>

<style lang="scss" scoped></style>
