<template>
  <div class="article-ranking-container">
    <el-card>
      <span class="title">{{ $t('article.dynamicTitle') }}</span>
      <el-checkbox-group v-model="selectedDynamicColumns">
        <el-checkbox
          v-for="(item, index) in allColumns"
          :label="item.prop"
          :key="index"
          >{{ item.label }}</el-checkbox
        >
      </el-checkbox-group>
    </el-card>
    <el-card>
      <dynamic-table
        :columns="tableColumns"
        :data="tableManage.list"
        :loading="loading"
        :current-page="requestParameter.page"
        :page-size="requestParameter.size"
        :total="tableManage.total"
        :sortable="true"
        @size-change="onSizeChange"
        @current-change="onCurrentPageChange"
        @sort-end="onSortEnd"
      >
        <template #publicDate="{ data }">
          {{
            dayjs(
              Number.isNaN(+data.publicDate)
                ? data.publicDate
                : +data.publicDate
            ).fromCurrent()
          }}
        </template>
        <template #action="{ data }">
          <el-button
            type="primary"
            size="small"
            @click="onShowBtnClick(data)"
            >{{ $t('article.show') }}</el-button
          >
          <el-button
            type="danger"
            size="small"
            @click="onRemoveBtnClick(data)"
            >{{ $t('article.remove') }}</el-button
          >
        </template>
      </dynamic-table>
    </el-card>
  </div>
</template>

<script lang="ts">
import {
  getArticles,
  IArticleRankingResultDTO,
  sortArticle
} from '@/api/article'
import { onActivated, ref, watch } from 'vue'
import { watchLangChange } from '@/utils/i18n'
import { PaginationWrapper, Column } from '@/types'
import { pageSizes, layout } from '@/config/pagination'
import DynamicTable from '../../components/base/dynamic-table/dynamic-table.vue'
import dynamicColumns from './column'
import { SortableEvent } from 'sortablejs'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'

export default {
  name: 'article-ranking',
  components: { DynamicTable },
  setup() {
    const i18n = useI18n()
    const requestParameter = ref({
      page: 1,
      size: 10
    })
    const loading = ref(false)
    const tableManage = ref<PaginationWrapper<IArticleRankingResultDTO>>({
      list: [],
      size: requestParameter.value.size,
      total: 0,
      page: 1
    })

    const originColumns = ref<Array<Column>>(dynamicColumns())
    const tableColumns = ref<Array<Column>>(originColumns.value)
    const selectedDynamicColumns = ref<Array<string>>(
      originColumns.value.map((r) => r.prop)
    )

    async function getArticleList() {
      loading.value = true
      try {
        const res = await getArticles(requestParameter.value)
        tableManage.value = res
      } finally {
        loading.value = false
      }
    }

    watch(selectedDynamicColumns, (newValue) => {
      tableColumns.value = originColumns.value.filter((r) =>
        newValue.includes(r.prop)
      )
    })

    watchLangChange(() => {
      const newColumns = dynamicColumns()
      originColumns.value = newColumns

      tableColumns.value = newColumns.filter((r) =>
        tableColumns.value.map((r) => r.prop).includes(r.prop)
      )
      getArticleList()
    })

    onActivated(getArticleList)
    function onSizeChange(size: number) {
      requestParameter.value.size = size
      getArticleList()
    }
    function onCurrentPageChange(currentPage: number) {
      requestParameter.value.page = currentPage
      getArticleList()
    }

    function onRemoveBtnClick(data: IArticleRankingResultDTO) {
      console.log(data)
    }

    function onShowBtnClick(data: IArticleRankingResultDTO) {
      console.log(data)
    }

    async function onSortEnd(e: SortableEvent) {
      const { oldIndex, newIndex } = e
      if (oldIndex === newIndex) {
        return
      }
      const oldArticle = tableManage.value.list.at(oldIndex as number)!
      const newArticle = tableManage.value.list.at(newIndex as number)!
      await sortArticle({
        initRanking: oldArticle?.ranking,
        finalRanking: newArticle.ranking
      })
      ElMessage.success({
        message: i18n.t('article.sortSuccess'),
        type: 'success'
      })
      tableManage.value.list.length = 0
      getArticleList()
    }

    return {
      onSizeChange,
      onCurrentPageChange,
      onRemoveBtnClick,
      onShowBtnClick,
      onSortEnd,
      pageSizes,
      layout,
      tableManage,
      loading,
      requestParameter,
      tableColumns: tableColumns,
      allColumns: originColumns,
      selectedDynamicColumns
    }
  }
}
</script>

<style lang="scss" scoped></style>
