<template>
  <el-table ref="tableRef" v-loading="loading" :data="data" :border="true">
    <el-table-column
      v-for="item in columns"
      :key="item.label"
      :prop="item.prop"
      :label="item.label"
      :show-overflow-tooltip="!!item.tip"
    >
      <template #default="{ row }" v-if="item.template">
        <slot :name="item.prop" :data="row"></slot>
      </template>
      <template #default="{ row }" v-else>
        {{ row[item.prop] }}
      </template>
    </el-table-column>
  </el-table>
  <div class="pagination-container" v-if="pagination">
    <el-pagination
      background
      class="pagination"
      @size-change="$emit('size-change', $event)"
      @current-change="$emit('current-change', $event)"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      :layout="layout"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script lang="ts">
import { computed, PropType, ref } from 'vue'
import { IArticleRankingResultDTO } from '@/api/article'
import { Column } from '@/types'
import { pageSizes, layout } from '@/config/pagination'
import useSortable from './useSortable'
import { SortableEvent, Options } from 'sortablejs'

export default {
  props: {
    data: {
      type: Array as PropType<Array<IArticleRankingResultDTO>>,
      default: () => []
    },
    columns: {
      type: Array as PropType<Array<Column>>,
      default: () => []
    },
    pagination: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    loading: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    currentPage: {
      type: Number as PropType<number>,
      default: 1
    },
    pageSize: {
      type: Number as PropType<number>,
      default: 10
    },
    pageSizes: {
      type: Array as PropType<Array<number>>,
      default: pageSizes
    },
    layout: {
      type: String as PropType<string>,
      default: layout
    },
    total: {
      type: Number as PropType<number>,
      default: 0
    },
    sortable: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    sortOption: {
      type: Object as PropType<Options>,
      default: () => ({
        ghostClass: 'sortable-ghost'
      })
    }
  },
  emits: ['current-change', 'size-change', 'sort-start', 'sort-end'],
  setup(props, { emit }) {
    const tableRef = ref()
    const canSort = computed(() => props.sortable)
    const sortable = useSortable(tableRef, canSort, {
      ghostClass: props.sortOption.ghostClass,
      onStart: (e: SortableEvent) => {
        emit('sort-start', e)
      },
      onEnd: (e: SortableEvent) => {
        emit('sort-end', e)
      }
    })
    return {
      tableRef,
      sort: sortable
    }
  }
}
</script>

<style></style>
