<template>
  <div class="user-manage-container">
    <el-card class="header">
      <div class="excel-btn">
        <el-button type="primary" @click="onImportExcelClick">{{
          $t('excel.importExcel')
        }}</el-button>
        <el-button type="success">{{ $t('excel.exportExcel') }}</el-button>
      </div>
    </el-card>
    <el-card>
      <el-table :data="tableManageData.list" border style="width: 100%">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column
          :label="$t('excel.name')"
          prop="username"
        ></el-table-column>
        <el-table-column
          :label="$t('excel.mobile')"
          prop="mobile"
        ></el-table-column>
        <el-table-column :label="$t('excel.avatar')" width="120">
          <template #default="{ row }">
            <div class="center">
              <el-avatar
                :src="row.avatar"
                class="avatar"
                shape="circle"
              ></el-avatar>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('excel.role')">
          <template #default="{ row }">
            <div v-if="row.role && row.role.length">
              <el-tag v-for="role in row.role" :key="role.id" size="small">{{
                role.title
              }}</el-tag>
            </div>
            <div v-else>
              <el-tag size="small">{{ $t('excel.defaultRole') }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('excel.openTime')" prop="openTime">
          <template #default="{ row }">
            {{ dayjs(row.openTime).format('YYYY-MM-DD HH:mm:ss') }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('excel.action')" fixed="right" width="240">
          <template #default>
            <el-button type="primary" size="small">{{
              $t('excel.show')
            }}</el-button>
            <el-button type="info" size="small">{{
              $t('excel.showRole')
            }}</el-button>
            <el-button type="danger" size="small">{{
              $t('excel.remove')
            }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination
          class="pagination"
          @current-change="onCurrentPageChange"
          @size-change="onPageSizeChange"
          :current-page="requestParameter.page"
          :page-size="requestParameter.size"
          :page-sizes="pageSizes"
          :total="tableManageData.total"
          layout="total, sizes, prev, pager, next"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { pageSizes } from '@/config/pagination'
import {
  getManageUsers,
  IManageUserRequestParameter,
  IManageUserInfoResultDTO
} from '@/api/user-manage'
import { PaginationWrapper } from '@/types'
import { ref } from 'vue'
import { watchLangChange } from '@/utils/i18n'
import { useRouter } from 'vue-router'
export default {
  name: 'user-manage',
  setup() {
    const router = useRouter()
    const requestParameter = ref<IManageUserRequestParameter>({
      size: 5,
      page: 1
    })
    const tableManageData = ref<PaginationWrapper<IManageUserInfoResultDTO>>({
      list: [],
      page: requestParameter.value.page,
      size: requestParameter.value.size,
      total: 0
    })
    async function gerUsers() {
      const data = await getManageUsers(requestParameter.value)
      tableManageData.value = data
    }
    watchLangChange(
      () => {
        gerUsers()
      },
      {
        immediate: true
      }
    )

    function onPageSizeChange(newPageSize: number) {
      requestParameter.value.size = newPageSize
      gerUsers()
    }

    function onCurrentPageChange(currentPage: number) {
      requestParameter.value.page = currentPage
    }

    function onImportExcelClick() {
      router.push({
        name: 'import'
      })
    }

    return {
      tableManageData,
      requestParameter,
      onPageSizeChange,
      onCurrentPageChange,
      pageSizes,
      onImportExcelClick
    }
  }
}
</script>

<style lang="scss" scoped>
.user-manage-container {
  .header {
    margin-bottom: 22px;
    text-align: right;
  }
  ::v-deep(.avatar) {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  ::v-deep(.el-tag) {
    margin-right: 6px;
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }

  .center {
    text-align: center;
  }
}
</style>
